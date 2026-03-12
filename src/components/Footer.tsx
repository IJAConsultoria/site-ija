import Link from "next/link";
import Image from "next/image";
import {
  SITE_NAME,
  SITE_TAGLINE,
  EMAIL,
  PHONE,
  LOCATION,
  SOCIAL,
  WHATSAPP_URL,
  NAV_LINKS,
  SEGMENTS,
} from "@/lib/constants";
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin } from "lucide-react";

const solutionLinks = [
  { label: "Gestão Financeira", href: "/solucoes/gestao-financeira" },
  { label: "Planejamento Estratégico", href: "/solucoes/planejamento-estrategico" },
  { label: "Liderança Organizacional", href: "/solucoes/lideranca-organizacional" },
  { label: "Gestão Comercial", href: "/solucoes/gestao-comercial-marketing" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/ija-logo-branca.png"
                alt="Instituto João Alves"
                width={936}
                height={314}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              {SITE_TAGLINE}
            </p>
            <p className="text-sm text-zinc-500">
              Consultoria especializada em restaurantes e food service com{" "}
              <strong className="text-white">14 anos</strong> de experiência,{" "}
              <strong className="text-white">+120 negócios</strong> transformados e{" "}
              <strong className="text-white">+R$ 40M</strong> em lucratividade gerada.
            </p>
            {/* Social */}
            <div className="flex gap-3 pt-2">
              {[
                { href: SOCIAL.instagram, icon: Instagram, label: "Instagram" },
                { href: SOCIAL.youtube, icon: Youtube, label: "YouTube" },
                { href: SOCIAL.linkedin, icon: Linkedin, label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 transition-all hover:bg-accent hover:text-white hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Soluções */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Soluções
            </h3>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/diagnostico"
                  className="text-sm font-semibold text-accent transition-colors hover:text-accent-light"
                >
                  Diagnóstico Gratuito
                </Link>
              </li>
            </ul>
          </div>

          {/* Segmentos */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Segmentos
            </h3>
            <ul className="space-y-2.5">
              {SEGMENTS.map((seg) => (
                <li key={seg.slug}>
                  <Link
                    href={`/segmentos/${seg.slug}`}
                    className="text-sm text-zinc-400 transition-colors hover:text-accent"
                  >
                    {seg.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Contato
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-accent"
                >
                  <Phone size={14} />
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-accent"
                >
                  <Mail size={14} />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <MapPin size={14} />
                {LOCATION}
              </li>
            </ul>

            <h3 className="mt-8 mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.filter((l) => !l.children).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/politica-privacidade"
              className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
