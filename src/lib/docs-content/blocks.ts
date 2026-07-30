import type { DocBlock } from "@/types/docs";

export const p = (content: string): DocBlock => ({ type: "paragraph", content });

export const h2 = (id: string, title: string): DocBlock => ({
  type: "heading",
  level: 2,
  id,
  title,
});

export const h3 = (id: string, title: string): DocBlock => ({
  type: "heading",
  level: 3,
  id,
  title,
});

export const list = (items: string[], ordered = false): DocBlock => ({
  type: "list",
  ordered,
  items,
});

export const note = (content: string, title = "Note"): DocBlock => ({
  type: "callout",
  variant: "note",
  title,
  content,
});

export const tip = (content: string, title = "Tip"): DocBlock => ({
  type: "callout",
  variant: "tip",
  title,
  content,
});

export const warning = (content: string, title = "Warning"): DocBlock => ({
  type: "callout",
  variant: "warning",
  title,
  content,
});

export const code = (
  language: string,
  codeStr: string,
  title?: string
): DocBlock => ({ type: "code", language, code: codeStr, title });

export const steps = (items: { title: string; content: string }[]): DocBlock => ({
  type: "steps",
  items,
});

export const table = (headers: string[], rows: string[][]): DocBlock => ({
  type: "table",
  headers,
  rows,
});
