"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  CheckCircle,
  Zap,
  Shield,
  Trophy,
  Users,
  Clock,
  TrendingUp,
  Sparkles,
  Calendar,
  Briefcase,
  BookOpen,
  Headphones,
  Heart,
  Crown,
  DollarSign,
  Award,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5522999746006?text=Quero%20entrar%20na%20Mentoria%20de%20Gest%C3%A3o%20Estrat%C3%A9gica%20Financeira%20com%20a%20condi%C3%A7%C3%A3o%20especial%20da%20live!";

const TOTAL_SLIDES = 17;

export default function MentoriaPresentation() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    const target = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
    const slide = document.getElementById(`slide-${target}`);
    if (slide) {
      slide.scrollIntoView({ behavior: "smooth" });
      setCurrent(target);
    }
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Detect current slide on scroll
  useEffect(() => {
    const onScroll = () => {
      const slides = document.querySelectorAll("[data-slide]");
      const scrollY = window.scrollY + window.innerHeight / 2;
      slides.forEach((slide, i) => {
        const rect = (slide as HTMLElement).offsetTop;
        const height = (slide as HTMLElement).offsetHeight;
        if (scrollY >= rect && scrollY < rect + height) {
          setCurrent(i);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-navy-950 text-white snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* ============ SLIDE 1 — CAPA ============ */}
      <Slide id={0}>
        <div className="text-center max-w-6xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-accent">
            <Sparkles size={18} />
            Apresentação exclusiva
          </div>
          <h1 className="mt-10 text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-8xl">
            Mentoria de
            <br />
            <span className="serif-italic gradient-text">
              Gestão Estratégica
            </span>
            <br />
            <span className="serif-italic gradient-text">Financeira</span>
          </h1>
          <p className="mx-auto mt-10 max-w-3xl text-xl leading-relaxed text-navy-300 lg:text-2xl">
            Como estruturar todas as finanças da sua empresa e tomar decisões
            estratégicas para <strong className="text-white">otimizar o lucro</strong>.
          </p>
          <div className="mt-16 flex items-center justify-center gap-3 text-navy-400">
            <ArrowDown size={20} className="animate-bounce" />
            <span className="text-sm">Use as setas do teclado para navegar</span>
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 2 — RESULTADOS ============ */}
      <Slide id={1}>
        <div className="text-center max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            O que entregamos
          </p>
          <h2 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-7xl">
            Aumentamos o lucro de{" "}
            <span className="serif-italic gradient-text">100%</span>
            <br />
            dos nossos clientes
          </h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <BigStat valor="100%" label="dos clientes aumentaram o lucro" />
            <BigStat valor="+R$ 40M" label="em lucratividade gerada" />
            <BigStat valor="+130" label="empresas em 4 estados" />
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 3 — QUEM É O MENTOR ============ */}
      <Slide id={2}>
        <div className="grid items-center gap-16 lg:grid-cols-2 max-w-7xl">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
              Quem é o seu mentor
            </p>
            <h2 className="mt-6 text-5xl font-bold lg:text-7xl">
              João Pedro
              <br />
              <span className="serif-italic gradient-text">Alves</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy-300 lg:text-xl">
              Fundador e CEO do Instituto João Alves. Especialista em
              estruturar negócios para expansão. Criador do Método Tripé da
              Expansão. +14 anos transformando empresas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SmallStat valor="+14" label="anos de experiência" />
            <SmallStat valor="+500" label="projetos realizados" />
            <SmallStat valor="+130" label="clientes atendidos" />
            <SmallStat valor="+700" label="líderes qualificados" />
            <SmallStat valor="+5.000" label="colaboradores qualificados" />
            <SmallStat valor="4 estados" label="RJ · SP · ES · RS" />
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 4 — O QUE É MENTORIA ============ */}
      <Slide id={3}>
        <div className="text-center max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Mentoria diferente de tudo que você já viu
          </p>
          <h2 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-7xl">
            Método prático que gera{" "}
            <span className="serif-italic gradient-text">
              resultado na hora
            </span>
          </h2>
          <p className="mt-8 text-xl text-navy-300 lg:text-2xl">
            Sem enrolação. De forma que qualquer empresário consegue colocar
            em prática.
          </p>
        </div>
      </Slide>

      {/* ============ SLIDE 5 — O QUE ESTÁ INCLUSO ============ */}
      <Slide id={4}>
        <div className="max-w-7xl w-full">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
              O que você recebe
            </p>
            <h2 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Tudo que você precisa para{" "}
              <span className="serif-italic gradient-text">transformar</span>
            </h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <IncludeCard
              icon={BookOpen}
              title="Plataforma"
              desc="Acesso a todo conteúdo, materiais e ferramentas"
            />
            <IncludeCard
              icon={Calendar}
              title="Mentoria semanal"
              desc="Sessão ao vivo toda semana com João Pedro"
            />
            <IncludeCard
              icon={Briefcase}
              title="Projeto personalizado"
              desc="Plano sob medida para sua empresa"
            />
            <IncludeCard
              icon={Headphones}
              title="Acompanhamento diário"
              desc="Suporte contínuo para garantir resultados"
            />
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 6 — MENTORIA X CURSO ============ */}
      <Slide id={5}>
        <div className="max-w-6xl w-full">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
              Por que mentoria?
            </p>
            <h2 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Mentoria <span className="serif-italic gradient-text">vs</span>{" "}
              Curso <span className="serif-italic gradient-text">vs</span>{" "}
              Terceirização
            </h2>
          </div>
          <div className="mt-12 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy-800">
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-widest">Critério</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-widest text-navy-400">Curso</th>
                  <th className="bg-accent px-6 py-5 text-sm font-bold uppercase tracking-widest text-white">Mentoria</th>
                  <th className="px-6 py-5 text-sm font-bold uppercase tracking-widest text-navy-400">Terceirização</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Aprendizado", "Você aprende sozinho", "Aprende fazendo, com suporte", "Não aprende"],
                  ["Garantia", "Não é garantido", "Garantido com suporte prático", "Depende de terceiros"],
                  ["Autonomia", "Alta, sem prática", "Alta e sustentada", "Refém de terceiros"],
                  ["Crescimento", "Lento, tentativa e erro", "Rápido e mensurável", "Limitado"],
                  ["Custo x Benefício", "Baixo retorno", "Alto retorno", "Alto custo, dependência"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-navy-900" : "bg-navy-900/50"}>
                    <td className="border-t border-white/5 px-6 py-4 text-sm font-bold">{row[0]}</td>
                    <td className="border-t border-white/5 px-6 py-4 text-sm text-navy-400">{row[1]}</td>
                    <td className="border-t border-white/5 bg-accent/10 px-6 py-4 text-sm font-medium text-white">{row[2]}</td>
                    <td className="border-t border-white/5 px-6 py-4 text-sm text-navy-400">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Slide>

      {/* ============ SLIDES 7-13 — BÔNUS ============ */}
      {[
        { n: 1, icon: Users, title: "Recursos Humanos e Processos", desc: "Resolva 100% dos problemas com mão de obra. Liberdade e qualidade de vida.", valor: "R$ 4.800/mês" },
        { n: 2, icon: TrendingUp, title: "Marketing e Vendas", desc: "As melhores estratégias para atrair, conquistar e reter clientes.", valor: "R$ 4.800/mês" },
        { n: 3, icon: Sparkles, title: "Ferramentas Digitais", desc: "Ferramentas completas de gestão com análise e otimização por IA.", valor: "R$ 2.000/mês" },
        { n: 4, icon: Crown, title: "Universidade do Líder", desc: "70% de tudo é reflexo dos líderes. Quando um líder melhora, todos melhoram.", valor: "R$ 4.800/mês" },
        { n: 5, icon: BookOpen, title: "Acervo de conteúdos", desc: "Centenas de horas de conteúdo de alto impacto para o seu negócio.", valor: "+R$ 2.000/mês" },
        { n: 6, icon: Heart, title: "Clube de Crescimento", desc: "Centenas de líderes contribuindo simultaneamente entre si.", valor: "+R$ 2.000/mês" },
        { n: 7, icon: Award, title: "Eventos do ano", desc: "Desconto e gratuidade em todos os eventos de gestão empresarial.", valor: "+R$ 6.000" },
      ].map((b, i) => (
        <Slide key={b.n} id={6 + i}>
          <div className="text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-accent">
              <Trophy size={16} />
              Bônus {String(b.n).padStart(2, "0")} de 07
            </div>
            <div className="mx-auto mt-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-accent text-white">
              <b.icon size={48} />
            </div>
            <h2 className="mt-8 text-4xl font-bold sm:text-5xl lg:text-7xl">{b.title}</h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-navy-300 lg:text-2xl">{b.desc}</p>
            <div className="mt-12 inline-flex items-center gap-3 rounded-2xl border-2 border-accent/40 bg-accent/10 px-8 py-5">
              <span className="text-sm font-bold uppercase tracking-widest text-navy-300">Valor avulso</span>
              <span className="text-3xl font-bold text-accent">{b.valor}</span>
            </div>
          </div>
        </Slide>
      ))}

      {/* ============ SLIDE 14 — STACK DE VALOR ============ */}
      <Slide id={13}>
        <div className="text-center max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Soma de todos os bônus
          </p>
          <h2 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Se você contratasse{" "}
            <span className="serif-italic gradient-text">cada um avulso</span>
          </h2>
          <div className="mt-16 rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-accent/20 to-accent/5 p-12 lg:p-16">
            <p className="text-xl font-bold uppercase tracking-widest text-navy-300">
              Valor total
            </p>
            <p className="mt-6 text-7xl font-bold text-white sm:text-8xl lg:text-9xl">
              R$ 31.200
              <span className="block text-3xl text-navy-300 mt-2">por mês</span>
            </p>
          </div>
          <p className="mt-10 text-xl text-navy-300">
            Mas você não vai pagar nada perto disso.
          </p>
        </div>
      </Slide>

      {/* ============ SLIDE 15 — PÍLULA VERMELHA OU AZUL ============ */}
      <Slide id={14}>
        <div className="text-center max-w-5xl">
          <h2 className="text-4xl font-bold sm:text-5xl lg:text-7xl">
            Pílula vermelha
            <br />
            ou{" "}
            <span className="serif-italic gradient-text">pílula azul</span>?
          </h2>
          <p className="mx-auto mt-10 max-w-3xl text-xl leading-relaxed text-navy-300 lg:text-2xl">
            Você pode continuar fazendo do jeito que sempre fez.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-xl leading-relaxed text-navy-300 lg:text-2xl">
            Ou pode tomar uma decisão hoje que muda{" "}
            <strong className="text-white">o futuro do seu negócio</strong>.
          </p>
        </div>
      </Slide>

      {/* ============ SLIDE 16 — INVESTIMENTO ============ */}
      <Slide id={15}>
        <div className="text-center max-w-5xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-red-500/40 bg-red-500/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-red-400">
            <Zap size={16} />
            Condição especial só para hoje
          </div>
          <h2 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            O <span className="serif-italic gradient-text">investimento</span>
          </h2>

          <div className="mt-12 space-y-4">
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm font-medium text-navy-400">De</p>
              <p className="mt-1 text-3xl font-bold text-navy-400 line-through decoration-2">
                R$ 4.800/mês
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm font-medium text-navy-300">
                Por hoje na live
              </p>
              <p className="mt-1 text-4xl font-bold text-navy-300 line-through decoration-2">
                R$ 2.500/mês
              </p>
            </div>

            <div className="rounded-3xl border-4 border-accent bg-gradient-to-br from-accent/20 to-accent/5 p-10 lg:p-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">
                <Sparkles size={14} />
                PIX agora · 20% OFF
              </div>
              <p className="mt-6 text-2xl font-bold text-white">
                Quem fizer o PIX agora durante a live
              </p>
              <p className="mt-4 text-7xl font-bold text-white sm:text-8xl lg:text-9xl">
                R$ 1.990
                <span className="block text-2xl font-medium text-navy-300 mt-2">por mês</span>
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* ============ SLIDE 17 — GARANTIA ============ */}
      <Slide id={16}>
        <div className="text-center max-w-5xl">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-accent/20 ring-8 ring-accent/10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white">
              <Shield size={40} />
            </div>
          </div>
          <h2 className="mt-12 text-5xl font-bold sm:text-6xl lg:text-8xl">
            Garantia{" "}
            <span className="serif-italic gradient-text">100%</span>
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-navy-300 lg:text-2xl">
            Se você seguir todas as orientações e{" "}
            <strong className="text-white">não tiver melhora de resultado</strong>,
            devolvemos <strong className="text-accent">100% do investimento</strong>.
          </p>
          <p className="mt-8 text-lg text-navy-400">
            12 meses de mentoria · 4 meses mínimo · saída com 30 dias de aviso
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 rounded-2xl bg-accent px-12 py-6 text-xl font-bold text-white transition-all hover:bg-accent-dark hover:scale-105 hover:shadow-2xl hover:shadow-accent/40"
          >
            Quero entrar agora
            <ArrowRight size={24} />
          </a>
          <p className="mt-4 text-sm text-navy-400">
            Atendimento direto no WhatsApp
          </p>
        </div>
      </Slide>

      {/* ============ NAVEGAÇÃO ============ */}
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex items-center gap-4 rounded-full border border-white/10 bg-navy-950/90 px-6 py-3 backdrop-blur-md shadow-2xl">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-accent disabled:opacity-30 disabled:hover:bg-white/5"
          aria-label="Anterior"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-sm font-bold tabular-nums text-white">
          {String(current + 1).padStart(2, "0")}{" "}
          <span className="text-navy-400">/ {String(TOTAL_SLIDES).padStart(2, "0")}</span>
        </span>
        <button
          onClick={next}
          disabled={current === TOTAL_SLIDES - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-accent-dark disabled:opacity-30"
          aria-label="Próximo"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-accent to-gold-300 transition-all duration-500"
          style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ============ COMPONENTES AUXILIARES ============

function Slide({ id, children }: { id: number; children: React.ReactNode }) {
  return (
    <section
      id={`slide-${id}`}
      data-slide
      className="snap-start min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.12)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(166,133,35,0.08)_0%,_transparent_50%)] pointer-events-none" />
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}

function BigStat({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      <p className="text-5xl font-bold text-accent lg:text-6xl">{valor}</p>
      <p className="mt-4 text-base text-navy-300 lg:text-lg">{label}</p>
    </div>
  );
}

function SmallStat({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
      <p className="text-3xl font-bold text-accent lg:text-4xl">{valor}</p>
      <p className="mt-2 text-sm text-navy-300">{label}</p>
    </div>
  );
}

function IncludeCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-white/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-accent">
        <Icon size={26} />
      </div>
      <h3 className="mt-5 text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-300">{desc}</p>
    </div>
  );
}
