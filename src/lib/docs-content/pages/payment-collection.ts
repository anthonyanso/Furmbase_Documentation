import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, warning, code, table, steps } from "../blocks";

export const paymentCollection: DocPage = {
  slug: "payment-collection",
  group: "Collecting Data",
  title: "Payment Collection",
  description:
    "Accept one-time payments directly inside a Furmbase form, from checkout to payout.",
  blocks: [
    p(
      "Furmbase forms can collect payments as part of the response flow — no separate checkout page required. This page covers connecting a payment provider, adding a Payment question, and understanding payouts and fees."
    ),
    h2("connecting-a-payment-provider", "Connecting a payment provider"),
    steps([
      {
        title: "Open payment settings",
        content: "Go to Settings → Payments in your workspace.",
      },
      {
        title: "Connect an account",
        content:
          "Connect a supported payment provider account. You'll be redirected to complete verification with the provider directly — Furmbase never stores your bank details.",
      },
      {
        title: "Set your default currency",
        content:
          "Choose the currency new Payment questions will default to. Individual forms can override this.",
      },
    ]),
    h2("adding-a-payment-question", "Adding a Payment question"),
    p(
      "Add a Payment block from the Form Builder like any other question. You can configure a fixed price, let respondents enter their own amount, or calculate the amount from earlier answers."
    ),
    h3("pricing-modes", "Pricing modes"),
    table(
      ["Mode", "Description"],
      [
        ["Fixed price", "Every respondent pays the same amount"],
        ["Custom amount", "Respondent enters the amount, optionally within a min/max range"],
        [
          "Calculated",
          "Amount is derived from a formula using earlier answers, e.g. quantity × unit price",
        ],
      ]
    ),
    code(
      "text",
      `Example calculated price:
Base price ($25) + (Extra guests × $5) = Total due`,
      "Calculated pricing example"
    ),
    tip(
      "Use a Number or Multiple Choice question just before your Payment block, then reference it in a Calculate rule to build quote-style pricing without any code."
    ),
    h2("what-respondents-see", "What respondents see"),
    p(
      "Payment happens inline, on the same page as the rest of the form (or on its own step in multi-step layout). Respondents enter card details and the response is only marked complete once payment succeeds."
    ),
    warning(
      "If payment fails, the response is saved as Incomplete and is not counted toward your form's response total. Retry attempts appear as a single response once payment succeeds."
    ),
    h2("payouts-and-fees", "Payouts and fees"),
    list([
      "Payouts follow your connected provider's standard payout schedule (typically 2–7 business days)",
      "Furmbase applies a platform fee on top of standard payment processing fees — see your plan for exact rates",
      "Refunds are issued from your connected provider's dashboard, not from within Furmbase",
    ]),
    note(
      "Refunding a payment does not delete the associated form response — it remains in your Responses inbox with an Refunded status."
    ),
  ],
};
