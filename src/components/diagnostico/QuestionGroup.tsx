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

  // Agrupa por subsection (se existir)
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
    <div className="space-y-8">
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.label && (
            <h3 className="mb-4 border-b border-navy-100 pb-2 text-sm font-semibold uppercase tracking-wide text-accent">
              {group.label}
            </h3>
          )}
          <div className="space-y-3">
            {group.items.map((question, qi) => {
              const isAnswered = answers[question.id] !== undefined;
              return (
                <div
                  key={question.id}
                  className={`flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition-all ${
                    isAnswered
                      ? "border-navy-100 bg-white"
                      : "border-navy-200 bg-navy-50/50"
                  }`}
                >
                  <p className="flex-1 text-sm leading-relaxed text-navy-800">
                    <span className="mr-2 font-medium text-navy-400">
                      {question.order}.
                    </span>
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
