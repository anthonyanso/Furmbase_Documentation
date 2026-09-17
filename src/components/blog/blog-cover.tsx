import Image from "next/image";
import { Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-emerald-600 via-primary/80 to-slate-950",
  "from-teal-500 via-emerald-800 to-slate-950",
  "from-primary via-emerald-700 to-slate-900",
  "from-lime-500 via-emerald-700 to-slate-950",
  "from-emerald-500 via-teal-800 to-slate-950",
];

export function BlogCover({
  index,
  imageUrl,
  alt,
  className,
  priority = false,
}: {
  index: number;
  /** A real cover photo, if the post has one — falls back to a generated gradient when absent. */
  imageUrl?: string;
  alt?: string;
  className?: string;
  /** Set on the single above-the-fold hero cover (the post detail page) so it loads eagerly instead of lazily — everywhere else (card grids) stays lazy. */
  priority?: boolean;
}) {
  if (imageUrl) {
    return (
      <div className={cn("relative overflow-hidden rounded-t-2xl bg-muted", className)}>
        <Image
          src={imageUrl}
          alt={alt ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

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
