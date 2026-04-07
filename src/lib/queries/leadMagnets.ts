import { createClient } from "@/lib/supabase/client";

export type LeadMagnet = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_url: string | null;
  file_url: string | null;
  cover_url: string | null;
  active: boolean;
  download_count: number;
  created_at: string;
  updated_at: string;
};

export async function getLeadMagnets(activeOnly = false) {
  const supabase = createClient();
  let query = supabase.from("lead_magnets").select("*").order("created_at", { ascending: false });
  if (activeOnly) query = query.eq("active", true);
  const { data, error } = await query;
  if (error) throw error;
  return data as LeadMagnet[];
}

export async function getLeadMagnet(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("lead_magnets").select("*").eq("id", id).single();
  if (error) throw error;
  return data as LeadMagnet;
}

export async function createLeadMagnet(input: Partial<LeadMagnet>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("lead_magnets").insert(input).select().single();
  if (error) throw error;
  return data as LeadMagnet;
}

export async function updateLeadMagnet(id: string, input: Partial<LeadMagnet>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lead_magnets")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as LeadMagnet;
}

export async function deleteLeadMagnet(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("lead_magnets").delete().eq("id", id);
  if (error) throw error;
}
