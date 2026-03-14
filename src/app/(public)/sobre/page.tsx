import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, BadgeDollarSign, Award, Clock, MapPin } from "lucide-react";
import { NUMBERS, STATES } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem, CountUp } from "@/components/animations";

export const metadata = generatePageMetadata({
  title: "Sobre",
  description:
    "Conheça o Instituto João Alves: 14 anos transformando restaurantes em negócios estruturados e lucrativos. Fundado por João Pedro Alves em Cabo Frio, RJ.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Sobre", url: "/sobre" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative bg-navy-950 py-24 lg:py-32">
        <div className="noise-overlay" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <FadeInUp>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
                Quem somos
              </p>
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Instituto <span className="serif-italic gradient-text">João Alves</span>
              </h1>
              <p className="mt-6 text-lg text-navy-300">
                Consultoria especializada em estruturar restaurantes para expansão.
                14 anos de experiência prática no setor de food service.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <FadeInLeft>
              <div>
                <h2 className="text-3xl font-bold text-navy-950">
                  A história por trás da <span className="serif-italic gradient-text">missão</span>
                </h2>
                <div className="mt-6 space-y-4 text-navy-600">
                  <p>
                    O Instituto João Alves nasceu de uma constatação: a maioria dos
                    restaurantes no Brasil fecha as portas não por falta de talento
                    culinário ou dedicação, mas por <strong className="text-navy-950">falta de gestão</strong>.
                  </p>
                  <p>
                    Fundado por João Pedro Alves em Cabo Frio, Rio de Janeiro, o IJA
                    se especializou em um único segmento — <strong className="text-navy-950">restaurantes e food
                    service</strong> — porque acredita que profundidade supera amplitude.
                  </p>
                  <p>
                    São 14 anos trabalhando lado a lado com donos de restaurante,
                    implementando gestão de verdade: prática, direta, sem enrolação.
                    O resultado? Mais de 120 negócios transformados e mais de R$ 40
                    milhões em lucratividade gerada.
                  </p>
                </div>
              </div>
            </FadeInLeft>
            <FadeInRight>
              <div className="overflow-hidden rounded-3xl bg-white">
                {/* Foto do CEO */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/equipe/joao-pedro-alves-dark.jpg"
                    alt="João Pedro Alves — Fundador do Instituto João Alves"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5 sm:p-8 lg:p-10">
                  <h3 className="text-xl font-bold text-navy-950">
                    João Pedro Alves
                  </h3>
                  <p className="text-accent font-medium">
                    Fundador &amp; Consultor Principal
                  </p>
                  <div className="mt-5 space-y-3 text-navy-600">
                    <p>
                      Com mais de 14 anos de experiência exclusiva no setor de food
                      service, João Pedro desenvolveu o{" "}
                      <strong className="text-navy-950">Método Tripé da Expansão</strong> —
                      uma metodologia proprietária testada em mais de 120 restaurantes.
                    </p>
                    <p>
                      Sua abordagem é{" "}
                      <strong className="text-navy-950">80% prática e 20% teoria</strong>, o inverso das
                      consultorias tradicionais. Ele acredita que donos de restaurante
                      precisam de implementação, não de mais aulas.
                    </p>
                    <p>
                      Experiência validada com franquias — o modelo mais exigente em
                      padronização e escalabilidade do mercado.
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-sm text-navy-500">
                    <MapPin size={16} />
                    Cabo Frio, RJ — Atua em {STATES}
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Tese */}
      <section className="bg-cream-dark py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-navy-950">
                &ldquo;Apenas 4 em 100 empresas têm alguém com conhecimento de <span className="serif-italic gradient-text">gestão</span>&rdquo;
              </h2>
              <p className="mt-6 text-lg text-navy-600">
                O empreendedor brasileiro tem garra, trabalha duro e conhece seu produto.
                Mas ninguém ensina gestão de forma prática. As instituições são teóricas,
                os cursos são genéricos, e as consultorias cobram fortunas para entregar
                relatórios bonitos.
              </p>
              <p className="mt-4 text-lg text-navy-600">
                O IJA existe para mudar isso. Somos o parceiro que{" "}
                <strong className="text-navy-950">implementa junto</strong>, usando ferramentas simples
                que qualquer dono de restaurante consegue usar.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Números */}
      <section className="bg-navy-950 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <StaggerItem>
              <div className="text-center">
                <Building2 size={28} className="mx-auto mb-2 text-accent" />
                <p className="text-3xl font-bold text-white">
                  <CountUp target={120} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-navy-300">Negócios transformados</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center">
                <BadgeDollarSign size={28} className="mx-auto mb-2 text-accent" />
                <p className="text-3xl font-bold text-white">
                  <CountUp target={40} prefix="R$ " suffix="M+" />
                </p>
                <p className="mt-1 text-sm text-navy-300">Em lucratividade gerada</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center">
                <Award size={28} className="mx-auto mb-2 text-accent" />
                <p className="text-3xl font-bold text-white">
                  <CountUp target={700} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-navy-300">Líderes qualificados</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center">
                <Clock size={28} className="mx-auto mb-2 text-accent" />
                <p className="text-3xl font-bold text-white">
                  <CountUp target={14} suffix=" anos" />
                </p>
                <p className="mt-1 text-sm text-navy-300">De experiência</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-center text-3xl font-bold text-navy-950">
              Nossos <span className="serif-italic gradient-text">valores</span>
            </h2>
          </FadeInUp>
          <StaggerContainer className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Liberdade",
                desc: "Acreditamos que o dono de restaurante merece ter tempo para viver. Nosso trabalho liberta ele da operação.",
              },
              {
                title: "Resultados práticos",
                desc: "Não entregamos relatórios bonitos. Entregamos implementação real, com ferramentas que funcionam no dia a dia.",
              },
              {
                title: "Qualidade de vida",
                desc: "Lucro sem qualidade de vida não é sucesso. Estruturamos o negócio para que o dono tenha ambos.",
              },
            ].map((value) => (
              <StaggerItem key={value.title}>
                <div className="rounded-3xl border border-navy-100/50 p-8">
                  <h3 className="text-lg font-bold text-navy-950">{value.title}</h3>
                  <p className="mt-2 text-navy-600">{value.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-dark py-24 lg:py-32">
        <div className="mx-auto max-w-3xl text-center px-4">
          <FadeInUp>
            <h2 className="text-3xl font-bold text-navy-950">
              Quer conhecer nosso <span className="serif-italic gradient-text">método</span>?
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Descubra como o Tripé da Expansão transforma restaurantes em negócios
              estruturados e prontos para crescer.
            </p>
            <Link
              href="/metodo"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Conheça o Tripé da Expansão
              <ArrowRight size={18} />
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
