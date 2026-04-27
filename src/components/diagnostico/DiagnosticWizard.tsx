"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  QUESTIONS_BY_SECTION,
  DIAGNOSTIC_SECTIONS,
  ALL_QUESTIONS,
  TOTAL_QUESTIONS,
} from "@/lib/diagnostico/questions";
import { calculateSectionResults } from "@/lib/diagnostico/scoring";
import {
  saveDiagnosticProgress,
  loadDiagnosticProgress,
  clearDiagnosticProgress,
} from "@/lib/diagnostico/storage";
import {
  saveAnswers,
  saveResults,
  updateSessionStatus,
} from "@/lib/queries/diagnostico";
import { ProgressBar } from "./ProgressBar";
import { SectionNav } from "./SectionNav";
import { QuestionGroup } from "./QuestionGroup";

interface DiagnosticWizardProps {
  sessionId: string;
}

export function DiagnosticWizard({ sessionId }: DiagnosticWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set()
  );

  const totalSteps = DIAGNOSTIC_SECTIONS.length;
  const currentSection =
    QUESTIONS_BY_SECTION[currentStep] || QUESTIONS_BY_SECTION[0];

  useEffect(() => {
    const saved = loadDiagnosticProgress();
    if (saved && saved.session_id === sessionId) {
      setAnswers(saved.answers);
      const step = Math.min(saved.current_step, totalSteps - 1);
      setCurrentStep(step);
      const completed = new Set<number>();
      QUESTIONS_BY_SECTION.forEach((section, i) => {
        const allAnswered = section.questions.every(
          (q) => saved.answers[q.id] !== undefined
        );
        if (allAnswered) completed.add(i);
      });
      setCompletedSteps(completed);
    }
  }, [sessionId, totalSteps]);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  useEffect(() => {
    if (Object.keys(answers).length === 0) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveDiagnosticProgress(sessionId, answers, currentStep);
    }, 500);
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [answers, currentStep, sessionId]);

  const handleAnswer = useCallback(
    (questionId: string, value: boolean) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const answeredCountForSection = (stepIndex: number) => {
    const section = QUESTIONS_BY_SECTION[stepIndex];
    if (!section) return 0;
    return section.questions.filter((q) => answers[q.id] !== undefined).length;
  };

  const isSectionComplete = (stepIndex: number) => {
    const section = QUESTIONS_BY_SECTION[stepIndex];
    if (!section) return false;
    return section.questions.every((q) => answers[q.id] !== undefined);
  };

  const answeredTotal = Object.keys(answers).length;
  const answersPerSection = DIAGNOSTIC_SECTIONS.map((_, i) =>
    answeredCountForSection(i)
  );

  const goToStep = (step: number) => {
    if (isSectionComplete(currentStep)) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
    }
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (isSectionComplete(currentStep)) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const allComplete = DIAGNOSTIC_SECTIONS.every((_, i) =>
    isSectionComplete(i)
  );
  const unansweredCount = TOTAL_QUESTIONS - answeredTotal;
  const currentAnswered = answeredCountForSection(currentStep);
  const currentTotal = currentSection.questionCount;
  const sectionComplete = isSectionComplete(currentStep);

  const handleSubmit = async () => {
    if (!allComplete || submitting) return;
    setSubmitting(true);
    try {
      const sectionResults = calculateSectionResults(ALL_QUESTIONS, answers);
      await Promise.all([
        saveAnswers(sessionId, answers),
        saveResults(sessionId, sectionResults),
        updateSessionStatus(sessionId, "completed", new Date().toISOString()),
      ]);
      clearDiagnosticProgress();
      router.push(`/diagnostico-empresarial/resultado?session=${sessionId}`);
    } catch (err) {
      console.error("Erro ao salvar diagnóstico:", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar — dark, fixed */}
      <aside className="hidden w-[280px] shrink-0 lg:block">
        <div className="fixed left-0 top-0 flex h-screen w-[280px] flex-col bg-navy-950 noise-overlay">
          {/* Logo area */}
          <div className="border-b border-white/5 px-5 py-5">
            <p className="text-sm font-bold text-white">
              Diagnóstico Empresarial
            </p>
            <p className="mt-0.5 text-[11px] text-navy-400">
              Instituto João Alves
            </p>
          </div>

          {/* Sections */}
          <div className="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin">
            <SectionNav
              currentStep={currentStep}
              completedSteps={completedSteps}
              answersPerSection={answersPerSection}
              onNavigate={goToStep}
            />
          </div>

          {/* Footer stats */}
          <div className="border-t border-white/5 px-5 py-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-navy-400">Progresso geral</span>
              <span className="font-bold text-white">
                {Math.round((answeredTotal / TOTAL_QUESTIONS) * 100)}%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-amber-400 transition-all duration-700"
                style={{
                  width: `${Math.round(
                    (answeredTotal / TOTAL_QUESTIONS) * 100
                  )}%`,
                }}
              />
            </div>
            <p className="mt-2 text-[10px] text-navy-500">
              {answeredTotal} de {TOTAL_QUESTIONS} perguntas
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-w-0 flex-1 bg-[#f5f3ee]">
        {/* Top bar mobile */}
        <div className="sticky top-0 z-10 border-b border-navy-100 bg-white/90 backdrop-blur-md lg:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-navy-950">Diagnóstico</p>
              <span className="text-xs font-medium text-navy-500">
                {Math.round((answeredTotal / TOTAL_QUESTIONS) * 100)}%
              </span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-navy-100">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{
                  width: `${Math.round(
                    (answeredTotal / TOTAL_QUESTIONS) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
          <div className="px-4 pb-3">
            <select
              value={currentStep}
              onChange={(e) => goToStep(Number(e.target.value))}
              className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800"
            >
              {DIAGNOSTIC_SECTIONS.map((section, i) => (
                <option key={section.key} value={i}>
                  {i + 1}. {section.title} ({answeredCountForSection(i)}/
                  {section.questionCount})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:py-10">
          {/* Section header card */}
          <div className="mb-8 overflow-hidden rounded-2xl bg-navy-950 p-6 text-white sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-bold tabular-nums">
                    Seção {currentStep + 1} de {totalSteps}
                  </span>
                  {currentSection.bloco === 2 && (
                    <span className="rounded-md bg-accent/20 px-2 py-0.5 text-[11px] font-bold text-accent">
                      Performance
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                  {currentSection.title}
                </h2>
                <p className="mt-1 text-sm text-navy-300">
                  {currentTotal} perguntas nesta seção
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold tabular-nums">
                    {currentAnswered}
                  </span>
                  <span className="text-sm text-navy-400">
                    /{currentTotal}
                  </span>
                </div>
                {sectionComplete && (
                  <div className="mt-1 flex items-center justify-end gap-1 text-emerald-400">
                    <CheckCircle2 size={12} />
                    <span className="text-xs font-medium">Completa</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  sectionComplete
                    ? "bg-emerald-400"
                    : "bg-gradient-to-r from-accent to-amber-400"
                }`}
                style={{
                  width: `${Math.round(
                    (currentAnswered / currentTotal) * 100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Questions */}
          <QuestionGroup
            questions={currentSection.questions}
            answers={answers}
            onAnswer={handleAnswer}
          />

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between pb-10">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-5 py-3 text-sm font-medium text-navy-700 shadow-sm transition-all hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-navy-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-navy-950/20 transition-all hover:bg-navy-800"
              >
                <span className="hidden sm:inline">Próxima Seção</span>
                <span className="sm:hidden">Próxima</span>
                <ChevronRight size={16} />
              </button>
            ) : allComplete ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-amber-500 px-8 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-accent/30 transition-all hover:shadow-xl hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Ver Meu Resultado
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-3 text-sm text-navy-400">
                <AlertCircle size={14} />
                Faltam {unansweredCount} perguntas
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
