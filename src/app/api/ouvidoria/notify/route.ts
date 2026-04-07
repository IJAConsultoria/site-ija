import { NextRequest, NextResponse } from "next/server";
import { resend, EMAIL_FROM } from "@/lib/email/resend";
import { createClient } from "@supabase/supabase-js";

// Endpoint chamado após inserção de uma manifestação.
// Busca admins com role=admin e dispara email via Resend.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { protocolo, empresa, tipo, identificado } = body;

    if (!protocolo) {
      return NextResponse.json({ error: "Protocolo obrigatório" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: admins } = await supabase
      .from("cms_admins_ija")
      .select("email, name")
      .eq("role", "admin");

    if (!admins || admins.length === 0) {
      return NextResponse.json({ ok: true, notified: 0 });
    }

    const tipoLabel: Record<string, string> = {
      elogio: "Elogio",
      sugestao: "Sugestão",
      reclamacao: "Reclamação",
      denuncia: "Denúncia",
    };

    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#0a0e1a;color:#fff;border-radius:12px">
        <h2 style="margin:0 0 8px;color:#A68523">🔔 Nova manifestação na Ouvidoria</h2>
        <p style="margin:0 0 24px;color:#94a3b8;font-size:14px">Canal confidencial de ouvidoria interna</p>
        <div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:8px;margin-bottom:16px">
          <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px">Protocolo</p>
          <p style="margin:0 0 12px;font-family:monospace;font-size:18px;color:#A68523;font-weight:bold">${protocolo}</p>
          <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px">Empresa</p>
          <p style="margin:0 0 12px;font-size:14px;color:#fff">${empresa || "—"}</p>
          <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px">Tipo</p>
          <p style="margin:0 0 12px;font-size:14px;color:#fff">${tipoLabel[tipo] || tipo || "—"}</p>
          <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px">Identificação</p>
          <p style="margin:0;font-size:14px;color:#fff">${identificado ? "Identificado" : "Anônimo"}</p>
        </div>
        <a href="https://ija-blue.vercel.app/acesso/ouvidoria" style="display:inline-block;background:#A68523;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Acessar painel →</a>
        <p style="margin:24px 0 0;font-size:11px;color:#64748b;border-top:1px solid rgba(255,255,255,0.1);padding-top:12px">Esta é uma notificação automática do sistema de ouvidoria IJA. Acesso restrito a administradores.</p>
      </div>
    `;

    const results = await Promise.allSettled(
      admins.map((a) =>
        resend.emails.send({
          from: EMAIL_FROM,
          to: a.email,
          subject: `[Ouvidoria IJA] Nova manifestação ${protocolo}`,
          html,
        })
      )
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    return NextResponse.json({ ok: true, notified: sent });
  } catch (err) {
    console.error("Erro ao notificar ouvidoria:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
