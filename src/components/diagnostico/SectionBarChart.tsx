"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { SolutionResult } from "@/lib/diagnostico/types";
import { getHealthScore } from "@/lib/diagnostico/scoring";

interface SectionBarChartProps {
  solutions: SolutionResult[];
}

const BAR_COLORS: Record<string, string> = {
  critico: "#dc2626",
  atencao: "#d97706",
  controlado: "#059669",
};

export function SectionBarChart({ solutions }: SectionBarChartProps) {
  const data = solutions.map((s) => ({
    name: s.label,
    saude: getHealthScore(s.negative_pct),
    classification: s.classification,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d9e4f2" />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
        <YAxis
          dataKey="name"
          type="category"
          width={130}
          tick={{ fontSize: 12, fill: "#082548" }}
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
        <Bar dataKey="saude" radius={[0, 6, 6, 0]} barSize={28}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={BAR_COLORS[entry.classification] || "#082548"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
