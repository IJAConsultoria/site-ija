"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, ClipboardCheck } from "lucide-react";
import { ResultsDashboard } from "@/components/diagnostico/ResultsDashboard";
import { PDFDownloadButton } from "@/components/diagnostico/PDFDownloadButton";
import { getResultsBySession, getSessionById } from "@/lib/queries/diagnostico";
import {
  calculateSolutionResults,
  getClassification,
} from "@/lib/diagnostico/scoring";
import { SOLUTION_LABELS } from "@/lib/diagnostico/questions";
import type { DiagnosticResults, SectionResult, SolutionResult } from "@/lib/diagnostico/types";

function ResultadoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [results, setResults] = useState<DiagnosticResults | null>(null);
  const [businessName, setBusinessName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    async function loadResults() {
      try {
        const [session, rawResults] = await Promise.all([
          getSessionById(sessionId!),
          getResultsBySession(sessionId!),
        ]);

        if (!rawResults || rawResults.length === 0) {
          setError(true);
          setLoading(false);
          return;
        }

        setBusinessName(session?.business_name || "");

        // Reconstruir SectionResult[] a partir dos dados do Supabase
        const sectionResults: SectionResult[] = rawResults.map((r: Record<string, unknown>) => ({
          section: r.section as string,
          solution: r.solution as string,
          bloco: ((r.bloco as number) || 1) as 1 | 2,
          total: r.total_questions as number,
          negative_count: r.negative_count as number,
          negative_pct: Number(r.negative_pct),
          classification: r.classification as SectionResult["classification"],
        }));

        const solutions = calculateSolutionResults(sectionResults);

        const totalQ = sectionResults.reduce((s, r) => s + r.total, 0);
        const totalN = sectionResults.reduce((s, r) => s + r.negative_count, 0);
        const overallPct = totalQ > 0 ? Math.round((totalN / totalQ) * 100) : 0;

        setResults({
          session_id: sessionId!,
          solutions,
          overall_negative_pct: overallPct,
          overall_classification: getClassification(overallPct),
          completed_at: (session?.completed_at as string) || new Date().toISOString(),
        });
      } catch (err) {
        console.error("Erro ao carregar resultados:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="mx-auto animate-spin text-accent" />
          <p className="mt-4 text-navy-500">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  if (!sessionId || error || !results) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <ClipboardCheck size={48} className="mx-auto mb-4 text-navy-300" />
          <h1 className="text-xl font-bold text-navy-950">
            Resultado não encontrado
          </h1>
          <p className="mt-2 text-navy-500">
            Este diagnóstico pode não ter sido concluído ou o link é inválido.
          </p>
          <a
            href="/diagnostico-empresarial"
            className="mt-6 inline-block rounded-xl bg-navy-950 px-6 py-3 text-sm font-medium text-white hover:bg-navy-800"
          >
            Fazer Diagnóstico
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-navy-100 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-lg font-bold text-navy-950">
              Resultado do Diagnóstico
            </h1>
            <p className="text-xs text-navy-500">
              Instituto João Alves — Diagnóstico Empresarial
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

      {/* Actions */}
      <div className="mx-auto flex max-w-4xl justify-end px-4 pt-8 sm:px-6">
        <PDFDownloadButton
          elementId="diagnostico-resultado"
          businessName={businessName}
        />
      </div>

      {/* Dashboard */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <ResultsDashboard
          results={results}
          businessName={businessName}
          id="diagnostico-resultado"
        />
      </div>
    </div>
  );
}

export default function ResultadoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-accent" />
            <p className="mt-4 text-sm text-navy-500">
              Carregando resultados...
            </p>
          </div>
        </div>
      }
    >
      <ResultadoContent />
    </Suspense>
  );
}
