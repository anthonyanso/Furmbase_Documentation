import type { DocPage } from "@/types/docs";
import { p, h2, note, tip } from "../blocks";

export const faq: DocPage = {
  slug: "faq",
  group: "Resources",
  title: "FAQ",
  description:
    "Answers to the questions we hear most often from people building forms with Furmbase.",
  blocks: [
    h2("is-there-a-free-plan", "Is there a free plan?"),
    p(
      "Yes. Free workspaces can create unlimited forms with a capped number of monthly responses. Paid plans raise or remove response limits and unlock features like custom domains and payment collection fee reductions."
    ),
    h2("can-i-use-my-own-domain", "Can I use my own domain?"),
    p(
      "Yes, on the Business plan. See Custom Domains for the full setup guide, including the exact DNS record required."
    ),
    h2("do-you-support-multiple-languages", "Do you support multiple languages?"),
    p(
      "Forms can be set to any supported language under Settings → General, which adjusts default validation messages, date formats, and number formatting for respondents. Full multi-language (translated) versions of the same form are on our roadmap."
    ),
    h2("what-happens-if-i-exceed-my-response-limit", "What happens if I exceed my response limit?"),
    p(
      "Your forms keep collecting responses without interruption. Once you're above your plan's monthly limit, you'll be prompted to upgrade — existing responses are never deleted or hidden."
    ),
    h2("can-i-export-my-data", "Can I export my data if I stop using Furmbase?"),
    p(
      "Yes. Every form's responses can be exported as CSV, Excel, or PDF at any time from the Responses tab — see Export Responses. There's no lock-in on your own data."
    ),
    h2("is-my-data-secure", "Is my data secure?"),
    p(
      "Form data is encrypted in transit and at rest. Payment details are handled entirely by your connected payment provider and never touch Furmbase's servers directly — see Payment Collection."
    ),
    h2("how-do-i-cancel", "How do I cancel my subscription?"),
    p(
      "Go to Settings → Billing → Cancel Plan. Your workspace remains active on the Free plan afterward, and any forms above the Free plan's limits are paused (not deleted) until you upgrade again."
    ),
    tip(
      "Can't find what you're looking for? Use the search bar at the top of any documentation page — press Ctrl K (or ⌘ K on Mac) to jump straight to it."
    ),
    note(
      "This FAQ covers common product questions. For account-specific billing or technical issues, contact support from within your workspace."
    ),
  ],
};
