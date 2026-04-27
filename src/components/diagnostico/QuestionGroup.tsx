"use client";

import type { DiagnosticQuestion } from "@/lib/diagnostico/types";
import { YesNoToggle } from "./YesNoToggle";

interface QuestionGroupProps {
  questions: DiagnosticQuestion[];
  answers: Record<string, boolean>;
  onAnswer: (questionId: string, value: boolean) => void;
}

export function QuestionGroup({
  questions,
  answers,
  onAnswer,
}: QuestionGroupProps) {
  if (!questions || questions.length === 0) {
    return <div className="text-navy-500">Carregando perguntas...</div>;
  }

  const groups: { label: string | null; items: DiagnosticQuestion[] }[] = [];
  let currentSub: string | null | undefined = undefined;

  for (const q of questions) {
    const sub = q.subsection || null;
    if (sub !== currentSub) {
      groups.push({ label: sub, items: [] });
      currentSub = sub;
    }
    groups[groups.length - 1].items.push(q);
  }

  return (
    <div className="space-y-6">
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.label && (
            <div className="mb-4 flex items-center gap-4 px-1">
              <span className="rounded-full bg-accent/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-accent">
                {group.label}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </div>
          )}
          <div className="space-y-2">
            {group.items.map((question) => {
              const isAnswered = answers[question.id] !== undefined;
              return (
                <div
                  key={question.id}
                  className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-all sm:px-5 sm:py-4 ${
                    isAnswered
                      ? "border-transparent bg-white shadow-sm"
                      : "border-navy-100 bg-white/60 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold transition-colors ${
                      isAnswered
                        ? "bg-navy-950 text-white"
                        : "bg-navy-100 text-navy-400"
                    }`}
                  >
                    {question.order}
                  </span>
                  <p className="min-w-0 flex-1 text-[13px] leading-relaxed text-navy-700 sm:text-sm">
                    {question.text}
                  </p>
                  <YesNoToggle
                    value={answers[question.id]}
                    onChange={(val) => onAnswer(question.id, val)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
