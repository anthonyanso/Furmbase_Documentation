"use client";

import { Toaster } from "sonner";

/**
 * Styled to match the main app's toaster exactly (src/components/ui/app-toaster.tsx
 * in furmbase.com) — richColors off, borderless card, status carried by the icon
 * color alone, so a toast here feels like the same product.
 */
export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      expand
      closeButton
      duration={4500}
      style={{ zIndex: 300 }}
      toastOptions={{
        classNames: {
          toast:
            "group w-full rounded-2xl border-0 bg-card/95 p-4 " +
            "shadow-2xl shadow-black/10 dark:shadow-black/40 backdrop-blur-xl",
          title: "text-sm font-semibold leading-snug text-foreground",
          description: "mt-0.5 text-xs font-medium leading-relaxed text-muted-foreground",
          icon: "shrink-0",
          closeButton:
            "border-0 bg-card text-muted-foreground hover:text-foreground transition-colors",
          actionButton:
            "rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
          cancelButton:
            "rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground",

          success: "[&_[data-icon]]:text-primary",
          error: "[&_[data-icon]]:text-destructive",
          warning: "[&_[data-icon]]:text-warning",
          info: "[&_[data-icon]]:text-sky-500",
        },
      }}
    />
  );
}
