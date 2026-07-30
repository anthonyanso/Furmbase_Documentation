import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, warning, steps } from "../blocks";

export const googleSheets: DocPage = {
  slug: "google-sheets",
  group: "Data & Exports",
  title: "Google Sheets",
  description:
    "Sync form responses to a Google Sheet automatically, in real time.",
  blocks: [
    p(
      "The Google Sheets integration sends every new response to a connected spreadsheet the moment it's submitted — no manual export needed."
    ),
    h2("connecting-a-sheet", "Connecting a sheet"),
    steps([
      {
        title: "Open Integrations",
        content: "From your form, go to Integrations → Google Sheets.",
      },
      {
        title: "Sign in with Google",
        content:
          "Authorize Furmbase to access Google Sheets on your behalf. Furmbase only requests access to sheets it creates or that you explicitly connect.",
      },
      {
        title: "Choose a destination",
        content:
          "Create a new spreadsheet, or connect an existing one and choose which tab responses should be added to.",
      },
      {
        title: "Map columns",
        content:
          "Furmbase automatically maps each question to a column. Reorder or exclude columns before confirming.",
      },
    ]),
    h2("how-syncing-works", "How syncing works"),
    p(
      "Each new completed response appends a new row. Existing rows are never edited or reordered by Furmbase, so you can safely add your own formulas or extra columns to the same sheet."
    ),
    tip(
      "Add analysis formulas (like AVERAGE or COUNTIF) in columns to the right of the synced data — Furmbase only ever writes to its mapped columns, so your formulas stay intact."
    ),
    h3("what-gets-synced", "What gets synced"),
    list([
      "All completed responses (partial responses are not synced by default)",
      "Submission date and time",
      "Answers to every mapped question, in the order you configured",
    ]),
    h2("updating-the-mapping", "Updating column mapping"),
    p(
      "If you add a new question to your form after connecting a sheet, open Integrations → Google Sheets → Edit Mapping to add a column for it. Existing rows are not backfilled."
    ),
    warning(
      "Renaming or deleting a question after it's mapped can cause new rows to shift out of alignment with existing columns. Re-check your mapping after significant form changes."
    ),
    h2("disconnecting", "Disconnecting"),
    p(
      "Disconnecting the integration stops new rows from syncing, but does not delete the spreadsheet or any rows already added to it."
    ),
    note(
      "Only one Google Sheet destination can be connected per form. Use Zapier (see Integrations) if you need to send responses to multiple sheets or additional destinations."
    ),
  ],
};
