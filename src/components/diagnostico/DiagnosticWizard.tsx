"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Send,
  AlertCircle,
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
  const mainRef = useRef<HTMLDivElement>(null);

  const totalSteps = DIAGNOSTIC_SECTIONS.length;
  const currentSection =
    QUESTIONS_BY_SECTION[currentStep] || QUESTIONS_BY_SECTION[0];

  // Carregar progresso do localStorage
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

  // Auto-save
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (step: number) => {
    if (isSectionComplete(currentStep)) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
    }
    setCurrentStep(step);
    scrollToTop();
  };

  const handleNext = () => {
    if (isSectionComplete(currentStep)) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      scrollToTop();
    }
  };

  const allComplete = DIAGNOSTIC_SECTIONS.every((_, i) =>
    isSectionComplete(i)
  );

  const unansweredCount = TOTAL_QUESTIONS - answeredTotal;

  const handleSubmit = async () => {
    if (!allComplete || submitting) return;
    setSubmitting(true);

    try {
      const sectionResults = calculateSectionResults(ALL_QUESTIONS, answers);

      await Promise.all([
        saveAnswers(sessionId, answers),
        saveResults(sessionId, sectionResults),
        updateSessionStatus(
          sessionId,
          "completed",
          new Date().toISOString()
        ),
      ]);

      clearDiagnosticProgress();
      router.push(`/diagnostico-empresarial/resultado?session=${sessionId}`);
    } catch (err) {
      console.error("Erro ao salvar diagnóstico:", err);
      setSubmitting(false);
    }
  };

  const currentAnswered = answeredCountForSection(currentStep);
  const currentTotal = currentSection.questionCount;
  const currentPct = Math.round((currentAnswered / currentTotal) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Progress global */}
      <div className="mb-6">
        <ProgressBar
          answeredCount={answeredTotal}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-6">
            <SectionNav
              currentStep={currentStep}
              completedSteps={completedSteps}
              answersPerSection={answersPerSection}
              onNavigate={goToStep}
            />
          </div>
        </aside>

        {/* Main */}
        <main ref={mainRef} className="min-w-0 flex-1">
          {/* Mobile nav */}
          <div className="mb-4 lg:hidden">
            <select
              value={currentStep}
              onChange={(e) => goToStep(Number(e.target.value))}
              className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm font-medium text-navy-800"
            >
              {DIAGNOSTIC_SECTIONS.map((section, i) => (
                <option key={section.key} value={i}>
                  {i + 1}. {section.title} ({answeredCountForSection(i)}/
                  {section.questionCount})
                </option>
              ))}
            </select>
          </div>

          {/* Section header */}
          <div className="mb-6 rounded-2xl bg-navy-950 px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-white/10 px-2.5 py-0.5 text-xs font-bold">
                    {currentStep + 1}/{totalSteps}
                  </span>
                  {currentSection.bloco === 2 && (
                    <span className="rounded-lg bg-accent/20 px-2.5 py-0.5 text-xs font-bold text-accent">
                      Bloco 2 — Performance
                    </span>
                  )}
                </div>
                <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                  {currentSection.title}
                </h2>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-2xl font-bold">
                  {currentAnswered}
                  <span className="text-sm font-normal text-navy-300">
                    /{currentTotal}
                  </span>
                </p>
                <p className="text-xs text-navy-300">respondidas</p>
              </div>
            </div>
            {/* Section progress */}
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${currentPct}%` }}
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
          <div className="mt-8 flex items-center justify-between border-t border-navy-100 pt-6 pb-8">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 rounded-xl border border-navy-200 px-5 py-3 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-navy-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-800"
              >
                Próxima Seção
                <ChevronRight size={16} />
              </button>
            ) : allComplete ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Calculando resultado...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Ver Meu Resultado
                  </>
                )}
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm text-navy-400">
                <AlertCircle size={14} />
                Faltam {unansweredCount} perguntas
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
