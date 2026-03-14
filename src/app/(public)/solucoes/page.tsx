import Link from "next/link";
import {
  ArrowRight,
  DollarSign,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Zap,
  ChevronRight,
} from "lucide-react";
import { SOLUTIONS, NUMBERS } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  AnimatedBlob,
} from "@/components/animations";

export const metadata = generatePageMetadata({
  title: "Soluções",
  description:
    "4 soluções especializadas para negócios: Gestão Financeira, Planejamento Estratégico, Liderança Organizacional e Gestão Comercial. Consultoria prática com resultados comprovados.",
  path: "/solucoes",
});

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Target,
  Users,
  TrendingUp,
};

const solutionAccents = [
  { gradient: "from-accent/20 to-accent/5", number: "01" },
  { gradient: "from-navy-600/20 to-navy-600/5", number: "02" },
  { gradient: "from-accent/20 to-accent/5", number: "03" },
  { gradient: "from-navy-600/20 to-navy-600/5", number: "04" },
];

export default function SolucoesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Soluções", url: "/solucoes" },
            ])
          ),
        }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-40 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.15)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-40 -right-40 h-80 w-80 bg-accent/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent">
                <Zap size={16} />
                Método comprovado em +{NUMBERS.businesses} negócios
              </div>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Soluções que{" "}
                <span className="serif-italic gradient-text">estruturam</span>{" "}
                seu negócio para crescer
              </h1>
              <p className="mt-6 text-lg text-navy-300 lg:text-xl">
                4 soluções especializadas, baseadas em 14 anos de experiência.
                Cada uma resolve um problema específico — e juntas, transformam
                seu negócio.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Como funciona
              </p>
              <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                Do diagnóstico ao{" "}
                <span className="serif-italic gradient-text">resultado</span>
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Diagnóstico gratuito",
                desc: "Analisamos as 8 áreas do seu negócio em 30-45 minutos e identificamos o que está travando.",
              },
              {
                step: "02",
                title: "Plano personalizado",
                desc: "Definimos a solução ideal para o seu momento, com escopo, cronograma e métricas claras.",
              },
              {
                step: "03",
                title: "Implementação conjunta",
                desc: "Trabalhamos lado a lado com você e sua equipe. Não entregamos relatório — entregamos resultado.",
              },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="group rounded-3xl border border-navy-100/50 bg-white p-8 transition-all hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
                  <span className="text-4xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-navy-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== AS 4 SOLUÇÕES ===== */}
      <section className="bg-cream-dark py-24 lg:py-32 dot-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">
              Nossas soluções
            </p>
            <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
              Uma solução para cada{" "}
              <span className="serif-italic gradient-text">desafio</span>
            </h2>
          </FadeInUp>

          <div className="mt-14 space-y-20">
            {SOLUTIONS.map((solution, index) => {
              const Icon = iconMap[solution.icon];
              const accent = solutionAccents[index];
              const isEven = index % 2 === 1;

              return (
                <div key={solution.slug}>
                  <div
                    className={`grid items-start gap-12 lg:grid-cols-5 ${
                      isEven ? "" : ""
                    }`}
                  >
                    {/* Main content */}
                    <div
                      className={`lg:col-span-3 ${
                        isEven ? "lg:order-2" : ""
                      }`}
                    >
                      {isEven ? (
                        <FadeInRight>
                          <SolutionMainContent
                            solution={solution}
                            Icon={Icon}
                            number={accent.number}
                          />
                        </FadeInRight>
                      ) : (
                        <FadeInLeft>
                          <SolutionMainContent
                            solution={solution}
                            Icon={Icon}
                            number={accent.number}
                          />
                        </FadeInLeft>
                      )}
                    </div>

                    {/* Side card */}
                    <div
                      className={`lg:col-span-2 ${
                        isEven ? "lg:order-1" : ""
                      }`}
                    >
                      {isEven ? (
                        <FadeInLeft>
                          <SolutionSideCard
                            solution={solution}
                            gradient={accent.gradient}
                          />
                        </FadeInLeft>
                      ) : (
                        <FadeInRight>
                          <SolutionSideCard
                            solution={solution}
                            gradient={accent.gradient}
                          />
                        </FadeInRight>
                      )}
                    </div>
                  </div>

                  {/* Separator */}
                  {index < SOLUTIONS.length - 1 && (
                    <div className="mt-20 flex justify-center">
                      <div className="h-px w-32 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROOF ===== */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="rounded-3xl border border-navy-100/50 bg-white p-10 shadow-lg shadow-navy-950/5 lg:p-16">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: NUMBERS.businesses, label: "Negócios transformados" },
                  { value: NUMBERS.revenue, label: "Em lucratividade gerada" },
                  { value: NUMBERS.leaders, label: "Líderes desenvolvidos" },
                  { value: NUMBERS.years + " anos", label: "De experiência" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold text-navy-950 counter-number lg:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-navy-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-36 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(166,133,35,0.12)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -bottom-20 -left-20 h-64 w-64 bg-accent/10" />
        <div className="relative mx-auto max-w-3xl text-center px-4">
          <FadeInUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
              <Zap size={14} />
              100% gratuito — sem compromisso
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Não sabe por onde{" "}
              <span className="serif-italic gradient-text">começar</span>?
            </h2>
            <p className="mt-6 text-lg text-navy-300">
              No diagnóstico gratuito, analisamos as 8 áreas do seu negócio e
              indicamos a solução ideal para o seu momento. 30-45 minutos,
              direto ao ponto.
            </p>
            <Link
              href="/diagnostico"
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105 glow-gold-sm"
            >
              Agendar diagnóstico gratuito
              <ArrowRight size={20} />
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}

/* ===== SUB-COMPONENTS ===== */

function SolutionMainContent({
  solution,
  Icon,
  number,
}: {
  solution: (typeof SOLUTIONS)[number];
  Icon: React.ElementType;
  number: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl icon-gradient text-white shadow-lg shadow-accent/20">
          <Icon size={28} />
        </div>
        <div>
          <span className="text-sm font-bold text-accent">{number}</span>
          <h2 className="text-2xl font-bold text-navy-950 lg:text-3xl">
            {solution.title}
          </h2>
        </div>
      </div>

      <p className="mt-6 text-lg text-navy-600 leading-relaxed">
        {solution.description}
      </p>

      {/* Dores como cards compactos */}
      <div className="mt-8">
        <p className="text-sm font-bold uppercase tracking-widest text-navy-400">
          Você se identifica?
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {solution.pains.map((pain) => (
            <div
              key={pain}
              className="flex items-start gap-2.5 rounded-xl border border-navy-100/50 bg-white px-4 py-3"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="text-sm text-navy-700">{pain}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href={`/solucoes/${solution.slug}`}
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
      >
        Ver solução completa
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function SolutionSideCard({
  solution,
  gradient,
}: {
  solution: (typeof SOLUTIONS)[number];
  gradient: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-navy-100/50 bg-gradient-to-br ${gradient} p-8 lg:sticky lg:top-28`}
    >
      <h3 className="text-sm font-bold uppercase tracking-widest text-navy-400">
        O que entregamos
      </h3>
      <ul className="mt-5 space-y-3">
        {solution.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle
              size={16}
              className="mt-0.5 shrink-0 text-accent"
            />
            <span className="text-sm font-medium text-navy-800">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 h-px bg-navy-200/30" />

      <h3 className="mt-6 text-sm font-bold uppercase tracking-widest text-navy-400">
        Resultados
      </h3>
      <ul className="mt-4 space-y-2.5">
        {solution.results.map((result) => (
          <li key={result} className="flex items-start gap-2.5">
            <ChevronRight
              size={14}
              className="mt-0.5 shrink-0 text-accent"
            />
            <span className="text-sm text-navy-700">{result}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
