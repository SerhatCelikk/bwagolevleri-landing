import Link from "next/link";
import Image from "next/image";

const faqs = [
  {
    question: "BWA GYO nedir?",
    answer:
      "BWA GYO, Barsan, Winn4 ve Adproje firmalarının ortaklığıyla kurulan bir gayrimenkul yatırım ortaklığıdır. BWA kısaltması bu üç firmanın baş harflerinden oluşmaktadır: Barsan (İnşaat & Geliştirme), Winn4 (Yatırım & Planlama), Adproje (Mimari & Tasarım). Üç firmanın deneyimini bir araya getirerek İstanbul'da prestijli konut projeleri geliştirmektedir.",
  },
  {
    question: "BWA Göl Evleri nerede?",
    answer:
      "BWA Göl Evleri, İstanbul Küçükçekmece ilçesinde, Küçükçekmece Gölü kıyısında ve Kanal İstanbul güzergahında yer almaktadır. TEM Otoyolu'na 3 dakika, Sazlıbosna Köprüsü'ne 3 dakika, İstanbul Havalimanı'na 20 dakika mesafededir.",
  },
  {
    question: "BWA Göl Evleri'nde kaç daire var?",
    answer:
      "Projede toplam 64 daire bulunmaktadır. 1+1, 2+1, 3+1, 2+1 Loft ve dubleks daire seçenekleri mevcuttur. Teras kullanımlı dubleks daireler ve bahçe kullanımlı daireler de bulunmaktadır.",
  },
  {
    question: "BWA Göl Evleri daire fiyatları nedir?",
    answer:
      "Güncel liste fiyatları: 1+1 daireler 3.924.000 ₺, 2+1 daireler 5.507.000 ₺, 3+1 daireler 7.090.000 ₺, 2+1 Loft daireler 7.647.000 ₺'dir. Nakit alımlarda %12,7 özel indirim uygulanmaktadır. Detaylı fiyat ve müsaitlik için 0533 475 84 99 numarasını arayabilirsiniz.",
  },
  {
    question: "Peşinatsız daire alınabilir mi?",
    answer:
      "Evet. \"İlk Ay Peşin + 12 Ay Taksit\" planı ile ilk ayı peşin ödeyip kalan tutarı 12 ay 0 faiz eşit taksitle ödeyebilirsiniz (toplam 13 ödeme, vade farksız): 1+1 → 301.850 ₺ peşin + 12 × 301.850 ₺, 2+1 → 423.615 ₺ peşin + 12 × 423.615 ₺, 3+1 → 545.385 ₺ peşin + 12 × 545.385 ₺, 2+1 Loft → 588.230 ₺ peşin + 12 × 588.230 ₺.",
  },
  {
    question: "Nakit alımda indirim var mı?",
    answer:
      "Evet, nakit alımlarda %12,7 özel indirim uygulanmaktadır. Nakit fiyatlar: 1+1 → 3.426.315 ₺, 2+1 → 4.807.890 ₺, 3+1 → 6.189.470 ₺, 2+1 Loft → 6.675.789 ₺.",
  },
  {
    question: "Hangi ödeme seçenekleri var?",
    answer:
      "Dört farklı ödeme seçeneği sunulmaktadır: (1) %50 Peşinat — kalan %50 tapu tesliminde (31.12.2026), (2) %50 Peşin + 12 Ay 0 Faiz — yarısı şimdi, kalanı 12 ay sıfır faiz taksit, (3) İlk Ay Peşin + 12 Ay Taksit — ilk ay peşin, kalan tutar 12 ay 0 faiz eşit taksit (toplam 13 ödeme), (4) Nakit Alım — %12,7 özel indirim.",
  },
  {
    question: "Göl manzaralı daire var mı?",
    answer:
      "Evet, BWA Göl Evleri Küçükçekmece Gölü kıyısında konumlanmaktadır ve birçok daire göl manzarasına sahiptir. Göl manzaralı daireler sakin ve huzurlu bir yaşam atmosferi sunmaktadır.",
  },
  {
    question: "Proje güvenlik ve sosyal özellikleri nelerdir?",
    answer:
      "BWA Göl Evleri'nde kapalı otopark, çift asansör, 7/24 kamera güvenlik sistemi ve özel peyzaj alanları bulunmaktadır. Teras kullanımlı dubleks ve bahçe kullanımlı daireler ile geniş yaşam alanları sunulmaktadır.",
  },
  {
    question: "Kanal İstanbul projesinin BWA Göl Evleri'ne etkisi ne?",
    answer:
      "BWA Göl Evleri, Kanal İstanbul güzergahında stratejik bir konumda yer almaktadır. Kanal İstanbul, İstanbul Boğazı'na paralel yeni bir su yolu olarak planlanmaktadır. Güzergah üzerindeki mülkler tarihsel olarak büyük değer artışı yaşamaktadır. Sazlıbosna Köprüsü bağlantı yolu ile projenin konum avantajı katlanmaktadır.",
  },
  {
    question: "BWA Göl Evleri'ne ulaşım nasıl?",
    answer:
      "Proje mükemmel ulaşım bağlantılarına sahiptir: TEM Otoyolu'na 3 dakika, Sazlıbosna Köprüsü'ne 3 dakika, İstanbul Havalimanı'na 20 dakika mesafededir. Yakın zamanda açılacak metro hattına da erişim avantajı bulunmaktadır. Çevrede okullar yürüme mesafesinde, Çam Sakura Hastanesi'ne 10 dakika ve Akbatı AVM'ye 10 dakika uzaklıktadır.",
  },
  {
    question: "Barsan, Winn4 ve Adproje hangi firmalardır?",
    answer:
      "Barsan (barsangroup.com), inşaat ve gayrimenkul geliştirme alanında faaliyet gösteren köklü bir firmadır. Winn4 (winn4.com), gayrimenkul yatırım ve planlama konusunda uzmanlaşmıştır. Adproje (adproje.com), mimari tasarım ve proje yönetimi alanında deneyimli bir firmadır. Bu üç firma BWA GYO çatısı altında bir araya gelerek BWA Göl Evleri projesini hayata geçirmektedir.",
  },
  {
    question: "BWA Göl Evleri ile nasıl iletişime geçebilirim?",
    answer:
      "Telefon: 0533 475 84 99, E-posta: iletisim@bwagyo.com, Instagram: @bwa_gyo. Web sitemiz üzerinden de bilgi talep formu doldurabilirsiniz.",
  },
];

export const metadata = {
  title: "Sıkça Sorulan Sorular | BWA Göl Evleri - BWA GYO",
  description:
    "BWA Göl Evleri hakkında sıkça sorulan sorular. BWA GYO nedir, daire fiyatları, ödeme seçenekleri, konum bilgileri, Kanal İstanbul avantajı ve daha fazlası.",
  keywords: [
    "BWA Göl Evleri SSS",
    "BWA GYO nedir",
    "BWA nedir",
    "BWA Gölevleri fiyat",
    "Küçükçekmece daire fiyatları",
    "Kanal İstanbul daire fiyat",
    "BWA Göl Evleri ödeme planı",
    "peşinatsız daire İstanbul",
    "Barsan Winn4 Adproje nedir",
  ],
  alternates: { canonical: "/sss" },
  openGraph: {
    title: "Sıkça Sorulan Sorular | BWA Göl Evleri",
    description:
      "BWA GYO nedir? Daire fiyatları ne kadar? Peşinatsız alınabilir mi? Tüm sorularınızın yanıtları.",
    images: ["/images/catalog.jpg"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function SSSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <section className="bg-navy-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
        <div className="absolute top-20 left-20 w-60 h-60 rounded-full border border-gold-500/8 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gold-400/60 hover:text-gold-400 text-sm mb-8 transition-colors"
          >
            <span>←</span>
            <span>Ana Sayfa</span>
          </Link>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full border-2 border-gold-500/50 flex items-center justify-center bg-navy-900/60">
              <Image src="/logo.svg" alt="BWA GYO" width={46} height={30} className="object-contain" />
            </div>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-white mb-4">
            Sıkça Sorulan <span className="text-gradient-gold">Sorular</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            BWA Göl Evleri ve BWA GYO hakkında merak edilenler
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl p-8 border border-navy-900/5 hover:border-gold-500/20 transition-colors"
              >
                <h2 className="font-heading text-xl font-bold text-navy-900 mb-4 flex items-start gap-3">
                  <span className="text-gold-500 text-lg shrink-0 mt-0.5">?</span>
                  {faq.question}
                </h2>
                <p className="text-navy-700/70 leading-relaxed pl-7">{faq.answer}</p>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-10 text-center">
            <h2 className="font-heading text-2xl font-black text-white mb-3">
              Başka Sorularınız mı Var?
            </h2>
            <p className="text-white/50 mb-6">
              Size yardımcı olmaktan memnuniyet duyarız. Hemen arayın veya bilgi talep formu doldurun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#talep"
                className="btn-gold px-8 py-3 rounded-lg text-sm font-black tracking-wider uppercase text-center"
              >
                Bilgi Talep Et
              </Link>
              <a
                href="tel:05334758499"
                className="btn-outline-gold px-8 py-3 rounded-lg text-sm font-black tracking-wider uppercase text-center"
              >
                0533 475 84 99
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Footer */}
      <footer className="bg-navy-950 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 BWA GYO · Barsan + Winn4 + Adproje. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-white/30 hover:text-gold-400 text-xs transition-colors">
              Ana Sayfa
            </Link>
            <Link href="/hakkimizda" className="text-white/30 hover:text-gold-400 text-xs transition-colors">
              Hakkımızda
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
