import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURE_CARDS } from "@/lib/feature-cards";
import { Badge } from "@/components/ui/badge";

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-8 lg:px-12 xl:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
          <span className="size-1.5 rounded-full bg-primary" />
          Explore
        </span>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Explore what you can build
        </h2>
        <p className="mt-3 text-muted-foreground">
          Jump straight into the docs for the part of Furmbase you&apos;re
          working with right now.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />

              <div className="relative flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5.5" />
                </span>
                {card.badge && (
                  <Badge variant={card.badge === "new" ? "new" : "soon"}>
                    {card.badge === "new" ? "New" : "Coming Soon"}
                  </Badge>
                )}
              </div>

              <h3 className="relative mt-5 text-base font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="relative mt-1.5 flex-1 text-sm leading-6 text-muted-foreground">
                {card.description}
              </p>

              <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100">
                Read the docs
                <ArrowRight className="size-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
