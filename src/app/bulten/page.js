import { NEWSLETTER_BODY } from "./newsletter.data";

// Gizli sayfa: hiçbir yerden link verilmez, arama motorlarına kapalı (noindex).
// Sadece e-postadaki "Tarayıcıda görüntüle" linkiyle, parametrelerle ulaşılır.
// GoogleAnalytics root layout'ta olduğu için sayfa görüntülenmesi + utm otomatik izlenir.
export const metadata = {
  title: "Bülten",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
};

const UNSUB_BASE = "https://bwagyo.com/email-subscription-removal";

const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com">' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,600;0,700;0,800;0,900&family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,600;0,14..32,700;0,14..32,900&display=swap" rel="stylesheet">';

export default async function BultenPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const email = String(sp.e || sp.email || "").trim();
  const source = String(sp.utm_campaign || sp.source || "lansman_kampanyasi");

  // Web görünümünde de "Listeden çık" çalışsın: e-posta varsa kişisel URL üret.
  let unsubUrl = UNSUB_BASE;
  if (email) {
    const q = new URLSearchParams({ email, source });
    unsubUrl = `${UNSUB_BASE}?${q.toString()}`;
  }

  const bodyHtml = NEWSLETTER_BODY
    .split("${Gears.unsubscribe()}").join(unsubUrl)
    .split("{{email}}").join(encodeURIComponent(email));

  return (
    <main style={{ background: "#F1F1F1", width: "100%", minHeight: "100vh" }}>
      <div dangerouslySetInnerHTML={{ __html: FONTS + bodyHtml }} />
    </main>
  );
}
