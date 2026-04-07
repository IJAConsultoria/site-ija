import { createClient } from "@/lib/supabase/client";

export type CommentStatus = "pending" | "approved" | "rejected";

export type BlogComment = {
  id: string;
  article_id: string;
  name: string;
  email: string;
  phone: string | null;
  comment: string;
  status: CommentStatus;
  created_at: string;
  updated_at: string;
};

export async function getComments(status?: CommentStatus) {
  const supabase = createClient();
  let query = supabase
    .from("blog_comments")
    .select("*, articles(title, slug)")
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return data as (BlogComment & { articles: { title: string; slug: string } | null })[];
}

export async function getApprovedComments(articleId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .select("*")
    .eq("article_id", articleId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as BlogComment[];
}

export async function createComment(input: {
  article_id: string;
  name: string;
  email: string;
  phone?: string;
  comment: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_comments")
    .insert({ ...input, status: "pending" })
    .select()
    .single();
  if (error) throw error;
  return data as BlogComment;
}

export async function updateCommentStatus(id: string, status: CommentStatus) {
  const supabase = createClient();
  const { error } = await supabase.from("blog_comments").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteComment(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("blog_comments").delete().eq("id", id);
  if (error) throw error;
}

export async function getCommentStats() {
  const supabase = createClient();
  const { data, error } = await supabase.from("blog_comments").select("status");
  if (error) throw error;
  return {
    total: data.length,
    pending: data.filter((c) => c.status === "pending").length,
    approved: data.filter((c) => c.status === "approved").length,
    rejected: data.filter((c) => c.status === "rejected").length,
  };
}
