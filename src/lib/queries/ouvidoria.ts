import { createClient } from "@/lib/supabase/client";

export type OuvidoriaTipo = "elogio" | "sugestao" | "reclamacao" | "denuncia";
export type OuvidoriaStatus = "novo" | "lido" | "respondido" | "arquivado";

export type OuvidoriaMensagem = {
  id: string;
  protocolo: string;
  empresa: string;
  cargo: string | null;
  nome: string | null;
  email: string | null;
  tipo: OuvidoriaTipo;
  sobre_quem: string | null;
  resposta_desejada: boolean;
  mensagem: string;
  sugestao_melhoria: string | null;
  ja_tentou_resolver: boolean | null;
  acoes_tomadas: string | null;
  gravidade: "alta" | "media" | "baixa" | null;
  forma_contato: string | null;
  anexo_url: string | null;
  identificado: boolean;
  aceite_lgpd: boolean;
  aceite_lgpd_at: string | null;
  status: OuvidoriaStatus;
  created_at: string;
  updated_at: string;
};

export async function getOuvidorias(status?: OuvidoriaStatus) {
  const supabase = createClient();
  let q = supabase
    .from("ouvidoria_mensagens_ija")
    .select("*")
    .order("created_at", { ascending: false });
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) throw error;
  return data as OuvidoriaMensagem[];
}

export async function getOuvidoriaStats() {
  const supabase = createClient();
  const { data, error } = await supabase.from("ouvidoria_mensagens_ija").select("status, tipo");
  if (error) throw error;
  return {
    total: data.length,
    novos: data.filter((d) => d.status === "novo").length,
    elogios: data.filter((d) => d.tipo === "elogio").length,
    sugestoes: data.filter((d) => d.tipo === "sugestao").length,
    reclamacoes: data.filter((d) => d.tipo === "reclamacao").length,
    denuncias: data.filter((d) => d.tipo === "denuncia").length,
  };
}

export async function createOuvidoria(input: Omit<Partial<OuvidoriaMensagem>, "id" | "protocolo" | "created_at" | "updated_at"> & { empresa: string; tipo: OuvidoriaTipo; mensagem: string }) {
  const supabase = createClient();
  // Gera protocolo via RPC
  const { data: protocoloData } = await supabase.rpc("gerar_protocolo_ouvidoria");
  const protocolo = (protocoloData as string) || `IJA-${new Date().getFullYear()}-${Date.now()}`;

  const identificado = !!(input.nome || input.email);

  const { error } = await supabase
    .from("ouvidoria_mensagens_ija")
    .insert({
      ...input,
      protocolo,
      identificado,
      aceite_lgpd: true,
      aceite_lgpd_at: new Date().toISOString(),
      status: "novo",
    });
  if (error) throw error;
  return { protocolo } as OuvidoriaMensagem;
}

export async function updateOuvidoriaStatus(id: string, status: OuvidoriaStatus) {
  const supabase = createClient();
  const { error } = await supabase.from("ouvidoria_mensagens_ija").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteOuvidoria(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("ouvidoria_mensagens_ija").delete().eq("id", id);
  if (error) throw error;
}
