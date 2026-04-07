import { createClient } from "@/lib/supabase/client";

export type LeadEntry = {
  id: string;
  source: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  business: string | null;
  segment: string | null;
  message: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

// Unifica leads das 3 tabelas existentes pra exibir num único "Email Marketing"
export async function getAllLeads(): Promise<LeadEntry[]> {
  const supabase = createClient();

  const [waitlist, eventos, especialista] = await Promise.all([
    supabase
      .from("leads")
      .select("id, created_at, name, email, whatsapp, utm_source, utm_medium, utm_campaign")
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("leads-eventos-ija")
      .select(
        "id, created_at, nome, sobrenome, email, phone_number, event_title, business_name, utm_source, utm_medium, utm_campaign"
      )
      .order("created_at", { ascending: false })
      .limit(500),
    supabase
      .from("leads-falar-com-especialista-form-ija")
      .select(
        "id, created_at, nome, sobrenome, email, phone_number, business_name, segment, message, utm_source, utm_medium, utm_campaign"
      )
      .order("created_at", { ascending: false })
      .limit(500),
  ]);

  const out: LeadEntry[] = [];

  (waitlist.data || []).forEach((l: Record<string, unknown>) => {
    out.push({
      id: `wl-${l.id}`,
      source: "Lista de Espera",
      created_at: l.created_at as string,
      name: (l.name as string) || "—",
      email: (l.email as string) || "",
      phone: (l.whatsapp as string) || null,
      business: null,
      segment: null,
      message: null,
      utm_source: (l.utm_source as string) || null,
      utm_medium: (l.utm_medium as string) || null,
      utm_campaign: (l.utm_campaign as string) || null,
    });
  });

  (eventos.data || []).forEach((l: Record<string, unknown>) => {
    out.push({
      id: `ev-${l.id}`,
      source: `Evento: ${(l.event_title as string) || "—"}`,
      created_at: l.created_at as string,
      name: `${l.nome || ""} ${l.sobrenome || ""}`.trim() || "—",
      email: (l.email as string) || "",
      phone: (l.phone_number as string) || null,
      business: (l.business_name as string) || null,
      segment: null,
      message: null,
      utm_source: (l.utm_source as string) || null,
      utm_medium: (l.utm_medium as string) || null,
      utm_campaign: (l.utm_campaign as string) || null,
    });
  });

  (especialista.data || []).forEach((l: Record<string, unknown>) => {
    out.push({
      id: `es-${l.id}`,
      source: "Falar com Especialista",
      created_at: l.created_at as string,
      name: `${l.nome || ""} ${l.sobrenome || ""}`.trim() || "—",
      email: (l.email as string) || "",
      phone: (l.phone_number as string) || null,
      business: (l.business_name as string) || null,
      segment: (l.segment as string) || null,
      message: (l.message as string) || null,
      utm_source: (l.utm_source as string) || null,
      utm_medium: (l.utm_medium as string) || null,
      utm_campaign: (l.utm_campaign as string) || null,
    });
  });

  return out.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}
