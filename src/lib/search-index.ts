import type { BlogPost, SearchDoc } from "@/types/docs";
import { DOCS_PAGES } from "@/lib/docs-content";

function buildDocsIndex(): SearchDoc[] {
  return Object.values(DOCS_PAGES).map((page) => ({
    title: page.title,
    description: page.description,
    href: `/docs/${page.slug}`,
    group: page.group,
  }));
}

// Blog posts live in Supabase and can't be read synchronously at module
// load like the static doc pages above, so callers that want blog results
// included fetch them (getBlogPosts) and pass them through here.
export function buildBlogIndex(posts: BlogPost[]): SearchDoc[] {
  return posts.map((post) => ({
    title: post.title,
    description: post.excerpt,
    href: `/blog/${post.slug}`,
    group: "Blog",
  }));
}

export const SEARCH_INDEX: SearchDoc[] = [...buildDocsIndex()];

// In-memory scoring today; swap the body of this function for a call to
// Algolia (or another hosted search provider) once the docs corpus grows
// past what a client-side index can comfortably hold — call sites don't
// need to change since they only depend on this signature.
export function searchDocs(query: string, limit = 8, extraDocs: SearchDoc[] = []): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const index = extraDocs.length ? [...SEARCH_INDEX, ...extraDocs] : SEARCH_INDEX;

  return index.map((doc) => {
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
