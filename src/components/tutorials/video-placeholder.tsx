import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Placeholder for an embedded tutorial video. Keeps the exact aspect-ratio
 * and rounded container a real <video> or <iframe> embed would use, so
 * swapping in a real embed later requires no layout changes.
 */
export function VideoPlaceholder({
  duration,
  className,
}: {
  duration?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted to-muted/50",
        className
      )}
    >
      <div className="absolute inset-0 bg-dot opacity-40" />
      <span className="relative flex size-14 items-center justify-center rounded-full bg-background/90 text-primary shadow-md transition-transform duration-200 group-hover:scale-105">
        <Play className="size-5.5 translate-x-0.5 fill-current" />
      </span>
      {duration && (
        <span className="absolute bottom-3 right-3 rounded-md bg-foreground/80 px-1.5 py-0.5 font-mono text-[11px] text-background">
          {duration}
        </span>
      )}
      <span className="absolute left-3 top-3 rounded-md border border-border/60 bg-background/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        Video coming soon
      </span>
    </div>
  );
}
