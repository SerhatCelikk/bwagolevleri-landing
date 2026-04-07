"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackCTAClick } from "@/lib/analytics";

export default function StickyContact() {
  const [visible, setVisible] = useState(false);

  // Hero geçildikten sonra göster
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    trackCTAClick("sticky_talep");
    document.querySelector("#talep form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Mobil: alt ortada ── */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-5 left-0 right-0 flex justify-center z-40 md:hidden"
            aria-hidden="true"
          >
            <button
              onClick={scrollToForm}
              className="relative flex items-center gap-2.5 px-7 py-3.5 rounded-full shadow-2xl font-black text-sm tracking-[0.1em] uppercase overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #c9a84c 0%, #a07830 100%)",
                color: "#0a1628",
                boxShadow: "0 8px 32px rgba(201,168,76,0.45)",
              }}
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full animate-ping opacity-20"
                style={{ background: "rgba(201,168,76,0.6)" }} />
              <PhoneIcon />
              Talep Oluştur
            </button>
          </motion.div>

          {/* ── Tablet & Masaüstü: sağ orta ── */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex"
            aria-hidden="true"
          >
            <button
              onClick={scrollToForm}
              className="relative group flex flex-col items-center gap-2 py-5 px-3.5 rounded-l-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #c9a84c 0%, #a07830 100%)",
                color: "#0a1628",
                boxShadow: "-6px 0 28px rgba(201,168,76,0.35)",
              }}
            >
              {/* Shimmer */}
              <span
                className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-20 rounded-l-2xl"
                style={{ background: "linear-gradient(180deg, #fff 0%, transparent 100%)" }}
              />

              {/* Animated dot */}
              <span className="relative w-2.5 h-2.5 rounded-full"
                style={{ background: "#0a1628" }}>
                <span className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(10,22,40,0.5)" }} />
              </span>

              {/* Vertical text */}
              <span
                className="font-black text-[11px] tracking-[0.22em] uppercase"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                  letterSpacing: "0.22em",
                }}
              >
                Talep Oluştur
              </span>

              <PhoneIcon size={16} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PhoneIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
    </svg>
  );
}
