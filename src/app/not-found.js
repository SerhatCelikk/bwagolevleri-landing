import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Sayfa Bulunamadı | BWA Göl Evleri",
  description: "Aradığınız sayfa bulunamadı. BWA Göl Evleri ana sayfasına dönün.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-lake-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-20 w-60 h-60 rounded-full border border-gold-500/8 pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-gold-500/50 flex items-center justify-center bg-navy-900/60">
            <Image src="/logo.svg" alt="BWA" width={46} height={30} className="object-contain" />
          </div>
        </div>

        {/* 404 Number */}
        <h1 className="font-heading text-8xl md:text-9xl font-black text-gradient-gold leading-none mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
          Sayfa Bulunamadı
        </h2>
        <p className="text-white/40 text-base mb-10 leading-relaxed max-w-sm mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          BWA Göl Evleri ana sayfasına dönerek devam edebilirsiniz.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-gold px-8 py-3.5 rounded-lg text-sm font-black tracking-[0.12em] uppercase text-center"
          >
            Ana Sayfaya Dön
          </Link>
          <a
            href="tel:05334758499"
            className="btn-outline-gold px-8 py-3.5 rounded-lg text-sm font-black tracking-[0.12em] uppercase text-center flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.7 11.5 19.79 19.79 0 011.63 2.84 2 2 0 013.6 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            0533 475 84 99
          </a>
        </div>

        {/* Quick links */}
        <div className="mt-14 pt-8 border-t border-white/8">
          <p className="text-white/20 text-xs mb-4">Bunları mı arıyordunuz?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Daire Tipleri", href: "/#daireler" },
              { label: "Hakkımızda", href: "/hakkimizda" },
              { label: "SSS", href: "/sss" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/30 hover:text-gold-400 text-xs border border-white/10 hover:border-gold-500/30 px-4 py-2 rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
