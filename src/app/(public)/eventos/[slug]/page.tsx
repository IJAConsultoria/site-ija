import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Timer,
  CheckCircle,
  Users,
  Zap,
  Video,
  Mic,
  ChevronRight,
  Bell,
} from "lucide-react";
import { EVENTS, WHATSAPP_URL } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  AnimatedBlob,
} from "@/components/animations";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return {};
  return generatePageMetadata({
    title: event.title,
    description: event.description,
    path: `/eventos/${event.slug}`,
  });
}

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  Live: { icon: Video, color: "text-red-500", bg: "bg-red-50" },
  Webinar: { icon: Mic, color: "text-blue-500", bg: "bg-blue-50" },
  Workshop: { icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
};

export default async function EventoPage({ params }: Props) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();

  const config = typeConfig[event.type] || typeConfig.Live;
  const TypeIcon = config.icon;
  const otherEvents = EVENTS.filter((e) => e.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Eventos", url: "/eventos" },
              { name: event.title, url: `/eventos/${event.slug}` },
            ])
          ),
        }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-40 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.15)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-40 -right-40 h-80 w-80 bg-accent/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            {/* Content */}
            <div className="lg:col-span-3">
              <FadeInLeft>
                <Link
                  href="/eventos"
                  className="mb-6 inline-flex items-center gap-2 text-sm text-navy-400 transition-colors hover:text-accent"
                >
                  <ArrowLeft size={14} />
                  Todos os eventos
                </Link>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} px-4 py-1.5 text-sm font-semibold ${config.color}`}>
                    <TypeIcon size={14} />
                    {event.type}
                  </span>
                  {event.status === "upcoming" && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                      <Zap size={14} />
                      Gratuito
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {event.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-navy-300">
                  {event.longDescription}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-orange-sm inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
                  >
                    Quero participar
                    <ArrowRight size={18} />
                  </a>
                  <Link
                    href="/diagnostico"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    Agendar diagnóstico
                  </Link>
                </div>
              </FadeInLeft>
            </div>

            {/* Info card */}
            <div className="lg:col-span-2">
              <FadeInRight>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-navy-400">
                    Detalhes do evento
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-navy-400">Data</p>
                        <p className="font-semibold text-white">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-navy-400">Horário</p>
                        <p className="font-semibold text-white">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent">
                        <Timer size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-navy-400">Duração</p>
                        <p className="font-semibold text-white">{event.duration}</p>
                      </div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-800 text-white">
                        <Mic size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{event.speaker}</p>
                        <p className="text-xs text-navy-400">{event.speakerRole}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-navy-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </div>
      </section>

      {/* ===== O QUE VOCÊ VAI APRENDER ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeInLeft>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Conteúdo
                </p>
                <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                  O que você vai{" "}
                  <span className="serif-italic gradient-text">aprender</span>
                </h2>
                <p className="mt-4 text-lg text-navy-600">
                  Conteúdo 100% prático, direto ao ponto, baseado em 14 anos de
                  experiência e +120 negócios transformados.
                </p>
              </div>

              <StaggerContainer className="mt-10 space-y-4">
                {event.topics.map((topic, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-4 rounded-2xl border border-navy-100/50 bg-white p-5 transition-all hover:border-accent/30 hover:shadow-md">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-sm font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="font-medium text-navy-800">{topic}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeInLeft>

            <FadeInRight>
              <div className="space-y-8">
                {/* Para quem é */}
                <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-navy-950">
                    Para quem é este {event.type.toLowerCase()}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {event.forWho.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-navy-700">
                        <CheckCircle
                          size={18}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA card */}
                <div className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white">
                    <Bell size={24} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy-950">
                    Garanta sua vaga
                  </h3>
                  <p className="mt-2 text-navy-600">
                    Evento 100% gratuito e online. Vagas limitadas — entre na
                    lista de espera pelo WhatsApp.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
                  >
                    Quero participar
                    <ArrowRight size={18} />
                  </a>
                </div>

                {/* Sobre o speaker */}
                <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-navy-950">
                    Sobre o apresentador
                  </h3>
                  <div className="mt-4 flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-100 text-navy-600">
                      <Mic size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-navy-950">{event.speaker}</p>
                      <p className="mt-1 text-sm text-navy-600">
                        {event.speakerRole}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-navy-600">
                        Fundador do Instituto João Alves, já ajudou mais de 120
                        negócios de food service a se estruturarem para expansão,
                        gerando mais de R$ 40 milhões em lucratividade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ===== OUTROS EVENTOS ===== */}
      {otherEvents.length > 0 && (
        <section className="bg-cream-dark py-24 lg:py-32 dot-pattern">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-navy-950">
                  Outros{" "}
                  <span className="serif-italic gradient-text">eventos</span>
                </h2>
              </div>
            </FadeInUp>

            <StaggerContainer className="mt-12 grid gap-6 lg:grid-cols-2">
              {otherEvents.map((other) => {
                const otherConfig = typeConfig[other.type] || typeConfig.Live;
                const OtherIcon = otherConfig.icon;
                return (
                  <StaggerItem key={other.slug}>
                    <Link
                      href={`/eventos/${other.slug}`}
                      className="group flex h-full flex-col rounded-3xl border border-navy-100/50 bg-white transition-all hover:border-accent/30 hover:shadow-lg overflow-hidden"
                    >
                      <div className="flex items-center gap-3 border-b border-navy-100/30 bg-navy-950 px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full ${otherConfig.bg} px-3 py-1 text-xs font-semibold ${otherConfig.color}`}>
                          <OtherIcon size={12} />
                          {other.type}
                        </span>
                        <span className="text-xs text-navy-400">
                          {other.date} - {other.time}
                        </span>
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-lg font-bold text-navy-950 transition-colors group-hover:text-accent">
                          {other.title}
                        </h3>
                        <p className="mt-2 text-sm text-navy-600 line-clamp-2">
                          {other.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {other.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg bg-cream px-2.5 py-1 text-xs font-medium text-navy-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-navy-100/30 px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                          Ver detalhes
                          <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ===== CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-36 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.12)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-20 -right-20 h-64 w-64 bg-accent/10" />
        <div className="relative mx-auto max-w-3xl text-center px-4">
          <FadeInUp>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
              <Zap size={14} />
              Não quer esperar?
            </div>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Agende um{" "}
              <span className="serif-italic gradient-text">diagnóstico</span>{" "}
              gratuito agora
            </h2>
            <p className="mt-6 text-lg text-navy-300">
              30-45 minutos com consultor do IJA. Análise completa do seu
              negócio + plano de ação personalizado. Sem compromisso.
            </p>
            <Link
              href="/diagnostico"
              className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-accent px-10 py-5 text-lg font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105"
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
