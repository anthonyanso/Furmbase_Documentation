# FurmBase — development log

Everything built in this working session, written so it can be lifted into the
documentation site. Each section explains **what was wrong**, **what changed**,
and **what you still need to do**.

- [1. Payment & submission flow](#1-payment--submission-flow)
- [2. Form backgrounds](#2-form-backgrounds)
- [3. Public form experience](#3-public-form-experience)
- [4. PWA — install FurmBase as an app](#4-pwa--install-furmbase-as-an-app)
- [5. Live chat support](#5-live-chat-support)
- [6. Footer](#6-footer)
- [7. Toast notifications](#7-toast-notifications)
- [8. Session tracking & login history](#8-session-tracking--login-history)
- [9. Account deletion — request, hold, restore](#9-account-deletion--request-hold-restore)
- [10. Performance & bug fixes](#10-performance--bug-fixes)
- [Database migrations](#database-migrations)
- [Environment variables](#environment-variables)
- [Outstanding work](#outstanding-work)

---

## 1. Payment & submission flow

### The problem

A respondent's answers lived only in their browser's memory while they paid.
Redirect-based payment methods — **bank transfer, USSD, mobile money, 3-D
Secure** — unload the browser tab, which destroyed the answers *and* the payment
receipt. Meanwhile the webhook still credited the form owner.

Net result: **money taken, no response saved, respondent left with nothing.**

### How it works now

Answers are written to the server **before** checkout opens.

```
Submit → /api/form-responses/intent   (answers stored, payment priced from the DB)
       → Flutterwave
       → finalize                     (verified payment + answers saved together)
       → success page
```

Four independent finalizers all converge on one idempotent path:

| # | Finalizer | Covers |
|---|---|---|
| 1 | Inline callback | Card payments |
| 2 | `/forms/complete` return page | 3-D Secure, bank transfer, USSD redirects |
| 3 | Flutterwave webhook | Respondent closed the browser entirely |
| 4 | Cron every 15 min | Webhook never arrived or wasn't configured |

Exactly-once saving is enforced **in Postgres** by `fb_finalize_submission()`
under a row lock — not in JavaScript. Ten calls store one response and credit
the owner once.

### Security holes closed along the way

- **The charge amount was client-controlled.** A respondent could edit the price
  in dev tools. It is now priced from the stored form, server-side.
- **Unverified payments were credited.** A receipt posted without a
  `transaction_id` skipped verification entirely and was booked at whatever
  amount the caller claimed. Now: no verification, no credit.
- **Forged receipts** — payment-shaped objects in the submitted answers are
  stripped before saving.
- **Draft and deleted forms accepted submissions.** Now rejected.
- **A declined card stranded the submission forever** (Flutterwave rejects a
  reused reference). Retry now issues a fresh reference against the same stored
  answers.

### Verified

43 assertions against real Postgres, covering card, pending bank transfer, three
concurrent finalizers producing **one** row, a late "failed" webhook not
un-paying a success, declined-then-retry, two separate charges, and expiry never
touching completed rows.

---

## 2. Form backgrounds

Previously five options, but `glass`, `modern` and `gradient` were **all**
`bg-slate-950` with near-identical navy overlays — three shades of the same
design.

Now **seven distinct presets** plus any solid colour:

| Preset | Character |
|---|---|
| Deep mesh *(default)* | Dark with green/blue/violet mesh |
| Nebula | Violet/magenta cosmic wash |
| Carbon tech | Texture-led — woven carbon grain, no colour tint |
| Midnight | Clean navy, minimal |
| Emerald deep | Green-forward |
| Ember | Warm amber/rose — the only warm option |
| Warm paper | Light, warm paper tone (deliberately not white) |

Plus **Solid colour**: 12 curated professional swatches and a full colour picker.

**Light backgrounds are handled properly.** The renderer has 56 hardcoded
white-text styles, so a pale background would have produced white-on-white. The
background resolver computes WCAG relative luminance and flips the foreground
automatically.

**Existing forms are safe.** Old ids (`glass`, `modern`, `gradient`) are aliased
to their successors, so no saved form resets to the default.

---

## 3. Public form experience

The respondent-facing form was static: inputs were `border-0` and
`bg-transparent` with every focus ring stripped — a placeholder floating in
space with no response to being used.

Now every interaction is driven by **the creator's own brand colour** — nothing
is hardcoded blue or amber:

- **Fields** are real surfaces that lighten on hover and again on focus
- **Options** lift on hover; selected ones take a brand border and tint
- **Scale and rating** cells lift and scale; the chosen one stays scaled
- **Questions** rise in on a short stagger so the page assembles itself
- The old amber links and hardcoded green labels now follow the brand

Every `color-mix()` has a plain-colour fallback, so respondents on older Android
Chrome still get hover and selected states. The whole layer collapses under
`prefers-reduced-motion`.

---

## 4. PWA — install FurmBase as an app

### The problem

There was **no working PWA**. The manifest had empty `name` and `short_name`,
white theme colours against a black UI, and no `start_url`, `scope`, `id` or
maskable icon. There was **no service worker** and **no install handling**, so
Chrome never offered installation at all.

### What exists now

- **Manifest** — real identity, `#0e0f12` theme matching the dark UI, scope, id,
  and three app shortcuts (New form / Responses / Dashboard)
- **Maskable icon** — generated at 72% scale. Android masks icons to circles and
  only the centre 80% survives; the existing icon ran edge-to-edge and would
  have been clipped
- **Service worker** — deliberately conservative:
  - `/api`, `/auth`, `/ad` and all non-GET requests are **never** intercepted
    (a cached payment or auth response is far worse than a slow one)
  - Page navigations are network-first, so deploys aren't pinned
  - Only content-hashed build output is cache-first
  - **No automatic `skipWaiting()`** — a new worker can't swap under a
    respondent who is mid-payment
- **Offline fallback page**
- **"Get FurmBase" button** in the homepage CTA section

### How the install button behaves

`beforeinstallprompt` is captured by an inline `<head>` script, because Chrome
fires it before React hydrates and offers it **only once**. The prompt is never
raised automatically — only from a real click. iOS gets Add-to-Home-Screen
instructions instead, since Safari has no install API. The button renders
nothing until it knows the environment (avoiding hydration mismatch) and
disappears permanently once installed.

---

## 5. Live chat support

Chatwoot, on **marketing pages only**.

| Excluded | Why |
|---|---|
| `/c/*`, `/ad/*` | Support runs through the in-app ticket system |
| Auth pages | A chat bubble over a login form is noise |
| `/f/*`, `/forms/*` | **These belong to the creator, not FurmBase** |

That last one matters: someone filling in a customer's payment form should never
be offered FurmBase support chat — it would look like the form owner's support
and confuse both sides.

The SDK loads once and toggles visibility across navigation. Re-running it would
drop the visitor's conversation and can leave duplicate bubbles.

---

## 6. Footer

- Copyright left; **Instagram, LinkedIn, X** as solid brand marks on the right,
  plus the **Product Hunt** follow badge
- **Documentation** link added under *Company*, after *Contact*, with an
  outward arrow marking it as leaving the site
- Stacks centred on mobile with no horizontal overflow

Docs URL lives in a single constant (`DOCS_URL`) — one line to change when the
subdomain goes live.

---

## 7. Toast notifications

### What was there

**Three** toast systems mounted at once. Only one was used: a wrapper over
Sonner with ~170 call sites. The shadcn toast rendered an empty region on every
page and could never display anything, because nothing ever called it.

### Now

**One** system. All styling lives in a single file
(`src/components/ui/app-toaster.tsx`) — change it and every toast changes, with
**zero call-site edits**.

- `richColors` off — it painted whole toasts a saturated colour that fought the
  dark-card design
- Borderless card, status carried by the icon colour alone
- `zIndex: 300` — dialogs and the payment modal sit at 100–200, so toasts were
  at risk of appearing *behind* them
- Four dead files removed

**Loading spinners** are now possible via `promiseToast`, which takes the
promise itself and spins until it resolves. `addToast()` can never spin — it is
called *after* the work finishes, so there is nothing left to wait for.

> Applied so far to login and signup. The remaining async actions still use the
> instant toast.

---

## 8. Session tracking & login history

### The problem

One browser produced a **new session row on every single login**. The session id
was a random UUID minted per login and deleted on sign-out, so signing in and
out four times created four identical "Chrome on Windows" entries.

It identified a **login**, not a **device**.

### Now

A stable device id, created once per browser, that **survives sign-out**. A
returning device updates its existing row — refreshing IP and last-seen —
instead of stacking a new one. A genuinely new device, phone or tablet still
gets its own entry, which is the point of the list.

This is storage, not fingerprinting: a UUID in localStorage, no canvas or font
probing. Clearing site data resets it, and that sign-in is then correctly
treated as a new device.

**Location added.** Both panels now show *"Lagos, Nigeria"* rather than a raw IP,
resolved from the edge headers the host already attaches — no third-party lookup
and no added latency. A null location never overwrites one already stored, so
signing in locally won't wipe a real location.

> Existing duplicate rows won't merge retroactively. Use **Sign Out All Other
> Devices** once, and it stays at one row per real device from then on.

---

## 9. Account deletion — request, hold, restore

### The problem

Clicking Delete destroyed the profile and auth user **immediately and
irreversibly**. On FurmBase that's dangerous in a way it isn't on most products,
because users hold money and live forms:

- their **published forms stayed live and kept taking payments**, crediting a
  user id that no longer existed
- an **unwithdrawn wallet balance vanished** with no record of what was owed
- **admin deletions recorded nothing at all** — the insert failed with a
  not-null violation and the error was never checked, so the account was
  destroyed and nothing was logged

### The policy now

**Nothing is ever deleted automatically.** The 30 days are the user's window to
act, not a countdown to destruction.

```
Request → account locked (can still sign in) → 30-day window
        → user cancels          → fully restored, nothing lost
        → window elapses        → forms unpublished, account HELD
        → user settles up + emails furmbase@outlook.com
        → admin completes       → archived, then deleted
```

### What the user sees

Signing in shows **only** the deletion screen — a large **"29 days left"**
counter, the scheduled date, warnings about any unwithdrawn balance or live
forms, and a **Cancel request** button. Sign-in deliberately keeps working: it's
the only route to that cancel button.

Past the window it reads *"Awaiting final review — your forms are offline"*
rather than "0 days left", and confirms the account has **not** been deleted.

### Cancelling — and why the record is kept

A cancelled request is marked **`cancelled`**, not deleted. The row is the
record that this account once asked to leave, which matters if someone requests
repeatedly or later disputes what happened.

`cancelled` and `restored` are deliberately separate states:

| Status | Set by | Means |
|---|---|---|
| `cancelled` | the **owner**, from their dashboard | They changed their mind |
| `restored` | an **admin** | Put back after the user replied to the email |

Worth telling apart operationally: a queue full of admin restores means people
are emailing instead of finding the cancel button; a queue full of
self-cancellations means the button works and users are simply reconsidering.

A cancelled request never blocks a new one — the unique index only counts
`pending` and `approved`.

### Emails (all carry the days-left figure)

| When | Email |
|---|---|
| Day 0 | Request received — 30 days left |
| Day 23 | Reminder — 7 days left, plus blockers |
| Day 29 | Final warning — 1 day left |
| Day 30 | Forms offline, account on hold, what to do next |
| Every 30 days after | Nudge while held, so it never goes silent |
| On cancel | Account restored |

### The wallet

**Held, never touched, never expires.** Money paid by a creator's respondents is
never forfeited on a timer, and it is never auto-sent either — stale payout
details and failed transfers are exactly how fraud incidents start.

Unpublishing the forms at day 30 stops *new* payments arriving, which turns the
balance into a fixed, settleable number rather than a moving target.

### Forms

Unpublished to **draft**, not deleted — they stay in the account. If the user
later cancels they are **not** auto-republished: silently putting a payment form
back online would be a bad surprise. The email lists exactly what was taken
offline so they can republish deliberately.

### Archive — "no account is lost"

`account_deletions` was extended from 8 columns to 23. On final deletion it
captures the full profile, subscription, forms, responses, invoices,
transactions, withdrawals, support tickets, stats, financials, integrations and
auth metadata.

> **Note:** keeping financial records is legitimate and often legally required.
> Keeping a full personal profile snapshot forever sits badly against a GDPR
> erasure request. The defensible approach is to retain the money trail and
> pseudonymise personal fields after a retention window — worth deciding
> deliberately.

---

## 10. Performance & bug fixes

### Public pages were showing a spinner instead of content

Every route was gated behind a full-screen auth spinner until Supabase resolved
— including the homepage, all SEO landing pages, and **public forms seen by
respondents**. The server-rendered HTML contained nothing but that spinner, so
there was no early paint and nothing for search engines to read.

The gate is now scoped to `/c` and `/ad` only.

| Route | Before | After |
|---|---|---|
| `/` | 36 KB (spinner) | **104 KB** full page |
| `/pricing` | spinner | **55 KB** |
| `/contact` | spinner | **64 KB** |
| `/google-forms-alternative` | spinner | **77 KB** |
| `/survey-builder` | spinner | **67 KB** |

### "TypeError: Failed to fetch"

`AuthProvider` created a **new Supabase client on every render**, which made the
auth effect tear down and re-run every render — re-firing `getSession()` and
`getUser()` in a loop. On a heavy page that became a burst of auth requests and
dropped connections.

The same bug was found and fixed in two more places: the dashboard's realtime
channel (torn down and reopened every render) and the account guard's polling
interval.

### Hydration mismatches

Two, both from `Math.random()` / `crypto.randomUUID()` running **during render**,
so server and client produced different HTML:

- The testimonial grid computed its animation values inline — also restarting
  the float on every re-render. Replaced with a deterministic hash of the index.
- The login page generated a `sid` for the forgot-password link inline. Now
  minted after mount.

### Card payment failures were reported as "cancelled"

A **declined** card and a **dismissed** modal showed the same message —
*"Payment cancelled"* — and Flutterwave's real reason was discarded. That's why
the actual error was never visible. Declines now show **"Card declined"** with
the real reason, and the full response is logged.

### Notifications pointed at pages that don't exist

26 notifications linked to dead destinations:

| Link | Rows | Problem |
|---|---|---|
| `/c/pricing` | 6 | **The route never existed** — `src/app/c/pricing` was an empty folder |
| `/pricing` | 20 | The **public marketing page** — throws a signed-in user out of the dashboard |

All backfilled to `/c/settings?tab=billings`, the real Billings tab, where the
Manage / Upgrade button opens the change-plan panel. The empty directory was
deleted.

Most of the code was already correct — those rows were historical stragglers
from older code that had since been fixed but never cleaned up. One live link
still pointed at the public page and was corrected.

### Sign-out confirmation

Signing out was a single click with no confirmation. It now opens a small
dialog — FurmBase mark, *"Sign out of FurmBase?"*, **Stay signed in** /
**Sign out**.

Only the three user-initiated triggers open it. The 30-minute idle logout still
signs out directly: asking someone to confirm a sign-out that happened because
they walked away would leave a dialog nobody is there to answer.

The confirm button holds the dialog open with a spinner while the request runs,
rather than vanishing and leaving the dashboard on screen mid-sign-out.

### Other

- Notification bell showed **"9+"** and could never exceed 50 — it counted the
  loaded page, not the table. Now an exact database count.
- Wallet balance hidden by default.
- Testimonial images: three ImageKit originals returned **400** (ImageKit
  refuses to serve those particular originals but will serve them transformed).
  All now carry a sizing transform, which fixes the errors *and* stops
  full-resolution photos being loaded into 40px avatars.
- Five testimonial names didn't match the gender of their photo; one was still
  the placeholder "Jane Doe".
- Login and signup use the local logo instead of an external CDN.
- Removed `placeholder-images.json` — unreferenced anywhere.

---

## Database migrations

All in `implementation.sql`, in order. Every section is **additive and
idempotent** — safe to re-run.

| Section | Adds | Status |
|---|---|---|
| **1** | `pending_submissions` + 4 functions — payment/submission flow | ✅ applied |
| **2** | 15 archive columns on `account_deletions` | ✅ applied |
| **3** | `city`, `region`, `country`, `country_code` on `user_sessions` | ✅ applied |
| **4** | Deletion request lifecycle + `profiles` markers | ✅ applied |
| **5** | 30-day sweep columns (reminders, hold, unpublished forms) | ✅ applied |
| **6** | `cancelled` status + backfill of prior self-cancellations | ⚠️ **run this** |

Section 2 also fixed a **live production bug**: `improvement_suggestions` was
`NOT NULL` with no default, so the admin console's delete path always failed
with `23502` and recorded nothing.

---

## Environment variables

| Variable | Purpose | Status |
|---|---|---|
| `CRON_SECRET` | Authorises all three cron routes | ✅ set (local + Vercel) |
| `FLUTTERWAVE_WEBHOOK_HASH` | Verifies webhook signatures | ✅ set (local + Vercel + Flutterwave) |
| `SOCKET_RELAY_SECRET` | Admin console → main app ticket broadcasts | ✅ set locally — **must also be set on BOTH deployments** |

### Cron jobs

**One** schedule is registered, because Vercel's Hobby plan allows two cron jobs
firing at most once a day each:

| Path | Schedule | Does |
|---|---|---|
| `/api/cron/daily` | daily 06:00 | Triggers all three sweeps below |

The three sweeps still exist as their own endpoints and are still individually
callable — only their `vercel.json` entries are gone:

| Path | Does |
|---|---|
| `/api/cron/subscriptions` | Billing sweep |
| `/api/cron/submissions` | Reconciles unfinished payments |
| `/api/cron/account-deletions` | Deletion reminders, day-30 hold |

`/api/cron/daily` calls them over HTTP in parallel rather than importing them,
so each keeps its own 60-second budget instead of sharing one. A sweep that
fails is logged and reported in the response; it doesn't stop the other two.

**What this costs:** `submissions` ran every 15 minutes and now runs daily. It's
the last of four safety nets behind a paid submission (inline callback → return
page → webhook → this), so ordinary payments are unaffected — only the residual
case where the respondent's browser died *and* the webhook was missed, which now
recovers within a day instead of within 15 minutes. Restoring the 15-minute
schedule means giving it back its own `vercel.json` entry, which needs Pro.

### Flutterwave webhook

URL: `https://furmbase.com/api/payments/flutterwave/webhook`

Preferences: JSON format ✅ · retries ✅ · v3 ✅ · resend ✅ · add meta ✅ ·
failed transactions ✅ · refunds ❌ *(no refund handling exists — enabling it
would raise misleading "payment failed" alerts)*

---

## Production deploy — two build failures and their fixes

The first push to `main` failed to build on Vercel twice. Both are worth
recording because neither reproduces locally by default.

### 1. Google Fonts fetched at build time

```
Failed to fetch `Montserrat` from Google Fonts.
> Build failed because of webpack errors
```

`next/font/google` is not a runtime CDN link — it downloads every requested
weight from `fonts.gstatic.com` **during the build** and inlines them into the
bundle. That made every deploy depend on Google being reachable from Vercel's
build machine, and one day it wasn't. Nothing in the app changed; the build just
stopped being reproducible.

Fixed by self-hosting. All 29 woff2 files — 7 families, latin subset, the exact
same weights — now live in `src/app/fonts/` and load through `next/font/local`.
Rendering is unchanged, the build has no external dependency, and visitors fetch
the fonts from our own origin rather than a third party.

| Family | Weights |
|---|---|
| Inter | 400, 500, 600, 700, 800, 900 |
| Outfit | 400, 500, 600, 700 |
| Playfair Display | 400, 500, 600, 700 |
| Roboto | 400, 500, 700 |
| Space Mono | 400, 700 |
| Montserrat | 400, 500, 600, 700, 800, 900 |
| Merriweather | 300, 400, 700, 900 |

### 2. `useSearchParams()` outside a Suspense boundary

```
⨯ useSearchParams() should be wrapped in a suspense boundary at page "/login".
```

This one was always there — the font failure aborted the build before static
generation ever ran, so it stayed hidden until the fonts were fixed. `/login`
reads `?redirectTo=`, and a client hook that depends on the URL forces the page
out of static rendering unless Next can stream it behind a boundary.

The page body became `LoginForm`, and the default export wraps it in
`<Suspense>` with a dark fallback so there's no white flash before the form
paints. `/forgot-password` and `/c/forms/new/ai` already did this correctly.

Verified with a clean local production build before pushing: exit 0,
68/68 static pages.

---

## Error boundaries — "Get Started" showed a full-page error

Reported: clicking **Get Started** on the homepage landed on `/signup` showing an
error, and only a manual refresh produced the real page.

### What was actually wrong

The app had **no error boundary of any kind** — no `error.tsx`, no
`global-error.tsx`. In Next's App Router that means a single client-side
exception anywhere replaces the entire document with the bare
`Application error: a client-side exception has occurred` page. Header, footer,
everything gone, and the only escape is a manual reload. That's why a transient
error looked like the whole site had died.

The most likely trigger is a tab left open across a deploy. Next splits the app
into hashed chunks; a new build renames them, so a client-side navigation asks
for a file that no longer exists. Nothing is broken — the tab is just holding a
map to the previous build, which is exactly why refreshing fixed it.

### The fix

| File | Catches |
|---|---|
| `src/app/error.tsx` | Errors inside a page — renders inside the layout, so the site chrome survives |
| `src/app/global-error.tsx` | Errors in the root layout itself — replaces the document, so all its styles are inline |

A `ChunkLoadError` now reloads the page automatically instead of showing
anything, because the reload fetches the current build and the visitor lands
where they were going. Every other error gets a branded screen with **Try again**
and **Go home**, plus the Next error `digest` so a report can be matched to the
runtime logs.

Both reload paths are capped at one automatic reload per 30 seconds. Without
that cap a deterministic error would reload forever and the visitor would never
see the message explaining what went wrong.

### Verified

Tested against a real production server with two throwing routes:

- **ordinary client exception** → branded screen, header and footer intact, no
  bare Next error
- **`ChunkLoadError`** → auto-reloaded; because the test route throws every
  time, the 30-second cap correctly stopped the loop and fell through to the
  error screen rather than reloading endlessly

### Also fixed

`/signup` rendered **"Continue with Google" and the "or" divider twice** — once
above the form and once below, both always visible, no responsive classes
separating them. The lower duplicate is gone; the layout now matches `/login`.

### Note on local builds

The two build "failures" seen while diagnosing this were not code problems —
they were a running dev server on **port 9002** sharing `.next` with
`next build`. Both showed `PageNotFoundError: Cannot find module for page`.
Verification was done in an isolated copy of the tree instead (exit 0, 68/68).

---

## Terms of Service & Privacy Policy rewritten to match the real system

Both documents described a product we don't run. They were rewritten from the
code, not from a template. **This section is the source of truth for the
documentation site.**

### How money actually moves — read this first

The belief going in was "FurmBase doesn't hold any money, Flutterwave does; a
payment goes straight to Flutterwave and not to FurmBase." The code says
otherwise, and the Terms now describe the code:

| Step | Reality |
|---|---|
| Respondent pays | Flutterwave inline checkout, one shared `NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY` |
| Split payments / subaccounts | **None anywhere in the codebase** |
| Where funds settle | **FurmBase's own Flutterwave merchant account** |
| Creator's "balance" | A `type: 'credit'` row in the `transactions` table — an IOU from FurmBase |
| Withdrawal | Row goes `pending` → admin approves → **paid by hand.** No transfers/payout API call exists |

So Flutterwave is the **processor**; FurmBase is who **holds and owes** the
money. Saying otherwise in the Terms would have been a false statement in a
legal document about custody of funds — precisely the mismatch these rewrites
exist to remove. If direct settlement to creators is ever configured, §9 and §10
must be rewritten.

The Terms therefore state plainly: FurmBase is not a bank, a wallet balance is
not an insured deposit, no interest is paid, and nothing limits our obligation
to pay a balance genuinely due.

### Terms of Service — 14 sections → 18

New or rewritten:

- **§2** now names the two distinct money flows and links to the section governing each
- **§5** adds that the creator — not FurmBase — is the controller of their form responses
- **§6 AI Features** (new) — content goes to Google Gemini; AI output can be wrong
- **§7 Third-Party Services** — the real list, replacing "Google Sheets and Drive"
- **§8 Subscriptions** — auto-renewal, trials, failed-charge downgrade to Free, cancel ≠ delete
- **§9 Payments Collected Through Your Forms** (new) — the custody model above; server-side pricing; each payment question charged separately; creator is the seller; fees; holds
- **§10 Wallet and Withdrawals** (new) — connect a payout destination, admin review, OTP confirmation, reserved funds, no guaranteed timing, balance never expires
- **§12 Service Availability** (new) — explicitly **no SLA**, so no uptime promise is implied
- **§15 Account Deletion** — fully rewritten for the 30-day request flow
- **§14** — carve-out: nothing limits our obligation to pay a balance owed

**Two live contradictions removed:**

1. §11 said *"Upon termination, your right to use the Service ceases immediately."* The product holds for 30 days and keeps sign-in working on purpose.
2. §7 said fees are non-refundable *"except as stated in our refund policy"* — **there is no refund policy page.** Refund terms now live inside §8 and §10, and §10 states honestly that no automated refund exists for form payments and that a processor reversal may be deducted from the wallet.

### Privacy Policy — 11 sections → 14

- **§1 Who This Policy Covers** (new) — creators are controllers of their responses, FurmBase is processor; respondents are told to contact the form owner
- **§2** — the real automatic collection: IP, browser/OS/version, device type, IP-derived city/region/country, the persistent device id, one session record **per device** rather than per sign-in
- **§2c Precise Location on Public Forms** (new) — `navigator.geolocation` on published forms sends coordinates to **OpenStreetMap Nominatim**; optional, and refusing still submits
- **§2a** — card details never seen or stored; renewal uses a processor token
- **§4 AI Processing** (new) — Gemini; prompts and analyzed responses are sent; nothing sent in the background
- **§6 Sharing** — all eight processors named individually with what each receives, replacing "trusted vendors"
- **§9 Account Deletion** — the 30-day flow, balance never forfeited, cancellation record retained
- **§11 International Transfers** (new)
- **§10** — adds RLS-style per-account access rules and withdrawal OTP

### Known gap, deliberately disclosed rather than hidden

The public form still asks respondents for GPS and sends coordinates to
OpenStreetMap. It is disclosed accurately in §2c for now; removing the prompt
stays on the outstanding list. Once removed, delete §2c.

### Correction: the AI provider is OpenAI, not Gemini

The first draft of both documents said AI features run on Google Gemini. **That
was wrong**, and it came from reading `package.json` instead of tracing the call
path.

| | |
|---|---|
| `src/ai/genkit.ts` | configures `googleai/gemini-2.5-flash` |
| Who imports the Gemini flows | **only `src/ai/dev.ts`** — no route, no page |
| What actually runs | `/api/ai/forms` → `runFormAgent` → `src/lib/ai/config.ts` |
| Env | `AI_PROVIDER="openai"`, `AI_MODEL="gpt-4o-mini"`, key `sk-pro…` |
| Google AI key in env | **none** |

So `src/ai/flows/*` and `src/ai/genkit.ts` are dead scaffolding from the Genkit
starter — if they were ever called they would fail for lack of a key. There is
no hidden Gemini key in the project. Worth deleting that scaffolding at some
point so it stops implying a dependency that isn't real.

### Vendor names removed from both documents

Named processors (Supabase, Vercel, Flutterwave, Resend, ImageKit, Chatwoot,
OpenStreetMap) were replaced with **categories** — "cloud hosting, database and
storage providers", "payment processors", "email delivery providers", "AI
providers", and so on. GDPR Art. 13 permits "recipients **or categories of
recipients**", so this is defensible; naming them is best practice rather than a
requirement. The Privacy Policy offers the specific list on request by email,
which is what keeps the category wording honest.

**Google is deliberately still named.** The Google API Services Limited Use
Disclosure is a condition of holding those OAuth scopes and has to identify
Google explicitly. Removing it would break the OAuth verification, not just the
prose.

### Other corrections

- **Billing is monthly only.** The Terms claimed "monthly or annually". There is
  no annual option anywhere — `billing_cycle: 'monthly'` is hardcoded in
  `src/lib/subscription.ts` and no pricing surface offers a yearly plan.
- **Privacy §4 "AI Processing" removed** as a standalone section. The disclosure
  survives as one line in the processor categories, so the practice is still
  disclosed without a section devoted to it.
- **Privacy "Children's Privacy" removed.** The under-13 statement still lives in
  ToS §1 (Agreement to Terms), so the age position isn't lost. Worth knowing:
  this section is what US COPPA compliance is usually hung on, so if FurmBase
  ever markets to schools it should come back.
- Sections renumbered and every cross-reference re-checked (Privacy is now 12
  sections, not 14).

### Policy-change notification — ToS §17 is now a real promise

§17 used to say we'd notify "where appropriate", which commits to nothing. It now
says we will **email every account holder** with links to both documents. That
promise needed machinery behind it:

| Piece | What it does |
|---|---|
| `getPolicyUpdateHtml()` in `src/lib/email-templates.ts` | The notice. Matches the existing template shell |
| `POST /api/admin/policy-update` | The broadcast |
| `policy_notifications` table (**implementation.sql Section 7**) | Makes re-running safe |

The email deliberately **does not summarise what changed**. A summary in an email
is a second version of the document that drifts out of step with the real one,
and people act on whichever they read. It carries a hook subject, two sentences,
and links to the Terms and the Privacy Policy.

**The broadcast is resumable, which is the whole design.** Every send is recorded
against `(user_id, version)` with a unique constraint, and each run selects only
users with no row for the current version. A timeout or rate limit means you run
it again and it resumes — it never mails anyone twice. Receipts are written
*after* a successful send, so the worst failure mode is a handful of duplicates
rather than people silently marked done and never emailed.

It is chunked (200 users per run, 100 per Resend batch call) to fit inside
`maxDuration`, and the response reports `remaining` and `complete` so the caller
knows whether to call again. A failed chunk is logged and skipped rather than
aborting the run.

Usage — **always dry-run first**:

```bash
curl -X POST https://furmbase.com/api/admin/policy-update \
  -H "x-admin-secret: $SOCKET_RELAY_SECRET" \
  -H "content-type: application/json" \
  -d '{"version":"2026-08-17","dryRun":true}'
```

Drop `dryRun` to send, then repeat until `"complete": true`. Requires
**Section 7 of implementation.sql** to have been run first; the route says so
explicitly if the table is missing. Unauthorised callers get a 404, not a 401.

### Not done (deliberately)

Only ToS and Privacy Policy were in scope. A standalone **Refund Policy**, a
**DPA**, and an **MSA** were discussed and skipped — DPA and MSA matter when
enterprise customers ask, and none have. The dangling "our refund policy"
reference that pointed at a non-existent page is gone, so nothing now promises a
document that doesn't exist.

Neither document has been reviewed by a lawyer. The money-handling language in
§9 and §10 is the part most worth paying someone to check.

---

## AI model moved to gpt-5.6-sol

`gpt-4o-mini` → **`gpt-5.6-sol`** (OpenAI's GPT-5.6 flagship, released 9 July
2026 — Luna < Terra < Sol). Verified live against the API, not assumed.

### Renaming the model alone would have broken every AI request

GPT-5 family and o-series models differ from earlier ones in two ways that each
return a **400**, not a degraded response:

| Parameter | Older models | gpt-5.6-sol |
|---|---|---|
| Token limit | `max_tokens` | **`max_completion_tokens`** — `max_tokens` is rejected |
| `temperature` | any 0–2 | **default only** — `0.4` is rejected outright |

The second one is worth noting because published documentation says temperature
0–2 with a default of 1. The **live API disagrees**:

```
Unsupported value: 'temperature' does not support 0.4 with this model.
Only the default (1) value is supported.
```

That was caught by actually calling the API. Reading the docs would have shipped
a broken integration.

### The fix

`isNextGenOpenAI()` in `src/lib/ai/providers.ts` gates both parameters on the
model id (`/^(gpt-5|o1|o3|o4)/i`):

- next-gen models get `max_completion_tokens` and **no** `temperature` field
- everything else keeps `max_tokens` and `temperature`

Gated rather than switched globally **because `completeOpenAI()` also serves
Groq, OpenRouter, Together, and local servers** through `AI_BASE_URL`. Those
still expect the original parameter names, so a blanket change would have traded
one broken integration for several.

Temperature is dropped even when a caller passes one explicitly — `form-agent.ts`
asks for `0.4`. Silent, and deliberately so: the alternative is every AI request
failing.

### Token limit

`AI_MAX_TOKENS` **4096 → 128000**, the model's maximum output. Context window is
1,050,000.

The code default in `config.ts` stays at **8192 on purpose** — it is shared
across providers, and Anthropic's models cap at 8192, so raising it would break
a provider switch. Production behaviour comes from the env var.

This is a *cap*, not a target: cost accrues on tokens actually generated, not on
the ceiling. Worth knowing that at $30/M output a maxed-out 128k response would
cost about **$3.84**, so a runaway generation is no longer a rounding error.

### Verified live

Three calls through the real project code path, all passing:

| Call | Result |
|---|---|
| `aiComplete` plain | `"FURMBASE OK"` (2412ms) |
| `aiGenerateJSON` (what the form agent uses) | `{"ok":true,"model":"test"}` (2161ms) |
| `aiComplete` with caller `temperature: 0.4` | `"TEMP OK"` (1571ms) |

**Production needs these env vars set:** `AI_MODEL=gpt-5.6-sol` and
`AI_MAX_TOKENS=128000`.

### Also

- The policy-update email said "Questions? Just reply to this email" while
  sending from `no-reply@mail.furmbase.com`. Replaced with the real support
  address, `furmbase@outlook.com`.

---

## Outstanding work

1. **Admin console pages** — three prompts prepared in
   `ADMIN_DELETION_ARCHIVE_PROMPT.md`: the deletion archive, toast unification,
   and the Account Deletion Requests page with Restore.
2. **`promiseToast` sweep** — spinners applied to login and signup; ~44 other
   async actions still use the instant toast.
3. **Conditional logic engine** — `sectionAction` is written by the builder and
   persisted, but **the renderer ignores it entirely**, so section jumps don't
   work at all. Needed before the branch-preview feature.
4. **Question-type detection** — already AI-driven, but classifies each question
   in isolation and returns a type with no options.
5. **Refund/chargeback handling** — nothing reverses a wallet credit today.
6. **Response UX batch** — server-render the public form, remove the geolocation
   prompt on form load, mobile drag-and-drop, publish checklist, automatic
   Google Sheets sync.
