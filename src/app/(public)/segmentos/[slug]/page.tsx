import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  Utensils,
  Beef,
  Pizza,
  Wine,
  Coffee,
  Store,
  ShoppingBag,
  TreePalm,
  TrendingUp,
  BarChart3,
  Users,
  AlertTriangle,
  Quote,
  ChevronRight,
  Zap,
  Target,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { SEGMENTS, SOLUTIONS, CASES, NUMBERS, WHATSAPP_URL } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  CountUp,
  ProgressBar,
  LineReveal,
  AnimatedBlob,
  HoverCard,
} from "@/components/animations";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SEGMENTS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const segment = SEGMENTS.find((s) => s.slug === slug);
  if (!segment) return {};
  return generatePageMetadata({
    title: `Consultoria para ${segment.name}`,
    description: `Consultoria especializada em ${segment.name.toLowerCase()}. Estruturamos seu negócio com o Método Tripé da Expansão: padronização, treinamento e controle de qualidade.`,
    path: `/segmentos/${segment.slug}`,
  });
}

const segmentIcons: Record<string, React.ElementType> = {
  restaurantes: Utensils,
  hamburguerias: Beef,
  pizzarias: Pizza,
  bares: Wine,
  cafeterias: Coffee,
  "food-service": Store,
  varejo: ShoppingBag,
  turismo: TreePalm,
};

const solutionIcons: Record<string, React.ElementType> = {
  DollarSign,
  Target,
  Users,
  TrendingUp,
};

const segmentContent: Record<
  string,
  {
    headline: string;
    subheadline: string;
    problems: { text: string; stat?: string }[];
    benefits: string[];
    marketStats: { value: string; label: string; suffix?: string }[];
    painBars: { label: string; value: number }[];
    caseHighlight?: string;
  }
> = {
  restaurantes: {
    headline: "Restaurantes que crescem têm estrutura — não só talento culinário",
    subheadline:
      "90% dos donos de restaurante não sabem seu lucro real. Estruturamos sua gestão para você sair do caos e entrar em modo de expansão.",
    problems: [
      { text: "Dono preso na cozinha ou no caixa 16h por dia", stat: "85%" },
      { text: "Não sabe o custo real de cada prato servido", stat: "90%" },
      { text: "Equipe nova toda semana — turnover altíssimo", stat: "65%" },
      { text: "Quer abrir filial mas não consegue replicar a qualidade" },
      { text: "Cardápio precificado por intuição, não por dados" },
    ],
    benefits: [
      "Lucro claro e visível em tempo real",
      "Processos padronizados que funcionam sem o dono",
      "Equipe treinada e autônoma com plano de carreira",
      "Modelo replicável — pronto para segunda unidade ou franquia",
      "Precificação racional baseada em CMV e margem",
    ],
    marketStats: [
      { value: "1M+", label: "Restaurantes no Brasil" },
      { value: "35", label: "Fecham em até 2 anos", suffix: "%" },
      { value: "215", label: "Bilhões de mercado/ano", suffix: "B" },
    ],
    painBars: [
      { label: "Não sabem o lucro real", value: 90 },
      { label: "Presos na operação diária", value: 85 },
      { label: "Rotatividade de equipe", value: 65 },
      { label: "Precificação por intuição", value: 78 },
    ],
    caseHighlight: "Outros 500: de 2 para 10 unidades em 4 anos",
  },
  hamburguerias: {
    headline: "De hamburgueria local a rede — com o método que já franqueou marcas",
    subheadline:
      "O mercado de hamburguerias cresceu 300% na última década, mas sem estrutura, crescer é só acumular caos. Nós resolvemos isso.",
    problems: [
      { text: "Operação artesanal que não escala", stat: "80%" },
      { text: "Padrão do burger muda conforme quem está na chapa", stat: "75%" },
      { text: "Delivery cresceu mas o controle não acompanhou" },
      { text: "Não sabe se o delivery dá lucro ou prejuízo" },
      { text: "Quer virar franquia mas não tem processos documentados" },
    ],
    benefits: [
      "Receitas e processos padronizados — mesmo sabor em qualquer unidade",
      "CMV controlado por produto — sabe exatamente o custo de cada burger",
      "Modelo de franquia ou rede formatado do zero",
      "Equipe treinada pela Universidade Corporativa",
      "Cases reais: Heróis Super Burguer franqueada em 13 meses",
    ],
    marketStats: [
      { value: "300", label: "Crescimento do segmento na década", suffix: "%" },
      { value: "13", label: "Meses p/ franquear (case IJA)" },
      { value: "40", label: "Milhões em lucratividade gerada", suffix: "M" },
    ],
    painBars: [
      { label: "Operação não escalável", value: 80 },
      { label: "Padrão inconsistente", value: 75 },
      { label: "Sem controle de delivery", value: 70 },
      { label: "Processos informais", value: 85 },
    ],
    caseHighlight: "Heróis Super Burguer: franqueada em 13 meses com o Tripé da Expansão",
  },
  pizzarias: {
    headline: "Pare de depender do pizzaiolo estrela — padronize e escale sua pizzaria",
    subheadline:
      "O Brasil é o 2º maior mercado de pizza do mundo. Mas sem processos, o conhecimento morre quando o pizzaiolo vai embora.",
    problems: [
      { text: "Todo o conhecimento está na cabeça do pizzaiolo", stat: "88%" },
      { text: "Rodízio sem controle de custos — come até acabar", stat: "72%" },
      { text: "Difícil manter padrão com rotatividade de equipe" },
      { text: "Delivery crescendo sem estrutura operacional" },
      { text: "Margem apertada sem saber onde otimizar" },
    ],
    benefits: [
      "Receitas documentadas e padronizadas para cada sabor",
      "Controle de custos por pizza — margem clara por produto",
      "Operação funciona com qualquer equipe treinada",
      "Processos de delivery estruturados e rentáveis",
      "Modelo escalável — rodízio, delivery ou à la carte",
    ],
    marketStats: [
      { value: "2º", label: "Maior mercado de pizza do mundo" },
      { value: "1M", label: "Pizzas vendidas por dia no BR" },
      { value: "90", label: "Dependem do pizzaiolo estrela", suffix: "%" },
    ],
    painBars: [
      { label: "Dependência do pizzaiolo", value: 88 },
      { label: "Custos sem controle (rodízio)", value: 72 },
      { label: "Rotatividade alta", value: 65 },
      { label: "Margem comprimida", value: 70 },
    ],
  },
  bares: {
    headline: "Faturamento alto e lucro baixo? Seu bar precisa de gestão, não de sorte",
    subheadline:
      "Bares faturam bem mas costumam perder dinheiro em estoque, perdas invisíveis e operação sem controle. Estruturamos tudo.",
    problems: [
      { text: "Controle de estoque de bebidas é um caos", stat: "82%" },
      { text: "Não sabe a margem real de cada drink", stat: "78%" },
      { text: "Equipe com alta rotatividade — treinamento sempre do zero" },
      { text: "Falta de processos gera perdas invisíveis" },
      { text: "Faturamento alto mas lucro baixo" },
    ],
    benefits: [
      "Estoque controlado — perdas e desvios eliminados",
      "Margem por drink e por categoria de bebida",
      "Equipe com treinamento contínuo e padronizado",
      "Processos de abertura, operação e fechamento documentados",
      "Lucro real visível — de verdade, não feeling",
    ],
    marketStats: [
      { value: "30", label: "Perda média de estoque em bares", suffix: "%" },
      { value: "78", label: "Não sabem margem por drink", suffix: "%" },
      { value: "120", label: "Negócios transformados pelo IJA", suffix: "+" },
    ],
    painBars: [
      { label: "Estoque sem controle", value: 82 },
      { label: "Margem desconhecida", value: 78 },
      { label: "Perdas invisíveis", value: 75 },
      { label: "Rotatividade de equipe", value: 68 },
    ],
  },
  cafeterias: {
    headline: "Sua cafeteria tem alma artesanal — mas precisa de gestão para crescer",
    subheadline:
      "Cafeterias premium dependem de experiência consistente. Estruturamos seu negócio mantendo a identidade que te diferencia.",
    problems: [
      { text: "Produção artesanal difícil de escalar", stat: "76%" },
      { text: "Custos de insumos premium corroem a margem", stat: "70%" },
      { text: "Experiência do cliente depende de quem está no balcão" },
      { text: "Quer expandir mas não sabe se o modelo é replicável" },
      { text: "Gestão feita na planilha ou no caderno" },
    ],
    benefits: [
      "Processos de produção documentados mantendo qualidade artesanal",
      "Precificação racional para produtos premium",
      "Experiência padronizada independente da equipe do dia",
      "Modelo testado e pronto para replicação",
      "Dashboards financeiros substituem o caderno",
    ],
    marketStats: [
      { value: "14", label: "Crescimento do café especial/ano", suffix: "%" },
      { value: "76", label: "Cafeterias sem processos formais", suffix: "%" },
      { value: "40", label: "Milhões em lucro gerado pelo IJA", suffix: "M" },
    ],
    painBars: [
      { label: "Produção não escalável", value: 76 },
      { label: "Margem corroída por insumos", value: 70 },
      { label: "Experiência inconsistente", value: 68 },
      { label: "Gestão informal", value: 80 },
    ],
  },
  "food-service": {
    headline: "Dark kitchens, food trucks, catering — estruturamos qualquer operação",
    subheadline:
      "Operações de food service precisam ser enxutas e eficientes. Nós criamos os processos que permitem escalar sem caos.",
    problems: [
      { text: "Operação enxuta sem processos — tudo na improvisação", stat: "85%" },
      { text: "Difícil controlar custos em operações descentralizadas", stat: "80%" },
      { text: "Escalar sem perder qualidade parece impossível" },
      { text: "Falta de gestão de pessoas em equipes pequenas" },
      { text: "Múltiplas marcas/operações sem controle financeiro unificado" },
    ],
    benefits: [
      "Processos enxutos e documentados para operações ágeis",
      "Controle financeiro por operação/marca/unidade",
      "Modelo escalável — de 1 para múltiplas operações",
      "Gestão de pessoas adaptada para equipes enxutas",
      "Visão consolidada de todas as operações",
    ],
    marketStats: [
      { value: "200", label: "Crescimento de dark kitchens/ano", suffix: "%" },
      { value: "85", label: "Operam sem processos formais", suffix: "%" },
      { value: "14", label: "Anos de experiência do IJA" },
    ],
    painBars: [
      { label: "Operação sem processos", value: 85 },
      { label: "Custos descentralizados", value: 80 },
      { label: "Escala sem qualidade", value: 72 },
      { label: "Gestão informal", value: 78 },
    ],
  },
  varejo: {
    headline: "Sua loja fatura bem mas o lucro não aparece? Falta gestão estruturada",
    subheadline:
      "O varejo brasileiro movimenta trilhões por ano, mas a maioria dos donos de loja opera sem processos, sem controle de margem e sem plano de expansão.",
    problems: [
      { text: "Estoque descontrolado — capital parado em prateleira", stat: "82%" },
      { text: "Não sabe a margem real por produto ou categoria", stat: "78%" },
      { text: "Equipe de vendas sem treinamento e sem metas claras", stat: "70%" },
      { text: "Quer abrir filial ou franquear mas não tem processos" },
      { text: "Decisões de compra baseadas em feeling, não em dados" },
    ],
    benefits: [
      "Gestão de estoque otimizada — giro correto e capital liberado",
      "Margem por produto, categoria e loja — visibilidade total",
      "Equipe treinada com metas, scripts e avaliação de desempenho",
      "Processos documentados e replicáveis para expansão",
      "Dashboard financeiro que substitui planilha e caderno",
    ],
    marketStats: [
      { value: "1.5", label: "Trilhões de mercado varejista/ano", suffix: "T" },
      { value: "78", label: "Não controlam margem por produto", suffix: "%" },
      { value: "120", label: "Negócios transformados pelo IJA", suffix: "+" },
    ],
    painBars: [
      { label: "Estoque descontrolado", value: 82 },
      { label: "Margem desconhecida", value: 78 },
      { label: "Equipe sem treinamento", value: 70 },
      { label: "Processos informais", value: 85 },
    ],
  },
  turismo: {
    headline: "Hotéis, pousadas e negócios turísticos — estruture para a alta e a baixa temporada",
    subheadline:
      "O turismo brasileiro cresce ano a ano, mas negócios sazonais precisam de gestão inteligente para lucrar o ano inteiro. Estruturamos seu negócio para alta performance em qualquer época.",
    problems: [
      { text: "Faturamento concentrado na alta temporada — baixa = prejuízo", stat: "85%" },
      { text: "Equipe sazonal sem treinamento — experiência inconsistente", stat: "80%" },
      { text: "Não sabe o custo real por diária/serviço/hóspede", stat: "75%" },
      { text: "Precificação por temporada feita por intuição" },
      { text: "Quer expandir (nova unidade, franquia) mas não tem processos" },
    ],
    benefits: [
      "Gestão financeira que garante lucro na baixa e na alta temporada",
      "Processos de atendimento padronizados — experiência 5 estrelas sempre",
      "Precificação dinâmica baseada em dados reais de custo e demanda",
      "Equipe treinada pela Universidade Corporativa — mesmo os sazonais",
      "Modelo escalável para novas unidades ou franquias",
    ],
    marketStats: [
      { value: "9", label: "Do PIB brasileiro vem do turismo", suffix: "%" },
      { value: "85", label: "Dependem da alta temporada", suffix: "%" },
      { value: "14", label: "Anos de experiência do IJA" },
    ],
    painBars: [
      { label: "Sazonalidade não gerida", value: 85 },
      { label: "Equipe sem padrão", value: 80 },
      { label: "Custos desconhecidos", value: 75 },
      { label: "Precificação por intuição", value: 78 },
    ],
  },
};

export default async function SegmentoPage({ params }: Props) {
  const { slug } = await params;
  const segment = SEGMENTS.find((s) => s.slug === slug);
  if (!segment) notFound();

  const content = segmentContent[slug] || segmentContent.restaurantes;
  const SegmentIcon = segmentIcons[slug] || Utensils;
  const relatedCase = CASES.find(
    (c) =>
      c.segment.toLowerCase().includes(segment.name.toLowerCase().replace(/s$/, "")) ||
      slug === "hamburguerias"
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Segmentos", url: "/segmentos" },
              { name: segment.name, url: `/segmentos/${segment.slug}` },
            ])
          ),
        }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-40 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.15)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-40 -right-40 h-80 w-80 bg-accent/10" />
        <AnimatedBlob className="absolute -bottom-40 -left-40 h-96 w-96 bg-navy-500/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeInLeft>
              <div>
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/10 px-5 py-2.5">
                  <SegmentIcon size={18} className="text-accent" />
                  <span className="text-sm font-semibold text-accent">
                    Consultoria para {segment.name}
                  </span>
                </div>
                <h1 className="text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                  {content.headline.split(" — ")[0]}
                  {content.headline.includes(" — ") && (
                    <>
                      {" — "}
                      <span className="serif-italic gradient-text">
                        {content.headline.split(" — ")[1]}
                      </span>
                    </>
                  )}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-navy-300 lg:text-xl">
                  {content.subheadline}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/diagnostico"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
                  >
                    Diagnóstico gratuito
                    <ArrowRight size={18} />
                  </Link>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    Falar pelo WhatsApp
                  </a>
                </div>
              </div>
            </FadeInLeft>

            {/* Stats card */}
            <FadeInRight>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:p-10">
                <div className="grid grid-cols-3 gap-6">
                  {content.marketStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-white lg:text-4xl">
                        {stat.value}
                        {stat.suffix && (
                          <span className="text-accent">{stat.suffix}</span>
                        )}
                      </p>
                      <p className="mt-1 text-xs text-navy-400 lg:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 h-px bg-white/10" />
                <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-2xl font-bold text-accent">{NUMBERS.businesses}</p>
                    <p className="mt-1 text-xs text-navy-400">Negócios transformados</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{NUMBERS.years} anos</p>
                    <p className="mt-1 text-xs text-navy-400">De experiência</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{NUMBERS.revenue}</p>
                    <p className="mt-1 text-xs text-navy-400">Lucro gerado</p>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ===== DADOS DO MERCADO / DOR ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Dados do mercado
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                O cenário real de{" "}
                <span className="serif-italic gradient-text">
                  {segment.name.toLowerCase()}
                </span>{" "}
                no Brasil
              </h2>
              <p className="mt-4 text-lg text-navy-600">
                Estes são os problemas que vemos em {content.painBars[0].value}% dos negócios que nos procuram.
              </p>
            </div>
          </FadeInUp>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Progress bars */}
            <FadeInLeft>
              <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-lg shadow-navy-950/5 lg:p-10">
                <h3 className="mb-8 text-lg font-bold text-navy-950">
                  <AlertTriangle size={18} className="mb-0.5 mr-2 inline text-accent" />
                  Dores mais frequentes
                </h3>
                <div className="space-y-6">
                  {content.painBars.map((bar, i) => (
                    <ProgressBar
                      key={bar.label}
                      label={bar.label}
                      value={bar.value}
                      delay={i * 0.15}
                    />
                  ))}
                </div>
                <p className="mt-8 text-xs text-navy-400">
                  * Dados baseados na análise de {NUMBERS.businesses} negócios atendidos pelo IJA
                </p>
              </div>
            </FadeInLeft>

            {/* Problems list */}
            <FadeInRight>
              <div className="space-y-4">
                {content.problems.map((problem, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-4 rounded-2xl border border-navy-100/50 bg-white p-5 transition-all hover:border-red-200 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-100">
                      <XCircle size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-navy-900">{problem.text}</p>
                    </div>
                    {problem.stat && (
                      <span className="shrink-0 rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-600">
                        {problem.stat}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ===== TRANSFORMAÇÃO: O QUE ENTREGAMOS ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(249,115,22,0.1)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Transformação
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                O que o IJA{" "}
                <span className="serif-italic gradient-text">entrega</span> para{" "}
                {segment.name.toLowerCase()}
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.benefits.map((benefit, i) => (
              <StaggerItem key={i}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-white/10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <CheckCircle size={20} />
                  </div>
                  <p className="text-base font-medium leading-relaxed text-white/90">
                    {benefit}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Case highlight */}
          {content.caseHighlight && relatedCase && (
            <FadeInUp>
              <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-accent/20 bg-accent/5 p-8 lg:p-10">
                <div className="flex items-start gap-4">
                  <Quote size={32} className="shrink-0 text-accent/50" />
                  <div>
                    <p className="text-lg font-medium italic text-white/90">
                      &ldquo;{relatedCase.quote}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div>
                        <p className="font-bold text-white">{relatedCase.name}</p>
                        <p className="text-sm text-navy-400">
                          {relatedCase.highlight}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/cases"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-light"
                    >
                      Ver cases completos
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInUp>
          )}
        </div>
      </section>

      {/* ===== MÉTODO TRIPÉ ===== */}
      <section className="bg-cream-dark py-24 lg:py-32 dot-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Método proprietário
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                O{" "}
                <span className="serif-italic gradient-text">
                  Tripé da Expansão
                </span>{" "}
                aplicado em {segment.name.toLowerCase()}
              </h2>
              <p className="mt-4 text-lg text-navy-600">
                Três pilares que transformam {segment.name.toLowerCase()} em negócios
                escaláveis e prontos para crescer.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Padronização Operacional",
                desc: `Documentamos cada processo do seu ${segment.name === "Food Service" ? "negócio" : segment.name.toLowerCase().replace(/s$/, "")} — da abertura ao fechamento, da cozinha ao atendimento. Resultado: qualidade consistente com qualquer equipe.`,
                color: "accent",
              },
              {
                icon: Users,
                title: "Universidade Corporativa",
                desc: `Criamos um programa de treinamento contínuo para sua equipe. Reduz turnover, desenvolve líderes internos e faz seu ${segment.name === "Food Service" ? "negócio" : segment.name.toLowerCase().replace(/s$/, "")} funcionar sem você.`,
                color: "accent",
              },
              {
                icon: BarChart3,
                title: "Controle de Qualidade",
                desc: `Implementamos métricas, checklists e auditorias para garantir que o padrão se mantém — em 1 ou em 10 unidades. O segredo para escalar sem perder a essência.`,
                color: "accent",
              },
            ].map((pillar) => (
              <StaggerItem key={pillar.title}>
                <HoverCard className="h-full">
                  <div className="h-full rounded-3xl border border-navy-100/50 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <pillar.icon size={28} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-navy-950">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-navy-600">
                      {pillar.desc}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== SOLUÇÕES APLICÁVEIS ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Soluções
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                Soluções{" "}
                <span className="serif-italic gradient-text">aplicáveis</span>{" "}
                para {segment.name.toLowerCase()}
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
            {SOLUTIONS.map((solution) => {
              const SolIcon =
                solutionIcons[solution.icon] || DollarSign;
              return (
                <StaggerItem key={solution.slug}>
                  <Link
                    href={`/solucoes/${solution.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-navy-100/50 bg-white p-8 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <SolIcon size={22} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-navy-950 transition-colors group-hover:text-accent">
                          {solution.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-navy-600">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-accent">
                      Ver detalhes da solução
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== NÚMEROS ===== */}
      <section className="bg-navy-950 py-20 noise-overlay">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: 120, suffix: "+", label: "Negócios transformados" },
              { value: 40, prefix: "R$ ", suffix: "M+", label: "Lucratividade gerada" },
              { value: 700, suffix: "+", label: "Líderes formados" },
              { value: 14, label: "Anos de experiência" },
            ].map((stat) => (
              <FadeInUp key={stat.label}>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white lg:text-5xl">
                    <CountUp
                      target={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                    />
                  </p>
                  <p className="mt-2 text-sm text-navy-400">{stat.label}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUTROS SEGMENTOS ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">
                Também{" "}
                <span className="serif-italic gradient-text">atendemos</span>
              </h2>
              <p className="mt-3 text-navy-600">
                Nosso método se adapta a qualquer operação de food service.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SEGMENTS.filter((s) => s.slug !== slug).map((s) => {
              const OtherIcon = segmentIcons[s.slug] || Utensils;
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    href={`/segmentos/${s.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-navy-100/50 bg-white p-4 transition-all hover:border-accent/30 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-500 transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                      <OtherIcon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-navy-700 transition-colors group-hover:text-accent">
                      {s.name}
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-36 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.12)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-20 -right-20 h-64 w-64 bg-accent/10" />
        <AnimatedBlob className="absolute -bottom-20 -left-20 h-64 w-64 bg-navy-500/10" />
        <div className="relative mx-auto max-w-3xl text-center px-4">
          <FadeInUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
              <Zap size={14} />
              100% gratuito — sem compromisso
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Pronto para{" "}
              <span className="serif-italic gradient-text">estruturar</span>{" "}
              {segment.name === "Food Service"
                ? "sua operação"
                : `sua ${segment.name.toLowerCase().replace(/s$/, "")}`}
              ?
            </h2>
            <p className="mt-6 text-lg text-navy-300 lg:text-xl">
              Sessão de 30-45 minutos com consultor do IJA. Análise completa +
              plano de ação personalizado para {segment.name.toLowerCase()}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/diagnostico"
                className="glow-orange-sm inline-flex items-center gap-2 rounded-2xl bg-accent px-10 py-5 text-lg font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
              >
                Agendar diagnóstico gratuito
                <ArrowRight size={20} />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Falar pelo WhatsApp
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
