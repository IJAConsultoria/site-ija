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
import { getHealthScore } from "@/lib/diagnostico/scoring";

interface RadarOverviewProps {
  solutions: SolutionResult[];
}

const SHORT_LABELS: Record<string, string> = {
  "Gestão Financeira": "Financeiro",
  "Planejamento Estratégico": "Estratégia",
  "Liderança, Pessoas e Processos": "Liderança",
  "Marketing e Vendas": "Marketing",
  "Acompanhamento e Gestão Contínua": "Performance",
};

export function RadarOverview({ solutions }: RadarOverviewProps) {
  const data = solutions.map((s) => ({
    area: SHORT_LABELS[s.label] || s.label,
    score: getHealthScore(s.negative_pct),
    fullMark: 100,
  }));

  return (
    <div className="flex items-center justify-center">
      <ResponsiveContainer width="100%" height={380}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#d9e4f2" />
          <PolarAngleAxis
            dataKey="area"
            tick={{ fill: "#082548", fontSize: 13, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#8daed8", fontSize: 11 }}
            tickCount={5}
          />
          <Radar
            name="Saúde"
            dataKey="score"
            stroke="#a68523"
            fill="#a68523"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Saúde"]}
            contentStyle={{
              backgroundColor: "#011735",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: 13,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
