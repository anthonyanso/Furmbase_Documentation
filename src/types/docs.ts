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
  | { type: "heading"; level: 2 | 3; id: string; title: string }
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
  | { type: "image"; src: string; alt: string; caption?: string }
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
  level: 2 | 3;
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
}

export interface SearchDoc {
  title: string;
  description: string;
  href: string;
  group: string;
  keywords?: string[];
}
