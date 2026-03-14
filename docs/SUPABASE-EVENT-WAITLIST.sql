-- =============================================
-- Tabela: event_waitlist (Lista de Espera de Eventos)
-- =============================================
-- Armazena inscrições de leads nos eventos do IJA.
-- Cada evento tem LPs nichadas por segmento (ICP).
-- O campo segment_origin identifica de qual página o lead veio.
-- created_at registra data/hora exata da inscrição.

CREATE TABLE IF NOT EXISTS event_waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,

  -- Lead data (padrão GTM)
  nome text NOT NULL,
  sobrenome text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone_number text NOT NULL,

  -- Event identification
  event_slug text NOT NULL,
  event_title text NOT NULL,
  event_type text,           -- Live, Webinar, Workshop
  event_date text,           -- Data do evento (ex: "Em breve", "2026-04-01")
  event_time text,           -- Horário (ex: "19h")

  -- Source tracking (qual LP/segmento o lead veio)
  segment_origin text NOT NULL,
  segment_name text,         -- Nome legível do segmento (ex: "Restaurantes")
  page_url text,
  referrer_url text,         -- De onde veio antes de chegar na LP

  -- Business info (opcional)
  business_name text,
  revenue_range text,

  -- Tracking fields (padrão GTM)
  apex_session_id text,
  time_on_page_at_submit integer,

  -- UTMs (first touch)
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,

  -- Device info
  user_agent text,
  device_type text           -- mobile, desktop, tablet
);

-- Índices para consultas comuns
CREATE INDEX IF NOT EXISTS idx_event_waitlist_event ON event_waitlist (event_slug);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_segment ON event_waitlist (segment_origin);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_email ON event_waitlist (email);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_created ON event_waitlist (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_event_date ON event_waitlist (event_date);

-- RLS (Row Level Security)
ALTER TABLE event_waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: qualquer pessoa pode inserir (formulário público)
CREATE POLICY "Allow public insert on event_waitlist"
  ON event_waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: somente authenticated pode ler (admin/dashboard)
CREATE POLICY "Allow authenticated read on event_waitlist"
  ON event_waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: somente authenticated pode deletar
CREATE POLICY "Allow authenticated delete on event_waitlist"
  ON event_waitlist
  FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- Views úteis para dashboard
-- =============================================

-- Total de inscritos por evento
CREATE OR REPLACE VIEW event_registrations_by_event AS
SELECT
  event_slug,
  event_title,
  COUNT(*) as total_registrations,
  COUNT(DISTINCT email) as unique_emails,
  MIN(created_at) as first_registration,
  MAX(created_at) as last_registration
FROM event_waitlist
GROUP BY event_slug, event_title
ORDER BY total_registrations DESC;

-- Total de inscritos por segmento
CREATE OR REPLACE VIEW event_registrations_by_segment AS
SELECT
  segment_origin,
  segment_name,
  COUNT(*) as total_registrations,
  COUNT(DISTINCT email) as unique_emails
FROM event_waitlist
GROUP BY segment_origin, segment_name
ORDER BY total_registrations DESC;

-- Inscrições por dia (para gráficos)
CREATE OR REPLACE VIEW event_registrations_daily AS
SELECT
  DATE(created_at) as registration_date,
  event_slug,
  segment_origin,
  COUNT(*) as registrations
FROM event_waitlist
GROUP BY DATE(created_at), event_slug, segment_origin
ORDER BY registration_date DESC;
