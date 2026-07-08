# Design system — source of truth

These are the design tokens from the earlier **Figma Make** portfolio attempt,
kept here as the reference for rebuilding the system natively in **Framer**.

- [`tokens.css`](./tokens.css) — the original CSS, verbatim (Tailwind v4). Not
  loaded by the Framer site; reference only.
- This file — the same values converted to **px** and grouped for easy
  hand-transcription into Framer **Color Styles**, **Text Styles**, and layout.

Root font size is `16px`, so `1rem = 16px`. All px values below assume that.

---

## How this maps to Framer

| Token group | Where it goes in Framer |
| --- | --- |
| Colors | **Color Styles** (Assets panel) |
| `typo-*` text styles | **Text Styles** (set mobile values on the base, override on the `768px` breakpoint) |
| Spacing / gaps / padding | Plain values you reuse in stack gaps & section padding; switch them per breakpoint |

Breakpoint: everything is **mobile-first**; the desktop column kicks in at
**≥ 768px** (Framer's Tablet/Desktop breakpoints).

---

## Colors

### Primitives

| Token | Hex |
| --- | --- |
| `gray-100` | `#ffffff` |
| `gray-200` | `#fafafa` |
| `gray-400` | `#e9e9e9` |
| `gray-600` | `#778877` _(muted green, not gray — naming is misleading)_ |
| `gray-800` | `#414141` |
| `gray-900` | `#212121` |

### Semantic (use these names for the Framer Color Styles)

| Style | Value | Hex |
| --- | --- | --- |
| `background` | gray-100 | `#ffffff` |
| `foreground` | gray-900 | `#212121` |
| `border` | gray-400 | `#e9e9e9` |
| `surface/bg` | gray-200 | `#fafafa` |
| `surface/bg-white` | gray-100 | `#ffffff` |
| `text/primary` | gray-900 | `#212121` |
| `text/secondary` | gray-800 | `#414141` |
| `text/tertiary` | gray-600 | `#778877` |

---

## Typography

Family: **Inter** (weights 400/500/600/700). Weights below: Regular 400,
Medium 500, Semibold 600, Bold 700.

Format per cell: **size / line-height / letter-spacing** (all px).

| Text style | Weight | Mobile (base) | Desktop (≥768px) |
| --- | --- | --- | --- |
| `hero-large` | Bold | 48 / 52 / -1 | 164 / 148 / -4 |
| `hero-default` | Bold | 48 / 44 / -0.5 | 142 / 128 / -4 |
| `h-large` | Semibold | 32 / 38 / -0.5 | 48 / 58 / -1 |
| `h-default` | Semibold | 24 / 26 / -0.1 | 28 / 36.5 / -0.2 |
| `h-small` | Regular | 20 / 26 / -0.1 | 28 / 36.5 / -0.2 |
| `subtitle-large` | Medium | 18 / 26 / 0 | 28 / 33.6 / -0.2 |
| `body-large` | Regular | 18 / 26 / 0 | 32 / 41.5 / -0.5 |
| `body-default` | Regular | 16 / 24 / 0 | 20 / 28 / -0.2 |
| `label-large` | Bold | 16 / 22 / 0 | 24 / 28 / -1 |
| `label-default` | Semibold | 14 / 20 / 0 | 20 / 28 / -0.2 |
| `label-small` | Bold | 13 / 18 / 0 | 15 / 21 / -0.2 |
| `label-caption` | Regular | 12 / 16 / 0 | 16 / 19 / -0.2 |

> Note: the huge hero desktop sizes (164/142) are intentional display sizes.

---

## Spacing

### Primitives (px)

`16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 172, 200, 240`

### Semantic gaps & padding (mobile → desktop)

| Token | Mobile | Desktop (≥768px) |
| --- | --- | --- |
| `gap-200` | 16 | 16 |
| `gap-300` | 20 | 20 |
| `gap-400` | 20 | 32 |
| `gap-500` | 24 | 48 |
| `gap-600` | 32 | 64 |
| `gap-700` | 40 | 80 |
| `gap-800` | 72 | 172 |
| `gap-900` | 32 | 200 |
| `padding-horizontal` | 16 | 240 |
| `padding-top` | 40 | 200 |
| `padding-bottom` | 40 | 200 |

---

## Border radius

No radius tokens existed in the original Figma Make export. This scale is
proposed for the portfolio and the **System** page.

| Token | Value | Usage |
| --- | --- | --- |
| `radius-sm` | `4px` | Tight chips, subtle rounding |
| `radius-md` | `8px` | Buttons, small cards |
| `radius-lg` | `12px` | Code console, medium cards |
| `radius-xl` | `16px` | Section cards, larger surfaces |
| `radius-pill` | `999px` | Toasts, pills, tags (e.g. CopyEmail toast) |

Create these as plain values in Framer layouts (no formal Radius Styles panel).
Show each on the System page as a labeled square with the matching corner radius.
