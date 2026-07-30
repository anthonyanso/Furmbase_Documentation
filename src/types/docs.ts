import type { LucideIcon } from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavItem {
  title: string;
  href: string;
  badge?: NavBadge;
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
  | { type: "table"; headers: string[]; rows: string[][] };

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
}

export interface TutorialItem {
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

export interface SearchDoc {
  title: string;
  description: string;
  href: string;
  group: string;
  keywords?: string[];
}
