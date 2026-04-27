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
    <div className="flex items-center gap-4">
      <div className="min-w-0 flex-1">
        <div className="h-2 overflow-hidden rounded-full bg-navy-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-amber-400 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <div className="flex shrink-0 items-baseline gap-1">
        <span className="text-lg font-bold text-navy-950">{pct}%</span>
        <span className="text-xs text-navy-400">
          ({answeredCount}/{TOTAL_QUESTIONS})
        </span>
      </div>
    </div>
  );
}
