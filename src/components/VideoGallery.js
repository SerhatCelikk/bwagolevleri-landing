"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

const videos = [
  { src: "/videos/video1.mp4", label: "Kanal İstanbul Sonrası" },
  { src: "/videos/video2.mp4", label: "Proje Konumu" },
  { src: "/videos/video3.mp4", label: "Proje Tanıtımı" },
];

export default function VideoGallery() {
  const [active, setActive] = useState(0);
  const videoRef = useRef(null);

  const select = (i) => {
    setActive(i);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

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
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-navy-900/5 bg-navy-950 aspect-video">
              <video
                ref={videoRef}
                key={active}
                autoPlay
                muted
                controls
                playsInline
                loop
                className="w-full h-full object-contain"
              >
                <source src={videos[active].src} type="video/mp4" />
              </video>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h3 className="font-semibold text-navy-900">{videos[active].label}</h3>
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
            {videos.map((v, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                className={`flex-1 lg:flex-none relative rounded-2xl overflow-hidden border-2 transition-all duration-300 group ${
                  active === i
                    ? "border-gold-500 shadow-lg shadow-gold-500/20"
                    : "border-transparent hover:border-gold-300"
                }`}
              >
                <div className="bg-navy-900 aspect-video lg:aspect-video relative">
                  <video
                    src={v.src}
                    muted
                    playsInline
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                  />
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${active === i ? "opacity-0" : "opacity-60 bg-navy-900/40"}`}>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>
                  {active === i && (
                    <div className="absolute top-2 right-2 bg-gold-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                      ▶ OYNUYOR
                    </div>
                  )}
                </div>
                <div className="px-3 py-2 bg-white text-left">
                  <span className="text-navy-900 text-xs font-semibold">{v.label}</span>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
