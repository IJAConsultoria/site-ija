import { createClient } from "@/lib/supabase/client";

export type BannerPosition =
  | "above-header"
  | "below-header"
  | "floating-bottom"
  | "popup-center"
  | "popup-side";

export type SiteBanner = {
  id: string;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_url: string | null;
  image_url: string | null;
  display_mode: "banner" | "popup";
  position: BannerPosition;
  dismissible: boolean;
  bg_color: string;
  text_color: string;
  start_date: string | null;
  end_date: string | null;
  active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
};

export async function getBanners() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("site_banners")
    .select("*")
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as SiteBanner[];
}

export async function getBanner(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("site_banners").select("*").eq("id", id).single();
  if (error) throw error;
  return data as SiteBanner;
}

export async function createBanner(input: Partial<SiteBanner>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("site_banners").insert(input).select().single();
  if (error) throw error;
  return data as SiteBanner;
}

export async function updateBanner(id: string, input: Partial<SiteBanner>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("site_banners")
    .update(input)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as SiteBanner;
}

export async function deleteBanner(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("site_banners").delete().eq("id", id);
  if (error) throw error;
}
