"use client";

import { useEffect } from "react";

// Same Chatwoot inbox as furmbase.com (src/components/support/chatwoot.tsx).
// The whole docs site is public content, so — unlike the main app, which
// excludes the signed-in dashboard, auth pages, and respondent-facing forms —
// there's no route here that shouldn't offer the widget.
const WEBSITE_TOKEN = "gkghTdxMdxu1e7GvXY5WzyrS";
const BASE_URL = "https://app.chatwoot.com";

declare global {
  interface Window {
    chatwootSettings?: Record<string, unknown>;
    chatwootSDK?: { run: (opts: { websiteToken: string; baseUrl: string }) => void };
  }
}

// Module-level so a remount (e.g. React Strict Mode) never injects it twice.
let injected = false;

export function ChatwootWidget() {
  useEffect(() => {
    if (typeof window === "undefined" || injected) return;

    window.chatwootSettings = { position: "right", type: "standard", launcherTitle: "" };
    injected = true;

    const script = document.createElement("script");
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    script.onload = () => {
      window.chatwootSDK?.run({ websiteToken: WEBSITE_TOKEN, baseUrl: BASE_URL });
    };
    script.onerror = () => {
      // Allow a retry on a later mount if the CDN was briefly unreachable.
      injected = false;
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
