"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Library, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-dot [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_10%,transparent_75%)]" />
      <div className="absolute left-1/2 top-[-10rem] h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px] dark:bg-primary/15" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm animate-fade-in">
          <span className="size-1.5 rounded-full bg-primary" />
          Furmbase Documentation
        </span>

        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl animate-fade-up [animation-delay:80ms] opacity-0">
          Everything you need to build with Furmbase
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg animate-fade-up [animation-delay:160ms] opacity-0">
          Guides and reference for building forms, collecting payments, and
          automating workflows — from your first form to your production
          integration.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-lg items-center gap-2 animate-fade-up [animation-delay:240ms] opacity-0"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search documentation..."
              aria-label="Search documentation"
              className="h-12 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-ring/40 focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-fade-up [animation-delay:320ms] opacity-0">
          <Button size="lg" asChild>
            <Link href="/docs/getting-started">
              <Library />
              Browse Documentation
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/developers">
              <Code2 />
              Developer Documentation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
