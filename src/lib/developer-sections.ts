import {
  Rocket,
  KeyRound,
  Package,
  Webhook,
  Plug,
  Braces,
  BookOpenText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DeveloperSection {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const DEVELOPER_NAV_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Introduction",
    items: ["Overview", "Authentication", "Rate limits"],
  },
  {
    title: "Core Resources",
    items: ["Forms", "Responses", "Webhooks", "Workspaces"],
  },
  {
    title: "SDKs",
    items: ["Node.js", "Python", "REST"],
  },
];

export const DEVELOPER_SECTIONS: DeveloperSection[] = [
  {
    title: "REST API",
    description:
      "Create and manage forms, read responses, and act on workspace data programmatically.",
    icon: Braces,
  },
  {
    title: "Authentication",
    description:
      "Scoped API keys per workspace, with granular read/write permissions.",
    icon: KeyRound,
  },
  {
    title: "SDKs",
    description:
      "Official client libraries for Node.js and Python, with more planned.",
    icon: Package,
  },
  {
    title: "Webhooks",
    description:
      "Subscribe to response and payment events in real time from your own backend.",
    icon: Webhook,
  },
  {
    title: "Integrations",
    description:
      "Build on top of the same primitives that power Furmbase's own Slack, Notion, and Sheets integrations.",
    icon: Plug,
  },
  {
    title: "Guides & Examples",
    description:
      "End-to-end examples for common patterns, from custom embeds to response pipelines.",
    icon: BookOpenText,
  },
];

export const DEVELOPER_QUICKSTART_ICON = Rocket;
