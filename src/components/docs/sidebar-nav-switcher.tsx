"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTION_NAV } from "@/lib/section-nav";
import { comingSoonToast } from "@/lib/coming-soon";
import { cn } from "@/lib/utils";

export function SidebarSectionSwitcher() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {SECTION_NAV.map((item) => {
        const Icon = item.icon;
        const active = pathname?.startsWith(item.match) ?? false;

        const iconBadge = (
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-md border",
              active
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-background text-muted-foreground"
            )}
          >
            <Icon className="size-3.5" />
          </span>
        );

        if (item.comingSoon) {
          return (
            <button
              key={item.href}
              onClick={() => comingSoonToast(item.title)}
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            >
              {iconBadge}
              {item.title}
            </button>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            )}
          >
            {iconBadge}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
