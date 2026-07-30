import type { TutorialItem } from "@/types/docs";

export const TUTORIALS: TutorialItem[] = [
  {
    slug: "build-your-first-form",
    title: "Build your first form in 5 minutes",
    description:
      "A walkthrough of creating a workspace, adding your first questions, and publishing a shareable link.",
    duration: "5:12",
    level: "Beginner",
    category: "Getting Started",
  },
  {
    slug: "generate-a-form-with-ai",
    title: "Generate a form with AI",
    description:
      "How to write a good prompt for the AI Form Generator and refine the draft it produces.",
    duration: "4:03",
    level: "Beginner",
    category: "Getting Started",
  },
  {
    slug: "conditional-logic-deep-dive",
    title: "Conditional logic, from simple to advanced",
    description:
      "Skip logic, calculated fields, and building a branching questionnaire that adapts to each respondent.",
    duration: "9:47",
    level: "Intermediate",
    category: "Form Building",
  },
  {
    slug: "multi-step-vs-single-page",
    title: "Choosing multi-step vs. single-page layout",
    description:
      "A side-by-side comparison and how to decide which layout fits your form using Analytics data.",
    duration: "6:30",
    level: "Intermediate",
    category: "Form Building",
  },
  {
    slug: "accepting-payments-in-a-form",
    title: "Accepting payments inside a form",
    description:
      "Connecting a payment provider and building a simple order form with calculated pricing.",
    duration: "7:15",
    level: "Intermediate",
    category: "Payments",
  },
  {
    slug: "branding-your-forms",
    title: "Branding your forms with a shared theme",
    description:
      "Setting up a workspace theme, applying your logo and colors, and overriding it for a single campaign.",
    duration: "5:54",
    level: "Beginner",
    category: "Design & Branding",
  },
  {
    slug: "syncing-to-google-sheets",
    title: "Syncing responses to Google Sheets",
    description:
      "Connecting a spreadsheet, mapping columns, and adding your own analysis formulas safely.",
    duration: "4:41",
    level: "Beginner",
    category: "Integrations",
  },
  {
    slug: "automating-with-webhooks-and-zapier",
    title: "Automating workflows with webhooks and Zapier",
    description:
      "Sending response data to external tools and building a simple multi-step Zap.",
    duration: "8:22",
    level: "Advanced",
    category: "Integrations",
  },
  {
    slug: "reading-your-analytics",
    title: "Reading your form's analytics",
    description:
      "Understanding completion rate, drop-off by question, and traffic sources to improve a form over time.",
    duration: "6:08",
    level: "Intermediate",
    category: "Analytics",
  },
  {
    slug: "custom-domains-setup",
    title: "Connecting a custom domain",
    description:
      "Adding a DNS record, verifying a subdomain, and assigning it to a form on the Business plan.",
    duration: "3:56",
    level: "Advanced",
    category: "Advanced",
  },
];

export const TUTORIAL_CATEGORIES = Array.from(
  new Set(TUTORIALS.map((t) => t.category))
);
