"use client";

import {
  DollarSign,
  Target,
  Users,
  Megaphone,
  BarChart3,
} from "lucide-react";
import { DIAGNOSTIC_SECTIONS } from "@/lib/diagnostico/questions";

const SECTION_ICONS: Record<string, React.ElementType> = {
  "gestao-financeira": DollarSign,
  "planejamento-estrategico": Target,
  "lideranca-pessoas-processos": Users,
  "marketing-vendas": Megaphone,
  "acompanhamento-gestao": BarChart3,
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
  return (
    <nav className="space-y-1">
      {DIAGNOSTIC_SECTIONS.map((section, index) => {
        const Icon = SECTION_ICONS[section.key] || BarChart3;
        const isActive = index === currentStep;
        const isCompleted = completedSteps.has(index);
        const answered = answersPerSection[index] || 0;
        const canNavigate = index <= currentStep || isCompleted;

        return (
          <button
            key={section.key}
            type="button"
            disabled={!canNavigate}
            onClick={() => canNavigate && onNavigate(index)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all ${
              isActive
                ? "bg-navy-950 text-white shadow-sm"
                : isCompleted
                  ? "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                  : canNavigate
                    ? "bg-white text-navy-700 hover:bg-navy-50"
                    : "cursor-not-allowed bg-navy-50/50 text-navy-300"
            }`}
          >
            <Icon size={18} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{section.title}</p>
              <p
                className={`text-xs ${
                  isActive
                    ? "text-navy-300"
                    : isCompleted
                      ? "text-emerald-600"
                      : "text-navy-400"
                }`}
              >
                {isCompleted
                  ? `${section.questionCount}/${section.questionCount} completo`
                  : `${answered}/${section.questionCount}`}
              </p>
            </div>
            {isCompleted && (
              <span className="text-emerald-500">&#10003;</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
