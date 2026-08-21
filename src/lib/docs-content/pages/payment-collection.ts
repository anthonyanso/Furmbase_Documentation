import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, warning, code, table, steps } from "../blocks";

export const paymentCollection: DocPage = {
  slug: "payment-collection",
  group: "Collecting Data",
  title: "Payment Collection",
  description:
    "Accept payments directly inside a Furmbase form, from checkout to withdrawal.",
  blocks: [
    p(
      "A Payment question turns any form into a checkout — tickets, orders, deposits, donations — without a separate payment page. There's nothing to connect or configure to start accepting payments: add a Payment question and it works. This page covers pricing a Payment question, what respondents see, and how to withdraw what you've collected."
    ),
    h2("adding-a-payment-question", "Adding a Payment question"),
    p(
      "Add a Payment block from the Form Builder like any other question. Every Payment question is priced one of two ways."
    ),
    h3("pricing-modes", "Pricing modes"),
    table(
      ["Mode", "Description"],
      [
        ["Fixed", "Every respondent pays the same set amount"],
        [
          "Calculated",
          "The amount is worked out from the respondent's own answers — see Calculated Pricing below",
        ],
      ]
    ),
    tip(
      "Pair a Payment question with Conditional Logic to charge different prices to different respondents — for example, showing a ₦5,000 payment question to students and a ₦15,000 one to everyone else, on the same form and the same link. See Conditional Logic."
    ),
    h2("calculated-pricing", "Calculated pricing"),
    p(
      "Instead of one fixed figure, a Payment question can work out its own amount from earlier answers in the form. Switch its pricing mode to Calculated and add one or more price rules — each rule is one line the respondent sees on their itemised receipt."
    ),
    table(
      ["Rule", "What it does"],
      [
        ["A fixed starting amount", "Always added, e.g. a ₦1,000 booking fee"],
        ["An amount for each one", "Multiplied by a number the respondent enters, e.g. ₦5,000 × number of tickets"],
        ["A different price per choice", "Each option on a earlier question gets its own price, e.g. Regular ₦15,000 · VIP ₦50,000"],
        ["An extra amount when…", "Added only if a condition matches, e.g. +₦2,000 if Airport pickup is Yes"],
        ["An amount for each tick", "Multiplied by how many boxes were ticked on a checkbox question"],
      ]
    ),
    code(
      "text",
      `Booking fee                              NGN 1,000
Tickets          × 2 @ NGN 5,000        NGN 10,000
Airport pickup                           NGN 2,000
────────────────────────────────────────────────
Total                                   NGN 13,000`,
      "Example itemised breakdown"
    ),
    list([
      "Mix as many rules as you like — they all add up into one total",
      "Set an optional minimum or maximum on the total; any clamp appears as its own line (e.g. \"Minimum charge\"), so the breakdown always adds up to what's actually charged",
      "Only questions ABOVE the Payment question can drive its price — a rule needs an answer the respondent has already given",
      "A form with only a calculated Payment question (a donation with a base price, say) submits normally, even with nothing else filled in",
    ]),
    note(
      "The breakdown a respondent sees while filling the form is a preview. The real amount is always recalculated on Furmbase's own server from the form as you saved it and the answers actually submitted — never from what the browser sent. Nobody can open dev tools and pay less, and a hidden Payment question a respondent's branch never showed them is never charged."
    ),
    h2("what-respondents-see", "What respondents see"),
    p(
      "Payment happens inline, on the same page as the rest of the form (or on its own step in multi-step layout). The confirmation screen after a successful payment keeps your form's background and brand color rather than dropping respondents onto a generic page, and shows the real payment reference to quote if they ever need to ask about it."
    ),
    warning(
      "If payment fails or the respondent closes the tab mid-payment — including bank transfer, USSD, or 3-D Secure, which briefly leave the form to complete — nothing is lost. Their answers are saved before checkout opens, so a retry picks up exactly where they left off rather than starting over or double-charging."
    ),
    h2("your-balance-and-withdrawals", "Your balance and withdrawals"),
    p(
      "Payments collected through your forms add up into your wallet balance, shown on your dashboard. Furmbase is the merchant of record for every payment — money is never sent directly to a personal account you own outside Furmbase, and your balance is what Furmbase owes you until you withdraw it."
    ),
    steps([
      {
        title: "Connect a payout account",
        content:
          "From your dashboard, connect the bank account you want withdrawals sent to — choose your country and bank, and enter the account number. The account holder's name is verified automatically before you can use it.",
      },
      {
        title: "Request a withdrawal",
        content: "From Wallet → Withdraw, enter an amount up to your available balance and request it.",
      },
      {
        title: "Confirm with a one-time code",
        content: "A confirmation code is emailed to you. Entering it is what actually creates the withdrawal request.",
      },
      {
        title: "Reviewed and paid out",
        content:
          "Withdrawal requests are reviewed before payout. A small processing fee applies per withdrawal, shown before you confirm.",
      },
    ]),
    note(
      "Your balance is held, never touched by a timer, and never forfeited — it doesn't expire and nothing is auto-withdrawn on your behalf. There's no fixed payout schedule, since every withdrawal is reviewed before it's paid."
    ),
    warning(
      "Furmbase does not currently process refunds automatically from within the platform. If you need to refund a respondent, contact support — refunding a payment does not delete the associated response, which remains in your Responses inbox."
    ),
  ],
};
