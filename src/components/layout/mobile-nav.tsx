"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DOCS_NAV } from "@/lib/docs-config";
import { cn } from "@/lib/utils";

const TOP_LINKS = [
  { title: "Documentation", href: "/docs/getting-started" },
  { title: "Tutorials", href: "/tutorials" },
  { title: "Developer Docs", href: "/developers" },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-muted-foreground"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </Button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-background border-r border-border shadow-2xl animate-slide-in-left">
            <div className="flex items-center justify-between border-b border-border px-4 h-16">
              <span className="text-sm font-semibold">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>

            <nav className="p-4 space-y-6">
              <div className="space-y-1">
                {TOP_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-border" />

              {DOCS_NAV.map((group) => (
                <div key={group.title}>
                  <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {group.title}
                  </p>
                  <div className="mt-1 space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                            isActive
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-foreground/80"
                          )}
                        >
                          {item.title}
                          {item.badge && (
                            <Badge variant={item.badge === "new" ? "new" : "soon"}>
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
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
