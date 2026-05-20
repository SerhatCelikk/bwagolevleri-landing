"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const videos = [
  { src: "/videos/video1.mp4", label: "Kanal İstanbul Sonrası" },
  { src: "/videos/video2.mp4", label: "Proje Konumu" },
  { src: "/videos/video3.mp4", label: "Proje Tanıtımı" },
];

// ─── Seeks to mid-frame of a video and shows it paused (lightweight preview) ──
function VideoFrame({ src, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMetadata = () => {
      el.currentTime = el.duration > 2 ? el.duration / 2 : 1;
    };

    el.addEventListener("loadedmetadata", onMetadata);
    if (el.readyState >= 1) onMetadata();
    return () => el.removeEventListener("loadedmetadata", onMetadata);
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="metadata"
      tabIndex={-1}
      className={className}
      style={style}
      onPlay={(e) => e.currentTarget.pause()}
    />
  );
}

export default function VideoGallery() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const select = (i) => {
    if (i !== active) setPlaying(false); // reset to preview when switching
    setActive(i);
  };

  const v = videos[active];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-gold-600 text-sm font-semibold tracking-[0.3em] uppercase block mb-4">
            Proje Tanıtımı
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-900 mb-4">
            Projeyi <span className="text-gradient-gold">Keşfedin</span>
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Video */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-navy-900/5 bg-navy-950 aspect-video relative">
              {playing ? (
                <video
                  key={v.src}
                  src={v.src}
                  autoPlay
                  controls
                  playsInline
                  loop
                  className="w-full h-full object-contain"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label={`${v.label} videosunu oynat`}
                  className="absolute inset-0 w-full h-full cursor-pointer group"
                >
                  <VideoFrame
                    src={v.src}
                    className="pointer-events-none w-full h-full object-cover opacity-80"
                  />
                  {/* Dark gradient so play button pops */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/15 to-transparent pointer-events-none" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-gold-500 group-hover:bg-gold-400 shadow-2xl shadow-gold-500/40 flex items-center justify-center transition-all group-hover:scale-110">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a1628">
                        <polygon points="6,4 20,12 6,20" />
                      </svg>
                    </div>
                  </div>
                </button>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h3 className="font-semibold text-navy-900">{v.label}</h3>
              <span className="text-navy-700/40 text-sm">{active + 1} / {videos.length}</span>
            </div>
          </motion.div>

          {/* Thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-row lg:flex-col gap-4"
          >
            {videos.map((vid, i) => {
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => select(i)}
                  className={`flex-1 lg:flex-none relative rounded-2xl overflow-hidden border-2 transition-all duration-300 group ${
                    isActive
                      ? "border-gold-500 shadow-lg shadow-gold-500/20"
                      : "border-transparent hover:border-gold-300"
                  }`}
                >
                  <div className="bg-navy-900 aspect-video relative overflow-hidden">
                    <VideoFrame
                      src={vid.src}
                      className="pointer-events-none w-full h-full object-cover transition-opacity duration-300"
                      style={{ opacity: isActive ? 0.85 : 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {isActive ? (
                        <div className="bg-gold-500 text-[9px] font-black px-3 py-1 rounded-full text-navy-900">▶ SEÇİLİ</div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-white/20 group-hover:bg-white/35 flex items-center justify-center transition-colors backdrop-blur-sm">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500" />
                    )}
                  </div>
                  <div className="px-3 py-2 bg-white text-left">
                    <span className={`text-xs font-semibold ${isActive ? "text-gold-600" : "text-navy-900"}`}>
                      {vid.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
