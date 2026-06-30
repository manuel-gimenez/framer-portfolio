# Framer Portfolio — Code & Assets

Code overrides, code components, and animation assets that power my Framer
portfolio website. This repo collects the custom code I wrote for the site so it
can be browsed, reused, and reviewed in one place.

> Live site: _add your published Framer URL here_

## Structure

```
.
├── overrides/     # Framer code overrides (functions that wrap an existing layer)
├── components/    # Framer code components (self-contained, with property controls)
├── custom-code/   # Site-wide custom code injected via Framer Site Settings
├── lotties/       # Lottie JSON animations used on the site
└── skills/        # Reusable skills I built while making this portfolio
```

> A `styles/` folder documenting the Text / Link / Color design tokens will be
> added later.

### A note on what is and isn't code

Framer only lets you export the contents of its **Code** panel as real `.tsx`
files. Visual components built on the canvas (e.g. `nav-bar`, `footer-home`) and
design tokens (Text / Link / Color styles) live inside the `.framer` project
file and can't be exported as code — so those are documented rather than
included as source.

## Conventions

Every file in `overrides/`, `components/`, and `custom-code/` opens with a
header comment in a consistent format, so each piece is self-documenting:

```
Name — one-line purpose.

Problem it solves: the real reason it exists, and where it's used on the site.
Usage: which layer / page it's applied to.

Changelog
  v1.0.0 (DD-MM-YYYY) — Initial version.
```

The **Changelog** is a lightweight decision log that grows as each piece is
iterated (newest entry on top). Dates use **DD-MM-YYYY**.

- patch (`v1.0.1`) — small fix or tweak (the default for most iterations)
- minor (`v1.1.0`) — a new option / prop / behavior
- major (`v2.0.0`) — a rework

When in doubt, prefer a patch bump. Entries record the *why*, not just the
*what* — e.g.
`v1.1.0 (10-07-2026) — Added "loop" play mode for the hero headline.`

The header format and "ask if the problem is unclear" behavior are enforced by
[`.cursor/rules/code-header-convention.mdc`](./.cursor/rules/code-header-convention.mdc).

## Overrides

| File | What it does |
| --- | --- |
| [`overrides/ClosePhoneNavOnSectionLink.tsx`](./overrides/ClosePhoneNavOnSectionLink.tsx) | **Superseded reference (not used live).** The code attempt at closing the mobile nav after a section-link tap. Forcing the nav `variant` from an override can't beat the component's internal interactions — the real fix was a native On Click → Set Variant. Kept to illustrate the [native-first rule](./docs/why-native-first.md). |
| [`overrides/CopyEmail.tsx`](./overrides/CopyEmail.tsx) | Click-to-copy override: copies the email to the clipboard and shows an "EMAIL COPIED" toast at the cursor (pinned to the left edge on mobile). |
| [`overrides/MobileComingSoon.tsx`](./overrides/MobileComingSoon.tsx) | Mobile-only tap override: scrambles a layer's label from "AI LAB" to "COMING SOON" and back with a randomized-character animation. No-op on screens ≥ 768px. |
| [`overrides/LottieAspectOverrides.tsx`](./overrides/LottieAspectOverrides.tsx) | Per-animation overrides (`withGuestAspect`, `withHosterAspect`, `withInputsAspect`) that trim the black letterbox to the animation's true aspect ratio (the padding problem) and scrub playback once on scroll-into-view. **Kept as the earlier "wrap the existing component" attempt** — it works but couldn't fully solve the padding problem, which is what led to building `LottieScroll` from scratch and extracting the [`escape-hatch`](./skills/escape-hatch) skill. See [The padding story](#the-padding-story). |

## Components

| File | What it does |
| --- | --- |
| [`components/LottieScroll.tsx`](./components/LottieScroll.tsx) | Self-contained Lottie player for Framer. Full fit control (contain / cover / fill) so there's never a letterbox (the padding problem), no LottieFiles dependency, and plays once when scrolled into view. Replaces the default Dot Lottie component. |
| [`components/TextScrambler.tsx`](./components/TextScrambler.tsx) | Animated text-scramble effect that resolves random characters into a target word. Configurable trigger (appear / hover / click / manual), play mode (once / loop), duration, stagger, FPS, charset, color, and font — with a static-render fallback and `IntersectionObserver` gating. |

## Custom Code

Site-wide snippets added through Framer's **Site Settings → Custom Code** (not
code components). Each file documents the exact Framer placement so it can be
re-added.

| File | What it does |
| --- | --- |
| [`custom-code/disable-tap-highlight.html`](./custom-code/disable-tap-highlight.html) | Removes the default mobile tap-highlight box and touch callout on links/buttons so taps feel clean and app-like. Injected at end of `<body>`, all pages, run once. |

## Lotties

Lottie animations used as the source for the components and overrides above.

| File | Used by |
| --- | --- |
| `lotties/Cover-guest-ds-clean.json` | `withGuestAspect` |
| `lotties/Cover-hoster-ds-clean.json` | `withHosterAspect` |
| `lotties/Cover-inputs-clean.json` | `withInputsAspect` |
| `lotties/Cover-main-navigation-clean.json` | nav animation |
| `lotties/Cover-motion-clean.json` | motion section |

## The padding story

The Lottie covers kept showing a black letterbox (a "padding" gap) inside their
Framer frames. The fix went through three levels:

1. **Around it** — [`overrides/LottieAspectOverrides.tsx`](./overrides/LottieAspectOverrides.tsx)
   wraps Framer's Dot Lottie component and computes the right height from the
   animation's aspect ratio. It helps, but it can't reach the part of that
   component that creates the letterbox, so the problem was never fully solved.
2. **Replace it** — [`components/LottieScroll.tsx`](./components/LottieScroll.tsx)
   is a self-contained player built on `lottie-web` with direct fit control
   (`contain` / `cover` / `fill`). No letterbox, on every breakpoint.
3. **Generalize the lesson** — the realization that *patching the wrong level
   wastes time* became the [`escape-hatch`](./skills/escape-hatch) skill.

The override is kept on purpose: it's the honest "before" that makes the
reasoning behind `LottieScroll` and `escape-hatch` legible.

## Skills

Reusable problem-solving skills I built while making this portfolio. Each folder
has a short write-up of the problem it solves.

| Skill | Problem it solves |
| --- | --- |
| [`skills/escape-hatch`](./skills/escape-hatch) | A repeatable method for getting unstuck: when several same-level fixes fail, step back and re-solve the problem at a different level (inside / around / replace). Born from the Lottie letterbox work in this repo. |

## Engineering notes

How I work on this project, captured so the decisions are legible:

- [`docs/why-native-first.md`](./docs/why-native-first.md) — why I check for a
  native Framer feature before writing a code override (the mobile-nav story).
- [`.cursor/rules/`](./.cursor/rules) — the rules that encode these habits for
  the AI assistant: `framer-native-first.mdc` and `code-header-convention.mdc`.
