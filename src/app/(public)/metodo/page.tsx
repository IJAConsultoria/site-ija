import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Cog,
  GraduationCap,
  ShieldCheck,
  BarChart3,
  DollarSign,
  Users,
  Megaphone,
  ShoppingCart,
  Building,
  Scale,
  Cpu,
  Target,
} from "lucide-react";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/animations";

export const metadata = generatePageMetadata({
  title: "Método Tripé da Expansão",
  description:
    "Conheça o Tripé da Expansão: Padronização de Processos, Universidade Corporativa e Controle de Qualidade. Metodologia proprietária do Instituto João Alves para expandir restaurantes.",
  path: "/metodo",
});

const areas = [
  { icon: Target, name: "Planejamento Estratégico" },
  { icon: DollarSign, name: "Finanças" },
  { icon: Users, name: "RH e Pessoas" },
  { icon: Megaphone, name: "Marketing" },
  { icon: ShoppingCart, name: "Vendas" },
  { icon: Building, name: "Estoque e Produção" },
  { icon: Cpu, name: "Infraestrutura" },
  { icon: Scale, name: "Jurídico" },
];

export default function MetodoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Método", url: "/metodo" },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative bg-navy-950 py-24 lg:py-32">
        <div className="noise-overlay" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
              Metodologia proprietária
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Tripé da <span className="serif-italic gradient-text">Expansão</span>
            </h1>
            <p className="mt-6 text-lg text-navy-300">
              O método que já transformou mais de 120 restaurantes em negócios
              organizados, lucrativos e prontos para virar rede.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* O Problema */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-navy-950">O problema</h2>
            <div className="mt-6 space-y-4 text-lg text-navy-600">
              <p>
                O empreendedor de food service tem garra, conhece seu produto e
                trabalha incansavelmente. Mas ninguém nunca ensinou{" "}
                <strong className="text-navy-950">gestão de forma prática</strong>.
              </p>
              <p>
                Instituições de ensino são teóricas. Cursos online são genéricos.
                Consultorias corporativas cobram fortunas para entregar relatórios
                que ficam na gaveta.
              </p>
              <p>
                O resultado? Restaurantes que fecham, donos que trabalham 16 horas
                por dia sem saber seu lucro, e crescimento que nunca acontece.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* A Solução — Os 3 Pilares */}
      <section className="bg-cream-dark py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl">
              A solução: três pilares <span className="serif-italic gradient-text">interdependentes</span>
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Assim como um tripé só fica estável quando os três pés estão bem
              apoiados, sua empresa só expande quando esses três pilares trabalham
              juntos.
            </p>
          </FadeInUp>

          {/* Pilar 1 */}
          <div className="mt-20 grid items-start gap-12 lg:grid-cols-2">
            <FadeInLeft>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-accent text-white">
                  <Cog size={28} />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent">Pilar 01</p>
                  <h3 className="text-2xl font-bold text-navy-950">
                    Padronização de Processos
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-lg text-navy-600">
                Documentamos e estruturamos toda a operação do seu restaurante.
                O objetivo é tornar tudo repetível, documentado e escalável — para
                que o negócio funcione <strong className="text-navy-950">sem depender de você</strong>.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Mapeamento completo de processos críticos",
                  "Procedimentos operacionais documentados",
                  "Checklists de execução para cada função",
                  "Guias de qualidade para cada área",
                  "Workflow visual de como o trabalho flui",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy-700">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeInLeft>
            <FadeInRight>
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h4 className="font-semibold text-navy-950">O resultado</h4>
                <ul className="mt-4 space-y-3 text-navy-600">
                  <li>Qualidade previsível e consistente</li>
                  <li>Menor tempo de execução sem retrabalho</li>
                  <li>Novos funcionários aprendem muito mais rápido</li>
                  <li>Crescimento sem sobrecarregar os proprietários</li>
                  <li>Novos gerentes confiam que processos garantem qualidade</li>
                </ul>
              </div>
            </FadeInRight>
          </div>

          {/* Pilar 2 */}
          <div className="mt-20 grid items-start gap-12 lg:grid-cols-2">
            <FadeInRight className="lg:order-2">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-accent text-white">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent">Pilar 02</p>
                  <h3 className="text-2xl font-bold text-navy-950">
                    Universidade Corporativa
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-lg text-navy-600">
                Criamos um sistema contínuo de aprendizado dentro da sua empresa.
                Não é treinamento pontual — é uma{" "}
                <strong className="text-navy-950">cultura de desenvolvimento</strong> que
                transforma sua equipe em um ativo que cresce em valor.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Matriz de competências por posição",
                  "Planos de desenvolvimento individual",
                  "Calendário estruturado de treinamentos",
                  "Programa de desenvolvimento de líderes",
                  "Mentoria e coaching interno",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy-700">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeInRight>
            <FadeInLeft className="lg:order-1">
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h4 className="font-semibold text-navy-950">O resultado</h4>
                <ul className="mt-4 space-y-3 text-navy-600">
                  <li>Equipe engajada com oportunidades de crescimento</li>
                  <li>Redução de turnover — pessoas veem carreira</li>
                  <li>Desempenho individual constantemente melhorando</li>
                  <li>Pipeline de líderes desenvolvidos internamente</li>
                  <li>Capacidade de escalar com qualidade</li>
                </ul>
              </div>
            </FadeInLeft>
          </div>

          {/* Pilar 3 */}
          <div className="mt-20 grid items-start gap-12 lg:grid-cols-2">
            <FadeInLeft>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-accent text-white">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-sm font-medium text-accent">Pilar 03</p>
                  <h3 className="text-2xl font-bold text-navy-950">
                    Controle de Qualidade
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-lg text-navy-600">
                Sistema contínuo de monitoramento e melhoria. Não basta padronizar
                e treinar — é preciso{" "}
                <strong className="text-navy-950">garantir que os padrões sejam seguidos</strong>{" "}
                e que os resultados estejam sendo alcançados.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Definição de KPIs específicos para o negócio",
                  "Dashboards de monitoramento em tempo real",
                  "Rotina de análise de resultados",
                  "Auditorias periódicas de processos",
                  "Protocolo de correção de desvios",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-navy-700">
                    <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeInLeft>
            <FadeInRight>
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h4 className="font-semibold text-navy-950">O resultado</h4>
                <ul className="mt-4 space-y-3 text-navy-600">
                  <li>Visibilidade total sobre a performance do negócio</li>
                  <li>Problemas identificados antes de virarem crise</li>
                  <li>Decisões baseadas em dados, não suposições</li>
                  <li>Melhoria contínua e sistemática</li>
                  <li>Padrão mantido em qualquer unidade</li>
                </ul>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* 8 Áreas */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl">
              8 áreas de gestão que <span className="serif-italic gradient-text">transformamos</span>
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              O Tripé da Expansão é aplicado em cada uma dessas áreas, cobrindo
              todas as frentes do seu negócio.
            </p>
          </FadeInUp>
          <StaggerContainer className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {areas.map((area) => (
              <StaggerItem key={area.name}>
                <div className="flex flex-col items-center rounded-3xl border border-navy-100/50 p-6 text-center transition-colors hover:border-accent/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <area.icon size={24} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-navy-950">
                    {area.name}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Resultado */}
      <section className="relative bg-navy-950 py-24 lg:py-32">
        <div className="noise-overlay" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Modelo estruturado e replicável em até{" "}
              <span className="serif-italic gradient-text">12 meses</span>
            </h2>
            <p className="mt-4 text-lg text-navy-300">
              80% prática, 20% teoria. Ferramentas simples. Implementação real.
              Sem MBA, sem ERP caro, sem complicação — somente o que importa e
              gera resultados.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Veja como aplicamos
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/diagnostico"
                className="inline-flex items-center gap-2 rounded-2xl border border-navy-600 px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-medium text-white transition-colors hover:border-navy-400 hover:bg-navy-900"
              >
                Diagnóstico gratuito
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
