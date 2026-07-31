import type { NavGroup } from "@/types/docs";

export const DOCS_NAV: NavGroup[] = [
  {
    title: "Intro",
    items: [{ title: "Getting Started", href: "/docs/getting-started" }],
  },
  {
    title: "Creating Forms",
    items: [
      { title: "Creating Forms", href: "/docs/creating-forms" },
      { title: "Form Builder", href: "/docs/form-builder" },
      { title: "Question Types", href: "/docs/question-types" },
      { title: "AI Form Generator", href: "/docs/ai-form-generator", badge: "new" },
    ],
  },
  {
    title: "Collecting Data",
    items: [
      { title: "Payment Collection", href: "/docs/payment-collection" },
      { title: "Responses", href: "/docs/responses" },
      { title: "Analytics", href: "/docs/analytics" },
    ],
  },
  {
    title: "Customization",
    items: [
      { title: "Themes & Branding", href: "/docs/themes-branding" },
      { title: "Custom Domains", href: "/docs/custom-domains" },
    ],
  },
  {
    title: "Data & Exports",
    items: [
      { title: "Google Sheets", href: "/docs/google-sheets" },
      { title: "Export Responses", href: "/docs/export-responses" },
    ],
  },
  {
    title: "Integrations & Automation",
    items: [
      { title: "Integrations", href: "/docs/integrations" },
      { title: "Automation", href: "/docs/automation", badge: "soon" },
      { title: "API", href: "/docs/api", badge: "soon" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Tutorials", href: "/tutorials" },
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
];

export const DOCS_ORDER: string[] = [
  "getting-started",
  "creating-forms",
  "form-builder",
  "question-types",
  "ai-form-generator",
  "payment-collection",
  "responses",
  "analytics",
  "themes-branding",
  "custom-domains",
  "google-sheets",
  "export-responses",
  "integrations",
  "automation",
  "api",
  "faq",
];
