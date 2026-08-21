import { toast } from "sonner";

/** Shared copy for any nav item that links to a section that isn't live yet. */
export function comingSoonToast(label: string) {
  toast(`${label} is coming soon`, {
    description: "We're still building this — check back soon.",
  });
}
