import type { Classification, SolutionResult } from "./types";

export interface DiagnosticSummary {
  headline: string;
  description: string;
  priorities: {
    solution: string;
    label: string;
    classification: Classification;
    action: string;
  }[];
}

const SOLUTION_ACTIONS: Record<string, Record<string, string>> = {
  "gestao-financeira": {
    critico: "Intervenção financeira urgente — custos, lucro e capital de giro precisam de reorganização completa.",
    atencao: "Ajustes no controle financeiro — precificação e indicadores precisam ser revisados.",
    controlado: "Financeiro bem estruturado — otimizar capital de giro e análise de cenários.",
  },
  "planejamento-estrategico": {
    critico: "Sem planejamento estratégico — empresa opera sem direção clara de médio/longo prazo.",
    atencao: "Planejamento incompleto — metas e análise de cenários precisam de estruturação.",
    controlado: "Boa visão estratégica — refinar metas de longo prazo e delegação.",
  },
  "lideranca-organizacional": {
    critico: "Crise de gestão de pessoas — processos, treinamento e padronização precisam de reestruturação.",
    atencao: "Gaps em liderança — padronização, treinamento e retenção precisam de atenção.",
    controlado: "Equipe bem estruturada — otimizar autonomia e indicadores de desempenho.",
  },
  "gestao-comercial-marketing": {
    critico: "Marketing e vendas desestruturados — funil, metas e processos comerciais precisam ser criados do zero.",
    atencao: "Oportunidades perdidas em vendas — funil, prospecção e indicadores precisam de ajuste.",
    controlado: "Bom desempenho comercial — otimizar conversão e estratégias avançadas.",
  },
  "acompanhamento-gestao": {
    critico: "Sem acompanhamento de gestão — empresa opera sem monitoramento contínuo.",
    atencao: "Gestão inconsistente — falta de acompanhamento periódico dos resultados.",
    controlado: "Gestão acompanhada — manter rotina e refinar indicadores.",
  },
};

export function generateSummary(
  solutions: SolutionResult[]
): DiagnosticSummary {
  const critical = solutions.filter((s) => s.classification === "critico");
  const attention = solutions.filter((s) => s.classification === "atencao");
  const controlled = solutions.filter((s) => s.classification === "controlado");

  let headline: string;
  let description: string;

  if (critical.length >= 3) {
    headline = "Seu negócio precisa de reestruturação urgente";
    description =
      "A maioria das áreas avaliadas apresenta falhas graves. É necessário um plano de intervenção imediato para estabilizar a operação antes de pensar em crescimento.";
  } else if (critical.length >= 1) {
    headline = "Áreas críticas identificadas que exigem atenção imediata";
    description =
      "Existem pontos críticos que estão limitando o potencial do seu negócio. Corrigir essas áreas vai destravar o crescimento sustentável.";
  } else if (attention.length >= 2) {
    headline = "Seu negócio tem potencial, mas precisa de ajustes";
    description =
      "A base está montada, mas existem gaps que, se não corrigidos, podem se tornar problemas maiores. É hora de estruturar.";
  } else {
    headline = "Seu negócio está bem estruturado";
    description =
      "As áreas avaliadas estão em bom nível. O foco agora é otimização e crescimento estratégico — expandir o que já funciona.";
  }

  const priorities = solutions
    .sort((a, b) => b.negative_pct - a.negative_pct)
    .map((s) => ({
      solution: s.solution,
      label: s.label,
      classification: s.classification,
      action:
        SOLUTION_ACTIONS[s.solution]?.[s.classification] ||
        "Avaliação personalizada necessária.",
    }));

  return { headline, description, priorities };
}
