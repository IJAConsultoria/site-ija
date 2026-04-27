import type { DiagnosticQuestion, DiagnosticSection } from "./types";

// ============================================================
// SEÇÕES — metadata para navegação do wizard
// ============================================================

export const DIAGNOSTIC_SECTIONS: DiagnosticSection[] = [
  // Bloco 1 — Estruturação Empresarial
  {
    key: "gestao-financeira",
    title: "Gestão Financeira",
    solution: "gestao-financeira",
    bloco: 1,
    questionCount: 26,
  },
  {
    key: "estoque",
    title: "Estoque",
    solution: "gestao-financeira",
    bloco: 1,
    questionCount: 6,
  },
  {
    key: "planejamento-estrategico",
    title: "Planejamento Estratégico",
    solution: "planejamento-estrategico",
    bloco: 1,
    questionCount: 18,
  },
  {
    key: "lideranca-pessoas-processos",
    title: "Liderança, Pessoas e Processos",
    solution: "lideranca-organizacional",
    bloco: 1,
    questionCount: 53,
  },
  {
    key: "marketing-vendas",
    title: "Marketing e Vendas",
    solution: "gestao-comercial-marketing",
    bloco: 1,
    subsections: [
      "Público-Alvo e Personas",
      "Plano Estratégico de Marketing",
      "Benefícios e Vantagens Comerciais",
      "Metas de Vendas",
      "Plano de Bonificação",
      "Campanhas Promocionais",
      "Funil de Vendas",
      "Canais de Publicidade e Vendas",
      "Neurovendas e Rapport",
      "Sondagem e Satisfação do Cliente",
      "Jornada do Consumidor",
      "Prospecção e Processo Comercial",
      "SAC e Pós-Venda",
      "Indicadores e Gestão Comercial",
    ],
    questionCount: 90,
  },
  // Bloco 2 — Performance e Monitoramento
  {
    key: "monitoramento-kpis",
    title: "Monitoramento de Indicadores",
    solution: "performance-empresarial",
    bloco: 2,
    questionCount: 6,
  },
  {
    key: "analise-decisao",
    title: "Análise e Tomada de Decisão",
    solution: "performance-empresarial",
    bloco: 2,
    questionCount: 5,
  },
  {
    key: "problemas-desvios",
    title: "Identificação de Problemas",
    solution: "performance-empresarial",
    bloco: 2,
    questionCount: 5,
  },
  {
    key: "planos-acao",
    title: "Planos de Ação e Execução",
    solution: "performance-empresarial",
    bloco: 2,
    questionCount: 5,
  },
  {
    key: "acompanhamento-gestao",
    title: "Acompanhamento e Gestão Contínua",
    solution: "performance-empresarial",
    bloco: 2,
    questionCount: 6,
  },
  {
    key: "crescimento-evolucao",
    title: "Crescimento e Evolução",
    solution: "performance-empresarial",
    bloco: 2,
    questionCount: 5,
  },
  {
    key: "controle-gestao-estrategica",
    title: "Controle e Gestão Estratégica",
    solution: "performance-empresarial",
    bloco: 2,
    questionCount: 5,
  },
];

// ============================================================
// PERGUNTAS — banco completo
// ============================================================

const q = (
  id: string,
  text: string,
  section: string,
  solution: string,
  bloco: 1 | 2,
  polarity: "positive" | "negative",
  order: number,
  subsection?: string
): DiagnosticQuestion => ({
  id,
  text,
  section,
  subsection,
  solution,
  bloco,
  polarity,
  order,
});

// ---- SOLUÇÃO 01: GESTÃO FINANCEIRA (26 perguntas) ----

const gestaoFinanceira: DiagnosticQuestion[] = [
  q("fin-01", "Você sabe os custos operacionais do seu negócio em reais e centavos?", "Gestão Financeira", "gestao-financeira", 1, "positive", 1),
  q("fin-02", "Você conhece todos os custos invisíveis do negócio?", "Gestão Financeira", "gestao-financeira", 1, "positive", 2),
  q("fin-03", "Você sabe o seu lucro em reais e centavos?", "Gestão Financeira", "gestao-financeira", 1, "positive", 3),
  q("fin-04", "Você sabe qual é o Ponto de Equilíbrio do seu negócio, ou seja, o faturamento mínimo para não dar prejuízo?", "Gestão Financeira", "gestao-financeira", 1, "positive", 4),
  q("fin-05", "Você sabe o custo unitário real de cada um de todos os seus produtos?", "Gestão Financeira", "gestao-financeira", 1, "positive", 5),
  q("fin-06", "Você sabe o que fazer para aumentar a lucratividade do seu negócio?", "Gestão Financeira", "gestao-financeira", 1, "positive", 6),
  q("fin-07", "Você sabe quais os custos operacionais que mais impactam e os que menos impactam o seu negócio?", "Gestão Financeira", "gestao-financeira", 1, "positive", 7),
  q("fin-08", "Você tem hoje um plano de soluções organizado para reduzir custos sem comprometer o crescimento da empresa?", "Gestão Financeira", "gestao-financeira", 1, "positive", 8),
  q("fin-09", "Você pode afirmar com certeza que o preço de venda dos seus produtos realmente bancam os custos da empresa?", "Gestão Financeira", "gestao-financeira", 1, "positive", 9),
  q("fin-10", "Você sabe a margem ideal a ser aplicada na formação do preço de venda?", "Gestão Financeira", "gestao-financeira", 1, "positive", 10),
  q("fin-11", "Você sabe o real impacto financeiro quando faz campanhas de descontos e promoções?", "Gestão Financeira", "gestao-financeira", 1, "positive", 11),
  q("fin-12", "Você pode afirmar que tem um controle financeiro afiado?", "Gestão Financeira", "gestao-financeira", 1, "positive", 12),
  q("fin-13", "Você mantém um registro de todas as contas a pagar e a receber de pelo menos 12 meses à frente?", "Gestão Financeira", "gestao-financeira", 1, "positive", 13),
  q("fin-14", "Você tem um histórico de registros afiados das contas pagas e recebidas dos últimos 12 meses?", "Gestão Financeira", "gestao-financeira", 1, "positive", 14),
  q("fin-15", "Você analisa relatórios e indicadores financeiros de forma periódica?", "Gestão Financeira", "gestao-financeira", 1, "positive", 15),
  q("fin-16", "Você faz a conciliação bancária de forma periódica?", "Gestão Financeira", "gestao-financeira", 1, "positive", 16),
  q("fin-17", "Fazer controle financeiro é complexo para você?", "Gestão Financeira", "gestao-financeira", 1, "negative", 17),
  q("fin-18", "Você tem muitas planilhas e livros caixas que não sabe a funcionalidade de fato?", "Gestão Financeira", "gestao-financeira", 1, "negative", 18),
  q("fin-19", "Você acha que está perdendo muito tempo e esforço com controles sem finalidade?", "Gestão Financeira", "gestao-financeira", 1, "negative", 19),
  q("fin-20", "Você sabe a sua real necessidade de capital de giro em reais e centavos?", "Gestão Financeira", "gestao-financeira", 1, "positive", 20),
  q("fin-21", "Você tem capital de giro?", "Gestão Financeira", "gestao-financeira", 1, "positive", 21),
  q("fin-22", "Você costuma pagar as contas até o dia do vencimento?", "Gestão Financeira", "gestao-financeira", 1, "positive", 22),
  q("fin-23", "Você tem utilizado frequentemente o cheque especial?", "Gestão Financeira", "gestao-financeira", 1, "negative", 23),
  q("fin-24", "Você costuma pagar juros por atraso nos pagamentos?", "Gestão Financeira", "gestao-financeira", 1, "negative", 24),
  q("fin-25", "Você tem um plano de soluções organizado para otimizar o capital de giro?", "Gestão Financeira", "gestao-financeira", 1, "positive", 25),
  q("fin-26", "Você sabe fazer e analisar o balanço patrimonial?", "Gestão Financeira", "gestao-financeira", 1, "positive", 26),
];

// ---- SOLUÇÃO 01: ESTOQUE (6 perguntas) ----

const estoque: DiagnosticQuestion[] = [
  q("est-01", "Você tem controle de estoque afiado?", "Estoque", "gestao-financeira", 1, "positive", 27),
  q("est-02", "Você sabe o estoque atual em quantidade e valor?", "Estoque", "gestao-financeira", 1, "positive", 28),
  q("est-03", "Você faz inventários periódicos?", "Estoque", "gestao-financeira", 1, "positive", 29),
  q("est-04", "Você sente que tem estoque em excesso ou falta?", "Estoque", "gestao-financeira", 1, "negative", 30),
  q("est-05", "Você tem perdas altas de estoque?", "Estoque", "gestao-financeira", 1, "negative", 31),
  q("est-06", "Você se sente inseguro na gestão de estoque?", "Estoque", "gestao-financeira", 1, "negative", 32),
];

// ---- SOLUÇÃO 02: PLANEJAMENTO ESTRATÉGICO (18 perguntas) ----

const planejamentoEstrategico: DiagnosticQuestion[] = [
  q("plan-01", "Você pode afirmar que a Missão, Visão e Valores da sua empresa está bem disseminada entre todos os envolvidos do negócio?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 33),
  q("plan-02", "Sua equipe é alinhada com os objetivos da empresa?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 34),
  q("plan-03", "Sua equipe sabe claramente aonde a empresa quer chegar?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 35),
  q("plan-04", "Você sabe fazer um diagnóstico de cada setor da sua empresa?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 36),
  q("plan-05", "Você pode afirmar que sabe quais os pontos fortes e fracos do seu negócio?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 37),
  q("plan-06", "Você sabe identificar oportunidades de crescimento?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 38),
  q("plan-07", "Você sabe identificar as ameaças ao crescimento do seu negócio?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 39),
  q("plan-08", "Você sabe avaliar cenários futuros do seu negócio?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 40),
  q("plan-09", "Você sabe o que fazer para corrigir os pontos fracos do seu negócio?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 41),
  q("plan-10", "Você sabe como tirar bom proveito dos pontos fortes do seu negócio?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 42),
  q("plan-11", "Você sabe como aproveitar as oportunidades?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 43),
  q("plan-12", "Você sabe como neutralizar ou se adequar às possíveis ameaças?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 44),
  q("plan-13", "Você sabe como se preparar para os possíveis cenários futuros?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 45),
  q("plan-14", "Você tem metas estratégicas com prazos definidos para os próximos 10 anos?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 46),
  q("plan-15", "Você tem dificuldade de pensar em longo prazo?", "Planejamento Estratégico", "planejamento-estrategico", 1, "negative", 47),
  q("plan-16", "Você acha que perdeu muito espaço para o concorrente?", "Planejamento Estratégico", "planejamento-estrategico", 1, "negative", 48),
  q("plan-17", "A sua equipe sabe o que precisa fazer para alcançar os objetivos do negócio mês a mês?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 49),
  q("plan-18", "Você sabe delegar as responsabilidades das etapas para o alcance dos objetivos estratégicos?", "Planejamento Estratégico", "planejamento-estrategico", 1, "positive", 50),
];

// ---- SOLUÇÃO 03: LIDERANÇA, PESSOAS E PROCESSOS (53 perguntas) ----

const liderancaPessoasProcessos: DiagnosticQuestion[] = [
  q("lid-01", "Você está plenamente satisfeito com sua equipe?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 51),
  q("lid-02", "Você tem a representação gráfica da hierarquia da empresa de forma clara para todos os envolvidos?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 52),
  q("lid-03", "Todos na sua equipe sabem \"quem é quem\" e \"quem faz o que\" na organização?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 53),
  q("lid-04", "Os níveis hierárquicos da sua empresa estão bem organizados?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 54),
  q("lid-05", "Você pode afirmar que seus colaboradores sabem claramente o que você espera de cada um deles?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 55),
  q("lid-06", "O seu colaborador sabe quais os conhecimentos, habilidades e atitudes são necessárias para desenvolver bem suas atribuições?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 56),
  q("lid-07", "Você possui protocolos e políticas devidamente documentados?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 57),
  q("lid-08", "Você faz reuniões semanais de alinhamento com a equipe?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 58),
  q("lid-09", "Existe um canal digital fácil e ágil para a equipe acessar informações importantes?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 59),
  q("lid-10", "As rotinas da equipe estão devidamente documentadas?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 60),
  q("lid-11", "Costuma haver muito retrabalho nas atividades do dia a dia?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 61),
  q("lid-12", "As atividades da sua equipe são padronizadas?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 62),
  q("lid-13", "Os colaboradores costumam sempre fazer as coisas do jeito deles?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 63),
  q("lid-14", "Você tem um regulamento interno de conduta documentado?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 64),
  q("lid-15", "Existe uma Política de Medidas Disciplinares documentada para seus colaboradores?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 65),
  q("lid-16", "Os seus colaboradores costumam fazer coisas erradas e não serem punidos por tal ato?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 66),
  q("lid-17", "Você acredita que possa existir uma falta de profissionalismo dentre seus colaboradores?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 67),
  q("lid-18", "Você tem um Plano de Remuneração Estratégica estruturado?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 68),
  q("lid-19", "Você pode afirmar que seus colaboradores se sentem bem reconhecidos e valorizados?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 69),
  q("lid-20", "Você acredita que sua equipe está satisfeita com a remuneração?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 70),
  q("lid-21", "Você costuma ter uma rotatividade alta de funcionários?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 71),
  q("lid-22", "Você acha que seus funcionários são desmotivados?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 72),
  q("lid-23", "Você considera difícil achar bons profissionais no mercado hoje?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 73),
  q("lid-24", "A sua empresa funciona bem sem você estar presente o tempo todo?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 74),
  q("lid-25", "Seus colaboradores foram recrutados através de um processo seletivo bem estruturado?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 75),
  q("lid-26", "Você faz avaliação de perfil e habilidades de cada colaborador?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 76),
  q("lid-27", "Você tem problemas com deficiência de mão de obra?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 77),
  q("lid-28", "Você tem um canal estruturado para cadastro de currículos?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 78),
  q("lid-29", "Você possui uma lista das melhores fontes de recrutamento de pessoal?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 79),
  q("lid-30", "Você possui um processo estruturado de integração de novos colaboradores?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 80),
  q("lid-31", "Logo que chegam, seus colaboradores são apresentados à história, o negócio, os objetivos da empresa e as suas atribuições?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 81),
  q("lid-32", "Você costuma fazer pesquisa de clima organizacional com seus colaboradores periodicamente?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 82),
  q("lid-33", "Seus colaboradores se sentem à vontade para conversar com seus gerentes sobre questões pessoais?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 83),
  q("lid-34", "Você faz confraternizações periodicamente?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 84),
  q("lid-35", "Você reconhece os bons resultados da equipe?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 85),
  q("lid-36", "Você sabe como implementar estratégias e treinamentos para otimizar o engajamento da equipe?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 86),
  q("lid-37", "Você pode afirmar que seus colaboradores são comprometidos com a empresa?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 87),
  q("lid-38", "Os processos da empresa estão devidamente padronizados e documentados?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 88),
  q("lid-39", "Você acredita que tem perdido tempo e esforço por falta de padronização nos processos?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 89),
  q("lid-40", "Sua equipe tem um manual geral de procedimentos para se guiar?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 90),
  q("lid-41", "Há necessidade o tempo todo de proximidade dos gestores para que o trabalho seja realizado direito?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 91),
  q("lid-42", "Você possui um programa de treinamento estruturado para cada cargo da empresa?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 92),
  q("lid-43", "Você costuma desenvolver treinamentos com a equipe de forma periódica?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 93),
  q("lid-44", "Você tem indicadores de desempenho e qualidade pré-estabelecidos?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 94),
  q("lid-45", "Periodicamente você avalia o desempenho do negócio e a qualidade dos serviços e produtos?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 95),
  q("lid-46", "Você sabe como elaborar processos estruturados para avaliação da qualidade?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 96),
  q("lid-47", "Você exige um padrão mínimo nos serviços e produtos?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 97),
  q("lid-48", "Você passa a maior parte do seu dia em atividades operacionais dentro da empresa?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 98),
  q("lid-49", "Você afirma que tem liberdade para ficar um mês fora da empresa e tudo ocorrerá bem?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 99),
  q("lid-50", "Você costuma trabalhar mais tempo do que gostaria?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 100),
  q("lid-51", "Sua família sente que você dedica mais tempo ao trabalho do que a eles?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 101),
  q("lid-52", "Você sente dificuldade de fazer seu negócio crescer?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "negative", 102),
  q("lid-53", "Você pode afirmar que tem gerentes bem qualificados para te dar liberdade para focar em outros projetos?", "Liderança, Pessoas e Processos", "lideranca-organizacional", 1, "positive", 103),
];

// ---- SOLUÇÃO 04: MARKETING E VENDAS (90 perguntas) ----

const marketingVendas: DiagnosticQuestion[] = [
  // 4.1 Público-Alvo e Personas (7)
  q("mkt-01-01", "Todos da sua equipe sabem exatamente quem é e quais as preferências do público-alvo do seu negócio?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 104, "Público-Alvo e Personas"),
  q("mkt-01-02", "Você faz ações de marketing de forma contínua?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 105, "Público-Alvo e Personas"),
  q("mkt-01-03", "Quando você faz ações de marketing elas são realmente planejadas com foco no público-alvo?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 106, "Público-Alvo e Personas"),
  q("mkt-01-04", "As ações de marketing sempre trazem bons resultados?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 107, "Público-Alvo e Personas"),
  q("mkt-01-05", "Você costuma montar estratégias que realmente chamam a atenção do seu público?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 108, "Público-Alvo e Personas"),
  q("mkt-01-06", "Você considera que tem poucos clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 109, "Público-Alvo e Personas"),
  q("mkt-01-07", "Você gostaria de ter mais clientes interessados no seu negócio?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 110, "Público-Alvo e Personas"),

  // 4.2 Plano Estratégico de Marketing (9)
  q("mkt-02-01", "Você fez ultimamente algum Planejamento Estratégico de Marketing?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 111, "Plano Estratégico de Marketing"),
  q("mkt-02-02", "Você tem dificuldade de manter seus clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 112, "Plano Estratégico de Marketing"),
  q("mkt-02-03", "Você sabe o que fazer para atrair mais clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 113, "Plano Estratégico de Marketing"),
  q("mkt-02-04", "Você sabe como conquistar novos clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 114, "Plano Estratégico de Marketing"),
  q("mkt-02-05", "Seus clientes são fiéis e leais à sua empresa?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 115, "Plano Estratégico de Marketing"),
  q("mkt-02-06", "Você tem um processo organizado para atrair, conquistar e reter clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 116, "Plano Estratégico de Marketing"),
  q("mkt-02-07", "Você sabe como aumentar o ticket médio dos clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 117, "Plano Estratégico de Marketing"),
  q("mkt-02-08", "Você sabe como aumentar a frequência do cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 118, "Plano Estratégico de Marketing"),
  q("mkt-02-09", "Você sabe como reduzir a recentidade do cliente na empresa?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 119, "Plano Estratégico de Marketing"),

  // 4.3 Benefícios e Vantagens Comerciais (6)
  q("mkt-03-01", "Seus clientes e funcionários conhecem todos os benefícios e vantagens comerciais do seu negócio?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 120, "Benefícios e Vantagens Comerciais"),
  q("mkt-03-02", "Você sabe como agregar benefícios aos seus produtos e serviços?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 121, "Benefícios e Vantagens Comerciais"),
  q("mkt-03-03", "Você sabe as diferenças entre o seu negócio e a concorrência?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 122, "Benefícios e Vantagens Comerciais"),
  q("mkt-03-04", "Você sabe se promover bem no mercado?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 123, "Benefícios e Vantagens Comerciais"),
  q("mkt-03-05", "Você sabe como se destacar no mercado?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 124, "Benefícios e Vantagens Comerciais"),
  q("mkt-03-06", "Seus clientes sabem quais as vantagens de comprar na sua empresa ao invés de outra?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 125, "Benefícios e Vantagens Comerciais"),

  // 4.4 Metas de Vendas (8)
  q("mkt-04-01", "Você costuma elaborar metas para sua equipe comercial?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 126, "Metas de Vendas"),
  q("mkt-04-02", "Suas vendas estão baixas nos últimos meses?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 127, "Metas de Vendas"),
  q("mkt-04-03", "Você sente que sua equipe de vendas não está focada em aumentar as vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 128, "Metas de Vendas"),
  q("mkt-04-04", "Você está plenamente satisfeito com o desempenho da sua equipe de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 129, "Metas de Vendas"),
  q("mkt-04-05", "Você sente que já perdeu muito esforço, tempo e dinheiro com ações que não levaram aos resultados desejados?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 130, "Metas de Vendas"),
  q("mkt-04-06", "Você sente que seu estoque de insumos e produtos demora muito para vender?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 131, "Metas de Vendas"),
  q("mkt-04-07", "Você sente que sua equipe está bem engajada com os alvos do seu negócio?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 132, "Metas de Vendas"),
  q("mkt-04-08", "Você pode afirmar que sua equipe está satisfeita com o plano de bonificação da sua empresa?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 133, "Metas de Vendas"),

  // 4.5 Plano de Bonificação (5)
  q("mkt-05-01", "Sua empresa tem um Plano de Bonificação Estratégica?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 134, "Plano de Bonificação"),
  q("mkt-05-02", "Sua equipe tem dificuldade de alcançar as metas estipuladas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 135, "Plano de Bonificação"),
  q("mkt-05-03", "Você está satisfeito com o número de vendas do último semestre?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 136, "Plano de Bonificação"),
  q("mkt-05-04", "Sua equipe comercial está insatisfeita com as bonificações dos últimos meses?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 137, "Plano de Bonificação"),
  q("mkt-05-05", "Sua equipe consegue entender com clareza as metas e os planos de bonificação?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 138, "Plano de Bonificação"),

  // 4.6 Campanhas Promocionais (5)
  q("mkt-06-01", "Você costuma fazer campanhas promocionais?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 139, "Campanhas Promocionais"),
  q("mkt-06-02", "Você sente que perde várias oportunidades de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 140, "Campanhas Promocionais"),
  q("mkt-06-03", "Você percebe que suas vendas aumentaram bem em relação ao último ano?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 141, "Campanhas Promocionais"),
  q("mkt-06-04", "Todas as semanas, você percebe muitos clientes novos interessados em seus produtos e serviços?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 142, "Campanhas Promocionais"),
  q("mkt-06-05", "Você sabe como investir em marketing de forma estratégica?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 143, "Campanhas Promocionais"),

  // 4.7 Funil de Vendas (7)
  q("mkt-07-01", "Sua equipe tem clareza do funil de vendas do seu negócio?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 144, "Funil de Vendas"),
  q("mkt-07-02", "Há um roteiro padronizado do processo de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 145, "Funil de Vendas"),
  q("mkt-07-03", "Sua equipe comercial faz prospecção ativa de clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 146, "Funil de Vendas"),
  q("mkt-07-04", "Você e sua equipe comercial sabem a taxa de conversão das vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 147, "Funil de Vendas"),
  q("mkt-07-05", "Sua equipe tem metas de prospecção de clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 148, "Funil de Vendas"),
  q("mkt-07-06", "Sua equipe tem metas de fechamento de clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 149, "Funil de Vendas"),
  q("mkt-07-07", "Sua equipe perde muitos clientes no meio da negociação de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 150, "Funil de Vendas"),

  // 4.8 Canais de Publicidade e Vendas (3)
  q("mkt-08-01", "Você sente que está perdendo tempo, esforço e dinheiro com publicidade que não dá resultado?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 151, "Canais de Publicidade e Vendas"),
  q("mkt-08-02", "Você sente que sua equipe tem dificuldade em captar novos clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 152, "Canais de Publicidade e Vendas"),
  q("mkt-08-03", "Você sabe quais são os canais de venda que te trazem maiores resultados?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 153, "Canais de Publicidade e Vendas"),

  // 4.9 Neurovendas e Rapport (9)
  q("mkt-09-01", "Você percebe que sua equipe sabe tratar bem o cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 154, "Neurovendas e Rapport"),
  q("mkt-09-02", "Você percebe de forma habitual que sua equipe sabe se colocar no lugar do cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 155, "Neurovendas e Rapport"),
  q("mkt-09-03", "Você percebe que sua equipe e marca geram conexão com seus clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 156, "Neurovendas e Rapport"),
  q("mkt-09-04", "Seus clientes se sentem valorizados pela empresa e pela equipe?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 157, "Neurovendas e Rapport"),
  q("mkt-09-05", "Você sente que sua equipe aproveita bem cada cliente para fazer o máximo de negócios?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 158, "Neurovendas e Rapport"),
  q("mkt-09-06", "Você sente que sua equipe não sabe como otimizar as vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 159, "Neurovendas e Rapport"),
  q("mkt-09-07", "Você costuma fazer treinamentos de vendas para sua equipe?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 160, "Neurovendas e Rapport"),
  q("mkt-09-08", "Você pode afirmar que sua equipe comercial está qualificada para fazer vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 161, "Neurovendas e Rapport"),
  q("mkt-09-09", "A sua equipe costuma usar práticas da neurociência para otimizar negócios e vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 162, "Neurovendas e Rapport"),

  // 4.10 Sondagem e Satisfação do Cliente (5)
  q("mkt-10-01", "Você percebe que sua equipe de vendas sabe identificar as expectativas do cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 163, "Sondagem e Satisfação do Cliente"),
  q("mkt-10-02", "Você percebe que sua equipe de vendas sabe e tem o hábito de superar as expectativas do cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 164, "Sondagem e Satisfação do Cliente"),
  q("mkt-10-03", "Muitos clientes costumam achar o preço dos seus produtos e serviços caro, ou seja, injusto em relação a custo x benefício?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 165, "Sondagem e Satisfação do Cliente"),
  q("mkt-10-04", "Sua equipe tem o hábito de encantar o cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 166, "Sondagem e Satisfação do Cliente"),
  q("mkt-10-05", "Você sabe criar estratégias para garantir a satisfação do cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 167, "Sondagem e Satisfação do Cliente"),

  // 4.11 Jornada do Consumidor (4)
  q("mkt-11-01", "Você e sua equipe conhecem as dores do seu cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 168, "Jornada do Consumidor"),
  q("mkt-11-02", "Você e sua equipe sabem identificar em que fase de dor o cliente está?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 169, "Jornada do Consumidor"),
  q("mkt-11-03", "Você e sua equipe sabem identificar as necessidades do cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 170, "Jornada do Consumidor"),
  q("mkt-11-04", "Você e sua equipe têm dificuldades no alcance de novos clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 171, "Jornada do Consumidor"),

  // 4.12 Prospecção e Processo Comercial (6)
  q("mkt-12-01", "Você tem roteiro mínimo padrão do processo de prospecção de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 172, "Prospecção e Processo Comercial"),
  q("mkt-12-02", "Você e sua equipe têm dificuldade em agir para atrair novos clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 173, "Prospecção e Processo Comercial"),
  q("mkt-12-03", "Você e sua equipe de vendas têm dificuldade em saber como se comunicar persuasivamente com o cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 174, "Prospecção e Processo Comercial"),
  q("mkt-12-04", "Sua equipe tem dificuldade de saber por onde começar nas negociações de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 175, "Prospecção e Processo Comercial"),
  q("mkt-12-05", "Você percebe que sua equipe tem dificuldade de saber como se relacionar com o cliente?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 176, "Prospecção e Processo Comercial"),
  q("mkt-12-06", "Você e sua equipe têm dificuldades de conectar as necessidades dos clientes com as soluções que oferecem?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 177, "Prospecção e Processo Comercial"),

  // 4.13 SAC e Pós-Venda (6)
  q("mkt-13-01", "De forma geral, você está satisfeito com o atendimento do seu negócio?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 178, "SAC e Pós-Venda"),
  q("mkt-13-02", "A sua empresa costuma ter problemas com insatisfações de clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 179, "SAC e Pós-Venda"),
  q("mkt-13-03", "Sua equipe sabe tratar com o cliente após uma insatisfação?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 180, "SAC e Pós-Venda"),
  q("mkt-13-04", "Sua equipe sabe agir de forma estratégica para superar insatisfações dos clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 181, "SAC e Pós-Venda"),
  q("mkt-13-05", "Você sente que sua empresa está preparada para resolver problemas com clientes?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 182, "SAC e Pós-Venda"),
  q("mkt-13-06", "Você pode afirmar que sua empresa tem um serviço pós-venda eficaz?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 183, "SAC e Pós-Venda"),

  // 4.14 Indicadores e Gestão Comercial (10)
  q("mkt-14-01", "Você sabe quais são os principais indicadores de desempenho de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 184, "Indicadores e Gestão Comercial"),
  q("mkt-14-02", "Você acompanha os relatórios de vendas de forma periódica?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 185, "Indicadores e Gestão Comercial"),
  q("mkt-14-03", "Você e sua equipe sabem gerar relatórios analíticos de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 186, "Indicadores e Gestão Comercial"),
  q("mkt-14-04", "Você gera relatórios analíticos de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 187, "Indicadores e Gestão Comercial"),
  q("mkt-14-05", "Sua equipe sabe quais são os indicadores de bons resultados de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 188, "Indicadores e Gestão Comercial"),
  q("mkt-14-06", "Você, o seu gerente e a sua equipe acompanham os indicadores de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 189, "Indicadores e Gestão Comercial"),
  q("mkt-14-07", "Você sabe como analisar os indicadores de vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 190, "Indicadores e Gestão Comercial"),
  q("mkt-14-08", "Você e sua equipe sabem criar estratégias para mudar a direção da empresa para gerar mais vendas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 191, "Indicadores e Gestão Comercial"),
  q("mkt-14-09", "Você sente que ultimamente as vendas estão muito lentas?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "negative", 192, "Indicadores e Gestão Comercial"),
  q("mkt-14-10", "Você sente que tem um gerente comercial qualificado para otimizar vendas do seu negócio?", "Marketing e Vendas", "gestao-comercial-marketing", 1, "positive", 193, "Indicadores e Gestão Comercial"),
];

// ---- BLOCO 2: PERFORMANCE E MONITORAMENTO (37 perguntas) ----

// Seção 6: Monitoramento de Indicadores (6)
const monitoramentoKpis: DiagnosticQuestion[] = [
  q("perf-01", "Você acompanha indicadores de desempenho do seu negócio de forma periódica?", "Monitoramento de Indicadores", "performance-empresarial", 2, "positive", 194),
  q("perf-02", "Você pode afirmar que tem clareza dos principais indicadores que determinam o sucesso da sua empresa?", "Monitoramento de Indicadores", "performance-empresarial", 2, "positive", 195),
  q("perf-03", "Você analisa os números da empresa antes de tomar decisões importantes?", "Monitoramento de Indicadores", "performance-empresarial", 2, "positive", 196),
  q("perf-04", "Você consegue identificar rapidamente quando um indicador está fora do esperado?", "Monitoramento de Indicadores", "performance-empresarial", 2, "positive", 197),
  q("perf-05", "Você tem dificuldade de entender os números do seu negócio?", "Monitoramento de Indicadores", "performance-empresarial", 2, "negative", 198),
  q("perf-06", "Você sente que tem dados, mas não consegue transformar em decisões práticas?", "Monitoramento de Indicadores", "performance-empresarial", 2, "negative", 199),
];

// Seção 7: Análise e Tomada de Decisão (5)
const analiseDecisao: DiagnosticQuestion[] = [
  q("perf-07", "Você toma decisões baseadas em dados ou mais pela intuição?", "Análise e Tomada de Decisão", "performance-empresarial", 2, "negative", 200),
  q("perf-08", "Você sente insegurança ao tomar decisões importantes no negócio?", "Análise e Tomada de Decisão", "performance-empresarial", 2, "negative", 201),
  q("perf-09", "Você costuma demorar para agir quando percebe um problema?", "Análise e Tomada de Decisão", "performance-empresarial", 2, "negative", 202),
  q("perf-10", "Você sente que poderia tomar decisões melhores se tivesse mais clareza dos números?", "Análise e Tomada de Decisão", "performance-empresarial", 2, "negative", 203),
  q("perf-11", "Você consegue identificar com facilidade o que precisa ser feito para melhorar os resultados?", "Análise e Tomada de Decisão", "performance-empresarial", 2, "positive", 204),
];

// Seção 8: Identificação de Problemas e Desvios (5)
const problemasDesvios: DiagnosticQuestion[] = [
  q("perf-12", "Você percebe rapidamente quando algo começa a dar errado na empresa?", "Identificação de Problemas", "performance-empresarial", 2, "positive", 205),
  q("perf-13", "Você sente que os problemas só são percebidos quando já estão grandes?", "Identificação de Problemas", "performance-empresarial", 2, "negative", 206),
  q("perf-14", "Você consegue identificar com clareza onde estão os gargalos do seu negócio?", "Identificação de Problemas", "performance-empresarial", 2, "positive", 207),
  q("perf-15", "Você sente que existem problemas escondidos que você ainda não conseguiu enxergar?", "Identificação de Problemas", "performance-empresarial", 2, "negative", 208),
  q("perf-16", "Você tem dificuldade de entender o que está impedindo o crescimento da empresa?", "Identificação de Problemas", "performance-empresarial", 2, "negative", 209),
];

// Seção 9: Planos de Ação e Execução (5)
const planosAcao: DiagnosticQuestion[] = [
  q("perf-17", "Quando identifica um problema, você tem um plano de ação claro para resolver?", "Planos de Ação e Execução", "performance-empresarial", 2, "positive", 210),
  q("perf-18", "Você consegue transformar problemas em ações práticas com rapidez?", "Planos de Ação e Execução", "performance-empresarial", 2, "positive", 211),
  q("perf-19", "Você sente dificuldade em sair do diagnóstico e partir para a execução?", "Planos de Ação e Execução", "performance-empresarial", 2, "negative", 212),
  q("perf-20", "Os planos que você cria realmente são executados pela equipe?", "Planos de Ação e Execução", "performance-empresarial", 2, "positive", 213),
  q("perf-21", "Você sente que muitas decisões ficam apenas no papel e não são implementadas?", "Planos de Ação e Execução", "performance-empresarial", 2, "negative", 214),
];

// Seção 10: Acompanhamento e Gestão Contínua (6)
const acompanhamentoGestao: DiagnosticQuestion[] = [
  q("perf-22", "Você realiza reuniões estratégicas periódicas para acompanhar os resultados da empresa?", "Acompanhamento e Gestão Contínua", "performance-empresarial", 2, "positive", 215),
  q("perf-23", "Você sente que falta um acompanhamento mais próximo da evolução do negócio?", "Acompanhamento e Gestão Contínua", "performance-empresarial", 2, "negative", 216),
  q("perf-24", "Você consegue manter consistência na gestão ao longo dos meses?", "Acompanhamento e Gestão Contínua", "performance-empresarial", 2, "positive", 217),
  q("perf-25", "Você sente que perde o controle do negócio em alguns momentos?", "Acompanhamento e Gestão Contínua", "performance-empresarial", 2, "negative", 218),
  q("perf-26", "Você sente que, após organizar algo, com o tempo volta a desorganizar?", "Acompanhamento e Gestão Contínua", "performance-empresarial", 2, "negative", 219),
  q("perf-27", "Você acredita que se você sair do operacional o desempenho da sua empresa cai?", "Acompanhamento e Gestão Contínua", "performance-empresarial", 2, "negative", 220),
];

// Seção 11: Crescimento e Evolução do Negócio (5)
const crescimentoEvolucao: DiagnosticQuestion[] = [
  q("perf-28", "Você sente que sua empresa está evoluindo de forma estruturada?", "Crescimento e Evolução", "performance-empresarial", 2, "positive", 221),
  q("perf-29", "Você sente que o crescimento do seu negócio é previsível?", "Crescimento e Evolução", "performance-empresarial", 2, "positive", 222),
  q("perf-30", "Você tem clareza do que precisa ser feito para crescer de forma consistente?", "Crescimento e Evolução", "performance-empresarial", 2, "positive", 223),
  q("perf-31", "Você sente que está estagnado em algum nível do negócio?", "Crescimento e Evolução", "performance-empresarial", 2, "negative", 224),
  q("perf-32", "Você acredita que poderia crescer mais se tivesse acompanhamento estratégico?", "Crescimento e Evolução", "performance-empresarial", 2, "negative", 225),
];

// Seção 12: Controle, Clareza e Gestão Estratégica (5)
const controleGestaoEstrategica: DiagnosticQuestion[] = [
  q("perf-33", "Você sente que tem total controle da sua empresa hoje?", "Controle e Gestão Estratégica", "performance-empresarial", 2, "positive", 226),
  q("perf-34", "Você sente que tem clareza sobre o que está acontecendo no seu negócio?", "Controle e Gestão Estratégica", "performance-empresarial", 2, "positive", 227),
  q("perf-35", "Você sente que sua empresa depende muito de você para funcionar?", "Controle e Gestão Estratégica", "performance-empresarial", 2, "negative", 228),
  q("perf-36", "Você sente que precisa de apoio para tomar decisões mais assertivas?", "Controle e Gestão Estratégica", "performance-empresarial", 2, "negative", 229),
  q("perf-37", "Você acredita que sua empresa poderia ter mais resultado com uma gestão mais estratégica?", "Controle e Gestão Estratégica", "performance-empresarial", 2, "negative", 230),
];

// ============================================================
// EXPORT — banco completo
// ============================================================

export const ALL_QUESTIONS: DiagnosticQuestion[] = [
  ...gestaoFinanceira,
  ...estoque,
  ...planejamentoEstrategico,
  ...liderancaPessoasProcessos,
  ...marketingVendas,
  ...monitoramentoKpis,
  ...analiseDecisao,
  ...problemasDesvios,
  ...planosAcao,
  ...acompanhamentoGestao,
  ...crescimentoEvolucao,
  ...controleGestaoEstrategica,
];

export const QUESTIONS_BY_SECTION = DIAGNOSTIC_SECTIONS.map((section) => ({
  ...section,
  questions: ALL_QUESTIONS.filter((q) => q.section === section.title),
}));

export const SOLUTION_LABELS: Record<string, string> = {
  "gestao-financeira": "Gestão Financeira",
  "planejamento-estrategico": "Planejamento Estratégico",
  "lideranca-organizacional": "Liderança, Pessoas e Processos",
  "gestao-comercial-marketing": "Marketing e Vendas",
  "performance-empresarial": "Performance e Monitoramento",
};

export const TOTAL_QUESTIONS = ALL_QUESTIONS.length;
