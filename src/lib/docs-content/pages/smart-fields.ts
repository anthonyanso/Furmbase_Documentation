import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, code } from "../blocks";

export const smartFields: DocPage = {
  slug: "smart-fields",
  group: "Creating Forms",
  badge: "new",
  title: "Smart Fields",
  description:
    "Require a question only sometimes, personalize a form with a respondent's own answers, and prefill or hide a field from the link.",
  blocks: [
    p(
      "Three small field-level features that make a form feel less like a static document — a question that's only required in certain circumstances, text that adapts to what someone already answered, and fields that fill themselves in from the link a respondent clicked."
    ),
    h2("require-only-sometimes", "Require only sometimes"),
    p(
      "Make a question required only under certain conditions — for example, a phone number that's only required if the respondent asked for a call back. The required marker (*) only appears when the rule is actually met, so it never marks something the respondent won't be asked for."
    ),
    list(
      [
        "On the question, click the ⋯ menu → Field options",
        "Turn on Require this only sometimes",
        "Set the rule, exactly like Conditional Logic",
      ],
      true
    ),
    note(
      "The question must not already be marked required. If it is, turn the Required switch off first — the panel tells you if it's still on."
    ),
    h2("answer-piping", "Answer piping"),
    p(
      "Puts a respondent's own answer into a later question's title or description, so the form reads like it knows them — for example, “Thanks Chidi, which school do you attend?” You can also use it in the thank-you message."
    ),
    code(
      "text",
      `Thanks {{Full name}}, which school do you attend?`,
      "Answer piping syntax"
    ),
    p("Wrap {{ }} around the title of an earlier question anywhere in a later question's title, description, or the thank-you message."),
    list([
      "It shows the label of a chosen option, never its internal id — pick “VIP” and it prints VIP",
      "Several ticked checkboxes come out as a list, e.g. “T-shirt, Lunch”",
      "If the question hasn't been answered — or is hidden on that respondent's branch — it comes out as nothing, rather than leaving {{...}} visible on screen",
    ]),
    h2("hidden-fields-and-prefilled-links", "Hidden fields and prefilled links"),
    p(
      "Puts information into a form from the link itself, instead of asking for it. There are two ways to use it:"
    ),
    list([
      "Prefilled — the question still shows, but arrives already filled in. Useful for sending someone a link with their email already in place",
      "Hidden — the question is never shown at all. The value just travels with the response, which is how you can record where someone came from without asking them",
    ]),
    h3("how-to-use-it", "How to use it"),
    list(
      [
        "Add a normal short-answer question, e.g. Source",
        "Click the ⋯ menu → Field options",
        "Under Fill this from the link, type a key — say utm_source",
        "To hide it completely, turn on Hide it from respondents",
      ],
      true
    ),
    code(
      "text",
      `https://furmbase.com/f/your-form?utm_source=twitter
https://furmbase.com/f/your-form?email=ada@example.com`,
      "Sharing a prefilled or tracked link"
    ),
    p(
      "One form, a different link per campaign, and every response records which one it came from."
    ),
    tip(
      "A typed answer always wins — if someone has already filled the box themselves, the link never overwrites it. And unlike a question hidden by conditional logic, a hidden field's value is saved with the response, since that's the whole point of it. Conditional logic rules can also read a hidden field, so a link can decide which questions someone sees."
    ),
  ],
};
