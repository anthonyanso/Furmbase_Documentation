"use client";

import * as React from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { safeCopyToClipboard } from "@/lib/safe-clipboard";

const SIZE_BY_LEVEL: Record<2 | 3 | 4 | 5 | 6, string> = {
  2: "mt-12 mb-4 text-2xl first:mt-0",
  3: "mt-8 mb-3 text-lg",
  4: "mt-6 mb-2.5 text-base",
  5: "mt-5 mb-2 text-sm",
  6: "mt-5 mb-2 text-sm uppercase tracking-wide",
};

export function DocHeading({
  id,
  level,
  children,
}: {
  id: string;
  level: 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);
  const Tag = `h${level}` as const;

  async function handleCopy() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    const ok = await safeCopyToClipboard(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <Tag
      id={id}
      className={cn(
        "group flex items-center gap-2 font-semibold tracking-tight text-foreground",
        SIZE_BY_LEVEL[level]
      )}
    >
      <span>{children}</span>
      <span className="relative inline-flex items-center">
        <button
          onClick={handleCopy}
          aria-label={copied ? "Link copied" : "Copy link to heading"}
          className={cn(
            "relative flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-opacity hover:text-primary",
            copied ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          <LinkIcon
            className={cn(
              "absolute size-4 transition-all duration-200 ease-out",
              copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
            )}
          />
          <Check
            className={cn(
              "absolute size-4 text-primary transition-all duration-200 ease-out",
              copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
          />
        </button>
        <span
          className={cn(
            "pointer-events-none absolute left-full ml-1.5 whitespace-nowrap rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background transition-all duration-200 ease-out",
            copied ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
          )}
        >
          Copied!
        </span>
      </span>
    </Tag>
  );
}
