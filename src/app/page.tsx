import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { FeatureCards } from "@/components/home/feature-cards";
import { Button } from "@/components/ui/button";
import { Library, ArrowRight } from "lucide-react";
import { buildMetadata, KEYWORDS } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
  keywords: [...KEYWORDS.primary, ...KEYWORDS.product],
});

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <FeatureCards />

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card px-6 py-10 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Ready to start building?
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Create a free Furmbase account and publish your first form in
                minutes — no credit card required.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button variant="secondary" asChild>
                <Link href="/docs/getting-started">
                  <Library />
                  Read the docs
                </Link>
              </Button>
              <Button asChild>
                <a href="https://furmbase.com/signup">
                  Get Started
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
