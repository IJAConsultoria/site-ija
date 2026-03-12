# Instituto João Alves — Site Institucional

Site do **Instituto João Alves (IJA)**, consultoria especializada em estruturar restaurantes e food service para expansão.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS v4
- **Animações:** Framer Motion
- **CMS/Auth:** Supabase
- **Editor:** Tiptap (rich text)
- **Deploy:** Vercel

## Estrutura

```
src/
├── app/
│   ├── (public)/          # Páginas do site
│   │   ├── page.tsx       # Home
│   │   ├── sobre/         # Sobre o IJA
│   │   ├── metodo/        # Método Tripé da Expansão
│   │   ├── segmentos/     # Segmentos atendidos
│   │   ├── solucoes/      # 4 soluções de consultoria
│   │   ├── cases/         # Cases de sucesso
│   │   ├── eventos/       # Lives, webinars, workshops
│   │   ├── blog/          # Blog (artigos do Supabase)
│   │   ├── contato/       # Página de contato
│   │   └── diagnostico/   # Diagnóstico gratuito
│   ├── acesso/            # Admin CMS (protegido)
│   │   ├── page.tsx       # Login
│   │   ├── painel/        # Dashboard
│   │   └── artigos/       # CRUD de artigos
│   └── layout.tsx         # Layout raiz
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── animations.tsx
│   └── admin/             # Componentes do CMS
│       ├── Sidebar.tsx
│       ├── TiptapEditor.tsx
│       └── ArticleEditor.tsx
├── lib/
│   ├── constants.ts       # Dados centrais (segmentos, soluções, eventos, cases)
│   ├── seo.ts             # Helpers de SEO e Schema.org
│   ├── tracking.ts        # Tracking helpers
│   ├── queries/blog.ts    # CRUD artigos (Supabase)
│   └── supabase/          # Clients Supabase (browser, server, middleware)
└── docs/
    └── SUPABASE-MIGRATION.sql  # SQL para criar tabelas
```

## Setup local

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local
# Preencher NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY

# Rodar em desenvolvimento
npm run dev
```

## Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute o SQL de `docs/SUPABASE-MIGRATION.sql` no SQL Editor
3. Crie um usuário admin em **Authentication > Users**
4. Copie a URL e anon key para `.env.local`

## Deploy

O projeto faz deploy automático na Vercel a cada push na branch `main`.

Variáveis de ambiente necessárias na Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Sobre o IJA

- **Fundador:** João Pedro Alves
- **Experiência:** 14 anos em consultoria para food service
- **Método:** Tripé da Expansão (Padronização + Universidade Corporativa + Controle de Qualidade)
- **Resultados:** +120 negócios transformados, +R$ 40M em lucratividade gerada
- **Localização:** Cabo Frio/RJ — Atende RJ, SP, ES e RS
