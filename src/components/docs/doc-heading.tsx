"use client";

import * as React from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function DocHeading({
  id,
  level,
  children,
}: {
  id: string;
  level: 2 | 3;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);
  const Tag = level === 2 ? "h2" : "h3";

  function handleCopy() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Tag
      id={id}
      className={cn(
        "group flex items-center gap-2 font-semibold tracking-tight text-foreground",
        level === 2
          ? "mt-12 mb-4 text-2xl first:mt-0"
          : "mt-8 mb-3 text-lg"
      )}
    >
      <span>{children}</span>
      <button
        onClick={handleCopy}
        aria-label="Copy link to heading"
        className="opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-primary"
      >
        {copied ? (
          <Check className="size-4" />
        ) : (
          <LinkIcon className="size-4" />
        )}
      </button>
    </Tag>
  );
}
