import { Library, Code2, Newspaper } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SectionNavItem {
  title: string;
  href: string;
  match: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

export const SECTION_NAV: SectionNavItem[] = [
  { title: "Documentation", href: "/docs/getting-started", match: "/docs", icon: Library },
  { title: "Developer Docs", href: "/developers", match: "/developers", icon: Code2, comingSoon: true },
  { title: "Blog", href: "/blog", match: "/blog", icon: Newspaper, comingSoon: true },
];
