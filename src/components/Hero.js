"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { trackCTAClick, trackPhoneClick } from "@/lib/analytics";

const TOTAL_UNITS = 29;
const SOLD_UNITS = 6;
const REMAINING = TOTAL_UNITS - SOLD_UNITS;

export default function Hero() {
  const videoRef = useRef(null);
  const [videoIdx, setVideoIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(true); // true by default — SSR safe, avoids flash
  const videos = ["/videos/video1.mp4", "/videos/video2.mp4", "/videos/video3.mp4"];

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = () => setVideoIdx((i) => (i + 1) % videos.length);
    v.addEventListener("ended", next);
    return () => v.removeEventListener("ended", next);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [videoIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background — video on desktop, pure CSS gradient on mobile (no image fetch = instant LCP) */}
      <div className="absolute inset-0 z-0">
        {!isMobile && (
          <video
            ref={videoRef}
            key={videoIdx}
            autoPlay
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover opacity-35"
          >
            <source src={videos[videoIdx]} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-900/55 to-navy-950/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/50 via-transparent to-navy-950/50" />
      </div>

      {/* Subtle particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${8 + i * 12}%`,
            animationDuration: `${12 + i * 3}s`,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Decorative ring */}
      <div className="absolute top-24 right-16 w-72 h-72 rounded-full border border-gold-500/8 animate-spin-slow pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2.5 glass-gold px-5 py-2 rounded-full mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-300 text-xs font-bold tracking-[0.25em] uppercase">
            Lansmana Özel · {REMAINING} Daire Kaldı
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
        </motion.div>

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-full border-2 border-gold-500/50 flex items-center justify-center bg-navy-900/60">
            <Image src="/logo.svg" alt="BWA" width={46} height={30} className="object-contain" />
          </div>
        </motion.div>

        {/* Titles */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: "easeOut" }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-5"
        >
          GÖLE BAKAN
          <br />
          <span className="text-gradient-gold">PRESTİJLİ YAŞAM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.5 }}
          className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-10 font-medium leading-relaxed"
        >
          Küçükçekmece Gölü kıyısında, Kanal İstanbul güzergahında BWA GYO güvencesiyle
          1+1, 2+1, 3+1 ve dubleks daireler. 64 konutluk seçkin proje.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          <button
            onClick={() => { trackCTAClick("hero_bilgi_al"); document.querySelector("#talep")?.scrollIntoView({ behavior: "smooth" }); }}
            className="btn-gold px-9 py-3.5 rounded-lg text-sm font-black tracking-[0.12em] uppercase animate-pulse-gold"
          >
            Hemen Bilgi Alın
          </button>
          <a
            href="tel:05334758499"
            onClick={() => trackPhoneClick("hero")}
            className="btn-outline-gold px-9 py-3.5 rounded-lg text-sm font-black tracking-[0.12em] uppercase flex items-center gap-2.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.7 11.5 19.79 19.79 0 011.63 2.84 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            0533 475 84 99
          </a>
        </motion.div>

        {/* Campaign progress bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="max-w-lg mx-auto glass-dark rounded-2xl p-5 border border-gold-500/25"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-gold-400 text-xs font-bold tracking-wider uppercase">Kampanya Kontenjanı</span>
            <span className="text-white/50 text-xs">
              <span className="text-gold-400 font-bold text-sm">{SOLD_UNITS}</span>/{TOTAL_UNITS} daire satıldı
            </span>
          </div>
          <div className="w-full bg-navy-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(SOLD_UNITS / TOTAL_UNITS) * 100}%` }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              className="h-2 rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
            />
          </div>
          <div className="flex items-center justify-between mt-2.5">
            <p className="text-white/35 text-[11px] tracking-wide">
              <strong className="text-gold-400">{REMAINING} daire</strong> için kampanya fiyatı geçerli
            </p>
            <span className="text-white/30 text-[11px] tracking-wide">Teslim: <strong className="text-gold-400/70">En geç Ekim 2027</strong></span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={() => document.querySelector("#proje")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-white/30 text-[10px] tracking-[0.35em] uppercase font-semibold">Keşfet</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-500/60 to-transparent animate-float" />
      </motion.div>
    </section>
  );
}
