import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/docs";
import { formatBlogDate } from "@/lib/blog-data";
import { BlogCover } from "@/components/blog/blog-cover";
import { cn } from "@/lib/utils";

export function BlogCard({
  post,
  index,
  featured = false,
}: {
  post: BlogPost;
  index: number;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-ring/40 hover:shadow-lg"
    >
      <BlogCover index={index} className={featured ? "aspect-[16/9]" : "aspect-[16/10]"} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium text-primary">{post.category}</span>
          <span className="text-muted-foreground/60">·</span>
          <span className="text-muted-foreground">{formatBlogDate(post.date)}</span>
        </div>
        <h3
          className={cn(
            "mt-2.5 font-semibold text-foreground transition-colors group-hover:text-primary",
            featured ? "text-xl" : "text-base"
          )}
        >
          {post.title}
        </h3>
        <p
          className={cn(
            "mt-2 text-muted-foreground",
            featured ? "text-sm leading-6 line-clamp-3" : "text-sm leading-6 line-clamp-2"
          )}
        >
          {post.excerpt}
        </p>
        <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn More
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
