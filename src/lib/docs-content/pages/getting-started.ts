import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, warning, code, steps } from "../blocks";

export const gettingStarted: DocPage = {
  slug: "getting-started",
  group: "Getting Started",
  title: "Getting Started",
  description:
    "Create your Furmbase account, understand the workspace, and publish your first form in a few minutes.",
  blocks: [
    p(
      "Furmbase is a form and survey platform for building forms, collecting payments, and turning responses into decisions. This guide walks you through creating a workspace, understanding the dashboard, and publishing your first form."
    ),
    h2("create-your-workspace", "Create your workspace"),
    p(
      "Every Furmbase account starts with a workspace. A workspace holds your forms, responses, team members, and billing settings. You can belong to multiple workspaces — for example, one for your company and one for a side project."
    ),
    steps([
      {
        title: "Sign up",
        content: "Create an account with your email or continue with Google.",
      },
      {
        title: "Name your workspace",
        content:
          "Choose a workspace name your team will recognize, such as your company or product name.",
      },
      {
        title: "Invite your team (optional)",
        content:
          "Add teammates now or later from Settings → Team. See Team Collaboration for role details.",
      },
    ]),
    h2("the-dashboard", "The dashboard"),
    p(
      "After signing in, you land on the workspace dashboard. From here you can create a new form, browse existing forms, and jump into Responses or Analytics for any form without leaving the page."
    ),
    list([
      "Forms — every form in the workspace, sorted by last edited",
      "Templates — starting points for common use cases like surveys, intake forms, and order forms",
      "Responses — a unified inbox across all your forms",
      "Settings — workspace, billing, domains, and integrations",
    ]),
    h2("create-your-first-form", "Create your first form"),
    p("You can start from a blank form, a template, or generate one with AI."),
    h3("blank-or-template", "Blank form or template"),
    p(
      "Click New Form from the dashboard, then choose Blank Form or pick a template from the gallery. Templates come pre-filled with question types and logic you can edit freely."
    ),
    h3("with-ai", "Or generate one with AI"),
    p(
      "Describe what you're building in plain language — for example, “a client intake form for a design agency with a project budget question” — and the AI Form Generator drafts questions, ordering, and logic for you. See AI Form Generator for details."
    ),
    tip(
      "You can switch between the Form Builder and a live Preview at any time using the toggle in the top-right of the editor, so you always see exactly what respondents will see."
    ),
    h2("publishing", "Publishing your form"),
    p(
      "When you're ready, click Publish in the top-right of the Form Builder. Furmbase generates a shareable link immediately. You can also embed the form on your own site or share it via QR code."
    ),
    code(
      "bash",
      `# Example shareable link format
https://forms.furmbase.com/f/your-form-slug`,
      "Shareable form link"
    ),
    note(
      "Published forms can still be edited. Changes go live immediately, but existing responses are never altered or recalculated."
    ),
    h2("next-steps", "Next steps"),
    list([
      "Creating Forms — structure, sections, and logic",
      "Question Types — every field type Furmbase supports",
      "Themes & Branding — match your form to your brand",
      "Payment Collection — accept payments inside a form",
    ]),
    warning(
      "Free workspaces are limited to a set number of monthly responses. If you're expecting high traffic (a launch, a campaign), check your plan limits under Settings → Billing before publishing."
    ),
  ],
};
