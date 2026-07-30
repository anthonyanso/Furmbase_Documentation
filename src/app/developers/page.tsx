import type { Metadata } from "next";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import { CodeBlock } from "@/components/docs/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEVELOPER_NAV_GROUPS, DEVELOPER_SECTIONS } from "@/lib/developer-sections";

export const metadata: Metadata = {
  title: "Developer Documentation",
  description:
    "Furmbase API, SDKs, authentication, webhooks, and integrations — coming soon.",
};

export default function DevelopersPage() {
  return (
    <div className="mx-auto flex max-w-[1400px]">
      <aside className="hidden lg:block w-64 shrink-0 border-r border-sidebar-border bg-sidebar">
        <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-8">
          <nav className="space-y-6">
            {DEVELOPER_NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.title}
                </p>
                <div className="mt-1.5 space-y-0.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="flex cursor-not-allowed items-center justify-between rounded-lg px-3 py-1.5 text-sm text-sidebar-foreground/40"
                    >
                      {item}
                      <Badge variant="soon" className="text-[10px] px-1.5 py-0">
                        Soon
                      </Badge>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <main id="main-content" className="min-w-0 flex-1 px-4 py-10 sm:px-6 lg:px-10">
        <Breadcrumbs items={[{ title: "Developer Documentation" }]} />

        <div className="mt-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Rocket className="size-5" />
          </span>
          <Badge variant="soon">Coming Soon</Badge>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Developer Documentation
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Developer Documentation is coming soon. The Furmbase API, SDKs,
          authentication, webhooks, integrations, and examples will be
          available here.
        </p>

        <div className="mt-8 max-w-2xl">
          <CodeBlock
            language="bash"
            title="A preview of what's coming"
            code={`curl https://api.furmbase.com/v1/forms \\
  -H "Authorization: Bearer fb_live_xxxxxxxxxxxx"`}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/docs/api">
              Read the API roadmap
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/docs/integrations">Explore Integrations</Link>
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEVELOPER_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4.5" />
                  </span>
                  <Badge variant="soon" className="text-[10px] px-1.5 py-0">
                    Soon
                  </Badge>
                </div>
                <h3 className="mt-3.5 text-sm font-semibold text-foreground">
                  {section.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {section.description}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
