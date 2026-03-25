import { NextRequest, NextResponse } from "next/server";
import { resend, EMAIL_FROM } from "@/lib/email/resend";
import { eventConfirmationEmail } from "@/lib/email/templates";
import { generateICS } from "@/lib/email/generate-ics";
import { EVENTS } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nome,
      email,
      eventTitle,
      eventType,
      eventSlug,
      eventDate,
      eventTime,
      eventDuration,
      eventDateISO,
    } = body;

    if (!email || !nome || !eventTitle) {
      return NextResponse.json(
        { error: "Campos obrigatórios: nome, email, eventTitle" },
        { status: 400 }
      );
    }

    // Busca dados completos do evento (meetUrl, etc.)
    const event = EVENTS.find((e) => e.slug === eventSlug);
    const meetUrl = event && "meetUrl" in event ? (event as { meetUrl: string }).meetUrl : undefined;

    // Gera template de email
    const { subject, html } = eventConfirmationEmail({
      nome,
      eventTitle,
      eventType: eventType || "Evento",
      eventDate: eventDate || "Em breve",
      eventTime: eventTime || "19h",
      eventDuration: eventDuration || "60 min",
    });

    // Gera arquivo .ics para travar na agenda (com link do Meet)
    const durationMinutes = parseInt(eventDuration) || 60;
    const icsContent = generateICS({
      title: eventTitle,
      description: `Evento gratuito do Instituto João Alves.\n\n${eventTitle}\n\nApresentador: João Pedro Alves`,
      dateISO: eventDateISO || new Date().toISOString().split("T")[0],
      time: eventTime || "19h",
      durationMinutes,
      location: "Online — Google Meet",
      meetUrl,
      organizerName: "Instituto João Alves",
      organizerEmail: "consultorjoao.alves@gmail.com",
    });

    // Envia email com convite .ics anexo
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject,
      html,
      attachments: [
        {
          filename: `evento-ija-${eventSlug || "convite"}.ics`,
          content: Buffer.from(icsContent).toString("base64"),
          contentType: "text/calendar; method=REQUEST",
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Email API error:", err);
    return NextResponse.json(
      { error: "Erro interno ao enviar email" },
      { status: 500 }
    );
  }
}
