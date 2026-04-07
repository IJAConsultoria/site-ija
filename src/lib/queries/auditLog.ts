import { createClient } from "@/lib/supabase/client";

export type AuditAction = "view" | "status_change" | "delete" | "export";

export async function logOuvidoriaAccess(
  ouvidoriaId: string,
  action: AuditAction,
  metadata?: Record<string, unknown>
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("ouvidoria_access_log_ija").insert({
    ouvidoria_id: ouvidoriaId,
    admin_id: user.id,
    admin_email: user.email || "",
    action,
    metadata: metadata || null,
  });
}

export type OuvidoriaAccessLog = {
  id: string;
  ouvidoria_id: string;
  admin_id: string;
  admin_email: string;
  action: AuditAction;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export async function getOuvidoriaAccessLogs(ouvidoriaId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("ouvidoria_access_log_ija")
    .select("*")
    .eq("ouvidoria_id", ouvidoriaId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as OuvidoriaAccessLog[];
}
