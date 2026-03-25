import { NextRequest, NextResponse } from "next/server";
import { resend, EMAIL_FROM } from "@/lib/email/resend";
import { eventReminderEmail, eventLiveNowEmail } from "@/lib/email/templates";
import { EVENTS } from "@/lib/constants";
import { createClient } from "@supabase/supabase-js";

/**
 * API para enviar lembretes de evento em massa.
 *
 * POST /api/email/evento-lembrete
 * Body: {
 *   eventSlug: string,
 *   timing: "24h" | "1h" | "10min" | "ao-vivo",
 *   secret: string  // segurança básica para chamadas externas (n8n/cron)
 * }
 *
 * Busca todos os leads inscritos no evento no Supabase e envia o email.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventSlug, timing, secret } = body;

    // Verificação de segurança simples
    if (secret !== process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!eventSlug || !timing) {
      return NextResponse.json(
        { error: "eventSlug e timing são obrigatórios" },
        { status: 400 }
      );
    }

    const validTimings = ["24h", "1h", "10min", "ao-vivo"];
    if (!validTimings.includes(timing)) {
      return NextResponse.json(
        { error: `timing deve ser: ${validTimings.join(", ")}` },
        { status: 400 }
      );
    }

    // Busca evento
    const event = EVENTS.find((e) => e.slug === eventSlug);
    if (!event) {
      return NextResponse.json({ error: "Evento não encontrado" }, { status: 404 });
    }

    const meetUrl = "meetUrl" in event ? (event as { meetUrl: string }).meetUrl : undefined;
    const meetPhone = "meetPhone" in event ? (event as { meetPhone: string }).meetPhone : undefined;
    const meetPin = "meetPin" in event ? (event as { meetPin: string }).meetPin : undefined;

    // Busca leads inscritos no Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: leads, error: dbError } = await supabase
      .from("leads-eventos-ija")
      .select("nome, email")
      .eq("event_slug", eventSlug);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Erro ao buscar leads" }, { status: 500 });
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json({ message: "Nenhum lead encontrado", sent: 0 });
    }

    // Deduplica por email
    const uniqueLeads = Array.from(
      new Map(leads.map((l) => [l.email, l])).values()
    );

    let sent = 0;
    let errors = 0;

    for (const lead of uniqueLeads) {
      try {
        let emailData: { subject: string; html: string };

        if (timing === "ao-vivo") {
          if (!meetUrl) {
            return NextResponse.json({ error: "meetUrl não configurado para este evento" }, { status: 400 });
          }
          emailData = eventLiveNowEmail({
            nome: lead.nome || "Participante",
            eventTitle: event.title,
            eventType: event.type,
            meetUrl,
            meetPhone,
            meetPin,
          });
        } else {
          emailData = eventReminderEmail({
            nome: lead.nome || "Participante",
            eventTitle: event.title,
            eventType: event.type,
            eventDate: event.date,
            eventTime: event.time,
            meetUrl,
            meetPhone,
            meetPin,
            timing: timing as "24h" | "1h" | "10min",
          });
        }

        await resend.emails.send({
          from: EMAIL_FROM,
          to: lead.email,
          subject: emailData.subject,
          html: emailData.html,
        });

        sent++;
      } catch (err) {
        console.error(`Erro ao enviar para ${lead.email}:`, err);
        errors++;
      }
    }

    return NextResponse.json({
      success: true,
      total: uniqueLeads.length,
      sent,
      errors,
    });
  } catch (err) {
    console.error("Reminder API error:", err);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
