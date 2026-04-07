import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Trophy,
  Users,
  Clock,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Sparkles,
  X,
  Check,
  Calendar,
  Briefcase,
  BookOpen,
  Headphones,
  Heart,
  Crown,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  AnimatedBlob,
} from "@/components/animations";

const WHATSAPP_URL =
  "https://wa.me/5522999746006?text=Quero%20entrar%20na%20Mentoria%20de%20Gest%C3%A3o%20Estrat%C3%A9gica%20Financeira%20com%20a%20condi%C3%A7%C3%A3o%20especial%20da%20live!";

export const metadata = generatePageMetadata({
  title: "Mentoria de Gestão Estratégica Financeira",
  description:
    "Estruture as finanças da sua empresa e tome decisões estratégicas para otimizar o lucro do seu negócio. Aumentamos significativamente o lucro de 100% dos nossos clientes.",
  path: "/mentoria",
});

const inclusos = [
  {
    icon: BookOpen,
    title: "Plataforma exclusiva",
    desc: "Acesso a todo conteúdo, materiais e ferramentas em um só lugar.",
  },
  {
    icon: Calendar,
    title: "Sessão de mentoria semanal",
    desc: "Encontros ao vivo toda semana com João Pedro Alves para tirar dúvidas e ajustar a estratégia.",
  },
  {
    icon: Briefcase,
    title: "Projeto de Consultoria personalizado",
    desc: "Plano sob medida para a realidade da sua empresa, não uma receita genérica.",
  },
  {
    icon: Headphones,
    title: "Acompanhamento diário",
    desc: "Você nunca fica sozinho. Suporte contínuo para garantir resultados.",
  },
];

const bonus = [
  {
    icon: Users,
    title: "Estruturação completa de Recursos Humanos e Processos",
    desc: "Resolva 100% dos seus problemas com mão de obra e conquiste mais liberdade como empresário.",
    valor: "R$ 4.800/mês",
  },
  {
    icon: TrendingUp,
    title: "Estruturação completa de Marketing e Vendas",
    desc: "Aprenda e coloque em prática as melhores estratégias para atrair, conquistar e reter clientes.",
    valor: "R$ 4.800/mês",
  },
  {
    icon: Sparkles,
    title: "Licença e Assinatura de Ferramentas Digitais",
    desc: "Ferramentas completas para gestão empresarial, todas com análise e otimização por IA.",
    valor: "R$ 2.000/mês",
  },
  {
    icon: Crown,
    title: "Universidade do Líder",
    desc: "70% de tudo que acontece é reflexo dos líderes. Quando um líder melhora, todos melhoram.",
    valor: "R$ 4.800/mês",
  },
  {
    icon: BookOpen,
    title: "Acervo de conteúdos e cursos de alto impacto",
    desc: "Centenas de horas de conteúdo para otimizar lucro, produtividade e resultados.",
    valor: "+R$ 2.000/mês",
  },
  {
    icon: Heart,
    title: "Clube de Crescimento de Negócios",
    desc: "Centenas de líderes de negócios contribuindo simultaneamente para o crescimento uns dos outros.",
    valor: "+R$ 2.000/mês",
  },
  {
    icon: Award,
    title: "Desconto e gratuidade em todos os eventos do ano",
    desc: "Acesso aos eventos presenciais e online de gestão empresarial do IJA.",
    valor: "+R$ 6.000",
  },
];

const comparativo = [
  {
    criterio: "Aprendizado",
    curso: "Você aprende a fazer sozinho",
    mentoria: "Você aprende fazendo na prática, com acompanhamento especializado",
    terceirizacao: "Você não aprende a fazer",
  },
  {
    criterio: "Garantia de Resultado",
    curso: "Não é garantido",
    mentoria: "Garantido com suporte prático",
    terceirizacao: "É garantido, mas dependente de terceiros",
  },
  {
    criterio: "Autonomia",
    curso: "Alta, porém sem experiência prática",
    mentoria: "Alta e sustentada pelo conhecimento aplicado",
    terceirizacao: "Nenhuma — você se torna refém de terceiros",
  },
  {
    criterio: "Crescimento Sustentável",
    curso: "Lento, depende de tentativa e erro",
    mentoria: "Rápido, estruturado e mensurável",
    terceirizacao: "Limitado — depende dos outros",
  },
  {
    criterio: "Custo x Benefício",
    curso: "Baixo investimento, baixo retorno",
    mentoria: "Investimento inteligente, alto retorno",
    terceirizacao: "Alto custo, dependência contínua",
  },
];

const numeros = [
  { valor: "+14", label: "anos de experiência" },
  { valor: "+500", label: "projetos realizados" },
  { valor: "+130", label: "clientes atendidos" },
  { valor: "+700", label: "líderes qualificados" },
  { valor: "+R$ 40M", label: "em lucratividade gerada" },
  { valor: "4 estados", label: "RJ · SP · ES · RS" },
];

export default function MentoriaPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-20 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.2)_0%,_transparent_60%)]" />
        <AnimatedBlob className="absolute -top-40 -right-40 h-96 w-96 bg-accent/10" />
        <AnimatedBlob className="absolute -bottom-40 -left-40 h-96 w-96 bg-accent/5" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-accent">
              <Sparkles size={16} />
              Apresentação exclusiva
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Mentoria de{" "}
              <span className="serif-italic gradient-text">
                Gestão Estratégica Financeira
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-navy-300 lg:text-xl">
              Como estruturar todas as finanças da sua empresa e tomar decisões
              estratégicas para{" "}
              <strong className="text-white">otimizar o lucro</strong> do seu
              negócio.
            </p>

            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-3xl font-bold text-accent">100%</p>
                <p className="mt-1 text-sm text-navy-300">
                  dos clientes aumentaram o lucro
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-3xl font-bold text-accent">+R$ 40M</p>
                <p className="mt-1 text-sm text-navy-300">
                  em lucratividade gerada
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <p className="text-3xl font-bold text-accent">+130</p>
                <p className="mt-1 text-sm text-navy-300">clientes em 4 estados</p>
              </div>
            </div>

          </FadeInUp>
        </div>
      </section>

      {/* ===== O QUE ESTÁ INCLUSO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(166,133,35,0.08)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                O que você recebe
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Tudo que você precisa para{" "}
                <span className="serif-italic gradient-text">
                  transformar
                </span>{" "}
                seu negócio
              </h2>
              <p className="mt-4 text-lg text-navy-300">
                Método prático e útil que gera resultados na hora. Sem
                enrolação. De forma que qualquer empresário consegue colocar em
                prática.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {inclusos.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-accent/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                    <item.icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-300">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== QUEM É O MENTOR ===== */}
      <section className="bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            {/* Foto */}
            <div className="lg:col-span-4 flex justify-center">
              <FadeInLeft>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/0 blur-2xl" />
                  <img
                    src="/images/equipe/joao-pedro-alves-dark.jpg"
                    alt="João Pedro Alves"
                    className="relative h-80 w-80 lg:h-96 lg:w-96 rounded-3xl object-cover border-4 border-accent/30 shadow-2xl"
                  />
                </div>
              </FadeInLeft>
            </div>

            {/* Conteúdo */}
            <div className="lg:col-span-8">
            <FadeInLeft>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Quem é o seu mentor
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                João Pedro{" "}
                <span className="serif-italic gradient-text">Alves</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-navy-300">
                Fundador e CEO do <strong className="text-white">Instituto João Alves</strong>,
                empresa especializada em estruturar negócios para expansão e
                franquias. Criador do Método Tripé da Expansão. Professor de
                Administração em 5 instituições no RJ. Consultor e estrategista
                em expansão empresarial há mais de 14 anos.
              </p>

              <ul className="mt-8 space-y-3 text-navy-300">
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                  Formação e Pós-graduação em Administração (IDE)
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                  Gestão Empresarial (IMB)
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                  Docência Corporativa (Senac Rio)
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={18} className="mt-0.5 shrink-0 text-accent" />
                  Practitioner em PNL e Hipnólogo (IBND)
                </li>
              </ul>
            </FadeInLeft>
            </div>
          </div>

          {/* Números - linha completa abaixo */}
          <FadeInUp>
            <div className="mt-16 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {numeros.map((n) => (
                <div
                  key={n.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                >
                  <p className="text-3xl font-bold text-accent lg:text-4xl">
                    {n.valor}
                  </p>
                  <p className="mt-2 text-xs text-navy-300">{n.label}</p>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== MENTORIA X CURSO X TERCEIRIZAÇÃO ===== */}
      <section className="relative overflow-hidden bg-navy-900 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(166,133,35,0.08)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Por que mentoria?
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Mentoria{" "}
                <span className="serif-italic gradient-text">vs</span> Curso{" "}
                <span className="serif-italic gradient-text">vs</span>{" "}
                Terceirização
              </h2>
              <p className="mt-4 text-lg text-navy-300">
                Veja por que a mentoria é o caminho mais inteligente para levar
                sua empresa do 0% ao 100%.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp>
            <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-2xl shadow-black/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-black/40 text-white">
                      <th className="px-6 py-5 text-sm font-bold uppercase tracking-widest">
                        Critério
                      </th>
                      <th className="px-6 py-5 text-sm font-bold uppercase tracking-widest">
                        Curso
                      </th>
                      <th className="bg-accent px-6 py-5 text-sm font-bold uppercase tracking-widest">
                        Mentoria IJA
                      </th>
                      <th className="px-6 py-5 text-sm font-bold uppercase tracking-widest">
                        Terceirização
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparativo.map((row, i) => (
                      <tr
                        key={row.criterio}
                        className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}
                      >
                        <td className="border-t border-white/10 px-6 py-5 text-sm font-bold text-white">
                          {row.criterio}
                        </td>
                        <td className="border-t border-white/10 px-6 py-5 text-sm text-navy-300">
                          {row.curso}
                        </td>
                        <td className="border-t border-white/10 bg-accent/10 px-6 py-5 text-sm font-medium text-white">
                          {row.mentoria}
                        </td>
                        <td className="border-t border-white/10 px-6 py-5 text-sm text-navy-300">
                          {row.terceirizacao}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== BÔNUS ===== */}
      <section className="bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(166,133,35,0.1)_0%,_transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-accent">
                <Trophy size={16} />
                Bônus exclusivos
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Tudo que você ainda recebe{" "}
                <span className="serif-italic gradient-text">de bônus</span>
              </h2>
              <p className="mt-4 text-lg text-navy-300">
                Cada um desses bônus, contratado avulso, custaria uma fortuna.
                Na mentoria, vem tudo junto.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="mx-auto mt-16 max-w-4xl space-y-5">
            {bonus.map((b, i) => (
              <StaggerItem key={b.title}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-accent/10 sm:p-8">
                  {/* Glow sutil no hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/[0.03] via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                    {/* Ícone grande + número */}
                    <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:gap-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent/5 text-accent ring-1 ring-accent/20 sm:h-20 sm:w-20">
                        <b.icon size={28} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent/80">
                        Bônus {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white sm:text-2xl">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-navy-300 sm:text-base">
                        {b.desc}
                      </p>
                    </div>

                    {/* Valor */}
                    <div className="shrink-0 self-start sm:self-center">
                      <div className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-accent/70">
                          Valor
                        </p>
                        <p className="mt-0.5 text-base font-bold text-accent sm:text-lg">
                          {b.valor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Stack de valor */}
          <FadeInUp>
            <div className="mx-auto mt-16 max-w-3xl rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-accent/5 p-8 text-center lg:p-12">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Valor total dos bônus
              </p>
              <p className="mt-3 text-5xl font-bold text-white lg:text-6xl">
                R$ 31.200
                <span className="text-2xl text-navy-300">/mês</span>
              </p>
              <p className="mt-3 text-navy-300">
                Se você contratasse cada um desses bônus separadamente
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== OFERTA ===== */}
      <section
        id="oferta"
        className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 py-24 lg:py-32 noise-overlay"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(166,133,35,0.15)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/15 px-5 py-2 text-sm font-bold uppercase tracking-widest text-red-300">
                <Zap size={16} />
                Condição especial só para hoje
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Pílula vermelha ou{" "}
                <span className="serif-italic gradient-text">pílula azul</span>?
              </h2>
              <p className="mt-4 text-lg text-navy-300">
                Você pode continuar fazendo do jeito que sempre fez. Ou pode
                tomar uma decisão hoje que muda o futuro do seu negócio.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp>
            <div className="mt-16 overflow-hidden rounded-3xl border-2 border-accent/60 bg-white/[0.03] backdrop-blur-md shadow-2xl shadow-accent/10">
              {/* Header */}
              <div className="bg-black/40 px-8 py-6 text-center lg:px-12 border-b border-accent/20">
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Mentoria de Gestão Estratégica Financeira
                </p>
                <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Investimento avulso desta mentoria
                </p>
              </div>

              {/* Pricing */}
              <div className="px-8 py-12 text-center lg:px-12 lg:py-16">
                {/* Preço cheio */}
                <div className="mb-8">
                  <p className="text-sm font-medium text-navy-400">
                    De{" "}
                    <span className="line-through decoration-2">
                      R$ 4.800/mês
                    </span>
                  </p>
                </div>

                {/* Preço live */}
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-navy-300">
                    Por hoje, na live, apenas
                  </p>
                  <p className="mt-2 text-2xl font-bold text-navy-400 line-through decoration-2">
                    R$ 2.500/mês
                  </p>
                </div>

                {/* Preço PIX */}
                <div className="rounded-3xl border-2 border-accent bg-gradient-to-br from-accent/10 to-accent/[0.03] p-8 lg:p-10 shadow-inner shadow-accent/10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-navy-950">
                    <Sparkles size={14} />
                    PIX agora · 20% OFF
                  </div>
                  <p className="mt-5 text-sm font-medium text-navy-300">
                    Para quem fizer o PIX agora durante a live
                  </p>
                  <p className="mt-3 text-6xl font-bold text-white sm:text-7xl">
                    R$ 1.990
                    <span className="text-2xl font-medium text-navy-400">
                      /mês
                    </span>
                  </p>
                  <p className="mt-3 text-sm text-navy-300">
                    Demais formas de pagamento: R$ 2.500/mês
                  </p>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-accent px-10 py-5 text-lg font-bold text-navy-950 transition-all hover:bg-accent-dark hover:scale-105 hover:shadow-2xl hover:shadow-accent/40"
                  >
                    Quero entrar agora
                    <ArrowRight size={22} />
                  </a>
                  <p className="mt-4 text-xs text-navy-400">
                    Vagas limitadas · Atendimento direto via WhatsApp
                  </p>
                </div>

                {/* Detalhes do contrato */}
                <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        12 meses
                      </p>
                      <p className="text-xs text-navy-300">
                        Tempo para transformar sua empresa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        4 meses mínimo
                      </p>
                      <p className="text-xs text-navy-300">
                        Depois é só avisar com 30 dias
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-sm font-bold text-white">
                        100% garantido
                      </p>
                      <p className="text-xs text-navy-300">
                        Devolvemos seu dinheiro
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== GARANTIA ===== */}
      <section className="bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/20 ring-4 ring-accent/10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
                <Shield size={32} />
              </div>
            </div>
            <h2 className="mt-8 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Garantia{" "}
              <span className="serif-italic gradient-text">100%</span> sobre o
              investimento
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-300">
              Se você fizer tudo exatamente como te orientarmos, seguir todas as
              diretrizes, e <strong className="text-white">não tiver
              nenhuma melhora de resultado</strong> no seu negócio, devolvemos{" "}
              <strong className="text-accent">100% do que você investiu</strong>.
            </p>
            <p className="mt-6 text-base text-navy-400">
              Não temos medo do compromisso porque sabemos que o método funciona.
              Temos o compromisso e a confiança de gerar resultados.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ===== PROVA SOCIAL ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(166,133,35,0.08)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Resultados reais
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                +130 empresas{" "}
                <span className="serif-italic gradient-text">
                  transformadas
                </span>
              </h2>
              <p className="mt-4 text-lg text-navy-300">
                Atendemos negócios em 4 estados do Brasil. Não é teoria, é
                resultado real, testado e replicável.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                titulo: "Outros 500",
                segmento: "Hamburgueria",
                resultado: "De 2 para 10 unidades em 4 anos",
                quote:
                  "O IJA nos deu a estrutura para crescer sem perder a qualidade.",
              },
              {
                titulo: "Heróis Super Burguer",
                segmento: "Hamburgueria",
                resultado: "Franqueada em apenas 13 meses",
                quote:
                  "Em 13 meses, saímos de uma hamburgueria local para uma marca franqueada.",
              },
              {
                titulo: "+128 outros negócios",
                segmento: "Diversos segmentos",
                resultado: "100% aumentaram o lucro",
                quote:
                  "Atendemos restaurantes, varejo, food service, turismo e mais.",
              },
            ].map((c) => (
              <StaggerItem key={c.titulo}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:border-accent/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-accent/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">
                    {c.segmento}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-white">
                    {c.titulo}
                  </h3>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
                    <Trophy size={12} />
                    {c.resultado}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-navy-300 italic">
                    &ldquo;{c.quote}&rdquo;
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(166,133,35,0.2)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 bg-accent/10" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">
              Última chamada
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Você fará em <span className="serif-italic gradient-text">1 ano</span>{" "}
              o que não faria em 10
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-300">
              Este é o ano de transformação do seu negócio. A condição especial
              da live é única. A garantia é total. A escolha é sua.
            </p>

            <div className="mx-auto mt-10 max-w-md rounded-3xl border-2 border-accent/40 bg-white/5 p-8 backdrop-blur-sm">
              <p className="text-sm font-medium text-navy-300">
                PIX agora durante a live
              </p>
              <p className="mt-2 text-5xl font-bold text-white">
                R$ 1.990
                <span className="text-xl font-medium text-navy-400">/mês</span>
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-5 text-base font-bold text-white transition-all hover:bg-accent-dark hover:scale-105 hover:shadow-2xl hover:shadow-accent/30 sm:text-lg"
              >
                Garantir minha vaga
                <ArrowRight size={20} />
              </a>
              <p className="mt-4 text-xs text-navy-400">
                Atendimento direto via WhatsApp · Vagas limitadas
              </p>
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-sm text-navy-400">
              Condição única:{" "}
              <strong className="text-white">querer realmente o crescimento do seu negócio ainda em 2026</strong>.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ===== RODAPÉ MINIMALISTA ===== */}
      <footer className="bg-navy-950 py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-navy-400">
            Instituto João Alves — Consultoria Empresarial
          </p>
          <p className="mt-2 text-xs text-navy-500">
            Cabo Frio, RJ · (22) 99974-6006 ·{" "}
            <Link href="/" className="text-accent hover:text-accent-dark">
              ijaconsultoria.com.br
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
