"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🌊",
    title: "Kanal İstanbul Güvencesi",
    desc: "İstanbul'un yeni boğazı Kanal İstanbul'un tam güzergahında. Tamamlandığında bu konum katlanarak değer kazanacak.",
    color: "from-lake-700 to-lake-600",
  },
  {
    icon: "🏞️",
    title: "Küçükçekmece Gölü Manzarası",
    desc: "Her sabah balkonunuzdan Küçükçekmece Gölü'nün muhteşem manzarasını izleyin. Göl kıyısı yaşam ayrıcalığı.",
    color: "from-navy-700 to-lake-600",
  },
  {
    icon: "📈",
    title: "Yüksek Yatırım Getirisi",
    desc: "Kanal İstanbul bölgesindeki gayrimenkuller tamamlanma öncesinde %40-80 değer artışı potansiyeli taşıyor.",
    color: "from-gold-600 to-gold-500",
  },
  {
    icon: "🏗️",
    title: "BWA GYO Kalite Güvencesi",
    desc: "Barsan, Winn4 ve Adproje'nin güçlü ortaklığıyla inşa edilen, kalite ve güvenilirlik standartlarının en yükseği.",
    color: "from-navy-800 to-navy-600",
  },
  {
    icon: "🚇",
    title: "Mükemmel Ulaşım",
    desc: "E-5, TEM otoyolları ve metro bağlantısı ile tüm İstanbul'a kolay erişim. Havalimanına 20 dakika.",
    color: "from-lake-700 to-navy-700",
  },
  {
    icon: "🌳",
    title: "Yeşil Yaşam Alanları",
    desc: "Göl kıyısında bol yeşil alan, bisiklet yolları ve yürüyüş parkurlarıyla doğayla iç içe bir yaşam.",
    color: "from-navy-700 to-lake-700",
  },
];

export default function ProjectOverview() {
  return (
    <section id="proje" className="py-24 bg-cream overflow-hidden">
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
            Neden BWA Göl Evleri?
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-navy-900 mb-6">
            Bugün Yatırım Yapın,
            <br />
            <span className="text-gradient-gold">Yarın Kazanın</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-navy-700/70 text-lg max-w-3xl mx-auto leading-relaxed">
            Küçükçekmece Gölü kıyısında Kanal İstanbul güzergahında yer alan bu proje,
            hem yaşam kalitesi hem de yatırım getirisi açısından İstanbul'un en stratejik
            noktasında bulunuyor. Denizin altındaki değeri bugünden yakalayın.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card-hover bg-white rounded-3xl p-8 shadow-sm border border-navy-900/5 group relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                {feat.title}
              </h3>
              <p className="text-navy-700/60 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Canal Istanbul Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-navy-900 via-navy-800 to-lake-700 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold-500/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-lake-500/10 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6 border border-gold-500/30">
              Stratejik Konum Avantajı
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-black text-white mb-4">
              Kanal İstanbul Tamamlandığında
              <br />
              <span className="text-gradient-gold">Bu Lokasyon Altın Değer Taşıyacak</span>
            </h3>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Kanal İstanbul, İstanbul Boğazı'na paralel yeni bir su yolu olarak inşa ediliyor.
              Güzergah üzerindeki mülkler tarihsel olarak büyük değer artışı yaşadı.
              Bugün satın alan, yarın en kazançlı yatırımcı olacak.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              {[
                { val: "45 km", lbl: "Kanal Uzunluğu" },
                { val: "1,000+", lbl: "Geçiş/Gün Tahmin" },
                { val: "Bilgi için arayın", lbl: "Proje Teslim Tarihi" },
              ].map((item) => (
                <div key={item.lbl}>
                  <div className="text-gold-400 font-heading text-2xl font-black">{item.val}</div>
                  <div className="text-white/50 text-xs tracking-wide mt-1">{item.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
