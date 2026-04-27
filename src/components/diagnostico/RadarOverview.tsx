"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { SolutionResult } from "@/lib/diagnostico/types";
import { getHealthScore, CLASSIFICATION_CONFIG } from "@/lib/diagnostico/scoring";

interface RadarOverviewProps {
  solutions: SolutionResult[];
}

const SHORT_LABELS: Record<string, string> = {
  "gestao-financeira": "Financeiro",
  "planejamento-estrategico": "Estratégia",
  "lideranca-organizacional": "Liderança",
  "gestao-comercial-marketing": "Marketing",
  "performance-empresarial": "Performance",
};

const SCORE_COLORS: Record<string, string> = {
  critico: "#ef4444",
  atencao: "#f59e0b",
  controlado: "#10b981",
};

export function RadarOverview({ solutions }: RadarOverviewProps) {
  const data = solutions.map((s) => ({
    area: SHORT_LABELS[s.solution] || s.label,
    score: getHealthScore(s.negative_pct),
    classification: s.classification,
    fullMark: 100,
  }));

  return (
    <div className="flex flex-col items-center gap-6">
      <ResponsiveContainer width="100%" height={420}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="#d9e4f2" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="area"
            tick={{
              fill: "#082548",
              fontSize: 14,
              fontWeight: 600,
            }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#b3c9e5", fontSize: 10 }}
            tickCount={5}
            axisLine={false}
          />
          <Radar
            name="Saúde"
            dataKey="score"
            stroke="#011735"
            fill="#a68523"
            fillOpacity={0.25}
            strokeWidth={2.5}
            dot={{
              r: 5,
              fill: "#a68523",
              stroke: "#011735",
              strokeWidth: 2,
            }}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Saúde da área"]}
            contentStyle={{
              backgroundColor: "#011735",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: 13,
              padding: "8px 14px",
            }}
            itemStyle={{ color: "#a68523" }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Legenda com scores */}
      <div className="flex flex-wrap justify-center gap-3">
        {data.map((d) => (
          <div
            key={d.area}
            className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3 py-2"
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: SCORE_COLORS[d.classification] || "#082548",
              }}
            />
            <span className="text-xs font-medium text-navy-700">
              {d.area}
            </span>
            <span className="text-xs font-bold text-navy-950">
              {d.score}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
