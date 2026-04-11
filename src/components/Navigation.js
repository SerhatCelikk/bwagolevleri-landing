"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Proje", href: "#proje" },
  { label: "Daireler", href: "#daireler" },
  { label: "Fiyatlar", href: "#fiyatlar" },
  { label: "Konum", href: "#konum" },
  { label: "Katalog", href: "#katalog" },
  { label: "Kampanya", href: "#kampanya" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? "glass-dark shadow-2xl py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full border border-gold-500/60 flex items-center justify-center bg-navy-900/80 overflow-hidden">
              <Image
                src="/logo.svg"
                alt="BWA Göl Evleri"
                width={32}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="text-left leading-none">
              <div className="font-heading text-gold-400 font-black text-base tracking-widest uppercase">BWA</div>
              <div className="text-white/55 text-[9px] tracking-[0.25em] uppercase font-medium">Göl Evleri</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="text-white/70 hover:text-gold-400 text-xs tracking-widest uppercase font-semibold transition-colors duration-250 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:05334758499"
              className="flex items-center gap-2 text-white/60 hover:text-gold-400 transition-colors text-xs font-semibold tracking-wider"
            >
              <PhoneIcon />
              0533 475 84 99
            </a>
            <button
              onClick={() => handleLink("#talep")}
              className="btn-gold px-5 py-2.5 rounded-lg text-xs font-black tracking-widest uppercase"
            >
              Talep Oluşturun
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            <span className={`w-5 h-0.5 bg-gold-400 block transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-gold-400 block transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-gold-400 block transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-950/98 flex flex-col items-center justify-center gap-7"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLink(link.href)}
                className="font-heading text-2xl font-bold text-white hover:text-gold-400 tracking-widest uppercase transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a href="tel:05334758499" className="flex items-center gap-2 text-gold-400 font-semibold text-lg mt-2">
              <PhoneIcon /> 0533 475 84 99
            </a>
            <button
              onClick={() => handleLink("#talep")}
              className="btn-gold px-8 py-3 rounded-lg text-sm font-black tracking-widest uppercase mt-2"
            >
              Talep Oluşturun
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.7 11.5 19.79 19.79 0 011.63 2.84 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
