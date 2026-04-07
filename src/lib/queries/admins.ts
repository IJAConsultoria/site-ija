import { createClient } from "@/lib/supabase/client";

export type CmsAdmin = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
  created_at: string;
};

export async function getAdmins() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cms_admins_ija")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as CmsAdmin[];
}

export async function getCurrentAdmin(): Promise<CmsAdmin | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("cms_admins_ija").select("*").eq("id", user.id).maybeSingle();
  return (data as CmsAdmin) || null;
}

export async function upsertAdmin(input: Partial<CmsAdmin> & { id: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.from("cms_admins_ija").upsert(input).select().single();
  if (error) throw error;
  return data as CmsAdmin;
}

export async function updateAdminRole(id: string, role: "admin" | "editor") {
  const supabase = createClient();
  const { error } = await supabase.from("cms_admins_ija").update({ role }).eq("id", id);
  if (error) throw error;
}

export async function deleteAdmin(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("cms_admins_ija").delete().eq("id", id);
  if (error) throw error;
}
