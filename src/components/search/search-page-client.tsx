"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { searchDocs } from "@/lib/search-index";
import type { SearchDoc } from "@/types/docs";

export function SearchPageClient({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = React.useState(initialQuery);
  const results = React.useMemo(() => searchDocs(query, 30), [query]);

  React.useEffect(() => {
    const url = query ? `/search?q=${encodeURIComponent(query)}` : "/search";
    const timeout = setTimeout(() => router.replace(url), 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const grouped = React.useMemo(() => {
    return results.reduce<Record<string, SearchDoc[]>>((acc, doc) => {
      acc[doc.group] = acc[doc.group] ?? [];
      acc[doc.group].push(doc);
      return acc;
    }, {});
  }, [results]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-8 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Search Documentation
      </h1>
      <p className="mt-2 text-muted-foreground">
        Search across guides and reference pages.
      </p>

      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation..."
          className="h-12 pl-10"
        />
      </div>

      <p className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
        Tip: press <Kbd>Ctrl</Kbd> <Kbd>K</Kbd> from anywhere to search
      </p>

      <div className="mt-8 space-y-8">
        {!query && (
          <p className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            Start typing to search across the documentation.
          </p>
        )}

        {query && results.length === 0 && (
          <p className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
            No results for &ldquo;{query}&rdquo;. Try a different term.
          </p>
        )}

        {Object.entries(grouped).map(([group, docs]) => (
          <div key={group}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group}
            </p>
            <div className="mt-2.5 space-y-2">
              {docs.map((doc) => (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-ring/40 hover:bg-accent/40"
                >
                  <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      {doc.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {doc.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
