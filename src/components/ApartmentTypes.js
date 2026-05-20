"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const apartments = [
  {
    type: "1+1",
    netArea: "43,05 m²",
    brutArea: "51,42 m²",
    badge: "Yatırım İçin İdeal",
    features: [
      "Salon + Mutfak: 24,39 m²",
      "Yatak odası: 13,80 m²",
      "Balkon: 1,89 m²",
      "Kapalı otopark",
      "Çift asansör",
      "7/24 kamera güvenlik",
    ],
    desc: "Yatırım amaçlı veya çalışan çiftler için kompakt ve tam donanımlı yaşam alanı.",
    accentColor: "#1e6fa8",
    headerBg: "from-lake-700 to-lake-600",
  },
  {
    type: "2+1",
    netArea: "71,00 m²",
    brutArea: "85,50 m²",
    badge: "Aile Tipi",
    features: [
      "Salon: 16,90 m² + Mutfak: 9,77 m²",
      "Ebeveyn odası: 14,71 m²",
      "2 balkon (3,81 m² + 3,27 m²)",
      "Kiler + hol + WC",
      "Kapalı otopark",
      "7/24 kamera güvenlik",
    ],
    desc: "Aile yaşamı için tasarlanmış geniş ve ferah plan. İki balkon, kiler ve ayrı WC.",
    accentColor: "#c9a84c",
    headerBg: "from-navy-800 to-gold-600",
  },
  {
    type: "3+1",
    netArea: "89,34 m²",
    brutArea: "107,73 m²",
    badge: "Geniş Aile",
    features: [
      "Salon: 18,44 m² + Mutfak: 10,95 m²",
      "3 yatak odası (ebeveyn dahil)",
      "2 balkon (4,46 m² + 4,04 m²)",
      "Kiler + hol + WC",
      "Kapalı otopark",
      "7/24 kamera güvenlik",
    ],
    desc: "Geniş aileler için ferah ve işlevsel tasarım. Kanal İstanbul güzergahında 3+1 ayrıcalığı.",
    accentColor: "#0a1628",
    headerBg: "from-navy-900 to-navy-700",
  },
  {
    type: "2+1 Loft",
    netArea: "83,99 m²",
    brutArea: "101,87 m²",
    badge: "Teras Kullanımlı",
    features: [
      "Alt kat: salon + mutfak + balkon",
      "Üst kat: 2 yatak odası + banyo",
      "Özel teras: 8,28 m²",
      "İki katlı özel yaşam alanı",
      "Kapalı otopark",
      "7/24 kamera güvenlik",
    ],
    desc: "İki katlı özel yaşam konforu. Üst katta geniş teras ile göl manzarasının tamamı sizin.",
    accentColor: "#7c6128",
    headerBg: "from-gold-600 to-navy-800",
  },
  {
    type: "Dubleks 4+1",
    netArea: "123,61 m²",
    brutArea: "149,45 m²",
    badge: "Ultra Prestij",
    features: [
      "4 yatak odası, iki tam kat",
      "Alt kat: yatak odası + salon + mutfak",
      "Üst kat: 3 yatak + banyo + teras",
      "Maksimum göl manzarası",
      "Kapalı otopark",
      "7/24 kamera güvenlik",
    ],
    desc: "Projede en geniş ve en prestijli daire tipi. İki katlı özel yaşam alanı ve geniş teras.",
    accentColor: "#0a1628",
    headerBg: "from-navy-950 to-gold-700",
  },
];

export default function ApartmentTypes() {
  const [active, setActive] = useState(1);

  return (
    <section id="daireler" className="py-24 bg-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold-500/70 text-xs font-bold tracking-[0.3em] uppercase block mb-4">
            Daire Seçenekleri
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-5">
            Size Uygun Daireyi Seçin
          </h2>
          <div className="section-divider mb-5" />
          <p className="text-white/45 text-base max-w-xl mx-auto">
            64 daireli projede 1+1'den dubleks 4+1'e kadar geniş seçenek yelpazesi.
            Bahçe kullanımlı ve göl manzaralı daireler de mevcuttur.
          </p>
        </motion.div>

        {/* Grid — items-stretch ensures equal height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {apartments.map((apt, i) => (
            <motion.div
              key={apt.type}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              onClick={() => setActive(i)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-400 ${
                active === i
                  ? "ring-2 ring-gold-400 shadow-2xl shadow-gold-500/15 scale-[1.02]"
                  : "opacity-75 hover:opacity-95 hover:scale-[1.01]"
              }`}
            >

              {/* Header */}
              <div className={`bg-gradient-to-br ${apt.headerBg} px-7 py-7 relative overflow-hidden shrink-0`}>
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
                <span className="inline-block text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase bg-white/15 px-2.5 py-1 rounded-full mb-3">
                  {apt.badge}
                </span>
                <div className="text-white font-heading text-4xl font-black mb-1">{apt.type}</div>
                <div className="flex gap-3 text-white/65 text-xs font-medium">
                  <span>Net: <strong className="text-white/90">{apt.netArea}</strong></span>
                  <span>·</span>
                  <span>Brüt: <strong className="text-white/90">{apt.brutArea}</strong></span>
                </div>
              </div>

              {/* Body — flex-grow ensures cards stretch equally */}
              <div className="bg-white px-7 py-7 flex flex-col flex-grow">
                {/* Area info */}
                <div className="mb-5 pb-5 border-b border-navy-900/8">
                  <div className="text-navy-900/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Fiyat</div>
                  <div className="font-heading text-base font-black text-navy-900/50 italic">
                    Satış ekibimizle iletişime geçin
                  </div>
                </div>

                <p className="text-navy-700/55 text-sm leading-relaxed mb-5">{apt.desc}</p>

                <ul className="space-y-2 flex-grow">
                  {apt.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-navy-700/65">
                      <span className="text-gold-500 mt-0.5 shrink-0 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    document.querySelector("#talep")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`mt-7 w-full py-3 rounded-xl font-bold tracking-wide text-sm transition-all duration-300 ${
                    active === i
                      ? "btn-gold"
                      : "border-2 border-navy-200 text-navy-700 hover:border-gold-400 hover:text-gold-700"
                  }`}
                >
                  Bu Daireyi İstiyorum
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bahçe katı note */}
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
