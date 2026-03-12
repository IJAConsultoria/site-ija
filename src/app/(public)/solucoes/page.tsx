import Link from "next/link";
import { ArrowRight, DollarSign, Target, Users, TrendingUp } from "lucide-react";
import { SOLUTIONS } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";

export const metadata = generatePageMetadata({
  title: "Soluções",
  description:
    "4 soluções especializadas para restaurantes: Gestão Financeira, Planejamento Estratégico, Liderança Organizacional e Gestão Comercial. Consultoria prática com resultados comprovados.",
  path: "/solucoes",
});

const iconMap: Record<string, React.ElementType> = {
  DollarSign,
  Target,
  Users,
  TrendingUp,
};

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

      <section className="relative bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
              Nossas soluções
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Uma solução para cada{" "}
              <span className="serif-italic gradient-text">fase do seu restaurante</span>
            </h1>
            <p className="mt-6 text-lg text-navy-300">
              Cada solução é personalizada para a realidade do seu negócio.
              Não são produtos genéricos — são frameworks que implementamos
              junto com você.
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-16">
            {SOLUTIONS.map((solution, index) => {
              const Icon = iconMap[solution.icon];
              const isEven = index % 2 === 1;
              return (
                <StaggerItem key={solution.slug}>
                  <div
                    className={`grid items-start gap-12 lg:grid-cols-2 ${isEven ? "direction-rtl" : ""}`}
                  >
                    {isEven ? (
                      <FadeInRight className="lg:order-2">
                        <SolutionContent
                          solution={solution}
                          Icon={Icon}
                        />
                      </FadeInRight>
                    ) : (
                      <FadeInLeft>
                        <SolutionContent
                          solution={solution}
                          Icon={Icon}
                        />
                      </FadeInLeft>
                    )}
                    {isEven ? (
                      <FadeInLeft className="lg:order-1">
                        <SolutionDeliverables solution={solution} />
                      </FadeInLeft>
                    ) : (
                      <FadeInRight>
                        <SolutionDeliverables solution={solution} />
                      </FadeInRight>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="mx-auto max-w-3xl text-center px-4">
          <FadeInUp>
            <h2 className="text-3xl font-bold text-white">
              Não sabe por onde <span className="serif-italic gradient-text">começar</span>?
            </h2>
            <p className="mt-4 text-lg text-navy-300">
              No diagnóstico gratuito, analisamos as 8 áreas do seu negócio e
              indicamos a solução ideal para o seu momento.
            </p>
            <Link
              href="/diagnostico"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Agendar diagnóstico gratuito
              <ArrowRight size={18} />
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}

function SolutionContent({
  solution,
  Icon,
}: {
  solution: (typeof SOLUTIONS)[number];
  Icon: React.ElementType;
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-accent/10 text-accent">
          <Icon size={28} />
        </div>
        <h2 className="text-2xl font-bold text-navy-950">
          {solution.title}
        </h2>
      </div>
      <p className="mt-4 text-lg text-navy-600">
        {solution.description}
      </p>
      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-navy-400">
        Você se identifica?
      </h3>
      <ul className="mt-4 space-y-2">
        {solution.pains.map((pain) => (
          <li key={pain} className="flex items-start gap-2 text-navy-600">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            {pain}
          </li>
        ))}
      </ul>
      <Link
        href={`/solucoes/${solution.slug}`}
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
      >
        Ver solução completa
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function SolutionDeliverables({
  solution,
}: {
  solution: (typeof SOLUTIONS)[number];
}) {
  return (
    <div className="rounded-3xl border border-navy-100/50 bg-cream-dark p-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-400">
        O que entregamos
      </h3>
      <ul className="mt-4 space-y-3">
        {solution.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-3 text-navy-700">
            <span className="mt-1 text-accent">&#10003;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
