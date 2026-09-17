import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug, getAllBlogSlugs, formatBlogDate } from "@/lib/blog-data";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { DocContent } from "@/components/docs/doc-content";
import { BlogCover } from "@/components/blog/blog-cover";
import { BlogCard } from "@/components/blog/blog-card";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

interface BlogRouteParams {
  slug: string;
}

// Posts are written in a separate admin panel, not deployed alongside this
// site — revalidate periodically so a newly published/edited post shows up
// here without needing a full redeploy. New slugs not seen at build time
// are still rendered on demand (dynamicParams defaults to true) and cached
// from then on under this same revalidate window.
export const revalidate = 60;

export async function generateStaticParams(): Promise<BlogRouteParams[]> {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogRouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogRouteParams>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const index = allPosts.findIndex((p) => p.slug === post.slug);

  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-8 lg:px-8">
      <Breadcrumbs items={[{ title: "Blog", href: "/blog" }, { title: post.title }]} />

      <div className="mt-4 flex items-center gap-3">
        <Badge variant="outline">{post.category}</Badge>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays className="size-3.5" /> {formatBlogDate(post.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" /> {post.readTime}
        </span>
      </div>

      <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

      <div className="mt-8">
        <BlogCover
          index={index}
          imageUrl={post.coverImageUrl}
          alt={post.title}
          className="aspect-video"
          priority
        />
      </div>

      <div className="mt-10">
        <DocContent blocks={post.blocks} />
      </div>

      {related.length > 0 && (
        <div className="mt-14 border-t border-border pt-8">
          <h2 className="text-lg font-semibold text-foreground">
            More in {post.category}
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard
                key={p.slug}
                post={p}
                index={allPosts.findIndex((item) => item.slug === p.slug)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}
