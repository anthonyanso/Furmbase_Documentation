import type { Metadata } from "next";

// ============================================================================
// SEO core for the docs site — mirrors the pattern in furmbase.com's own
// src/lib/seo.ts (buildMetadata + JSON-LD builders), adapted for a
// documentation subdomain rather than the marketing site. Deliberately
// omits a SoftwareApplication/aggregateRating schema: that describes the
// product itself and belongs on furmbase.com, not on its docs.
// ============================================================================

export const SITE = {
  name: "Furmbase Documentation",
  url: "https://doc.furmbase.com",
  description:
    "Official documentation for Furmbase — build forms, collect payments, generate forms with AI, and analyze responses. Guides and API reference.",
  ogImage: "/android-chrome-512x512.png",
  twitter: "@furmbase",
  locale: "en_US",
} as const;

const PRODUCT = {
  name: "Furmbase",
  url: "https://furmbase.com",
  description:
    "Furmbase is the AI-native form builder for smart forms, surveys, payment and registration forms.",
  logo: "https://furmbase.com/apple-touch-icon.png",
} as const;

export const KEYWORDS = {
  primary: [
    "Furmbase documentation",
    "Furmbase docs",
    "form builder documentation",
    "how to build forms",
    "AI form generator docs",
    "online form builder guide",
  ],
  product: [
    "Furmbase",
    "Furmbase API",
    "Furmbase developer docs",
    "conditional logic forms",
    "calculated pricing forms",
    "payment forms guide",
    "survey builder documentation",
  ],
} as const;

export const ALL_KEYWORDS: string[] = [...KEYWORDS.primary, ...KEYWORDS.product];

export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  keywords?: readonly string[];
  noindex?: boolean;
}

/** The canonical way to produce per-page metadata across the docs site. */
export function buildMetadata(opts: BuildMetadataOptions = {}): Metadata {
  const description = opts.description || SITE.description;
  const url = absoluteUrl(opts.path || "/");
  const title = opts.title || SITE.name;

  return {
    title: opts.title,
    description,
    keywords: opts.keywords && opts.keywords.length ? Array.from(opts.keywords) : undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
      images: [{ url: SITE.ogImage, width: 512, height: 512, alt: title, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE.ogImage],
      creator: SITE.twitter,
    },
    robots: opts.noindex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          nosnippet: true,
          googleBot: { index: false, follow: false, noarchive: true, nosnippet: true },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

// ── Structured data (JSON-LD) ───────────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: PRODUCT.name,
    url: PRODUCT.url,
    logo: PRODUCT.logo,
    description: PRODUCT.description,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@type": "Organization", name: PRODUCT.name, url: PRODUCT.url },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
