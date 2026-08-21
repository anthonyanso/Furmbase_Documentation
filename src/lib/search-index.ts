import type { SearchDoc } from "@/types/docs";
import { DOCS_PAGES } from "@/lib/docs-content";

function buildDocsIndex(): SearchDoc[] {
  return Object.values(DOCS_PAGES).map((page) => ({
    title: page.title,
    description: page.description,
    href: `/docs/${page.slug}`,
    group: page.group,
  }));
}

export const SEARCH_INDEX: SearchDoc[] = [...buildDocsIndex()];

// In-memory scoring today; swap the body of this function for a call to
// Algolia (or another hosted search provider) once the docs corpus grows
// past what a client-side index can comfortably hold — call sites don't
// need to change since they only depend on this signature.
export function searchDocs(query: string, limit = 8): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return SEARCH_INDEX.map((doc) => {
    const haystack = [doc.title, doc.description, doc.group, ...(doc.keywords ?? [])]
      .join(" ")
      .toLowerCase();

    let score = 0;
    if (doc.title.toLowerCase().startsWith(q)) score += 10;
    else if (doc.title.toLowerCase().includes(q)) score += 6;
    if (haystack.includes(q)) score += 2;

    return { doc, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.doc);
}
