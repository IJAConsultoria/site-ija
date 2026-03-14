-- =============================================
-- Tabela: event_waitlist (Lista de Espera de Eventos)
-- =============================================
-- Armazena inscrições de leads nos eventos do IJA.
-- Cada evento tem LPs nichadas por segmento (ICP).
-- O campo segment_origin identifica de qual página o lead veio.

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

  -- Source tracking (qual LP/segmento o lead veio)
  segment_origin text NOT NULL,
  page_url text,

  -- Business info (opcional)
  business_name text,
  revenue_range text,

  -- Tracking fields (padrão GTM)
  apex_session_id text,
  time_on_page_at_submit integer,

  -- UTMs
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text
);

-- Índices para consultas comuns
CREATE INDEX IF NOT EXISTS idx_event_waitlist_event ON event_waitlist (event_slug);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_segment ON event_waitlist (segment_origin);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_email ON event_waitlist (email);
CREATE INDEX IF NOT EXISTS idx_event_waitlist_created ON event_waitlist (created_at DESC);

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
