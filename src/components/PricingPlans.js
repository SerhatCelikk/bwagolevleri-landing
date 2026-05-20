"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "yari_tapu",
    name: "%50 Peşinat",
    tagline: "Tapu Teslim Avantajı",
    color: "bg-lake-700",
    headers: { down: "%50 Peşin", monthly: "Tapu Tesliminde" },
    rows: [
      { type: "1+1",      price: "3.924.000 ₺", down: "1.962.000 ₺", monthly: "1.962.000 ₺", extra: "31.12.2026" },
      { type: "2+1",      price: "5.507.000 ₺", down: "2.753.500 ₺", monthly: "2.753.500 ₺", extra: "31.12.2026" },
      { type: "3+1",      price: "7.090.000 ₺", down: "3.545.000 ₺", monthly: "3.545.000 ₺", extra: "31.12.2026" },
      { type: "2+1 Loft", price: "7.647.000 ₺", down: "3.823.500 ₺", monthly: "3.823.500 ₺", extra: "31.12.2026" },
    ],
    note: "%50 peşin, kalan %50'yi 31.12.2026 tapu tesliminde ödeyin. Teslim öncesi finansal esneklik.",
  },
  {
    id: "yari_taksit",
    name: "%50 Peşin + 12 Ay 0 Faiz",
    tagline: "En Esnek Seçenek",
    highlight: true,
    color: "bg-gold-500",
    headers: { down: "%50 Peşin", monthly: "12 Ay Taksit" },
    rows: [
      { type: "1+1",      price: "3.924.000 ₺", down: "1.962.000 ₺", monthly: "163.500 ₺", extra: "12 ay × 163.500 ₺" },
      { type: "2+1",      price: "5.507.000 ₺", down: "2.753.500 ₺", monthly: "229.460 ₺", extra: "12 ay × 229.460 ₺" },
      { type: "3+1",      price: "7.090.000 ₺", down: "3.545.000 ₺", monthly: "295.420 ₺", extra: "12 ay × 295.420 ₺" },
      { type: "2+1 Loft", price: "7.647.000 ₺", down: "3.823.500 ₺", monthly: "318.630 ₺", extra: "12 ay × 318.630 ₺" },
    ],
    note: "%50 peşinat + kalan tutarın 12 ay 0 faiz taksiti. En esnek ödeme planı.",
  },
  {
    id: "taksit",
    name: "İlk Ay Peşin + 12 Ay Taksit",
    tagline: "Vade Farksız, 0 Faiz",
    color: "bg-navy-700",
    headers: { down: "İlk Ay Peşin", monthly: "12 Ay Taksit" },
    rows: [
      { type: "1+1",      price: "3.924.000 ₺", down: "301.850 ₺", monthly: "301.850 ₺", extra: "12 ay × 301.850 ₺" },
      { type: "2+1",      price: "5.507.000 ₺", down: "423.615 ₺", monthly: "423.615 ₺", extra: "12 ay × 423.615 ₺" },
      { type: "3+1",      price: "7.090.000 ₺", down: "545.385 ₺", monthly: "545.385 ₺", extra: "12 ay × 545.385 ₺" },
      { type: "2+1 Loft", price: "7.647.000 ₺", down: "588.230 ₺", monthly: "588.230 ₺", extra: "12 ay × 588.230 ₺" },
    ],
    note: "İlk ayı peşin ödeyin, kalanını 12 ay 0 faiz eşit taksitle. Toplam 13 ödeme, vade farksız.",
  },
  {
    id: "nakit",
    name: "Nakit Alım",
    tagline: "%12,7 Özel İndirim",
    color: "bg-navy-900",
    headers: { down: "Nakit Fiyat", monthly: "Tasarruf" },
    rows: [
      { type: "1+1",      price: "3.924.000 ₺", down: "3.426.315 ₺", monthly: "497.685 ₺", extra: "%12,7 indirim" },
      { type: "2+1",      price: "5.507.000 ₺", down: "4.807.890 ₺", monthly: "699.110 ₺", extra: "%12,7 indirim" },
      { type: "3+1",      price: "7.090.000 ₺", down: "6.189.470 ₺", monthly: "900.530 ₺", extra: "%12,7 indirim" },
      { type: "2+1 Loft", price: "7.647.000 ₺", down: "6.675.789 ₺", monthly: "971.211 ₺", extra: "%12,7 indirim" },
    ],
    note: "Tamamını nakit ödeyin, %12,7 özel indirimle en avantajlı fiyatı yakalayın.",
  },
];

export default function PricingPlans() {
  const [active, setActive] = useState("yari_taksit");

  const currentPlan = plans.find((p) => p.id === active);

  return (
    <section id="fiyatlar" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold-600 text-sm font-semibold tracking-[0.3em] uppercase block mb-4">
            Ödeme Planları
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-900 mb-6">
            Size En Uygun
            <br />
            <span className="text-gradient-gold">Ödeme Seçeneğini Belirleyin</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-navy-700/60 text-lg max-w-2xl mx-auto">
            Lansmana özel 3 farklı ödeme planı. Hızlı davranın.
          </p>
        </motion.div>

        {/* Plan Selector */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActive(plan.id)}
              className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold tracking-wide text-sm transition-all duration-300 border-2 ${
                active === plan.id
                  ? "border-gold-500 bg-gold-500/10 text-navy-900"
                  : "border-navy-200 text-navy-700/60 hover:border-gold-300"
              }`}
            >
              {plan.highlight && active === plan.id && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-white text-[10px] font-black px-3 py-0.5 rounded-full tracking-widest whitespace-nowrap">
                  ÖNERİLEN
                </span>
              )}
              {plan.icon && <span className="text-xl">{plan.icon}</span>}
              <div className="text-left">
                <div className={active === plan.id ? "text-navy-900 font-bold" : ""}>{plan.name}</div>
                <div className={`text-xs ${active === plan.id ? "text-gold-600" : "text-navy-700/40"}`}>{plan.tagline}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Active Plan Table */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-navy-900/5">
            {/* Plan Header */}
            <div className={`${currentPlan.color} px-8 py-8 text-white`}>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{currentPlan.icon}</span>
                <div>
                  <h3 className="font-heading text-2xl font-black">{currentPlan.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{currentPlan.note}</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-900/5 bg-navy-900/2">
                    <th className="text-left px-8 py-4 text-navy-900/40 text-xs font-bold tracking-[0.2em] uppercase">Daire Tipi</th>
                    <th className="text-right px-4 py-4 text-navy-900/40 text-xs font-bold tracking-[0.2em] uppercase">Liste Fiyatı</th>
                    <th className="text-right px-4 py-4 text-navy-900/40 text-xs font-bold tracking-[0.2em] uppercase">
                      {currentPlan.headers.down}
                    </th>
                    <th className="text-right px-8 py-4 text-navy-900/40 text-xs font-bold tracking-[0.2em] uppercase">
                      {currentPlan.headers.monthly}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPlan.rows.map((row) => (
                    <tr
                      key={row.type}
                      className="border-b border-navy-900/5 hover:bg-gold-50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <span className="font-heading text-2xl font-black text-navy-900">
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-right text-navy-700/50 text-sm">{row.price}</td>
                      <td className="px-4 py-5 text-right font-semibold text-navy-900 text-sm">{row.down}</td>
                      <td className="px-8 py-5 text-right">
                        <span className="font-bold text-sm text-navy-900">{row.monthly}</span>
                        <div className="text-xs text-navy-700/40 mt-0.5">{row.extra}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-navy-900/2 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-navy-700/50 text-sm flex items-center gap-2">
                <span className="text-gold-500">ℹ</span>
                Fiyatlar lansmana özel olup değişkenlik gösterebilir.
              </p>
              <button
                onClick={() => document.querySelector("#talep")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-gold px-8 py-3 rounded-full text-sm font-bold tracking-wider whitespace-nowrap"
              >
                Bu Planla İlgileniyorum →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { title: "Özel Ödeme Planı", desc: "Seçili alıcılara özel bireysel ödeme planı müzakeresi imkânı." },
            { title: "Güvenli Rezervasyon", desc: "Küçük bir rezervasyon bedeli ile kampanya fiyatını kilitleyin." },
            { title: "Ücretsiz Danışmanlık", desc: "Uzman satış ekibimiz size en uygun planı bulmak için hazır." },
          ].map((item) => (
            <div key={item.title} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-navy-900/5">
              <div className="w-8 h-px bg-gold-400/60 mx-auto mb-4" />
              <h4 className="font-bold text-navy-900 mb-2">{item.title}</h4>
              <p className="text-navy-700/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
