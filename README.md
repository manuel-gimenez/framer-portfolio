# Framer Portfolio — Code & Assets

Code overrides, code components, design tokens, and animation assets that power
my Framer portfolio. This repo collects everything that supports the site and
the **System** design-system page.

> Live site: [manuelgimenez.framer.website](https://manuelgimenez.framer.website/)

## Structure

Intended mental order (GitHub sorts folders alphabetically in the sidebar):

```
.
├── foundations/   # Design tokens — colors, typography, spacing, radius
├── components/    # Framer code components (Code panel)
├── overrides/     # Framer code overrides (wrap existing layers)
├── custom-code/   # Site-wide snippets (Site Settings → Custom Code)
├── lotties/       # Lottie JSON animations
├── docs/          # Build specs, debt, process (see docs/README.md)
└── .cursor/
    ├── rules/     # Engineering rules (native-first, code headers, status lights)
    └── skills/    # Problem-solving playbooks — kept next to rules on purpose
```

| Folder | System page section |
| --- | --- |
| [`foundations/`](./foundations/) | **Foundations** — Colors, Typography, Spacing, … |
| [`components/`](./components/) | **Components** → Code components |
| [`overrides/`](./overrides/) | **Components** → Code overrides |
| _(in Framer, not exported)_ | **Components** → UI components (nav, footer, cursor) |
| [`.cursor/rules`](./.cursor/rules) + [`.cursor/skills`](./.cursor/skills) | **Procedures** — Rules & skills |

Full page IA: [`docs/system-page/sections.md`](./docs/system-page/sections.md).

### What is and isn't code

Framer only exports the **Code** panel as `.tsx` files. Native canvas components
(`nav-bar`, `footer-home`, `cursor-custom`) and Color / Text styles live inside
the `.framer` project — documented on the System page, not as source here.

## Status lights

Every file in `components/` and `overrides/` has a `Status:` line in its header:

| Light | Meaning |
| --- | --- |
| 🟢 Live | On the published site |
| 🟡 🔧 Not ready | Blocked or paused |
| 🔴 Deprecated | Reference only |

Inventory and open debt: [`docs/debt.md`](./docs/debt.md).

## Conventions

Headers, changelogs, and status lights are enforced by
[`.cursor/rules/code-header-convention.mdc`](./.cursor/rules/code-header-convention.mdc).

## Foundations

Token source of truth: [`foundations/README.md`](./foundations/README.md) +
[`foundations/tokens.css`](./foundations/tokens.css) (original Figma Make export).

## Code overrides

| File | Status | What it does |
| --- | --- | --- |
| [`CopyEmail.tsx`](./overrides/CopyEmail.tsx) | 🟢 | Click-to-copy email + toast |
| [`MobileComingSoon.tsx`](./overrides/MobileComingSoon.tsx) | 🟢 | Mobile AI LAB → COMING SOON scramble |
| [`CursorHoverSync.tsx`](./overrides/CursorHoverSync.tsx) | 🟡 | Cursor hover bridge — paused ([debt](./docs/debt.md)) |
| [`ClosePhoneNavOnSectionLink.tsx`](./overrides/ClosePhoneNavOnSectionLink.tsx) | 🔴 | Superseded — [native-first](./docs/why-native-first.md) |
| [`LottieAspectOverrides.tsx`](./overrides/LottieAspectOverrides.tsx) | 🔴 | Pre–LottieScroll letterbox attempt |

## Code components

| File | Status | What it does |
| --- | --- | --- |
| [`TextScrambler.tsx`](./components/TextScrambler.tsx) | 🟢 | Character scramble animation |
| [`LottieScroll.tsx`](./components/LottieScroll.tsx) | 🟢 | Self-contained Lottie player |
| [`CodeConsole.tsx`](./components/CodeConsole.tsx) | 🟢 | Syntax-highlighted code + copy (System page) |
| [`ComponentPreview.tsx`](./components/ComponentPreview.tsx) | 🟢 | Live demo box with restart (System page) |
| [`ChipText.tsx`](./components/ChipText.tsx) | 🟢 | Inline code chips in body copy |

## Custom code

| File | What it does |
| --- | --- |
| [`disable-tap-highlight.html`](./custom-code/disable-tap-highlight.html) | Removes mobile tap highlight globally |

## Lotties

| File | Used by |
| --- | --- |
| `Cover-guest-ds-clean.json` | Guest project cover |
| `Cover-hoster-ds-clean.json` | Hoster project cover |
| `Cover-inputs-clean.json` | Inputs project cover |
| `Cover-main-navigation-clean.json` | Nav animation |
| `Cover-motion-clean.json` | Motion section |

## The padding story

Lottie covers showed a black letterbox inside Framer frames. The fix went through
three levels:

1. **Around it** — [`LottieAspectOverrides`](./overrides/LottieAspectOverrides.tsx)
2. **Replace it** — [`LottieScroll`](./components/LottieScroll.tsx)
3. **Generalize** — [`escape-hatch`](./.cursor/skills/escape-hatch) skill

## Rules & skills

Kept together under [`.cursor/`](./.cursor/) so they appear side by side in the
repo tree.

| | What it is |
| --- | --- |
| [`rules/`](./.cursor/rules) | `framer-native-first`, `code-header-convention` |
| [`skills/`](./.cursor/skills) | `escape-hatch` — step back when stuck in a fix loop |

Also see [`docs/why-native-first.md`](./docs/why-native-first.md) and
[`docs/design-process/`](./docs/design-process/).
