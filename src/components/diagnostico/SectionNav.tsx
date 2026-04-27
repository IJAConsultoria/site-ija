"use client";

import {
  DollarSign,
  Target,
  Users,
  Megaphone,
  BarChart3,
  Package,
  Activity,
  Brain,
  AlertTriangle,
  ListChecks,
  Handshake,
  TrendingUp,
  Gauge,
} from "lucide-react";
import { DIAGNOSTIC_SECTIONS } from "@/lib/diagnostico/questions";

const SECTION_ICONS: Record<string, React.ElementType> = {
  "gestao-financeira": DollarSign,
  "estoque": Package,
  "planejamento-estrategico": Target,
  "lideranca-pessoas-processos": Users,
  "marketing-vendas": Megaphone,
  "monitoramento-kpis": Activity,
  "analise-decisao": Brain,
  "problemas-desvios": AlertTriangle,
  "planos-acao": ListChecks,
  "acompanhamento-gestao": Handshake,
  "crescimento-evolucao": TrendingUp,
  "controle-gestao-estrategica": Gauge,
};

interface SectionNavProps {
  currentStep: number;
  completedSteps: Set<number>;
  answersPerSection: number[];
  onNavigate: (step: number) => void;
}

export function SectionNav({
  currentStep,
  completedSteps,
  answersPerSection,
  onNavigate,
}: SectionNavProps) {
  const bloco1Sections = DIAGNOSTIC_SECTIONS.filter((s) => s.bloco === 1);
  const bloco2Sections = DIAGNOSTIC_SECTIONS.filter((s) => s.bloco === 2);

  const renderItem = (section: (typeof DIAGNOSTIC_SECTIONS)[0], index: number) => {
    const Icon = SECTION_ICONS[section.key] || BarChart3;
    const isActive = index === currentStep;
    const isCompleted = completedSteps.has(index);
    const answered = answersPerSection[index] || 0;
    const pct = Math.round((answered / section.questionCount) * 100);

    return (
      <button
        key={section.key}
        type="button"
        onClick={() => onNavigate(index)}
        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
          isActive
            ? "bg-white/10 text-white"
            : isCompleted
              ? "text-emerald-300 hover:bg-white/5"
              : "text-navy-300 hover:bg-white/5 hover:text-white"
        }`}
      >
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
            isActive
              ? "bg-accent text-navy-950"
              : isCompleted
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-navy-400 group-hover:text-navy-200"
          }`}
        >
          <Icon size={14} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium">{section.title}</p>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted ? "bg-emerald-400" : "bg-accent"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] tabular-nums text-navy-400">
              {answered}/{section.questionCount}
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Bloco 1 */}
      <div>
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-navy-500">
          Estruturação
        </p>
        <div className="space-y-0.5">
          {bloco1Sections.map((section) => {
            const globalIndex = DIAGNOSTIC_SECTIONS.findIndex(
              (s) => s.key === section.key
            );
            return renderItem(section, globalIndex);
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-white/10" />

      {/* Bloco 2 */}
      <div>
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-navy-500">
          Performance
        </p>
        <div className="space-y-0.5">
          {bloco2Sections.map((section) => {
            const globalIndex = DIAGNOSTIC_SECTIONS.findIndex(
              (s) => s.key === section.key
            );
            return renderItem(section, globalIndex);
          })}
        </div>
      </div>
    </div>
  );
}
