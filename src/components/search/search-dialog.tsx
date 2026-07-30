"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { FileText, Search, ArrowRight } from "lucide-react";
import { SEARCH_INDEX } from "@/lib/search-index";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = React.useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router]
  );

  if (!open) return null;

  const grouped = SEARCH_INDEX.reduce<Record<string, typeof SEARCH_INDEX>>(
    (acc, doc) => {
      acc[doc.group] = acc[doc.group] ?? [];
      acc[doc.group].push(doc);
      return acc;
    },
    {}
  );

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-foreground/30 backdrop-blur-sm px-4 pt-[12vh]"
      onClick={() => onOpenChange(false)}
      role="presentation"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          label="Search documentation"
          shouldFilter
          filter={(value, search) =>
            value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          <div className="flex items-center gap-2.5 border-b border-border px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Search documentation..."
              className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border px-1.5 font-mono text-[10px] text-muted-foreground">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-10 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;.
            </Command.Empty>

            {Object.entries(grouped).map(([group, docs]) => (
              <Command.Group
                key={group}
                heading={group}
                className="px-2 py-1.5 text-xs font-medium text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5"
              >
                {docs.map((doc) => (
                  <Command.Item
                    key={doc.href}
                    value={`${doc.title} ${doc.description} ${doc.group}`}
                    onSelect={() => go(doc.href)}
                    className={cn(
                      "group flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-sm",
                      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                    )}
                  >
                    <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground group-data-[selected=true]:text-accent-foreground" />
                    <span className="flex-1 min-w-0">
                      <span className="block truncate font-medium text-foreground">
                        {doc.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {doc.description}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>

          <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
            <span>Search Furmbase Docs</span>
            <a
              href="/search"
              className="font-medium text-foreground hover:text-primary"
              onClick={(e) => {
                e.preventDefault();
                go(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
              }}
            >
              Advanced search →
            </a>
          </div>
        </Command>
      </div>
    </div>
  );
}
