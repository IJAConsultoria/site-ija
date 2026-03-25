"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle,
  Users as UsersIcon,
  CalendarPlus,
  ArrowRight,
  ArrowDown,
  MessageCircle,
  Clock,
  Video,
  Mic,
  Users,
  Sparkles,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { EVENTS } from "@/lib/constants";

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/EqRxsVTZ67P7XObCFEjb3w";

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  Live: { icon: Video, color: "text-red-500", bg: "bg-red-50" },
  Webinar: { icon: Mic, color: "text-blue-500", bg: "bg-blue-50" },
  Workshop: { icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
};

function ThankYouContent() {
  const searchParams = useSearchParams();
  const eventoSlug = searchParams.get("evento") || "";
  const nome = searchParams.get("nome") || "";

  const event = EVENTS.find((e) => e.slug === eventoSlug);
  const config = event ? typeConfig[event.type] || typeConfig.Live : typeConfig.Live;
  const TypeIcon = config.icon;

  const [joinedGroup, setJoinedGroup] = useState(false);
  const [savedCalendar, setSavedCalendar] = useState(false);

  const completedSteps = 1 + (joinedGroup ? 1 : 0) + (savedCalendar ? 1 : 0);
  const progressPercent = (completedSteps / 3) * 100;

  // Fire confetti on mount
  const fireConfetti = useCallback(() => {
    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a68523", "#c9a84c", "#011735", "#ffffff", "#8c6f1b"],
    });

    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#a68523", "#c9a84c", "#011735"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#a68523", "#c9a84c", "#011735"],
      });
    }, 300);

    // Fireworks effect
    setTimeout(() => {
      const end = Date.now() + 1500;
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          particleCount: 20,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.4,
          },
          colors: ["#a68523", "#c9a84c", "#f3ede4", "#011735"],
          ticks: 60,
          gravity: 1.2,
          scalar: 1.2,
          shapes: ["circle", "square"],
        });
      }, 150);
    }, 800);
  }, []);

  useEffect(() => {
    fireConfetti();
  }, [fireConfetti]);

  // Fire confetti again when all steps complete
  useEffect(() => {
    if (completedSteps === 3) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ["#a68523", "#c9a84c", "#011735", "#ffffff"],
        });
      }, 300);
    }
  }, [completedSteps]);

  // Build calendar date strings from dateISO
  const getCalendarDates = () => {
    if (!event || !("dateISO" in event) || !event.dateISO) return null;
    const dateStr = (event as { dateISO: string }).dateISO.replace(/-/g, "");
    // Event at 19h BRT (UTC-3) = 22h UTC, duration varies by type
    const durationMinutes = parseInt(event.duration) || 60;
    const startHour = 19;
    const endHour = startHour + Math.floor(durationMinutes / 60);
    const endMin = durationMinutes % 60;
    const start = `${dateStr}T${String(startHour).padStart(2, "0")}0000`;
    const end = `${dateStr}T${String(endHour).padStart(2, "0")}${String(endMin).padStart(2, "0")}00`;
    return { start, end, isoDate: (event as { dateISO: string }).dateISO };
  };

  // Generate Google Calendar URL
  const getGoogleCalendarUrl = () => {
    if (!event) return "#";
    const title = encodeURIComponent(`[IJA] ${event.title}`);
    const details = encodeURIComponent(
      `Evento gratuito do Instituto João Alves.\n\n${event.description}\n\nApresentador: ${event.speaker}\n\nGrupo WhatsApp: ${WHATSAPP_GROUP_URL}`
    );
    const location = encodeURIComponent("Online (link será enviado)");
    const dates = getCalendarDates();
    const dateParam = dates ? `&dates=${dates.start}/${dates.end}&ctz=America/Sao_Paulo` : "";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}${dateParam}&sf=true&output=xml`;
  };

  // Generate Outlook Calendar URL
  const getOutlookCalendarUrl = () => {
    if (!event) return "#";
    const title = encodeURIComponent(`[IJA] ${event.title}`);
    const body = encodeURIComponent(
      `Evento gratuito do Instituto João Alves.\n\n${event.description}\n\nApresentador: ${event.speaker}\n\nGrupo WhatsApp: ${WHATSAPP_GROUP_URL}`
    );
    const location = encodeURIComponent("Online (link será enviado)");
    const dates = getCalendarDates();
    const dateParam = dates
      ? `&startdt=${dates.isoDate}T19:00:00&enddt=${dates.isoDate}T${String(19 + Math.floor((parseInt(event.duration) || 60) / 60)).padStart(2, "0")}:${String((parseInt(event.duration) || 60) % 60).padStart(2, "0")}:00`
      : "";
    return `https://outlook.live.com/calendar/0/action/compose?subject=${title}&body=${body}&location=${location}${dateParam}`;
  };

  return (
    <>
      {/* ===== HERO (compacto) ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-12 lg:py-16 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(166,133,35,0.2)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          {/* Success icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 ring-4 ring-accent/10">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white">
              <CheckCircle size={24} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {nome ? `${nome}, sua` : "Sua"} inscrição está{" "}
            <span className="serif-italic gradient-text">confirmada</span>!
          </h1>

          {/* Event info inline */}
          {event && (
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} px-3 py-1 text-xs font-bold ${config.color}`}
              >
                <TypeIcon size={12} />
                {event.type}
              </span>
              <span className="text-sm font-medium text-white">
                {event.title}
              </span>
              <span className="text-sm text-navy-400">
                {event.date} · {event.time} · {event.duration}
              </span>
            </div>
          )}

          {/* Progress bar dentro do hero */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Seu progresso
              </p>
              <p className="text-xs font-bold text-navy-300">
                {completedSteps}/3 completos
              </p>
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-gold-300 transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Scroll indicator */}
          <a
            href="#passos"
            className="mt-6 inline-flex flex-col items-center gap-1 text-navy-400 transition-colors hover:text-accent"
          >
            <span className="text-sm font-medium">Complete os passos abaixo</span>
            <ArrowDown size={18} className="animate-bounce" />
          </a>
        </div>
      </section>

      {/* ===== STEPS ===== */}
      <section id="passos" className="bg-cream py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-4">
          {/* Step 1: Inscrição (always complete) */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-3xl border-2 border-accent/30 bg-accent/5 p-6 lg:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
                <CheckCircle size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-navy-950">
                    1. Inscrição confirmada
                  </h3>
                  <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
                    Feito
                  </span>
                </div>
                <p className="mt-1 text-navy-600">
                  Sua vaga está garantida. Você receberá os detalhes por e-mail
                  e WhatsApp.
                </p>
              </div>
            </div>

            {/* Step 2: Salvar na agenda */}
            <div
              className={`flex items-start gap-4 rounded-3xl border-2 p-6 lg:p-8 transition-all ${
                savedCalendar
                  ? "border-accent/30 bg-accent/5"
                  : "border-navy-100 bg-white hover:border-accent/20 hover:shadow-lg"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  savedCalendar
                    ? "bg-accent text-white"
                    : "bg-navy-100 text-navy-400"
                }`}
              >
                {savedCalendar ? (
                  <CheckCircle size={24} />
                ) : (
                  <CalendarPlus size={24} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-navy-950">
                    2. Salve na sua agenda
                  </h3>
                  {savedCalendar && (
                    <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
                      Feito
                    </span>
                  )}
                </div>
                <p className="mt-1 text-navy-600">
                  Adicione o evento na sua agenda para não esquecer.{" "}
                  {event ? `${event.date}, terça-feira às ${event.time}.` : "Terça-feira às 19h."}
                </p>
                {!savedCalendar ? (
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={getGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSavedCalendar(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-all hover:border-accent/30 hover:shadow-md"
                    >
                      <Calendar size={16} className="text-[#4285F4]" />
                      Google Agenda
                    </a>
                    <a
                      href={getOutlookCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSavedCalendar(true)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-all hover:border-accent/30 hover:shadow-md"
                    >
                      <Calendar size={16} className="text-[#0078D4]" />
                      Outlook
                    </a>
                  </div>
                ) : (
                  <p className="mt-3 text-sm font-medium text-accent">
                    Evento salvo na agenda!
                  </p>
                )}
              </div>
            </div>

            {/* Step 3: Entrar no grupo */}
            <div
              className={`flex items-start gap-4 rounded-3xl border-2 p-6 lg:p-8 transition-all ${
                joinedGroup
                  ? "border-accent/30 bg-accent/5"
                  : "border-navy-100 bg-white hover:border-accent/20 hover:shadow-lg"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  joinedGroup
                    ? "bg-accent text-white"
                    : "bg-navy-100 text-navy-400"
                }`}
              >
                {joinedGroup ? (
                  <CheckCircle size={24} />
                ) : (
                  <MessageCircle size={24} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-navy-950">
                    3. Entre no grupo do WhatsApp
                  </h3>
                  {joinedGroup && (
                    <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
                      Feito
                    </span>
                  )}
                </div>
                <p className="mt-1 text-navy-600">
                  O link do evento e materiais exclusivos serão enviados no
                  grupo. Não perca!
                </p>
                {!joinedGroup ? (
                  <a
                    href={WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setJoinedGroup(true)}
                    className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1ea952] hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/25"
                  >
                    <UsersIcon size={18} />
                    Entrar no grupo
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <p className="mt-3 text-sm font-medium text-accent">
                    Perfeito! Fique atento às mensagens do grupo.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* All complete message */}
          {completedSteps === 3 && (
            <div className="mt-8 rounded-3xl border-2 border-accent bg-gradient-to-br from-accent/10 to-accent/5 p-8 text-center">
              <Sparkles size={32} className="mx-auto text-accent" />
              <p className="mt-4 text-xl font-bold text-navy-950">
                Tudo pronto!
              </p>
              <p className="mt-2 text-navy-600">
                Você completou todos os passos. Nos vemos {event ? `dia ${event.date}` : "no evento"} às 19h!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== LEMBRETE ===== */}
      <section className="bg-cream-dark py-16 lg:py-24 dot-pattern">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-lg shadow-navy-950/5 lg:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-950">
                  Lembrete importante
                </h3>
                <p className="text-sm text-navy-500">Anote esses detalhes</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-cream p-5 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Quando
                </p>
                <p className="mt-2 text-lg font-bold text-navy-950">
                  {event ? event.date : "Em breve"}
                </p>
                <p className="mt-0.5 text-xs text-navy-500">Terça-feira</p>
              </div>
              <div className="rounded-2xl bg-cream p-5 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Horário
                </p>
                <p className="mt-2 text-lg font-bold text-navy-950">
                  {event ? event.time : "19h"}
                </p>
              </div>
              <div className="rounded-2xl bg-cream p-5 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Onde
                </p>
                <p className="mt-2 text-lg font-bold text-navy-950">Online</p>
              </div>
            </div>

            <p className="mt-6 text-center text-navy-600">
              O link de acesso será enviado no{" "}
              <a
                href={WHATSAPP_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:text-accent-dark"
              >
                grupo do WhatsApp
              </a>{" "}
              minutos antes do evento.
            </p>
          </div>
        </div>
      </section>

      {/* ===== VOLTAR ===== */}
      <section className="bg-cream py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark"
          >
            Ver outros eventos
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-navy-950">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
            <p className="mt-4 text-navy-300">Carregando...</p>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
