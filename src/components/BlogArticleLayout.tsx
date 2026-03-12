"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, Clock, Calendar, User, ChevronRight, BookOpen, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

type Guide = {
  title: string;
  description: string;
  tag: string;
  href: string;
};

type BlogArticleLayoutProps = {
  children: React.ReactNode;
  title: string;
  category: string;
  categoryHref: string;
  author?: string;
  date?: string;
  readTime?: string;
  toc: TOCItem[];
  guides?: Guide[];
  relatedArticles?: { title: string; href: string; category: string }[];
};

const defaultGuides: Guide[] = [
  {
    title: "Como Calcular o CMV do Seu Restaurante",
    description: "Planilha prática + passo a passo para descobrir seu custo real",
    tag: "Kit",
    href: "/diagnostico",
  },
  {
    title: "Checklist: 8 Áreas de Gestão para Restaurantes",
    description: "Avalie rapidamente a maturidade de gestão do seu negócio",
    tag: "Ferramenta",
    href: "/diagnostico",
  },
];

export default function BlogArticleLayout({
  children,
  title,
  category,
  categoryHref,
  author = "João Pedro Alves",
  date,
  readTime,
  toc,
  guides = defaultGuides,
  relatedArticles,
}: BlogArticleLayoutProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Observe headings for active TOC item
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    const headings = document.querySelectorAll("h2[id], h3[id]");
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  // Show back-to-top after scrolling
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Category Bar (sticky) */}
      <div className="sticky top-16 z-30 border-b border-navy-100/50 bg-cream/95 backdrop-blur-md lg:top-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto py-3 text-sm scrollbar-hide">
            <Link
              href="/blog"
              className="whitespace-nowrap font-bold text-navy-950 hover:text-accent transition-colors"
            >
              BLOG IJA
            </Link>
            {[
              { label: "Gestão Financeira", href: "/blog?cat=financeiro" },
              { label: "Liderança", href: "/blog?cat=lideranca" },
              { label: "Processos", href: "/blog?cat=processos" },
              { label: "Growth", href: "/blog?cat=growth" },
              { label: "Gestão", href: "/blog?cat=gestao" },
              { label: "Expansão", href: "/blog?cat=expansao" },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className={`whitespace-nowrap font-medium transition-colors hover:text-accent ${
                  cat.label === category ? "text-accent" : "text-navy-500"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <article className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-navy-400">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <Link href={categoryHref} className="hover:text-accent transition-colors">
              {category}
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-12 max-w-3xl">
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent">
              {category}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-navy-950 sm:text-4xl lg:text-5xl leading-[1.15]">
              {title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-navy-500">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {author}
              </span>
              {date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {date}
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {readTime}
                </span>
              )}
            </div>
          </header>

          {/* Content Grid: Article + Sidebar */}
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px]">
            {/* Main Content */}
            <div
              ref={contentRef}
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-navy-950
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-28
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-28
                prose-p:text-navy-700 prose-p:leading-relaxed
                prose-strong:text-navy-950
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-li:text-navy-700
                prose-blockquote:border-l-accent prose-blockquote:text-navy-600 prose-blockquote:italic
                prose-img:rounded-2xl
              "
            >
              {children}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-36 space-y-8">
                {/* Table of Contents */}
                <div className="rounded-3xl border border-navy-100/50 bg-white p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-navy-400">
                    <BookOpen size={14} />
                    Navegue pelo índice
                  </h3>
                  <div className="relative">
                    {/* Active indicator line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-navy-100 rounded-full" />
                    <nav className="space-y-1">
                      {toc.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`relative block py-1.5 text-sm transition-all duration-200 ${
                            item.level === 3 ? "pl-8" : "pl-4"
                          } ${
                            activeId === item.id
                              ? "text-accent font-semibold"
                              : "text-navy-500 hover:text-navy-700"
                          }`}
                        >
                          {activeId === item.id && (
                            <motion.div
                              layoutId="toc-active"
                              className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent rounded-full"
                              transition={{ duration: 0.2 }}
                            />
                          )}
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* CTA Banner */}
                <div className="overflow-hidden rounded-3xl bg-navy-950 p-6 noise-overlay relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.15)_0%,_transparent_60%)]" />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-wider text-accent">
                      Diagnóstico Gratuito
                    </p>
                    <h4 className="mt-2 text-lg font-bold text-white leading-snug">
                      Descubra o que está travando seu restaurante
                    </h4>
                    <p className="mt-2 text-sm text-navy-300">
                      Análise das 8 áreas de gestão em 30-45 minutos. Sem compromisso.
                    </p>
                    <Link
                      href="/diagnostico"
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-dark"
                    >
                      Agendar agora
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Guides & Tools */}
                {guides.length > 0 && (
                  <div className="rounded-3xl border border-navy-100/50 bg-white p-6">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-400">
                      Guias e Ferramentas
                    </h3>
                    <div className="space-y-4">
                      {guides.map((guide) => (
                        <Link
                          key={guide.title}
                          href={guide.href}
                          className="group block rounded-2xl border border-navy-100/50 bg-cream/50 p-4 transition-all hover:border-accent/20 hover:bg-cream"
                        >
                          <span className="inline-block rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                            {guide.tag}
                          </span>
                          <h4 className="mt-2 text-sm font-bold text-navy-950 group-hover:text-accent transition-colors leading-snug">
                            {guide.title}
                          </h4>
                          <p className="mt-1 text-xs text-navy-500 leading-relaxed">
                            {guide.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Mobile TOC (bottom sheet style) */}
          <div className="fixed bottom-6 left-4 right-4 z-30 lg:hidden">
            <details className="group rounded-2xl border border-navy-100/50 bg-white/95 backdrop-blur-md shadow-xl">
              <summary className="flex cursor-pointer items-center justify-between px-5 py-3 text-sm font-semibold text-navy-950">
                <span className="flex items-center gap-2">
                  <BookOpen size={14} className="text-accent" />
                  Índice do artigo
                </span>
                <ChevronRight size={14} className="transition-transform group-open:rotate-90" />
              </summary>
              <nav className="max-h-60 overflow-y-auto border-t border-navy-100/50 px-5 py-3">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-2 text-sm ${
                      item.level === 3 ? "pl-4" : ""
                    } ${
                      activeId === item.id
                        ? "text-accent font-semibold"
                        : "text-navy-600"
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </details>
          </div>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <section className="mt-20 border-t border-navy-100/50 pt-16">
              <h2 className="text-2xl font-bold text-navy-950">Artigos relacionados</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group rounded-3xl border border-navy-100/50 bg-white p-6 transition-all hover:border-accent/20 hover:shadow-md"
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      {article.category}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-navy-950 group-hover:text-accent transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Ler artigo
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-20 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-white shadow-lg transition-colors hover:bg-accent lg:bottom-8 lg:right-8"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
