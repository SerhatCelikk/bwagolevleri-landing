-- leads tablosuna IP ve cihaz bilgisi kolonları ekle
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS ip_address  TEXT,
  ADD COLUMN IF NOT EXISTS user_agent  TEXT,
  ADD COLUMN IF NOT EXISTS country     TEXT,
  ADD COLUMN IF NOT EXISTS city        TEXT;
