import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  note: {
    icon: Info,
    className: "border-border bg-muted/60 text-foreground [&_.callout-icon]:text-muted-foreground",
  },
  tip: {
    icon: Lightbulb,
    className: "border-primary/25 bg-primary/[0.07] text-foreground [&_.callout-icon]:text-primary",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-warning/30 bg-warning/[0.09] text-foreground [&_.callout-icon]:text-warning",
  },
} as const;

export function Callout({
  variant,
  title,
  children,
}: {
  variant: "note" | "tip" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const { icon: Icon, className } = VARIANTS[variant];

  return (
    <div
      className={cn(
        "my-5 flex gap-3 rounded-xl border px-4 py-3.5 text-sm leading-relaxed",
        className
      )}
    >
      <Icon className="callout-icon mt-0.5 size-4.5 shrink-0" />
      <div>
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className="text-foreground/85">{children}</div>
      </div>
    </div>
  );
}
