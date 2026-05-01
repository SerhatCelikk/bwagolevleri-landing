-- E-posta listesinden çıkmak isteyen kullanıcılar için tablo
CREATE TABLE IF NOT EXISTS email_unsubscribes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT NOT NULL UNIQUE,              -- aynı e-posta sadece bir kez
  source          TEXT,                              -- hangi kampanyadan / linkten geldi
  unsubscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address      TEXT,
  user_agent      TEXT
);

-- Tablo zaten varsa (eski migration sonrası) UNIQUE constraint'i ekle
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'email_unsubscribes_email_key'
  ) THEN
    ALTER TABLE email_unsubscribes
      ADD CONSTRAINT email_unsubscribes_email_key UNIQUE (email);
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS idx_email_unsubscribes_at ON email_unsubscribes (unsubscribed_at DESC);

ALTER TABLE email_unsubscribes ENABLE ROW LEVEL SECURITY;

-- Anonim kullanıcılar abonelikten çıkabilsin (insert)
DROP POLICY IF EXISTS "Anyone can unsubscribe" ON email_unsubscribes;
CREATE POLICY "Anyone can unsubscribe"
  ON email_unsubscribes
  FOR INSERT
  WITH CHECK (true);
