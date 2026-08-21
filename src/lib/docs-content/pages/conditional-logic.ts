import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, warning, table } from "../blocks";

export const conditionalLogic: DocPage = {
  slug: "conditional-logic",
  group: "Creating Forms",
  badge: "new",
  title: "Conditional Logic",
  description:
    "Make a form change while someone is filling it in, based on what they answer.",
  blocks: [
    p(
      "Without conditional logic, every respondent sees exactly the same questions in exactly the same order, no matter what they answer. Conditional logic lets a form behave more like a conversation — if someone says they don't have a car, you don't then ask what color it is."
    ),
    h2("the-two-ways-a-form-can-change", "The two ways a form can change"),
    h3("show-or-hide-a-question", "Show or hide a question"),
    p(
      "A question appears or disappears on the same page, depending on an earlier answer. Nobody ever sees both versions, and they don't know the other one exists."
    ),
    h3("skip-a-whole-page", "Skip a whole page"),
    p(
      "In Furmbase, a section is a page — everything after a section becomes a new page with its own Next button. Conditional logic lets a page send respondents somewhere else entirely, so a speaker can jump straight to the speaker questions and never see the attendee pages."
    ),
    h2("charging-different-prices", "Charging different prices"),
    p(
      "Because a Payment question can be hidden or shown like any other question, the price a respondent is asked for can depend on their own answers — a student rate and a public rate on the same form and the same link, for example. The price is always worked out on Furmbase's own server from the form as it's saved, never from the respondent's browser — see Payment Collection. This works even across currencies: a form may hold an NGN branch and a USD branch, as long as no single respondent can reach both."
    ),
    h2("how-to-use-it", "How to use it"),
    h3("show-or-hide-a-question-2", "Setting up a show/hide rule"),
    list(
      [
        "Open your form in the builder and find the question you want to show only sometimes",
        "On that question card, click the ⋯ menu → Conditional logic",
        "A panel opens, reading like a sentence: Show this question when every rule matches — If [ an earlier question ] [ is ] [ a value ]",
        "Click Add another rule if one condition isn't enough — each row is labeled and / or so you can see how they combine",
        "Choose every rule matches (all must be true) or any rule matches (one is enough)",
        "Click Done — or flip Show to Hide if that reads more naturally",
      ],
      true
    ),
    tip(
      "At the bottom of the panel, Furmbase writes your rule out as a plain sentence — “Show ‘Which school?’ when ‘Are you a student?’ is ‘Yes’.” Read that line before you publish; dropdowns are easy to misread, a sentence usually isn't."
    ),
    p(
      "A question with no rules shows nothing extra on its card. Once a question has rules, a green branch icon appears next to duplicate and delete — click it to open or close the rules, and scanning down a long form, the green icons are exactly the questions that branch. Duplicating a question keeps its rules; editing the copy's rules never touches the original."
    ),
    h3("send-people-to-a-different-page", "Send people to a different page"),
    list(
      [
        "Add a section wherever you want a new page to begin",
        "On that section card, click the ⋯ menu → Add conditional rules",
        "Add a rule: If all match [ an earlier question ] [ is ] [ a value ] then [ go to page N ]",
        "Add as many rules as needed — they're checked top to bottom, and the first one that matches wins",
        "Set the Otherwise line for what happens when nothing matches: continue to next page, submit the form, or go to page X",
        "Click Done",
      ],
      true
    ),
    note(
      "Sections have no branch icon — routing is their version of the same feature, and it lives in the ⋯ menu. Once a section has rules, the menu entry reads Edit conditional rules with a tick beside it."
    ),
    h3("the-rule-that-keeps-things-sane", "The rule that keeps things sane"),
    p(
      "You can only build a rule on a question that comes ABOVE the current one — the question picker only lists earlier questions. A rule needs an answer the respondent has already given, so a question can't depend on an answer from further down the form that hasn't been answered yet."
    ),
    h2("handled-for-you", "Things Furmbase handles for you"),
    list([
      "A hidden question never blocks Submit — if it's marked required but hidden for a respondent, it isn't required for them",
      "Answers from an abandoned path are thrown away — if someone answers, backtracks, and takes a different branch, the abandoned answer is never saved with their response",
      "Back goes where they actually came from — jumping from page 1 to page 4 means Back returns to page 1, not a page they never saw",
      "A broken rule never strands a respondent — if you delete a page a rule pointed at, respondents simply continue to the next page; you get the warning instead, in the builder",
    ]),
    h2("warnings-in-the-builder", "Warnings in the builder"),
    p("While you build, Furmbase checks your logic and shows problems above the questions."),
    table(
      ["Red — must fix before publishing", "What it means"],
      [
        ["Rule points at a deleted question", "You removed a question another rule depended on"],
        ["Rule depends on a later question", "The rule uses an answer that hasn't been given yet"],
        ["Rule depends on itself", "A question can't decide its own visibility"],
      ]
    ),
    table(
      ["Yellow — worth checking, still publishable", "What it means"],
      [
        ["Page cannot be reached", "No combination of answers leads there — nobody will see it"],
        ["Unreachable required questions", "That page has required questions nobody will ever answer"],
      ]
    ),
    note(
      "You can always save a draft with these problems, so you never lose work mid-edit — you just can't publish until the red ones are fixed."
    ),
    h2("which-questions-can-drive-a-rule", "Which questions can drive a rule"),
    table(
      ["Question type", "Can drive a rule?"],
      [
        ["Multiple choice, Dropdown, Checkboxes", "Yes"],
        ["Linear scale, Rating", "Yes"],
        ["Short answer, Paragraph", "Yes"],
        ["Date, Time", "Yes"],
        ["File upload", "Partly — only whether a file was uploaded"],
        ["Payment", "No — whether someone paid is only known after they submit"],
        ["Title, Section, Image, Video", "No — these are layout, not questions"],
      ]
    ),
    h2("limits-and-notes", "Limits and notes"),
    list([
      "Pages can loop — you can send people back to an earlier page. The builder warns about a loop with no way out, but doesn't stop you, since sometimes a loop is what you want",
      "Rules use option IDs, not the option's text — renaming an option from “Yes” to “Yeah” doesn't break a rule that points at it. Deleting an option and adding a new one does, and the builder will flag it",
      "Existing forms are unaffected — a form with no rules behaves exactly as it did before",
    ]),
    warning(
      "Rules are checked in the order they're listed, and the first match wins. If two rules could both apply, reorder them if the outcome looks wrong."
    ),
  ],
};
