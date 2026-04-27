import type {
  Classification,
  DiagnosticAnswer,
  DiagnosticQuestion,
  DiagnosticResults,
  SectionResult,
  SolutionResult,
} from "./types";
import { DIAGNOSTIC_SECTIONS, SOLUTION_LABELS } from "./questions";

/**
 * Classifica o percentual de respostas negativas em um dos 3 níveis.
 */
export function getClassification(negativePct: number): Classification {
  if (negativePct >= 60) return "critico";
  if (negativePct >= 30) return "atencao";
  return "controlado";
}

/**
 * Labels e cores para cada classificação.
 */
export const CLASSIFICATION_CONFIG: Record<
  Classification,
  { label: string; color: string; bg: string; border: string; emoji: string }
> = {
  critico: {
    label: "Crítico",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    emoji: "🔴",
  },
  atencao: {
    label: "Atenção",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    emoji: "🟡",
  },
  controlado: {
    label: "Controlado",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    emoji: "🟢",
  },
};

/**
 * Verifica se uma resposta indica problema (negativa).
 * - Pergunta positiva + resposta "Não" = problema
 * - Pergunta negativa + resposta "Sim" = problema
 */
function isNegativeAnswer(
  question: DiagnosticQuestion,
  answer: boolean
): boolean {
  if (question.polarity === "positive") return !answer;
  return answer; // polarity === "negative"
}

/**
 * Calcula resultado por seção.
 */
export function calculateSectionResults(
  questions: DiagnosticQuestion[],
  answers: Record<string, boolean>
): SectionResult[] {
  return DIAGNOSTIC_SECTIONS.map((section) => {
    const sectionQuestions = questions.filter(
      (q) => q.section === section.title
    );
    const answeredQuestions = sectionQuestions.filter(
      (q) => answers[q.id] !== undefined
    );

    const negativeCount = answeredQuestions.filter((q) =>
      isNegativeAnswer(q, answers[q.id])
    ).length;

    const total = answeredQuestions.length;
    const negativePct = total > 0 ? Math.round((negativeCount / total) * 100) : 0;

    return {
      section: section.title,
      solution: section.solution,
      bloco: section.bloco,
      total,
      negative_count: negativeCount,
      negative_pct: negativePct,
      classification: getClassification(negativePct),
    };
  });
}

/**
 * Agrupa resultados por solução (para o gráfico radar).
 */
export function calculateSolutionResults(
  sectionResults: SectionResult[]
): SolutionResult[] {
  const solutionKeys = [...new Set(sectionResults.map((r) => r.solution))];

  return solutionKeys.map((solutionKey) => {
    const sections = sectionResults.filter((r) => r.solution === solutionKey);
    const total = sections.reduce((sum, s) => sum + s.total, 0);
    const negativeCount = sections.reduce(
      (sum, s) => sum + s.negative_count,
      0
    );
    const negativePct =
      total > 0 ? Math.round((negativeCount / total) * 100) : 0;

    return {
      solution: solutionKey,
      label: SOLUTION_LABELS[solutionKey] || solutionKey,
      sections,
      total,
      negative_count: negativeCount,
      negative_pct: negativePct,
      classification: getClassification(negativePct),
    };
  });
}

/**
 * Calcula resultados completos do diagnóstico.
 */
export function calculateDiagnosticResults(
  questions: DiagnosticQuestion[],
  answers: Record<string, boolean>,
  sessionId: string
): DiagnosticResults {
  const sectionResults = calculateSectionResults(questions, answers);
  const solutions = calculateSolutionResults(sectionResults);

  const totalQuestions = sectionResults.reduce((sum, s) => sum + s.total, 0);
  const totalNegative = sectionResults.reduce(
    (sum, s) => sum + s.negative_count,
    0
  );
  const overallPct =
    totalQuestions > 0
      ? Math.round((totalNegative / totalQuestions) * 100)
      : 0;

  return {
    session_id: sessionId,
    solutions,
    overall_negative_pct: overallPct,
    overall_classification: getClassification(overallPct),
    completed_at: new Date().toISOString(),
  };
}

/**
 * Retorna a "saúde" da área (100 - negativePct), para o radar chart.
 * Quanto maior, melhor.
 */
export function getHealthScore(negativePct: number): number {
  return 100 - negativePct;
}

/**
 * Conta quantas áreas estão em cada classificação.
 */
export function countByClassification(solutions: SolutionResult[]) {
  return {
    critico: solutions.filter((s) => s.classification === "critico").length,
    atencao: solutions.filter((s) => s.classification === "atencao").length,
    controlado: solutions.filter((s) => s.classification === "controlado")
      .length,
  };
}
