import { createClient } from "@/lib/supabase/client";

const BUCKET = "cms-assets";

function slugifyName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function uploadFile(file: File, folder = "uploads"): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "bin";
  const base = slugifyName(file.name.replace(/\.[^.]+$/, "")).slice(0, 60) || "file";
  const path = `${folder}/${Date.now()}-${base}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deleteByPublicUrl(url: string) {
  if (!url || !url.includes(`/${BUCKET}/`)) return;
  const supabase = createClient();
  const path = url.split(`/${BUCKET}/`)[1];
  if (!path) return;
  await supabase.storage.from(BUCKET).remove([path]);
}
