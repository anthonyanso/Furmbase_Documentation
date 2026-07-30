import type { Metadata } from "next";
import { TUTORIALS, TUTORIAL_CATEGORIES } from "@/lib/tutorials-data";
import { TutorialCard } from "@/components/tutorials/tutorial-card";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Short, focused tutorials for building forms, collecting payments, and automating workflows with Furmbase.",
};

export default function TutorialsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tutorials
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Focused, step-by-step walkthroughs for building with Furmbase.
          Video lessons are on their way — each tutorial below already has
          its written summary ready.
        </p>
      </div>

      {TUTORIAL_CATEGORIES.map((category) => {
        const items = TUTORIALS.filter((t) => t.category === category);
        return (
          <section key={category} className="mt-14 first:mt-12">
            <h2 className="text-lg font-semibold text-foreground">{category}</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((tutorial) => (
                <TutorialCard key={tutorial.slug} tutorial={tutorial} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
