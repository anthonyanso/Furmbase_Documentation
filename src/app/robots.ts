import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // No disallow rules. /blog, /developers, and /search all carry their own
    // noindex meta tag instead of being blocked here — blocking a path stops
    // crawlers from ever fetching it, which means they never see that
    // noindex tag, so anything already indexed stays stuck with no way to
    // remove it. Letting Google fetch the page and read noindex is what
    // actually gets a page dropped from the index.
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
