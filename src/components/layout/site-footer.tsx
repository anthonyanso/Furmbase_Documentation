"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ScrollText, Compass, Package } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { comingSoonToast } from "@/lib/coming-soon";
import { GITHUB_REPO_URL } from "@/lib/github";

// Same brand marks as furmbase.com's footer — solid, shared 24 viewBox, same
// optical weight, so the icon row reads as one consistent set.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.439.645 1.439 1.439z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "View Source on GitHub", href: GITHUB_REPO_URL, icon: GitHubIcon },
  { label: "Furmbase on Instagram", href: "https://www.instagram.com/furm.base/", icon: InstagramIcon },
  { label: "Furmbase on LinkedIn", href: "https://www.linkedin.com/in/anthonyanso/", icon: LinkedInIcon },
  { label: "Furmbase on X", href: "https://x.com/anthony__anso", icon: XIcon },
] as const;

const PRODUCT_HUNT_URL =
  "https://www.producthunt.com/products/furmbase?utm_source=badge-follow&utm_medium=badge&utm_source=badge-furmbase";

// Product Hunt's official Follow badge, rendered exactly as they serve it — a
// plain <img> since it's a live SVG on their own CDN, not something to route
// through the Next image optimizer and cache a stale snapshot of.
function ProductHuntBadge() {
  return (
    <a
      href={PRODUCT_HUNT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block shrink-0 transition-opacity hover:opacity-90"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=1264840&theme=dark"
        alt="Furmbase - AI form builder with local payments | Product Hunt"
        width={200}
        height={43}
        loading="lazy"
        className="h-[43px] w-[200px] max-w-full"
      />
    </a>
  );
}

interface FooterLink {
  title: string;
  href: string;
  comingSoon?: boolean;
}

const FOOTER_LINKS: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  links: FooterLink[];
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
      { title: "Developer Docs", href: "/developers", comingSoon: true },
      { title: "Search", href: "/search" },
      { title: "View Source", href: GITHUB_REPO_URL },
    ],
  },
  {
    title: "Product",
    icon: Package,
    links: [
      { title: "Furmbase", href: "https://furmbase.com" },
      { title: "Pricing", href: "https://furmbase.com/pricing" },
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
                  {section.links.map((link) =>
                    link.comingSoon ? (
                      <li key={link.title}>
                        <button
                          onClick={() => comingSoonToast(link.title)}
                          className="cursor-pointer text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.title}
                        </button>
                      </li>
                    ) : (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          {...(link.href.startsWith("http")
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.title}
                          <ArrowUpRight className="size-3 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 border-t border-border pt-8 lg:flex-row lg:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} Furmbase. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex size-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
            <ProductHuntBadge />
          </div>
        </div>
      </div>
    </footer>
  );
}
