import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from "./constants";

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const desc = description || SITE_DESCRIPTION;
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-image.jpg`;

  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: SITE_DESCRIPTION,
    foundingDate: "2012",
    founder: {
      "@type": "Person",
      name: "João Pedro Alves",
      jobTitle: "Fundador e Consultor",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cabo Frio",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-22-99974-6006",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    sameAs: [
      "https://instagram.com/institutojoaoalves",
      "https://youtube.com/@institutojoaoalves",
      "https://linkedin.com/in/joaopedroalves",
    ],
    areaServed: [
      { "@type": "State", name: "Rio de Janeiro" },
      { "@type": "State", name: "São Paulo" },
      { "@type": "State", name: "Espírito Santo" },
      { "@type": "State", name: "Rio Grande do Sul" },
    ],
    knowsAbout: [
      "Consultoria para restaurantes",
      "Gestão de food service",
      "Expansão de franquias",
      "Gestão financeira para restaurantes",
      "Padronização de processos",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: "+55-22-99974-6006",
    email: "consultorjoao.alves@gmail.com",
    description: SITE_DESCRIPTION,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cabo Frio",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -22.8792,
      longitude: -42.0186,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "120",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Brazil",
    },
    serviceType: "Consultoria empresarial",
  };
}
