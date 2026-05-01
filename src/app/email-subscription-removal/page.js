"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

function EmailRemovalInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const source = searchParams.get("source") || "email_link";

  const [status, setStatus] = useState("loading"); // loading | success | invalid | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const run = async () => {
      const trimmed = email.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

      if (!trimmed || !valid) {
        setStatus("invalid");
        return;
      }

      try {
        // upsert + ignoreDuplicates: aynı e-posta tekrar gelirse sessizce geçer,
        // yine de kullanıcıya başarı ekranı gösteriyoruz.
        const { error } = await supabase
          .from("email_unsubscribes")
          .upsert(
            {
              email: trimmed.toLowerCase(),
              source,
              user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
            },
            { onConflict: "email", ignoreDuplicates: true }
          );
        if (error) throw error;
        setStatus("success");
      } catch (err) {
        console.error(err);
        setErrorMsg(err?.message || "Bilinmeyen hata.");
        setStatus("error");
      }
    };
    run();
  }, [email, source]);

  return (
    <main className="min-h-screen bg-navy-950 flex items-center justify-center px-5 py-16 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900/60 to-navy-950" />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full border border-gold-500/8 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-gold-500/4 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="glass-dark rounded-3xl p-8 sm:p-10 border border-gold-500/20 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full border-2 border-gold-500/50 flex items-center justify-center bg-navy-900/60">
              <Image src="/logo.svg" alt="BWA GYO" width={40} height={26} className="object-contain" />
            </div>
          </div>

          {status === "loading" && (
            <>
              <div className="w-12 h-12 mx-auto mb-5 border-2 border-gold-500/30 border-t-gold-400 rounded-full animate-spin" />
              <h1 className="font-heading text-xl font-black text-white mb-2">İşleminiz yapılıyor</h1>
              <p className="text-white/50 text-sm">Lütfen bekleyin…</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <h1 className="font-heading text-2xl font-black text-white mb-3">
                Mail kaydınız <span className="text-gradient-gold">silinmiştir</span>
              </h1>
              <p className="text-white/55 text-sm leading-relaxed mb-2">
                {email ? (
                  <><strong className="text-gold-400 break-all">{email}</strong> adresi e-posta listemizden çıkarıldı.</>
                ) : (
                  "E-posta adresiniz listemizden çıkarıldı."
                )}
              </p>
              <p className="text-white/35 text-xs leading-relaxed mb-7">
                Bu adrese artık tanıtım veya kampanya e-postası göndermeyeceğiz.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="btn-gold w-full py-3 rounded-lg text-xs font-black tracking-wider uppercase"
                >
                  Ana Sayfaya Dön
                </Link>
                <a
                  href="mailto:iletisim@bwagyo.com"
                  className="text-white/30 hover:text-gold-400 text-xs transition-colors"
                >
                  Bir hata olduğunu düşünüyorsanız bize yazın
                </a>
              </div>
            </>
          )}

          {status === "invalid" && (
            <>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h1 className="font-heading text-xl font-black text-white mb-3">Geçersiz bağlantı</h1>
              <p className="text-white/50 text-sm leading-relaxed mb-7">
                E-posta bilgisi okunamadı. Bağlantının doğru kopyalandığından emin olun
                ya da bizimle iletişime geçin.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:iletisim@bwagyo.com"
                  className="btn-gold w-full py-3 rounded-lg text-xs font-black tracking-wider uppercase"
                >
                  Bize Yazın
                </a>
                <Link href="/" className="text-white/30 hover:text-gold-400 text-xs transition-colors">
                  Ana Sayfaya Dön
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <h1 className="font-heading text-xl font-black text-white mb-3">İşlem tamamlanamadı</h1>
              <p className="text-white/50 text-sm leading-relaxed mb-2">
                Üzgünüz, bir sorun oluştu. Lütfen birkaç dakika sonra tekrar deneyin.
              </p>
              {errorMsg && (
                <p className="text-white/25 text-[11px] leading-relaxed mb-7 break-words">{errorMsg}</p>
              )}
              <div className="flex flex-col gap-3 mt-5">
                <button
                  onClick={() => location.reload()}
                  className="btn-gold w-full py-3 rounded-lg text-xs font-black tracking-wider uppercase"
                >
                  Tekrar Dene
                </button>
                <a
                  href="mailto:iletisim@bwagyo.com"
                  className="text-white/30 hover:text-gold-400 text-xs transition-colors"
                >
                  iletisim@bwagyo.com
                </a>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-white/20 text-[11px] mt-6 tracking-wide">
          © 2026 BWA GYO · Barsan + Winn4 + Adproje
        </p>
      </div>
    </main>
  );
}

export default function EmailSubscriptionRemovalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-950" />}>
      <EmailRemovalInner />
    </Suspense>
  );
}
