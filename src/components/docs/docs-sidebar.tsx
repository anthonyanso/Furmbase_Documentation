"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAV } from "@/lib/docs-config";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function DocsSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6">
      {DOCS_NAV.map((group) => (
        <div key={group.title}>
          <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {group.title}
          </p>
          <div className="mt-1.5 space-y-0.5">
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
    <aside className="hidden lg:block w-64 shrink-0 border-r border-sidebar-border bg-sidebar">
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-8 custom-scrollbar">
        <DocsSidebarNav />
      </div>
    </aside>
  );
}
