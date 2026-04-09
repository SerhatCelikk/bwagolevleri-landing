"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    id: "taksit",
    name: "Peşinatsız Taksit",
    tagline: "Hemen Başlayın",
    icon: "📅",
    highlight: false,
    color: "bg-lake-700",
    rows: [
      { type: "1+1", price: "3.496.000 ₺", down: "268.923 ₺", monthly: "268.923 ₺ × 13", extra: "13 ay" },
      { type: "2+1", price: "4.905.000 ₺", down: "377.307 ₺", monthly: "377.307 ₺ × 13", extra: "13 ay" },
      { type: "3+1", price: "6.315.000 ₺", down: "485.769 ₺", monthly: "485.769 ₺ × 13", extra: "13 ay" },
    ],
    note: "Küçük başlangıç peşinatıyla daireyi hemen rezerve edin. 13 eşit taksitle konforlu ödeme.",
  },
  {
    id: "yari",
    name: "%50 Peşinat",
    tagline: "En Esnek Seçenek",
    icon: "⚖️",
    highlight: true,
    color: "bg-gold-500",
    rows: [
      { type: "1+1", price: "3.496.000 ₺", down: "1.748.000 ₺", monthly: "1.748.000 ₺", extra: "Tapuda" },
      { type: "2+1", price: "4.905.000 ₺", down: "2.452.500 ₺", monthly: "2.452.500 ₺", extra: "Tapuda" },
      { type: "3+1", price: "6.315.000 ₺", down: "3.157.500 ₺", monthly: "3.157.500 ₺", extra: "Tapuda" },
    ],
    note: "%50 peşin, kalan %50'yi tapu tesliminde ödeyin. Teslim öncesi finansal esneklik.",
  },
  {
    id: "nakit",
    name: "Nakit Alım",
    tagline: "%10 Özel İskonto",
    icon: "💰",
    highlight: false,
    color: "bg-navy-700",
    rows: [
      { type: "1+1", price: "3.496.000 ₺", down: "—", monthly: "3.146.400 ₺", extra: "%10 indirim" },
      { type: "2+1", price: "4.905.000 ₺", down: "—", monthly: "4.414.500 ₺", extra: "%10 indirim" },
      { type: "3+1", price: "6.315.000 ₺", down: "—", monthly: "5.683.500 ₺", extra: "%10 indirim" },
    ],
    note: "Tamamını nakit ödeyin, %10 özel indirimden faydalanın. En avantajlı ödeme seçeneği.",
  },
];

export default function PricingPlans() {
  const [active, setActive] = useState("yari");

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
            Lansmana özel 3 farklı ödeme planı. İlk 10 daire için geçerli. Hızlı davranın.
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
              <span className="text-xl">{plan.icon}</span>
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
                      {currentPlan.id === "nakit" ? "Nakit Fiyat" : "Peşinat"}
                    </th>
                    <th className="text-right px-8 py-4 text-navy-900/40 text-xs font-bold tracking-[0.2em] uppercase">
                      {currentPlan.id === "taksit" ? "Taksit" : currentPlan.id === "yari" ? "Tapuda" : "Tasarruf"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPlan.rows.map((row, i) => (
                    <tr
                      key={row.type}
                      className={`border-b border-navy-900/5 hover:bg-gold-50 transition-colors ${i === 1 ? "bg-gold-500/3" : ""}`}
                    >
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-2 font-heading text-2xl font-black ${
                          i === 1 ? "text-gold-600" : "text-navy-900"
                        }`}>
                          {row.type}
                          {i === 1 && <span className="text-xs font-sans font-bold bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full">Popüler</span>}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-right text-navy-700/50 text-sm">{row.price}</td>
                      <td className="px-4 py-5 text-right font-semibold text-navy-900 text-sm">{row.down}</td>
                      <td className="px-8 py-5 text-right">
                        <span className={`font-bold text-sm ${i === 1 ? "text-gold-600" : "text-navy-900"}`}>
                          {row.monthly}
                        </span>
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
                Tüm planlar lansmana özel ilk 10 daire için geçerlidir.
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
            { icon: "🤝", title: "Özel Ödeme Planı", desc: "İlk 10 kişiye özel bireysel ödeme planı müzakeresi imkânı." },
            { icon: "🔒", title: "Güvenli Rezervasyon", desc: "Küçük bir rezervasyon bedeli ile kampanya fiyatını kilitleyin." },
            { icon: "📞", title: "Ücretsiz Danışmanlık", desc: "Uzman satış ekibimiz size en uygun planı bulmak için hazır." },
          ].map((item) => (
            <div key={item.title} className="text-center bg-white rounded-2xl p-6 shadow-sm border border-navy-900/5">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-bold text-navy-900 mb-2">{item.title}</h4>
              <p className="text-navy-700/50 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
