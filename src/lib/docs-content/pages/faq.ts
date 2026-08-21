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
    h2("what-happens-if-i-exceed-my-response-limit", "What happens if I exceed my response limit?"),
    p(
      "Your forms keep collecting responses without interruption. Once you're above your plan's monthly limit, you'll be prompted to upgrade — existing responses are never deleted or hidden."
    ),
    h2("can-i-export-my-data", "Can I export my data if I stop using Furmbase?"),
    p(
      "Yes. Every form's responses can be exported as CSV or Excel at any time from the Responses tab, or synced straight to a Google Sheets spreadsheet in your Google Drive — see Export Responses. There's no lock-in on your own data."
    ),
    h2("is-my-data-secure", "Is my data secure?"),
    p(
      "Form data is encrypted in transit and at rest. Card details are never seen or stored by Furmbase — they're handled entirely by our payment processor, and only a processor token is kept — see Payment Collection."
    ),
    h2("how-do-i-delete-my-account", "How do I delete my account?"),
    p(
      "Account deletion is a 30-day request, not an instant action, since it needs to account for any live forms still collecting payments and any balance you haven't withdrawn yet. See Account Deletion for the full process, including how to cancel a request."
    ),
    tip(
      "Can't find what you're looking for? Use the search bar at the top of any documentation page — press Ctrl K (or ⌘ K on Mac) to jump straight to it."
    ),
    note(
      "This FAQ covers common product questions. For account-specific billing or technical issues, contact support from within your workspace."
    ),
  ],
};
