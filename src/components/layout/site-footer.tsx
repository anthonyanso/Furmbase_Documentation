"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ScrollText, Compass, Package, Github } from "lucide-react";
import { Logo } from "@/components/layout/logo";

const FOOTER_LINKS: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: { title: string; href: string }[];
}[] = [
  {
    title: "Documentation",
    icon: ScrollText,
    links: [
      { title: "Getting Started", href: "/docs/getting-started" },
      { title: "Form Builder", href: "/docs/form-builder" },
      { title: "Payment Collection", href: "/docs/payment-collection" },
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
  {
    title: "Resources",
    icon: Compass,
    links: [
      { title: "Tutorials", href: "/tutorials" },
      { title: "Developer Docs", href: "/developers" },
      { title: "Search", href: "/search" },
    ],
  },
  {
    title: "Product",
    icon: Package,
    links: [
      { title: "Furmbase", href: "https://furmbase.com" },
      { title: "Status", href: "#" },
      { title: "GitHub", href: "#" },
    ],
  },
];

function useCurrentYear() {
  const [year, setYear] = React.useState(() => new Date().getFullYear());

  React.useEffect(() => {
    const msUntilNextYear = new Date(year + 1, 0, 1).getTime() - Date.now();
    const timer = setTimeout(() => setYear(new Date().getFullYear()), msUntilNextYear);
    return () => clearTimeout(timer);
  }, [year]);

  return year;
}

export function SiteFooter() {
  const year = useCurrentYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 xl:px-16 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Documentation for building forms, collecting payments, and
              automating workflows with Furmbase.
            </p>
            <a
              href="https://furmbase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Visit furmbase.com
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {FOOTER_LINKS.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <Icon className="size-3.5 text-primary" />
                  {section.title}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                        <ArrowUpRight className="size-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} Furmbase. All rights reserved.
          </p>
          <a
            href="#"
            title="GitHub (coming soon)"
            aria-label="Furmbase on GitHub"
            className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
