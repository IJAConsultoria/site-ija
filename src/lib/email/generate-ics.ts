/**
 * Gera um arquivo .ics (iCalendar) para convite de evento.
 * Compatível com Google Calendar, Outlook, Apple Calendar.
 */
export function generateICS({
  title,
  description,
  dateISO,
  time,
  durationMinutes,
  location,
  meetUrl,
  organizerName,
  organizerEmail,
}: {
  title: string;
  description: string;
  dateISO: string; // "2026-04-07"
  time: string; // "19h" ou "19:00"
  durationMinutes: number;
  location: string;
  meetUrl?: string;
  organizerName: string;
  organizerEmail: string;
}): string {
  // Parse time
  const hourMatch = time.match(/(\d{1,2})/);
  const startHour = hourMatch ? parseInt(hourMatch[1]) : 19;

  // Build date strings (BRT = UTC-3)
  const dateParts = dateISO.replace(/-/g, "");
  const startUTCHour = startHour + 3; // BRT to UTC
  const endUTCHour = startUTCHour + Math.floor(durationMinutes / 60);
  const endUTCMin = durationMinutes % 60;

  const dtStart = `${dateParts}T${String(startUTCHour).padStart(2, "0")}0000Z`;
  const dtEnd = `${dateParts}T${String(endUTCHour).padStart(2, "0")}${String(endUTCMin).padStart(2, "0")}00Z`;

  // Escape special chars for iCal
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

  const uid = `${dateISO}-${title.replace(/\s/g, "-").toLowerCase()}@ijaconsultoria.com.br`;
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  // Include meet link in description
  const fullDescription = meetUrl
    ? `${description}\n\nLink da videochamada: ${meetUrl}`
    : description;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Instituto João Alves//Eventos//PT",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${esc(`[IJA] ${title}`)}`,
    `DESCRIPTION:${esc(fullDescription)}`,
    `LOCATION:${esc(meetUrl || location)}`,
    `ORGANIZER;CN=${esc(organizerName)}:mailto:${organizerEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
  ];

  // Google Meet conference data (clickable link in calendar apps)
  if (meetUrl) {
    lines.push(`URL:${meetUrl}`);
  }

  // Alarms: 1h, 10min before
  lines.push(
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Evento IJA começa em 1 hora!",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT10M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Evento IJA começa em 10 minutos!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  );

  return lines.join("\r\n");
}
