"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { trackLeadSubmit, trackPhoneClick } from "@/lib/analytics";
import Image from "next/image";

const APARTMENT_TYPES = ["1+1", "2+1", "3+1", "Henüz Karar Vermedim"];
const PAYMENT_PLANS = ["Peşinatsız Taksit", "%50 Peşinat", "Nakit Alım", "Özel Plan İstiyorum"];
const HOW_HEARD = ["Instagram", "Google", "WhatsApp", "Tanıdık / Tavsiye", "Diğer"];

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    apartment_type: "", payment_plan: "", how_heard: "", message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [priceLightbox, setPriceLightbox] = useState(false);

  useEffect(() => {
    if (!priceLightbox) return;
    const onKey = (e) => { if (e.key === "Escape") setPriceLightbox(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [priceLightbox]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setErrorMsg("Ad ve telefon numarası zorunludur.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const { error } = await supabase.functions.invoke("send-lead", {
        body: { ...form, source: "website", created_at: new Date().toISOString() },
      });
      if (error) throw error;
      trackLeadSubmit({ apartment_type: form.apartment_type, payment_plan: form.payment_plan, how_heard: form.how_heard });
      setStatus("success");
      setForm({ name: "", phone: "", email: "", apartment_type: "", payment_plan: "", how_heard: "", message: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg("Bir hata oluştu. Lütfen bizi arayın: 0533 475 84 99");
      setStatus("error");
    }
  };

  return (
    <section id="talep" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-gold-600 text-xs font-bold tracking-[0.3em] uppercase block mb-4">İletişim</span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-navy-900 mb-5 leading-tight">
              Hayalinizdeki Eve
              <br /><span className="text-gradient-gold">İlk Adımı Atın</span>
            </h2>
            <div className="section-divider-left mb-6" />
            <p className="text-navy-700/55 text-base leading-relaxed mb-8">
              Formu doldurun veya doğrudan arayın. Size özel ödeme planı hazırlayalım.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>,
                  title: "Telefon", desc: "0533 475 84 99", href: "tel:05334758499", onClick: () => trackPhoneClick("lead_form"),
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  title: "E-posta", desc: "iletisim@bwagyo.com", href: "mailto:iletisim@bwagyo.com",
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
                  title: "Geri Dönüş Süresi", desc: "24 saat içinde öncelikli geri dönüş garantisi",
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
                  title: "Gizlilik", desc: "Bilgileriniz 3. şahıslarla paylaşılmaz",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-100 flex items-center justify-center text-gold-600 shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-bold text-navy-900 text-sm">{item.title}</div>
                    {item.href ? (
                      <a href={item.href} onClick={item.onClick} className="text-gold-600 hover:text-gold-500 font-semibold text-sm transition-colors">{item.desc}</a>
                    ) : (
                      <div className="text-navy-700/45 text-sm">{item.desc}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Price list preview — click to enlarge */}
            <button
              type="button"
              onClick={() => setPriceLightbox(true)}
              aria-label="Fiyat listesini büyüt"
              className="group relative block rounded-2xl overflow-hidden border border-gold-200/60 shadow-xl max-w-[260px] hover:shadow-2xl transition-shadow cursor-zoom-in"
            >
              <Image
                src="/images/fiyat.png"
                alt="BWA Göl Evleri 2026 Güncel Fiyat Listesi"
                width={1080}
                height={1920}
                sizes="260px"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {/* Zoom hint overlay on hover */}
              <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/35 transition-colors flex items-center justify-center pointer-events-none">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gold-500 text-navy-900 rounded-full px-4 py-2 flex items-center gap-1.5 text-xs font-black tracking-wider uppercase shadow-lg">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Büyüt
                </div>
              </div>
              <div className="bg-navy-900 px-4 py-2.5 text-center">
                <span className="text-gold-400 text-[10px] font-bold tracking-[0.2em] uppercase">2026 Güncel Fiyat Listesi</span>
              </div>
            </button>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="bg-white rounded-2xl shadow-xl border border-navy-900/5 overflow-hidden">
              {/* Form header */}
              <div className="bg-gradient-to-r from-navy-900 to-navy-800 px-7 py-5">
                <h3 className="font-heading text-xl font-black text-white">Talep Formu</h3>
                <p className="text-white/40 text-xs mt-0.5">Tüm alanları doldurun, size özel teklif hazırlayalım.</p>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
                    </div>
                    <h4 className="font-heading text-xl font-black text-navy-900 mb-3">Talebiniz Alındı!</h4>
                    <p className="text-navy-700/50 text-sm mb-6 leading-relaxed">
                      En geç 24 saat içinde satış uzmanımız sizi arayacak.<br/>
                      Telefonu kaçırmamaya dikkat edin.
                    </p>
                    <a href="tel:05334758499" className="btn-gold px-7 py-3 rounded-lg font-bold tracking-wide text-sm inline-block">
                      Şimdi Arayın
                    </a>
                    <button onClick={() => setStatus("idle")} className="block mx-auto mt-3 text-navy-700/30 text-xs hover:text-navy-700 transition-colors">
                      Yeni talep oluştur
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="p-7 space-y-4">
                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-navy-700/50 uppercase tracking-widest mb-1.5">Ad Soyad *</label>
                        <input type="text" value={form.name} onChange={set("name")} placeholder="Adınız Soyadınız" required
                          className="w-full px-3.5 py-2.5 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none text-sm transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-navy-700/50 uppercase tracking-widest mb-1.5">Telefon *</label>
                        <input type="tel" value={form.phone} onChange={set("phone")} placeholder="05xx xxx xx xx" required
                          className="w-full px-3.5 py-2.5 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none text-sm transition-all" />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-bold text-navy-700/50 uppercase tracking-widest mb-1.5">E-posta</label>
                      <input type="email" value={form.email} onChange={set("email")} placeholder="ornek@email.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none text-sm transition-all" />
                    </div>

                    {/* Apartment type buttons */}
                    <div>
                      <label className="block text-[10px] font-bold text-navy-700/50 uppercase tracking-widest mb-1.5">İlgilendiğiniz Daire Tipi</label>
                      <div className="grid grid-cols-2 gap-2">
                        {APARTMENT_TYPES.map((type) => (
                          <button key={type} type="button" onClick={() => setForm((f) => ({ ...f, apartment_type: type }))}
                            className={`px-3 py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${form.apartment_type === type ? "border-gold-500 bg-gold-50 text-gold-700" : "border-navy-100 text-navy-700/55 hover:border-gold-300"}`}>
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Payment plan */}
                    <div>
                      <label htmlFor="payment_plan" className="block text-[10px] font-bold text-navy-700/50 uppercase tracking-widest mb-1.5">Ödeme Planı Tercihi</label>
                      <select id="payment_plan" value={form.payment_plan} onChange={set("payment_plan")}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none text-sm bg-white transition-all">
                        <option value="">Seçiniz...</option>
                        {PAYMENT_PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    {/* How heard */}
                    <div>
                      <label htmlFor="how_heard" className="block text-[10px] font-bold text-navy-700/50 uppercase tracking-widest mb-1.5">Bizi Nereden Duydunuz?</label>
                      <select id="how_heard" value={form.how_heard} onChange={set("how_heard")}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none text-sm bg-white transition-all">
                        <option value="">Seçiniz...</option>
                        {HOW_HEARD.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-bold text-navy-700/50 uppercase tracking-widest mb-1.5">Notunuz (isteğe bağlı)</label>
                      <textarea value={form.message} onChange={set("message")} placeholder="Bütçeniz, sorularınız..." rows={3}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-navy-200 focus:border-gold-400 focus:ring-2 focus:ring-gold-100 outline-none text-sm resize-none transition-all" />
                    </div>

                    {errorMsg && (
                      <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-lg">
                        {errorMsg}
                      </div>
                    )}

                    <button type="submit" disabled={status === "loading"}
                      className="btn-gold w-full py-3.5 rounded-xl text-sm font-black tracking-[0.1em] uppercase disabled:opacity-60 flex items-center justify-center gap-3">
                      {status === "loading" ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Gönderiliyor...</>
                      ) : "TALEBİMİ GÖNDER →"}
                    </button>

                    <p className="text-center text-navy-700/25 text-[11px]">
                      Bilgileriniz gizli tutulur · Spam göndermiyoruz
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Price list lightbox */}
      <AnimatePresence>
        {priceLightbox && (
          <motion.div
            key="price-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPriceLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Fiyat listesi"
            className="fixed inset-0 z-[100] bg-navy-950/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out overflow-y-auto"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setPriceLightbox(false)}
              aria-label="Kapat"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-gold-500 text-white hover:text-navy-900 flex items-center justify-center transition-colors z-10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Image — click image itself doesn't close */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[min(90vw,540px)] cursor-default"
            >
              <Image
                src="/images/fiyat.png"
                alt="BWA Göl Evleri 2026 Güncel Fiyat Listesi"
                width={1080}
                height={1920}
                sizes="(max-width: 640px) 90vw, 540px"
                priority
                className="w-full h-auto rounded-xl shadow-2xl"
              />
              <p className="text-center text-white/40 text-xs mt-3 tracking-wide">
                Kapatmak için dışına tıklayın veya ESC tuşuna basın
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
