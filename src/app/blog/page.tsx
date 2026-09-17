import { Newspaper } from "lucide-react";
import { getBlogPosts, getBlogCategories } from "@/lib/blog-data";
import { BlogPageClient } from "@/components/blog/blog-page-client";
import { buildMetadata } from "@/lib/seo";

// Posts are written in a separate admin panel, not deployed alongside this
// site — revalidate periodically so a newly published/edited post shows up
// here without needing a full redeploy.
export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Product updates, guides, and behind-the-scenes posts from the Furmbase team.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getBlogPosts(), getBlogCategories()]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="absolute inset-0 bg-dot [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_10%,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-8rem] h-[22rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px] dark:bg-primary/10" />

        <div className="relative mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <Newspaper className="size-3" />
            Blog
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Insights &amp; Updates
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground sm:text-lg">
            Product updates, deep dives, and honest advice for building forms
            that convert — from the team behind Furmbase.
          </p>
        </div>
      </section>

      <BlogPageClient posts={posts} categories={categories} />
    </>
  );
}
