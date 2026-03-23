export const SITE_URL = "https://www.ijaconsultoria.com.br";
export const SITE_NAME = "Instituto João Alves";
export const SITE_DESCRIPTION =
  "Consultoria especializada em estruturar restaurantes para expansão. Método Tripé da Expansão com 14 anos de experiência, +120 negócios transformados e +R$ 40 milhões em lucratividade gerada.";
export const SITE_TAGLINE = "Estruturamos seu restaurante para expansão.";

export const WHATSAPP_NUMBER = "5522999746006";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de saber mais sobre a consultoria do Instituto João Alves.`;
export const EMAIL = "consultorjoao.alves@gmail.com";
export const PHONE = "(22) 99974-6006";
export const LOCATION = "Cabo Frio, RJ";
export const STATES = "RJ, SP, ES e RS";

export const SOCIAL = {
  instagram: "https://instagram.com/institutojoaoalves",
  youtube: "https://youtube.com/@institutojoaoalves",
  linkedin: "https://linkedin.com/in/joaopedroalves",
};

export const NUMBERS = {
  businesses: "120+",
  revenue: "R$ 40M+",
  leaders: "700+",
  years: "14",
  employees: "5.000+",
  states: "4",
};

export const NAV_LINKS = [
  { label: "Sobre", href: "/sobre" },
  { label: "Método", href: "/metodo" },
  {
    label: "Segmentos",
    href: "/segmentos",
    children: [
      { label: "Restaurantes", href: "/segmentos/restaurantes" },
      { label: "Hamburguerias", href: "/segmentos/hamburguerias" },
      { label: "Pizzarias", href: "/segmentos/pizzarias" },
      { label: "Bares", href: "/segmentos/bares" },
      { label: "Cafeterias", href: "/segmentos/cafeterias" },
      { label: "Food Service", href: "/segmentos/food-service" },
      { label: "Varejo", href: "/segmentos/varejo" },
      { label: "Turismo", href: "/segmentos/turismo" },
    ],
  },
  { label: "Soluções", href: "/solucoes" },
  { label: "Cases", href: "/cases" },
  {
    label: "Eventos",
    href: "/eventos",
    children: [
      { label: "Restaurantes", href: "/eventos/restaurantes" },
      { label: "Hamburguerias", href: "/eventos/hamburguerias" },
      { label: "Pizzarias", href: "/eventos/pizzarias" },
      { label: "Bares", href: "/eventos/bares" },
      { label: "Cafeterias", href: "/eventos/cafeterias" },
      { label: "Food Service", href: "/eventos/food-service" },
      { label: "Varejo", href: "/eventos/varejo" },
      { label: "Turismo", href: "/eventos/turismo" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export const SEGMENTS = [
  {
    slug: "restaurantes",
    name: "Restaurantes",
    emoji: "🍽️",
    description: "Restaurantes de todos os portes e especialidades",
  },
  {
    slug: "hamburguerias",
    name: "Hamburguerias",
    emoji: "🍔",
    description: "Hamburguerias artesanais e redes de burgers",
  },
  {
    slug: "pizzarias",
    name: "Pizzarias",
    emoji: "🍕",
    description: "Pizzarias delivery, rodízio e à la carte",
  },
  {
    slug: "bares",
    name: "Bares",
    emoji: "🍺",
    description: "Bares, pubs, lounges e casas noturnas",
  },
  {
    slug: "cafeterias",
    name: "Cafeterias",
    emoji: "☕",
    description: "Cafeterias, confeitarias e padarias gourmet",
  },
  {
    slug: "food-service",
    name: "Food Service",
    emoji: "🏪",
    description: "Food trucks, dark kitchens, catering e delivery",
  },
  {
    slug: "varejo",
    name: "Varejo",
    emoji: "🛍️",
    description: "Lojas, franquias e redes de varejo",
  },
  {
    slug: "turismo",
    name: "Turismo",
    emoji: "🏖️",
    description: "Hotéis, pousadas, agências e negócios turísticos",
  },
];

export const SOLUTIONS = [
  {
    slug: "gestao-financeira",
    title: "Gestão Financeira Afiada",
    shortTitle: "Gestão Financeira",
    icon: "DollarSign",
    description:
      "Tenha visibilidade total sobre suas finanças. Saiba seu lucro real, controle seu fluxo de caixa e defina preços com base em dados.",
    pains: [
      "Não sabe exatamente qual é o lucro mensal",
      "Dificuldade em definir preços de forma lucrativa",
      "Desperdício de matéria-prima sem controle",
      "Fluxo de caixa desorganizado",
      "Não consegue fazer previsões financeiras",
      "Sem comparação entre períodos",
    ],
    deliverables: [
      "Diagnóstico financeiro completo",
      "Estruturação de fluxo de caixa",
      "Cálculo preciso do CMV",
      "Tabela de preços racional",
      "Análise de margem bruta e líquida",
      "Separação de custos fixos e variáveis",
      "Dashboard financeiro",
      "Treinamento da equipe",
    ],
    results: [
      "Visibilidade clara sobre lucro em tempo real",
      "Preços definidos com base em custos reais",
      "Redução de desperdícios",
      "Previsões financeiras acuradas",
      "Maior confiança nas decisões de negócio",
    ],
  },
  {
    slug: "planejamento-estrategico",
    title: "Planejamento Estratégico",
    shortTitle: "Planejamento",
    icon: "Target",
    description:
      "Defina para onde sua empresa vai, com metas claras, plano de ação e indicadores para acompanhar o progresso.",
    pains: [
      "Sem visão clara para o futuro da empresa",
      "Dificuldade em definir metas realistas",
      "Ausência de plano de ação estruturado",
      "Equipe desalinhada sobre prioridades",
      "Crescimento irregular ou estagnado",
      "Decisões tomadas por intuição",
    ],
    deliverables: [
      "Diagnóstico 360° da empresa",
      "Definição de visão e missão",
      "Análise SWOT completa",
      "Estratégia competitiva",
      "Metas de 3 anos (SMART)",
      "Iniciativas estratégicas",
      "Plano de ação detalhado",
      "Roadmap de 12 meses",
    ],
    results: [
      "Visão clara de futuro (para onde vamos?)",
      "Metas ambiciosas e mensuráveis",
      "Equipe alinhada em torno de objetivos",
      "Decisões rápidas guiadas pela estratégia",
      "Crescimento previsível e direcionado",
    ],
  },
  {
    slug: "lideranca-organizacional",
    title: "Liderança Organizacional",
    shortTitle: "Liderança",
    icon: "Users",
    description:
      "Desenvolva líderes, reduza rotatividade e crie uma equipe autônoma que faz o negócio funcionar sem depender de você.",
    pains: [
      "Rotatividade alta de funcionários",
      "Dificuldade em encontrar bons líderes",
      "Equipe desalinhada e desmotivada",
      "Tudo passa pelo proprietário",
      "Falta de treinamento formal",
      "Clima organizacional ruim",
    ],
    deliverables: [
      "Análise de cultura organizacional",
      "Mapeamento de competências por posição",
      "Processos de recrutamento e seleção",
      "Programas de onboarding",
      "Programa de desenvolvimento de líderes",
      "Sistema de avaliação de desempenho",
      "Planos de carreira",
      "Gestão de conflitos e comunicação interna",
    ],
    results: [
      "Redução de rotatividade",
      "Líderes internos desenvolvidos",
      "Proprietário menos sobrecarregado",
      "Melhor clima organizacional",
      "Empresa escalável sem gargalo de liderança",
    ],
  },
  {
    slug: "gestao-comercial-marketing",
    title: "Gestão Comercial e Marketing",
    shortTitle: "Comercial",
    icon: "TrendingUp",
    description:
      "Pare de depender de indicações. Estruture seu marketing e vendas para gerar demanda consistente e previsível.",
    pains: [
      "Dependência total de indicações",
      "Sem funil de vendas estruturado",
      "Presença digital fraca ou inexistente",
      "Baixo ticket médio",
      "Dificuldade em converter leads em clientes",
      "Falta de pós-venda",
    ],
    deliverables: [
      "Estratégia comercial completa",
      "Estruturação de funil de vendas",
      "Definição de ICP e personas",
      "Landing pages e materiais de venda",
      "Implementação de CRM",
      "Treinamento de vendedores",
      "Marketing digital (blog, SEO, ads)",
      "Pós-venda estruturado",
    ],
    results: [
      "Geração consistente de leads qualificados",
      "Processo de vendas que aumenta conversão",
      "Aumento do ticket médio",
      "Presença digital que atrai e converte",
      "Crescimento previsível e sistemático",
    ],
  },
];

export const BLOG_CATEGORIES = [
  { slug: "financeiro", name: "Gestão Financeira" },
  { slug: "lideranca", name: "Liderança e Equipe" },
  { slug: "processos", name: "Processos e Operação" },
  { slug: "expansao", name: "Expansão e Franquias" },
  { slug: "marketing", name: "Marketing para Restaurantes" },
  { slug: "estrategia", name: "Planejamento Estratégico" },
];

export const EVENTS = [
  {
    slug: "lucro-real-30-minutos",
    title: "Como Descobrir seu Lucro Real em 30 Minutos",
    description:
      "Live prática onde João Pedro Alves mostra como calcular o lucro real do seu negócio usando ferramentas simples. Você vai sair sabendo exatamente quanto sobra no final do mês.",
    longDescription:
      "A maioria dos donos de negócio não sabe quanto realmente lucra. Confundem faturamento com lucro, não separam custos fixos de variáveis, e tomam decisões financeiras no escuro. Nesta live 100% prática, João Pedro Alves — com 14 anos de experiência em consultoria para food service — vai mostrar o passo a passo para você descobrir seu lucro real em menos de 30 minutos, usando ferramentas que você já tem.",
    date: "7 de abril",
    dateISO: "2026-04-07",
    time: "19h",
    duration: "60 min",
    type: "Live" as const,
    tags: ["Gestão Financeira", "CMV", "Lucro", "DRE"],
    speaker: "João Pedro Alves",
    speakerRole: "Fundador do IJA — 14 anos em consultoria para food service",
    topics: [
      "Como separar custos fixos e variáveis do seu restaurante",
      "Cálculo do CMV real (não o que o contador diz)",
      "A diferença entre faturamento, lucro bruto e lucro líquido",
      "Planilha prática para acompanhar seu lucro semanalmente",
      "Os 3 erros financeiros mais comuns em restaurantes",
      "Como usar o DRE simplificado para tomar decisões",
    ],
    forWho: [
      "Donos de restaurante que não sabem o lucro real",
      "Gestores que confundem faturamento com lucro",
      "Empreendedores que querem controlar melhor as finanças",
    ],
    status: "upcoming" as const,
  },
  {
    slug: "3-erros-crescimento",
    title: "Os 3 Erros que Impedem seu Negócio de Crescer",
    description:
      "Webinar com cases reais de negócios que travaram — e como o Tripé da Expansão desbloqueou o crescimento de cada um.",
    longDescription:
      "Por que alguns negócios faturam R$ 500 mil/mês mas não conseguem abrir a segunda unidade? Por que outros crescem rápido mas perdem qualidade? Neste webinar, João Pedro Alves apresenta 3 cases reais de negócios que travaram em pontos diferentes — e mostra como o Método Tripé da Expansão (Padronização + Universidade Corporativa + Controle de Qualidade) desbloqueou o crescimento de cada um.",
    date: "2 de maio",
    dateISO: "2026-05-02",
    time: "19h",
    duration: "75 min",
    type: "Webinar" as const,
    tags: ["Expansão", "Cases", "Método Tripé", "Estratégia"],
    speaker: "João Pedro Alves",
    speakerRole: "Fundador do IJA — 14 anos em consultoria para food service",
    topics: [
      "Erro #1: Crescer sem padronizar (o caso da hamburgueria que abriu 3 e fechou 2)",
      "Erro #2: Depender do dono para tudo funcionar (o restaurante refém)",
      "Erro #3: Expandir sem controle financeiro (faturar mais e lucrar menos)",
      "O Método Tripé da Expansão: como funciona na prática",
      "Case Outros 500: de 2 para 10 unidades em 4 anos",
      "Case Heróis Super Burguer: franqueada em 13 meses",
    ],
    forWho: [
      "Donos que querem expandir mas não sabem como",
      "Restaurantes com faturamento alto mas lucro baixo",
      "Empreendedores presos na operação do dia a dia",
    ],
    status: "upcoming" as const,
  },
  {
    slug: "lideranca-gerentes-donos",
    title: "Liderança na Prática: Como Formar Gerentes que Pensam como Donos",
    description:
      "Workshop sobre desenvolvimento de líderes internos para o seu negócio. Reduza turnover e crie uma equipe autônoma.",
    longDescription:
      "65% dos negócios sofrem com rotatividade alta. O custo de perder um funcionário treinado pode chegar a 3x o salário mensal. Neste workshop prático, João Pedro Alves mostra como criar um programa de desenvolvimento de líderes que transforma funcionários comuns em gerentes que pensam como donos — usando a metodologia da Universidade Corporativa do IJA, testada em mais de 120 negócios.",
    date: "27 de maio",
    dateISO: "2026-05-27",
    time: "19h",
    duration: "90 min",
    type: "Workshop" as const,
    tags: ["Liderança", "RH", "Equipe", "Turnover", "Universidade Corporativa"],
    speaker: "João Pedro Alves",
    speakerRole: "Fundador do IJA — 14 anos em consultoria para food service",
    topics: [
      "Por que bons funcionários pedem demissão (e não é só por dinheiro)",
      "O framework de 4 níveis para desenvolver líderes internos",
      "Como criar uma Universidade Corporativa mesmo com equipe pequena",
      "Plano de carreira para restaurantes: do auxiliar ao gerente",
      "Scripts de feedback e avaliação de desempenho",
      "O erro fatal: promover o melhor técnico para gerente",
    ],
    forWho: [
      "Donos que querem sair da operação do dia a dia",
      "Restaurantes com alta rotatividade de equipe",
      "Gestores que não conseguem delegar",
    ],
    status: "upcoming" as const,
  },
];

export const CASES = [
  {
    slug: "outros-500",
    name: "Outros 500",
    segment: "Hamburgueria / Bar",
    before: {
      units: "2 unidades",
      situation:
        "Operação desorganizada, dono preso no dia a dia, sem processos padronizados, sem controle financeiro claro.",
    },
    after: {
      units: "10 unidades",
      situation:
        "Operação estruturada, processos padronizados, equipe autônoma, expansão acelerada.",
    },
    timeline: "4 anos",
    solutions: [
      "Gestão Financeira",
      "Planejamento Estratégico",
      "Liderança Organizacional",
    ],
    highlight: "De 2 para 10 unidades em 4 anos",
    quote:
      "O IJA nos deu a estrutura para crescer sem perder a qualidade que nos fez famosos.",
  },
  {
    slug: "herois-super-burguer",
    name: "Heróis Super Burguer",
    segment: "Hamburgueria",
    before: {
      units: "1 unidade",
      situation:
        "Negócio local sem estrutura para replicação, processos informais, sem visão de expansão.",
    },
    after: {
      units: "Franqueada",
      situation:
        "Modelo de franquia formatado, processos documentados, universidade corporativa implementada, controle de qualidade em todas as unidades.",
    },
    timeline: "13 meses",
    solutions: [
      "Gestão Financeira",
      "Planejamento Estratégico",
      "Liderança Organizacional",
      "Gestão Comercial",
    ],
    highlight: "Franqueada em apenas 13 meses",
    quote:
      "Em 13 meses, saímos de uma hamburgueria local para uma marca franqueada com o Tripé da Expansão.",
  },
];
