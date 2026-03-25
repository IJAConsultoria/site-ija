/**
 * Cloudflare Pages Function: POST /api/email/evento-confirmacao
 *
 * Envia email de confirmação com .ics anexo via Resend.
 * Variáveis de ambiente: RESEND_API_KEY (configurada no Cloudflare Pages)
 */

// Dados dos eventos (espelhado de constants.ts)
const EVENTS_MAP = {
  "lucro-real-30-minutos": {
    title: "Como Descobrir seu Lucro Real em 30 Minutos",
    meetUrl: "https://meet.google.com/fkm-hpec-kcv",
    dateISO: "2026-04-07",
    duration: "60 min",
  },
  "3-erros-crescimento": {
    title: "Os 3 Erros que Impedem seu Negócio de Crescer",
    dateISO: "2026-05-02",
    duration: "75 min",
  },
  "lideranca-gerentes-donos": {
    title: "Liderança na Prática: Como Formar Gerentes que Pensam como Donos",
    dateISO: "2026-05-27",
    duration: "90 min",
  },
};

const COLORS = {
  n950: "#011735", n800: "#082548", n600: "#1e4d8a", n400: "#5c8bc4",
  n300: "#8daed8", n100: "#d9e4f2", acc: "#a68523", cr: "#faf7f2",
  crd: "#f3ede4", w: "#ffffff",
};

const SITE_URL = "https://www.ijaconsultoria.com.br";
const LOGO_URL = `${SITE_URL}/images/logo/ija-logo-branca.png`;
const WA_URL = "https://chat.whatsapp.com/EqRxsVTZ67P7XObCFEjb3w";

function buildEmailHTML(nome, eventTitle, eventType, eventDate, eventTime, eventDuration) {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${COLORS.crd};font-family:Inter,-apple-system,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.crd};"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:linear-gradient(135deg,${COLORS.n950},${COLORS.n800});border-radius:24px 24px 0 0;padding:32px 40px;text-align:center;">
<img src="${LOGO_URL}" alt="Instituto João Alves" width="180" style="display:inline-block;max-width:180px;height:auto;"/></td></tr>
<tr><td style="background:${COLORS.w};padding:40px;border-left:1px solid ${COLORS.n100};border-right:1px solid ${COLORS.n100};">
<h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:${COLORS.n950};">${nome}, sua inscrição está confirmada!</h1>
<p style="margin:0 0 24px;font-size:16px;color:${COLORS.n600};line-height:1.6;">Você está inscrito no evento abaixo. O convite já está anexo — aceite para travar na sua agenda.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr>
<td style="background:linear-gradient(135deg,${COLORS.n950},${COLORS.n800});border-radius:16px;padding:28px 24px;">
<p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${COLORS.acc};">${eventType}</p>
<h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${COLORS.w};line-height:1.3;">${eventTitle}</h2>
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="padding-right:24px;"><p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${COLORS.acc};">Quando</p><p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${COLORS.w};">${eventDate}</p></td>
<td style="padding-right:24px;"><p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${COLORS.acc};">Horário</p><p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${COLORS.w};">${eventTime}</p></td>
<td><p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${COLORS.acc};">Duração</p><p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${COLORS.w};">${eventDuration}</p></td>
</tr></table></td></tr></table>
<h3 style="margin:0 0 16px;font-size:18px;font-weight:700;color:${COLORS.n950};">Complete os próximos passos:</h3>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;"><tr>
<td width="40" valign="top"><div style="width:32px;height:32px;border-radius:10px;background:${COLORS.acc};color:${COLORS.w};font-size:14px;font-weight:700;text-align:center;line-height:32px;">&#10003;</div></td>
<td style="padding-left:12px;"><p style="margin:0;font-size:15px;font-weight:600;color:${COLORS.n950};">Inscrição confirmada</p><p style="margin:2px 0 0;font-size:13px;color:${COLORS.n600};">Sua vaga está garantida.</p></td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;"><tr>
<td width="40" valign="top"><div style="width:32px;height:32px;border-radius:10px;background:${COLORS.crd};color:${COLORS.n950};font-size:14px;font-weight:700;text-align:center;line-height:32px;">2</div></td>
<td style="padding-left:12px;"><p style="margin:0;font-size:15px;font-weight:600;color:${COLORS.n950};">Aceite o convite anexo</p><p style="margin:2px 0 0;font-size:13px;color:${COLORS.n600};">Abra o arquivo .ics anexo para travar o evento na sua agenda.</p></td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr>
<td width="40" valign="top"><div style="width:32px;height:32px;border-radius:10px;background:${COLORS.crd};color:${COLORS.n950};font-size:14px;font-weight:700;text-align:center;line-height:32px;">3</div></td>
<td style="padding-left:12px;"><p style="margin:0;font-size:15px;font-weight:600;color:${COLORS.n950};">Entre no grupo do WhatsApp</p><p style="margin:2px 0 0;font-size:13px;color:${COLORS.n600};">Avisos, materiais e link de acesso serão enviados no grupo.</p></td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr><td align="center">
<a href="${WA_URL}" target="_blank" style="display:inline-block;background:#25D366;color:${COLORS.w};font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:14px;">Entrar no grupo do WhatsApp</a>
</td></tr></table>
<p style="margin:0;font-size:13px;color:${COLORS.n400};text-align:center;">Evento 100% gratuito e online. Nos vemos lá!</p>
</td></tr>
<tr><td style="background:${COLORS.cr};border-radius:0 0 24px 24px;padding:24px 40px;text-align:center;border:1px solid ${COLORS.n100};border-top:none;">
<p style="margin:0 0 8px;font-size:13px;color:${COLORS.n400};">Instituto João Alves — Consultoria Empresarial</p>
<p style="margin:0 0 8px;font-size:12px;color:${COLORS.n400};">Cabo Frio, RJ &bull; (22) 99974-6006</p>
<p style="margin:0;font-size:12px;"><a href="${SITE_URL}" style="color:${COLORS.acc};text-decoration:none;font-weight:600;">ijaconsultoria.com.br</a></p>
</td></tr></table></td></tr></table></body></html>`;
}

function buildICS(title, dateISO, time, durationMinutes, meetUrl) {
  const hourMatch = time.match(/(\d{1,2})/);
  const startHour = hourMatch ? parseInt(hourMatch[1]) : 19;
  const dateParts = dateISO.replace(/-/g, "");
  const startUTC = startHour + 3;
  const endUTC = startUTC + Math.floor(durationMinutes / 60);
  const endMin = durationMinutes % 60;
  const dtStart = `${dateParts}T${String(startUTC).padStart(2, "0")}0000Z`;
  const dtEnd = `${dateParts}T${String(endUTC).padStart(2, "0")}${String(endMin).padStart(2, "0")}00Z`;
  const uid = `${dateISO}-${title.replace(/\s/g, "-").toLowerCase()}@ijaconsultoria.com.br`;
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const desc = `Evento gratuito do Instituto João Alves.\\n\\n${title}${meetUrl ? `\\n\\nLink: ${meetUrl}` : ""}`;

  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Instituto João Alves//Eventos//PT",
    "CALSCALE:GREGORIAN", "METHOD:REQUEST", "BEGIN:VEVENT",
    `UID:${uid}`, `DTSTAMP:${now}`, `DTSTART:${dtStart}`, `DTEND:${dtEnd}`,
    `SUMMARY:[IJA] ${title}`, `DESCRIPTION:${desc}`,
    `LOCATION:${meetUrl || "Online"}`,
    `ORGANIZER;CN=Instituto João Alves:mailto:consultorjoao.alves@gmail.com`,
    "STATUS:CONFIRMED", "SEQUENCE:0",
  ];
  if (meetUrl) lines.push(`URL:${meetUrl}`);
  lines.push(
    "BEGIN:VALARM", "TRIGGER:-PT1H", "ACTION:DISPLAY", "DESCRIPTION:Evento IJA em 1 hora!", "END:VALARM",
    "BEGIN:VALARM", "TRIGGER:-PT10M", "ACTION:DISPLAY", "DESCRIPTION:Evento IJA em 10 minutos!", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR"
  );
  return lines.join("\r\n");
}

function btoa(str) {
  return Buffer.from(str).toString("base64");
}

export async function onRequestPost(context) {
  const { env } = context;
  const RESEND_API_KEY = env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await context.request.json();
    const { nome, email, eventTitle, eventType, eventSlug, eventDate, eventTime, eventDuration, eventDateISO } = body;

    if (!email || !nome || !eventTitle) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios: nome, email, eventTitle" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const eventData = EVENTS_MAP[eventSlug] || {};
    const meetUrl = eventData.meetUrl || null;
    const dateISO = eventDateISO || eventData.dateISO || new Date().toISOString().split("T")[0];
    const duration = eventDuration || eventData.duration || "60 min";
    const durationMinutes = parseInt(duration) || 60;

    const html = buildEmailHTML(nome, eventTitle, eventType || "Evento", eventDate || "Em breve", eventTime || "19h", duration);
    const ics = buildICS(eventTitle, dateISO, eventTime || "19h", durationMinutes, meetUrl);

    const resendPayload = {
      from: "Instituto João Alves <eventos@ijaconsultoria.com.br>",
      to: email,
      subject: `Inscrição confirmada: ${eventTitle}`,
      html,
      attachments: [
        {
          filename: `evento-ija-${eventSlug || "convite"}.ics`,
          content: btoa(ics),
          content_type: "text/calendar; method=REQUEST",
        },
      ],
    };

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      return new Response(JSON.stringify({ error: resendData.message || "Erro ao enviar email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Email function error:", err);
    return new Response(JSON.stringify({ error: "Erro interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
