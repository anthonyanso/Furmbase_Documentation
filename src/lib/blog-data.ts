import type { BlogPost } from "@/types/docs";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * Blog posts live in Supabase (table: blog_posts — see project.sql) and are
 * written by the separate admin panel, not by this repo. This file is the
 * only place that knows the database shape; every page calls the functions
 * below and never queries Supabase directly.
 */
interface BlogPostRow {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  read_time: string;
  blocks: BlogPost["blocks"] | null;
  featured: boolean;
  cover_image_url: string | null;
}

function mapRow(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: row.published_at,
    readTime: row.read_time,
    blocks: row.blocks ?? [],
    featured: row.featured,
    coverImageUrl: row.cover_image_url ?? undefined,
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, category, published_at, read_time, blocks, featured, cover_image_url")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[blog] Failed to load posts:", error.message);
    return [];
  }

  return (data ?? []).map(mapRow);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!isSupabaseConfigured) return undefined;

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, category, published_at, read_time, blocks, featured, cover_image_url")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return undefined;

  return mapRow(data);
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getBlogPosts();
  return Array.from(new Set(posts.map((post) => post.category)));
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
