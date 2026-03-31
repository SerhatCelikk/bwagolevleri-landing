import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "BWA Göl Evleri | Küçükçekmece Göl Manzaralı Konut Projesi",
  description:
    "Küçükçekmece Gölü kıyısında, Kanal İstanbul güzergahında BWA GYO güvencesiyle 1+1, 2+1, 3+1 daireler. Peşinatsız taksit, %50 peşinat ve nakit iskonto seçenekleriyle lansmana özel kampanya. 0532 546 53 54",
  keywords:
    "BWA Göl Evleri, Kanal İstanbul daire, Küçükçekmece satılık daire, göl manzaralı konut, BWA GYO, Barsan, Winn4, Adproje, İstanbul yatırım konut, peşinatsız daire",
  metadataBase: new URL("https://bwagol.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "BWA Göl Evleri | Küçükçekmece Göl Manzaralı Daireler",
    description:
      "Küçükçekmece Gölü kıyısında, Kanal İstanbul güzergahında prestijli konut projesi. Lansmana özel 64 daire kampanyası devam ediyor.",
    type: "website",
    locale: "tr_TR",
    siteName: "BWA Göl Evleri",
  },
  twitter: {
    card: "summary_large_image",
    title: "BWA Göl Evleri | Kanal İstanbul & Göl Manzarası",
    description: "Küçükçekmece Gölü kıyısında BWA GYO güvencesiyle prestijli konut projesi.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream">{children}</body>
    </html>
  );
}
