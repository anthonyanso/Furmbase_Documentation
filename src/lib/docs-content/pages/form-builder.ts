import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, warning, code } from "../blocks";

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
      "Logic lets you show, skip, or jump to questions based on a respondent's previous answers. Open the Logic tab on any question to add a rule."
    ),
    code(
      "text",
      `IF "How many employees?" is greater than 50
THEN skip to "Enterprise contact details"
ELSE continue to next question`,
      "Example logic rule"
    ),
    list([
      "Show/hide — reveal a question only if a condition is met",
      "Skip to — jump to a specific later question",
      "Jump to ending — end the form early, e.g. after a disqualifying answer",
      "Calculate — adjust a hidden score field based on answers (useful for quizzes)",
    ]),
    warning(
      "Logic rules are evaluated top to bottom. If two rules could both apply to the same question, the first matching rule wins — reorder rules under the Logic tab if the outcome looks wrong."
    ),
    h2("required-fields-and-validation", "Required fields and validation"),
    p(
      "Toggle Required on any question from the properties panel. Certain question types add automatic validation — email fields check for a valid address format, and number fields can be constrained to a min/max range."
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
