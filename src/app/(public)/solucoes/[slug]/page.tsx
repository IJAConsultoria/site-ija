import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SOLUTIONS, WHATSAPP_URL } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/seo";

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
      question: "Funciona para restaurante pequeno?",
      answer:
        "Sim. O método é adaptado para a realidade de cada negócio, desde restaurante com 1 unidade até redes com 10+.",
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
      question: "Funciona em restaurante com muita rotatividade?",
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
      question: "Isso serve para restaurante que só vende no salão?",
      answer:
        "Sim. Marketing e gestão comercial não são só para delivery ou franquias. Servem para lotar o salão, aumentar ticket médio e fidelizar clientes.",
    },
  ],
};

export default async function SolucaoPage({ params }: Props) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  if (!solution) notFound();

  const faqs = solutionFaqs[slug] || [];

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

      {/* Hero */}
      <section className="bg-navy-950 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Link
              href="/solucoes"
              className="mb-4 inline-block text-sm text-navy-400 hover:text-accent"
            >
              &larr; Todas as soluções
            </Link>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {solution.title}
            </h1>
            <p className="mt-6 text-lg text-navy-300">{solution.description}</p>
            <Link
              href="/diagnostico"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Agende seu diagnóstico gratuito
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Dores */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-navy-950">Você se identifica?</h2>
            <ul className="mt-8 space-y-4">
              {solution.pains.map((pain) => (
                <li
                  key={pain}
                  className="flex items-start gap-3 rounded-xl border border-navy-100 bg-navy-50/50 p-5 text-navy-700"
                >
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {pain}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Entregáveis */}
      <section className="bg-navy-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-navy-950">O que entregamos</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {solution.deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm"
                >
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-navy-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-navy-950">Resultados esperados</h2>
            <ul className="mt-8 space-y-4">
              {solution.results.map((result) => (
                <li
                  key={result}
                  className="flex items-start gap-3 text-lg text-navy-700"
                >
                  <CheckCircle size={22} className="mt-0.5 shrink-0 text-accent" />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-navy-50 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-navy-950">
                Perguntas frequentes
              </h2>
              <div className="mt-8 space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-navy-950">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-navy-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-950 py-20">
        <div className="mx-auto max-w-3xl text-center px-4">
          <h2 className="text-3xl font-bold text-white">
            Pronto para transformar seu restaurante?
          </h2>
          <p className="mt-4 text-lg text-navy-300">
            Agende um diagnóstico gratuito. Em 30-45 minutos, analisamos as 8
            áreas do seu negócio e mostramos o caminho.
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
