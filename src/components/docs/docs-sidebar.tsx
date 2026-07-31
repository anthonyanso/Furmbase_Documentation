"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAV } from "@/lib/docs-config";
import { Badge } from "@/components/ui/badge";
import { SidebarSectionSwitcher } from "@/components/docs/sidebar-nav-switcher";
import { cn } from "@/lib/utils";

export function DocsSidebarNav() {
  const pathname = usePathname();

  return (
    <nav>
      {DOCS_NAV.map((group, i) => (
        <div key={group.title} className={cn(i > 0 && "mt-6 border-t border-sidebar-border pt-6")}>
          <p className="px-3 text-sm text-muted-foreground">
            {group.title}
          </p>
          <div className="mt-2 space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/90 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant={item.badge === "new" ? "new" : "soon"}
                      className="shrink-0 px-1.5 py-0 text-[10px]"
                    >
                      {item.badge === "new" ? "New" : "Soon"}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  return (
    <aside className="hidden lg:block w-72 shrink-0 border-r border-sidebar-border bg-sidebar">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-6 pl-4 pr-4 sm:pl-8 lg:pl-12 xl:pl-16 custom-scrollbar">
        <SidebarSectionSwitcher />
        <div className="my-5 h-px bg-sidebar-border" />
        <DocsSidebarNav />
      </div>
    </aside>
  );
}
