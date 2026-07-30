import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DocPage } from "@/types/docs";

export function PrevNextNav({
  prev,
  next,
}: {
  prev: DocPage | null;
  next: DocPage | null;
}) {
  if (!prev && !next) return null;

  return (
    <div className="mt-14 grid grid-cols-1 gap-3 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex flex-col rounded-xl border border-border bg-card px-4 py-3.5 transition-all hover:border-ring/40 hover:shadow-sm"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="mt-1 text-sm font-medium text-foreground">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex flex-col items-end rounded-xl border border-border bg-card px-4 py-3.5 text-right transition-all hover:border-ring/40 hover:shadow-sm sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Next
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1 text-sm font-medium text-foreground">
            {next.title}
          </span>
        </Link>
      )}
    </div>
  );
}
