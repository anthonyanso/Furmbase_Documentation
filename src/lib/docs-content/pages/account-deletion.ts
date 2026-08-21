import type { DocPage } from "@/types/docs";
import { p, h2, list, note, tip, warning, steps, table } from "../blocks";

export const accountDeletion: DocPage = {
  slug: "account-deletion",
  group: "Account",
  title: "Account Deletion",
  description:
    "Deleting your account is a 30-day request, not an instant action — here's exactly what happens.",
  blocks: [
    p(
      "Because a Furmbase account can hold an unwithdrawn wallet balance and forms that are still live and taking payments, deleting an account isn't instant. Requesting deletion starts a 30-day window, and nothing about your account, your forms, or your balance is destroyed until that window has passed and you've had the chance to settle up."
    ),
    h2("how-it-works", "How it works"),
    steps([
      {
        title: "Request deletion",
        content:
          "From Settings → Account, request account deletion. Your account is locked, but sign-in keeps working — it's the only way to reach the Cancel request button.",
      },
      {
        title: "The 30-day window",
        content:
          "You'll see a screen with a day-count, the scheduled deletion date, and warnings about any unwithdrawn balance or live forms. You can cancel at any point during this window.",
      },
      {
        title: "If you cancel",
        content: "Your account is fully restored, with nothing lost — forms, responses, and your balance are exactly as they were.",
      },
      {
        title: "If the window elapses",
        content:
          "Your forms are unpublished (set to draft, not deleted) so they stop taking new payments, and your account moves to Held while you settle up.",
      },
      {
        title: "Settling up",
        content:
          "Withdraw any remaining balance and email furmbase@outlook.com. Furmbase reviews the account before it's finally deleted.",
      },
    ]),
    h2("what-happens-to-your-forms", "What happens to your forms"),
    p(
      "At day 30, your forms are unpublished to draft — they stay in your account, they just stop accepting new responses and payments. If you cancel your deletion request afterward, forms are not automatically republished; a payment form silently coming back online would be a bad surprise, so you republish deliberately once you're back."
    ),
    h2("what-happens-to-your-balance", "What happens to your balance"),
    warning(
      "Your wallet balance is held, never touched by a timer, and never forfeited. It doesn't expire, and it is never auto-withdrawn on your behalf — you decide when and where it's paid out."
    ),
    h2("cancelling-a-request", "Cancelling a request"),
    p(
      "Cancel any time during the 30-day window from your dashboard. A cancelled request never blocks you from requesting deletion again later if you change your mind — there's no penalty for cancelling."
    ),
    h2("emails-you-will-receive", "Emails you'll receive"),
    table(
      ["When", "Email"],
      [
        ["Day 0", "Request received — 30 days left"],
        ["Day 23", "Reminder — 7 days left, plus anything blocking completion"],
        ["Day 29", "Final warning — 1 day left"],
        ["Day 30", "Forms offline, account on hold, what to do next"],
        ["Every 30 days after", "A nudge while your account is held, so it never goes silent"],
        ["On cancel", "Confirmation that your account has been restored"],
      ]
    ),
    h2("after-the-window", "After the window"),
    list([
      "Nothing is deleted automatically, ever — the 30 days is your window to act, not a countdown to destruction",
      "Once you've withdrawn any balance and emailed support, an admin reviews and completes the deletion",
      "Only at that point is your account archived and then permanently deleted",
    ]),
    tip(
      "If you're only trying to stop new responses or payments, unpublishing an individual form from your dashboard is faster and fully reversible — you don't need to delete your whole account for that."
    ),
    note(
      "Financial records connected to your account are retained as required by law even after deletion. This does not include your full personal profile, and does not affect anything about how your balance is handled — see the guidance above."
    ),
  ],
};
