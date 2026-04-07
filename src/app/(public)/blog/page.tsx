import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight, Calendar, User } from "lucide-react";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import { FadeInUp } from "@/components/animations";
import type { Article } from "@/lib/queries/blog";

export const metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Artigos sobre gestão de restaurantes, food service, finanças, liderança, expansão e franquias. Conteúdo prático por João Pedro Alves.",
  path: "/blog",
});

async function getArticles(): Promise<Article[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const res = await fetch(
    `${url}/rest/v1/articles_ija?status=eq.published&select=*&order=published_at.desc`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "force-cache" }
  );
  if (!res.ok) return [];
  return (await res.json()) as Article[];
}

export default async function BlogPage() {
  const articles = await getArticles();

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

      {/* Articles */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-3xl border border-navy-100/50 bg-white p-12 text-center shadow-sm">
              <BookOpen size={36} className="mx-auto mb-3 text-navy-300" />
              <h2 className="text-xl font-bold text-navy-950">Em breve</h2>
              <p className="mt-2 text-navy-600">
                Estamos preparando os primeiros artigos. Volte logo!
              </p>
              <Link
                href="/diagnostico"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                Agendar diagnóstico gratuito
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link
                  key={a.id}
                  href={`/blog/${a.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100/50 bg-white transition-all hover:border-accent/30"
                >
                  {a.cover_url ? (
                    <div className="relative h-48 w-full overflow-hidden bg-navy-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.cover_url}
                        alt={a.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-navy-950 noise-overlay">
                      <Image
                        src="/images/logo/ija-icone-azul.png"
                        alt=""
                        width={48}
                        height={48}
                        className="opacity-20 brightness-0 invert"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {a.category && (
                      <span className="mb-2 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                        {a.category}
                      </span>
                    )}
                    <h3 className="text-lg font-bold leading-snug text-navy-950 group-hover:text-accent">
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-navy-600">
                        {a.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-3 text-xs text-navy-400">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {a.author}
                      </span>
                      {a.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(a.published_at).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
