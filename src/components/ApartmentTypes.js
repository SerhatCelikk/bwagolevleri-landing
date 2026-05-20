"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { trackPhoneClick, trackCTAClick } from "@/lib/analytics";

const CONTACT_PHONE = "+905334758499";
const WA_BASE = `https://wa.me/${CONTACT_PHONE.replace("+", "")}`;

const apartments = [
  {
    type: "1+1",
    badge: "Yatırım İçin İdeal",
    badgeColor: "#c9a84c",
    netArea: "43,05 m²",
    grossArea: "51,42 m²",
    price: "3.924.000 ₺",
    monthlyNote: "301.850 ₺ × 13 taksit",
    rooms: [
      { name: "Salon + Mutfak", area: "24,39 m²" },
      { name: "Yatak Odası", area: "13,80 m²" },
      { name: "Banyo / WC", area: "—" },
      { name: "Balkon", area: "1,89 m²" },
    ],
  },
  {
    type: "2+1",
    badge: "Aile Tipi",
    badgeColor: "#2e8fd4",
    netArea: "71,00 m²",
    grossArea: "85,50 m²",
    price: "5.507.000 ₺",
    monthlyNote: "423.615 ₺ × 13 taksit",
    rooms: [
      { name: "Salon", area: "16,90 m²" },
      { name: "Mutfak", area: "9,77 m²" },
      { name: "Ebeveyn Yatak Odası", area: "14,71 m²" },
      { name: "Balkon 1 + Balkon 2", area: "3,81 + 3,27 m²" },
    ],
  },
  {
    type: "3+1",
    badge: "Geniş Aile",
    badgeColor: "#a78bfa",
    netArea: "89,34 m²",
    grossArea: "107,73 m²",
    price: "7.090.000 ₺",
    monthlyNote: "545.385 ₺ × 13 taksit",
    rooms: [
      { name: "Salon", area: "18,44 m²" },
      { name: "Mutfak", area: "10,95 m²" },
      { name: "3 Yatak Odası", area: "—" },
      { name: "Balkon 1 + Balkon 2", area: "4,46 + 4,04 m²" },
    ],
  },
  {
    type: "2+1 Loft",
    badge: "Teras Kullanımlı",
    badgeColor: "#34d399",
    netArea: "83,99 m²",
    grossArea: "101,87 m²",
    price: "7.647.000 ₺",
    monthlyNote: "588.230 ₺ × 13 taksit",
    rooms: [
      { name: "Alt Kat — Salon + Mutfak", area: "—" },
      { name: "Alt Kat — Balkon", area: "—" },
      { name: "Üst Kat — 2 Yatak + Banyo", area: "—" },
      { name: "Özel Teras", area: "8,28 m²" },
    ],
  },
  {
    type: "Dubleks 4+1",
    badge: "Ultra Prestij",
    badgeColor: "#f87171",
    netArea: "123,61 m²",
    grossArea: "149,45 m²",
    price: null,
    monthlyNote: null,
    rooms: [
      { name: "Alt Kat — 1 Yatak + Salon + Mutfak", area: "—" },
      { name: "Üst Kat — 3 Yatak + Banyo", area: "—" },
      { name: "Özel Teras", area: "—" },
      { name: "Maksimum Göl Manzarası", area: "—" },
    ],
  },
];

export default function ApartmentTypes() {
  const [active, setActive] = useState(1);
  const unit = apartments[active];

  return (
    <section id="daireler" className="py-24 bg-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold-500/70 text-xs font-bold tracking-[0.3em] uppercase block mb-3">
            Daire Tipleri
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-3">
            5 Farklı <span className="text-gradient-gold">Yaşam Seçeneği</span>
          </h2>
          <p className="text-white/45 text-sm md:text-base max-w-2xl mx-auto">
            1+1, 2+1, 3+1, 2+1 Loft ve Dubleks 4+1 — her ihtiyaca uygun daire tipi
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap gap-2 justify-center"
        >
          {apartments.map((u, i) => {
            const isActive = active === i;
            return (
              <button
                key={u.type}
                onClick={() => { setActive(i); trackCTAClick(`apartment_${u.type}`); }}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all"
                style={
                  isActive
                    ? { backgroundColor: u.badgeColor, color: "#fff", boxShadow: `0 4px 16px ${u.badgeColor}50` }
                    : { backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {u.type}
              </button>
            );
          })}
        </motion.div>

        {/* Card */}
        <motion.div
          key={unit.type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f2040]"
        >
          <div className="grid md:grid-cols-2">
            {/* Left: specs */}
            <div className="p-6 lg:p-8">
              {/* Badge + type */}
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: unit.badgeColor + "20", color: unit.badgeColor, border: `1px solid ${unit.badgeColor}40` }}
                >
                  {unit.badge}
                </span>
                <h3 className="font-heading text-3xl font-black text-white">{unit.type}</h3>
              </div>

              {/* Area specs */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">Net Alan</p>
                  <p className="mt-1 text-xl font-bold text-white">{unit.netArea}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">Brüt Alan</p>
                  <p className="mt-1 text-xl font-bold text-white">{unit.grossArea}</p>
                </div>
              </div>

              {/* Room breakdown */}
              <div className="space-y-2">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">
                  Oda Dağılımı
                </p>
                {unit.rooms.map((room, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-white/[0.03] px-4 py-2.5">
                    <span className="text-sm text-white/70">{room.name}</span>
                    {room.area !== "—" && (
                      <span className="text-sm font-semibold" style={{ color: unit.badgeColor }}>
                        {room.area}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: pricing + CTAs */}
            <div
              className="flex flex-col justify-between p-6 lg:p-8"
              style={{
                background: `linear-gradient(135deg, ${unit.badgeColor}12 0%, transparent 60%)`,
                borderLeft: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-white/40">Fiyat</p>
                {unit.price ? (
                  <>
                    <p className="font-heading text-3xl lg:text-4xl font-black text-white">{unit.price}</p>
                    {unit.monthlyNote && (
                      <p className="mt-2 text-sm" style={{ color: unit.badgeColor }}>
                        veya {unit.monthlyNote}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-white/30">
                      * Fiyatlar kata ve cepheye göre değişkenlik gösterebilir
                    </p>
                  </>
                ) : (
                  <div>
                    <p className="font-heading text-2xl font-black text-white">Fiyat için arayın</p>
                    <p className="mt-2 text-sm text-white/40">Satış ekibimizle görüşün</p>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={`${WA_BASE}?text=${encodeURIComponent(`Websitenizden ulaşıyorum. BWA Göl Evleri ${unit.type} daire hakkında bilgi almak istiyorum.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCTAClick(`whatsapp_apartment_${unit.type}`)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: unit.badgeColor }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {unit.type} için WhatsApp
                </a>
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  onClick={() => trackPhoneClick(`apartment_${unit.type}`)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-bold text-white/80 transition-all hover:bg-white/10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.7 11.5 19.79 19.79 0 011.63 2.84 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Hemen Ara
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Garden floor info — bwagyo özel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 glass-gold rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <div className="text-gold-400 font-bold text-sm tracking-wide mb-1">Bahçe Katı Daireler</div>
            <p className="text-white/50 text-xs leading-relaxed">
              1+1 (69,51 m²), 2+1 (102,87–116,10 m²) ve 3+1 (136,29 m²) bahçe kullanımlı özel daireler de mevcuttur.
              Geniş özel bahçe ve teras alanlarıyla farklı bir yaşam deneyimi sunar.
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#talep")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline-gold shrink-0 px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase"
          >
            Bilgi Alın
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/25 text-xs mt-6 tracking-wide"
        >
          Fiyatlar kata, cepheye ve ödeme planına göre değişkenlik gösterebilir. Kesin bilgi için satış ekibimizle iletişime geçin.
        </motion.p>
      </div>
    </section>
  );
}
