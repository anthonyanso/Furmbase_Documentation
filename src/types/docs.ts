import type { LucideIcon } from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavItem {
  title: string;
  href: string;
  badge?: NavBadge;
  comingSoon?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export type DocBlock =
  | { type: "paragraph"; content: string }
  // h1 is reserved for the page/post title itself (rendered separately, not
  // as a block) so a page never ends up with two h1s — writers choosing
  // "Heading 1" in the editor should map to level 2, the largest in-body size.
  | { type: "heading"; level: 2 | 3 | 4 | 5 | 6; id: string; title: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | {
      type: "callout";
      variant: "note" | "tip" | "warning";
      title?: string;
      content: string;
    }
  | { type: "code"; title?: string; language: string; code: string }
  | { type: "steps"; items: { title: string; content: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      /** Intrinsic pixel size, captured from the file at upload time. Drives
       *  correct layout for both landscape and portrait images and avoids
       *  layout shift; falls back to an unsized <img> when absent. */
      width?: number;
      height?: number;
      /** How wide to render the image, as a percentage (1-100) of the post's
       *  content column — set by the admin dragging a resize handle in the
       *  editor. Absent/100 renders full width, same as before this existed. */
      displayWidth?: number;
    }
  | { type: "video"; src: string; poster?: string; caption?: string };

export interface DocPage {
  slug: string;
  group: string;
  title: string;
  description: string;
  badge?: NavBadge;
  blocks: DocBlock[];
}

export interface DocHeading {
  id: string;
  title: string;
  level: 2 | 3 | 4 | 5 | 6;
}

export interface FeatureCardData {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: NavBadge;
  comingSoon?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  blocks: DocBlock[];
  /** Shows in the larger "featured" row at the top of /blog instead of the regular grid — set per post by whoever writes it. */
  featured: boolean;
  /** Real cover photo. When absent, the site falls back to its own generated gradient cover. */
  coverImageUrl?: string;
}

export interface SearchDoc {
  title: string;
  description: string;
  href: string;
  group: string;
  keywords?: string[];
}
