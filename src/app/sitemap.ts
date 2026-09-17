import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs-content";
import { getBlogPosts } from "@/lib/blog-data";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

// /developers and /search still carry noindex (see their own metadata), so
// they're deliberately excluded — a sitemap listing a noindex URL is a
// contradiction search engines flag. /blog is indexable now.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
  ];

  const docRoutes: MetadataRoute.Sitemap = getAllDocSlugs().map((slug) => ({
    url: absoluteUrl(`/docs/${slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const posts = await getBlogPosts();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...docRoutes, ...blogRoutes];
}
