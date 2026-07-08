# Why "native-first" for Framer

This project includes a Cursor rule,
[`.cursor/rules/framer-native-first.mdc`](../03-procedures/rules/framer-native-first.mdc),
that tells the AI assistant to check for a **native Framer feature before
writing a code override or component**. Here's the story behind it — and why
it's a habit worth keeping.

## The episode

I needed the mobile navigation menu to close after tapping a link that scrolls
to a section on the same page (WORK, CONTACT) — but stay open for AI LAB, which
shows a "coming soon" message.

I went straight to a **code override**. It turned into a loop:

1. **v1.0.0** — set the nav-bar's `variant` prop to "Phone closed" on tap.
2. **v1.0.1** — generalized it to any same-page `#section` link.
3. **v1.0.2** — capture-phase listeners + a Framer store to force the variant.

Nothing worked. The menu wouldn't close, whether the override was applied to the
nav-bar instance or to individual menu items.

## The reframe (escape hatch)

After three attempts that were all variations of the same idea, I stepped back
(see the [`escape-hatch`](../03-procedures/skills/escape-hatch) skill) and questioned the
assumption I'd never checked:

> Can an override even set this component's variant?

No. **The nav-bar owns its variant through its own internal interactions**
(hamburger → "Phone open", X → "Phone closed"). When a component drives its own
variant like that, a `variant` prop pushed in from an override doesn't win —
Framer keeps using its internal state. I was fighting the component's state
machine from the outside.

## The actual fix (1 minute, no code)

A **native Framer interaction** on each link:

> Select the WORK / CONTACT menu item → Interactions → **On Click** → **Set
> Variant** → "Phone closed".

AI LAB simply doesn't get the interaction, so it stays open. Done.

(Bonus lesson: use **On Click**, not **On Tap**. On Tap is a gesture that gets
cancelled by scroll/movement and silently does nothing on menu links.)

## The takeaway

I spent real time on code for something the tool does natively in a click. The
abandoned override is kept at
[`02-components/code-overrides/ClosePhoneNavOnSectionLink.tsx`](../02-components/code-overrides/ClosePhoneNavOnSectionLink.tsx)
as the honest "before".

So the rule now makes the assistant ask **"can Framer do this natively?"** before
reaching for code — saving time (and tokens) on exactly this class of problem.

> Principle: when you don't control the part that's fighting you, replace the
> approach, don't keep repairing it.
