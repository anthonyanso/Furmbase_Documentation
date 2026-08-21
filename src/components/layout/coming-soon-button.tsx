"use client";

import * as React from "react";
import { comingSoonToast } from "@/lib/coming-soon";
import { cn } from "@/lib/utils";

/** Renders like a nav link but shows a "coming soon" toast instead of navigating. */
export function ComingSoonButton({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => comingSoonToast(label)}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </button>
  );
}
