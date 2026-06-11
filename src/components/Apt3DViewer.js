"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Apt3DViewer — BWA Göl Evleri 3D daire görüntüleyici (Three.js).
 * Performans: Three.js yalnız gerekince yüklenir (sayfa açılışını yormaz).
 *   - Masaüstü: bölüm görünür + sayfa yüklendikten sonra (idle) otomatik başlar
 *   - Mobil: RAM güvenliği için kullanıcı dokununca başlar
 * Props: type ("1+1"|"2+1"|"3+1"), accent (hex)
 */
export default function Apt3DViewer({ type, accent = "#c9a84c" }) {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const viewerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [furniture, setFurniture] = useState(true);
  const [fullWall, setFullWall] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Otomatik başlatma (masaüstü, görünür + sayfa yüklendikten sonra) ---
  useEffect(() => {
    if (started) return;
    const coarse = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || coarse);
    if (isMobile) return; // mobilde dokunarak aç (RAM güvenliği)

    const el = containerRef.current;
    if (!el) return;
    let io;
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 400));
    const arm = () => {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            idle(() => setStarted(true)); // CPU'yu sayfa yükleme ile aynı anda yormamak için boşta başlat
          }
        },
        { rootMargin: "200px" }
      );
      io.observe(el);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      io && io.disconnect();
      window.removeEventListener("load", arm);
    };
  }, [started]);

  // --- Three.js'i başlat (yalnız started olunca) ---
  useEffect(() => {
    if (!started) return;
    let disposed = false;
    setLoading(true);
    (async () => {
      const [{ Apt3D }, { TYPES }] = await Promise.all([
        import("./floorplan/Apt3D"),
        import("./floorplan/types"),
      ]);
      if (disposed || !mountRef.current) return;
      const v = new Apt3D(mountRef.current);
      v._TYPES = TYPES;
      viewerRef.current = v;
      v.load(TYPES[type] || TYPES["1+1"]);
      v.setFurniture(furniture);
      v.setWallHeight(fullWall);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!disposed) { v.resize(); setLoading(false); }
      }));
    })();
    return () => {
      disposed = true;
      if (viewerRef.current && viewerRef.current.dispose) viewerRef.current.dispose();
      viewerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  // type değişince yeniden yükle (viewer kalıcı -> akıcı)
  useEffect(() => {
    const v = viewerRef.current;
    if (!v || !v._TYPES) return;
    v.load(v._TYPES[type] || v._TYPES["1+1"]);
    v.setFurniture(furniture);
    v.setWallHeight(fullWall);
    requestAnimationFrame(() => v.resize());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => { viewerRef.current?.setFurniture(furniture); }, [furniture]);
  useEffect(() => { viewerRef.current?.setWallHeight(fullWall); }, [fullWall]);

  const Toggle = ({ on, onClick, label }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold backdrop-blur-md transition-all select-none"
      style={
        on
          ? { backgroundColor: accent, color: "#0b1220", boxShadow: `0 4px 14px ${accent}55` }
          : { backgroundColor: "rgba(10,16,30,0.55)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.18)" }
      }
    >
      <span className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-[4px] ${on ? "bg-black/25" : "bg-white/10"}`}>
        {on ? "✓" : ""}
      </span>
      {label}
    </button>
  );

  const ZoomBtn = ({ onClick, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-white/90 backdrop-blur-md transition-all hover:bg-white/10"
      style={{ backgroundColor: "rgba(10,16,30,0.55)", border: "1px solid rgba(255,255,255,0.18)" }}
    >
      {children}
    </button>
  );

  return (
    <div ref={containerRef} className="relative h-[320px] w-full overflow-hidden bg-[#0b1220] sm:h-[400px] lg:h-[460px]">
      {started ? (
        <>
          {/* Three.js canvas mount */}
          <div ref={mountRef} className="absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" />

          {/* Üst-sol ipucu (mobilde gizli) */}
          <div className="pointer-events-none absolute left-3 top-3 hidden rounded-lg bg-black/45 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white/70 backdrop-blur-sm sm:block">
            3D · sürükle döndür · tekerlek/parmak ile yakınlaş
          </div>

          {/* Üst-sağ toggle'lar */}
          <div className="absolute right-3 top-3 flex gap-2">
            <Toggle on={furniture} onClick={() => setFurniture((s) => !s)} label="Mobilya" />
            <Toggle on={fullWall} onClick={() => setFullWall((s) => !s)} label="Tam duvar" />
          </div>

          {/* Alt-sağ zoom */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-2">
            <ZoomBtn onClick={() => viewerRef.current?.zoomIn()} title="Yakınlaş">+</ZoomBtn>
            <ZoomBtn onClick={() => viewerRef.current?.zoomOut()} title="Uzaklaş">−</ZoomBtn>
          </div>

          {/* Yükleniyor */}
          {loading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#0b1220]">
              <div className="h-11 w-11 animate-spin rounded-full border-4" style={{ borderColor: "rgba(255,255,255,0.14)", borderTopColor: accent }} />
              <span className="text-xs font-semibold text-white/55">3D daire yükleniyor…</span>
            </div>
          )}
        </>
      ) : (
        /* --- Poster (Three.js henüz yüklenmedi) --- */
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 transition-colors"
          style={{ background: `radial-gradient(120% 120% at 50% 25%, ${accent}1f 0%, #0b1220 65%)` }}
          aria-label="3D daire görünümünü aç"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full text-2xl shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: accent, color: "#0b1220", boxShadow: `0 8px 28px ${accent}55` }}
          >
            ▶
          </span>
          <span className="text-base font-black text-white">{type} · 3D Daire Turu</span>
          <span className="text-xs font-semibold text-white/55">Görüntülemek için dokunun · sürükleyip döndürün</span>
        </button>
      )}
    </div>
  );
}
