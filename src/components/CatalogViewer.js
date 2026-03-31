"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HTMLFlipBook = dynamic(() => import("react-pageflip").then((m) => m.default ?? m), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-80 w-full">
      <Spinner />
    </div>
  ),
});

// ─── Single PDF page ──────────────────────────────────────────────────────────
// renderScale: canvas is rendered at (width * renderScale) pixels but displayed
// at (width) CSS pixels → crisp HiDPI / fullscreen quality without changing layout
function PdfPage({ pdfDoc, pageNum, width, height, pdfW, renderScale = 1 }) {
  const canvasRef = useRef(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let cancelled = false;
    setRendered(false);
    pdfDoc.getPage(pageNum).then((page) => {
      if (cancelled) return;
      const scale  = (width / pdfW) * renderScale;
      const vp     = page.getViewport({ scale });
      const canvas = canvasRef.current;
      canvas.width  = Math.round(vp.width);
      canvas.height = Math.round(vp.height);
      page.render({ canvasContext: canvas.getContext("2d"), viewport: vp })
        .promise.then(() => { if (!cancelled) setRendered(true); });
    });
    return () => { cancelled = true; };
  }, [pdfDoc, pageNum, width, pdfW, renderScale]);

  return (
    <div style={{ width, height, overflow: "hidden", position: "relative", background: "#fff" }}>
      {!rendered && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <Spinner small />
        </div>
      )}
      {/* canvas pixel size = width*renderScale, CSS display size = 100% of container */}
      <canvas
        ref={canvasRef}
        style={{ display: rendered ? "block" : "none", width: "100%", height: "100%" }}
      />
    </div>
  );
}

// ─── Main Viewer ──────────────────────────────────────────────────────────────
export default function CatalogViewer() {
  const [pdfDoc,       setPdfDoc]       = useState(null);
  const [numPages,     setNumPages]     = useState(0);
  const [pdfNative,    setPdfNative]    = useState(null);
  const [currentPage,  setCurrentPage]  = useState(0);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // pageW never changes on fullscreen toggle → HTMLFlipBook props stay stable
  const [pageW, setPageW] = useState(380);

  const bookRef    = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      setPageW(Math.max(Math.min(Math.floor((vw - 80) / 2), 460), 200));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const pageSize = pdfNative
    ? { w: pageW, h: Math.round(pageW * (pdfNative.h / pdfNative.w)) }
    : { w: pageW, h: Math.round(pageW * 1.414) };

  // CSS scale factor for fullscreen (book visually enlarged, props unchanged)
  const fsScale = useMemo(() => {
    if (!isFullscreen || !pdfNative) return 1;
    const bookW = pageSize.w * 2;
    const bookH = pageSize.h;
    const maxW  = window.innerWidth  - 160;
    const maxH  = window.innerHeight - 90;
    return Math.min(maxW / bookW, maxH / bookH);
  }, [isFullscreen, pdfNative, pageSize.w, pageSize.h]);

  // renderScale: how many extra pixels to render per CSS pixel.
  // In fullscreen we need at least fsScale worth of pixels to stay sharp.
  // We round up to the next integer and cap at 3 to limit memory usage.
  const renderScale = useMemo(() => {
    if (!isFullscreen) return 1;
    return Math.min(Math.max(Math.ceil(fsScale), 2), 3);
  }, [isFullscreen, fsScale]);

  // Load PDF
  useEffect(() => {
    let destroyed = false;
    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc = await pdfjsLib.getDocument("/catalog.pdf").promise;
        if (destroyed) return;
        const vp1 = (await doc.getPage(1)).getViewport({ scale: 1 });
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setPdfNative({ w: Math.round(vp1.width), h: Math.round(vp1.height) });
        setLoading(false);
      } catch (e) {
        console.error("PDF load error:", e);
        if (!destroyed) { setError(true); setLoading(false); }
      }
    })();
    return () => { destroyed = true; };
  }, []);

  // Fullscreen API
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await sectionRef.current?.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  }, []);

  const onFlip   = useCallback((e) => setCurrentPage(e.data), []);
  const prevPage = useCallback(() => bookRef.current?.pageFlip().flipPrev(), []);
  const nextPage = useCallback(() => bookRef.current?.pageFlip().flipNext(), []);

  const displayLeft  = currentPage + 1;
  const displayRight = Math.min(currentPage + 2, numPages);

  const overlayBtn = {
    position: "fixed",
    zIndex: 9999,
    top: "50%",
    transform: "translateY(-50%)",
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "rgba(6,14,26,0.88)",
    border: "1.5px solid rgba(201,168,76,0.50)",
    color: "#c9a84c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
  };

  return (
    <>
      {/* ── Fullscreen fixed overlays ── */}
      {isFullscreen && (
        <>
          {/* Exit — top right */}
          <button
            onClick={toggleFullscreen}
            aria-label="Tam ekrandan çık"
            style={{
              position: "fixed", top: 16, right: 16, zIndex: 9999,
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(6,14,26,0.90)",
              border: "1.5px solid rgba(201,168,76,0.55)",
              color: "#c9a84c", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <ExitFullscreenIcon />
          </button>

          {/* Prev */}
          <button onClick={prevPage} aria-label="Önceki sayfa" style={{ ...overlayBtn, left: 16 }}>
            <ChevronLeft size={20} />
          </button>

          {/* Next */}
          <button onClick={nextPage} aria-label="Sonraki sayfa" style={{ ...overlayBtn, right: 16 }}>
            <ChevronRight size={20} />
          </button>

          {/* Toolbar — bottom center */}
          <div style={{
            position: "fixed", bottom: 16, left: "50%",
            transform: "translateX(-50%)", zIndex: 9999,
            display: "flex", alignItems: "center", gap: 4,
            borderRadius: 16, padding: "6px 12px",
            background: "rgba(6,14,26,0.92)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(201,168,76,0.25)",
          }}>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/5 mx-1">
              <BookIcon />
              <span className="text-white/60 text-xs font-semibold tabular-nums whitespace-nowrap">
                {displayLeft}{displayLeft < displayRight ? `–${displayRight}` : ""}
                <span className="text-white/25 mx-1">/</span>{numPages}
              </span>
            </div>
            <Separator />
            <ToolBtn href="/catalog.pdf" download="BWA-Gol-Evleri-Katalog.pdf" label="PDF İndir">
              <DownloadIcon />
            </ToolBtn>
          </div>
        </>
      )}

      {/* ── Section ── */}
      <section
        id="katalog"
        ref={sectionRef}
        className={isFullscreen ? "" : "py-24 bg-navy-950 overflow-hidden"}
        style={isFullscreen ? {
          width: "100%", height: "100vh",
          background: "#060e1a",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        } : {}}
      >
        <div className={isFullscreen ? "" : "max-w-7xl mx-auto px-6"}>

          {/* Header — normal mode only */}
          {!isFullscreen && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <span className="text-gold-500/65 text-xs font-bold tracking-[0.3em] uppercase block mb-4">
                Dijital Katalog
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-4">
                Projeyi <span className="text-gradient-gold">Sayfa Sayfa İnceleyin</span>
              </h2>
              <div className="section-divider mb-4" />
              <p className="text-white/40 text-sm max-w-xl mx-auto">
                Sayfaya tıklayın veya sürükleyin. Daire planları, fiyat listesi ve proje detaylarının tamamı burada.
              </p>
            </motion.div>
          )}

          {loading && (
            <div className="flex flex-col items-center gap-4 py-24">
              <Spinner />
              <p className="text-white/40 text-sm tracking-wider">Katalog yükleniyor…</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-white/40 mb-5 text-sm">Katalog yüklenemedi.</p>
              <a href="/catalog.pdf" download="BWA-Gol-Evleri-Katalog.pdf"
                className="btn-gold px-7 py-3 rounded-lg text-sm font-bold tracking-wider inline-block">
                PDF Olarak İndir
              </a>
            </div>
          )}

          {!loading && !error && pdfDoc && pdfNative && (
            <div className={isFullscreen ? "flex flex-col items-center" : "flex flex-col items-center gap-6"}>

              {/* Book row */}
              <div
                className="flex items-center justify-center gap-3"
                style={!isFullscreen ? {
                  background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)",
                  paddingTop: 8,
                } : {}}
              >
                {/* Prev — normal mode only */}
                {!isFullscreen && (
                  <button
                    onClick={prevPage}
                    aria-label="Önceki"
                    className="hidden md:flex shrink-0 w-11 h-11 rounded-full border items-center justify-center transition-all"
                    style={{ background: "rgba(10,22,40,0.82)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.color = "#c9a84c"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    <ChevronLeft />
                  </button>
                )}

                {/* Flipbook wrapper — CSS scale in fullscreen, stable props always */}
                <div style={{
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.65))",
                  transform: isFullscreen ? `scale(${fsScale})` : "none",
                  transformOrigin: "center center",
                  ...(isFullscreen ? { width: pageSize.w * 2, height: pageSize.h } : {}),
                }}>
                  <HTMLFlipBook
                    ref={bookRef}
                    width={pageSize.w}
                    height={pageSize.h}
                    size="fixed"
                    minWidth={160}
                    maxWidth={600}
                    minHeight={100}
                    maxHeight={900}
                    showCover={false}
                    mobileScrollSupport
                    onFlip={onFlip}
                    flippingTime={650}
                    style={{ margin: "0 auto" }}
                    startPage={0}
                    drawShadow
                    usePortrait={false}
                    startZIndex={0}
                    autoSize={false}
                    maxShadowOpacity={0.5}
                    showPageCorners
                    disableFlipByClick={false}
                  >
                    {Array.from({ length: numPages }, (_, i) => (
                      <div key={i} style={{ width: pageSize.w, height: pageSize.h, overflow: "hidden" }}>
                        <PdfPage
                          pdfDoc={pdfDoc}
                          pageNum={i + 1}
                          width={pageSize.w}
                          height={pageSize.h}
                          pdfW={pdfNative.w}
                          renderScale={renderScale}
                        />
                      </div>
                    ))}
                  </HTMLFlipBook>
                </div>

                {/* Next — normal mode only */}
                {!isFullscreen && (
                  <button
                    onClick={nextPage}
                    aria-label="Sonraki"
                    className="hidden md:flex shrink-0 w-11 h-11 rounded-full border items-center justify-center transition-all"
                    style={{ background: "rgba(10,22,40,0.82)", borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.color = "#c9a84c"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    <ChevronRight />
                  </button>
                )}
              </div>

              {/* Toolbar — normal mode only */}
              {!isFullscreen && (
                <>
                  <div
                    className="flex items-center gap-1 rounded-2xl px-3 py-2"
                    style={{ background: "rgba(10,22,40,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(201,168,76,0.22)" }}
                  >
                    <ToolBtn onClick={prevPage} label="Önceki" className="md:hidden"><ChevronLeft /></ToolBtn>

                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/5 mx-1">
                      <BookIcon />
                      <span className="text-white/60 text-xs font-semibold tabular-nums whitespace-nowrap">
                        {displayLeft}{displayLeft < displayRight ? `–${displayRight}` : ""}
                        <span className="text-white/25 mx-1">/</span>{numPages}
                      </span>
                    </div>

                    <ToolBtn onClick={nextPage} label="Sonraki" className="md:hidden"><ChevronRight /></ToolBtn>
                    <Separator />
                    <ToolBtn onClick={toggleFullscreen} label="Tam Ekran"><FullscreenIcon /></ToolBtn>
                    <Separator />
                    <ToolBtn href="/catalog.pdf" download="BWA-Gol-Evleri-Katalog.pdf" label="PDF İndir">
                      <DownloadIcon />
                    </ToolBtn>
                  </div>

                  <p className="text-white/20 text-[11px] tracking-wide">
                    Sayfaları çevirmek için tıklayın veya sürükleyin
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Spinner({ small }) {
  const s = small ? "w-6 h-6 border-2" : "w-10 h-10 border-2";
  return <div className={`${s} border-gold-500/25 border-t-gold-400 rounded-full animate-spin`} />;
}
function Separator() {
  return <div className="w-px h-5 bg-white/10 mx-1" />;
}
function ToolBtn({ onClick, href, download, label, children, className = "" }) {
  const cls = `relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 group cursor-pointer text-white/50 hover:text-gold-400 hover:bg-white/8 ${className}`;
  const tooltip = (
    <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
      {label}
    </span>
  );
  if (href) return <a href={href} download={download} className={cls} title={label}>{children}{tooltip}</a>;
  return <button onClick={onClick} className={cls} title={label}>{children}{tooltip}</button>;
}
function ChevronLeft({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>;
}
function ChevronRight({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>;
}
function BookIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gold-500/60"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>;
}
function FullscreenIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>;
}
function ExitFullscreenIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="10" y1="14" x2="3" y2="21" /><line x1="21" y1="3" x2="14" y2="10" /></svg>;
}
function DownloadIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
}
