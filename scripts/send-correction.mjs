import { Resend } from "resend";

const RESEND_KEY = "re_ihz46bRe_9WQfP3PvUBzVui7npPFUUtRJ";

const LEADS = [
  { nome: "Harley", email: "2rhconsultoria@gmail.com" },
  { nome: "Ana", email: "abaixinharibeiro@gmail.com" },
  { nome: "ALEXANDRE", email: "alexandredacostasouza1@gmail.com" },
  { nome: "Genison", email: "annyribeirodomingoribeiro@gmail.com" },
  { nome: "Flavio", email: "bangalo.flavio@gmail.com" },
  { nome: "BEATRIZ", email: "biamarianoorganizer@gmail.com" },
  { nome: "Debora", email: "deboracalderim@gmail.com" },
  { nome: "Elisangela", email: "elisangelaalvescf@hotmail.com" },
  { nome: "Flávia", email: "flaviavaladao@yahoo.com" },
  { nome: "Gabriela", email: "gabibppacheco@gmail.com" },
  { nome: "Thiago", email: "goodcartintas@gmail.com" },
  { nome: "VALMIR", email: "grupovwv@hotmail.com" },
  { nome: "Idiana", email: "indiana-oliveira@hotmail.com" },
  { nome: "JOÃO", email: "joaovotorsimaodacosta@gmail.com" },
  { nome: "Laila", email: "lailamedeiros19@hotmail.com" },
  { nome: "Luiz", email: "luizcarlos.botafogo@icloud.com" },
  { nome: "Luiz", email: "luizcarlosmartins161@gmail.com" },
  { nome: "Marcelle", email: "marcelle.ferreira.mcf@gmail.com" },
  { nome: "Maria", email: "mluizacarvalho@bol.com.br" },
  { nome: "Nilo", email: "niloscoelho@hotmail.com" },
  { nome: "Osmar", email: "ohpp19@yahoo.com.br" },
  { nome: "Luciana", email: "pastaway.cabofrio@gmail.com" },
  { nome: "Anderson", email: "prosanobalcao@gmail.com" },
  { nome: "Raquel", email: "rachelnsoares@hotmail.com" },
  { nome: "Regina", email: "regina.leite.sa@gmail.com" },
  { nome: "Adriano", email: "sallesadriano00@gmail.com" },
  { nome: "Sandra", email: "sandranascimento.adv@gmail.com" },
  { nome: "Sandra", email: "sandravieira960@gmail.com" },
  { nome: "LANA", email: "soareslana2@gmail.com" },
  { nome: "Thainná", email: "thainnapetruci@gmail.com" },
  { nome: "Time", email: "timefocado@gmail.com" },
  { nome: "emidio", email: "web.emidio@hotmail.com" },
];

const C = { n950: "#011735", n800: "#082548", n600: "#1e4d8a", n400: "#5c8bc4", n300: "#8daed8", n100: "#d9e4f2", acc: "#a68523", cr: "#faf7f2", crd: "#f3ede4", w: "#ffffff" };
const LOGO = "https://www.ijaconsultoria.com.br/images/logo/ija-logo-branca.png";

function buildHTML(nome) {
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:${C.crd};font-family:Inter,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.crd};"><tr><td align="center" style="padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:linear-gradient(135deg,${C.n950},${C.n800});border-radius:24px 24px 0 0;padding:32px 40px;text-align:center;">
<img src="${LOGO}" alt="IJA" width="180"/></td></tr>
<tr><td style="background:${C.w};padding:40px;border-left:1px solid ${C.n100};border-right:1px solid ${C.n100};">
<h1 style="margin:0 0 16px;font-size:24px;font-weight:700;color:${C.n950};">${nome}, pequena correção</h1>
<p style="margin:0 0 16px;font-size:16px;color:${C.n600};line-height:1.6;">Acabamos de enviar um lembrete dizendo que a live <strong>"Como Descobrir seu Lucro Real em 30 Minutos"</strong> começaria em 1 hora. Foi um <strong>erro do nosso sistema</strong> — desculpe pela confusão.</p>
<p style="margin:0 0 24px;font-size:16px;color:${C.n600};line-height:1.6;">A live continua no horário original:</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr>
<td style="background:linear-gradient(135deg,${C.n950},${C.n800});border-radius:16px;padding:24px;text-align:center;">
<p style="margin:0 0 8px;font-size:14px;color:${C.n300};">📅 Hoje, 7 de abril</p>
<p style="margin:0;font-size:24px;font-weight:700;color:${C.acc};">🕐 19h</p>
<p style="margin:8px 0 0;font-size:13px;color:${C.n400};">horário de Brasília</p>
</td></tr></table>
<p style="margin:0 0 16px;font-size:15px;color:${C.n600};line-height:1.6;">Você vai receber um novo lembrete 10 minutos antes do início, com o link de acesso.</p>
<p style="margin:0;font-size:15px;color:${C.n600};">Nos vemos às 19h!</p>
</td></tr>
<tr><td style="background:${C.cr};border-radius:0 0 24px 24px;padding:24px 40px;text-align:center;border:1px solid ${C.n100};border-top:none;">
<p style="margin:0 0 8px;font-size:13px;color:${C.n400};">Instituto João Alves — Consultoria Empresarial</p>
<p style="margin:0;font-size:12px;color:${C.n400};">Cabo Frio, RJ • (22) 99974-6006</p>
</td></tr></table></td></tr></table></body></html>`;
}

const resend = new Resend(RESEND_KEY);
let sent = 0, failed = 0;

for (const lead of LEADS) {
  const nomeRaw = (lead.nome || "Participante").trim();
  const nome = nomeRaw.charAt(0).toUpperCase() + nomeRaw.slice(1).toLowerCase();
  try {
    const r = await resend.emails.send({
      from: "Instituto João Alves <eventos@ijaconsultoria.com.br>",
      to: lead.email,
      subject: "Pequena correção sobre o lembrete anterior",
      html: buildHTML(nome),
    });
    if (r.error) { console.log("❌", lead.email, r.error.message); failed++; }
    else { console.log("✅", lead.email); sent++; }
  } catch (e) { console.log("❌", lead.email, e.message); failed++; }
  await new Promise(r => setTimeout(r, 250));
}
console.log(`\nEnviados: ${sent} | Falhas: ${failed}`);
