import { EVENTS, SEGMENTS } from "./constants";

export type SegmentEventContent = {
  headline: string;
  subheadline: string;
  description: string;
  forWho: string[];
  painPoint: string;
};

/**
 * Conteúdo nichado por segmento para cada tema de evento.
 * Mesmo evento, comunicação diferente por ICP.
 */
export const SEGMENT_EVENT_CONTENT: Record<
  string,
  Record<string, SegmentEventContent>
> = {
  // ========== EVENTO 1: 3 ERROS DE CRESCIMENTO ==========
  "3-erros-crescimento": {
    restaurantes: {
      headline:
        "Os 3 Erros que Impedem seu Restaurante de Crescer",
      subheadline:
        "Cases reais de restaurantes que travaram — e como desbloquearam o crescimento.",
      description:
        "Webinar com cases reais de restaurantes que faturavam alto mas não conseguiam expandir. Descubra os 3 erros mais comuns e como o Método Tripé da Expansão resolve cada um.",
      forWho: [
        "Donos de restaurante que querem abrir a segunda unidade",
        "Restaurantes com faturamento alto mas crescimento travado",
        "Empreendedores presos na operação do dia a dia",
      ],
      painPoint: "Quero crescer mas não consigo sair do operacional",
    },
    hamburguerias: {
      headline:
        "Os 3 Erros que Impedem sua Hamburgueria de Crescer",
      subheadline:
        "A hamburgueria que abriu 3 e fechou 2. Aprenda com os erros dos outros.",
      description:
        "Webinar com cases reais de hamburguerias que tentaram expandir e falharam — e como corrigiram o rumo. Inclui o case de uma hamburgueria que se tornou franquia em 13 meses.",
      forWho: [
        "Donos de hamburgueria que sonham com franquia",
        "Hamburguerias com filas na porta mas sem estrutura para replicar",
        "Operações artesanais que querem escalar sem perder identidade",
      ],
      painPoint: "Quero virar franquia mas não sei por onde começar",
    },
    pizzarias: {
      headline:
        "Os 3 Erros que Impedem sua Pizzaria de Crescer",
      subheadline:
        "Delivery, salão ou rodízio — os erros de expansão são os mesmos. Evite-os.",
      description:
        "Webinar com cases reais de pizzarias que travaram na hora de expandir. Descubra como escalar sem perder a qualidade da massa e do atendimento.",
      forWho: [
        "Donos de pizzaria que querem abrir filiais",
        "Pizzarias delivery que querem expandir a área de cobertura",
        "Operações que dependem 100% do pizzaiolo dono",
      ],
      painPoint: "Minha pizzaria depende de mim para tudo funcionar",
    },
    bares: {
      headline: "Os 3 Erros que Impedem seu Bar de Crescer",
      subheadline:
        "Bar lotado não significa bar lucrativo. Descubra o que trava seu crescimento.",
      description:
        "Webinar com cases reais de bares que faturavam alto mas não conseguiam expandir. Aprenda a estruturar sua operação para crescer de forma sustentável.",
      forWho: [
        "Donos de bar que querem abrir novas casas",
        "Bares com marca forte mas operação dependente do dono",
        "Empreendedores do entretenimento que querem profissionalizar",
      ],
      painPoint: "Meu bar faz sucesso mas depende 100% de mim",
    },
    cafeterias: {
      headline:
        "Os 3 Erros que Impedem sua Cafeteria de Crescer",
      subheadline:
        "De uma unidade charmosa para uma rede — o caminho tem armadilhas. Conheça-as.",
      description:
        "Webinar com cases reais de cafeterias e confeitarias que tentaram expandir. Descubra como manter a identidade artesanal enquanto escala a operação.",
      forWho: [
        "Donos de cafeteria que querem abrir segunda unidade",
        "Confeitarias com demanda alta mas produção centralizada no dono",
        "Padarias gourmet que querem virar rede",
      ],
      painPoint: "Demanda existe mas não consigo replicar a qualidade",
    },
    "food-service": {
      headline:
        "Os 3 Erros que Impedem seu Food Service de Crescer",
      subheadline:
        "Dark kitchen, food truck ou catering — escalar sem estrutura é receita para prejuízo.",
      description:
        "Webinar com cases reais de operações de food service que travaram ao tentar escalar. Aprenda como estruturar para crescer com previsibilidade.",
      forWho: [
        "Donos de dark kitchen que querem adicionar marcas virtuais",
        "Food trucks que querem fixar ponto ou expandir",
        "Operações de catering que querem atender mais eventos sem perder qualidade",
      ],
      painPoint: "Quero escalar mas cada expansão vira um caos",
    },
    varejo: {
      headline:
        "Os 3 Erros que Impedem seu Negócio de Varejo de Crescer",
      subheadline:
        "Abrir loja nova é fácil. Fazer dar lucro é outra história.",
      description:
        "Webinar com cases reais de redes de varejo que expandiram rápido e quebraram — e como corrigiram o rumo com método e estrutura.",
      forWho: [
        "Donos de loja que querem virar rede",
        "Franqueados que querem abrir mais unidades",
        "Redes de varejo com unidades que não performam igual",
      ],
      painPoint: "Tenho uma loja boa mas não consigo replicar o sucesso",
    },
    turismo: {
      headline:
        "Os 3 Erros que Impedem seu Negócio Turístico de Crescer",
      subheadline:
        "Sazonalidade não é desculpa. É possível crescer o ano inteiro.",
      description:
        "Webinar com cases reais de negócios turísticos que dependiam da temporada para faturar — e como estruturaram receita recorrente e expansão sustentável.",
      forWho: [
        "Donos de pousada/hotel que querem expandir para novos destinos",
        "Agências de turismo que querem escalar a operação",
        "Negócios turísticos que faturam só na alta temporada",
      ],
      painPoint: "Meu negócio só funciona na temporada",
    },
  },

  // ========== EVENTO 3: LIDERANÇA ==========
  "lideranca-gerentes-donos": {
    restaurantes: {
      headline:
        "Como Formar Gerentes que Pensam como Donos no seu Restaurante",
      subheadline:
        "65% dos restaurantes sofrem com rotatividade alta. A solução não é salário — é liderança.",
      description:
        "Workshop prático sobre desenvolvimento de líderes para restaurantes. Aprenda a criar gerentes autônomos que fazem o restaurante funcionar sem depender de você.",
      forWho: [
        "Donos de restaurante que não conseguem tirar férias",
        "Restaurantes com rotatividade alta de equipe",
        "Gestores que promovem o melhor cozinheiro para gerente (e dá errado)",
      ],
      painPoint: "Se eu não estou no restaurante, nada funciona direito",
    },
    hamburguerias: {
      headline:
        "Como Formar Gerentes que Pensam como Donos na sua Hamburgueria",
      subheadline:
        "Sua hamburgueria depende de você na chapa? É hora de desenvolver líderes internos.",
      description:
        "Workshop prático para donos de hamburgueria que querem sair da operação. Aprenda a criar uma equipe que mantém o padrão — da chapa ao atendimento.",
      forWho: [
        "Donos de hamburgueria presos na chapa ou no caixa",
        "Hamburguerias que perdem funcionários treinados para a concorrência",
        "Operações que param quando o dono não está",
      ],
      painPoint: "Treinei meu funcionário e ele foi para o concorrente",
    },
    pizzarias: {
      headline:
        "Como Formar Gerentes que Pensam como Donos na sua Pizzaria",
      subheadline:
        "O segredo das pizzarias que funcionam sem o dono: liderança e não receita.",
      description:
        "Workshop prático para donos de pizzaria. Descubra como desenvolver líderes que mantêm o padrão da massa, do forno e do delivery sem sua supervisão direta.",
      forWho: [
        "Donos de pizzaria que são o único que sabe fazer a massa",
        "Pizzarias com equipe de entrega desorganizada",
        "Operações que travam quando o pizzaiolo principal falta",
      ],
      painPoint: "Se o pizzaiolo falta, a operação para",
    },
    bares: {
      headline:
        "Como Formar Gerentes que Pensam como Donos no seu Bar",
      subheadline:
        "Bar que funciona só com o dono presente não escala. Forme líderes que cuidam como se fosse deles.",
      description:
        "Workshop prático para donos de bar. Aprenda a desenvolver barmen e gerentes que mantêm o padrão, controlam custos e lideram a equipe na sua ausência.",
      forWho: [
        "Donos de bar que trabalham todas as noites",
        "Bares com alta rotatividade de barmen e garçons",
        "Operações noturnas onde o controle some quando o dono sai",
      ],
      painPoint: "Preciso estar toda noite no bar senão vira bagunça",
    },
    cafeterias: {
      headline:
        "Como Formar Gerentes que Pensam como Donos na sua Cafeteria",
      subheadline:
        "Receitas artesanais na cabeça de uma pessoa? Risco alto. Forme líderes e documente.",
      description:
        "Workshop prático para donos de cafeteria e confeitaria. Aprenda a desenvolver líderes que mantêm a qualidade artesanal e o atendimento diferenciado.",
      forWho: [
        "Donos de cafeteria que fazem tudo sozinhos",
        "Confeitarias onde só o dono sabe as receitas",
        "Padarias gourmet com equipe sem autonomia",
      ],
      painPoint: "Todas as receitas estão na minha cabeça e não consigo delegar",
    },
    "food-service": {
      headline:
        "Como Formar Gerentes que Pensam como Donos no Food Service",
      subheadline:
        "Múltiplas operações, múltiplos problemas. A solução é liderança distribuída.",
      description:
        "Workshop prático para operações de food service. Aprenda a criar líderes para cada frente — dark kitchen, delivery, eventos — sem centralizar tudo em você.",
      forWho: [
        "Donos de dark kitchen gerenciando tudo sozinho",
        "Operações multi-marca sem gerente por operação",
        "Food service com equipe rotativa e sem padrão",
      ],
      painPoint: "Gerencio tudo sozinho e não dou conta de crescer",
    },
    varejo: {
      headline:
        "Como Formar Gerentes que Pensam como Donos no Varejo",
      subheadline:
        "Cada loja precisa de um líder. Sem isso, expansão vira dor de cabeça.",
      description:
        "Workshop prático para donos de lojas e redes de varejo. Aprenda a desenvolver gerentes de loja que pensam como donos — vendendo mais e controlando melhor.",
      forWho: [
        "Donos de loja que querem abrir filiais mas não têm quem colocar",
        "Redes com gerentes que não batem meta",
        "Franqueadores que precisam padronizar a gestão das unidades",
      ],
      painPoint: "Não tenho gente preparada para gerenciar novas lojas",
    },
    turismo: {
      headline:
        "Como Formar Gerentes que Pensam como Donos no Turismo",
      subheadline:
        "Na temporada, você contrata. Na baixa, perde. Forme líderes que ficam.",
      description:
        "Workshop prático para negócios turísticos. Aprenda a desenvolver líderes que mantêm a operação funcionando na alta e na baixa temporada.",
      forWho: [
        "Donos de pousada que trabalham 7 dias por semana na temporada",
        "Hotéis com alta rotatividade de equipe entre temporadas",
        "Agências de turismo onde tudo passa pelo proprietário",
      ],
      painPoint: "Na temporada fico sobrecarregado e na baixa perco a equipe",
    },
  },
};

/**
 * Retorna o conteúdo de um evento para um segmento específico.
 * Se o segmento não tiver conteúdo, retorna o de restaurantes como fallback.
 */
export function getSegmentEventContent(
  eventSlug: string,
  segmentSlug: string
): SegmentEventContent | null {
  const eventContent = SEGMENT_EVENT_CONTENT[eventSlug];
  if (!eventContent) return null;
  return eventContent[segmentSlug] || eventContent["restaurantes"] || null;
}

/**
 * Retorna o evento base a partir do slug.
 */
export function getEventBySlug(slug: string) {
  return EVENTS.find((e) => e.slug === slug) || null;
}

/**
 * Retorna o segmento a partir do slug.
 */
export function getSegmentBySlug(slug: string) {
  return SEGMENTS.find((s) => s.slug === slug) || null;
}

/**
 * Gera todos os pares [evento, segmento] para static params.
 */
export function getAllEventSegmentParams() {
  const params: { slug: string; segmento: string }[] = [];
  for (const event of EVENTS) {
    for (const segment of SEGMENTS) {
      if (SEGMENT_EVENT_CONTENT[event.slug]?.[segment.slug]) {
        params.push({ slug: event.slug, segmento: segment.slug });
      }
    }
  }
  return params;
}
