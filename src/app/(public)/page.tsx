import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  DollarSign,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Building2,
  BadgeDollarSign,
  Award,
  Clock,
  Utensils,
  Beef,
  Pizza,
  Wine,
  Coffee,
  Store,
  ShoppingBag,
  TreePalm,
  ArrowUpRight,
  Quote,
  BarChart3,
  AlertTriangle,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { NUMBERS, SOLUTIONS, CASES, SEGMENTS, WHATSAPP_URL } from "@/lib/constants";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  StaggerContainerSlow,
  SlideUp,
  PulseGlow,
  CountUp,
  TextReveal,
  Marquee,
  LineReveal,
  ProgressBar,
  HoverCard,
  AnimatedBlob,
  MarqueeReverse,
} from "@/components/animations";

const solutionIcons: Record<string, React.ElementType> = {
  DollarSign,
  Target,
  Users,
  TrendingUp,
};

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

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-40 noise-overlay">
        <AnimatedBlob className="top-20 right-10 h-96 w-96 bg-accent/8" />
        <AnimatedBlob className="bottom-10 left-10 h-[500px] w-[500px] bg-navy-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.12)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(53,104,168,0.12)_0%,_transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <FadeInUp>
              <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-6 py-2.5 text-sm font-medium text-accent backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                14 anos estruturando negócios para crescer
              </p>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                Você é dono de negócio que fatura acima de{" "}
                <span className="serif-italic gradient-text">R$ 100k/mês?</span>
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-navy-300 sm:text-xl">
                Estruturamos restaurantes, bares, varejo e negócios turísticos
                para expandir com lucro e liberdade. Método{" "}
                <strong className="text-white">80% prático</strong> com
                resultados comprovados em mais de 120 negócios.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <PulseGlow className="rounded-2xl">
                  <Link
                    href="/diagnostico"
                    className="inline-flex items-center gap-2 rounded-2xl bg-accent px-10 py-5 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105 hover:shadow-2xl hover:shadow-accent/25"
                  >
                    Agende seu diagnóstico gratuito
                    <ArrowRight size={18} />
                  </Link>
                </PulseGlow>
                <Link
                  href="/metodo"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                >
                  Conheça o método
                </Link>
              </div>
            </FadeInUp>
          </div>

          {/* Trust Numbers */}
          <FadeInUp delay={0.5}>
            <div className="mx-auto mt-20 max-w-4xl">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { value: 120, suffix: "+", label: "Negócios transformados" },
                  { prefix: "R$ ", value: 40, suffix: "M+", label: "Lucratividade gerada" },
                  { value: 700, suffix: "+", label: "Líderes formados" },
                  { value: 14, suffix: " anos", label: "De experiência" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass rounded-2xl p-5 text-center transition-all duration-300 hover:bg-white/10"
                  >
                    <p className="text-2xl font-bold text-white sm:text-3xl">
                      <CountUp
                        target={item.value}
                        prefix={item.prefix}
                        suffix={item.suffix}
                      />
                    </p>
                    <p className="mt-1 text-xs text-navy-400 sm:text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== LOGOS DE CLIENTES — CARROSSEL ===== */}
      <section className="bg-white py-16 lg:py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <p className="mb-10 text-center text-sm font-bold uppercase tracking-widest text-navy-400">
              Empresas que já confiaram no IJA
            </p>
          </FadeInUp>
        </div>
        {/* Row 1 — scrolls left */}
        <Marquee speed={35} className="mb-6">
          <div className="flex items-center gap-8 px-4">
            {[
              "dom-arthur-esfiharia.jpg",
              "logo-dominos-pizza.png",
              "logobastidoresrestobar.png",
              "logo-bamba.jpg",
              "bom-de-boca-mix.jpg",
              "padaria-dimas.jpg",
              "logo-zecas.png",
              "babylon-búzios.png",
            ].map((logo) => (
              <div
                key={logo}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-2xl border border-navy-100/30 bg-cream/40 px-5 grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:border-accent/20 hover:shadow-md"
              >
                <Image
                  src={`/images/clientes/${logo}`}
                  alt={logo.replace(/\.(jpg|png|webp)$/, "").replace(/-/g, " ")}
                  width={100}
                  height={40}
                  className="h-12 w-auto max-w-[110px] object-contain"
                />
              </div>
            ))}
          </div>
        </Marquee>
        {/* Row 2 — scrolls right (reverse) */}
        <MarqueeReverse speed={40}>
          <div className="flex items-center gap-8 px-4">
            {[
              "logo-ad.jpg",
              "limpel.jpg",
              "nexoos.jpg",
              "in-buzios.png",
              "mg-global.jpg",
              "loganweb.jpg",
              "agatha-joalheria.jpg",
              "terra-viva.-produtos-naturais.jpg",
            ].map((logo) => (
              <div
                key={logo}
                className="flex h-20 w-40 shrink-0 items-center justify-center rounded-2xl border border-navy-100/30 bg-cream/40 px-5 grayscale opacity-50 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:border-accent/20 hover:shadow-md"
              >
                <Image
                  src={`/images/clientes/${logo}`}
                  alt={logo.replace(/\.(jpg|png|webp)$/, "").replace(/-/g, " ")}
                  width={100}
                  height={40}
                  className="h-12 w-auto max-w-[110px] object-contain"
                />
              </div>
            ))}
          </div>
        </MarqueeReverse>
      </section>

      {/* ===== MARKET DATA - EDITORIAL SECTION ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeInLeft>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">
                  O cenário do mercado
                </p>
                <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl lg:text-5xl">
                  Negócios que faturam alto mas{" "}
                  <span className="serif-italic gradient-text">lucram pouco</span>
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-navy-600">
                  Restaurantes, varejo e turismo movimentam centenas de bilhões
                  por ano no Brasil — mas a maioria dos donos não tem gestão profissional.
                </p>
                <div className="mt-8 space-y-2">
                  <div className="editorial-quote">
                    <p className="text-base text-navy-700 leading-relaxed">
                      <strong className="text-navy-950">Apenas 4 em cada 100 empresas</strong>{" "}
                      tem alguém com conhecimento de gestão no comando. Essa é exatamente a lacuna que o IJA preenche.
                    </p>
                  </div>
                </div>
                <Link
                  href="/sobre"
                  className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-accent transition-all hover:gap-3"
                >
                  Conheça nossa história
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="space-y-5">
                {[
                  { icon: AlertTriangle, value: "35%", label: "dos negócios fecham em até 2 anos", color: "text-red-500", bg: "bg-red-50" },
                  { icon: BarChart3, value: "90%+", label: "dos donos não sabem o lucro real do negócio", color: "text-amber-500", bg: "bg-amber-50" },
                  { icon: Users, value: "30-50%", label: "de rotatividade anual de equipe no setor", color: "text-blue-500", bg: "bg-blue-50" },
                  { icon: Zap, value: "96%", label: "das empresas não tem gestão profissional", color: "text-purple-500", bg: "bg-purple-50" },
                ].map((stat, index) => (
                  <HoverCard key={stat.label}>
                    <div className="flex items-center gap-5 rounded-2xl border border-navy-100/50 bg-white p-5 shadow-sm">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-navy-950">{stat.value}</p>
                        <p className="text-sm text-navy-600">{stat.label}</p>
                      </div>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ===== SEGMENTOS ===== */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">
                Quem atendemos
              </p>
              <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl lg:text-5xl">
                Segmentos que{" "}
                <span className="serif-italic gradient-text">transformamos</span>
              </h2>
              <p className="mt-5 text-lg text-navy-600">
                De restaurantes a negócios turísticos — estruturamos empresas
                que faturam acima de R$ 100k/mês para crescer com método.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:grid-cols-4">
            {SEGMENTS.map((segment) => {
              const Icon = segmentIcons[segment.slug] || Utensils;
              return (
                <StaggerItem key={segment.slug}>
                  <Link
                    href={`/segmentos/${segment.slug}`}
                    className="card-hover group flex flex-col items-center rounded-2xl border border-navy-100/50 bg-cream/50 p-6 text-center transition-all hover:bg-white hover:border-accent/20"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent transition-all duration-500 group-hover:from-accent group-hover:to-accent-dark group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/20 group-hover:rotate-3">
                      <Icon size={28} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-navy-950">
                      {segment.name}
                    </p>
                    <ChevronRight
                      size={14}
                      className="mt-2 text-navy-300 transition-all group-hover:text-accent group-hover:translate-x-1"
                    />
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== PROBLEMA ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(166,133,35,0.06)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                A causa número 1 de falência{" "}
                <span className="serif-italic gradient-text">não é a crise.</span>
              </h2>
              <p className="mt-8 text-lg text-navy-300 leading-relaxed sm:text-xl">
                É falta de gestão. O mercado cresce, mas quem não se
                profissionaliza fica para trás — ou fecha as portas.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainerSlow className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Clock,
                title: "Preso na operação",
                desc: "Trabalha 16h por dia, não tira férias e o negócio não funciona sem você. Virou refém da própria empresa.",
                stat: "85%",
                statLabel: "dos donos se sentem presos",
              },
              {
                icon: DollarSign,
                title: "Sem controle financeiro",
                desc: "Não sabe o lucro real do mês. Mistura contas pessoais com as da empresa. Precifica no feeling.",
                stat: "90%",
                statLabel: "não conhecem o lucro real",
              },
              {
                icon: TrendingUp,
                title: "Crescimento travado",
                desc: "Quer abrir a segunda unidade, mas sabe que será mais caos. Não tem processos para replicar.",
                stat: "65%",
                statLabel: "não sabem como escalar",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="glass group rounded-2xl p-8 transition-all duration-500 hover:bg-white/10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent transition-all group-hover:bg-accent/10">
                    <item.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-navy-300 leading-relaxed">{item.desc}</p>
                  <div className="mt-6 flex items-baseline gap-2 border-t border-white/5 pt-6">
                    <span className="text-3xl font-bold text-accent">{item.stat}</span>
                    <span className="text-xs text-navy-400">{item.statLabel}</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainerSlow>
        </div>
      </section>

      {/* ===== MÉTODO TRIPÉ ===== */}
      <section className="bg-cream py-24 lg:py-32 line-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">
                Metodologia proprietária
              </p>
              <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl lg:text-5xl">
                O Tripé da{" "}
                <span className="serif-italic gradient-text">Expansão</span>
              </h2>
              <p className="mt-5 text-lg text-navy-600">
                Três pilares que transformam negócios bagunçados em operações
                organizadas, lucrativas e replicáveis.
              </p>
            </div>
          </FadeInUp>

          <div className="mt-20">
            <StaggerContainerSlow className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Padronização de Processos",
                  desc: "Documentamos e estruturamos toda a operação. O negócio funciona sem depender de você.",
                  items: [
                    "Mapeamento de processos",
                    "Procedimentos operacionais",
                    "Checklists de execução",
                  ],
                  color: "from-accent to-gold-700",
                  borderColor: "border-accent/20",
                },
                {
                  number: "02",
                  title: "Universidade Corporativa",
                  desc: "Treinamento contínuo e estruturado. Sua equipe se torna autônoma e capacitada.",
                  items: [
                    "Matriz de competências",
                    "Programas de treinamento",
                    "Desenvolvimento de líderes",
                  ],
                  color: "from-navy-600 to-navy-800",
                  borderColor: "border-navy-200",
                },
                {
                  number: "03",
                  title: "Controle de Qualidade",
                  desc: "Monitoramento constante que garante o padrão em qualquer unidade.",
                  items: [
                    "KPIs e dashboards",
                    "Auditorias periódicas",
                    "Melhoria contínua",
                  ],
                  color: "from-emerald-500 to-emerald-700",
                  borderColor: "border-emerald-200",
                },
              ].map((pillar) => (
                <StaggerItem key={pillar.number}>
                  <div className={`card-hover group relative overflow-hidden rounded-3xl border ${pillar.borderColor} bg-white p-8 lg:p-10`}>
                    <div className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${pillar.color}`} />
                    <div
                      className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} text-white shadow-lg`}
                    >
                      <span className="text-xl font-bold">{pillar.number}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-navy-950">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 text-navy-600 leading-relaxed">{pillar.desc}</p>
                    <ul className="mt-8 space-y-3">
                      {pillar.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm text-navy-700"
                        >
                          <CheckCircle
                            size={16}
                            className="shrink-0 text-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainerSlow>
          </div>

          <FadeInUp>
            <div className="mt-16 text-center">
              <Link
                href="/metodo"
                className="group inline-flex items-center gap-2 rounded-2xl border border-navy-200 bg-white px-8 py-4 text-base font-semibold text-navy-950 shadow-sm transition-all hover:border-accent/30 hover:shadow-md hover:shadow-accent/5"
              >
                Conheça o método completo
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== SOLUÇÕES ===== */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">
                O que fazemos
              </p>
              <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl lg:text-5xl">
                Soluções para cada{" "}
                <span className="serif-italic gradient-text">fase</span> do seu
                negócio
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2">
            {SOLUTIONS.map((solution) => {
              const Icon = solutionIcons[solution.icon];
              return (
                <StaggerItem key={solution.slug}>
                  <Link
                    href={`/solucoes/${solution.slug}`}
                    className="card-hover group block overflow-hidden rounded-3xl border border-navy-100/50 bg-cream/30 transition-all hover:bg-white hover:border-accent/20"
                  >
                    <div className="p-8 lg:p-10">
                      <div className="flex items-start gap-5">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 text-accent transition-all duration-500 group-hover:from-accent group-hover:to-accent-dark group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/20 group-hover:scale-110">
                          <Icon size={28} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-navy-950 lg:text-2xl">
                            {solution.title}
                          </h3>
                          <p className="mt-3 text-navy-600 leading-relaxed">
                            {solution.description}
                          </p>
                          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                            Saiba mais
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== NÚMEROS COM COUNTERS ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(166,133,35,0.1)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Resultados que{" "}
                <span className="serif-italic gradient-text">falam por si</span>
              </h2>
              <p className="mt-5 text-lg text-navy-300">
                14 anos transformando restaurantes em negócios estruturados e lucrativos.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              {
                icon: Building2,
                target: 120,
                suffix: "+",
                label: "Negócios transformados",
              },
              {
                icon: BadgeDollarSign,
                prefix: "R$ ",
                target: 40,
                suffix: "M+",
                label: "Em lucratividade gerada",
              },
              {
                icon: Award,
                target: 700,
                suffix: "+",
                label: "Líderes qualificados",
              },
              {
                icon: Clock,
                target: 5000,
                suffix: "+",
                label: "Colaboradores treinados",
              },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="glass group rounded-3xl p-8 text-center transition-all duration-500 hover:bg-white/10">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-gold-700 text-white shadow-lg shadow-accent/20">
                    <stat.icon size={28} />
                  </div>
                  <p className="text-4xl font-bold text-white sm:text-5xl">
                    <CountUp
                      target={stat.target}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="mt-2 text-sm text-navy-300">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CASES ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">
                Cases de sucesso
              </p>
              <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl lg:text-5xl">
                Resultados reais de quem{" "}
                <span className="serif-italic gradient-text">confiou no IJA</span>
              </h2>
            </div>
          </FadeInUp>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {CASES.map((cs, index) => (
              <ScaleIn key={cs.slug} delay={index * 0.15}>
                <Link
                  href={`/cases/${cs.slug}`}
                  className="card-hover group block overflow-hidden rounded-3xl border border-navy-100/50 bg-white"
                >
                  {/* Header */}
                  <div className="relative bg-navy-950 p-8 lg:p-10 noise-overlay">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.1)_0%,_transparent_50%)]" />
                    <div className="relative">
                      <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
                        {cs.segment}
                      </span>
                      <h3 className="mt-3 text-2xl font-bold text-white lg:text-3xl">
                        {cs.name}
                      </h3>
                      <p className="mt-3 text-3xl font-bold gradient-text lg:text-4xl">
                        {cs.highlight}
                      </p>
                      <p className="mt-2 text-sm text-navy-400">
                        Em {cs.timeline}
                      </p>
                    </div>
                  </div>
                  {/* Before/After */}
                  <div className="grid grid-cols-2 divide-x divide-navy-100">
                    <div className="p-6 lg:p-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-navy-400">
                        Antes
                      </p>
                      <p className="mt-3 text-base font-bold text-navy-950">
                        {cs.before.units}
                      </p>
                      <p className="mt-1 text-sm text-navy-500 leading-relaxed">
                        {cs.before.situation}
                      </p>
                    </div>
                    <div className="p-6 lg:p-8">
                      <p className="text-xs font-bold uppercase tracking-widest text-accent">
                        Depois
                      </p>
                      <p className="mt-3 text-base font-bold text-navy-950">
                        {cs.after.units}
                      </p>
                      <p className="mt-1 text-sm text-navy-500 leading-relaxed">
                        {cs.after.situation}
                      </p>
                    </div>
                  </div>
                  {/* Quote */}
                  <div className="border-t border-navy-100 bg-cream/50 px-8 py-6 lg:px-10">
                    <div className="flex gap-3">
                      <Quote size={20} className="shrink-0 text-accent/30" />
                      <p className="text-sm italic text-navy-600 leading-relaxed">
                        {cs.quote}
                      </p>
                    </div>
                  </div>
                </Link>
              </ScaleIn>
            ))}
          </div>

          <FadeInUp>
            <div className="mt-16 text-center">
              <Link
                href="/cases"
                className="group inline-flex items-center gap-2 rounded-2xl border border-navy-200 bg-white px-8 py-4 text-base font-semibold text-navy-950 shadow-sm transition-all hover:border-accent/30 hover:shadow-md"
              >
                Ver todos os cases
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== DORES DO ICP / PROGRESS BARS ===== */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeInLeft>
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">
                  Diagnóstico do mercado
                </p>
                <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl">
                  As dores que mais{" "}
                  <span className="serif-italic gradient-text">travam</span> o crescimento
                </h2>
                <p className="mt-5 text-lg text-navy-600 leading-relaxed">
                  Mapeamos as principais dores dos donos de negócio.
                  O IJA resolve todas elas com o Tripé da Expansão.
                </p>
                <Link
                  href="/diagnostico"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
                >
                  Faça seu diagnóstico gratuito
                  <ArrowRight size={16} />
                </Link>
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="space-y-5 rounded-3xl border border-navy-100/50 bg-cream/50 p-8 lg:p-10">
                <ProgressBar value={90} label="Gestão financeira precária" delay={0} />
                <ProgressBar value={85} label="Preso na operação diária" delay={0.1} />
                <ProgressBar value={80} label="Problemas com mão de obra" delay={0.2} />
                <ProgressBar value={75} label="Sem processos padronizados" delay={0.3} />
                <ProgressBar value={70} label="Decisões sem base em dados" delay={0.4} />
                <ProgressBar value={65} label="Crescimento parece impossível" delay={0.5} />
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ===== DIFERENCIAL / WHY IJA ===== */}
      <section className="bg-cream-dark py-24 lg:py-32 dot-pattern-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">
                Por que o IJA
              </p>
              <h2 className="text-3xl font-bold text-navy-950 sm:text-4xl lg:text-5xl">
                Não somos mais uma{" "}
                <span className="serif-italic gradient-text">consultoria genérica</span>
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "80% Prático",
                desc: "Enquanto outros ensinam teoria, nós implementamos. Ferramentas simples, resultado real.",
              },
              {
                icon: Target,
                title: "Método Proprietário",
                desc: "O Tripé da Expansão é exclusivo do IJA. Testado e validado em 120+ negócios.",
              },
              {
                icon: Award,
                title: "14 Anos de Mercado",
                desc: "Experiência real no campo. Não aprendemos em livro — construímos na prática.",
              },
              {
                icon: TrendingUp,
                title: "Cases Comprovados",
                desc: "De 2 para 10 unidades. De hamburgueria local a franquia. Resultados documentados.",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="card-hover-subtle rounded-3xl bg-white p-8 shadow-sm">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <item.icon size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-navy-950">{item.title}</h3>
                  <p className="mt-3 text-sm text-navy-600 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-36 noise-overlay">
        <AnimatedBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(166,133,35,0.12)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(53,104,168,0.08)_0%,_transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                Seu negócio pode ser o próximo{" "}
                <span className="serif-italic gradient-text">caso de sucesso</span>
              </h2>
              <p className="mt-8 text-lg text-navy-300 leading-relaxed sm:text-xl">
                Agende um diagnóstico gratuito e descubra o que está travando o
                crescimento da sua empresa. Sessão de 30-45 minutos com análise
                personalizada das áreas críticas de gestão.
              </p>
              <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <PulseGlow className="rounded-2xl">
                  <Link
                    href="/diagnostico"
                    className="inline-flex items-center gap-2 rounded-2xl bg-accent px-10 py-5 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105 hover:shadow-2xl hover:shadow-accent/25"
                  >
                    Agendar diagnóstico gratuito
                    <ArrowRight size={18} />
                  </Link>
                </PulseGlow>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
                >
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>
    </>
  );
}
