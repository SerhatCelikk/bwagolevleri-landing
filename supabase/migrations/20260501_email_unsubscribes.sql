-- E-posta listesinden çıkmak isteyen kullanıcılar için tablo
CREATE TABLE IF NOT EXISTS email_unsubscribes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL,
  source          TEXT,                              -- hangi kampanyadan / linkten geldi
  unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address      TEXT,
  user_agent      TEXT
);

CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_email ON email_unsubscribes (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_at    ON email_unsubscribes (unsubscribed_at DESC);

-- Aynı e-posta birden fazla defa abonelik iptali yapmaya çalışırsa engelleme yok
-- (kullanıcı butonu tekrar tıklarsa hata vermesin diye); tekilleştirme rapor sırasında yapılır.

ALTER TABLE email_unsubscribes ENABLE ROW LEVEL SECURITY;

-- Anonim kullanıcılar abonelikten çıkabilsin (insert)
DROP POLICY IF EXISTS "Anyone can unsubscribe" ON email_unsubscribes;
CREATE POLICY "Anyone can unsubscribe"
  ON email_unsubscribes
  FOR INSERT
  WITH CHECK (true);
