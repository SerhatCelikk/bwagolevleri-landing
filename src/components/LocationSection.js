"use client";

import { motion } from "framer-motion";

const distances = [
  { place: "Kanal İstanbul Güzergahı", dist: "Üzerinde", icon: "🌊", highlight: true, detail: "Köprü bağlantı yolu proje önünden geçiyor" },
  { place: "Küçükçekmece Gölü", dist: "Kıyısında", icon: "🏞️", highlight: true, detail: "Göl manzaralı cephe" },
  { place: "Sazlıbosna Köprüsü", dist: "3 dk", icon: "🌉", highlight: true, detail: "Bağlantı yolu proje önünden geçiyor" },
  { place: "TEM Otoyolu", dist: "3 dk", icon: "🛤️", detail: "Havalimanı ve kuzey bağlantısı" },
  { place: "Avcılar Gişeleri", dist: "5 dk", icon: "🛣️", detail: "E-5 ve şehir merkezi" },
  { place: "Okul", dist: "5 dk", icon: "🏫", detail: "Yürüme mesafesinde" },
  { place: "Çam Sakura Hastanesi", dist: "10 dk", icon: "🏥", detail: "Modern sağlık tesisi" },
  { place: "Akbatı Mall of AVM", dist: "10 dk", icon: "🛍️", detail: "Büyük alışveriş ve eğlence merkezi" },
  { place: "Olimpiyat Stadyumu", dist: "10 dk", icon: "🏟️", detail: "Spor ve etkinlik merkezi" },
  { place: "Halkalı Tren Garı", dist: "15 dk", icon: "🚂", detail: "Banliyö tren hattı bağlantısı" },
  { place: "İstanbul Havalimanı", dist: "20 dk", icon: "✈️", detail: "TEM üzerinden direkt bağlantı" },
  { place: "Metro Hattı", dist: "Yakında", icon: "🚇", highlight: true, detail: "Planlanan metro hattına erişim" },
];

export default function LocationSection() {
  return (
    <section id="konum" className="py-24 bg-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold-500/65 text-xs font-bold tracking-[0.3em] uppercase block mb-4">
            Stratejik Konum
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-5">
            İstanbul'un En Değerli Lokasyonu
          </h2>
          <div className="section-divider mb-5" />
          <p className="text-white/45 text-base max-w-2xl mx-auto">
            Tahtakale, Avcılar — Kanal İstanbul güzergahının tam üzerinde, Küçükçekmece Gölü kıyısında,
            E-5 ve metrobüse yürüme mesafesinde.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gold-500/15 h-full min-h-[420px] relative">
              <iframe
                src="https://maps.google.com/maps?q=41.064503,28.733083&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "420px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BWA Göl Evleri Konumu — Küçükçekmece, İstanbul"
              />
              {/* Map overlay badge */}
              <div className="absolute top-4 left-4 glass-dark px-3.5 py-2 rounded-xl pointer-events-none">
                <div className="text-gold-400 text-xs font-bold tracking-wider">BWA GÖL EVLERİ</div>
                <div className="text-white/45 text-[10px]">Tahtakale · Avcılar / İstanbul</div>
              </div>
            </div>
          </motion.div>

          {/* Distance list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-2"
          >
            <h3 className="font-heading text-lg font-bold text-white mb-3">
              Her Şeye <span className="text-gold-400">Yakın</span>
            </h3>
            {distances.map((d, i) => (
              <motion.div
                key={d.place}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                  d.highlight
                    ? "bg-gold-500/12 border border-gold-500/25"
                    : "bg-white/4 border border-white/5 hover:bg-white/7"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-base shrink-0">{d.icon}</span>
                  <div className="min-w-0">
                    <div className={`text-xs font-semibold truncate ${d.highlight ? "text-gold-300" : "text-white/70"}`}>
                      {d.place}
                    </div>
                    <div className="text-white/30 text-[10px] truncate">{d.detail}</div>
                  </div>
                </div>
                <span className={`text-xs font-black shrink-0 ml-2 ${d.highlight ? "text-gold-400" : "text-white/40"}`}>
                  {d.dist}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Kanal Istanbul context banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-10 bg-gradient-to-r from-navy-800 via-lake-700 to-navy-800 rounded-2xl p-8 md:p-10 text-center border border-lake-600/20"
        >
          <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-5 border border-gold-500/25">
            Yatırım Değeri
          </span>
          <h3 className="font-heading text-2xl md:text-3xl font-black text-white mb-3">
            Kanal İstanbul Güzergahında Olmak Ne Anlama Gelir?
          </h3>
          <p className="text-white/55 text-sm md:text-base max-w-2xl mx-auto mb-6 leading-relaxed">
            Tarihsel olarak İstanbul'da yeni ulaşım ve altyapı projeleri güzergah boyundaki
            gayrimenkul değerlerini %40–120 artırmıştır. Kanal İstanbul, bu bölgeyi
            İstanbul'un yeni kıyı hattına dönüştürecek. Bugün doğru lokasyondasınız.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { val: "Güzergah Üzerinde", lbl: "Kanal İstanbul" },
              { val: "3 dk", lbl: "Sazlıbosna Köprüsü" },
              { val: "Yakında", lbl: "Metro Hattı" },
            ].map((item) => (
              <div key={item.lbl} className="text-center">
                <div className="text-gold-400 font-heading text-xl font-black">{item.val}</div>
                <div className="text-white/40 text-xs tracking-wide mt-0.5">{item.lbl}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
