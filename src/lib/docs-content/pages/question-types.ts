import type { DocPage } from "@/types/docs";
import { p, h2, list, note, tip, table } from "../blocks";

export const questionTypes: DocPage = {
  slug: "question-types",
  group: "Creating Forms",
  title: "Question Types",
  description:
    "Every field type available in the Furmbase Form Builder, and when to use each one.",
  blocks: [
    p(
      "Furmbase includes question types for short answers, choices, ratings, files, and payments. This page describes each type and typical use cases."
    ),
    h2("text-based", "Text-based"),
    table(
      ["Type", "Use it for"],
      [
        ["Short Text", "Names, titles, one-line answers"],
        ["Long Text", "Feedback, descriptions, open-ended answers"],
        ["Email", "Collecting a validated email address"],
        ["Phone Number", "Phone numbers with country code detection"],
        ["Website / URL", "Links to a portfolio, company site, or social profile"],
        ["Number", "Quantities, ages, budgets — supports min/max limits"],
      ]
    ),
    h2("choice-based", "Choice-based"),
    table(
      ["Type", "Use it for"],
      [
        ["Multiple Choice", "Single selection from a list of options"],
        ["Checkboxes", "Multiple selections from a list of options"],
        ["Dropdown", "Single selection, best for long option lists"],
        ["Yes / No", "Quick binary questions or logic gates"],
        ["Picture Choice", "Selecting from images instead of text labels"],
      ]
    ),
    note(
      "On Multiple Choice, Dropdown, Linear Scale, Rating, and Multiple-Choice Grid questions, respondents can tap the option they already picked again to clear it and return the question to unanswered — useful if they selected something by accident."
    ),
    h2("rating-and-scale", "Rating & scale"),
    table(
      ["Type", "Use it for"],
      [
        ["Opinion Scale", "1–10 scale, e.g. NPS-style questions"],
        ["Star Rating", "1–5 star satisfaction ratings"],
        ["Ranking", "Ordering a list of options by preference"],
      ]
    ),
    h2("date-and-file", "Date, file, and signature"),
    table(
      ["Type", "Use it for"],
      [
        ["Date", "Appointment dates, birthdays, deadlines"],
        ["File Upload", "Resumes, images, contracts — see size limits below"],
        ["Signature", "Simple e-signature captured via drawing or typed name"],
      ]
    ),
    h2("payment", "Payment"),
    p(
      "The Payment question type lets respondents pay a fixed price, or a price calculated from earlier answers (e.g. quantity × unit price). See Payment Collection for pricing and withdrawal details."
    ),
    tip(
      "Combine a Number or Multiple Choice question with a Payment block set to Calculated pricing to build simple order forms — the itemised total updates automatically as respondents answer."
    ),
    h2("layout-blocks", "Layout & media blocks"),
    list([
      "Section Header — groups questions under a title",
      "Text / Statement — display-only text, no response captured",
      "Image / Video — embed supporting media between questions",
      "Page Break — split a single-page form into steps",
    ]),
    note(
      "File Upload accepts files up to 25 MB on Free and Pro plans, and up to 250 MB on Business plans. Supported formats include images, PDFs, and common office document formats."
    ),
  ],
};
