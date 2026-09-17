"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ArrowRight, Github } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { useSearchDialog } from "@/components/search/search-provider";
import { comingSoonToast } from "@/lib/coming-soon";
import { GITHUB_REPO_URL } from "@/lib/github";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { title: "Documentation", href: "/docs/getting-started", match: "/docs" },
  { title: "Developer Docs", href: "/developers", match: "/developers", comingSoon: true },
  { title: "Blog", href: "/blog", match: "/blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { setOpen } = useSearchDialog();
  const [modKey, setModKey] = React.useState("Ctrl");

  React.useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setModKey("⌘");
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-8 lg:px-12 xl:px-16">
        <MobileNav />
        <Logo />

        <nav className="hidden lg:flex items-center gap-1 ml-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname?.startsWith(link.match);
            if (link.comingSoon) {
              return (
                <button
                  key={link.href}
                  onClick={() => comingSoonToast(link.title)}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.title}
                </button>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        <button
          onClick={() => setOpen(true)}
          className={cn(
            "hidden sm:flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm transition-colors hover:border-ring/40 hover:text-foreground",
            "w-56 lg:w-64"
          )}
        >
          <Search className="size-4 shrink-0" />
          <span className="flex-1 text-left">Search docs...</span>
          <span className="flex items-center gap-0.5">
            <Kbd>{modKey}</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>

        <button
          onClick={() => setOpen(true)}
          aria-label="Search documentation"
          className="sm:hidden inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Search className="size-4.5" />
        </button>

        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="View source on GitHub"
          aria-label="Furmbase Documentation on GitHub"
          className="hidden sm:inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Github className="size-4.5" />
        </a>

        <ThemeToggle />

        <Button size="sm" asChild className="ml-1">
          <a href="https://furmbase.com/signup">
            Get Started
            <ArrowRight className="size-3.5" />
          </a>
        </Button>
      </div>
    </header>
  );
}
