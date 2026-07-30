import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, table } from "../blocks";

export const exportResponses: DocPage = {
  slug: "export-responses",
  group: "Data & Exports",
  title: "Export Responses",
  description:
    "Download your form responses as CSV, Excel, or PDF for offline analysis and reporting.",
  blocks: [
    p(
      "Beyond live syncing, every form supports one-off exports of its response data in a few common formats — useful for offline analysis, archiving, or sharing with people outside your workspace."
    ),
    h2("export-formats", "Export formats"),
    table(
      ["Format", "Best for"],
      [
        ["CSV", "Importing into spreadsheets, databases, or other tools"],
        ["Excel (.xlsx)", "Spreadsheet analysis with formatting preserved"],
        ["PDF", "Sharing a readable summary with people outside your workspace"],
      ]
    ),
    h2("exporting-responses", "Exporting responses"),
    p(
      "From the Responses tab, click Export in the top-right corner, choose a format, and optionally apply the same filters as your current inbox view (date range, status, or specific answers)."
    ),
    h3("filtered-exports", "Filtered exports"),
    p(
      "Any active filter in the Responses inbox is carried over into the export by default — for example, exporting only Completed responses from the last 30 days. Clear filters first if you want every response included."
    ),
    tip(
      "For recurring reporting, save a filtered view and re-run the same export weekly or monthly rather than rebuilding filters each time."
    ),
    h2("what-is-included", "What's included in an export"),
    list([
      "One row per response, one column per question",
      "Submission date, time, and completion status",
      "File Upload answers as download links (files themselves are not embedded in the export)",
      "Payment amount and status, for forms with a Payment question",
    ]),
    h2("large-exports", "Large exports"),
    p(
      "Exports over roughly 10,000 responses are generated in the background and emailed to you as a download link once ready, instead of downloading instantly in the browser."
    ),
    note(
      "Export links expire after 7 days for security. If a link has expired, generate a new export from the Responses tab."
    ),
  ],
};
