import {
  FileText,
  CreditCard,
  Sparkles,
  BarChart3,
  Globe,
  Workflow,
  Braces,
} from "lucide-react";
import type { FeatureCardData } from "@/types/docs";

export const FEATURE_CARDS: FeatureCardData[] = [
  {
    title: "Create Forms",
    description:
      "Drag-and-drop form building with sections, conditional logic, and instant preview.",
    href: "/docs/creating-forms",
    icon: FileText,
  },
  {
    title: "Collect Payments",
    description:
      "Accept one-time payments inline, with fixed, custom, or calculated pricing.",
    href: "/docs/payment-collection",
    icon: CreditCard,
  },
  {
    title: "AI Form Generator",
    description:
      "Describe your form in plain language and get a complete, editable draft in seconds.",
    href: "/docs/ai-form-generator",
    icon: Sparkles,
    badge: "new",
  },
  {
    title: "Analytics",
    description:
      "Completion rate, drop-off by question, and traffic sources for every form.",
    href: "/docs/analytics",
    icon: BarChart3,
  },
  {
    title: "Custom Domains",
    description:
      "Serve forms from your own domain with automatic SSL, no manual renewal.",
    href: "/docs/custom-domains",
    icon: Globe,
  },
  {
    title: "Automation",
    description:
      "Multi-step workflows triggered by form activity, built visually.",
    href: "/docs/automation",
    icon: Workflow,
    badge: "soon",
  },
  {
    title: "API",
    description:
      "A REST API for forms, responses, and workspaces, with scoped API keys.",
    href: "/docs/api",
    icon: Braces,
    badge: "soon",
  },
];
