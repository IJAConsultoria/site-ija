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

  return (
    <div id={id} className="space-y-10">
      {/* Hero / Score geral */}
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm">
        {businessName && (
          <p className="mb-2 text-sm font-medium text-navy-400">
            Diagnóstico Empresarial
          </p>
        )}
        <h2 className="text-2xl font-bold text-navy-950">
          {businessName || "Resultado do Diagnóstico"}
        </h2>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-5xl font-bold text-navy-950">
            {healthScore}
            <span className="text-2xl text-navy-400">%</span>
          </span>
          <div className="text-left">
            <p className="text-sm text-navy-500">Saúde Geral</p>
            <ClassificationBadge
              classification={overall_classification}
              size="md"
            />
          </div>
        </div>

        {/* Contadores */}
        <div className="mt-6 flex justify-center gap-6">
          {(["critico", "atencao", "controlado"] as const).map((key) => (
            <div key={key} className="text-center">
              <span
                className={`text-2xl font-bold ${CLASSIFICATION_CONFIG[key].color}`}
              >
                {counts[key]}
              </span>
              <p className="text-xs text-navy-500">
                {CLASSIFICATION_CONFIG[key].label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico Radar */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-navy-950">
          Visão Geral das Áreas
        </h3>
        <RadarOverview solutions={solutions} />
      </div>

      {/* Gráfico de Barras */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-navy-950">
          Saúde por Área
        </h3>
        <SectionBarChart solutions={solutions} />
      </div>

      {/* Detalhamento por área */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-bold text-navy-950">
          Detalhamento por Área
        </h3>
        <div className="space-y-4">
          {solutions.map((s) => (
            <div
              key={s.solution}
              className="flex items-center justify-between rounded-xl border border-navy-50 bg-navy-50/30 px-5 py-4"
            >
              <div>
                <p className="font-medium text-navy-950">{s.label}</p>
                <p className="text-sm text-navy-500">
                  {s.total} perguntas — {s.negative_count} pontos de atenção
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-lg font-bold text-navy-950">
                    {getHealthScore(s.negative_pct)}%
                  </span>
                </div>
                <ClassificationBadge
                  classification={s.classification}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumo executivo */}
      <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-bold text-navy-950">
          Plano de Prioridades
        </h3>
        <ExecutiveSummary solutions={solutions} />
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-navy-950 p-8 text-center text-white">
        <h3 className="text-xl font-bold">
          Quer um plano de ação personalizado?
        </h3>
        <p className="mt-2 text-navy-300">
          Nossos consultores analisam seu diagnóstico e criam um plano de
          crescimento para os próximos 5 anos.
        </p>
        <a
          href="/contato"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-bold text-navy-950 transition-colors hover:bg-accent/90"
        >
          Falar com Especialista
        </a>
      </div>
    </div>
  );
}
