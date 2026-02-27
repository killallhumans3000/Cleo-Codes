-- ============================================================
-- Gästelisten-App: Datenbankschema mit RLS-Policies
-- Supabase-Region: Frankfurt (eu-central-1) für DSGVO-Konformität
-- ============================================================

-- ============================================================
-- 1. PROFILES TABELLE
-- Erweitert auth.users mit Rolle und Zimmerinformationen
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT,
  full_name   TEXT,
  room_number TEXT,
  role        TEXT NOT NULL DEFAULT 'user'
                   CHECK (role IN ('admin', 'user')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Automatische Profilerstellung bei Registrierung
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. GUESTS TABELLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.guests (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id        UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name           TEXT NOT NULL,
  email          TEXT,
  visit_date     DATE NOT NULL,
  check_in_time  TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  status         TEXT DEFAULT 'pending'
                      CHECK (status IN ('pending', 'checked_in', 'checked_out')),
  qr_token       TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  notes          TEXT,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- Performance-Indizes für RLS und häufige Abfragen
CREATE INDEX IF NOT EXISTS idx_guests_user_id   ON public.guests(user_id);
CREATE INDEX IF NOT EXISTS idx_guests_qr_token  ON public.guests(qr_token);
CREATE INDEX IF NOT EXISTS idx_guests_visit_date ON public.guests(visit_date);
CREATE INDEX IF NOT EXISTS idx_guests_status    ON public.guests(status);

-- ============================================================
-- 3. ROW LEVEL SECURITY AKTIVIEREN
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests   ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. RLS-POLICIES: PROFILES
-- ============================================================

-- User kann eigenes Profil lesen
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

-- Admin kann alle Profile lesen
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin'
  );

-- User kann eigenes Profil aktualisieren (nicht die Rolle)
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id AND role = 'user');

-- Admin kann alle Profile aktualisieren (inkl. Rollen)
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin'
  );

-- ============================================================
-- 5. RLS-POLICIES: GUESTS
-- ============================================================

-- Bewohner sehen nur eigene Gäste
CREATE POLICY "Users can view own guests"
  ON public.guests FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Admins sehen ALLE Gäste
CREATE POLICY "Admins can view all guests"
  ON public.guests FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin'
  );

-- Bewohner können eigene Gäste anlegen
CREATE POLICY "Users can insert own guests"
  ON public.guests FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Bewohner können eigene Gäste aktualisieren
CREATE POLICY "Users can update own guests"
  ON public.guests FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Admins können Status aller Gäste ändern (Check-in / Check-out)
CREATE POLICY "Admins can update all guests"
  ON public.guests FOR UPDATE
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin'
  );

-- Bewohner können eigene Gäste löschen
CREATE POLICY "Users can delete own guests"
  ON public.guests FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Admins können alle Gäste löschen
CREATE POLICY "Admins can delete all guests"
  ON public.guests FOR DELETE
  TO authenticated
  USING (
    (SELECT role FROM public.profiles WHERE id = (SELECT auth.uid())) = 'admin'
  );

-- ============================================================
-- 6. FUNKTION: QR-TOKEN LOOKUP (für Check-in/Check-out via Scanner)
-- Wird mit service_role aufgerufen — umgeht RLS
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_guest_by_qr_token(p_token TEXT)
RETURNS TABLE (
  id             UUID,
  user_id        UUID,
  name           TEXT,
  email          TEXT,
  visit_date     DATE,
  check_in_time  TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  status         TEXT,
  qr_token       TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
    SELECT g.id, g.user_id, g.name, g.email, g.visit_date,
           g.check_in_time, g.check_out_time, g.status,
           g.qr_token, g.notes, g.created_at
    FROM public.guests g
    WHERE g.qr_token = p_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 7. AUTOMATISCHES LÖSCHEN ALTER DATEN (DSGVO)
-- Gäste-Einträge nach 90 Tagen automatisch löschen
-- Benötigt pg_cron Extension (im Supabase Dashboard aktivieren)
-- ============================================================

-- Aktiviere pg_cron (einmalig im SQL-Editor ausführen):
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Täglicher Cleanup-Job (nach Aktivierung von pg_cron):
-- SELECT cron.schedule(
--   'cleanup-old-guests',
--   '0 3 * * *',
--   $$DELETE FROM public.guests WHERE visit_date < CURRENT_DATE - INTERVAL '90 days'$$
-- );
