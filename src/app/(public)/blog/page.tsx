import Link from "next/link";
import { ArrowRight, BookOpen, TrendingUp, DollarSign, Users, Target, Megaphone, Building } from "lucide-react";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/animations";

export const metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Artigos sobre gestão de restaurantes, food service, finanças, liderança, expansão e franquias. Conteúdo prático por João Pedro Alves.",
  path: "/blog",
});

const categories = [
  { name: "Gestão Financeira", icon: DollarSign, slug: "financeiro", count: "Em breve" },
  { name: "Liderança e Equipe", icon: Users, slug: "lideranca", count: "Em breve" },
  { name: "Processos e Operação", icon: Building, slug: "processos", count: "Em breve" },
  { name: "Expansão e Franquias", icon: TrendingUp, slug: "expansao", count: "Em breve" },
  { name: "Marketing para Restaurantes", icon: Megaphone, slug: "marketing", count: "Em breve" },
  { name: "Planejamento Estratégico", icon: Target, slug: "estrategia", count: "Em breve" },
];

const upcomingArticles = [
  {
    title: "Como Calcular o CMV do Seu Restaurante (Passo a Passo)",
    category: "Gestão Financeira",
    description: "Guia completo com planilha para calcular seu Custo de Mercadoria Vendida e descobrir a margem real de cada prato.",
  },
  {
    title: "Por Que 35% dos Restaurantes Fecham em 2 Anos — e Como Evitar",
    category: "Gestão",
    description: "Os 5 erros fatais que levam restaurantes à falência e o que fazer para não ser mais uma estatística.",
  },
  {
    title: "Como Sair da Operação do Restaurante em 6 Meses",
    category: "Processos",
    description: "O roteiro prático para deixar de ser refém do seu próprio negócio usando padronização de processos.",
  },
  {
    title: "Precificação de Cardápio: O Guia Definitivo",
    category: "Gestão Financeira",
    description: "Como definir preços com base em custos reais, margem de contribuição e posicionamento de mercado.",
  },
  {
    title: "Como Reduzir Rotatividade de Equipe no Seu Restaurante",
    category: "Liderança",
    description: "Estratégias práticas para reter talentos, criar plano de carreira e reduzir o turnover que corrói seu lucro.",
  },
  {
    title: "De Restaurante Local a Franquia: O Caminho Completo",
    category: "Expansão",
    description: "O que você precisa ter documentado, padronizado e validado antes de formatar sua operação para franquia.",
  },
];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.12)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
                <BookOpen size={16} />
                Conteúdo prático para donos de restaurante
              </p>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Blog <span className="serif-italic gradient-text">IJA</span>
              </h1>
              <p className="mt-6 text-lg text-navy-300">
                Artigos, guias e insights para quem quer organizar, lucrar e expandir
                seu restaurante. Conteúdo 100% prático, direto ao ponto.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Category Bar */}
      <div className="sticky top-16 z-30 border-b border-navy-100/50 bg-cream/95 backdrop-blur-md lg:top-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto py-3 text-sm scrollbar-hide">
            <span className="whitespace-nowrap font-bold text-navy-950">
              BLOG IJA
            </span>
            {categories.map((cat) => (
              <span
                key={cat.slug}
                className="whitespace-nowrap font-medium text-navy-500 cursor-default"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl font-bold text-navy-950">
              Explore por <span className="serif-italic gradient-text">categoria</span>
            </h2>
            <p className="mt-3 text-navy-600">
              Conteúdo organizado por área de gestão para você encontrar exatamente o que precisa.
            </p>
          </FadeInUp>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <div className="card-hover-subtle group flex items-center gap-4 rounded-3xl border border-navy-100/50 bg-white p-6 transition-all hover:border-accent/20">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all group-hover:bg-accent group-hover:text-white">
                    <cat.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950">{cat.name}</h3>
                    <p className="text-sm text-navy-400">{cat.count}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Upcoming Articles */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="flex items-end justify-between">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">
                  Em breve
                </p>
                <h2 className="text-3xl font-bold text-navy-950">
                  Próximos artigos
                </h2>
              </div>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingArticles.map((article) => (
              <StaggerItem key={article.title}>
                <div className="card-hover group flex h-full flex-col rounded-3xl border border-navy-100/50 bg-cream/30 p-8 transition-all hover:bg-white hover:border-accent/20">
                  {/* Category placeholder photo area */}
                  <div className="mb-6 flex h-48 items-center justify-center rounded-2xl bg-navy-950 noise-overlay relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(166,133,35,0.1)_0%,_transparent_60%)]" />
                    <span className="relative text-4xl font-bold text-white/5 select-none">IJA</span>
                  </div>
                  <span className="inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                    {article.category}
                  </span>
                  <h3 className="mt-3 flex-1 text-lg font-bold text-navy-950 leading-snug group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-navy-600 leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-cream-dark py-24 lg:py-32 dot-pattern-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-2xl rounded-3xl border border-navy-100/50 bg-white p-10 text-center shadow-lg shadow-navy-950/5 lg:p-14">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-gold-700 text-white shadow-lg shadow-accent/20">
                <BookOpen size={28} />
              </div>
              <h2 className="text-2xl font-bold text-navy-950 lg:text-3xl">
                Quer receber conteúdo{" "}
                <span className="serif-italic gradient-text">na prática?</span>
              </h2>
              <p className="mt-4 text-navy-600">
                Enquanto preparamos nossos artigos, agende um diagnóstico gratuito e
                receba uma análise personalizada do seu restaurante.
              </p>
              <Link
                href="/diagnostico"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                Agendar diagnóstico gratuito
                <ArrowRight size={18} />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
