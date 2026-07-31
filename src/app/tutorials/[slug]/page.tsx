import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, BarChart2 } from "lucide-react";
import { TUTORIALS } from "@/lib/tutorials-data";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { Callout } from "@/components/docs/callout";
import { VideoPlaceholder } from "@/components/tutorials/video-placeholder";
import { TutorialCard } from "@/components/tutorials/tutorial-card";
import { Badge } from "@/components/ui/badge";

interface TutorialRouteParams {
  slug: string;
}

export function generateStaticParams(): TutorialRouteParams[] {
  return TUTORIALS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TutorialRouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = TUTORIALS.find((t) => t.slug === slug);
  if (!tutorial) return {};
  return { title: tutorial.title, description: tutorial.description };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<TutorialRouteParams>;
}) {
  const { slug } = await params;
  const tutorial = TUTORIALS.find((t) => t.slug === slug);
  if (!tutorial) notFound();

  const related = TUTORIALS.filter(
    (t) => t.category === tutorial.category && t.slug !== tutorial.slug
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8 lg:px-8">
      <Breadcrumbs
        items={[
          { title: "Tutorials", href: "/tutorials" },
          { title: tutorial.title },
        ]}
      />

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {tutorial.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <Badge variant="outline">{tutorial.category}</Badge>
        <span className="flex items-center gap-1">
          <BarChart2 className="size-3.5" /> {tutorial.level}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {tutorial.duration}
        </span>
      </div>

      <p className="mt-4 text-lg text-muted-foreground">{tutorial.description}</p>

      <div className="mt-8">
        <VideoPlaceholder duration={tutorial.duration} className="aspect-video" />
      </div>

      <Callout variant="note" title="Video lesson coming soon">
        This tutorial&apos;s video walkthrough is in production. The summary
        below reflects what it will cover — the video will slot into the
        player above with no change to this page&apos;s layout.
      </Callout>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-foreground">
          What this tutorial covers
        </h2>
        <p className="mt-3 leading-7 text-foreground/85">{tutorial.description}</p>
        <p className="mt-3 leading-7 text-foreground/85">
          Written step-by-step notes will accompany the video for anyone who
          prefers to read, or wants a quick reference to come back to. In
          the meantime, the related documentation pages linked from the
          sidebar cover the same ground in detail.
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-14 border-t border-border pt-8">
          <h2 className="text-lg font-semibold text-foreground">
            More in {tutorial.category}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link
          href="/tutorials"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to all tutorials
        </Link>
      </div>
    </div>
  );
}
