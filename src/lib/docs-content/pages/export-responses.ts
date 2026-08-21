import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, tip, table } from "../blocks";

export const exportResponses: DocPage = {
  slug: "export-responses",
  group: "Data & Exports",
  title: "Export Responses",
  description:
    "Download your form responses as CSV or Excel, or send them straight to Google Drive.",
  blocks: [
    p(
      "Beyond live syncing, every form supports one-off exports of its response data — useful for offline analysis, archiving, or sharing with people outside your workspace."
    ),
    h2("export-formats", "Export formats"),
    table(
      ["Format", "Best for"],
      [
        ["CSV", "Importing into spreadsheets, databases, or other tools"],
        ["Excel (.xlsx)", "Spreadsheet analysis with formatting preserved"],
        ["Export to Drive", "Creating or updating a Google Sheets spreadsheet directly in your Google Drive — see Google Sheets"],
      ]
    ),
    h2("exporting-responses", "Exporting responses"),
    p(
      "From the Responses tab, open the export menu in the top-right corner and choose CSV, Excel, or Export to Drive. CSV and Excel download immediately; Export to Drive asks you to connect your Google account the first time, then creates or updates a spreadsheet in your Drive."
    ),
    h3("filtered-exports", "Filtered exports"),
    p(
      "Any active filter in the Responses inbox is carried over into the export by default — for example, exporting only Completed responses from the last 30 days. Clear filters first if you want every response included."
    ),
    tip(
      "For recurring reporting, connect Export to Drive once and re-run it — it updates the same spreadsheet instead of creating a new file each time."
    ),
    h2("what-is-included", "What's included in an export"),
    list([
      "One row per response, one column per question",
      "Submission date, time, and completion status",
      "File Upload answers as download links (files themselves are not embedded in the export)",
      "Payment amount and status, for forms with a Payment question",
    ]),
  ],
};
