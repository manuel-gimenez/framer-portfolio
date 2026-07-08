# Framer Portfolio — Code & Assets

Design tokens, custom code, and engineering docs for my Framer portfolio and
**System** design-system page.

> Live site: [manuelgimenez.framer.website](https://manuelgimenez.framer.website/)

## Repo map (numbered for reviewers)

Folders are prefixed so GitHub lists them in intentional order — not alphabetically.

```
.
├── 01-foundations/     # Design tokens — colors, typography, spacing, radius
├── 02-components/      # Code components, overrides, custom code, lotties
├── 03-procedures/      # Rules + skills (how I work)
├── 04-knowledge/       # Build specs, debt, process notes
└── .cursor/            # Symlinks → 03-procedures (for Cursor IDE)
```

| # | Folder | System page | What's inside |
| --- | --- | --- | --- |
| 01 | [`01-foundations/`](./01-foundations/) | **Foundations** | Token source of truth |
| 02 | [`02-components/`](./02-components/) | **Components** | `code-components/`, `code-overrides/`, `custom-code/`, `lotties/` |
| 03 | [`03-procedures/`](./03-procedures/) | **Procedures** | `rules/`, `skills/` |
| 04 | [`04-knowledge/`](./04-knowledge/) | _(supporting docs)_ | System page spec, debt, design process |

Page IA (Code components vs Code overrides vs UI components):
[`04-knowledge/system-page/sections.md`](./04-knowledge/system-page/sections.md).

### What is and isn't code

Framer only exports the **Code** panel as `.tsx` files. Native canvas components
(`nav-bar`, `footer-home`, `cursor-custom`) live inside the `.framer` project —
documented on the System page under **UI components**, not as source here.

## Status lights

Every code file has a `Status:` line in its header: 🟢 Live · 🟡 Not ready · 🔴 Deprecated.

Inventory: [`04-knowledge/debt.md`](./04-knowledge/debt.md). Enforced by
[`03-procedures/rules/code-header-convention.mdc`](./03-procedures/rules/code-header-convention.mdc).

## Quick links

| | |
| --- | --- |
| Tokens | [`01-foundations/README.md`](./01-foundations/README.md) |
| Code components | [`02-components/code-components/`](./02-components/code-components/) |
| Code overrides | [`02-components/code-overrides/`](./02-components/code-overrides/) |
| Rules & skills | [`03-procedures/`](./03-procedures/) |
| System page build spec | [`04-knowledge/system-page/README.md`](./04-knowledge/system-page/README.md) |
| Native-first | [`04-knowledge/why-native-first.md`](./04-knowledge/why-native-first.md) |

## The padding story

Lottie covers showed a black letterbox inside Framer frames:

1. **Around it** — [`LottieAspectOverrides`](./02-components/code-overrides/LottieAspectOverrides.tsx) 🔴
2. **Replace it** — [`LottieScroll`](./02-components/code-components/LottieScroll.tsx) 🟢
3. **Generalize** — [`escape-hatch`](./03-procedures/skills/escape-hatch) skill
