"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Kanal İstanbul Güzergahı",
    desc: "Kanal İstanbul güzergahında stratejik konum. Sazlıbosna Köprüsü bağlantı yolu proje önünden geçiyor.",
  },
  {
    title: "Göl Manzaralı Daireler",
    desc: "Küçükçekmece Gölü'ne nazır daireler. Göl kıyısında sakin yaşam ayrıcalığı.",
  },
  {
    title: "Teras & Bahçe Daireler",
    desc: "Teras kullanımlı dubleks ve bahçe kullanımlı daireler. Geniş özel yaşam alanı.",
  },
  {
    title: "Tam Donanımlı Altyapı",
    desc: "Kapalı otopark, çift asansör, 7/24 kamera güvenlik ve özel peyzaj alanları.",
  },
  {
    title: "Ulaşım Bağlantısı",
    desc: "TEM'e 3 dk · Havalimanı'na 20 dk · Yakın zamanda açılacak metro hattına erişim.",
  },
  {
    title: "Günlük Yaşama Yakınlık",
    desc: "Okul yürüme mesafesinde · Çam Sakura Hastanesi 10 dk · Akbatı AVM 10 dk.",
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
            Projenin
            <br />
            <span className="text-gradient-gold">Öne Çıkan Özellikleri</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-navy-700/70 text-lg max-w-2xl mx-auto leading-relaxed">
            64 daire · 1+1'den dubleks 4+1'e · Göl kıyısı · Kanal İstanbul güzergahı
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-navy-900/8 border border-navy-900/8 rounded-2xl overflow-hidden">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white px-8 py-8 group hover:bg-gold-50/60 transition-colors duration-300 relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gold-500/50 font-heading text-xs font-black tracking-[0.2em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-px bg-gold-400/25" />
              </div>
              <h3 className="font-heading text-base font-bold text-navy-900 mb-2 group-hover:text-gold-700 transition-colors leading-snug">
                {feat.title}
              </h3>
              <p className="text-navy-700/55 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Canal Istanbul Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-navy-900 via-navy-800 to-lake-700 rounded-3xl p-6 sm:p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold-500/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-lake-500/10 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6 border border-gold-500/30">
              Stratejik Konum Avantajı
            </span>
            <h3 className="font-heading text-xl sm:text-2xl md:text-4xl font-black text-white mb-4 leading-tight break-words">
              Kanal İstanbul Tamamlandığında
              <br />
              <span className="text-gradient-gold">Bu Lokasyon Altın Değer Taşıyacak</span>
            </h3>
            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Güzergah üzerindeki mülkler tarihsel olarak %40–120 değer artışı yaşadı.
              Bu lokasyonda doğru zamanda olmak, en kazançlı yatırımı yapmak demektir.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              {[
                { val: "64 Daire", lbl: "Toplam Konut" },
                { val: "Haziran 2027", lbl: "Proje Teslimi" },
                { val: "3 dk", lbl: "Sazlıbosna Köprüsü" },
                { val: "Yakında", lbl: "Metro Hattı" },
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
