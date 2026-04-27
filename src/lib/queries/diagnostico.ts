import { createClient } from "@/lib/supabase/client";
import type { SectionResult } from "@/lib/diagnostico/types";

// ============================================================
// SESSÕES
// ============================================================

// Campos da tabela diagnostico_sessoes_ija (excluindo id, started_at, completed_at)
const ALLOWED_FIELDS = new Set([
  "nome", "sobrenome", "email", "phone_number", "business_name",
  "revenue_range", "main_challenge", "status",
  "apex_session_id", "external_id", "ga_client_id", "client_id",
  "time_on_page_at_submit", "page_url", "page_path", "referrer_url",
  "landing_page", "utm_source", "utm_medium", "utm_campaign",
  "utm_content", "utm_term", "first_utm_source", "first_utm_medium",
  "first_utm_campaign", "gclid", "fbclid", "ttclid", "fbc", "fbp",
  "device_type", "user_agent",
]);

export async function createDiagnosticSession(data: {
  nome: string;
  sobrenome: string | null;
  email: string;
  phone_number: string | null;
  business_name: string | null;
  revenue_range: string | null;
  main_challenge?: string | null;
  [key: string]: unknown; // tracking fields
}) {
  const supabase = createClient();

  // Filtrar apenas campos que existem na tabela
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (ALLOWED_FIELDS.has(key)) {
      filtered[key] = value;
    }
  }

  const { data: session, error } = await supabase
    .from("diagnostico_sessoes_ija")
    .insert({
      ...filtered,
      status: "in_progress",
    })
    .select("id")
    .single();

  if (error) throw error;
  return session.id as string;
}

export async function updateSessionStatus(
  sessionId: string,
  status: "completed" | "abandoned",
  completedAt?: string
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("diagnostico_sessoes_ija")
    .update({
      status,
      ...(completedAt ? { completed_at: completedAt } : {}),
    })
    .eq("id", sessionId);

  if (error) throw error;
}

export async function getSessionById(sessionId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("diagnostico_sessoes_ija")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (error) throw error;
  return data;
}

// ============================================================
// RESPOSTAS
// ============================================================

export async function saveAnswers(
  sessionId: string,
  answers: Record<string, boolean>
) {
  const supabase = createClient();
  const rows = Object.entries(answers).map(([questionId, answer]) => ({
    session_id: sessionId,
    question_id: questionId,
    answer,
  }));

  const { error } = await supabase
    .from("diagnostico_respostas_ija")
    .insert(rows);

  if (error) throw error;
}

// ============================================================
// RESULTADOS
// ============================================================

export async function saveResults(
  sessionId: string,
  sectionResults: SectionResult[]
) {
  const supabase = createClient();
  const rows = sectionResults.map((r) => ({
    session_id: sessionId,
    section: r.section,
    solution: r.solution,
    bloco: r.bloco,
    total_questions: r.total,
    negative_count: r.negative_count,
    negative_pct: r.negative_pct,
    classification: r.classification,
  }));

  const { error } = await supabase
    .from("diagnostico_resultados_ija")
    .insert(rows);

  if (error) throw error;
}

export async function getResultsBySession(sessionId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("diagnostico_resultados_ija")
    .select("*")
    .eq("session_id", sessionId)
    .order("id", { ascending: true });

  if (error) throw error;
  return data;
}

// ============================================================
// ADMIN — listagem e detalhes
// ============================================================

export async function getAllDiagnostics() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("diagnostico_sessoes_ija")
    .select("id, nome, sobrenome, email, phone_number, business_name, revenue_range, status, started_at, completed_at")
    .order("started_at", { ascending: false })
    .limit(500);

  if (error) throw error;
  return data || [];
}

export async function getDiagnosticDetail(sessionId: string) {
  const supabase = createClient();

  const [sessionRes, resultsRes, answersRes] = await Promise.all([
    supabase
      .from("diagnostico_sessoes_ija")
      .select("*")
      .eq("id", sessionId)
      .single(),
    supabase
      .from("diagnostico_resultados_ija")
      .select("*")
      .eq("session_id", sessionId)
      .order("id", { ascending: true }),
    supabase
      .from("diagnostico_respostas_ija")
      .select("question_id, answer")
      .eq("session_id", sessionId),
  ]);

  if (sessionRes.error) throw sessionRes.error;

  return {
    session: sessionRes.data,
    results: resultsRes.data || [],
    answers: answersRes.data || [],
  };
}
