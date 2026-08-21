# FurmBase — New Features

A running record of new features, written so it can be lifted straight into the
documentation site. Each feature explains **what it does**, **how to use it**, and
**what to watch out for**.

- [Conditional Logic](#conditional-logic)
- [Calculated Prices](#calculated-prices)
- [Require Only Sometimes](#require-only-sometimes)
- [Answer Piping](#answer-piping)
- [Hidden Fields and Prefilled Links](#hidden-fields-and-prefilled-links)
- [Custom Thank-You Screens](#custom-thank-you-screens)
- [Clearing an Answer](#clearing-an-answer)
- [Form Backgrounds](#form-backgrounds)
- [The Confirmation Screen](#the-confirmation-screen)

---

# Conditional Logic

**Status:** built (the branch simulator is still to come)
**Added:** 2026-08-19

## What it does

Before this, every person who opened a form saw **exactly the same questions**. No
matter what they answered.

Conditional logic lets a form **change while someone is filling it**, based on what
they answer.

Think of a normal conversation. If you ask someone *"Do you have a car?"* and they
say **No**, you would not then ask *"What colour is your car?"* — you would skip it.
Conditional logic makes a form behave like that instead of like a stiff paper form.

## The two ways a form can change

### 1. Show or hide a question

A question appears or disappears on the same page, depending on an earlier answer.

> **Are you a student?** → **Yes** → *"Which school do you attend?"* appears
> **Are you a student?** → **No** → *"Which company do you work for?"* appears

Nobody ever sees both. They do not even know the other one exists.

### 2. Skip a whole page

In FurmBase, **a section is a page**. When you add a section, everything after it
becomes a new page with its own Next button.

Conditional logic lets a page send people somewhere else:

> After page 1, if the person chose **Speaker** → go to page 4
> If they chose **Attendee** → continue to page 2

A speaker jumps straight to the speaker questions and never sees the attendee pages.
Instead of one long form, everybody gets a **short** form made for them.

## Why it matters

Without it, a form creator has two bad choices:

- One long form where everybody scrolls past questions that do not apply to them —
  and many people give up halfway.
- Separate forms for each type of person — now there are two links to share and two
  sets of responses to join together by hand.

Conditional logic removes both problems. **One form, one link, one place for
responses**, and each respondent only sees what concerns them. A shorter form means
more people finish it.

## Charging different prices — the big one

This is the part no other free form builder can do, because they have no payments.

Because a **payment question can be hidden or shown like any other question**, the
price a respondent is asked for can depend on their answers.

> **Are you a student?**
> → **Yes** → show the **₦5,000** payment question
> → **No** → show the **₦15,000** payment question

Same form, same link, two different prices. This works for:

- Early-bird vs regular tickets
- Member vs non-member rates
- Small package vs big package
- Student / staff / public pricing

**The price is always worked out on FurmBase's server**, from the form as it is
saved, never from the respondent's browser. Somebody cannot open developer tools,
pretend to be a student and pay the cheaper price. They are charged for exactly the
payment questions their own answers revealed — no more, no less.

One nice side effect: a form may now hold an **NGN branch and a USD branch**. That
used to be rejected outright. It is now allowed, as long as no single respondent can
reach both.

---

## How to use it

### Show or hide a question

1. Open your form in the builder.
2. Find the question you want to show only sometimes.
3. On that question card, click the **⋮** menu (bottom-right, next to duplicate
   and delete) → **Conditional logic**.
4. A panel opens under the question. It reads like a sentence:

   > **Show** this question when **every rule matches**
   > **If** [ Are you a student? ] [ is ] [ Yes ]

5. Click **Add another rule** if one is not enough. Each new row is labelled
   **and** / **or** so you can see how they combine.
6. Choose **every rule matches** (all must be true) or **any rule matches**
   (one is enough).
7. Click **Done** when finished.

You can flip **Show** to **Hide** if that reads more naturally for what you want.

### Read it back in plain English

At the bottom of the panel, FurmBase writes your rule out as a normal sentence:

> ✓ Show "Which school?" when "Are you a student?" is "Yes".

It updates as you edit. **Read that line before you publish.** Dropdowns are easy
to misread; a sentence is not.

### The branch icon marks questions that have rules

A question with **no** rules shows nothing extra — the card stays clean.

Once a question has rules, a **green branch icon** appears on its card next to
duplicate and delete. So scanning down a long form, the green icons are exactly the
questions that branch.

Click that icon to **open** the rules, click it again to **close** them. Closing does
not delete anything.

If you open the panel and never finish the rule (you leave the value blank), it is
thrown away when you close. So the icon only lights up for a rule that actually
does something.

To delete rules on purpose, click **Remove all**.

### Duplicating a question keeps its rules

Duplicate a question and the copy comes with the **same conditional logic**,
pointing at the same earlier questions. The copy behaves exactly like the original
until you change it — and editing the copy's rules never touches the original.

### Send people to a different page

1. Add a section wherever you want a new page.
2. On that section card, click the **⋮** menu → **Add conditional rules**.
   *Sections have no branch icon — routing is their version of the same feature,
   and it lives in the menu.*
3. The rules panel opens under the section. Click **Add a rule**:

   > **If all match:** [ What is your role? ] [ is ] [ Speaker ]
   > **then** [ go to page 4 ]

4. Add as many rules as you need. They are checked **from top to bottom, and the
   first one that matches wins**.
5. The **Otherwise** line at the bottom is what happens when no rule matches. It can
   be *continue to next page*, *submit the form*, or *go to page X*.
6. Click **Done** to close the panel.

Once a section has rules, the menu entry reads **Edit conditional rules** with a
tick beside it, so you can tell which pages branch without opening anything.

> **Note:** the "after section → go to section" dropdown existed in the builder
> before, but nothing ever acted on it. It now works.

### The rule that keeps things sane

**You can only build a rule on a question that comes ABOVE the current one.**

The question picker only lists earlier questions, so this is hard to get wrong. The
reason is simple: a rule needs an answer the person has **already given**. A question
cannot depend on an answer from further down the form, because it has not been
answered yet.

If a question has no earlier question to work with, the panel will tell you to move
it further down the form.

---

## Things FurmBase handles for you

These are the traps that break conditional forms on other platforms. They are handled
automatically.

### A hidden question never blocks Submit

If you mark *"Which school?"* as required, and someone answers **No** to *"Are you a
student?"*, they never see that question — so it is not required **for them**. They
can submit normally.

Without this, they would click Submit, be told *"please answer all required
questions"*, see no unanswered question anywhere on the screen, and give up.

### Answers from an abandoned path are thrown away

Someone taps **Yes**, the school question appears, they type "UNILAG". Then they
change their mind and tap **No**. The school question disappears.

That "UNILAG" answer is **not** saved. Your results will not contain the nonsense row
*"Not a student, school: UNILAG"*. Only what they could actually see when they
submitted is stored.

Their typing is kept in the browser while they are filling, so if they toggle back to
**Yes** their answer is still there. It is only dropped at the moment of submitting.

### Back goes where they actually came from

If somebody jumped from page 1 straight to page 4, pressing **Back** returns them to
**page 1** — not page 3, which they never saw.

### A broken rule never strands a respondent

If you delete a page that a rule was pointing at, respondents simply continue to the
next page. They never hit a dead end. **You** get the warning instead, in the builder.

---

## Warnings in the builder

While you build, FurmBase checks your logic and shows problems above the questions.

**Red — must be fixed before publishing:**

| Problem | What it means |
|---|---|
| Rule points at a deleted question | You removed a question another rule depended on. |
| Rule depends on a later question | The rule uses an answer that has not been given yet. |
| Rule depends on itself | A question cannot decide its own visibility. |

You can still **save a draft** with these problems, so you never lose work
mid-edit. You just cannot **publish** until they are fixed.

**Yellow — worth checking, but you can still publish:**

| Problem | What it means |
|---|---|
| Page cannot be reached | No combination of answers leads there. Nobody will see it. |
| Unreachable required questions | That page has required questions nobody will ever answer. |

> If a jump points at a page you later deleted, respondents simply continue to the
> next page. Nothing breaks for them, so this is not warned about.

---

## Which questions can drive a rule

| Question type | Can drive a rule? | Available checks |
|---|---|---|
| Multiple choice, Dropdown | Yes | is / is not / is any of / is empty / is answered |
| Checkboxes | Yes | includes / does not include / is any of / is empty / is answered |
| Linear scale, Rating | Yes | is / is not / more than / less than / is empty / is answered |
| Short answer, Paragraph | Yes | is / is not / includes / does not include / is empty / is answered |
| Date, Time | Yes | is / is not / more than / less than / is empty / is answered |
| File upload | Partly | is empty / is answered (was a file uploaded) |
| Payment | No | Whether somebody paid is only known **after** they submit, so it cannot decide what they see while filling. |
| Title, Section, Image, Video | No | These are layout, not questions. |

---

## Limits and notes

- **Pages can loop.** You are allowed to send people back to an earlier page (useful
  for "go back and correct this"). Be careful not to build a loop with no way out —
  the builder warns you, but it does not stop you, because sometimes a loop is what
  you want.
- **Rules use option IDs, not the text.** If you rename an option from "Yes" to
  "Yeah", your rules keep working. If you **delete** an option and add a new one, any
  rule using the old one needs updating — the builder will flag it.
- **Existing forms are unaffected.** A form with no rules behaves exactly as it did
  before. Nothing needed migrating.

---

## For developers

| Piece | Where |
|---|---|
| Types (`LogicCondition`, `QuestionLogic`, `SectionRoute`) + normalizers | `src/lib/forms/form-schema.ts` |
| The engine — pure, no React/Supabase/DOM | `src/lib/forms/logic-engine.ts` |
| Renderer (public form + owner preview) | `src/app/forms/preview/page.tsx` |
| Builder UI (`LogicEditor`, `SectionRoutesEditor`) | `src/app/c/forms/new/manual/page.tsx` |
| Server-side pricing | `computeRequiredPayments()` in `src/lib/form-submission.ts` |
| Server-side answer stripping | `/api/form-responses/intent` |

The engine is **deliberately pure** so the exact same code runs in the browser (what
is shown), in the builder (what the owner tests) and on the server (what is
**charged**). If the browser could decide which payment questions counted, a
respondent could pick their own price.

Six rules the engine guarantees, documented in full at the top of `logic-engine.ts`:

1. Rules may only read **earlier** questions — makes loops impossible by design.
2. A hidden question **has no answer** — invisible downstream, stripped at submit.
3. Hidden questions are **never required**.
4. Hiding a section hides **everything on that page**.
5. **Fail open** — anything malformed resolves to "visible". A bug must never
   silently hide a question and eat an answer.
6. **Broken jump targets fall through** to the next page.

---

# Calculated Prices

**Status:** built
**Added:** 2026-08-19

## What it does

Conditional logic answers **which** price to charge. This answers **how much**.

Before, a payment question had one fixed amount. So if Amaka sells conference
tickets and somebody wants **three**, she had no way to say so. She would need a
separate payment question for 1 ticket, 2 tickets, 3 tickets, each with its own
rule. That falls apart immediately.

Now a payment question can work out its own amount from the answers:

> **How many tickets?** `3` → 3 × ₦5,000 = **₦15,000**
> **Add airport pickup (+₦2,000)?** `Yes` → **₦17,000**

One payment question. Any quantity.

## How to use it

1. Add a **payment** question to your form.
2. In its settings, find **How is the amount decided?** and choose
   **Work it out from their answers**.
3. A **Price rules** panel appears. Add one or more rules.
4. Each rule is one line on the respondent's receipt. Give it a label so they know
   what they are paying for.

### The five kinds of rule

| Rule | What it does | Example |
|---|---|---|
| **A fixed starting amount** | Always added | ₦1,000 booking fee |
| **An amount for each one** | Multiplied by a number they type | ₦5,000 × *How many tickets?* |
| **A different price per choice** | Each option gets its own price | Regular ₦15,000 · VIP ₦50,000 |
| **An extra amount when…** | Added only if a rule matches | +₦2,000 if *Airport pickup* is *Yes* |
| **An amount for each tick** | Multiplied by how many boxes ticked | ₦1,500 × each item in *Extras* |

Mix as many as you like. They all add up.

### What the respondent sees

An itemised breakdown that updates as they fill the form:

```
Booking fee                              NGN 1,000
Tickets          × 2 @ NGN 5,000        NGN 10,000
VIP                                     NGN 20,000
Airport pickup                           NGN 2,000
Extras           × 2 @ NGN 1,500         NGN 3,000
────────────────────────────────────────────────
Total                                   NGN 36,000
```

Nobody is asked for a number they cannot account for.

## Important: the price is worked out on the server

The breakdown in the browser is a **preview**. When they submit, FurmBase
recalculates the whole thing on its own server, from the form as you saved it and
from the answers they actually gave.

Somebody cannot open developer tools and pay less. They also cannot be charged for a
question their branch never showed them — a hidden payment question is not owed.

## Which plans get this

**Three** features, one per menu entry the creator sees, so a padlock is never
ambiguous. Add them in the admin cpanel under **Subscriptions → Features**:

| Label | Key | Type | Group | Unit |
|---|---|---|---|---|
| Conditional logic | `conditional_logic` | Toggle | Form building | *(blank)* |
| Automatic pricing | `calculated_pricing` | Toggle | Payments | *(blank)* |
| Smart fields | `field_options` | Toggle | Form building | *(blank)* |

**Unit stays blank** for all three — it only means something for a *Number*
feature such as "50 forms". These are on/off toggles.

What each one covers:

- **`conditional_logic`** — ⋮ Conditional logic on a question, and the section
  routing rules on a page.
- **`calculated_pricing`** — the payment question's *"Work it out from their
  answers"* mode and all its price rules.
- **`field_options`** — the whole ⋮ Field options panel: require-only-sometimes,
  fill-from-link, and the hidden tracking field.

Three separate keys means you can price them independently later — conditional
logic on Pro, calculated prices on Business — without a code change. Moving any
of them between plans is just a toggle in the admin panel.

Free users still see the menu entries, wearing a **lock badge**. Clicking one opens
the upgrade prompt instead of the editor, exactly how `payment_question` and
`import_questions` already behave.

**Turning things off always works, even unsubscribed.** Closing a panel or
switching a price back to fixed is never blocked, so a form built while subscribed
can still be tidied up if the plan lapses — rather than trapping someone in a
state they cannot leave.

`implementation.sql` **Section 8** does the same thing in one paste if you would
rather not use the form. It is optional — the admin panel writes identical data.

## Things to know

- **Only questions ABOVE the payment question can drive a price.** Same rule as
  conditional logic — the price needs answers already given.
- **Unanswered means zero.** If they have not said how many tickets yet, that line is
  simply not there. The total starts at whatever your fixed rules add up to.
- **A total can never go below zero.** If you use negative amounts as discounts and
  they overshoot, the total stops at zero rather than becoming a refund.
- **Multiple payment questions still work.** Each is charged separately with its own
  reference, exactly as before.
- **The breakdown always adds up.** If a minimum or maximum kicks in, it appears as
  its own line — *Minimum charge*, *Maximum charge applied* or *Discount limit
  reached* — so the figures the respondent sees always sum to the amount they are
  asked for. Nobody is ever shown a total they cannot account for.
- **A payment-only form is fine.** A form whose only question is a calculated
  payment (a donation with a base price, say) submits normally, even with nothing
  else filled in.

---

# Require Only Sometimes

**Status:** built · **Added:** 2026-08-19

## What it does

A question that is required **only in certain circumstances**.

> **Would you like a call back?** → **Yes** → *phone number* becomes required
> → **No** → *phone number* stays optional

The little required marker (`*`) only appears when the rule is actually met, so it
never marks something the respondent will not be asked for.

## How to use it

1. On the question, click **⋮** → **Field options**.
2. Turn on **Require this only sometimes**.
3. Set the rule, exactly like conditional logic.

> The question must **not** already be marked *required*. If it is, turn the
> **required** switch off first — the panel will tell you.

---

# Answer Piping

**Status:** built · **Added:** 2026-08-19

## What it does

Puts a respondent's own answer into later question text, so the form reads like it
knows them.

> *"Thanks **Chidi**, which school do you attend?"*

## How to use it

Type `{{ }}` around the **title of an earlier question** anywhere in a later
question's title or description:

```
Thanks {{Full name}}, which school do you attend?
```

You can also use it in your thank-you message.

## Things to know

- It shows the **label** of a chosen option, never the internal id. Pick "VIP" and it
  says *VIP*.
- Several ticked boxes come out as a list: *T-shirt, Lunch*.
- If the question has not been answered — or is hidden on their branch — it comes out
  as nothing, rather than leaving `{{...}}` on screen.

---

# Hidden Fields and Prefilled Links

**Status:** built · **Added:** 2026-08-19

## What it does

Puts information **into** a form from the link, instead of asking for it.

Two uses:

**Prefilled** — the question still shows, but already filled in. Good for sending
somebody a link with their email already in place.

**Hidden** — the question is never shown at all. The value just travels with the
response. This is how you record where somebody came from without asking them.

## How to use it

1. Add a normal short-answer question (e.g. *Source*).
2. Click **⋮** → **Field options**.
3. Under **Fill this from the link**, type a key — say `utm_source`.
4. To hide it completely, turn on **Hide it from respondents**.

Now share your link with that key on the end:

```
https://furmbase.com/f/your-form?utm_source=twitter
https://furmbase.com/f/your-form?email=ada@example.com
```

One form, a different link per campaign, and every response records which one it came
from.

## Things to know

- **A typed answer always wins.** If somebody has already filled the box, the link
  will not overwrite it.
- **Hidden fields are kept.** Unlike a question hidden by conditional logic, a hidden
  field's value *is* saved with the response — that is the whole point.
- **Rules can read them.** You can branch on a hidden field, so a link can decide
  which questions somebody sees.

---

# Custom Thank-You Screens

**Status:** built · **Added:** 2026-08-19

## What it does

Different respondents can see a different message after submitting — or be sent to a
different page entirely.

> A **speaker** gets the briefing note.
> An **attendee** gets the payment receipt.
> Everybody else gets the normal thank-you.

## How to use it

1. Open **Form Settings** → **Thank you**.
2. Write your **default message** — what everybody sees. You can use
   `{{Full name}}` here to pipe in an answer.
3. Optionally set a **redirect URL** to send people to your own page instead. It must
   start with `https://`. They see the confirmation briefly first.
4. To vary it, click **Add a rule**:

   > **If** [ What are you joining as? ] [ is ] [ Speaker ]
   > *message:* "See you at the speaker desk, {{Full name}}."

Rules are checked **top to bottom, and the first match wins**. If none match, the
default is used.

## Things to know

- Only `https://` addresses are accepted for redirects, so a form cannot be used to
  send somebody somewhere unsafe.
- A rule can set a message, a redirect, or both.

---

# Clearing an Answer

**Status:** built
**Added:** 2026-08-21

## What it does

A respondent can now **undo a choice**. Before this, once you picked an option on
a multiple-choice question there was no way back — you could change it to a
different option, but you could not return the question to unanswered.

That matters for optional questions. Somebody taps an option by accident, or
answers and then decides they would rather not say. Previously they were stuck
with it.

## How it works

**Tap the option you already picked, and it clears.** That is the whole rule, and
it is the same on every question type where you select something:

| Question type | How to clear |
|---|---|
| Multiple choice | Tap the selected option again |
| Dropdown | Open it and tap the selected option again |
| Linear scale | Tap the selected number again |
| Rating | Tap the selected star again |
| Multiple-choice grid | Tap the selected cell again — clears that **row only** |
| Checkboxes | Un-tick, as before |
| Tick-box grid | Un-tick, as before |

## Things to know

Clearing an answer really does return the question to **unanswered**, not to a
blank value. So everything that depends on the answer updates too:

- a **required** question starts blocking Submit again
- any question that was **revealed** by that answer hides again
- a **payment** that answer unlocked is **no longer charged**
- the hidden question's old answer is **thrown away**, so it never reaches your
  results

For grids, clearing the last row clears the whole question rather than leaving an
empty shell behind.

---

# Form Backgrounds

**Status:** built
**Added:** 2026-08-21

## What changed

FurmBase used to offer dark, dramatic gradient backgrounds. They looked striking
but competed with the questions — and a form is something a stranger has to read
and type into.

They have been replaced with **soft, light, flat colours** that stay comfortable
over a long form.

| Background | |
|---|---|
| **Warm paper** *(default)* | Warm cream — deliberately not plain white |
| **Cool mist** | Pale blue-grey |
| **Soft sage** | Pale green |
| **Soft sky** | Pale blue |
| **Soft blush** | Pale pink |
| **Soft lilac** | Pale purple |
| **Soft sand** | Warm beige |

Plus **Solid colour**, where you pick any colour you like — including dark ones,
if that is what your brand needs.

## How to use it

In the builder, open **Customize theme** → **Background style** and pick one. The
form preview updates as you choose.

## Things to know

- **Your existing forms are safe.** If you built a form on one of the old dark
  backgrounds it still looks exactly the same. Those backgrounds are simply no
  longer offered to new forms.
- The background is a **single flat colour**. The small two-tone square in the
  picker is just so you can tell the colours apart at a glance.
- Light backgrounds are handled properly — text, option circles and checkboxes all
  darken automatically so nothing goes invisible.

---

# The Confirmation Screen

**Status:** built
**Added:** 2026-08-21

## What it does

The screen a respondent sees after submitting. There are two versions — one for a
free form, one after a payment — and both now behave the same way.

## What it shows

**It keeps your form's background.** Previously the payment confirmation dropped
people onto a generic dark page, which felt like being handed off to a different
website at the exact moment they were checking their payment worked. It now
carries the same background and brand colour as the form itself.

**No FurmBase header, footer or cookie banner.** A person filling in your form is
not a visitor to furmbase.com, so none of our site furniture appears. Just your
form's confirmation.

**The real payment reference**, with a copy button. This is the reference
Flutterwave and the respondent's bank both recognise — not an internal FurmBase
id. If they ever need to ask about the payment, this is the number to quote.

**Submit another response** — takes them back to a fresh, empty form. Useful when
somebody is registering more than one person.

## Things to know

- On a free form, "Submit another response" resets the form in place — the answers
  clear and it returns to page 1.
- The confirmation is safe to refresh or bookmark. Everything behind it is
  idempotent, so a reload never creates a second submission or a second charge.
- You can replace the default message entirely — see
  [Custom Thank-You Screens](#custom-thank-you-screens).
