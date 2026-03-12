declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Gera ou recupera o session ID do sessionStorage.
 * Padrão: apex_session_id
 */
export function getSessionId(): string {
  try {
    const key = "apex_session_id";
    let s = sessionStorage.getItem(key);
    if (!s) {
      s = Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem(key, s);
    }
    return s;
  } catch {
    return Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }
}

/**
 * Registra o timestamp de início da página para calcular time_on_page.
 */
export function getPageStartTime(): number {
  return Date.now();
}

/**
 * Calcula segundos na página até o momento do submit.
 */
export function getTimeOnPage(pageStart: number): number {
  return Math.round((Date.now() - pageStart) / 1000);
}

/**
 * Extrai UTMs da URL atual.
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  keys.forEach((key) => {
    const val = params.get(key);
    if (val) utms[key] = val;
  });
  return utms;
}

/**
 * Remove máscara do telefone — retorna apenas dígitos.
 */
export function stripPhoneMask(phone: string): string {
  return phone.replace(/\D/g, "");
}

/**
 * Separa nome completo em nome e sobrenome.
 */
export function splitName(fullName: string): { nome: string; sobrenome: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    nome: parts[0] || "",
    sobrenome: parts.slice(1).join(" ") || "",
  };
}

/**
 * Push do dataLayer para form_submit_success com todos os campos padrão.
 */
export function pushFormSubmit({
  email,
  phoneNumber,
  nome,
  sobrenome,
  sessionId,
  timeOnPage,
  formName,
  extraData,
}: {
  email: string;
  phoneNumber: string;
  nome: string;
  sobrenome: string;
  sessionId: string;
  timeOnPage: number;
  formName: string;
  extraData?: Record<string, unknown>;
}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "form_submit_success",
    email: email.trim().toLowerCase(),
    phoneNumber: stripPhoneMask(phoneNumber),
    nome,
    sobrenome,
    apex_session_id: sessionId,
    time_on_page_at_submit: timeOnPage,
    form_name: formName,
    ...getUtmParams(),
    ...extraData,
  });
}

/**
 * Máscara de telefone brasileiro: (00) 00000-0000
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}
