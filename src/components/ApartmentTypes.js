"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const apartments = [
  {
    type: "1+1",
    size: "50–65 m²",
    price: "3.450.000 ₺",
    badge: "Yatırım İçin İdeal",
    features: [
      "Göl manzaralı balkon",
      "Açık mutfak konsepti",
      "Yerden ısıtma sistemi",
      "Akıllı ev teknolojisi",
      "Güvenlik ve kamera sistemi",
      "1 araçlık kapalı otopark",
    ],
    desc: "Hem kiralık hem satılık yatırım için mükemmel seçenek. Göl manzaralı balkon ile huzurlu bir yaşam.",
    accentColor: "#1e6fa8",
    headerBg: "from-lake-700 to-lake-600",
  },
  {
    type: "2+1",
    size: "90–110 m²",
    price: "4.785.000 ₺",
    badge: "En Çok Tercih Edilen",
    popular: true,
    features: [
      "Panoramik göl ve kanal manzarası",
      "Geniş oturma odası",
      "Master yatak odası + ikinci oda",
      "2 banyo (1 ebeveyn banyolu)",
      "Yerden ısıtma sistemi",
      "Akıllı ev teknolojisi",
      "Güvenlik ve kamera sistemi",
      "1 araçlık kapalı otopark",
    ],
    desc: "Aileler için geniş yaşam alanı. Göl manzaralı panoramik cephesiyle en çok talep gören daire tipi.",
    accentColor: "#c9a84c",
    headerBg: "from-navy-800 to-gold-600",
  },
  {
    type: "3+1",
    size: "130–160 m²",
    price: "5.900.000 ₺",
    badge: "Ultra Prestij",
    features: [
      "360° göl ve şehir panoraması",
      "Geniş teras balkon",
      "3 tam banyo",
      "Ebeveyn banyolu master suite",
      "Açık plan mutfak & salon",
      "Yerden ısıtma + klima (tüm odalar)",
      "Akıllı ev paketi (tam donanım)",
      "2 araçlık kapalı otopark",
    ],
    desc: "Geniş aileler ve üst segment yaşam arayanlar için. Teras balkon, panoramik manzara ve tam donanım.",
    accentColor: "#0a1628",
    headerBg: "from-navy-900 to-navy-700",
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
            Tüm daireler Küçükçekmece Gölü manzaralı, akıllı ev sistemli ve üst segment iç mekan tasarımlıdır.
          </p>
        </motion.div>

        {/* Grid — items-stretch ensures equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {apartments.map((apt, i) => (
            <motion.div
              key={apt.type}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              onClick={() => setActive(i)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-400 ${
                active === i
                  ? "ring-2 ring-gold-400 shadow-2xl shadow-gold-500/15 scale-[1.02]"
                  : "opacity-75 hover:opacity-95 hover:scale-[1.01]"
              }`}
            >
              {/* Popular badge */}
              {apt.popular && (
                <div className="absolute top-3 right-3 z-20 bg-gold-500 text-navy-900 text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest uppercase">
                  ★ Popüler
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-br ${apt.headerBg} px-7 py-7 relative overflow-hidden shrink-0`}>
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,white,transparent)]" />
                <span className="inline-block text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase bg-white/15 px-2.5 py-1 rounded-full mb-3">
                  {apt.badge}
                </span>
                <div className="text-white font-heading text-5xl font-black mb-0.5">{apt.type}</div>
                <div className="text-white/60 text-sm font-medium">{apt.size}</div>
              </div>

              {/* Body — flex-grow ensures cards stretch equally */}
              <div className="bg-white px-7 py-7 flex flex-col flex-grow">
                {/* Price */}
                <div className="mb-5 pb-5 border-b border-navy-900/8">
                  <div className="text-navy-900/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Fiyat</div>
                  <div className="font-heading text-2xl font-black" style={{ color: apt.accentColor }}>
                    {apt.price}
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/25 text-xs mt-8 tracking-wide"
        >
          Fiyatlar kata ve cepheye göre değişkenlik gösterebilir. Kesin bilgi için satış ekibimizle iletişime geçin.
        </motion.p>
      </div>
    </section>
  );
}
