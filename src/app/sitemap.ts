import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs-content";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

// Only indexable pages belong here. /blog, /developers, and /search all
// carry noindex (see their own metadata), so they're deliberately excluded —
// a sitemap listing a noindex URL is a contradiction search engines flag.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  const docRoutes: MetadataRoute.Sitemap = getAllDocSlugs().map((slug) => ({
    url: absoluteUrl(`/docs/${slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...docRoutes];
}
