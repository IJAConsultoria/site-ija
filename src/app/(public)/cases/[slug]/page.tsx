import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { CASES, WHATSAPP_URL } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cs = CASES.find((c) => c.slug === slug);
  if (!cs) return {};
  return generatePageMetadata({
    title: `Case ${cs.name}`,
    description: `${cs.highlight}. Veja como o Instituto João Alves transformou o ${cs.name} com o Método Tripé da Expansão.`,
    path: `/cases/${cs.slug}`,
  });
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const cs = CASES.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Cases", url: "/cases" },
              { name: cs.name, url: `/cases/${cs.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-navy-950 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/cases"
              className="mb-4 inline-block text-sm text-navy-400 hover:text-accent"
            >
              &larr; Todos os cases
            </Link>
            <p className="text-sm font-medium text-accent">{cs.segment}</p>
            <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
              {cs.name}
            </h1>
            <p className="mt-6 text-3xl font-bold text-accent">
              {cs.highlight}
            </p>
            <p className="mt-2 text-navy-400">Em {cs.timeline}</p>
          </div>
        </div>
      </section>

      {/* Antes x Depois */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Antes */}
              <div className="rounded-2xl border border-navy-200 bg-navy-50 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-navy-400">
                  Antes do IJA
                </p>
                <p className="mt-4 text-2xl font-bold text-navy-950">
                  {cs.before.units}
                </p>
                <p className="mt-4 text-navy-600 leading-relaxed">
                  {cs.before.situation}
                </p>
              </div>
              {/* Depois */}
              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  Depois do IJA
                </p>
                <p className="mt-4 text-2xl font-bold text-navy-950">
                  {cs.after.units}
                </p>
                <p className="mt-4 text-navy-600 leading-relaxed">
                  {cs.after.situation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluções aplicadas */}
      <section className="bg-navy-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-navy-950">O que o IJA fez</h2>
            <p className="mt-4 text-navy-600">
              As soluções aplicadas para alcançar essa transformação:
            </p>
            <div className="mt-8 space-y-4">
              {cs.solutions.map((sol) => (
                <div
                  key={sol}
                  className="flex items-center gap-3 rounded-xl bg-white p-5 shadow-sm"
                >
                  <CheckCircle size={22} className="shrink-0 text-accent" />
                  <span className="text-lg font-medium text-navy-950">{sol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-navy-950">
              Timeline da transformação
            </h2>
            <div className="mt-12 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-4">
              <div className="rounded-xl bg-navy-50 p-6 text-center md:w-1/3">
                <p className="text-sm font-semibold text-navy-400">Início</p>
                <p className="mt-2 text-lg font-bold text-navy-950">
                  {cs.before.units}
                </p>
              </div>
              <ArrowRight size={24} className="shrink-0 text-accent md:rotate-0 rotate-90" />
              <div className="rounded-xl bg-navy-50 p-6 text-center md:w-1/3">
                <p className="text-sm font-semibold text-navy-400">Método</p>
                <p className="mt-2 text-lg font-bold text-accent">
                  Tripé da Expansão
                </p>
              </div>
              <ArrowRight size={24} className="shrink-0 text-accent md:rotate-0 rotate-90" />
              <div className="rounded-xl bg-accent/10 border border-accent/20 p-6 text-center md:w-1/3">
                <p className="text-sm font-semibold text-accent">Resultado</p>
                <p className="mt-2 text-lg font-bold text-navy-950">
                  {cs.after.units}
                </p>
              </div>
            </div>
            <p className="mt-6 text-navy-500">
              Transformação em <strong className="text-navy-950">{cs.timeline}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-3xl text-center px-4">
          <blockquote className="text-2xl font-medium italic text-navy-700 leading-relaxed">
            &ldquo;{cs.quote}&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold text-navy-950">{cs.name}</p>
          <p className="text-sm text-navy-500">{cs.segment}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-20">
        <div className="mx-auto max-w-3xl text-center px-4">
          <h2 className="text-3xl font-bold text-white">
            Seu restaurante pode ser o próximo{" "}
            <span className="text-accent">case de sucesso</span>
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Comece com um diagnóstico gratuito. Descubra o que está travando seu
            crescimento.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Agendar diagnóstico gratuito
              <ArrowRight size={18} />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-navy-600 px-8 py-4 text-base font-medium text-white transition-colors hover:border-navy-400 hover:bg-navy-900"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
