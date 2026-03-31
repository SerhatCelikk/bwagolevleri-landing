"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
function PdfPage({ pdfDoc, pageNum, width, height, pdfW }) {
  const canvasRef = useRef(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let cancelled = false;
    pdfDoc.getPage(pageNum).then((page) => {
      if (cancelled) return;
      const scale = width / pdfW;
      const vp    = page.getViewport({ scale });
      const canvas = canvasRef.current;
      canvas.width  = Math.round(vp.width);
      canvas.height = Math.round(vp.height);
      page.render({ canvasContext: canvas.getContext("2d"), viewport: vp })
        .promise.then(() => { if (!cancelled) setRendered(true); });
    });
    return () => { cancelled = true; };
  }, [pdfDoc, pageNum, width, pdfW]);

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
  const [pdfDoc,      setPdfDoc]      = useState(null);
  const [numPages,    setNumPages]    = useState(0);
  const [pdfNative,   setPdfNative]   = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Normal-mode responsive page width (per page, 2 pages shown side by side)
  const [pageW, setPageW] = useState(380);
  const bookRef    = useRef(null);
  const sectionRef = useRef(null);

  // Recalculate page width for both normal and fullscreen
  const calcSizes = useCallback((fullscreen, native) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (fullscreen && native) {
      // Height-constrained: subtract toolbar (56px) + top padding (24px)
      const availH = vh - 56 - 40;
      const ratio  = native.w / native.h;
      const byH    = Math.floor(availH * ratio);
      const byW    = Math.floor(vw / 2) - 60; // 60px margin + side buttons
      setPageW(Math.max(Math.min(byH, byW, 560), 160));
    } else {
      setPageW(Math.max(Math.min(Math.floor((vw - 80) / 2), 460), 200));
    }
  }, []);

  useEffect(() => {
    const onResize = () => calcSizes(isFullscreen, pdfNative);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isFullscreen, pdfNative, calcSizes]);

  const pageSize = pdfNative
    ? { w: pageW, h: Math.round(pageW * (pdfNative.h / pdfNative.w)) }
    : { w: pageW, h: Math.round(pageW * 1.414) };

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
  const prevPage = () => bookRef.current?.pageFlip().flipPrev();
  const nextPage = () => bookRef.current?.pageFlip().flipNext();

  const displayLeft  = currentPage + 1;
  const displayRight = Math.min(currentPage + 2, numPages);

  // ── Toolbar (shared between modes) ────────────────────────────────────────
  const Toolbar = () => (
    <div
      className="flex items-center gap-1 rounded-2xl px-3 py-2"
      style={{ background: "rgba(10,22,40,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(201,168,76,0.22)" }}
    >
      <ToolBtn onClick={prevPage} label="Önceki"><ChevronLeft /></ToolBtn>

      <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/5 mx-1">
        <BookIcon />
        <span className="text-white/60 text-xs font-semibold tabular-nums whitespace-nowrap">
          {displayLeft}{displayLeft < displayRight ? `–${displayRight}` : ""}
          <span className="text-white/25 mx-1">/</span>{numPages}
        </span>
      </div>

      <ToolBtn onClick={nextPage} label="Sonraki"><ChevronRight /></ToolBtn>

      <Separator />

      <ToolBtn onClick={toggleFullscreen} label={isFullscreen ? "Küçült" : "Tam Ekran"} active={isFullscreen}>
        {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
      </ToolBtn>

      <Separator />

      <ToolBtn href="/catalog.pdf" download="BWA-Gol-Evleri-Katalog.pdf" label="PDF İndir">
        <DownloadIcon />
      </ToolBtn>
    </div>
  );

  // ── Flipbook stage (shared) ────────────────────────────────────────────────
  const BookStage = () => (
    <div className="flex items-center justify-center gap-3">
      {/* Prev */}
      <button
        onClick={prevPage}
        aria-label="Önceki"
        className="hidden md:flex shrink-0 w-11 h-11 rounded-full border items-center justify-center transition-all"
        style={{ background: "rgba(10,22,40,0.80)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.color = "#c9a84c"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
      >
        <ChevronLeft />
      </button>

      {/* Flipbook */}
      <div style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.7))" }}>
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
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Next */}
      <button
        onClick={nextPage}
        aria-label="Sonraki"
        className="hidden md:flex shrink-0 w-11 h-11 rounded-full border items-center justify-center transition-all"
        style={{ background: "rgba(10,22,40,0.80)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.color = "#c9a84c"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
      >
        <ChevronRight />
      </button>
    </div>
  );

  // ── FULLSCREEN RENDER ──────────────────────────────────────────────────────
  if (isFullscreen) {
    return (
      <section
        id="katalog"
        ref={sectionRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "#060e1a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          overflow: "hidden",
        }}
      >
        {/* Exit button — top right corner */}
        <button
          onClick={toggleFullscreen}
          aria-label="Tam ekrandan çık"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 50,
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "rgba(10,22,40,0.90)",
            border: "1px solid rgba(201,168,76,0.35)",
            color: "#c9a84c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ExitFullscreenIcon />
        </button>

        {/* Flipbook */}
        {!loading && !error && pdfDoc && pdfNative && <BookStage />}

        {/* Toolbar — bottom center */}
        {!loading && !error && pdfDoc && (
          <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}>
            <Toolbar />
          </div>
        )}
      </section>
    );
  }

  // ── NORMAL RENDER ──────────────────────────────────────────────────────────
  return (
    <section id="katalog" ref={sectionRef} className="py-24 bg-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
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

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-24">
            <Spinner />
            <p className="text-white/40 text-sm tracking-wider">Katalog yükleniyor…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-white/40 mb-5 text-sm">Katalog yüklenemedi.</p>
            <a href="/catalog.pdf" download="BWA-Gol-Evleri-Katalog.pdf"
              className="btn-gold px-7 py-3 rounded-lg text-sm font-bold tracking-wider inline-block">
              PDF Olarak İndir
            </a>
          </div>
        )}

        {/* Book */}
        {!loading && !error && pdfDoc && pdfNative && (
          <div className="flex flex-col items-center gap-6">
            {/* Glow bg */}
            <div style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)", width: "100%", paddingTop: 8 }}>
              <BookStage />
            </div>

            <Toolbar />

            <p className="text-white/20 text-[11px] tracking-wide">
              Sayfaları çevirmek için tıklayın veya sürükleyin
            </p>
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
function ToolBtn({ onClick, href, download, label, active, children }) {
  const cls = `relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 group cursor-pointer ${
    active ? "bg-gold-500/20 text-gold-400 border border-gold-500/30" : "text-white/50 hover:text-gold-400 hover:bg-white/8"
  }`;
  const tooltip = (
    <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
      {label}
    </span>
  );
  if (href) return <a href={href} download={download} className={cls} title={label}>{children}{tooltip}</a>;
  return <button onClick={onClick} className={cls} title={label}>{children}{tooltip}</button>;
}
function ChevronLeft() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>;
}
function ChevronRight() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>;
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
