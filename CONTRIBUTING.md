# Contributing to Furmbase Documentation

Thanks for wanting to improve the Furmbase docs. `main` is what's live in production at [doc.furmbase.com](https://doc.furmbase.com) — nobody, including regular contributors, pushes to it directly. Every change goes through a pull request and is reviewed before it merges.

## Workflow

1. **Fork** this repository to your own GitHub account (the "Fork" button, top right of the repo page).

2. **Clone your fork** — not the original repo — locally:
   ```bash
   git clone https://github.com/<your-username>/Furmbase_Documentation.git
   cd Furmbase_Documentation
   npm install
   ```

3. **Create a branch** for your change. Never commit on `main`:
   ```bash
   git checkout -b fix/typo-in-payment-docs
   ```
   Use a short, descriptive name: `fix/...` for a bug or typo, `feat/...` for a new page or feature, `docs/...` for content-only changes.

4. **Make your change**, then verify it locally before pushing:
   ```bash
   npm run dev        # confirm it renders correctly at localhost:3000
   npm run lint        # must pass with no errors
   npx tsc --noEmit     # must pass with no type errors
   ```

5. **Commit and push** to your fork:
   ```bash
   git add <files>
   git commit -m "Fix typo in payment collection docs"
   git push origin fix/typo-in-payment-docs
   ```

6. **Open a pull request** from your branch into `anthonyanso/Furmbase_Documentation:main`. Describe what changed and why — for a content fix, it helps to say what was wrong with the original text.

## What happens next

Every pull request requires a review and approval before it can be merged — see `.github/CODEOWNERS`. You may be asked for changes; push additional commits to the same branch and they'll show up on the same PR. Once approved and merged, the change deploys to production automatically.

## Guidelines

- **Keep pull requests focused.** One fix or one page per PR is much easier to review than a bundle of unrelated changes.
- **Match the existing content style.** Doc pages are structured data, not Markdown — use the block helpers in `src/lib/docs-content/blocks.ts` (`p`, `h2`, `h3`, `list`, `table`, `code`, `steps`, `tip`, `note`, `warning`) rather than hand-writing block objects.
- **Verify accuracy, don't guess.** If you're documenting a Furmbase feature, describe what it actually does — don't invent behavior that "sounds right." If you're unsure, open an issue to ask rather than guessing in a PR.
- **Don't add new dependencies** without opening an issue first to discuss why one's needed.
- **New page?** Register it in both `src/lib/docs-content/index.ts` and `src/lib/docs-config.ts`, or it won't build or won't appear in the sidebar.

## Reporting a bug or suggesting a change without writing code

Open an issue describing the problem or suggestion. You don't need to submit a pull request to contribute — a clear bug report or content correction is just as useful.
