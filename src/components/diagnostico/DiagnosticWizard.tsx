"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2, Send } from "lucide-react";
import { QUESTIONS_BY_SECTION, DIAGNOSTIC_SECTIONS } from "@/lib/diagnostico/questions";
import { calculateSectionResults } from "@/lib/diagnostico/scoring";
import { ALL_QUESTIONS } from "@/lib/diagnostico/questions";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const totalSteps = DIAGNOSTIC_SECTIONS.length;
  const currentSection = QUESTIONS_BY_SECTION[currentStep] || QUESTIONS_BY_SECTION[0];

  // Carregar progresso do localStorage
  useEffect(() => {
    const saved = loadDiagnosticProgress();
    if (saved && saved.session_id === sessionId) {
      setAnswers(saved.answers);
      const step = Math.min(saved.current_step, totalSteps - 1);
      setCurrentStep(step);

      // Recalcular quais seções estão completas
      const completed = new Set<number>();
      QUESTIONS_BY_SECTION.forEach((section, i) => {
        const allAnswered = section.questions.every(
          (q) => saved.answers[q.id] !== undefined
        );
        if (allAnswered) completed.add(i);
      });
      setCompletedSteps(completed);
    }
  }, [sessionId]);

  // Auto-save ao mudar respostas
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (Object.keys(answers).length === 0) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveDiagnosticProgress(sessionId, answers, currentStep);
    }, 500);
    return () => { if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current); };
  }, [answers, currentStep, sessionId]);

  const handleAnswer = useCallback(
    (questionId: string, value: boolean) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const answeredCountForSection = (stepIndex: number) => {
    const section = QUESTIONS_BY_SECTION[stepIndex];
    return section.questions.filter((q) => answers[q.id] !== undefined).length;
  };

  const isSectionComplete = (stepIndex: number) => {
    const section = QUESTIONS_BY_SECTION[stepIndex];
    return section.questions.every((q) => answers[q.id] !== undefined);
  };

  const answeredTotal = Object.keys(answers).length;

  const answersPerSection = DIAGNOSTIC_SECTIONS.map((_, i) =>
    answeredCountForSection(i)
  );

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleNavigate = (step: number) => {
    if (isSectionComplete(currentStep)) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
    }
    setCurrentStep(step);
    scrollToTop();
  };

  const allComplete = DIAGNOSTIC_SECTIONS.every((_, i) =>
    isSectionComplete(i)
  );

  const handleSubmit = async () => {
    if (!allComplete || submitting) return;
    setSubmitting(true);

    try {
      // Calcular resultados
      const sectionResults = calculateSectionResults(ALL_QUESTIONS, answers);

      // Salvar no Supabase
      await Promise.all([
        saveAnswers(sessionId, answers),
        saveResults(sessionId, sectionResults),
        updateSessionStatus(
          sessionId,
          "completed",
          new Date().toISOString()
        ),
      ]);

      // Limpar localStorage
      clearDiagnosticProgress();

      // Redirecionar para resultados
      router.push(`/diagnostico-empresarial/resultado?session=${sessionId}`);
    } catch (err) {
      console.error("Erro ao salvar diagnóstico:", err);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Progress */}
      <div className="mb-8">
        <ProgressBar
          answeredCount={answeredTotal}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24">
            <SectionNav
              currentStep={currentStep}
              completedSteps={completedSteps}
              answersPerSection={answersPerSection}
              onNavigate={handleNavigate}
            />
          </div>
        </aside>

        {/* Main content */}
        <main ref={scrollRef} className="min-w-0 flex-1">
          {/* Mobile section indicator */}
          <div className="mb-4 lg:hidden">
            <select
              value={currentStep}
              onChange={(e) => handleNavigate(Number(e.target.value))}
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
          <div className="mb-6">
            <div className="flex items-center gap-2">
              {currentSection.bloco === 2 && (
                <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  Bloco 2
                </span>
              )}
            </div>
            <h2 className="mt-2 text-2xl font-bold text-navy-950">
              {currentSection.title}
            </h2>
            <p className="mt-1 text-sm text-navy-500">
              Responda todas as {currentSection.questionCount} perguntas desta
              seção para avançar.
            </p>
          </div>

          {/* Questions */}
          <QuestionGroup
            questions={currentSection.questions}
            answers={answers}
            onAnswer={handleAnswer}
          />

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-navy-100 pt-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 rounded-xl border border-navy-200 px-5 py-3 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>

            <div className="text-sm text-navy-500">
              {answeredCountForSection(currentStep)}/
              {currentSection.questionCount} respondidas
            </div>

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isSectionComplete(currentStep)}
                className="flex items-center gap-2 rounded-xl bg-navy-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próxima
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!allComplete || submitting}
                className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-navy-950 transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Ver Resultado
                  </>
                )}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
