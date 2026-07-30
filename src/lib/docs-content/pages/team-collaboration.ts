import type { DocPage } from "@/types/docs";
import { p, h2, h3, list, note, tip, table } from "../blocks";

export const teamCollaboration: DocPage = {
  slug: "team-collaboration",
  group: "Collaboration",
  title: "Team Collaboration",
  description:
    "Invite teammates, assign roles, and work on forms together in a shared workspace.",
  blocks: [
    p(
      "A Furmbase workspace is built for teams — invite collaborators, assign the right level of access, and see who changed what on a shared form."
    ),
    h2("inviting-teammates", "Inviting teammates"),
    p(
      "Go to Settings → Team and click Invite Member. Enter an email address and choose a role. Invited members receive an email with a link to join the workspace."
    ),
    h2("roles-and-permissions", "Roles and permissions"),
    table(
      ["Role", "Can do"],
      [
        ["Owner", "Everything, including billing, deleting the workspace, and transferring ownership"],
        ["Admin", "Manage members, domains, and integrations; full access to all forms"],
        ["Editor", "Create and edit forms; view responses and analytics"],
        ["Viewer", "View forms, responses, and analytics; cannot edit"],
      ]
    ),
    tip(
      "Give clients or stakeholders the Viewer role so they can check responses and analytics without risking accidental edits to a live form."
    ),
    h3("per-form-access", "Per-form access (Business plan)"),
    p(
      "Business plan workspaces can restrict specific forms to specific members or teams, instead of giving every Editor access to every form in the workspace."
    ),
    h2("activity-and-comments", "Activity log and comments"),
    p(
      "Every form has an Activity tab showing who published changes, updated logic, or edited the theme, along with a timestamp. Teammates can also leave comments on individual questions while collaborating in the Form Builder."
    ),
    h2("removing-access", "Removing access"),
    list([
      "Remove a member from Settings → Team to immediately revoke their access to the workspace",
      "Ownership must be transferred before the current owner can leave a workspace",
      "Removed members lose access instantly, but any forms they created remain in the workspace",
    ]),
    note(
      "Role changes take effect immediately. A member currently editing a form will need to refresh the page to see the change reflected."
    ),
  ],
};
