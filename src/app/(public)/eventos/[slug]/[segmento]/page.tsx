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
  Bell,
} from "lucide-react";
import { EVENTS, SEGMENTS } from "@/lib/constants";
import { generatePageMetadata, breadcrumbSchema } from "@/lib/seo";
import {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  StaggerContainer,
  StaggerItem,
  AnimatedBlob,
} from "@/components/animations";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import {
  getSegmentEventContent,
  getAllEventSegmentParams,
} from "@/lib/event-segments";

type Props = {
  params: Promise<{ slug: string; segmento: string }>;
};

export async function generateStaticParams() {
  return getAllEventSegmentParams();
}

export async function generateMetadata({ params }: Props) {
  const { slug, segmento } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  const segment = SEGMENTS.find((s) => s.slug === segmento);
  const content = getSegmentEventContent(slug, segmento);

  if (!event || !segment || !content) return {};

  return generatePageMetadata({
    title: `${content.headline} | Evento IJA`,
    description: content.description,
    path: `/eventos/${slug}/${segmento}`,
  });
}

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  Live: { icon: Video, color: "text-red-500", bg: "bg-red-50" },
  Webinar: { icon: Mic, color: "text-blue-500", bg: "bg-blue-50" },
  Workshop: { icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
};

export default async function SegmentEventPage({ params }: Props) {
  const { slug, segmento } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  const segment = SEGMENTS.find((s) => s.slug === segmento);
  const content = getSegmentEventContent(slug, segmento);

  if (!event || !segment || !content) notFound();

  const config = typeConfig[event.type] || typeConfig.Live;
  const TypeIcon = config.icon;
  const otherSegments = SEGMENTS.filter((s) => s.slug !== segmento).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Eventos", url: "/eventos" },
              { name: event.title, url: `/eventos/${slug}` },
              { name: segment.name, url: `/eventos/${slug}/${segmento}` },
            ])
          ),
        }}
      />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy-950 py-28 lg:py-40 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.15)_0%,_transparent_50%)]" />
        <AnimatedBlob className="absolute -top-40 -right-40 h-80 w-80 bg-accent/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-5">
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
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} px-4 py-1.5 text-sm font-semibold ${config.color}`}
                  >
                    <TypeIcon size={14} />
                    {event.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                    <Zap size={14} />
                    Gratuito
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-navy-300">
                    {segment.emoji} {segment.name}
                  </span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {content.headline}
                </h1>
                <p className="mt-4 text-lg text-accent font-medium">
                  {content.subheadline}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-navy-300">
                  {content.description}
                </p>

                {/* Event details inline */}
                <div className="mt-8 flex flex-wrap items-center gap-6 text-navy-400">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-accent" />
                    <span className="font-medium text-white">
                      {event.date}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-accent" />
                    <span className="font-medium text-white">
                      {event.time}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Timer size={16} className="text-accent" />
                    <span className="font-medium text-white">
                      {event.duration}
                    </span>
                  </span>
                </div>
              </FadeInLeft>
            </div>

            {/* Registration Form Card */}
            <div className="lg:col-span-2">
              <FadeInRight>
                <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white">
                      <Bell size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-950">
                        Inscreva-se gratuitamente
                      </h3>
                      <p className="text-sm text-navy-500">
                        Vagas limitadas — garanta a sua
                      </p>
                    </div>
                  </div>
                  <EventRegistrationForm
                    eventSlug={event.slug}
                    eventTitle={event.title}
                    eventType={event.type}
                    eventDate={event.date}
                    eventTime={event.time}
                    segmentOrigin={segmento}
                    segmentName={segment.name}
                  />
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
                  Conteúdo do {event.type.toLowerCase()}
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
                {/* Para quem é — nichado */}
                <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-navy-950">
                    Para quem é este {event.type.toLowerCase()}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500">
                    Feito especialmente para o segmento de{" "}
                    <strong className="text-navy-700">{segment.name}</strong>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {content.forWho.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-navy-700"
                      >
                        <CheckCircle
                          size={18}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dor principal */}
                <div className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 p-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-accent">
                    Você se identifica?
                  </p>
                  <p className="mt-4 text-xl font-bold text-navy-950 leading-snug">
                    &ldquo;{content.painPoint}&rdquo;
                  </p>
                  <p className="mt-3 text-navy-600">
                    Se essa frase parece familiar, este evento foi feito para
                    você. Inscreva-se gratuitamente.
                  </p>
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
                      <p className="font-bold text-navy-950">
                        {event.speaker}
                      </p>
                      <p className="mt-1 text-sm text-navy-600">
                        {event.speakerRole}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-navy-600">
                        Fundador do Instituto João Alves, já ajudou mais de 120
                        negócios de food service a se estruturarem para
                        expansão, gerando mais de R$ 40 milhões em
                        lucratividade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* ===== OUTROS SEGMENTOS DO MESMO EVENTO ===== */}
      <section className="bg-cream-dark py-16 lg:py-24 dot-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-accent">
                Este evento também é para
              </p>
              <h2 className="mt-3 text-2xl font-bold text-navy-950 sm:text-3xl">
                Outros{" "}
                <span className="serif-italic gradient-text">segmentos</span>
              </h2>
            </div>
          </FadeInUp>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherSegments.map((seg) => (
              <Link
                key={seg.slug}
                href={`/eventos/${slug}/${seg.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-navy-100/50 bg-white p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <span className="text-2xl">{seg.emoji}</span>
                <div>
                  <p className="font-bold text-navy-950 group-hover:text-accent transition-colors">
                    {seg.name}
                  </p>
                  <p className="text-xs text-navy-500">Ver evento</p>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto text-navy-300 group-hover:text-accent transition-colors"
                />
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href={`/eventos/${slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark"
            >
              Ver todos os segmentos
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
