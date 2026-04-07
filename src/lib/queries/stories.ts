import { createClient } from "@/lib/supabase/client";

export type CustomerStory = {
  id: string;
  slug: string | null;
  company_name: string;
  segment: string | null;
  contact_name: string | null;
  contact_role: string | null;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  testimonial: string | null;
  logo_url: string | null;
  cover_url: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getStories(status?: "draft" | "published") {
  const supabase = createClient();
  let query = supabase.from("customer_stories_ija").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return data as CustomerStory[];
}

export async function getStory(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("customer_stories_ija").select("*").eq("id", id).single();
  if (error) throw error;
  return data as CustomerStory;
}

export async function createStory(input: Partial<CustomerStory>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("customer_stories_ija").insert(input).select().single();
  if (error) throw error;
  return data as CustomerStory;
}

export async function updateStory(id: string, input: Partial<CustomerStory>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("customer_stories_ija")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as CustomerStory;
}

export async function deleteStory(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("customer_stories_ija").delete().eq("id", id);
  if (error) throw error;
}
