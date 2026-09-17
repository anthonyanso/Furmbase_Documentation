import type { Metadata } from "next";
import { SearchPageClient } from "@/components/search/search-page-client";
import { getBlogPosts } from "@/lib/blog-data";
import { buildBlogIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Furmbase documentation.",
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts = await getBlogPosts();
  return <SearchPageClient initialQuery={q ?? ""} extraDocs={buildBlogIndex(posts)} />;
}
