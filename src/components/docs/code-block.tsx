"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  language,
  code,
  title,
}: {
  language: string;
  code: string;
  title?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-code-border bg-code-bg">
      <div className="flex items-center justify-between border-b border-code-border/80 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/40" />
            <span className="size-2.5 rounded-full bg-warning/40" />
            <span className="size-2.5 rounded-full bg-primary/40" />
          </span>
          {title && (
            <span className="ml-2 text-xs text-code-foreground/70">{title}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wide text-code-foreground/50">
            {language}
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-code-foreground/60 transition-colors hover:bg-code-foreground/10 hover:text-code-foreground"
            )}
          >
            {copied ? (
              <>
                <Check className="size-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed">
        <code className="font-mono text-code-foreground">{code}</code>
      </pre>
    </div>
  );
}
