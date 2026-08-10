"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TOTAL = 29;
const SOLD = 12;
const REMAINING = TOTAL - SOLD;

const CAMPAIGN_OFFERS = [
  { title: "İlk Ay Peşin + 12 Ay Taksit", desc: "İlk ayı peşin ödeyin, kalan tutarı 12 ay 0 faiz eşit taksitle. Toplam 13 ödeme.", tag: "0 Faiz" },
  { title: "%50 Peşin, Kalanı Teslimde", desc: "Yarısını şimdi ödeyin, kalan %50'yi anahtar tesliminde ödeme esnekliği.", tag: "Esnek" },
  { title: "Nakit Alımda %10 İskonto", desc: "Tamamını nakit ödeyin, özel indirimle en avantajlı fiyatı yakalayın.", tag: "%10 İndirim" },
  { title: "Size Özel Ödeme Planı", desc: "Seçili alıcılara özel ödeme planı müzakeresi imkânı.", tag: "Ayrıcalık" },
];

function useCountdown() {
  const endDate = new Date("2026-11-10T23:59:59");
  const [t, setT] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = endDate - new Date();
      if (diff <= 0) return;
      setT({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), mins: Math.floor((diff % 3600000) / 60000), secs: Math.floor((diff % 60000) / 1000) });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass-dark rounded-xl w-14 h-14 md:w-18 md:h-18 flex items-center justify-center border border-gold-500/25">
        <span className="font-heading text-xl md:text-2xl font-black text-gold-400 tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-white/35 text-[9px] tracking-[0.2em] uppercase mt-1.5 font-semibold">{label}</span>
    </div>
  );
}

export default function CampaignSection() {
  const t = useCountdown();

  return (
    <section id="kampanya" className="py-24 bg-gradient-to-b from-navy-950 to-navy-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {[...Array(6)].map((_, i) => (
        <div key={i} className="particle" style={{ left: `${10 + i * 16}%`, animationDuration: `${12 + i * 2.5}s`, animationDelay: `${i * 2}s` }} />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 bg-gold-500/15 border border-gold-500/35 px-5 py-2.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-300 font-black text-xs tracking-[0.25em] uppercase">
              Lansmana Özel · 29 Kontenjan · Yalnızca {REMAINING} Kaldı
            </span>
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mb-4">
            KAMPANYA <span className="text-gradient-gold">FIRSATINI</span>
            <br />KAÇIRMAYIN
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Lansmana özel fiyatta 29 konuttan <strong className="text-gold-400">{SOLD} tanesi satıldı</strong>, yalnızca{" "}
            <strong className="text-gold-400">{REMAINING} daire</strong> kaldı.
            Kanal İstanbul tamamlanana kadar bu daireler en yüksek getiriyi sunacak.
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-xl mx-auto mb-12">
          <div className="flex justify-between text-xs text-white/40 mb-2 font-semibold">
            <span>{SOLD} daire satıldı</span>
            <span>{REMAINING} daire kaldı</span>
          </div>
          <div className="w-full bg-navy-800 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(SOLD / TOTAL) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
              className="h-3 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 relative"
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-gold-400 border-2 border-navy-900 shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex justify-center gap-3 md:gap-5 mb-14">
          <TimeBlock value={t.days} label="Gün" />
          <div className="flex items-center justify-center text-gold-400 font-black text-2xl pb-5">:</div>
          <TimeBlock value={t.hours} label="Saat" />
          <div className="flex items-center justify-center text-gold-400 font-black text-2xl pb-5">:</div>
          <TimeBlock value={t.mins} label="Dakika" />
          <div className="flex items-center justify-center text-gold-400 font-black text-2xl pb-5">:</div>
          <TimeBlock value={t.secs} label="Saniye" />
        </motion.div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {CAMPAIGN_OFFERS.map((offer, i) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-hover glass-gold rounded-2xl p-6 relative"
            >
              <div className="absolute top-3 right-3 bg-gold-500 text-navy-900 text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider uppercase">
                {offer.tag}
              </div>
              <div className="w-8 h-px bg-gold-500/50 mb-4" />
              <h3 className="font-heading text-base font-bold text-white mb-2 leading-snug">{offer.title}</h3>
              <p className="text-white/45 text-xs leading-relaxed">{offer.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
          <div className="glass-dark rounded-2xl p-8 md:p-10 border border-gold-500/20">
            <h3 className="font-heading text-2xl font-black text-white mb-3">
              Hemen İletişime Geçin
            </h3>
            <p className="text-white/45 text-sm mb-7 leading-relaxed">
              Satış danışmanımız size özel ödeme planı oluşturmak için hazır.
              <br/>
              <span className="text-gold-400 font-semibold">Kampanya dolmadan yerinizi ayırtın.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:05334758499" className="btn-gold px-8 py-3.5 rounded-lg text-sm font-black tracking-wide uppercase flex items-center justify-center gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.7 11.5 19.79 19.79 0 011.63 2.84 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                0533 475 84 99
              </a>
              <button onClick={() => document.querySelector("#talep")?.scrollIntoView({ behavior: "smooth" })} className="btn-outline-gold px-8 py-3.5 rounded-lg text-sm font-black tracking-wide uppercase">
                Online Talep Oluşturun
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
