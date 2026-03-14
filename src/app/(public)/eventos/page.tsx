import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Clock,
  Timer,
  Users,
  Video,
  Mic,
  Bell,
  Zap,
  ChevronRight,
} from "lucide-react";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  AnimatedBlob,
} from "@/components/animations";
import { EVENTS, SEGMENTS, WHATSAPP_URL } from "@/lib/constants";
import { SEGMENT_EVENT_CONTENT } from "@/lib/event-segments";

export const metadata = generatePageMetadata({
  title: "Eventos e Lives",
  description:
    "Lives, webinars e workshops do Instituto João Alves sobre gestão de restaurantes, food service, finanças, liderança e expansão.",
  path: "/eventos",
});

const typeConfig: Record<string, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  Live: { icon: Video, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
  Webinar: { icon: Mic, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
  Workshop: { icon: Users, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
};

const pastTopics = [
  "Como calcular o CMV corretamente",
  "Padronização: o segredo das redes de sucesso",
  "Gestão de estoque para food service",
  "Como precificar seu cardápio",
  "Turnover: por que sua equipe não fica",
  "Do restaurante local à franquia em 12 meses",
];

export default function EventosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Eventos", url: "/eventos" },
            ])
          ),
        }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-40 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.15)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-40 -right-40 h-80 w-80 bg-accent/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent">
                <Video size={16} />
                Lives, webinars e workshops gratuitos
              </div>
              <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                Eventos{" "}
                <span className="serif-italic gradient-text">IJA</span>
              </h1>
              <p className="mt-6 text-lg text-navy-300 lg:text-xl">
                Conteúdo ao vivo sobre gestão de negócios, finanças, liderança
                e expansão. 100% prático, direto ao ponto, para todos os
                segmentos.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== PRÓXIMOS EVENTOS ===== */}
      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Agenda
                </p>
                <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                  Próximos{" "}
                  <span className="serif-italic gradient-text">eventos</span>
                </h2>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20 sm:inline-flex"
              >
                <Bell size={14} />
                Receber avisos
              </a>
            </div>
          </FadeInUp>

          <StaggerContainer className="mt-12 space-y-8">
            {EVENTS.map((event) => {
              const config = typeConfig[event.type] || typeConfig.Live;
              const TypeIcon = config.icon;
              const eventSegments = SEGMENTS.filter(
                (s) => SEGMENT_EVENT_CONTENT[event.slug]?.[s.slug]
              );

              return (
                <StaggerItem key={event.slug}>
                  <div className="overflow-hidden rounded-3xl border border-navy-100/50 bg-white">
                    {/* Event header */}
                    <Link
                      href={`/eventos/${event.slug}`}
                      className="group block"
                    >
                      <div className="flex flex-col lg:flex-row">
                        {/* Left: date & type */}
                        <div className="flex items-center gap-6 bg-navy-950 px-8 py-6 lg:w-56 lg:flex-col lg:justify-center lg:gap-3">
                          <div
                            className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} px-3 py-1.5 text-xs font-bold ${config.color}`}
                          >
                            <TypeIcon size={12} />
                            {event.type}
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-white">
                              {event.date}
                            </p>
                            <div className="mt-1 flex items-center justify-center gap-3 text-navy-400">
                              <span className="flex items-center gap-1 text-xs">
                                <Clock size={11} />
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1 text-xs">
                                <Timer size={11} />
                                {event.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: content */}
                        <div className="flex flex-1 flex-col justify-between p-8">
                          <div>
                            <h3 className="text-xl font-bold text-navy-950 transition-colors group-hover:text-accent lg:text-2xl">
                              {event.title}
                            </h3>
                            <p className="mt-3 text-navy-600 leading-relaxed">
                              {event.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {event.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-lg bg-cream px-2.5 py-1 text-xs font-medium text-navy-600"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm text-navy-500">
                              <span className="font-medium text-navy-700">
                                {event.speaker}
                              </span>{" "}
                              — {event.speakerRole.split("—")[0]}
                            </p>
                            <span className="inline-flex items-center gap-2 rounded-xl bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition-all group-hover:bg-accent group-hover:text-white">
                              Ver detalhes
                              <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Segment strip */}
                    {eventSegments.length > 0 && (
                      <div className="border-t border-navy-100/50 bg-cream/50 px-8 py-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-navy-400">
                          Inscreva-se pelo seu segmento
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {eventSegments.map((seg) => (
                            <Link
                              key={seg.slug}
                              href={`/eventos/${event.slug}/${seg.slug}`}
                              className="inline-flex items-center gap-2 rounded-xl border border-navy-100/50 bg-white px-4 py-2.5 text-sm font-medium text-navy-700 transition-all hover:border-accent/30 hover:text-accent hover:shadow-sm"
                            >
                              <span>{seg.emoji}</span>
                              {seg.name}
                              <ChevronRight size={12} className="text-navy-300" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Mobile CTA */}
          <div className="mt-8 text-center sm:hidden">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent"
            >
              <Bell size={14} />
              Receber avisos de novos eventos
            </a>
          </div>
        </div>
      </section>

      {/* ===== POR QUE PARTICIPAR ===== */}
      <section className="bg-cream-dark py-24 lg:py-32 dot-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeInLeft>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Por que participar
                </p>
                <h2 className="mt-3 text-3xl font-bold text-navy-950 sm:text-4xl">
                  Conteúdo que{" "}
                  <span className="serif-italic gradient-text">transforma</span>{" "}
                  negócios de verdade
                </h2>
                <p className="mt-4 text-lg text-navy-600">
                  Nossos eventos não são palestras genéricas. São sessões
                  práticas, com ferramentas aplicáveis e cases reais de
                  negócios que já passaram pelos mesmos problemas que você.
                </p>
              </div>
              <div className="mt-10 space-y-5">
                {[
                  {
                    icon: Zap,
                    title: "100% prático e direto ao ponto",
                    desc: "Sem teoria vazia. Você sai com ferramentas para aplicar no dia seguinte.",
                  },
                  {
                    icon: Users,
                    title: "Cases reais de +120 negócios",
                    desc: "Exemplos concretos de negócios que saíram do caos para a estrutura.",
                  },
                  {
                    icon: Video,
                    title: "Gratuito e online",
                    desc: "Participe de qualquer lugar, sem custo. Só precisa de internet.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-950">{item.title}</h3>
                      <p className="mt-1 text-navy-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInLeft>

            <FadeInRight>
              <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-lg shadow-navy-950/5 lg:p-10">
                <h3 className="text-lg font-bold text-navy-950">
                  Temas que{" "}
                  <span className="serif-italic gradient-text">abordamos</span>
                </h3>
                <p className="mt-2 text-sm text-navy-600">
                  Conteúdo focado na realidade do dono de negócio.
                </p>
                <div className="mt-6 space-y-3">
                  {pastTopics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-3 rounded-xl border border-navy-100/30 bg-cream/50 p-4 transition-all hover:border-accent/20"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Video size={14} />
                      </div>
                      <p className="text-sm font-medium text-navy-800">
                        {topic}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

    </>
  );
}
