import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDocPage,
  getAdjacentDocPages,
  getDocHeadings,
  getAllDocSlugs,
} from "@/lib/docs-content";
import { DOCS_NAV } from "@/lib/docs-config";
import type { DocBlock } from "@/types/docs";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { ReadingProgress } from "@/components/docs/reading-progress";
import { DocContent } from "@/components/docs/doc-content";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

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

  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/docs/${page.slug}`,
  });
}

/** Question/answer pairs for FAQPage schema — each h2 paired with the paragraph right after it. */
function extractFaqPairs(blocks: DocBlock[]): { q: string; a: string }[] {
  const pairs: { q: string; a: string }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "heading" && block.level === 2) {
      const next = blocks[i + 1];
      if (next?.type === "paragraph") {
        pairs.push({ q: block.title, a: next.content });
      }
    }
  }
  return pairs;
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

  const breadcrumbItems = [
    { title: "Docs", href: "/docs/getting-started" },
    ...(showGroupCrumb ? [{ title: page.group, href: groupHref }] : []),
    { title: page.title },
  ];

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={breadcrumbSchema(
          breadcrumbItems.map((item) => ({ name: item.title, path: item.href || `/docs/${page.slug}` }))
        )}
      />
      {page.slug === "faq" && <JsonLd data={faqSchema(extractFaqPairs(page.blocks))} />}
      <div className="flex gap-10 py-8 lg:py-10">
        <article className="min-w-0 max-w-3xl flex-1">
          <Breadcrumbs items={breadcrumbItems} />

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
