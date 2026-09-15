# Furmbase Documentation

The official documentation site for [Furmbase](https://furmbase.com).

## About Furmbase

[Furmbase](https://furmbase.com) is an AI-native form builder for building forms, surveys, payment forms, and event registration forms — describe what you need in plain language and the AI Form Agent drafts the questions, logic, and structure for you, or build one by hand in the drag-and-drop editor.

Beyond form building, Furmbase covers the rest of the workflow a form usually needs: conditional logic and calculated pricing so one form can serve different respondents differently, inline payment collection, response analytics with drop-off tracking, custom branding and domains, and integrations with tools like Google Sheets, Slack, and Zapier. It's positioned as a modern alternative to Google Forms, Typeform, and Jotform — built for solo creators up to operations teams.

Learn more or start building at **[furmbase.com](https://furmbase.com)**.

**Live docs site:** https://doc.furmbase.com

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- Doc content is authored as typed TypeScript data, not Markdown — see [Editing a documentation page](#editing-a-documentation-page)

## Getting started

### Prerequisites

- Node.js 18.18 or later
- npm

### Setup

```bash
git clone https://github.com/anthonyanso/Furmbase_Documentation.git
cd Furmbase_Documentation
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

Also run `npx tsc --noEmit` before committing — the build will fail on type errors even though it isn't a listed script.

## Project structure

```
src/
├── app/                       Next.js App Router routes
│   ├── docs/[slug]/           Individual documentation pages
│   ├── blog/                  Blog (not yet linked from nav — see src/lib/section-nav.ts)
│   ├── developers/            Developer docs (coming soon)
│   ├── search/                Site search (Ctrl/Cmd+K)
│   ├── sitemap.ts             Generated sitemap.xml
│   └── robots.ts              Generated robots.txt
├── components/
│   ├── docs/                  Doc rendering: sidebar, table of contents, code blocks, headings
│   ├── layout/                Header, footer, mobile nav
│   ├── home/                  Homepage sections (hero, feature cards)
│   ├── blog/                  Blog listing and cards
│   ├── search/                Search dialog and provider
│   ├── seo/                   JSON-LD structured data
│   ├── support/                Chatwoot live chat widget
│   └── ui/                     Shared primitives (button, badge, input, kbd...)
├── lib/
│   ├── docs-content/
│   │   ├── pages/              One file per doc page — this is what you'll edit most
│   │   └── blocks.ts           Content block helpers (p, h2, list, table, code, tip, note...)
│   ├── docs-config.ts          Sidebar navigation structure and page order
│   ├── section-nav.ts          Top-level section switcher (Documentation / Developer Docs / Blog)
│   ├── seo.ts                  Metadata + JSON-LD builders
│   ├── blog-data.ts            Blog post content
│   └── github.ts               Repo URL, used by the "Edit on GitHub" links
└── types/docs.ts                Shared content types
```

## Editing a documentation page

Every doc page lives at `src/lib/docs-content/pages/<slug>.ts` as a typed array of content blocks — paragraphs, headings, lists, tables, code samples, and callouts (tip/note/warning). There's no Markdown, so a typo in a block type is caught by the compiler, not by a broken page in production. Look at any existing file (e.g. `getting-started.ts`) for the pattern, and use the helpers exported from `src/lib/docs-content/blocks.ts` rather than writing block objects by hand.

Adding a brand-new page also means registering it in `src/lib/docs-content/index.ts` (so it's built) and `src/lib/docs-config.ts` (so it appears in the sidebar).

## Contributing

This project uses a fork-and-pull-request workflow — nothing reaches `main` (which is what's live in production) without review. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full process.

## License

Not yet decided — treat this repository as "source available" (you're welcome to read, learn from, and propose changes to it via pull request) rather than freely reusable elsewhere until a license file is added.
