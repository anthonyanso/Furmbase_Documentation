import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FEATURE_CARDS } from "@/lib/feature-cards";
import { Badge } from "@/components/ui/badge";

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Explore what you can build
        </h2>
        <p className="mt-3 text-muted-foreground">
          Jump straight into the docs for the part of Furmbase you&apos;re
          working with right now.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                  <Icon className="size-5" />
                </span>
                {card.badge && (
                  <Badge variant={card.badge === "new" ? "new" : "soon"}>
                    {card.badge === "new" ? "New" : "Coming Soon"}
                  </Badge>
                )}
              </div>

              <h3 className="mt-4 flex items-center gap-1.5 text-base font-semibold text-foreground">
                {card.title}
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all -translate-x-1 group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
