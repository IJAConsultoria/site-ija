"use client";

import type { DiagnosticResults } from "@/lib/diagnostico/types";
import {
  getHealthScore,
  countByClassification,
  CLASSIFICATION_CONFIG,
} from "@/lib/diagnostico/scoring";
import { ClassificationBadge } from "./ClassificationBadge";
import { RadarOverview } from "./RadarOverview";
import { SectionBarChart } from "./SectionBarChart";
import { ExecutiveSummary } from "./ExecutiveSummary";

interface ResultsDashboardProps {
  results: DiagnosticResults;
  businessName?: string;
  id?: string;
}

export function ResultsDashboard({
  results,
  businessName,
  id,
}: ResultsDashboardProps) {
  const { solutions, overall_negative_pct, overall_classification } = results;
  const counts = countByClassification(solutions);
  const healthScore = getHealthScore(overall_negative_pct);

  const scoreColor =
    overall_classification === "controlado"
      ? "from-emerald-400 to-emerald-600"
      : overall_classification === "atencao"
        ? "from-amber-400 to-amber-600"
        : "from-red-400 to-red-600";

  return (
    <div id={id} className="space-y-8">
      {/* Hero Score */}
      <div className="overflow-hidden rounded-3xl bg-navy-950 p-8 text-white noise-overlay sm:p-10">
        <div className="relative">
          {/* Decorative */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-accent/5 blur-2xl" />

          <div className="relative">
            {businessName && (
              <p className="mb-1 text-sm text-navy-300">{businessName}</p>
            )}
            <h2 className="text-2xl font-bold sm:text-3xl">
              Resultado do Diagnóstico
            </h2>

            <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:gap-12">
              {/* Big score */}
              <div className="text-center sm:text-left">
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-navy-400">
                  Saúde Geral
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`bg-gradient-to-b ${scoreColor} bg-clip-text text-7xl font-black tabular-nums text-transparent sm:text-8xl`}
                  >
                    {healthScore}
                  </span>
                  <span className="text-2xl font-bold text-navy-400">%</span>
                </div>
                <div className="mt-2">
                  <ClassificationBadge
                    classification={overall_classification}
                    size="lg"
                  />
                </div>
              </div>

              {/* Counters */}
              <div className="flex gap-6">
                {(["critico", "atencao", "controlado"] as const).map((key) => {
                  const config = CLASSIFICATION_CONFIG[key];
                  return (
                    <div
                      key={key}
                      className="rounded-2xl bg-white/5 px-5 py-4 text-center backdrop-blur-sm"
                    >
                      <span className="text-3xl font-bold">{counts[key]}</span>
                      <p className="mt-0.5 text-xs text-navy-400">
                        {config.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radar + Bar side by side on desktop */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-base font-bold text-navy-950">
            Visão Geral
          </h3>
          <p className="mb-4 text-xs text-navy-400">
            Quanto maior a área, melhor a saúde
          </p>
          <RadarOverview solutions={solutions} />
        </div>

        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-base font-bold text-navy-950">
            Saúde por Área
          </h3>
          <p className="mb-4 text-xs text-navy-400">
            Percentual de respostas positivas
          </p>
          <SectionBarChart solutions={solutions} />
        </div>
      </div>

      {/* Detalhamento */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="mb-6 text-base font-bold text-navy-950">
          Detalhamento por Área
        </h3>
        <div className="space-y-3">
          {solutions.map((s) => {
            const score = getHealthScore(s.negative_pct);
            const barColor =
              s.classification === "controlado"
                ? "bg-emerald-500"
                : s.classification === "atencao"
                  ? "bg-amber-500"
                  : "bg-red-500";
            return (
              <div
                key={s.solution}
                className="group rounded-xl border border-navy-50 bg-navy-50/30 p-4 transition-colors hover:bg-navy-50/60"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-navy-950">{s.label}</p>
                      <ClassificationBadge
                        classification={s.classification}
                        size="sm"
                      />
                    </div>
                    <p className="mt-0.5 text-xs text-navy-400">
                      {s.total} perguntas — {s.negative_count} pontos de atenção
                    </p>
                  </div>
                  <span className="text-2xl font-bold tabular-nums text-navy-950">
                    {score}%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-100">
                  <div
                    className={`h-full rounded-full ${barColor} transition-all duration-700`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumo executivo */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="mb-6 text-base font-bold text-navy-950">
          Plano de Prioridades
        </h3>
        <ExecutiveSummary solutions={solutions} />
      </div>

      {/* CTA */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 to-navy-800 p-8 text-center text-white sm:p-12">
        <div className="relative">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative">
            <h3 className="text-2xl font-bold sm:text-3xl">
              Quer transformar esse diagnóstico em{" "}
              <span className="serif-italic text-accent">resultados</span>?
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-navy-300">
              Nossos consultores analisam seu diagnóstico e criam um plano de
              crescimento estruturado para os próximos 5 anos.
            </p>
            <a
              href="/contato"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-amber-500 px-8 py-4 font-bold text-navy-950 shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:brightness-105"
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
