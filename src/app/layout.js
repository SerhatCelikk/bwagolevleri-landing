import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "BWA Göl Evleri | Ispartakule'de Küçükçekmece Göl Manzaralı Konut Projesi | BWA GYO",
    template: "%s | BWA Göl Evleri",
  },
  description:
    "BWA Göl Evleri, Barsan Winn4 Adproje ortaklığı olan BWA GYO güvencesiyle Ispartakule mevkiinde, Küçükçekmece Gölü kıyısında, Kanal İstanbul güzergahında inşa edilen prestijli konut projesidir. 1+1, 2+1, 3+1 ve dubleks daireler. Peşinatsız taksit, %50 peşinat ve nakit iskonto seçenekleriyle lansmana özel kampanya. 0533 475 84 99",
  keywords: [
    "BWA Göl Evleri",
    "BWA Gölevleri",
    "BWA GYO",
    "BWA nedir",
    "Barsan Winn4 Adproje",
    "Barsan Winn4 Adproje ortaklığı",
    "Göl Evleri",
    "Gölevleri",
    "Kanal İstanbul daire",
    "Küçükçekmece satılık daire",
    "Küçükçekmece göl manzaralı daire",
    "göl manzaralı konut",
    "İstanbul yatırım konut",
    "peşinatsız daire",
    "Küçükçekmece konut projesi",
    "Kanal İstanbul konut",
    "BWA GYO konut",
    "Barsan inşaat",
    "Winn4 yatırım",
    "Adproje mimarlık",
  ],
  metadataBase: new URL("https://bwagyo.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "BWA Göl Evleri | Barsan Winn4 Adproje Ortaklığı | Ispartakule Küçükçekmece",
    description:
      "BWA GYO güvencesiyle Ispartakule mevkiinde, Küçükçekmece Gölü kıyısında, Kanal İstanbul güzergahında inşa edilen prestijli konut projesidir. 64 daireli lansman kampanyası devam ediyor.",
    type: "website",
    locale: "tr_TR",
    siteName: "BWA Göl Evleri",
    url: "https://bwagyo.com",
    images: [
      {
        url: "/images/catalog.jpg",
        width: 1200,
        height: 630,
        alt: "BWA Göl Evleri - Ispartakule Küçükçekmece Göl Manzaralı Konut Projesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BWA Göl Evleri | Ispartakule Küçükçekmece Göl Manzaralı Konut Projesi",
    description:
      "BWA GYO (Barsan + Winn4 + Adproje) güvencesiyle Ispartakule mevkiinde, Küçükçekmece Gölü kıyısında, Kanal İstanbul güzergahında inşa edilen prestijli konut projesidir.",
    images: ["/images/catalog.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification - replace with actual value after setup
    // google: "your-google-verification-code",
  },
  other: {
    "geo.region": "TR-34",
    "geo.placename": "Küçükçekmece, İstanbul",
    "geo.position": "41.0082;28.7806",
    ICBM: "41.0082, 28.7806",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BWA GYO",
    alternateName: ["BWA", "Barsan Winn4 Adproje", "BWA Göl Evleri"],
    url: "https://bwagyo.com",
    logo: "https://bwagyo.com/logo.svg",
    description:
      "BWA GYO, Barsan, Winn4 ve Adproje firmalarının ortaklığıyla kurulan gayrimenkul yatırım şirketidir. Küçükçekmece Gölü kıyısında prestijli konut projeleri geliştirmektedir.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Organization",
        name: "Barsan",
        url: "https://www.barsangroup.com/",
        description: "İnşaat & Geliştirme",
      },
      {
        "@type": "Organization",
        name: "Winn4",
        url: "https://winn4insaat.com/",
        description: "Yatırım & Planlama",
      },
      {
        "@type": "Organization",
        name: "Adproje",
        url: "https://www.adproje.com/",
        description: "Mimari & Tasarım",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-533-475-84-99",
      contactType: "sales",
      availableLanguage: "Turkish",
    },
    sameAs: ["https://www.instagram.com/bwa_gyo"],
  },
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "BWA Göl Evleri Satış Ofisi",
    image: "https://bwagyo.com/images/catalog.jpg",
    url: "https://bwagyo.com",
    telephone: "+90-533-475-84-99",
    email: "iletisim@bwagyo.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Küçükçekmece",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0082,
      longitude: 28.7806,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "BWA Göl Evleri",
    alternateName: "BWA Gölevleri",
    description:
      "BWA GYO (Barsan + Winn4 + Adproje ortaklığı) tarafından Küçükçekmece Gölü kıyısında, Kanal İstanbul güzergahında inşa edilen 64 daireli prestijli konut projesi. 1+1, 2+1, 3+1 ve dubleks daire seçenekleri.",
    url: "https://bwagyo.com",
    image: "https://bwagyo.com/images/catalog.jpg",
    numberOfAvailableAccommodationUnits: 17,
    numberOfAccommodationUnits: 64,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Küçükçekmece",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.0082,
      longitude: 28.7806,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Göl Manzarası", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kapalı Otopark", value: true },
      { "@type": "LocationFeatureSpecification", name: "7/24 Güvenlik", value: true },
      { "@type": "LocationFeatureSpecification", name: "Çift Asansör", value: true },
      { "@type": "LocationFeatureSpecification", name: "Peyzaj Alanı", value: true },
    ],
  },
];

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        {jsonLd.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col bg-cream">{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
