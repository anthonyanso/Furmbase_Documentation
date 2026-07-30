import Link from "next/link";
import { Logo } from "@/components/layout/logo";

const FOOTER_LINKS: { title: string; links: { title: string; href: string }[] }[] = [
  {
    title: "Documentation",
    links: [
      { title: "Getting Started", href: "/docs/getting-started" },
      { title: "Form Builder", href: "/docs/form-builder" },
      { title: "Payment Collection", href: "/docs/payment-collection" },
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Tutorials", href: "/tutorials" },
      { title: "Developer Docs", href: "/developers" },
      { title: "Search", href: "/search" },
    ],
  },
  {
    title: "Product",
    links: [
      { title: "Furmbase", href: "https://furmbase.com" },
      { title: "Status", href: "#" },
      { title: "GitHub", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Documentation for building forms, collecting payments, and
              automating workflows with Furmbase.
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold text-foreground">
                {section.title}
              </p>
              <ul className="mt-3 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Furmbase. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for docs.furmbase.com
          </p>
        </div>
      </div>
    </footer>
  );
}
