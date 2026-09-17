"use client";

import * as React from "react";
import {
  Search,
  LayoutGrid,
  Megaphone,
  Compass,
  Building2,
  Lightbulb,
  Tag,
  type LucideIcon,
} from "lucide-react";
import type { BlogPost } from "@/types/docs";
import { BlogCard } from "@/components/blog/blog-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Known categories get a specific icon; anything the admin panel adds later
// (a free-text field) falls back to a generic tag icon rather than nothing.
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Product Updates": Megaphone,
  Guides: Compass,
  Company: Building2,
  Tips: Lightbulb,
};
const DEFAULT_CATEGORY_ICON = Tag;

export function BlogPageClient({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .filter((post) => {
        const matchesCategory = !category || post.category === category;
        const matchesQuery =
          !q ||
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [posts, query, category]);

  // Featured is an explicit choice made per post (in the admin panel), not
  // just "whichever came first" — so it's a filter, not a slice.
  const featured = filtered.filter((post) => post.featured);
  const rest = filtered.filter((post) => !post.featured);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          All Articles
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Find and read posts that help you build with Furmbase. Product
          updates, guides, and behind-the-scenes posts from the team.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:max-w-xs sm:flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              category === null
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="size-3.5" />
            All Articles
          </button>
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] ?? DEFAULT_CATEGORY_ICON;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  category === cat
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {Icon && <Icon className="size-3.5" />}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 rounded-xl border border-dashed border-border py-14 text-center text-sm text-muted-foreground">
          No articles found. Try a different search or category.
        </p>
      ) : (
        <>
          {featured.length > 0 && (
            <div
              className={cn(
                "mt-10 grid grid-cols-1 gap-5",
                featured.length > 1 && "sm:grid-cols-2"
              )}
            >
              {featured.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} featured priority={i === 0} />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i + featured.length} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
