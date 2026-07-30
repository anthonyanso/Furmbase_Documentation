import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, table } from "../blocks";

export const analytics: DocPage = {
  slug: "analytics",
  group: "Collecting Data",
  title: "Analytics",
  description:
    "Understand how respondents move through your form, where they drop off, and what to improve.",
  blocks: [
    p(
      "The Analytics tab turns raw responses into a picture of how your form is performing — views, starts, completions, and per-question drop-off."
    ),
    h2("core-metrics", "Core metrics"),
    table(
      ["Metric", "What it means"],
      [
        ["Views", "Number of times the form's welcome screen was loaded"],
        ["Starts", "Number of respondents who answered at least one question"],
        ["Completions", "Number of respondents who reached the ending screen"],
        [
          "Completion rate",
          "Completions ÷ Starts — the percentage of people who finish once they begin",
        ],
        ["Average time to complete", "Median time between start and completion"],
      ]
    ),
    h2("drop-off-by-question", "Drop-off by question"),
    p(
      "The drop-off chart shows, question by question, what percentage of respondents continued versus abandoned the form. A sharp drop at a specific question usually means it's confusing, too long, or feels too personal too early."
    ),
    tip(
      "If drop-off spikes at a specific question, try marking it optional, moving it later in the form, or splitting it into a simpler question type — then compare completion rate over the following two weeks."
    ),
    h3("comparing-time-periods", "Comparing time periods"),
    p(
      "Use the date range picker at the top of Analytics to compare two periods — for example, before and after a change to your form — side by side."
    ),
    h2("traffic-sources", "Traffic sources"),
    p(
      "If you share your form link with UTM parameters, Furmbase groups views and completions by source, medium, and campaign automatically under the Sources tab."
    ),
    list([
      "utm_source — e.g. newsletter, twitter, google",
      "utm_medium — e.g. email, social, cpc",
      "utm_campaign — a specific campaign name",
    ]),
    h2("exporting-analytics", "Exporting analytics"),
    p(
      "Summary analytics can be exported as a PDF report from the ⋯ menu at the top of the Analytics tab — useful for sharing performance with stakeholders who don't have workspace access."
    ),
    note(
      "Analytics reflect all form views, including your own visits while testing. Use Preview mode (rather than the live link) while testing to keep your data clean."
    ),
  ],
};
