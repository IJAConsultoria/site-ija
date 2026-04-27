"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { DiagnosticWizard } from "@/components/diagnostico/DiagnosticWizard";
import { ClipboardCheck } from "lucide-react";

function QuestionarioContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  if (!sessionId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <ClipboardCheck size={48} className="mx-auto mb-4 text-navy-300" />
          <h1 className="text-xl font-bold text-navy-950">
            Sessão não encontrada
          </h1>
          <p className="mt-2 text-navy-500">
            Inicie o diagnóstico pela{" "}
            <a href="/diagnostico-empresarial" className="text-accent underline">
              página principal
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-bold text-navy-950">
              Diagnóstico Empresarial
            </h1>
            <p className="text-xs text-navy-500">
              Instituto João Alves — Avaliação completa do seu negócio
            </p>
          </div>
          <a
            href="/"
            className="text-sm font-medium text-navy-500 hover:text-navy-700"
          >
            IJA
          </a>
        </div>
      </div>

      {/* Wizard */}
      <DiagnosticWizard sessionId={sessionId} />
    </div>
  );
}

export default function QuestionarioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-accent" />
            <p className="mt-4 text-sm text-navy-500">
              Carregando diagnóstico...
            </p>
          </div>
        </div>
      }
    >
      <QuestionarioContent />
    </Suspense>
  );
}
