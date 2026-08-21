import type { DocPage } from "@/types/docs";
import { p, h2, h3, note, tip } from "../blocks";

export const formBuilder: DocPage = {
  slug: "form-builder",
  group: "Creating Forms",
  title: "Form Builder",
  description:
    "A tour of the drag-and-drop editor: adding questions, reordering blocks, and setting logic.",
  blocks: [
    p(
      "The Form Builder is where you compose questions, reorder them, and control what happens between them. It's built around three panels: the block list on the left, the live canvas in the center, and the properties panel on the right."
    ),
    h2("adding-blocks", "Adding blocks"),
    p(
      "Click the + button at the bottom of any question, or press / while focused on the canvas, to open the block picker. Blocks include questions, section headers, text/media blocks, and page breaks."
    ),
    h3("drag-and-drop-reordering", "Drag-and-drop reordering"),
    p(
      "Grab the drag handle on the left of any block and drop it into a new position. Dragging a section header moves every question nested underneath it along with it."
    ),
    tip(
      "Hold a block and press Ctrl (Cmd on Mac) while dropping to duplicate it in place instead of moving it — a quick way to create near-identical questions."
    ),
    h2("conditional-logic", "Conditional logic"),
    p(
      "Any question can be shown or hidden based on an earlier answer, and a section can route respondents to a different page — both from the ⋯ menu on that question or section. This is enough to build a form that changes while someone is filling it in, and to charge different Payment question amounts to different respondents. See Conditional Logic for the full guide."
    ),
    h2("required-fields-and-validation", "Required fields and validation"),
    p(
      "Toggle Required on any question from the properties panel. Certain question types add automatic validation — email fields check for a valid address format, and number fields can be constrained to a min/max range. Field options also let a question be required only sometimes — see Smart Fields."
    ),
    h2("thank-you-screen", "The thank-you screen"),
    p(
      "Open Form Settings → Thank you to write the default message every respondent sees after submitting, and optionally set a redirect URL to send them to your own page instead. Wrap {{Question title}} around an earlier question's title to pipe that respondent's own answer into the message."
    ),
    p(
      "The message doesn't have to be the same for everyone. Add a rule — an earlier answer to check, and the message or redirect to show when it matches. Rules are checked top to bottom and the first match wins; if none match, the default message is used."
    ),
    tip(
      "A rule can set a message, a redirect, or both. Only https:// addresses are accepted for redirects, so a form can never be used to send someone somewhere unsafe."
    ),
    h2("previewing", "Previewing your form"),
    p(
      "Use the Preview toggle in the top-right corner to test your form exactly as respondents will see it, including logic jumps and validation. Preview responses are never saved to your Responses inbox."
    ),
    note(
      "Changes in the Form Builder autosave every few seconds. The save indicator in the top bar shows “Saved” once your latest edit is persisted."
    ),
  ],
};
