"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
                <span className="text-gold-500 text-sm">📍</span>
                <span className="text-white/40 text-sm">Küçükçekmece, İstanbul, Türkiye</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-gold-500 text-sm">📞</span>
                <a href="tel:05325465354" className="text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors">
                  0532 546 53 54
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-gold-500 text-sm">✉️</span>
                <a href="mailto:info@winn4.com" className="text-gold-400 hover:text-gold-300 font-semibold text-sm transition-colors">
                  info@winn4.com
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
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-gold-400 font-bold text-xs tracking-[0.25em] uppercase mb-5">BWA GYO Ortakları</h4>
            <div className="space-y-3.5">
              {[
                { name: "BARSAN", desc: "İnşaat & Geliştirme" },
                { name: "WINN4", desc: "Yatırım & Planlama" },
                { name: "ADPROJE", desc: "Mimari & Tasarım" },
              ].map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/25 flex items-center justify-center text-gold-400 font-black text-xs">
                    {p.name[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold tracking-wide">{p.name}</div>
                    <div className="text-white/25 text-[10px]">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 glass-gold rounded-xl p-4">
              <div className="text-gold-400 font-bold text-[10px] tracking-widest uppercase mb-1">Lansman Kampanyası</div>
              <div className="text-white/55 text-xs leading-relaxed mb-3">
                10 özel daireden yalnızca 6'sı kaldı. Rezervasyon için hemen arayın.
              </div>
              <a href="tel:05325465354" className="block btn-gold py-2 rounded-lg text-center text-xs font-black tracking-wider uppercase">
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
