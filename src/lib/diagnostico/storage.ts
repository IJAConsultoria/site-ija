import type { LocalProgress } from "./types";

const STORAGE_KEY = "ija-diagnostico";

export function saveDiagnosticProgress(
  sessionId: string,
  answers: Record<string, boolean>,
  currentStep: number
): void {
  try {
    const progress: LocalProgress = {
      session_id: sessionId,
      answers,
      current_step: currentStep,
      last_saved: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage indisponível — silencioso
  }
}

export function loadDiagnosticProgress(): LocalProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalProgress;
  } catch {
    return null;
  }
}

export function clearDiagnosticProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silencioso
  }
}
