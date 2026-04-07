/**
 * Cloudflare Pages Function: POST /api/ouvidoria/notify
 *
 * Envia email para todos os admins do CMS quando uma nova manifestação
 * de ouvidoria é registrada. Não bloqueia o submit do form.
 *
 * Env vars:
 *   - RESEND_API_KEY (segredo)
 *   - SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_ANON_KEY ou NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

const EMAIL_FROM = "Instituto João Alves <eventos@ijaconsultoria.com.br>";
const PANEL_URL = "https://www.ijaconsultoria.com.br/acesso/ouvidoria";

const TIPO_LABEL = {
  elogio: "Elogio",
  sugestao: "Sugestão",
  reclamacao: "Reclamação",
  denuncia: "Denúncia",
};

export async function onRequestPost({ request, env }) {
  try {
    const SUPABASE_URL = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_KEY = env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const RESEND_KEY = env.RESEND_API_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY || !RESEND_KEY) {
      return json({ error: "Configuração ausente." }, 500);
    }

    const body = await request.json();
    const { protocolo, empresa, tipo, identificado } = body || {};
    if (!protocolo) return json({ error: "Protocolo obrigatório." }, 400);

    // Busca emails dos admins
    const adminsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/cms_admins_ija?role=eq.admin&select=email,name`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!adminsRes.ok) return json({ error: "Falha ao buscar admins." }, 500);
    const admins = await adminsRes.json();

    if (!Array.isArray(admins) || admins.length === 0) {
      return json({ ok: true, notified: 0 });
    }

    const html = buildHtml({ protocolo, empresa, tipo, identificado });
    const subject = `[Ouvidoria IJA] Nova manifestação ${protocolo}`;

    // Envia em paralelo
    const results = await Promise.allSettled(
      admins.map((a) =>
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: EMAIL_FROM,
            to: a.email,
            subject,
            html,
          }),
        })
      )
    );

    const sent = results.filter((r) => r.status === "fulfilled" && r.value.ok).length;
    return json({ ok: true, notified: sent, total: admins.length });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
}

function buildHtml({ protocolo, empresa, tipo, identificado }) {
  const tipoLabel = TIPO_LABEL[tipo] || tipo || "—";
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0a0e1a;font-family:Inter,-apple-system,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0e1a;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
  <tr><td style="background:linear-gradient(135deg,#0a0e1a,#082548);border-radius:20px 20px 0 0;padding:32px 36px;text-align:center;border-bottom:1px solid rgba(166,133,35,0.3);">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#A68523;">Canal de Ouvidoria · IJA</p>
    <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;">🔔 Nova manifestação recebida</h1>
  </td></tr>
  <tr><td style="background:#0f1729;padding:32px 36px;color:#fff;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
      <tr><td style="padding:20px 22px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;">Protocolo</p>
        <p style="margin:0 0 16px;font-family:'SF Mono',Menlo,monospace;font-size:18px;color:#A68523;font-weight:bold;">${escapeHtml(protocolo)}</p>

        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;">Empresa</p>
        <p style="margin:0 0 16px;font-size:15px;color:#fff;">${escapeHtml(empresa || "—")}</p>

        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;">Tipo</p>
        <p style="margin:0 0 16px;font-size:15px;color:#fff;">${escapeHtml(tipoLabel)}</p>

        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;">Identificação</p>
        <p style="margin:0;font-size:15px;color:#fff;">${identificado ? "Identificado" : "Anônimo"}</p>
      </td></tr>
    </table>

    <div style="text-align:center;margin-top:28px;">
      <a href="${PANEL_URL}" style="display:inline-block;background:#A68523;color:#0a0e1a;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">
        Acessar painel da ouvidoria →
      </a>
    </div>

    <p style="margin:24px 0 0;font-size:11px;color:#64748b;line-height:1.6;text-align:center;border-top:1px solid rgba(255,255,255,0.08);padding-top:18px;">
      Notificação automática · Acesso restrito a administradores<br/>
      Canal de Ouvidoria gerenciado pelo Instituto João Alves
    </p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
