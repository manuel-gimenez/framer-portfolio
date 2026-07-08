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
├── 04-docs/       # Build specs, debt, process notes
└── .cursor/            # Symlinks → 03-procedures (for Cursor IDE)
```

| # | Folder | System page | What's inside |
| --- | --- | --- | --- |
| 01 | [`01-foundations/`](./01-foundations/) | **Foundations** | Token source of truth |
| 02 | [`02-components/`](./02-components/) | **Components** | `code-components/`, `code-overrides/`, `custom-code/`, `lotties/` |
| 03 | [`03-procedures/`](./03-procedures/) | **Procedures** | `rules/`, `skills/` |
| 04 | [`04-docs/`](./04-docs/) | _(engineering notes)_ | Debt, native-first, design process |

Native canvas components (`nav-bar`, `footer-home`, `cursor-custom`) live in the
Framer project file — not exported as code in this repo.

## Status lights

Every code file has a `Status:` line in its header: 🟢 Live · 🟡 Not ready · 🔴 Deprecated.

Inventory: [`04-docs/debt.md`](./04-docs/debt.md). Enforced by
[`03-procedures/rules/code-header-convention.mdc`](./03-procedures/rules/code-header-convention.mdc).

## Quick links

| | |
| --- | --- |
| Tokens | [`01-foundations/README.md`](./01-foundations/README.md) |
| Code components | [`02-components/code-components/`](./02-components/code-components/) |
| Code overrides | [`02-components/code-overrides/`](./02-components/code-overrides/) |
| Rules & skills | [`03-procedures/`](./03-procedures/) |
| Native-first | [`04-docs/why-native-first.md`](./04-docs/why-native-first.md) |
| Technical debt | [`04-docs/debt.md`](./04-docs/debt.md) |

## The padding story

Lottie covers showed a black letterbox inside Framer frames:

1. **Around it** — [`LottieAspectOverrides`](./02-components/code-overrides/LottieAspectOverrides.tsx) 🔴
2. **Replace it** — [`LottieScroll`](./02-components/code-components/LottieScroll.tsx) 🟢
3. **Generalize** — [`escape-hatch`](./03-procedures/skills/escape-hatch) skill
