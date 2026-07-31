import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, code } from "../blocks";

export const creatingForms: DocPage = {
  slug: "creating-forms",
  group: "Creating Forms",
  title: "Creating Forms",
  description:
    "Understand how forms are structured in Furmbase — pages, sections, questions, and flow.",
  blocks: [
    p(
      "A Furmbase form is made up of one or more pages, each containing questions, media, or layout blocks. This page covers the anatomy of a form and the decisions you'll make before adding your first question."
    ),
    h2("anatomy-of-a-form", "Anatomy of a form"),
    list([
      "Welcome screen — optional intro shown before the first question",
      "Pages — a form can be a single scrolling page or split into multiple steps",
      "Questions — the individual fields respondents fill in",
      "Ending screen — a thank-you message, redirect, or summary shown after submission",
    ]),
    h3("single-page-vs-multi-step", "Single-page vs. multi-step"),
    p(
      "Single-page forms show every question at once and work well for short forms. Multi-step forms show one question (or a small group) at a time, which typically improves completion rates for longer forms. You can switch a form's layout at any time from Form Builder → Settings → Layout."
    ),
    tip(
      "For forms with more than 6-7 questions, multi-step layout tends to reduce abandonment. Use Analytics to compare completion rate before and after switching."
    ),
    h2("starting-a-new-form", "Starting a new form"),
    p(
      "From the dashboard, click New Form. You'll be asked to choose a starting point: Blank or AI Form Generator. Every form is autosaved as you edit — there is no separate save button."
    ),
    h2("organizing-with-sections", "Organizing with sections"),
    p(
      "Sections group related questions under a heading, which is useful for longer forms like applications or intake forms. Add a section from the block menu (+) in the Form Builder, then drag questions into it."
    ),
    code(
      "text",
      `Form: Client Onboarding
├─ Section: Your Details
│   ├─ Full name
│   └─ Email address
├─ Section: Project Scope
│   ├─ Project description
│   └─ Estimated budget
└─ Section: Contact Preferences
    └─ Best way to reach you`,
      "Example form structure"
    ),
    h2("form-settings", "Form settings"),
    list([
      "Title & description — shown on the welcome screen and in browser tabs",
      "Language — sets default validation and date/number formatting",
      "Progress bar — shows respondents how far along they are",
      "Response limits — automatically close the form after N submissions",
      "Close date — automatically close the form at a specific date and time",
    ]),
    note(
      "Renaming a form does not change its shareable link. To change the link itself, edit the form slug under Settings → General."
    ),
    h2("duplicating-a-form", "Duplicating a form"),
    p(
      "Any form can be duplicated from the dashboard's ⋯ menu — useful for running the same form across multiple events or clients without rebuilding it from scratch."
    ),
  ],
};
