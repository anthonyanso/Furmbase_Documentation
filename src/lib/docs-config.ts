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
      { title: "Conditional Logic", href: "/docs/conditional-logic", badge: "new" },
      { title: "Smart Fields", href: "/docs/smart-fields", badge: "new" },
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
    title: "Integrations",
    items: [
      { title: "Integrations", href: "/docs/integrations" },
      { title: "Automation", href: "/docs/automation", comingSoon: true },
      { title: "API", href: "/docs/api", comingSoon: true },
    ],
  },
  {
    title: "Account",
    items: [{ title: "Account Deletion", href: "/docs/account-deletion" }],
  },
  {
    title: "Resources",
    items: [{ title: "FAQ", href: "/docs/faq" }],
  },
];

export const DOCS_ORDER: string[] = [
  "getting-started",
  "creating-forms",
  "form-builder",
  "question-types",
  "conditional-logic",
  "smart-fields",
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
  "account-deletion",
  "faq",
];
