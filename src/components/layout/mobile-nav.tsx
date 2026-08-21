"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DOCS_NAV } from "@/lib/docs-config";
import { SECTION_NAV } from "@/lib/section-nav";
import { comingSoonToast } from "@/lib/coming-soon";
import { ComingSoonButton } from "@/components/layout/coming-soon-button";
import { cn } from "@/lib/utils";

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
                {SECTION_NAV.map((link) => {
                  const Icon = link.icon;
                  if (link.comingSoon) {
                    return (
                      <button
                        key={link.href}
                        onClick={() => comingSoonToast(link.title)}
                        className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <Icon className="size-4 text-muted-foreground" />
                        {link.title}
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <Icon className="size-4 text-muted-foreground" />
                      {link.title}
                    </Link>
                  );
                })}
              </div>

              <div className="h-px bg-border" />

              {DOCS_NAV.map((group, i) => (
                <div key={group.title} className={cn(i > 0 && "mt-6 border-t border-border pt-6")}>
                  <p className="inline-block rounded-md bg-accent/50 px-2.5 py-1 text-sm text-muted-foreground">
                    {group.title}
                  </p>
                  <div className="mt-2 space-y-0.5">
                    {group.items.map((item) => {
                      const isActive = pathname === item.href;
                      const itemClassName = cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-foreground/80"
                      );
                      const label = (
                        <>
                          {item.title}
                          {item.badge && (
                            <Badge variant={item.badge === "new" ? "new" : "soon"}>
                              {item.badge === "new" ? "New" : "Soon"}
                            </Badge>
                          )}
                        </>
                      );

                      if (item.comingSoon) {
                        return (
                          <ComingSoonButton key={item.href} label={item.title} className={cn(itemClassName, "w-full")}>
                            {label}
                          </ComingSoonButton>
                        );
                      }

                      return (
                        <Link key={item.href} href={item.href} className={itemClassName}>
                          {label}
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
