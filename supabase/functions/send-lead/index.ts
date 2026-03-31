import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const lead = await req.json();

    // ── 1. Save to Supabase database ─────────────────────────
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("leads").insert([{
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      apartment_type: lead.apartment_type || null,
      payment_plan: lead.payment_plan || null,
      how_heard: lead.how_heard || null,
      message: lead.message || null,
      source: lead.source || "website",
    }]);

    if (dbError) {
      console.error("DB Error:", dbError);
      return new Response(
        JSON.stringify({ error: "Veritabanı hatası." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── 2. Send email notification via Resend ─────────────────
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");

    if (resendApiKey && notificationEmail) {
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f7f4ef; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #0a1628, #1a3358); padding: 32px; text-align: center; }
            .header h1 { color: #c9a84c; font-size: 24px; margin: 0; letter-spacing: 2px; }
            .header p { color: rgba(255,255,255,0.5); font-size: 12px; margin: 8px 0 0; letter-spacing: 3px; text-transform: uppercase; }
            .body { padding: 32px; }
            .badge { display: inline-block; background: #c9a84c; color: #0a1628; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; letter-spacing: 1px; text-transform: uppercase; }
            .row { display: flex; padding: 12px 0; border-bottom: 1px solid #f0ece3; }
            .row:last-child { border-bottom: none; }
            .label { color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px; flex-shrink: 0; padding-top: 2px; }
            .value { color: #0a1628; font-size: 14px; font-weight: 600; }
            .cta { background: #0a1628; padding: 24px 32px; text-align: center; }
            .cta a { background: #c9a84c; color: #0a1628; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 30px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; display: inline-block; }
            .footer { padding: 20px 32px; text-align: center; color: #bbb; font-size: 11px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>BWA GÖL EVLERİ</h1>
              <p>Yeni Müşteri Talebi</p>
            </div>
            <div class="body">
              <span class="badge">🔔 Yeni Talep Geldi</span>
              <div class="row">
                <span class="label">Ad Soyad</span>
                <span class="value">${lead.name}</span>
              </div>
              <div class="row">
                <span class="label">Telefon</span>
                <span class="value">${lead.phone}</span>
              </div>
              ${lead.email ? `<div class="row"><span class="label">E-posta</span><span class="value">${lead.email}</span></div>` : ""}
              ${lead.apartment_type ? `<div class="row"><span class="label">Daire Tipi</span><span class="value">${lead.apartment_type}</span></div>` : ""}
              ${lead.payment_plan ? `<div class="row"><span class="label">Ödeme Planı</span><span class="value">${lead.payment_plan}</span></div>` : ""}
              ${lead.how_heard ? `<div class="row"><span class="label">Nereden</span><span class="value">${lead.how_heard}</span></div>` : ""}
              ${lead.message ? `<div class="row"><span class="label">Not</span><span class="value">${lead.message}</span></div>` : ""}
              <div class="row">
                <span class="label">Tarih</span>
                <span class="value">${new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" })}</span>
              </div>
            </div>
            <div class="cta">
              <a href="tel:${lead.phone}">📞 Şimdi Ara: ${lead.phone}</a>
            </div>
            <div class="footer">BWA GYO · Barsan + Winn4 + Adproje · bwagol.com</div>
          </div>
        </body>
        </html>
      `;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "BWA Göl Evleri <noreply@winn4.com>",
          to: [notificationEmail],
          subject: `🏠 Yeni Talep: ${lead.name} — ${lead.phone} ${lead.apartment_type ? `(${lead.apartment_type})` : ""}`,
          html: emailHtml,
        }),
      });

      if (!emailRes.ok) {
        const emailErr = await emailRes.text();
        console.error("Email send error:", emailErr);
        // Don't fail the request, lead is already saved
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Talebiniz başarıyla alındı." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Beklenmeyen bir hata oluştu." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
