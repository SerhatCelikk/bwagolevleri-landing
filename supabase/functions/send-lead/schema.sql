-- BWA Göl Evleri - Leads Tablosu
-- Supabase SQL Editor'de çalıştırın

CREATE TABLE IF NOT EXISTS leads (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamptz DEFAULT now() NOT NULL,
  name        varchar(255) NOT NULL,
  phone       varchar(50)  NOT NULL,
  email       varchar(255),
  apartment_type varchar(50),
  payment_plan   varchar(100),
  how_heard      varchar(100),
  message     text,
  source      varchar(100) DEFAULT 'website'
);

-- Row Level Security - Edge Function service role key üzerinden yazabilir
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Kimse doğrudan okuyamaz (sadece Supabase dashboard)
CREATE POLICY "No public read" ON leads FOR SELECT USING (false);

-- Edge Function (service role) insert edebilir - service role RLS bypass eder
-- Anon key ile de insert'e izin ver (Edge Function çağırır zaten ama yedek için)
CREATE POLICY "Allow insert from edge function" ON leads FOR INSERT WITH CHECK (true);

-- İndeksler
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_phone_idx ON leads(phone);
