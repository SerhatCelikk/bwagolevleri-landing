"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { trackCatalogView, trackCatalogFullscreen, trackCatalogPageTurn } from "@/lib/analytics";

const HTMLFlipBook = dynamic(() => import("react-pageflip").then((m) => m.default ?? m), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-80 w-full">
      <Spinner />
    </div>
  ),
});

// ─── Single PDF page ──────────────────────────────────────────────────────────
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
  const [zoomFactor,   setZoomFactor]   = useState(1.0);

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

  // Reset zoom when leaving fullscreen
  useEffect(() => {
    if (!isFullscreen) setZoomFactor(1.0);
  }, [isFullscreen]);

  const pageSize = pdfNative
    ? { w: pageW, h: Math.round(pageW * (pdfNative.h / pdfNative.w)) }
    : { w: pageW, h: Math.round(pageW * 1.414) };

  // Base fit-to-screen scale
  const fsScaleBase = useMemo(() => {
    if (!isFullscreen || !pdfNative) return 1;
    const bookW = pageSize.w * 2;
    const bookH = pageSize.h;
    const maxW  = window.innerWidth  - 160;
    const maxH  = window.innerHeight - 100;
    return Math.min(maxW / bookW, maxH / bookH);
  }, [isFullscreen, pdfNative, pageSize.w, pageSize.h]);

  // Effective scale = base × user zoom
  const effectiveScale = fsScaleBase * zoomFactor;

  // renderScale: render canvases at higher res so CSS scale looks sharp
  const renderScale = isFullscreen ? 2 : 1;

  const zoomIn  = useCallback(() => setZoomFactor(z => Math.min(+(z + 0.15).toFixed(2), 2.0)), []);
  const zoomOut = useCallback(() => setZoomFactor(z => Math.max(+(z - 0.15).toFixed(2), 0.4)), []);

  // Load PDF — sadece section viewport'a girince başlat
  useEffect(() => {
    if (!sectionRef.current) return;
    let destroyed = false;

    const load = async () => {
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
        trackCatalogView();
      } catch (e) {
        console.error("PDF load error:", e);
        if (!destroyed) { setError(true); setLoading(false); }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { observer.disconnect(); load(); } },
      { rootMargin: "800px" }
    );
    observer.observe(sectionRef.current);
    return () => { destroyed = true; observer.disconnect(); };
  }, []);

  // Fullscreen API
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      trackCatalogFullscreen(true);
      await sectionRef.current?.requestFullscreen({ navigationUI: "hide" }).catch(() => {});
    } else {
      trackCatalogFullscreen(false);
      await document.exitFullscreen().catch(() => {});
    }
  }, []);

  const onFlip   = useCallback((e) => { setCurrentPage(e.data); trackCatalogPageTurn(e.data + 1); }, []);
  const prevPage = useCallback(() => bookRef.current?.pageFlip().flipPrev(), []);
  const nextPage = useCallback(() => bookRef.current?.pageFlip().flipNext(), []);

  const displayLeft  = currentPage + 1;
  const displayRight = Math.min(currentPage + 2, numPages);

  // Shared button style for fullscreen overlays (absolute inside section)
  const fsBtn = (extra = {}) => ({
    position: "absolute",
    zIndex: 10,
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "rgba(6,14,26,0.88)",
    border: "1.5px solid rgba(201,168,76,0.50)",
    color: "#c9a84c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
    ...extra,
  });

  return (
    <section
      id="katalog"
      ref={sectionRef}
      className={isFullscreen ? "" : "py-24 bg-navy-950 overflow-hidden"}
      style={isFullscreen ? {
        position: "relative",          // needed for absolute children
        width: "100%",
        height: "100vh",
        background: "#060e1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      } : {}}
    >
      {/* ════════════════════════════════════════════════════════
          FULLSCREEN OVERLAY CONTROLS — inside section so they
          appear within the fullscreen context
          ════════════════════════════════════════════════════════ */}
      {isFullscreen && (
        <>
          {/* Exit — top right */}
          <button
            onClick={toggleFullscreen}
            aria-label="Tam ekrandan çık"
            title="Küçült"
            style={fsBtn({ top: 16, right: 16 })}
          >
            <ExitFullscreenIcon />
          </button>

          {/* Prev — left center */}
          <button
            onClick={prevPage}
            aria-label="Önceki sayfa"
            title="Önceki"
            style={fsBtn({ top: "50%", left: 16, transform: "translateY(-50%)" })}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Next — right center */}
          <button
            onClick={nextPage}
            aria-label="Sonraki sayfa"
            title="Sonraki"
            style={fsBtn({ top: "50%", right: 16, transform: "translateY(-50%)" })}
          >
            <ChevronRight size={20} />
          </button>

          {/* Bottom toolbar */}
          <div style={{
            position: "absolute",
            bottom: 18,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderRadius: 16,
            padding: "6px 10px",
            background: "rgba(6,14,26,0.92)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(201,168,76,0.25)",
            whiteSpace: "nowrap",
          }}>
            {/* Page counter */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "4px 14px", borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
            }}>
              <BookIcon />
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
                {displayLeft}{displayLeft < displayRight ? `–${displayRight}` : ""}
                <span style={{ color: "rgba(255,255,255,0.25)", margin: "0 4px" }}>/</span>
                {numPages}
              </span>
            </div>

            <FsSep />

            {/* Zoom out */}
            <FsToolBtn onClick={zoomOut} title="Uzaklaştır" disabled={zoomFactor <= 0.4}>
              <ZoomOutIcon />
            </FsToolBtn>

            {/* Zoom label */}
            <span style={{
              color: "rgba(201,168,76,0.9)", fontSize: 11, fontWeight: 700,
              minWidth: 36, textAlign: "center",
            }}>
              {Math.round(effectiveScale * 100)}%
            </span>

            {/* Zoom in */}
            <FsToolBtn onClick={zoomIn} title="Yaklaştır" disabled={zoomFactor >= 2.0}>
              <ZoomInIcon />
            </FsToolBtn>

            <FsSep />

            {/* Download */}
            <FsToolBtn href="/catalog.pdf" download="BWA-Gol-Evleri-Katalog.pdf" title="PDF İndir">
              <DownloadIcon />
            </FsToolBtn>
          </div>
        </>
      )}

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════════════════════ */}
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
              Sayfaya tıklayın veya sürükleyin. Daire planları ve proje detaylarının tamamı burada.
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
              {/* Prev — normal mode only (fullscreen has absolute overlay) */}
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

              {/* Flipbook — CSS scale in fullscreen; props never change */}
              <div style={{
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.65))",
                transform: isFullscreen ? `scale(${effectiveScale})` : "none",
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
function FsSep() {
  return <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.12)", margin: "0 2px" }} />;
}
function FsToolBtn({ onClick, href, download, title, disabled, children }) {
  const style = {
    width: 34, height: 34, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.55)",
    background: "transparent",
    border: "none",
    transition: "color 0.15s, background 0.15s",
  };
  if (href) return (
    <a href={href} download={download} title={title} style={style}
      onMouseEnter={e => { e.currentTarget.style.color = "#c9a84c"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; }}>
      {children}
    </a>
  );
  return (
    <button onClick={disabled ? undefined : onClick} title={title} style={style}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.color = "#c9a84c"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}}
      onMouseLeave={e => { e.currentTarget.style.color = disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; }}>
      {children}
    </button>
  );
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
function ZoomInIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
}
function ZoomOutIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
}
function DownloadIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
}
