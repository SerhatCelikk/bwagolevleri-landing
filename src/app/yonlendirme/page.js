"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SITE = "https://bwagolevleri.webinen.com";
const WA_NUMBER = "905325465354";
const WA_MSG = encodeURIComponent("İnstagramdan ulaşıyorum, bilgi almak istiyorum.");

const links = [
  {
    id: "talep",
    label: "Talep Oluştur",
    sub: "Size özel teklif hazırlayalım",
    href: `${SITE}/#talep`,
    icon: <FormIcon />,
    style: "gold",
  },
  {
    id: "whatsapp",
    label: "WhatsApp ile Yaz",
    sub: "Hızlı yanıt · 7/24",
    href: `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`,
    icon: <WhatsAppIcon />,
    style: "green",
    external: true,
  },
  {
    id: "website",
    label: "Websiteyi Gez",
    sub: "Fiyatlar, katalog ve konum",
    href: SITE,
    icon: <WebIcon />,
    style: "navy",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    sub: "@bwa_gyo · Fotoğraflar & Güncellemeler",
    href: "https://www.instagram.com/bwa_gyo",
    icon: <InstagramIcon />,
    style: "insta",
    external: true,
  },
];

const styles = {
  gold:  { bg: "linear-gradient(135deg,#c9a84c,#a07830)", text: "#0a1628", shadow: "rgba(201,168,76,0.4)" },
  green: { bg: "linear-gradient(135deg,#25d366,#128c7e)", text: "#fff",    shadow: "rgba(37,211,102,0.35)" },
  navy:  { bg: "linear-gradient(135deg,#1a3358,#0a1628)", text: "#fff",    shadow: "rgba(10,22,40,0.45)" },
  insta: { bg: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af)", text: "#fff", shadow: "rgba(221,42,123,0.4)" },
};

export default function YonlendirmePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-5 py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/1.jpg"
          alt="BWA Göl Evleri"
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/70 to-navy-950/90" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">

        {/* Logo & brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-20 h-20 rounded-full border-2 border-gold-500/60 flex items-center justify-center bg-navy-900/80 mb-4 shadow-xl shadow-black/40">
            <Image src="/logo.svg" alt="BWA GYO" width={52} height={34} className="object-contain" />
          </div>
          <h1 className="font-heading text-2xl font-black text-white tracking-tight">BWA Göl Evleri</h1>
          <p className="text-white/50 text-sm mt-1 tracking-wide">Küçükçekmece · Göl Manzaralı Yaşam</p>
          <div className="flex items-center gap-1.5 mt-3 bg-gold-500/15 border border-gold-500/30 px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-300 text-[11px] font-bold tracking-[0.2em] uppercase">Lansmana Özel Fırsatlar</span>
          </div>
        </motion.div>

        {/* Link buttons */}
        <div className="w-full flex flex-col gap-3">
          {links.map((link, i) => {
            const s = styles[link.style];
            return (
              <motion.a
                key={link.id}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-left"
                style={{
                  background: s.bg,
                  color: s.text,
                  boxShadow: `0 8px 24px ${s.shadow}`,
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)" }}>
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-[15px] leading-tight">{link.label}</div>
                  <div className="text-[11px] mt-0.5 opacity-75 truncate">{link.sub}</div>
                </div>
                <ChevronIcon color={s.text} />
              </motion.a>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-white/25 text-[11px] tracking-wide">
            BWA GYO · Barsan · Winn4 · Adproje
          </p>
          <p className="text-white/15 text-[10px] mt-1">
            bwagolevleri.webinen.com
          </p>
        </motion.div>
      </div>
    </main>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────────

function FormIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10,9 9,9 8,9"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function ChevronIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
      <path d="M9 18l6-6-6-6"/>
    </svg>
  );
}
