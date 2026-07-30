import type { MetadataRoute } from "next";
import { getAllDocSlugs } from "@/lib/docs-content";
import { TUTORIALS } from "@/lib/tutorials-data";

const siteUrl = "https://docs.furmbase.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/tutorials`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/developers`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/search`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const docRoutes: MetadataRoute.Sitemap = getAllDocSlugs().map((slug) => ({
    url: `${siteUrl}/docs/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const tutorialRoutes: MetadataRoute.Sitemap = TUTORIALS.map((tutorial) => ({
    url: `${siteUrl}/tutorials/${tutorial.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...docRoutes, ...tutorialRoutes];
}
