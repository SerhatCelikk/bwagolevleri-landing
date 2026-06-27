import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Hakkımızda | BWA GYO - Barsan Winn4 Adproje Ortaklığı",
  description:
    "BWA GYO, Barsan, Winn4 ve Adproje firmalarının ortaklığıyla kurulan gayrimenkul yatırım ortaklığıdır. Küçükçekmece Gölü kıyısında BWA Göl Evleri projesini hayata geçirmektedir.",
  keywords: [
    "BWA GYO",
    "BWA nedir",
    "Barsan Winn4 Adproje",
    "Barsan Winn4 Adproje ortaklığı",
    "BWA Göl Evleri hakkında",
    "BWA GYO ortakları",
    "Barsan inşaat",
    "Winn4 yatırım",
    "Adproje mimarlık",
  ],
  alternates: { canonical: "/hakkimizda" },
  openGraph: {
    title: "BWA GYO Hakkında | Barsan + Winn4 + Adproje Ortaklığı",
    description:
      "BWA GYO, Barsan, Winn4 ve Adproje ortaklığıyla kurulan güvenilir gayrimenkul yatırım şirketidir.",
    images: ["/images/catalog.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "BWA GYO Hakkında",
  description:
    "BWA GYO, Barsan, Winn4 ve Adproje firmalarının ortaklığıyla kurulan gayrimenkul yatırım ortaklığıdır.",
  mainEntity: {
    "@type": "Organization",
    name: "BWA GYO",
    alternateName: ["BWA", "Barsan Winn4 Adproje"],
    description:
      "BWA GYO, Barsan (İnşaat & Geliştirme), Winn4 (Yatırım & Planlama) ve Adproje (Mimari & Tasarım) firmalarının ortaklığıyla kurulan gayrimenkul yatırım ortaklığıdır. BWA kısaltması bu üç firmanın baş harflerinden oluşmaktadır: Barsan, Winn4, Adproje.",
    url: "https://bwagyo.com",
    logo: "https://bwagyo.com/logo.svg",
    foundingDate: "2024",
    founders: [
      { "@type": "Organization", name: "Barsan", url: "https://www.barsangroup.com/" },
      { "@type": "Organization", name: "Winn4", url: "https://winn4insaat.com/" },
      { "@type": "Organization", name: "Adproje", url: "https://www.adproje.com/" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-533-475-84-99",
      contactType: "sales",
      availableLanguage: "Turkish",
    },
  },
};

const partners = [
  {
    name: "Barsan",
    role: "İnşaat & Geliştirme",
    url: "https://www.barsangroup.com/",
    description:
      "Barsan Group, inşaat ve gayrimenkul geliştirme alanında faaliyet gösteren köklü bir firmadır. BWA GYO ortaklığında projenin inşaat ve geliştirme süreçlerini yürütmektedir.",
  },
  {
    name: "Winn4",
    role: "Yatırım & Planlama",
    url: "https://winn4insaat.com/",
    description:
      "Winn4, gayrimenkul yatırım ve planlama konusunda uzmanlaşmış bir firmadır. BWA GYO bünyesinde projenin yatırım stratejisi ve finansal planlamasından sorumludur.",
  },
  {
    name: "Adproje",
    role: "Mimari & Tasarım",
    url: "https://www.adproje.com/",
    description:
      "Adproje, mimari tasarım ve proje yönetimi alanında deneyimli bir firmadır. BWA Göl Evleri projesinin mimari konsept ve tasarım süreçlerini üstlenmektedir.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="bg-navy-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full border border-gold-500/8 pointer-events-none" />
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
            BWA GYO <span className="text-gradient-gold">Hakkında</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Barsan, Winn4 ve Adproje ortaklığıyla kurulan güvenilir gayrimenkul yatırım ortaklığı
          </p>
        </div>
      </section>

      {/* BWA Nedir */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-navy-900 mb-6">
            BWA Nedir?
          </h2>
          <div className="section-divider mb-8" />
          <div className="prose-navy space-y-5 text-navy-700/80 text-lg leading-relaxed">
            <p>
              <strong className="text-navy-900">BWA GYO</strong>, Türkiye'nin önde gelen üç firmasının
              güçlerini birleştirerek kurduğu bir <strong className="text-navy-900">gayrimenkul yatırım
              ortaklığıdır</strong>. BWA kısaltması, ortaklığı oluşturan üç firmanın baş harflerinden
              gelmektedir:
            </p>
            <ul className="space-y-2">
              <li>
                <strong className="text-navy-900">B</strong> — <strong>Barsan</strong> (İnşaat & Geliştirme)
              </li>
              <li>
                <strong className="text-navy-900">W</strong> — <strong>Winn4</strong> (Yatırım & Planlama)
              </li>
              <li>
                <strong className="text-navy-900">A</strong> — <strong>Adproje</strong> (Mimari & Tasarım)
              </li>
            </ul>
            <p>
              Bu üç firmanın inşaat deneyimi, yatırım vizyonu ve mimari uzmanlığını bir araya getiren
              BWA GYO, İstanbul Küçükçekmece'de <strong className="text-navy-900">BWA Göl Evleri</strong> projesini
              hayata geçirmektedir.
            </p>
          </div>
        </div>
      </section>

      {/* Ortaklar */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-navy-900 mb-4 text-center">
            BWA GYO Ortakları
          </h2>
          <p className="text-navy-700/60 text-center mb-12 max-w-2xl mx-auto">
            Üç güçlü firma, tek bir vizyon: Küçükçekmece Gölü kıyısında prestijli yaşam alanları
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((p) => (
              <div
                key={p.name}
                className="bg-cream rounded-3xl p-8 border border-navy-900/5 hover:border-gold-500/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white font-black text-2xl mb-5">
                  {p.name[0]}
                </div>
                <h3 className="font-heading text-xl font-bold text-navy-900 mb-1">{p.name}</h3>
                <p className="text-gold-600 text-sm font-semibold mb-4">{p.role}</p>
                <p className="text-navy-700/60 text-sm leading-relaxed mb-4">{p.description}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-600 hover:text-gold-500 text-sm font-semibold transition-colors"
                >
                  Web sitesini ziyaret et →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proje Özeti */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-navy-900 mb-6">
            BWA Göl Evleri Projesi
          </h2>
          <div className="section-divider mb-8" />
          <div className="space-y-5 text-navy-700/80 text-lg leading-relaxed">
            <p>
              <strong className="text-navy-900">BWA Göl Evleri</strong>, Küçükçekmece Gölü kıyısında,
              Kanal İstanbul güzergahında konumlanan 64 daireli prestijli bir konut projesidir.
            </p>
            <p>
              Projede 1+1, 2+1, 3+1 ve dubleks daire seçenekleri bulunmaktadır. Teras kullanımlı
              dubleks daireler ve bahçe kullanımlı daireler ile geniş, ferah yaşam alanları sunulmaktadır.
            </p>
            <p>
              Göl manzarası, kapalı otopark, çift asansör, 7/24 kamera güvenlik sistemi ve özel peyzaj
              alanları ile eksiksiz bir yaşam konforu sağlanmaktadır.
            </p>
            <p>
              TEM Otoyolu'na 3 dakika, İstanbul Havalimanı'na 20 dakika mesafede olan proje,
              Sazlıbosna Köprüsü bağlantısı ve yakın zamanda açılacak metro hattı ile mükemmel
              ulaşım bağlantısına sahiptir.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-10 text-center">
            <h3 className="font-heading text-2xl font-black text-white mb-3">
              Detaylı Bilgi Almak İster Misiniz?
            </h3>
            <p className="text-white/50 mb-6">Lansman kampanyası devam ediyor. Hemen bilgi alın.</p>
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
            <Link href="/sss" className="text-white/30 hover:text-gold-400 text-xs transition-colors">
              Sıkça Sorulan Sorular
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
