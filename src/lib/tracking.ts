declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// =============================================
// SESSION & IDs
// =============================================

/**
 * Gera ou recupera o session ID do sessionStorage.
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
 * Gera ou recupera external_id (persistido em cookie para cross-session).
 */
export function getExternalId(): string {
  if (typeof document === "undefined") return "";
  const name = "apex_external_id";
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  const id = "lead_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  document.cookie = `${name}=${id};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  return id;
}

/**
 * Tenta ler o GA client ID do cookie _ga.
 */
export function getGaClientId(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/_ga=GA\d+\.\d+\.(.+)/);
  return match ? match[1] : "";
}

// =============================================
// TIME ON PAGE
// =============================================

export function getPageStartTime(): number {
  return Date.now();
}

export function getTimeOnPage(pageStart: number): number {
  return Math.round((Date.now() - pageStart) / 1000);
}

// =============================================
// UTMs (last-touch da URL atual)
// =============================================

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  keys.forEach((key) => {
    const val = params.get(key);
    if (val) utms[key] = val;
  });
  return utms;
}

// =============================================
// UTMs FIRST-TOUCH (persistido em cookie)
// =============================================

export function getFirstTouchUtms(): Record<string, string> {
  if (typeof document === "undefined") return {};
  const name = "ft_utms";
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    try {
      return JSON.parse(decodeURIComponent(match[2]));
    } catch {
      return {};
    }
  }
  // Se não existe, salva os UTMs atuais como first-touch
  const utms = getUtmParams();
  if (Object.keys(utms).length > 0) {
    const ftUtms: Record<string, string> = {};
    Object.entries(utms).forEach(([k, v]) => {
      ftUtms[`ft_${k}`] = v;
    });
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(ftUtms))};path=/;max-age=${30 * 24 * 60 * 60};SameSite=Lax`;
    return ftUtms;
  }
  return {};
}

// =============================================
// CLICK IDs (gclid, fbclid, etc.)
// =============================================

export function getClickIds(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const ids: Record<string, string> = {};
  const keys = [
    "gclid", "fbclid", "ttclid", "gbraid", "wbraid",
    "gad_campaignid", "gad_source", "msclkid",
  ];
  keys.forEach((key) => {
    // Tenta da URL primeiro, depois do cookie
    const val = params.get(key);
    if (val) {
      ids[key] = val;
      // Persiste em cookie para não perder
      document.cookie = `${key}=${val};path=/;max-age=${90 * 24 * 60 * 60};SameSite=Lax`;
    } else if (typeof document !== "undefined") {
      const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"));
      if (match) ids[key] = match[2];
    }
  });
  return ids;
}

// =============================================
// COOKIES META (fbc, fbp)
// =============================================

export function getMetaCookies(): Record<string, string> {
  if (typeof document === "undefined") return {};
  const cookies: Record<string, string> = {};
  ["_fbc", "_fbp"].forEach((name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) cookies[name.replace("_", "")] = match[2];
  });
  return cookies;
}

// =============================================
// DEVICE INFO
// =============================================

export function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

// =============================================
// PAGE INFO
// =============================================

export function getPageInfo(): Record<string, string> {
  if (typeof window === "undefined") return {};
  return {
    page_url: window.location.href,
    page_path: window.location.pathname,
    referrer_url: document.referrer || "",
    landing_page: sessionStorage.getItem("landing_page") || window.location.href,
  };
}

/**
 * Salva a landing page na primeira visita da sessão.
 * Chamar no useEffect do layout ou componente raiz.
 */
export function trackLandingPage(): void {
  if (typeof window === "undefined") return;
  if (!sessionStorage.getItem("landing_page")) {
    sessionStorage.setItem("landing_page", window.location.href);
  }
}

// =============================================
// COLLECT ALL HIDDEN FIELDS
// =============================================

/**
 * Coleta todos os campos ocultos de tracking de uma vez.
 * Usar nos formulários para enviar ao Supabase.
 */
export function getAllTrackingFields(sessionId: string, timeOnPage: number) {
  const utms = getUtmParams();
  const ftUtms = getFirstTouchUtms();
  const clickIds = getClickIds();
  const metaCookies = getMetaCookies();
  const pageInfo = getPageInfo();

  return {
    // Session/IDs
    apex_session_id: sessionId,
    external_id: getExternalId(),
    ga_client_id: getGaClientId(),
    client_id: getSessionId(),

    // Timing
    time_on_page_at_submit: timeOnPage,

    // Page
    page_url: pageInfo.page_url || null,
    page_path: pageInfo.page_path || null,
    referrer_url: pageInfo.referrer_url || null,
    landing_page: pageInfo.landing_page || null,

    // UTMs last-touch
    utm_source: utms.utm_source || null,
    utm_medium: utms.utm_medium || null,
    utm_campaign: utms.utm_campaign || null,
    utm_term: utms.utm_term || null,
    utm_content: utms.utm_content || null,

    // UTMs first-touch
    ft_utm_source: ftUtms.ft_utm_source || null,
    ft_utm_medium: ftUtms.ft_utm_medium || null,
    ft_utm_campaign: ftUtms.ft_utm_campaign || null,
    ft_utm_term: ftUtms.ft_utm_term || null,
    ft_utm_content: ftUtms.ft_utm_content || null,

    // Click IDs
    gclid: clickIds.gclid || null,
    fbclid: clickIds.fbclid || null,
    ttclid: clickIds.ttclid || null,
    gbraid: clickIds.gbraid || null,
    wbraid: clickIds.wbraid || null,
    gad_campaignid: clickIds.gad_campaignid || null,
    gad_source: clickIds.gad_source || null,
    msclkid: clickIds.msclkid || null,

    // Meta cookies
    fbc: metaCookies.fbc || null,
    fbp: metaCookies.fbp || null,

    // Device
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    device_type: getDeviceType(),
  };
}

// =============================================
// NAME & PHONE HELPERS
// =============================================

export function splitName(fullName: string): { nome: string; sobrenome: string } {
  const parts = fullName.trim().split(/\s+/);
  return {
    nome: parts[0] || "",
    sobrenome: parts.slice(1).join(" ") || "",
  };
}

export function stripPhoneMask(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// =============================================
// GTM DATALAYER PUSH
// =============================================

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
    event: "form_submit",
    email: email.trim().toLowerCase(),
    phoneNumber: stripPhoneMask(phoneNumber),
    nome,
    sobrenome,
    apex_session_id: sessionId,
    time_on_page_at_submit: timeOnPage,
    form_name: formName,
    ...getUtmParams(),
    ...getClickIds(),
    ...extraData,
  });
}
