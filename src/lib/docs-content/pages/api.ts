import type { DocPage } from "@/types/docs";
import { p, h2, list, note, code } from "../blocks";

export const api: DocPage = {
  slug: "api",
  group: "Integrations & Automation",
  title: "API",
  description:
    "A REST API for forms, responses, and workspaces — coming soon to Furmbase.",
  blocks: [
    p(
      "A public REST API is in development, so you can create forms, read responses, and manage your workspace programmatically instead of only through the dashboard."
    ),
    h2("planned-capabilities", "Planned capabilities"),
    list([
      "Create and update forms programmatically",
      "Read responses, including filtering by date and status",
      "Manage webhooks and integrations via API",
      "Authenticate with scoped API keys, per workspace",
    ]),
    h2("a-preview-of-the-shape", "A preview of the shape"),
    code(
      "bash",
      `curl https://api.furmbase.com/v1/forms/frm_8k3n2p/responses \\
  -H "Authorization: Bearer fb_live_xxxxxxxxxxxx"`,
      "Illustrative — subject to change before launch"
    ),
    code(
      "json",
      `{
  "data": [
    {
      "response_id": "res_91mv0q",
      "status": "completed",
      "submitted_at": "2026-07-28T14:32:00Z"
    }
  ],
  "has_more": false
}`,
      "Illustrative response shape"
    ),
    h2("full-reference-coming-with-developer-docs", "Full reference lands with Developer Docs"),
    p(
      "Once available, the complete API reference — including authentication, rate limits, SDKs, and endpoint-by-endpoint documentation — will live under Developer Docs, accessible from the top navigation."
    ),
    note(
      "Webhooks (available today under Integrations) already cover many of the “notify me when something happens” use cases the API will support — see the Integrations page."
    ),
  ],
};
