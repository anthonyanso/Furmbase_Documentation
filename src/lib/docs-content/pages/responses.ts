import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, tip, code } from "../blocks";

export const responses: DocPage = {
  slug: "responses",
  group: "Collecting Data",
  title: "Responses",
  description:
    "View, filter, and manage every submission to your forms from a single inbox.",
  blocks: [
    p(
      "The Responses tab shows every submission to a form as it comes in, in real time. This page covers reading individual responses, filtering the inbox, and understanding partial submissions."
    ),
    h2("the-responses-inbox", "The responses inbox"),
    p(
      "Each row represents one submission. Click a row to open the full response, including every answer, submission time, completion status, and — if enabled — the respondent's approximate location and device type. File Upload answers can be downloaded individually from within the response."
    ),
    h3("response-statuses", "Response statuses"),
    list([
      "Completed — the respondent reached the ending screen",
      "Partial — the respondent answered at least one question but did not finish",
      "Incomplete (payment) — a Payment question was reached but payment did not succeed",
    ]),
    tip(
      "Partial responses are still visible and searchable. They're useful for understanding where respondents commonly drop off — cross-reference with Analytics to see the exact question where most partials stop."
    ),
    h2("filtering-and-search", "Filtering and search"),
    p(
      "Use the filter bar above the inbox to narrow responses by date range, completion status, or answer to a specific question. Filters can be combined, and the same filter carries over if you export from the filtered view — see Export Responses."
    ),
    code(
      "text",
      `Example filter:
Submitted after: Jan 1, 2026
AND "Plan interested in" = "Business"`,
      "Combining filters"
    ),
    h2("notifications", "Notifications"),
    p(
      "Turn on instant notifications under Settings → Notifications to receive an email (or a Slack message, via Integrations) the moment a new response comes in."
    ),
  ],
};
