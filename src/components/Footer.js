"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trackPhoneClick } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white overflow-hidden relative">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full border border-gold-500/50 flex items-center justify-center bg-navy-900 overflow-hidden">
                <Image src="/logo.svg" alt="BWA Göl Evleri" width={36} height={23} className="object-contain" />
              </div>
              <div className="leading-none">
                <div className="font-heading text-gold-400 font-black text-xl tracking-widest uppercase">BWA</div>
                <div className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold">Göl Evleri</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
              Küçükçekmece Gölü kıyısında, Kanal İstanbul güzergahında BWA GYO güvencesiyle
              inşa edilen prestijli konut projesi.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <svg className="text-gold-500 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-white/40 text-sm">Küçükçekmece, İstanbul, Türkiye</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="text-gold-500 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                <a href="tel:05334758499" onClick={() => trackPhoneClick("footer")} className="text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors">
                  0533 475 84 99
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="text-gold-500 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:iletisim@bwagyo.com" className="text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors">
                  iletisim@bwagyo.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="text-gold-500 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <a href="https://www.instagram.com/bwa_gyo" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors">
                  @bwa_gyo
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-400 font-bold text-xs tracking-[0.25em] uppercase mb-5">Hızlı Bağlantılar</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Proje Hakkında", href: "#proje" },
                { label: "Daire Tipleri", href: "#daireler" },
                { label: "Fiyat Listesi", href: "#fiyatlar" },
                { label: "Konum", href: "#konum" },
                { label: "Kampanya", href: "#kampanya" },
                { label: "Dijital Katalog", href: "#katalog" },
                { label: "Talep Formu", href: "#talep" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" })}
                    className="text-white/35 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-gold-500/30 group-hover:text-gold-500 transition-colors">›</span>
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-white/35 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                >
                  <span className="text-gold-500/30 group-hover:text-gold-500 transition-colors">›</span>
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/sss"
                  className="text-white/35 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                >
                  <span className="text-gold-500/30 group-hover:text-gold-500 transition-colors">›</span>
                  Sıkça Sorulan Sorular
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-gold-400 font-bold text-xs tracking-[0.25em] uppercase mb-5">BWA GYO Ortakları</h4>
            <div className="space-y-3.5">
              {[
                { name: "BARSAN", desc: "İnşaat & Geliştirme", href: "https://www.barsangroup.com/" },
                { name: "WINN4", desc: "Yatırım & Planlama", href: "https://winn4.com/" },
                { name: "ADPROJE", desc: "Mimari & Tasarım", href: "https://www.adproje.com/" },
              ].map((p) => (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/25 flex items-center justify-center text-gold-400 font-black text-xs group-hover:bg-gold-500/25 transition-colors">
                    {p.name[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold tracking-wide group-hover:text-gold-400 transition-colors">{p.name}</div>
                    <div className="text-white/25 text-[10px]">{p.desc}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-7 glass-gold rounded-xl p-4">
              <div className="text-gold-400 font-bold text-[10px] tracking-widest uppercase mb-1">Lansman Kampanyası</div>
              <div className="text-white/55 text-xs leading-relaxed mb-3">
                29 kampanya kontenjanından yalnızca 23 daire kaldı.
              </div>
              <a href="tel:05334758499" onClick={() => trackPhoneClick("footer_cta")} className="block btn-gold py-2 rounded-lg text-center text-xs font-black tracking-wider uppercase">
                Hemen Ara
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-7 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs text-center md:text-left">
            © 2026 BWA GYO · Barsan + Winn4 + Adproje. Tüm hakları saklıdır.
          </p>
          <p className="text-white/15 text-[11px]">
            Proje görselleri ve fiyatlar bilgi amaçlı olup değişkenlik gösterebilir.
          </p>
        </div>
      </div>
    </footer>
  );
}
