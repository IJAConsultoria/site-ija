"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useCallback } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  CheckCircle,
  ArrowRight,
  Clock,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { WHATSAPP_URL, PHONE, EMAIL } from "@/lib/constants";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const nome = searchParams.get("nome") || "";

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a68523", "#c9a84c", "#011735", "#ffffff", "#8c6f1b"],
    });

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
  }, []);

  useEffect(() => {
    fireConfetti();
  }, [fireConfetti]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-20 lg:py-28 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(166,133,35,0.2)_0%,_transparent_60%)]" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            >
              <Sparkles size={14 + i * 2} className="text-accent/20" />
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-accent/20 ring-4 ring-accent/10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
              <CheckCircle size={36} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {nome ? `${nome}, recebemos` : "Recebemos"} sua{" "}
            <span className="serif-italic gradient-text">solicitação</span>!
          </h1>

          <p className="mt-4 text-lg text-navy-300">
            Nossa equipe entrará em contato em até 24 horas úteis para agendar
            seu diagnóstico gratuito.
          </p>
        </div>
      </section>

      {/* Próximos passos */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-sm font-bold uppercase tracking-widest text-accent mb-8">
            Próximos passos
          </p>

          <div className="space-y-4">
            {/* Passo 1 */}
            <div className="flex items-start gap-4 rounded-3xl border-2 border-accent/30 bg-accent/5 p-6 lg:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-navy-950">
                    1. Solicitação enviada
                  </h3>
                  <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
                    Feito
                  </span>
                </div>
                <p className="mt-1 text-navy-600">
                  Seus dados foram recebidos com sucesso.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="flex items-start gap-4 rounded-3xl border-2 border-navy-100 bg-white p-6 lg:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-100 text-navy-400">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-950">
                  2. Entraremos em contato
                </h3>
                <p className="mt-1 text-navy-600">
                  Em até 24 horas úteis, um consultor do IJA vai ligar ou enviar
                  mensagem para agendar o melhor horário para o seu diagnóstico.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="flex items-start gap-4 rounded-3xl border-2 border-navy-100 bg-white p-6 lg:p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy-100 text-navy-400">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy-950">
                  3. Sessão de diagnóstico
                </h3>
                <p className="mt-1 text-navy-600">
                  30-45 minutos direto ao ponto. Vamos analisar as 8 áreas da
                  gestão do seu negócio e entregar um plano de ação
                  personalizado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Não quer esperar? */}
      <section className="bg-cream-dark py-16 lg:py-24 dot-pattern">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-lg shadow-navy-950/5 lg:p-10 text-center">
            <h3 className="text-xl font-bold text-navy-950">
              Não quer esperar?
            </h3>
            <p className="mt-2 text-navy-600">
              Fale diretamente com nossa equipe agora mesmo.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#1ea952] hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/25"
              >
                <Phone size={18} />
                WhatsApp: {PHONE}
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-navy-200 bg-white px-6 py-3.5 text-base font-semibold text-navy-800 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <Mail size={18} />
                Enviar e-mail
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Voltar */}
      <section className="bg-cream py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark"
          >
            Voltar para o site
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}

export default function DiagnosticoObrigadoPage() {
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
