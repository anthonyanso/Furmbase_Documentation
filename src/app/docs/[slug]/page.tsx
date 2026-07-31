import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDocPage,
  getAdjacentDocPages,
  getDocHeadings,
  getAllDocSlugs,
} from "@/lib/docs-content";
import { DOCS_NAV } from "@/lib/docs-config";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { ReadingProgress } from "@/components/docs/reading-progress";
import { DocContent } from "@/components/docs/doc-content";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { Badge } from "@/components/ui/badge";

interface DocRouteParams {
  slug: string;
}

export function generateStaticParams(): DocRouteParams[] {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<DocRouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    openGraph: { title: page.title, description: page.description },
  };
}

export default async function DocSlugPage({
  params,
}: {
  params: Promise<DocRouteParams>;
}) {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) notFound();

  const headings = getDocHeadings(page);
  const { prev, next } = getAdjacentDocPages(page.slug);

  const group = DOCS_NAV.find((g) => g.title === page.group);
  const groupHref = group?.items[0]?.href;
  const showGroupCrumb = page.group !== page.title;

  return (
    <>
      <ReadingProgress />
      <div className="flex gap-10 py-8 lg:py-10">
        <article className="min-w-0 max-w-3xl flex-1">
          <Breadcrumbs
            items={[
              { title: "Docs", href: "/docs/getting-started" },
              ...(showGroupCrumb ? [{ title: page.group, href: groupHref }] : []),
              { title: page.title },
            ]}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {page.title}
            </h1>
            {page.badge && (
              <Badge variant={page.badge === "new" ? "new" : "soon"}>
                {page.badge === "new" ? "New" : "Coming Soon"}
              </Badge>
            )}
          </div>
          <p className="mt-3 text-lg text-muted-foreground">
            {page.description}
          </p>

          <div className="mt-10">
            <DocContent blocks={page.blocks} />
          </div>

          <PrevNextNav prev={prev} next={next} />
        </article>

        <TableOfContents headings={headings} />
      </div>
    </>
  );
}
