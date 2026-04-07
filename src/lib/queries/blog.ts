import { createClient } from "@/lib/supabase/client";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  category: string;
  tags: string[];
  status: "draft" | "published";
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  seo_canonical: string | null;
  seo_keyword: string | null;
  seo_og_image: string | null;
  cta_enabled: boolean;
  cta_title: string | null;
  cta_description: string | null;
  cta_button_text: string | null;
  cta_button_url: string | null;
  cta_image: string | null;
  lead_magnet_id: string | null;
  author_avatar: string | null;
};

export async function getArticleBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles_ija")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  return data as Article | null;
}

export async function getPublishedArticles() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles_ija")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return data as Article[];
}

export async function getArticles(status?: "draft" | "published") {
  const supabase = createClient();
  let query = supabase
    .from("articles_ija")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Article[];
}

export async function getArticle(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles_ija")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Article;
}

export async function createArticle(article: Partial<Article>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles_ija")
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data as Article;
}

export async function updateArticle(id: string, article: Partial<Article>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles_ija")
    .update({ ...article, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Article;
}

export async function deleteArticle(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("articles_ija").delete().eq("id", id);
  if (error) throw error;
}

export async function getArticleStats() {
  const supabase = createClient();
  const { data, error } = await supabase.from("articles_ija").select("status");

  if (error) throw error;

  const total = data.length;
  const published = data.filter((a) => a.status === "published").length;
  const drafts = data.filter((a) => a.status === "draft").length;

  return { total, published, drafts };
}
