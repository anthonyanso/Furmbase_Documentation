"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { DocHeading } from "@/types/docs";
import { cn } from "@/lib/utils";

interface TocGroup {
  heading: DocHeading;
  children: DocHeading[];
}

function groupHeadings(headings: DocHeading[]): TocGroup[] {
  const groups: TocGroup[] = [];
  for (const heading of headings) {
    if (heading.level === 2 || groups.length === 0) {
      groups.push({ heading, children: [] });
    } else {
      groups[groups.length - 1].children.push(heading);
    }
  }
  return groups;
}

export function TableOfContents({ headings }: { headings: DocHeading[] }) {
  const [activeId, setActiveId] = React.useState<string>("");
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
  const groups = React.useMemo(() => groupHeadings(headings), [headings]);

  React.useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0% -70% 0%", threshold: [0, 1] }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-60 shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 pl-2 custom-scrollbar">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          On this page
        </p>
        <ul className="mt-3 space-y-0.5">
          {groups.map((group) => {
            const isCollapsed = collapsed[group.heading.id] ?? false;
            return (
              <li key={group.heading.id}>
                <div className="flex items-center">
                  <a
                    href={`#${group.heading.id}`}
                    className={cn(
                      "min-w-0 flex-1 truncate border-l-2 py-1 pl-3 text-sm transition-colors",
                      activeId === group.heading.id
                        ? "border-primary text-foreground font-medium"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {group.heading.title}
                  </a>
                  {group.children.length > 0 && (
                    <button
                      onClick={() =>
                        setCollapsed((prev) => ({
                          ...prev,
                          [group.heading.id]: !isCollapsed,
                        }))
                      }
                      aria-label={isCollapsed ? "Expand section" : "Collapse section"}
                      className="shrink-0 cursor-pointer rounded p-1 text-muted-foreground/60 hover:text-foreground"
                    >
                      <ChevronDown
                        className={cn("size-3.5 transition-transform", isCollapsed && "-rotate-90")}
                      />
                    </button>
                  )}
                </div>

                {group.children.length > 0 && !isCollapsed && (
                  <ul className="space-y-0.5">
                    {group.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className={cn(
                            "block border-l-2 py-1 pl-7 text-sm transition-colors",
                            activeId === child.id
                              ? "border-primary text-foreground font-medium"
                              : "border-border text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
