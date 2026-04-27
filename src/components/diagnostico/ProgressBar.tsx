"use client";

import { TOTAL_QUESTIONS } from "@/lib/diagnostico/questions";

interface ProgressBarProps {
  answeredCount: number;
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({
  answeredCount,
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const pct = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-navy-700">
          Seção {currentStep + 1} de {totalSteps}
        </span>
        <span className="text-navy-500">
          {answeredCount}/{TOTAL_QUESTIONS} perguntas ({pct}%)
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-navy-100">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
