"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "BARSAN", subtitle: "İnşaat & Geliştirme", letter: "B" },
  { name: "WINN4", subtitle: "Yatırım & Planlama", letter: "W" },
  { name: "ADPROJE", subtitle: "Mimari & Tasarım", letter: "A" },
];

const stats = [
  { value: "3", label: "Güçlü Ortak", suffix: "" },
  { value: "15+", label: "Yıllık Deneyim", suffix: "" },
  { value: "1.000+", label: "Mutlu Aile", suffix: "" },
  { value: "₺5", label: "Milyar+ Portföy", suffix: "B" },
];

export default function TrustBar() {
  return (
    <section className="bg-navy-900 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-6">
            Güçlü Ortaklık Yapısı · BWA GYO
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-0">
            {partners.map((p, i) => (
              <div key={p.name} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-3 px-8 py-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center group-hover:bg-gold-500/30 transition-colors">
                    <span className="text-gold-400 font-bold text-lg font-heading">{p.letter}</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-lg tracking-wider">{p.name}</div>
                    <div className="text-white/40 text-xs tracking-wide">{p.subtitle}</div>
                  </div>
                </motion.div>
                {i < partners.length - 1 && (
                  <div className="hidden md:flex items-center gap-2 text-gold-500/50">
                    <div className="w-1 h-1 rounded-full bg-gold-500/50" />
                    <span className="text-gold-500/70 font-light">×</span>
                    <div className="w-1 h-1 rounded-full bg-gold-500/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-gold-400/60 text-sm mt-4 tracking-wide">
            = <span className="text-gold-400 font-semibold">BWA GYO</span> · Barsan + Winn4 + Adproje Güçlü Ortaklığı
          </p>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-gradient-gold font-heading text-3xl md:text-4xl font-black">
                {s.value}
              </div>
              <div className="text-white/50 text-sm mt-1 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
