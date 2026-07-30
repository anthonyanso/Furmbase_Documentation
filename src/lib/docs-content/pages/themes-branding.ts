import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, code } from "../blocks";

export const themesBranding: DocPage = {
  slug: "themes-branding",
  group: "Customization",
  title: "Themes & Branding",
  description:
    "Match your forms to your brand with custom colors, fonts, logos, and layout.",
  blocks: [
    p(
      "Every form can use a custom theme so it feels like a natural extension of your product or brand, rather than a generic form page."
    ),
    h2("workspace-themes", "Workspace themes"),
    p(
      "Create a theme once under Settings → Themes and apply it to any form in the workspace. Updating a shared theme updates every form using it — ideal for keeping many forms visually consistent."
    ),
    h3("theme-properties", "What a theme controls"),
    list([
      "Primary color — buttons, progress bar, and selected answers",
      "Background — solid color, gradient, or image",
      "Font — heading and body typography",
      "Corner radius — sharp, rounded, or fully rounded inputs and buttons",
      "Logo — displayed on the welcome screen and, optionally, on every page",
    ]),
    h2("per-form-overrides", "Per-form overrides"),
    p(
      "Any form can override its assigned theme for one-off customization from Form Builder → Design, without affecting the shared theme or other forms using it."
    ),
    tip(
      "Use a shared workspace theme for consistency across most forms, and per-form overrides only for special campaigns — this keeps your brand consistent while still allowing flexibility."
    ),
    h2("custom-css", "Custom CSS (Business plan)"),
    p(
      "Business plan workspaces can add custom CSS for fine-grained control beyond the theme editor — for example, custom fonts not in the built-in list, or precise spacing adjustments."
    ),
    code(
      "css",
      `/* Example: increase spacing between questions */
.fb-question {
  margin-bottom: 2.5rem;
}`,
      "Custom CSS example"
    ),
    h2("welcome-and-ending-screens", "Welcome and ending screens"),
    p(
      "Both screens support a headline, supporting text, a background image or video, and a call-to-action button. The ending screen can also redirect respondents to an external URL after a short delay."
    ),
    note(
      "Custom CSS is applied on top of your theme and is scoped to the individual form — it never affects other forms in your workspace."
    ),
  ],
};
