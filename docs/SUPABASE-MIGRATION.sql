-- =============================================
-- IJA Blog - Migração Supabase
-- Execute este SQL no SQL Editor do Supabase
-- =============================================

-- Tabela de artigos do blog
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  cover_url TEXT,
  category TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author TEXT DEFAULT 'João Pedro Alves',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);

-- RLS (Row Level Security) - habilitar
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Política: leitura pública para artigos publicados
CREATE POLICY "Artigos publicados são públicos"
  ON articles FOR SELECT
  USING (status = 'published');

-- Política: usuários autenticados podem fazer tudo
CREATE POLICY "Admins podem gerenciar artigos"
  ON articles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================
-- Para criar o primeiro usuário admin:
-- Vá em Authentication > Users > Add User
-- Email: consultorjoao.alves@gmail.com
-- Defina uma senha segura
-- =============================================
