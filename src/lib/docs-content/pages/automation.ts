import type { DocPage } from "@/types/docs";
import { p, h2, list, note, code } from "../blocks";

export const automation: DocPage = {
  slug: "automation",
  group: "Integrations & Automation",
  badge: "soon",
  title: "Automation",
  description:
    "Multi-step workflows triggered by form activity — coming soon to Furmbase.",
  blocks: [
    p(
      "Automation is in active development. It will let you build multi-step workflows triggered by form events — without leaving Furmbase or connecting a third-party automation tool."
    ),
    h2("what-to-expect", "What to expect"),
    list([
      "Trigger workflows on events like a new response, a specific answer, or a failed payment",
      "Chain multiple actions together — for example, tag a response, send a Slack notification, and send a follow-up email",
      "Conditional branches based on respondent answers",
      "A visual builder for composing workflows, similar in spirit to the Form Builder",
    ]),
    h2("a-preview", "A preview of the workflow builder"),
    code(
      "text",
      `Trigger: New response on "Support Request" form
  → IF Priority = "Urgent"
      → Notify #support-urgent on Slack
      → Add tag "urgent" to response
  → ELSE
      → Add response to weekly digest`,
      "Example automation (illustrative, subject to change)"
    ),
    h2("in-the-meantime", "In the meantime"),
    p(
      "Today, similar outcomes can be achieved using Integrations — particularly Webhooks and Zapier — to connect form activity to external automation tools such as Zapier's own multi-step Zaps."
    ),
    note(
      "This page will be updated with setup instructions as Automation becomes available. Join the waitlist from Settings → What's New to be notified at launch."
    ),
  ],
};
