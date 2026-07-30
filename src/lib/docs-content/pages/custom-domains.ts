import type { DocPage } from "@/types/docs";
import { p, h2, note, tip, warning, code, table, steps } from "../blocks";

export const customDomains: DocPage = {
  slug: "custom-domains",
  group: "Customization",
  title: "Custom Domains",
  description:
    "Serve your forms from your own domain, such as forms.yourcompany.com.",
  blocks: [
    p(
      "By default, forms are served from a furmbase.com subdomain. Business plan workspaces can connect a custom domain so forms feel fully native to your product."
    ),
    h2("adding-a-domain", "Adding a domain"),
    steps([
      {
        title: "Open domain settings",
        content: "Go to Settings → Domains and click Add Domain.",
      },
      {
        title: "Enter your subdomain",
        content:
          "Enter the subdomain you want to use, for example forms.yourcompany.com. Root domains are not supported — a subdomain is required.",
      },
      {
        title: "Add the DNS record",
        content:
          "Furmbase shows you a CNAME record to add at your DNS provider, pointing your subdomain to Furmbase's edge network.",
      },
      {
        title: "Verify",
        content:
          "Once DNS propagates (usually minutes, occasionally up to 24 hours), click Verify. SSL is issued automatically.",
      },
    ]),
    h2("dns-record-reference", "DNS record reference"),
    table(
      ["Type", "Name", "Value"],
      [["CNAME", "forms (or your chosen subdomain)", "cname.furmbase.com"]]
    ),
    code(
      "text",
      `forms.yourcompany.com.  CNAME  cname.furmbase.com.`,
      "Example DNS record"
    ),
    tip(
      "If your DNS provider doesn't support CNAME records at the root of a subdomain you're already using for something else, create a dedicated subdomain (e.g. go.yourcompany.com) instead."
    ),
    h2("assigning-forms-to-a-domain", "Assigning forms to a domain"),
    p(
      "Once a domain is verified, open any form's Settings → General and choose the custom domain from the dropdown. The form's shareable link updates immediately to use your domain."
    ),
    warning(
      "Removing a verified domain immediately breaks any links that were shared using it. Update your marketing materials and integrations before removing a domain."
    ),
    h2("ssl-and-renewal", "SSL and renewal"),
    p(
      "Furmbase provisions and renews SSL certificates automatically for every verified custom domain — there is nothing to configure or renew manually."
    ),
    note(
      "Custom domains are available on the Business plan. Free and Pro workspaces can still customize the form slug on the default furmbase.com subdomain."
    ),
  ],
};
