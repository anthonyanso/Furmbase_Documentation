import type { DocPage } from "@/types/docs";
import { DOCS_ORDER } from "@/lib/docs-config";

import { gettingStarted } from "./pages/getting-started";
import { creatingForms } from "./pages/creating-forms";
import { formBuilder } from "./pages/form-builder";
import { questionTypes } from "./pages/question-types";
import { aiFormGenerator } from "./pages/ai-form-generator";
import { paymentCollection } from "./pages/payment-collection";
import { responses } from "./pages/responses";
import { analytics } from "./pages/analytics";
import { themesBranding } from "./pages/themes-branding";
import { customDomains } from "./pages/custom-domains";
import { teamCollaboration } from "./pages/team-collaboration";
import { googleSheets } from "./pages/google-sheets";
import { exportResponses } from "./pages/export-responses";
import { integrations } from "./pages/integrations";
import { automation } from "./pages/automation";
import { api } from "./pages/api";
import { faq } from "./pages/faq";

const ALL_PAGES: DocPage[] = [
  gettingStarted,
  creatingForms,
  formBuilder,
  questionTypes,
  aiFormGenerator,
  paymentCollection,
  responses,
  analytics,
  themesBranding,
  customDomains,
  teamCollaboration,
  googleSheets,
  exportResponses,
  integrations,
  automation,
  api,
  faq,
];

export const DOCS_PAGES: Record<string, DocPage> = Object.fromEntries(
  ALL_PAGES.map((page) => [page.slug, page])
);

export function getDocPage(slug: string): DocPage | undefined {
  return DOCS_PAGES[slug];
}

export function getAllDocSlugs(): string[] {
  return DOCS_ORDER;
}

export function getAdjacentDocPages(slug: string): {
  prev: DocPage | null;
  next: DocPage | null;
} {
  const index = DOCS_ORDER.indexOf(slug);
  if (index === -1) return { prev: null, next: null };
  const prevSlug = DOCS_ORDER[index - 1];
  const nextSlug = DOCS_ORDER[index + 1];
  return {
    prev: prevSlug ? DOCS_PAGES[prevSlug] ?? null : null,
    next: nextSlug ? DOCS_PAGES[nextSlug] ?? null : null,
  };
}

export function getDocHeadings(page: DocPage) {
  return page.blocks.filter(
    (block): block is Extract<typeof block, { type: "heading" }> =>
      block.type === "heading"
  );
}
