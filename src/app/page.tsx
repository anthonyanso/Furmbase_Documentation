import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { FeatureCards } from "@/components/home/feature-cards";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap } from "lucide-react";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <FeatureCards />

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card px-6 py-10 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Prefer to learn by watching?
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Short, focused tutorials for building with Furmbase, from
                your first form to advanced automation.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button variant="secondary" asChild>
                <Link href="/docs/getting-started">
                  <BookOpen />
                  Read the docs
                </Link>
              </Button>
              <Button asChild>
                <Link href="/tutorials">
                  <GraduationCap />
                  View Tutorials
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
