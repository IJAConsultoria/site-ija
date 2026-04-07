#!/usr/bin/env node
/**
 * Envia lembretes do evento "Lucro Real em 30 Minutos" para todos os inscritos.
 *
 * Uso:
 *   node scripts/send-event-reminder.mjs 1h
 *   node scripts/send-event-reminder.mjs 10min
 *   node scripts/send-event-reminder.mjs ao-vivo
 */

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const RESEND_API_KEY = "re_ihz46bRe_9WQfP3PvUBzVui7npPFUUtRJ";
const SUPABASE_URL = "https://ofxchwdlxheiozjkaopz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9meGNod2RseGhlaW96amthb3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MDc0MjEsImV4cCI6MjA4NzA4MzQyMX0.-k6W1IU6c1jjmP5vRpk4sqgsVnwgg4MnwGnTqRD5bxU";

const EVENT = {
  slug: "lucro-real-30-minutos",
  title: "Como Descobrir seu Lucro Real em 30 Minutos",
  type: "Live",
  date: "7 de abril",
  time: "19h",
  meetUrl: "https://meet.google.com/fkm-hpec-kcv",
  meetPhone: "+55 31 3958-9568",
  meetPin: "214 835 904#",
};

const C = {
  n950: "#011735", n800: "#082548", n600: "#1e4d8a", n400: "#5c8bc4",
  n300: "#8daed8", n100: "#d9e4f2", acc: "#a68523", cr: "#faf7f2",
  crd: "#f3ede4", w: "#ffffff", red: "#dc2626",
};
const LOGO = "https://www.ijaconsultoria.com.br/images/logo/ija-logo-branca.png";
const WA = "https://chat.whatsapp.com/EqRxsVTZ67P7XObCFEjb3w";

function wrap(body) {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${C.crd};font-family:Inter,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.crd};"><tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:linear-gradient(135deg,${C.n950},${C.n800});border-radius:24px 24px 0 0;padding:32px 40px;text-align:center;">
<img src="${LOGO}" alt="Instituto João Alves" width="180" style="display:inline-block;max-width:180px;height:auto;"/></td></tr>
<tr><td style="background:${C.w};padding:40px;border-left:1px solid ${C.n100};border-right:1px solid ${C.n100};">${body}</td></tr>
<tr><td style="background:${C.cr};border-radius:0 0 24px 24px;padding:24px 40px;text-align:center;border:1px solid ${C.n100};border-top:none;">
<p style="margin:0 0 8px;font-size:13px;color:${C.n400};">Instituto João Alves — Consultoria Empresarial</p>
<p style="margin:0;font-size:12px;color:${C.n400};">Cabo Frio, RJ &bull; (22) 99974-6006</p>
</td></tr></table></td></tr></table></body></html>`;
}

function evCard() {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;"><tr>
<td style="background:linear-gradient(135deg,${C.n950},${C.n800});border-radius:16px;padding:28px 24px;">
<p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${C.acc};">${EVENT.type}</p>
<h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${C.w};line-height:1.3;">${EVENT.title}</h2>
<p style="margin:0;font-size:15px;color:${C.n300};">${EVENT.date} &bull; ${EVENT.time}</p>
</td></tr></table>`;
}

function meetBox(label) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr>
<td style="background:${C.cr};border:2px solid ${C.acc};border-radius:16px;padding:24px;text-align:center;">
<p style="margin:0 0 4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:${C.acc};">Link da videochamada</p>
<p style="margin:0 0 16px;font-size:14px;color:${C.n600};">Google Meet</p>
<a href="${EVENT.meetUrl}" target="_blank" style="display:inline-block;background:${C.acc};color:${C.w};font-size:18px;font-weight:700;text-decoration:none;padding:18px 48px;border-radius:14px;">${label}</a>
<p style="margin:16px 0 0;font-size:13px;color:${C.n400};">Ou disque: <strong style="color:${C.n600};">${EVENT.meetPhone}</strong> &bull; PIN: <strong style="color:${C.n600};">${EVENT.meetPin}</strong></p>
</td></tr></table>`;
}

function buildEmail(timing, nome) {
  if (timing === "1h") {
    return {
      subject: `Começa em 1 hora: ${EVENT.title}`,
      html: wrap(`
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr><td align="center">
<span style="display:inline-block;background:${C.red};color:${C.w};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:6px 16px;border-radius:20px;">Em 1 hora</span>
</td></tr></table>
<h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:${C.n950};text-align:center;">${nome}, começa em 1 hora!</h1>
<p style="margin:0 0 24px;font-size:16px;color:${C.n600};line-height:1.6;text-align:center;">Prepare-se — separe um lugar tranquilo. O link da sala já está abaixo.</p>
${evCard()}
${meetBox("Entrar na sala")}
<p style="margin:0;font-size:13px;color:${C.n400};text-align:center;">Qualquer problema, fale no <a href="${WA}" style="color:${C.acc};text-decoration:none;font-weight:600;">grupo do WhatsApp</a>.</p>
      `),
    };
  }

  if (timing === "10min") {
    return {
      subject: `Começa em 10 minutos: ${EVENT.title}`,
      html: wrap(`
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr><td align="center">
<span style="display:inline-block;background:${C.red};color:${C.w};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:6px 16px;border-radius:20px;">Em 10 minutos</span>
</td></tr></table>
<h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:${C.n950};text-align:center;">${nome}, faltam 10 minutos!</h1>
<p style="margin:0 0 24px;font-size:16px;color:${C.n600};line-height:1.6;text-align:center;">Está quase na hora! Clique no botão abaixo para entrar na sala agora.</p>
${evCard()}
${meetBox("Entrar na sala agora")}
<p style="margin:0;font-size:13px;color:${C.n400};text-align:center;">Nos vemos em alguns minutos!</p>
      `),
    };
  }

  if (timing === "ao-vivo") {
    return {
      subject: `AO VIVO agora: ${EVENT.title}`,
      html: wrap(`
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr><td align="center">
<span style="display:inline-block;background:${C.red};color:${C.w};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:8px 20px;border-radius:20px;">&#9679; AO VIVO AGORA</span>
</td></tr></table>
<h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:${C.n950};text-align:center;">${nome}, estamos ao vivo!</h1>
<p style="margin:0 0 8px;font-size:18px;font-weight:600;color:${C.n600};text-align:center;">${EVENT.title}</p>
<p style="margin:0 0 28px;font-size:15px;color:${C.n400};text-align:center;">Live com João Pedro Alves — entre agora!</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr>
<td style="background:linear-gradient(135deg,${C.n950},${C.n800});border-radius:16px;padding:32px;text-align:center;">
<p style="margin:0 0 16px;font-size:14px;font-weight:600;color:${C.n300};">Clique no botão para entrar:</p>
<a href="${EVENT.meetUrl}" target="_blank" style="display:inline-block;background:${C.acc};color:${C.w};font-size:18px;font-weight:700;text-decoration:none;padding:18px 56px;border-radius:14px;">Entrar na sala</a>
<p style="margin:20px 0 0;font-size:13px;color:${C.n400};">Ou disque: <strong style="color:${C.n300};">${EVENT.meetPhone}</strong> &bull; PIN: <strong style="color:${C.n300};">${EVENT.meetPin}</strong></p>
</td></tr></table>
<p style="margin:0;font-size:13px;color:${C.n400};text-align:center;">Não consegue entrar? Fale no <a href="${WA}" style="color:${C.acc};text-decoration:none;font-weight:600;">grupo do WhatsApp</a>.</p>
      `),
    };
  }

  throw new Error(`Timing inválido: ${timing}. Use: 1h, 10min, ao-vivo`);
}

async function main() {
  const timing = process.argv[2];
  if (!timing || !["1h", "10min", "ao-vivo"].includes(timing)) {
    console.error("Uso: node send-event-reminder.mjs <1h|10min|ao-vivo>");
    process.exit(1);
  }

  console.log(`\n📧 Enviando lembrete "${timing}" para evento: ${EVENT.title}\n`);

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: leads, error } = await supabase
    .from("leads-eventos-ija")
    .select("nome, email")
    .eq("event_slug", EVENT.slug);

  if (error) {
    console.error("Erro Supabase:", error);
    process.exit(1);
  }

  // Dedup por email
  const unique = Array.from(new Map(leads.map((l) => [l.email.toLowerCase(), l])).values());
  console.log(`Total de leads: ${leads.length}, únicos: ${unique.length}\n`);

  const resend = new Resend(RESEND_API_KEY);

  let sent = 0, failed = 0;
  for (const lead of unique) {
    const nome = (lead.nome || "Participante").trim();
    const nomeFmt = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
    const { subject, html } = buildEmail(timing, nomeFmt);

    try {
      const r = await resend.emails.send({
        from: "Instituto João Alves <eventos@ijaconsultoria.com.br>",
        to: lead.email,
        subject,
        html,
      });
      if (r.error) {
        console.log(`❌ ${lead.email}: ${r.error.message}`);
        failed++;
      } else {
        console.log(`✅ ${lead.email}`);
        sent++;
      }
    } catch (e) {
      console.log(`❌ ${lead.email}: ${e.message}`);
      failed++;
    }

    // Rate limit Resend free: 5 req/sec
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log(`\n✨ Concluído: ${sent} enviados, ${failed} falharam\n`);
}

main();
