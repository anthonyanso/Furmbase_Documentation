import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, warning, code, steps } from "../blocks";

export const aiFormGenerator: DocPage = {
  slug: "ai-form-generator",
  group: "Creating Forms",
  badge: "new",
  title: "AI Form Generator",
  description:
    "Describe the form you need in plain language and let Furmbase draft the questions, order, and logic.",
  blocks: [
    p(
      "The AI Form Generator turns a short description into a complete, editable form — questions, question types, ordering, and basic logic included. It's the fastest way to go from idea to a form you can publish."
    ),
    h2("how-it-works", "How it works"),
    steps([
      {
        title: "Describe your form",
        content:
          "From the dashboard, click New Form → Generate with AI, then describe the form's purpose, audience, and anything specific it must ask.",
      },
      {
        title: "Review the draft",
        content:
          "The generator returns a full form with suggested question types, required fields, and section grouping.",
      },
      {
        title: "Edit freely",
        content:
          "The result opens directly in the Form Builder. Nothing is locked — reorder, delete, or add questions exactly as you would with a manually built form.",
      },
    ]),
    h2("writing-a-good-prompt", "Writing a good prompt"),
    p(
      "The more context you give, the closer the first draft will match what you need. Mention the audience, the goal, and any must-have questions."
    ),
    h3("example-prompts", "Example prompts"),
    code(
      "text",
      `"A post-event feedback survey for a 2-day virtual conference,
including an NPS question and an open text question for suggestions."

"A job application form for a remote customer support role,
asking for resume upload, availability, and English proficiency."

"An order form for a bakery selling custom cakes, with size,
flavor, delivery date, and a payment question calculated from size."`,
      "Prompt examples"
    ),
    tip(
      "You can regenerate individual sections instead of the whole form — select a section in the builder and choose Regenerate with AI from the ⋯ menu."
    ),
    h2("what-the-ai-can-set-up", "What the AI can set up"),
    list([
      "Question order and grouping into logical sections",
      "Appropriate question types (e.g. Email for an email question, Opinion Scale for satisfaction)",
      "Required vs. optional fields",
      "Basic skip logic for common patterns, such as disqualifying screener questions",
      "A relevant welcome and ending screen message",
    ]),
    h2("limitations", "Limitations"),
    p(
      "The AI Form Generator produces a strong first draft, not a final product. It does not configure payments, integrations, or custom branding automatically — those are set up the same way as any other form."
    ),
    warning(
      "Always review generated forms before publishing, especially required-field settings and any logic jumps, to make sure they match your intent."
    ),
    note(
      "Generating a form does not use any of your existing response data — each generation is based only on the prompt you provide."
    ),
  ],
};
