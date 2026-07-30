import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, code, table } from "../blocks";

export const integrations: DocPage = {
  slug: "integrations",
  group: "Integrations & Automation",
  title: "Integrations",
  description:
    "Connect Furmbase to the other tools in your stack — Slack, Zapier, Notion, and webhooks.",
  blocks: [
    p(
      "Integrations connect form activity to the rest of your tools, so a new response can trigger a notification, create a record, or kick off a workflow elsewhere."
    ),
    h2("available-integrations", "Available integrations"),
    table(
      ["Integration", "What it does"],
      [
        ["Google Sheets", "Sync responses to a spreadsheet in real time — see Google Sheets"],
        ["Slack", "Post a message to a channel when a form receives a new response"],
        ["Notion", "Create a new database row from each completed response"],
        ["Zapier", "Connect Furmbase to thousands of apps via Zaps"],
        ["Webhooks", "Send a raw HTTP POST to any URL you control"],
      ]
    ),
    h2("connecting-an-integration", "Connecting an integration"),
    p(
      "Open a form's Integrations tab, choose one from the list, and follow the connection flow — most integrations authenticate through the third-party service directly and take under a minute to set up."
    ),
    h2("webhooks", "Webhooks"),
    p(
      "Webhooks send a JSON payload to a URL of your choice every time a response is submitted — the most flexible option if you're building a custom integration."
    ),
    h3("example-payload", "Example payload"),
    code(
      "json",
      `{
  "event": "form.response.completed",
  "form_id": "frm_8k3n2p",
  "response_id": "res_91mv0q",
  "submitted_at": "2026-07-28T14:32:00Z",
  "answers": [
    { "question": "Full name", "value": "Jordan Lee" },
    { "question": "Plan interested in", "value": "Business" }
  ]
}`,
      "Webhook payload"
    ),
    tip(
      "Use a request bin or an endpoint that simply logs the payload while first setting up a webhook, so you can confirm the shape of the data before wiring it into your own system."
    ),
    h2("slack-notifications", "Slack notifications"),
    list([
      "Choose which channel receives new-response notifications",
      "Optionally include a summary of specific answers directly in the Slack message",
      "Mention a teammate automatically when a specific answer matches a condition (e.g. a high-priority support request)",
    ]),
    h2("managing-integrations", "Managing integrations"),
    p(
      "All active integrations for a form are listed under its Integrations tab, where you can pause, reconfigure, or disconnect them at any time without affecting the form itself."
    ),
    note(
      "Disconnecting an integration does not delete data already sent through it — for example, rows already added to a Notion database remain there."
    ),
  ],
};
