import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import type { Article } from "@/lib/queries/blog";
import type { BlogComment } from "@/lib/queries/comments";
import CommentSection from "@/components/blog/CommentSection";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return [{ slug: "__placeholder__" }];
    const res = await fetch(
      `${url}/rest/v1/articles_ija?status=eq.published&select=slug`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "force-cache" }
    );
    if (!res.ok) return [{ slug: "__placeholder__" }];
    const data = (await res.json()) as { slug: string }[];
    // Next.js exige pelo menos 1 param com output: export
    return data.length > 0 ? data.map((a) => ({ slug: a.slug })) : [{ slug: "__placeholder__" }];
  } catch {
    return [{ slug: "__placeholder__" }];
  }
}

async function sb<T>(path: string): Promise<T | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "force-cache",
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

async function getData(slug: string) {
  const articles = await sb<Article[]>(
    `articles?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=*&limit=1`
  );
  const article = articles?.[0];
  if (!article) return null;
  const comments =
    (await sb<BlogComment[]>(
      `blog_comments?article_id=eq.${article.id}&status=eq.approved&select=*&order=created_at.desc`
    )) || [];
  return { article, comments };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) return { title: "Artigo não encontrado" };
  const a = data.article;
  return {
    title: a.meta_title || a.title,
    description: a.meta_description || a.excerpt,
    openGraph: {
      title: a.meta_title || a.title,
      description: a.meta_description || a.excerpt,
      images: a.seo_og_image || a.cover_url ? [a.seo_og_image || a.cover_url!] : [],
    },
    alternates: a.seo_canonical ? { canonical: a.seo_canonical } : undefined,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getData(slug);
  if (!data) notFound();
  const { article: a, comments } = data;

  return (
    <article className="bg-cream pb-24">
      {/* Hero */}
      <header className="relative bg-navy-950 py-16 lg:py-24 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(166,133,35,0.1)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1 text-sm text-navy-400 hover:text-accent"
          >
            <ArrowLeft size={14} /> Voltar ao blog
          </Link>
          {a.category && (
            <span className="mb-3 inline-block rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
              {a.category}
            </span>
          )}
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{a.title}</h1>
          {a.excerpt && <p className="mt-4 text-lg text-navy-300">{a.excerpt}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-navy-400">
            <span className="flex items-center gap-1.5">
              <User size={14} /> {a.author}
            </span>
            {a.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(a.published_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </header>

      {a.cover_url && (
        <div className="mx-auto -mt-8 max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.cover_url} alt={a.title} className="w-full rounded-2xl shadow-xl" />
        </div>
      )}

      {/* Content */}
      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:px-8">
        <div
          className="prose prose-lg max-w-none prose-headings:text-navy-950 prose-p:text-navy-700 prose-a:text-accent prose-strong:text-navy-950"
          dangerouslySetInnerHTML={{ __html: a.content }}
        />

        {/* CTA Banner */}
        {a.cta_enabled && (a.cta_title || a.cta_description) && (
          <div className="mt-12 overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-navy-950 to-navy-900 p-8 text-white shadow-xl lg:p-10">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center">
              {a.cta_image && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={a.cta_image} alt="" className="h-32 w-32 rounded-2xl object-cover" />
              )}
              <div className="flex-1">
                {a.cta_title && <h3 className="text-2xl font-bold">{a.cta_title}</h3>}
                {a.cta_description && (
                  <p className="mt-2 text-navy-300">{a.cta_description}</p>
                )}
                {a.cta_button_text && a.cta_button_url && (
                  <Link
                    href={a.cta_button_url}
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
                  >
                    {a.cta_button_text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Comments */}
        <CommentSection articleId={a.id} initialComments={comments} />
      </div>
    </article>
  );
}
