import type { BlogPost } from "@/types/docs";
import { p, h2, list, steps, table, tip, note } from "@/lib/docs-content/blocks";

/**
 * Demo content. In production this file's exports are the seam to swap:
 * point getBlogPosts/getBlogPostBySlug at the admin panel's API instead of
 * this array, and every page that calls them keeps working unchanged.
 */
const BLOG_POSTS: BlogPost[] = [
  {
    slug: "meet-the-ai-form-generator",
    title: "Meet the AI Form Generator: describe your form, get a draft in seconds",
    excerpt:
      "We've reshaped how teams start building forms. Describe what you need in plain language and get a complete, editable draft — questions, logic, and all — in seconds.",
    category: "Product Updates",
    date: "2026-07-10",
    readTime: "5 min read",
    blocks: [
      p(
        "Starting a form from a blank canvas is the slowest part of building one. The AI Form Generator removes that step: describe what you're trying to collect, and Furmbase returns a complete, editable draft — questions, answer types, and basic logic already wired up."
      ),
      h2("how-it-works", "How it works"),
      p(
        "Open any workspace and choose “Generate with AI” instead of starting from scratch. Write a sentence or two about who's filling out the form and what you need to know. The generator reads that description and produces a structured draft in the same editor you'd use to build one by hand — nothing about the output is locked or special-cased."
      ),
      h2("what-you-can-generate", "What you can generate"),
      list([
        "Client intake forms with the right contact and project fields for your industry",
        "Event registration forms with ticket tiers and calculated pricing",
        "Post-purchase surveys with branching follow-up questions based on a rating",
        "Job application forms with file uploads and screening questions",
      ]),
      h2("refining-the-draft", "Refining the draft"),
      p(
        "A generated form is a starting point, not a final product. Every question, option, and logic rule lands in the Form Builder exactly as if you'd added it yourself, so reordering blocks, adjusting validation, or deleting a question you don't need works the same way it always has."
      ),
      tip(
        "The more specific the description, the better the first draft. “A form for freelance clients to request a quote, with project type, budget range, and timeline” produces a much more useful draft than “a client form.”"
      ),
    ],
  },
  {
    slug: "reduce-drop-off-on-long-forms",
    title: "5 ways to reduce drop-off on long forms",
    excerpt:
      "Long forms don't have to lose respondents halfway through. Here are five changes that consistently move completion rate, from progress indicators to smarter question order.",
    category: "Guides",
    date: "2026-06-28",
    readTime: "7 min read",
    blocks: [
      p(
        "Long forms aren't inherently worse than short ones — abandoned ones are. Across the forms we see in Analytics, drop-off almost always concentrates at a few predictable points rather than trailing off evenly. Fix those points and the rest of the form usually holds up fine."
      ),
      steps([
        {
          title: "Show progress, honestly",
          content:
            "A progress bar that's accurate reduces abandonment more than one that lies to feel encouraging. If a form has ten questions, show ten steps — respondents tolerate length they can see the end of far better than length that surprises them.",
        },
        {
          title: "Put easy questions first",
          content:
            "Name and email cost nothing to answer and build momentum. Save anything that requires thought — budget, file uploads, long text — for after someone has already invested a few taps.",
        },
        {
          title: "Break into sections",
          content:
            "A single 20-question page reads as one large task. The same 20 questions split into four labeled sections read as four small ones, which measurably lowers the perceived effort even though nothing about the content changed.",
        },
        {
          title: "Use conditional logic to skip what doesn't apply",
          content:
            "Every question a respondent has to read and determine is irrelevant to them is a small tax on completion. Skip logic that routes past inapplicable sections keeps the form feeling short for everyone, not just the people it was shortest for.",
        },
        {
          title: "Make the last step feel small",
          content:
            "Drop-off spikes disproportionately on the final question. If the last field is something effortful — a long comment box, a file upload — consider moving it earlier and ending on something quick like a rating or a yes/no.",
        },
      ]),
      p(
        "None of these require rebuilding a form from scratch. Most are a section header, a logic rule, or a reordered block — check Analytics after each change to see which ones move the needle for your specific audience."
      ),
    ],
  },
  {
    slug: "redesigning-payment-collection",
    title: "How we redesigned Furmbase's payment collection flow",
    excerpt:
      "Inline payments, calculated pricing, and fewer steps between a question and a paid response. A look at what changed and why.",
    category: "Product Updates",
    date: "2026-06-12",
    readTime: "6 min read",
    blocks: [
      p(
        "Collecting a payment used to mean sending someone away from the form entirely — off to a separate checkout page, then hoping they came back to finish answering the rest of the questions. The redesigned payment flow keeps everything in one place."
      ),
      h2("before-the-redesign", "Before the redesign"),
      p(
        "Payment was bolted onto the end of a form as a redirect. Anyone paying for a variable amount — a quantity, a selected tier, an add-on — had to do the math themselves before checkout, and any question after the payment step effectively didn't exist, since almost nobody came back."
      ),
      h2("what-changed", "What changed"),
      p(
        "Payment blocks now live inline, like any other question. Pricing can be fixed, tied to a selected option, or calculated from earlier answers — a quantity field multiplied by a unit price, for example — and the total updates live as someone fills out the form. Because it's just another block, questions can come before or after it."
      ),
      h2("whats-next", "What's next"),
      p(
        "We're extending calculated pricing to support multiple line items in a single response, so a single form can act as a simple order form rather than a one-item checkout. That's in active development and will ship as an update to existing payment blocks, not a new block type."
      ),
    ],
  },
  {
    slug: "drop-off-by-question-analytics",
    title: "Analytics just got sharper: drop-off by question is here",
    excerpt:
      "Completion rate tells you something's wrong. Drop-off by question tells you exactly where. Here's how to read the new analytics view.",
    category: "Product Updates",
    date: "2026-05-20",
    readTime: "4 min read",
    blocks: [
      p(
        "Completion rate is a useful headline number, but it can't tell you what to fix. A form stuck at 40% completion could be losing people at question two or question twenty — those are two completely different problems with completely different fixes."
      ),
      h2("from-one-number-to-a-funnel", "From one number to a funnel"),
      p(
        "The new drop-off view turns a form into a funnel, one step per question, showing exactly what percentage of respondents who reached a question actually answered it before moving on. A sharp drop at a single step is a much clearer signal than a gradually declining completion rate."
      ),
      h2("reading-the-new-view", "Reading the new view"),
      p(
        "Open any form's Analytics tab and switch to the Funnel view. Each question is listed in order with its own retention percentage relative to the question before it — so a question showing 60% isn't 60% of everyone who started the form, it's 60% of everyone who saw that specific question."
      ),
      tip(
        "A single question with unusually low retention is almost always the highest-leverage fix available on a form — reword it, make it optional, or move it later rather than reworking the whole form."
      ),
    ],
  },
  {
    slug: "anatomy-of-a-form-that-converts",
    title: "The anatomy of a form that converts",
    excerpt:
      "From the first question to the confirmation screen, small structural choices compound. A breakdown of what high-converting forms have in common.",
    category: "Guides",
    date: "2026-05-02",
    readTime: "8 min read",
    blocks: [
      p(
        "High-converting forms rarely have one obvious trick. They tend to get several small, unglamorous things right at once — the first question, the order, the wording, and the ending — and each one compounds on the others."
      ),
      h2("the-first-question", "The first question"),
      p(
        "The first question sets the entire form's perceived effort. A short, easy, low-stakes opener — a name, a single choice, a yes/no — gets someone moving before they've had a chance to decide the form looks like work."
      ),
      h2("question-order", "Question order"),
      p(
        "Group related questions together and order them the way a person would naturally think about the topic, not the order that's easiest for your database schema. Jumping between unrelated topics forces context-switching that makes a short form feel longer than it is."
      ),
      h2("microcopy", "Microcopy"),
      p(
        "The one line of helper text under a question does more work than its length suggests. “We'll only use this to send your results” next to an email field answers the question a respondent is silently asking before they'll type anything into it."
      ),
      h2("the-confirmation-screen", "The confirmation screen"),
      p(
        "A generic “Thanks for your submission” page is a missed opportunity. Confirming what happens next — a reply time, a next step, a calendar link — turns the end of a form into the start of the relationship instead of a dead end."
      ),
    ],
  },
  {
    slug: "how-our-team-ships-weekly",
    title: "Behind the scenes: how our team ships weekly",
    excerpt:
      "A look at the process, the tools, and the tradeoffs behind shipping product updates every week without breaking what already works.",
    category: "Company",
    date: "2026-04-18",
    readTime: "6 min read",
    blocks: [
      p(
        "Shipping every week isn't about moving faster than everyone else — it's about keeping each change small enough that shipping it is boring. Boring releases are the ones that don't break anything."
      ),
      h2("small-reversible-changes", "Small, reversible changes"),
      p(
        "Every change we ship is scoped to be easy to reason about on its own and, if something's wrong, easy to turn off without touching anything else. That constraint shapes engineering decisions earlier than most teams expect — a feature that can't be built this way usually gets redesigned until it can."
      ),
      h2("a-weekly-cadence", "A weekly cadence"),
      p(
        "We cut a release every week regardless of how much is in it. A light week ships a light release; a heavy week doesn't get held back waiting for more to bundle in. That removes the temptation to cram unrelated changes together, which is usually where regressions come from."
      ),
      h2("what-we-optimize-for", "What we optimize for"),
      p(
        "Given a choice between a bigger change that takes a month and four smaller changes that ship weekly and add up to the same outcome, we take the smaller path almost every time — it means real usage and real feedback show up after week one instead of after week four."
      ),
    ],
  },
  {
    slug: "custom-domains-automatic-ssl",
    title: "Custom domains, automatic SSL: what changed under the hood",
    excerpt:
      "Serving forms from your own domain used to mean manual certificate renewals. Here's how automatic SSL works now, and what it took to build.",
    category: "Product Updates",
    date: "2026-03-30",
    readTime: "5 min read",
    blocks: [
      p(
        "A custom domain makes a form feel like part of your product instead of a third-party tool. The catch used to be certificates: TLS certificates expire, and a lapsed one on your own domain turns into a browser warning instead of a form."
      ),
      h2("the-old-way", "The old way"),
      p(
        "Connecting a custom domain meant adding a DNS record and then manually requesting, installing, and later renewing a certificate before it expired — an easy step to forget, and one that had nothing to do with actually building forms."
      ),
      h2("how-it-works-now", "How it works now"),
      p(
        "Once a domain's DNS is verified, Furmbase provisions a certificate automatically and renews it on a schedule in the background. There's no manual step after the initial DNS record, and no expiry date to track — connecting a domain is now a five-minute task instead of a recurring one."
      ),
      note(
        "Existing custom domains were migrated automatically — if yours was set up before this update, it's already on the automatic renewal path and there's nothing to change."
      ),
    ],
  },
  {
    slug: "form-builder-keyboard-shortcuts",
    title: "10 keyboard shortcuts every Form Builder power user should know",
    excerpt:
      "Reordering blocks, duplicating questions, jumping between panels — the shortcuts that make the editor feel instant once they're muscle memory.",
    category: "Tips",
    date: "2026-03-08",
    readTime: "3 min read",
    blocks: [
      p(
        "None of these shortcuts are essential — the Form Builder works fine with a mouse. But once they're muscle memory, building a form stops feeling like a series of clicks and starts feeling instant."
      ),
      table(
        ["Shortcut", "Action"],
        [
          ["/", "Open the block picker at the current position"],
          ["Ctrl / Cmd + D", "Duplicate the selected block"],
          ["Ctrl / Cmd + Enter", "Add a new question below the current one"],
          ["Ctrl / Cmd + drag", "Duplicate a block in place instead of moving it"],
          ["Delete / Backspace", "Remove the selected block"],
          ["Ctrl / Cmd + ↑ / ↓", "Move the selected block up or down"],
          ["Ctrl / Cmd + P", "Toggle Preview mode"],
          ["Ctrl / Cmd + S", "Force a save (autosave already covers this)"],
          ["Esc", "Deselect the current block and return to canvas view"],
          ["Ctrl / Cmd + K", "Open quick search across the current form"],
        ]
      ),
      p(
        "Start with duplicate and reorder — they're the two used most often when building out a form with several similar questions — and the rest tend to stick once they've saved you a few trips to the mouse."
      ),
    ],
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Swap this for a call to the admin panel's API once posts are managed there.
  return BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export async function getBlogCategories(): Promise<string[]> {
  return Array.from(new Set(BLOG_POSTS.map((post) => post.category)));
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return BLOG_POSTS.map((post) => post.slug);
}

// Synchronous access for build-time index composition (sitemap, search index),
// which need the full list without awaiting a network call.
export { BLOG_POSTS };

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
