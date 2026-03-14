import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Target,
  Users,
  TrendingUp,
  Zap,
  ChevronRight,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { SOLUTIONS, WHATSAPP_URL, NUMBERS } from "@/lib/constants";
import {
  generatePageMetadata,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  AnimatedBlob,
} from "@/components/animations";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) return {};
  return generatePageMetadata({
    title: solution.title,
    description: solution.description,
    path: `/solucoes/${solution.slug}`,
  });
}

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Target,
  Users,
  TrendingUp,
};

const solutionFaqs: Record<string, { question: string; answer: string }[]> = {
  "gestao-financeira": [
    {
      question: "Preciso ter sistema de gestão (ERP) para começar?",
      answer:
        "Não. Trabalhamos com ferramentas simples como Google Sheets e dashboards de BI. Você não precisa de ERP caro nem de conhecimento técnico avançado.",
    },
    {
      question: "Em quanto tempo vejo resultado?",
      answer:
        "Normalmente nos primeiros 30 dias já existe visibilidade clara sobre o lucro real. Em 3 meses, todos os controles e dashboards estão funcionando.",
    },
    {
      question: "Funciona para negócio pequeno?",
      answer:
        "Sim. O método é adaptado para a realidade de cada negócio, desde uma unidade até redes com 10+.",
    },
  ],
  "planejamento-estrategico": [
    {
      question: "Minha empresa é pequena, preciso de planejamento estratégico?",
      answer:
        "Principalmente se é pequena. O planejamento evita desperdiçar recursos e garante que cada decisão leva na direção certa.",
    },
    {
      question: "Qual é a diferença para um plano de negócios?",
      answer:
        "O plano de negócios é estático. O planejamento estratégico é dinâmico — com metas, indicadores e acompanhamento mensal para ajustar a rota.",
    },
    {
      question: "A equipe participa do processo?",
      answer:
        "Sim. O alinhamento da equipe é parte fundamental. Todos entendem os objetivos e sabem como contribuir.",
    },
  ],
  "lideranca-organizacional": [
    {
      question: "Tenho alta rotatividade, isso vai resolver?",
      answer:
        "A rotatividade alta normalmente é sintoma de falta de carreira percebida, treinamento e clima ruim. Trabalhamos todas essas frentes.",
    },
    {
      question: "Preciso contratar alguém de RH?",
      answer:
        "Depende do tamanho. Para negócios menores, estruturamos os processos para que o próprio gestor execute. Para maiores, ajudamos a definir o papel de RH.",
    },
    {
      question: "Funciona em negócio com muita rotatividade?",
      answer:
        "Especialmente nesse caso. O sistema de onboarding e treinamento acelera a integração de novos funcionários e os processos garantem qualidade mesmo com mudanças de equipe.",
    },
  ],
  "gestao-comercial-marketing": [
    {
      question: "Nunca fiz marketing, por onde começo?",
      answer:
        "Começamos pelo básico: posicionamento, ICP, funil de vendas. Depois construímos os canais de captação. Tudo de forma progressiva.",
    },
    {
      question: "Preciso investir em tráfego pago desde o início?",
      answer:
        "Não necessariamente. Primeiro estruturamos o orgânico (SEO, conteúdo, presença digital). Tráfego pago entra quando há funil pronto para converter.",
    },
    {
      question: "Isso serve para negócio que só vende presencialmente?",
      answer:
        "Sim. Marketing e gestão comercial não são só para delivery ou e-commerce. Servem para lotar seu espaço, aumentar ticket médio e fidelizar clientes.",
    },
  ],
};

export default async function SolucaoPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) notFound();

  const Icon = iconMap[solution.icon];
  const faqs = solutionFaqs[slug] || [];
  const otherSolutions = SOLUTIONS.filter((s) => s.slug !== slug);
  const solutionIndex = SOLUTIONS.findIndex((s) => s.slug === slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Soluções", url: "/solucoes" },
              { name: solution.title, url: `/solucoes/${solution.slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: solution.title,
              description: solution.description,
              url: `/solucoes/${solution.slug}`,
            })
          ),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema(faqs)),
          }}
        />
      )}

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-40 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.15)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-40 -right-40 h-80 w-80 bg-accent/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <FadeInLeft>
                <Link
                  href="/solucoes"
                  className="mb-6 inline-flex items-center gap-2 text-sm text-navy-400 transition-colors hover:text-accent"
                >
                  <ArrowLeft size={14} />
                  Todas as soluções
                </Link>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl icon-gradient text-white shadow-lg shadow-accent/20">
                    <Icon size={28} />
                  </div>
                  <span className="text-sm font-bold text-accent">
                    {String(solutionIndex + 1).padStart(2, "0")} / {String(SOLUTIONS.length).padStart(2, "0")}
                  </span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {solution.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-navy-300">
                  {solution.description}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/diagnostico"
                    className="glow-gold-sm inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
                  >
                    Agendar diagnóstico gratuito
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
              </FadeInLeft>
            </div>

            {/* Quick stats */}
            <div className="lg:col-span-2">
              <FadeInRight>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-navy-400">
                    Resultados desta solução
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {solution.results.map((result) => (
                      <li
                        key={result}
                        className="flex items-start gap-3 text-white"
                      >
                        <CheckCircle
                          size={18}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span className="text-sm leading-relaxed">
                          {result}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-2xl font-bold text-accent counter-number">
                        {NUMBERS.businesses}
                      </p>
                      <p className="text-xs text-navy-400">
                        Negócios transformados
                      </p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent counter-number">
                        {NUMBERS.years} anos
                      </p>
                      <p className="text-xs text-navy-400">De experiência</p>
                    </div>
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DORES ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                <AlertTriangle size={14} />
                Sinais de alerta
              </div>
              <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl">
                Você se{" "}
                <span className="serif-italic gradient-text">identifica</span>{" "}
                com algum desses problemas?
              </h2>
              <p className="mt-4 text-lg text-navy-600">
                Se ao menos 2 desses problemas fazem parte da sua rotina, esta
                solução foi feita para você.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solution.pains.map((pain, i) => (
              <StaggerItem key={pain}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-navy-100/50 bg-white p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-navy-800 leading-snug">
                      {pain}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== ENTREGÁVEIS ===== */}
      <section className="bg-cream-dark py-24 lg:py-32 dot-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <FadeInLeft>
              <div className="lg:sticky lg:top-28">
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  O que entregamos
                </p>
                <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                  Não entregamos{" "}
                  <span className="serif-italic gradient-text">relatório</span>
                  <br />
                  Entregamos{" "}
                  <span className="serif-italic gradient-text">resultado</span>
                </h2>
                <p className="mt-4 text-lg text-navy-600 leading-relaxed">
                  Cada entregável é implementado junto com você e sua equipe.
                  Você não recebe um PDF bonito — recebe processos funcionando,
                  ferramentas configuradas e gente treinada.
                </p>
                <div className="mt-8 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 p-6">
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-accent" />
                    <p className="font-bold text-navy-950">
                      Garantia de implementação
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-navy-600">
                    Não saímos até que tudo esteja rodando. Acompanhamento
                    semanal até o resultado aparecer.
                  </p>
                </div>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <StaggerContainer className="space-y-4">
                {solution.deliverables.map((item, i) => (
                  <StaggerItem key={item}>
                    <div className="flex items-start gap-4 rounded-2xl border border-navy-100/50 bg-white p-6 transition-all hover:border-accent/30 hover:shadow-md">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <p className="font-bold text-navy-950">{item}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ===== RESULTADOS ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Resultados esperados
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                O que muda no seu{" "}
                <span className="serif-italic gradient-text">negócio</span>
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solution.results.map((result, i) => (
              <StaggerItem key={result}>
                <div className="group rounded-3xl border border-navy-100/50 bg-white p-8 transition-all hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent group-hover:icon-gradient group-hover:text-white transition-all">
                    <CheckCircle size={24} />
                  </div>
                  <p className="mt-5 text-lg font-bold text-navy-950 leading-snug">
                    {result}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      {faqs.length > 0 && (
        <section className="bg-cream-dark py-24 lg:py-32 dot-pattern">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Dúvidas comuns
                </p>
                <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                  Perguntas{" "}
                  <span className="serif-italic gradient-text">frequentes</span>
                </h2>
              </div>
            </FadeInUp>

            <StaggerContainer className="mt-12 space-y-4">
              {faqs.map((faq) => (
                <StaggerItem key={faq.question}>
                  <div className="rounded-3xl border border-navy-100/50 bg-white p-8 transition-all hover:border-accent/20">
                    <h3 className="text-lg font-bold text-navy-950">
                      {faq.question}
                    </h3>
                    <p className="mt-3 text-navy-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ===== OUTRAS SOLUÇÕES ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">
                Outras{" "}
                <span className="serif-italic gradient-text">soluções</span>
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-3">
            {otherSolutions.map((other) => {
              const OtherIcon = iconMap[other.icon];
              return (
                <StaggerItem key={other.slug}>
                  <Link
                    href={`/solucoes/${other.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-navy-100/50 bg-white p-8 transition-all hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <OtherIcon size={22} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-navy-950 group-hover:text-accent transition-colors">
                      {other.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy-600 line-clamp-2">
                      {other.description}
                    </p>
                    <div className="mt-auto pt-5">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                        Ver solução
                        <ChevronRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-36 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(166,133,35,0.12)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-20 -right-20 h-64 w-64 bg-accent/10" />
        <div className="relative mx-auto max-w-3xl text-center px-4">
          <FadeInUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
              <Zap size={14} />
              Diagnóstico gratuito — 30 a 45 min
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Pronto para{" "}
              <span className="serif-italic gradient-text">transformar</span>{" "}
              seu negócio?
            </h2>
            <p className="mt-6 text-lg text-navy-300">
              Analisamos as 8 áreas do seu negócio e indicamos o melhor caminho.
              Sem compromisso — você decide se quer seguir.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/diagnostico"
                className="glow-gold-sm inline-flex items-center gap-2 rounded-2xl bg-accent px-10 py-5 text-lg font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
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
