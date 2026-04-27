export type QuestionPolarity = "positive" | "negative";
export type Classification = "critico" | "atencao" | "controlado";
export type SessionStatus = "in_progress" | "completed" | "abandoned";

export interface DiagnosticQuestion {
  id: string;
  text: string;
  section: string;
  subsection?: string;
  solution: string;
  bloco: 1 | 2;
  polarity: QuestionPolarity;
  order: number;
}

export interface DiagnosticSection {
  key: string;
  title: string;
  solution: string;
  bloco: 1 | 2;
  subsections?: string[];
  questionCount: number;
}

export interface DiagnosticAnswer {
  question_id: string;
  answer: boolean; // true = Sim, false = Não
}

export interface DiagnosticSessionData {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  phone_number: string;
  business_name: string;
  revenue_range: string;
  main_challenge?: string;
  status: SessionStatus;
  started_at: string;
  completed_at?: string;
}

export interface SectionResult {
  section: string;
  solution: string;
  bloco: 1 | 2;
  total: number;
  negative_count: number;
  negative_pct: number;
  classification: Classification;
}

export interface SolutionResult {
  solution: string;
  label: string;
  sections: SectionResult[];
  total: number;
  negative_count: number;
  negative_pct: number;
  classification: Classification;
}

export interface DiagnosticResults {
  session_id: string;
  solutions: SolutionResult[];
  overall_negative_pct: number;
  overall_classification: Classification;
  completed_at: string;
}

export interface LocalProgress {
  session_id: string;
  answers: Record<string, boolean>;
  current_step: number;
  last_saved: string;
}
