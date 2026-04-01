import { sendGAEvent } from "@next/third-parties/google";

/**
 * GA4 event helper — client-side only
 * Tüm eventler buradan geçer; GA ID yoksa sessizce geçer.
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GA_ID) return;
  try {
    sendGAEvent("event", eventName, params);
  } catch {
    // GA yüklenmemişse hata vermesin
  }
}

// ── Hazır event fonksiyonları ─────────────────────────────────────────────────

/** Telefon numarasına tıklama */
export const trackPhoneClick = (location = "unknown") =>
  trackEvent("phone_click", { event_category: "engagement", location });

/** CTA butonuna tıklama */
export const trackCTAClick = (label = "unknown") =>
  trackEvent("cta_click", { event_category: "engagement", label });

/** Katalog görüntüleme (section'a scroll edilince) */
export const trackCatalogView = () =>
  trackEvent("catalog_view", { event_category: "catalog" });

/** Tam ekran modu */
export const trackCatalogFullscreen = (entered = true) =>
  trackEvent("catalog_fullscreen", { event_category: "catalog", action: entered ? "enter" : "exit" });

/** Katalog sayfa çevirme */
export const trackCatalogPageTurn = (page) =>
  trackEvent("catalog_page_turn", { event_category: "catalog", page_number: page });

/** Lead formu başarıyla gönderildi */
export const trackLeadSubmit = ({ apartment_type, payment_plan, how_heard }) =>
  trackEvent("generate_lead", {
    event_category: "lead",
    apartment_type: apartment_type || "belirtilmedi",
    payment_plan:   payment_plan   || "belirtilmedi",
    how_heard:      how_heard      || "belirtilmedi",
  });
