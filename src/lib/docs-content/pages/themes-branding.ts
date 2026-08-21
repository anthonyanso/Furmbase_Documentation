import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, table, note, tip } from "../blocks";

export const themesBranding: DocPage = {
  slug: "themes-branding",
  group: "Customization",
  title: "Themes & Branding",
  description:
    "Match a form to your brand with a background, brand color, logo, and typography.",
  blocks: [
    p(
      "Every form can be styled so it feels like a natural extension of your product or brand, rather than a generic form page. Open Customize theme in the Form Builder to set it up — changes are scoped to that one form."
    ),
    h2("what-you-can-set", "What you can set"),
    list([
      "Brand color — buttons, the progress bar, and selected answers",
      "Background — a preset or any solid color, see below",
      "Logo and banner image",
      "Typography — separate font and size for the form title, description, and questions",
    ]),
    h2("background", "Background"),
    p(
      "Backgrounds are soft, flat tones designed to stay comfortable behind a long form rather than compete with it."
    ),
    table(
      ["Preset", "Character"],
      [
        ["Warm paper (default)", "Warm cream with a faint paper texture — deliberately not plain white"],
        ["Cool mist", "Pale blue-grey"],
        ["Soft sage", "Pale green"],
        ["Soft sky", "Pale blue"],
        ["Soft blush", "Pale pink"],
        ["Soft lilac", "Pale purple"],
        ["Soft sand", "Warm beige"],
      ]
    ),
    p(
      "Or choose Solid color and pick any color you like, including a dark one, from the curated swatches or the full color picker."
    ),
    tip(
      "Text, option circles, and checkboxes darken automatically on a light background and stay light on a dark one, so switching backgrounds never produces unreadable text — nothing to configure manually."
    ),
    h3("existing-forms", "Existing forms are unaffected"),
    p(
      "If a form was set up on an earlier background option, it keeps rendering exactly as it did. Those options are simply no longer offered when styling a new form."
    ),
    h2("logo-and-banner", "Logo and banner"),
    p(
      "Upload a logo to display on your form, and an optional banner image shown above the first question. Both are scoped to the individual form, so different forms in the same account can carry different branding."
    ),
    h2("typography", "Typography"),
    p(
      "Set the font and size independently for the form title, the description text, and the questions themselves — useful for making a title stand out from the body of the form."
    ),
    note(
      "A theme change only affects the one form you're editing. There's currently no shared, workspace-wide theme that automatically applies to every form — each form is styled on its own."
    ),
  ],
};
