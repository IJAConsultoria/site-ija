"use client";

import type { SolutionResult } from "@/lib/diagnostico/types";
import { generateSummary } from "@/lib/diagnostico/summary";
import { ClassificationBadge } from "./ClassificationBadge";

interface ExecutiveSummaryProps {
  solutions: SolutionResult[];
}

export function ExecutiveSummary({ solutions }: ExecutiveSummaryProps) {
  const summary = generateSummary(solutions);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950">{summary.headline}</h3>
        <p className="mt-2 leading-relaxed text-navy-600">
          {summary.description}
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-navy-400">
          Prioridades de Ação
        </h4>
        {summary.priorities.map((p, i) => (
          <div
            key={p.solution}
            className="flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-4"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-600">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-navy-950">{p.label}</span>
                <ClassificationBadge
                  classification={p.classification}
                  size="sm"
                />
              </div>
              <p className="mt-1 text-sm text-navy-500">{p.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
