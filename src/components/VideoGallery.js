"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const videos = [
  {
    id: "gSBwCCk1Xq0",
    label: "Proje Tanıtımı",
    desc: "BWA Göl Evleri genel tanıtım",
  },
  {
    id: "TIqLOKjtMyk",
    label: "Kanal İstanbul'un Kalbinde",
    desc: "Topraktan yatırım fırsatı",
  },
  {
    id: "_hM0fZbNMuo",
    label: "İnşaat Başlıyor",
    desc: "Hafriyat bitti, sıra inşaatta",
  },
];

// Dikey (Shorts) kart — tıklanınca YouTube embed oynatılır
function ShortCard({ video, index }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="w-full max-w-[320px]"
    >
      <div className="relative aspect-[9/16] rounded-3xl overflow-hidden bg-navy-950 border border-navy-900/10 shadow-2xl">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
            title={video.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${video.label} videosunu oynat`}
            className="absolute inset-0 w-full h-full cursor-pointer group"
          >
            <img
              src={`https://i.ytimg.com/vi/${video.id}/oardefault.jpg`}
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = "1";
                  e.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
                }
              }}
              alt={video.label}
              loading="lazy"
              className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* Dark gradient so play button pops */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent pointer-events-none" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-gold-500 group-hover:bg-gold-400 shadow-2xl shadow-gold-500/40 flex items-center justify-center transition-all group-hover:scale-110">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a1628">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
            </div>
            {/* Label inside card */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-left pointer-events-none">
              <p className="text-white font-bold text-base leading-snug">{video.label}</p>
              <p className="text-white/50 text-xs mt-1">{video.desc}</p>
            </div>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function VideoGallery() {
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
          {videos.map((video, i) => (
            <ShortCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
