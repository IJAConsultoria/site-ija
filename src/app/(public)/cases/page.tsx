import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { CASES } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  FadeInUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/animations";

export const metadata = generatePageMetadata({
  title: "Cases de Sucesso",
  description:
    "Cases reais de restaurantes transformados pelo Instituto João Alves. De 2 para 10 unidades em 4 anos (Outros 500) e franqueada em 13 meses (Heróis Super Burguer).",
  path: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Cases", url: "/cases" },
            ])
          ),
        }}
      />

      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Cases de sucesso
              </p>
            </FadeIn>
            <FadeInUp>
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Resultados reais de quem{" "}
                <span className="serif-italic gradient-text">confiou no IJA</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="mt-6 text-lg text-navy-300">
                Cada case é uma história de transformação real. De negócios
                desorganizados a operações estruturadas e prontas para expandir.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-16">
            {CASES.map((cs) => (
              <StaggerItem key={cs.slug}>
                <Link
                  href={`/cases/${cs.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-navy-100/50 transition-all hover:border-accent/30 hover:shadow-xl"
                >
                  <div className="grid lg:grid-cols-2">
                    <div className="bg-cream/50 p-10 lg:p-12">
                      <p className="text-sm font-medium text-accent">
                        {cs.segment}
                      </p>
                      <h2 className="mt-2 text-3xl font-bold text-navy-950">
                        {cs.name}
                      </h2>
                      <p className="mt-4 text-4xl font-bold text-accent">
                        {cs.highlight}
                      </p>
                      <p className="mt-2 text-sm text-navy-500">
                        Em {cs.timeline}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {cs.solutions.map((sol) => (
                          <span
                            key={sol}
                            className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-700"
                          >
                            {sol}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-10 lg:p-12">
                      <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                            Antes
                          </p>
                          <p className="mt-2 text-lg font-bold text-navy-950">
                            {cs.before.units}
                          </p>
                          <p className="mt-1 text-sm text-navy-600">
                            {cs.before.situation}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                            Depois
                          </p>
                          <p className="mt-2 text-lg font-bold text-navy-950">
                            {cs.after.units}
                          </p>
                          <p className="mt-1 text-sm text-navy-600">
                            {cs.after.situation}
                          </p>
                        </div>
                      </div>
                      <blockquote className="mt-8 border-l-2 border-accent pl-4 text-navy-600 italic">
                        <Quote size={18} className="mb-2 text-accent/40" />
                        &ldquo;{cs.quote}&rdquo;
                      </blockquote>
                      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                        Ler case completo
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="mx-auto max-w-3xl text-center px-4">
          <FadeInUp>
            <h2 className="text-3xl font-bold text-white">
              Seu restaurante pode ser o próximo
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="mt-4 text-lg text-navy-300">
              Agende um diagnóstico gratuito e comece sua transformação.
            </p>
          </FadeInUp>
          <ScaleIn delay={0.2}>
            <Link
              href="/diagnostico"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Agendar diagnóstico gratuito
              <ArrowRight size={18} />
            </Link>
          </ScaleIn>
        </div>
      </section>
    </>
  );
}
