/**
 * `navigator.clipboard` only exists in a secure context (HTTPS, or localhost).
 * Opening the site over plain http — e.g. a dev server reached over the LAN —
 * leaves it `undefined`, and calling `.writeText()` on it throws. Falls back
 * to the legacy `execCommand('copy')` path, which has no such restriction.
 */
export async function safeCopyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to the legacy path
    }
  }

  if (typeof document === "undefined") return false;

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let succeeded = false;
  try {
    succeeded = document.execCommand("copy");
  } catch {
    succeeded = false;
  }
  document.body.removeChild(textarea);

  return succeeded;
}
