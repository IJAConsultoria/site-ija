/**
 * Templates de email do IJA — visual consistente com o site.
 *
 * Cores: navy-950 (#011735), accent/gold (#a68523), cream (#faf7f2)
 * Fonte: Inter (fallback system sans-serif para email)
 */

const COLORS = {
  navy950: "#011735",
  navy800: "#082548",
  navy600: "#1e4d8a",
  navy400: "#5c8bc4",
  navy300: "#8daed8",
  navy100: "#d9e4f2",
  accent: "#a68523",
  accentDark: "#8c6f1b",
  gold300: "#c9a84c",
  cream: "#faf7f2",
  creamDark: "#f3ede4",
  white: "#ffffff",
  red: "#dc2626",
  green: "#16a34a",
};

const SITE_URL = "https://www.ijaconsultoria.com.br";
const LOGO_URL = `${SITE_URL}/images/logo/ija-logo-branca.png`;
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/EqRxsVTZ67P7XObCFEjb3w";

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Instituto João Alves</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.creamDark};font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.creamDark};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,${COLORS.navy950},${COLORS.navy800});border-radius:24px 24px 0 0;padding:32px 40px;text-align:center;">
              <img src="${LOGO_URL}" alt="Instituto João Alves" width="180" style="display:inline-block;max-width:180px;height:auto;" />
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:${COLORS.white};padding:40px;border-left:1px solid ${COLORS.navy100};border-right:1px solid ${COLORS.navy100};">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:${COLORS.cream};border-radius:0 0 24px 24px;padding:24px 40px;text-align:center;border:1px solid ${COLORS.navy100};border-top:none;">
              <p style="margin:0 0 8px;font-size:13px;color:${COLORS.navy400};">
                Instituto João Alves — Consultoria Empresarial
              </p>
              <p style="margin:0 0 8px;font-size:12px;color:${COLORS.navy400};">
                Cabo Frio, RJ &bull; (22) 99974-6006
              </p>
              <p style="margin:0;font-size:12px;">
                <a href="${SITE_URL}" style="color:${COLORS.accent};text-decoration:none;font-weight:600;">ijaconsultoria.com.br</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Bloco de card do evento reutilizável */
function eventCard({
  eventType,
  eventTitle,
  eventDate,
  eventTime,
  eventDuration,
}: {
  eventType: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventDuration?: string;
}): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="background:linear-gradient(135deg,${COLORS.navy950},${COLORS.navy800});border-radius:16px;padding:28px 24px;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${COLORS.accent};">
            ${eventType}
          </p>
          <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${COLORS.white};line-height:1.3;">
            ${eventTitle}
          </h2>
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:24px;">
                <p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${COLORS.accent};">Quando</p>
                <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${COLORS.white};">${eventDate}</p>
              </td>
              <td style="padding-right:24px;">
                <p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${COLORS.accent};">Horário</p>
                <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${COLORS.white};">${eventTime}</p>
              </td>
              ${eventDuration ? `<td>
                <p style="margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:${COLORS.accent};">Duração</p>
                <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${COLORS.white};">${eventDuration}</p>
              </td>` : ""}
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
}

/** Botão CTA reutilizável */
function ctaButton(href: string, text: string, bgColor: string = COLORS.accent): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td align="center">
          <a href="${href}" target="_blank" style="display:inline-block;background-color:${bgColor};color:${COLORS.white};font-size:16px;font-weight:700;text-decoration:none;padding:16px 36px;border-radius:14px;">
            ${text}
          </a>
        </td>
      </tr>
    </table>`;
}

// ============================================================
// EMAIL 1: Confirmação de inscrição
// ============================================================

export function eventConfirmationEmail({
  nome,
  eventTitle,
  eventType,
  eventDate,
  eventTime,
  eventDuration,
}: {
  nome: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  eventDuration: string;
}): { subject: string; html: string } {
  const subject = `Inscrição confirmada: ${eventTitle}`;

  const html = baseLayout(`
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:${COLORS.navy950};">
      ${nome}, sua inscrição está confirmada!
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${COLORS.navy600};line-height:1.6;">
      Você está inscrito no evento abaixo. O convite já está anexo — aceite para travar na sua agenda.
    </p>

    ${eventCard({ eventType, eventTitle, eventDate, eventTime, eventDuration })}

    <!-- Steps -->
    <h3 style="margin:0 0 16px;font-size:18px;font-weight:700;color:${COLORS.navy950};">
      Complete os próximos passos:
    </h3>

    <!-- Step 1 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
      <tr>
        <td width="40" valign="top">
          <div style="width:32px;height:32px;border-radius:10px;background-color:${COLORS.accent};color:${COLORS.white};font-size:14px;font-weight:700;text-align:center;line-height:32px;">&#10003;</div>
        </td>
        <td style="padding-left:12px;">
          <p style="margin:0;font-size:15px;font-weight:600;color:${COLORS.navy950};">Inscrição confirmada</p>
          <p style="margin:2px 0 0;font-size:13px;color:${COLORS.navy600};">Sua vaga está garantida.</p>
        </td>
      </tr>
    </table>

    <!-- Step 2 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
      <tr>
        <td width="40" valign="top">
          <div style="width:32px;height:32px;border-radius:10px;background-color:${COLORS.creamDark};color:${COLORS.navy950};font-size:14px;font-weight:700;text-align:center;line-height:32px;">2</div>
        </td>
        <td style="padding-left:12px;">
          <p style="margin:0;font-size:15px;font-weight:600;color:${COLORS.navy950};">Aceite o convite anexo</p>
          <p style="margin:2px 0 0;font-size:13px;color:${COLORS.navy600};">Abra o arquivo .ics anexo para travar o evento na sua agenda automaticamente.</p>
        </td>
      </tr>
    </table>

    <!-- Step 3 -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td width="40" valign="top">
          <div style="width:32px;height:32px;border-radius:10px;background-color:${COLORS.creamDark};color:${COLORS.navy950};font-size:14px;font-weight:700;text-align:center;line-height:32px;">3</div>
        </td>
        <td style="padding-left:12px;">
          <p style="margin:0;font-size:15px;font-weight:600;color:${COLORS.navy950};">Entre no grupo do WhatsApp</p>
          <p style="margin:2px 0 0;font-size:13px;color:${COLORS.navy600};">Avisos, materiais e link de acesso serão enviados no grupo.</p>
        </td>
      </tr>
    </table>

    ${ctaButton(WHATSAPP_GROUP_URL, "Entrar no grupo do WhatsApp", "#25D366")}

    <p style="margin:0;font-size:13px;color:${COLORS.navy400};text-align:center;">
      Evento 100% gratuito e online. Nos vemos lá!
    </p>
  `);

  return { subject, html };
}

// ============================================================
// EMAIL 2: Lembrete (1h antes, 10min antes)
// ============================================================

export function eventReminderEmail({
  nome,
  eventTitle,
  eventType,
  eventDate,
  eventTime,
  meetUrl,
  meetPhone,
  meetPin,
  timing,
}: {
  nome: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  meetUrl?: string;
  meetPhone?: string;
  meetPin?: string;
  timing: "24h" | "1h" | "10min";
}): { subject: string; html: string } {
  const config = {
    "24h": {
      subject: `Amanhã: ${eventTitle}`,
      heading: `${nome}, é amanhã!`,
      badge: "Amanhã",
      badgeColor: COLORS.accent,
      message: "Amanhã é o dia! Não esqueça de reservar esse horário na sua agenda.",
      showMeetLink: false,
    },
    "1h": {
      subject: `Começa em 1 hora: ${eventTitle}`,
      heading: `${nome}, começa em 1 hora!`,
      badge: "Em 1 hora",
      badgeColor: COLORS.red,
      message: "Prepare-se — o evento começa em breve. Separe um lugar tranquilo e clique no link abaixo na hora.",
      showMeetLink: true,
    },
    "10min": {
      subject: `Começa em 10 minutos: ${eventTitle}`,
      heading: `${nome}, faltam 10 minutos!`,
      badge: "Em 10 minutos",
      badgeColor: COLORS.red,
      message: "Está quase na hora! Clique no botão abaixo para entrar na sala agora.",
      showMeetLink: true,
    },
  }[timing];

  const meetSection = config.showMeetLink && meetUrl ? `
    <!-- Meet Link Box -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background-color:${COLORS.cream};border:2px solid ${COLORS.accent};border-radius:16px;padding:24px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${COLORS.accent};">
            Link da videochamada
          </p>
          <p style="margin:0 0 16px;font-size:14px;color:${COLORS.navy600};">
            Google Meet
          </p>
          <a href="${meetUrl}" target="_blank" style="display:inline-block;background-color:${COLORS.accent};color:${COLORS.white};font-size:18px;font-weight:700;text-decoration:none;padding:18px 48px;border-radius:14px;">
            Entrar na sala agora
          </a>
          ${meetPhone ? `
          <p style="margin:16px 0 0;font-size:13px;color:${COLORS.navy400};">
            Ou disque: <strong style="color:${COLORS.navy600};">${meetPhone}</strong>${meetPin ? ` &bull; PIN: <strong style="color:${COLORS.navy600};">${meetPin}</strong>` : ""}
          </p>` : ""}
        </td>
      </tr>
    </table>` : "";

  const html = baseLayout(`
    <!-- Urgency badge -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td align="center">
          <span style="display:inline-block;background-color:${config.badgeColor};color:${COLORS.white};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:6px 16px;border-radius:20px;">
            ${config.badge}
          </span>
        </td>
      </tr>
    </table>

    <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:${COLORS.navy950};text-align:center;">
      ${config.heading}
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${COLORS.navy600};line-height:1.6;text-align:center;">
      ${config.message}
    </p>

    ${eventCard({ eventType, eventTitle, eventDate, eventTime })}

    ${meetSection}

    ${!config.showMeetLink ? ctaButton(WHATSAPP_GROUP_URL, "Ver grupo do WhatsApp", "#25D366") : ""}

    <p style="margin:0;font-size:13px;color:${COLORS.navy400};text-align:center;">
      ${config.showMeetLink ? "Qualquer problema, fale no grupo do WhatsApp." : "O link de acesso será enviado no grupo do WhatsApp antes do evento."}
    </p>
  `);

  return { subject: config.subject, html };
}

// ============================================================
// EMAIL 3: Estamos ao vivo!
// ============================================================

export function eventLiveNowEmail({
  nome,
  eventTitle,
  eventType,
  meetUrl,
  meetPhone,
  meetPin,
}: {
  nome: string;
  eventTitle: string;
  eventType: string;
  meetUrl: string;
  meetPhone?: string;
  meetPin?: string;
}): { subject: string; html: string } {
  const subject = `AO VIVO agora: ${eventTitle}`;

  const html = baseLayout(`
    <!-- Live badge -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td align="center">
          <span style="display:inline-block;background-color:${COLORS.red};color:${COLORS.white};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:8px 20px;border-radius:20px;">
            &#9679; AO VIVO AGORA
          </span>
        </td>
      </tr>
    </table>

    <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:${COLORS.navy950};text-align:center;">
      ${nome}, estamos ao vivo!
    </h1>
    <p style="margin:0 0 8px;font-size:18px;font-weight:600;color:${COLORS.navy600};text-align:center;">
      ${eventTitle}
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:${COLORS.navy400};text-align:center;">
      ${eventType} com João Pedro Alves — entre agora!
    </p>

    <!-- Big Meet CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="background:linear-gradient(135deg,${COLORS.navy950},${COLORS.navy800});border-radius:16px;padding:32px;text-align:center;">
          <p style="margin:0 0 16px;font-size:14px;font-weight:600;color:${COLORS.navy300};">
            Clique no botão para entrar:
          </p>
          <a href="${meetUrl}" target="_blank" style="display:inline-block;background-color:${COLORS.accent};color:${COLORS.white};font-size:18px;font-weight:700;text-decoration:none;padding:18px 56px;border-radius:14px;">
            Entrar na sala
          </a>
          ${meetPhone ? `
          <p style="margin:20px 0 0;font-size:13px;color:${COLORS.navy400};">
            Ou disque: <strong style="color:${COLORS.navy300};">${meetPhone}</strong>${meetPin ? ` &bull; PIN: <strong style="color:${COLORS.navy300};">${meetPin}</strong>` : ""}
          </p>` : ""}
        </td>
      </tr>
    </table>

    <p style="margin:0;font-size:13px;color:${COLORS.navy400};text-align:center;">
      Não consegue entrar? Responda este email ou fale no
      <a href="${WHATSAPP_GROUP_URL}" target="_blank" style="color:${COLORS.accent};text-decoration:none;font-weight:600;">grupo do WhatsApp</a>.
    </p>
  `);

  return { subject, html };
}
