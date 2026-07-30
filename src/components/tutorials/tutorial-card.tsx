import Link from "next/link";
import type { TutorialItem } from "@/types/docs";
import { Badge } from "@/components/ui/badge";
import { VideoPlaceholder } from "@/components/tutorials/video-placeholder";

export function TutorialCard({ tutorial }: { tutorial: TutorialItem }) {
  return (
    <Link
      href={`/tutorials/${tutorial.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-lg"
    >
      <div className="p-3 pb-0">
        <VideoPlaceholder duration={tutorial.duration} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{tutorial.level}</Badge>
          <span className="text-xs text-muted-foreground">{tutorial.category}</span>
        </div>
        <h3 className="mt-3 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
          {tutorial.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {tutorial.description}
        </p>
      </div>
    </Link>
  );
}
