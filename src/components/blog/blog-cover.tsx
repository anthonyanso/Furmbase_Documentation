import { Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-emerald-600 via-primary/80 to-slate-950",
  "from-teal-500 via-emerald-800 to-slate-950",
  "from-primary via-emerald-700 to-slate-900",
  "from-lime-500 via-emerald-700 to-slate-950",
  "from-emerald-500 via-teal-800 to-slate-950",
];

export function BlogCover({ index, className }: { index: number; className?: string }) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-t-2xl bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <div className="absolute -right-8 -top-10 size-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-black/20 blur-2xl" />
      <Newspaper className="absolute bottom-4 right-4 size-8 text-white/15" />
    </div>
  );
}
