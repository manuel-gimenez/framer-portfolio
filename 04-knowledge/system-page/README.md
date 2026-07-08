# System page — build spec

Step-by-step guide for building the **System** design-system page on
[manuelgimenez.framer.website](https://manuelgimenez.framer.website/), inspired by
[jacobolenick.com/design-system](https://www.jacobolenick.com/design-system/).

**You build natively in Framer.** Code in this repo supports only the parts Framer
can't do natively: the `CodeConsole` component and live demos of existing code.

Token values live in [`../../01-foundations/README.md`](../../01-foundations/README.md).

**Process & research (start here for new sections)**

| Doc | Purpose |
| --- | --- |
| [`../design-process/README.md`](../design-process/README.md) | Repeatable workflow: Research → Structure → Execute → Review |
| [`../design-process/checklist.md`](../design-process/checklist.md) | Task list, hours, per-section status |
| [`visual-research.md`](./visual-research.md) | Pattern ideas + reference sites for visual research |
| [`sections.md`](./sections.md) | Per-section structure briefs (fill during research) |
| [`references/`](./references/) | Folder for screenshots you collect |

---

## Before you start

1. Create Color Styles and Text Styles from [`01-foundations/README.md`](../../01-foundations/README.md) (if not done yet).
2. Import into Framer:
   - `02-components/code-components/CodeConsole.tsx`
   - `02-components/code-components/TextScrambler.tsx`
   - `02-components/code-components/LottieScroll.tsx`
   - Overrides from `02-components/code-overrides/` (at minimum `CopyEmail`)
3. Add a new page: **System** (`/system`).

---

## Page structure

Build top to bottom. Each section gets a **Section** frame with an ID for anchor nav.

| # | Section ID | Nav label | Build method |
| --- | --- | --- | --- |
| 1 | `colors` | Colors | Native swatch grid |
| 2 | `typography` | Typography | Native type samples |
| 3 | `spacing` | Spacing | Native bar visuals |
| 4 | `radius` | Radius | Native corner samples |
| 5 | `code-overrides` | Code overrides | Demo cards + `CodeConsole` |
| 6 | `code-components` | Code components | Demo cards + `CodeConsole` |
| 7 | `layout` | Layout | Native diagram (see [`sections.md`](./sections.md)) |
| 8 | `breakpoints` | Breakpoints | Native device frames or token table |
| 9 | `motion` | Motion | Native gallery / behavior notes |
| 10 | `ui-components` | UI components | Native Framer component cards (nav, footer, …) |
| 11 | `procedures` | Procedures | Rules, skills + AI workflow docs |

Sections 1–6 are **done or specced**. Sections 7–11 are **next steps** — structure
TBD in [`sections.md`](./sections.md) after visual research.

### Page header

- Title: **Design System** (or **System**)
- Short intro: tokens, typography, spacing, and live code from this portfolio.
- Reuse your site header / nav; add **System** as a nav link.

### Content width

Match your portfolio editorial width. Suggested max-width: **680–800px** centered,
with horizontal padding from `padding-horizontal` (16px mobile → 240px desktop).

---

## Sticky section nav (native)

No code needed.

1. Create a horizontal stack of text links: Colors · Typography · Spacing · Radius · Code components · Code overrides · UI components · Procedures
2. Set the stack to **Position: Sticky**, `top: 0` (or below your site header offset).
3. Give it a background (`surface/bg` or `background`) and a bottom border (`border`).
4. For each link: **Link → Section** → pick the matching section frame on this page.
5. Use **On Click** (not On Tap) for reliability.

---

## 1. Colors

Create a 2-column grid (1 column on mobile). Each cell:

```
┌─────────────────────┐
│  [color fill 64px]  │
│  token name         │
│  #hex               │
└─────────────────────┘
```

| Framer Color Style | Hex | Note |
| --- | --- | --- |
| `background` | `#ffffff` | |
| `foreground` | `#212121` | |
| `border` | `#e9e9e9` | |
| `surface/bg` | `#fafafa` | |
| `surface/bg-white` | `#ffffff` | |
| `text/primary` | `#212121` | |
| `text/secondary` | `#414141` | |
| `text/tertiary` | `#778877` | Muted green, not gray |

Section label: `Foundations` (use `label-default` or `label-small` style).

---

## 2. Typography

One row per text style. Each row shows:

- Sample text (e.g. "Design systems that ship")
- Style name (`hero-large`, `body-default`, …)
- Mobile values: size / line-height / letter-spacing
- Desktop values (≥768px breakpoint)

All 12 styles from [`01-foundations/README.md`](../../01-foundations/README.md):

`hero-large`, `hero-default`, `h-large`, `h-default`, `h-small`,
`subtitle-large`, `body-large`, `body-default`, `label-large`,
`label-default`, `label-small`, `label-caption`

Apply each as a Framer **Text Style** on the sample line. Override values on
the Desktop breakpoint per the table in [`../../01-foundations/README.md`](../../01-foundations/README.md).

---

## 3. Spacing

Two groups.

### Primitives

Horizontal bars labeled with px values:

`16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 172, 200, 240`

Each bar: fixed height (e.g. 8px), width = token value, fill `text/primary`.

### Semantic gaps & padding

Table or labeled bars for mobile → desktop:

| Token | Mobile | Desktop |
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

## 4. Radius

From [`../../01-foundations/README.md`](../../01-foundations/README.md#border-radius):

| Token | Value | Example use |
| --- | --- | --- |
| `radius-sm` | 4px | Tight chips |
| `radius-md` | 8px | Buttons |
| `radius-lg` | 12px | Code console |
| `radius-xl` | 16px | Cards |
| `radius-pill` | 999px | Toasts, pills |

Show five squares (e.g. 80×80) each with the matching corner radius and label.

---

## 5. Overrides

Each item = **demo card** (stack or 2-column on desktop).

### Card layout

```
┌──────────────────────────────────────────────┐
│  Override name + one-line description        │
├────────────────────┬─────────────────────────┤
│  Live demo         │  CodeConsole            │
│  (if applicable)   │  (paste snippet)        │
└────────────────────┴─────────────────────────┘
```

### Items

| Override | Live demo | Console snippet | Notes |
| --- | --- | --- | --- |
| `CopyEmail` | Yes — button with override applied; click to copy | [`snippets/CopyEmail.tsx`](./snippets/CopyEmail.tsx) | Working demo |
| `MobileComingSoon` | Console only | [`snippets/MobileComingSoon.tsx`](./snippets/MobileComingSoon.tsx) | Needs nav context + mobile width |
| `ClosePhoneNavOnSectionLink` | Console only | [`snippets/ClosePhoneNavOnSectionLink.tsx`](./snippets/ClosePhoneNavOnSectionLink.tsx) | **Superseded** — solved natively; show as reference |
| `LottieAspectOverrides` | Console only | [`snippets/LottieAspectOverrides.tsx`](./snippets/LottieAspectOverrides.tsx) | **Superseded** by `LottieScroll` |

For superseded overrides, add a short note: "Replaced by native interaction" or
"Replaced by `LottieScroll`" — see [`../why-native-first.md`](../why-native-first.md).

---

## 6. Components

| Component | Live demo | Console snippet |
| --- | --- | --- |
| `TextScrambler` | Yes — drop instance, set trigger to On Hover or On Click | [`snippets/TextScrambler.tsx`](./snippets/TextScrambler.tsx) |
| `LottieScroll` | Yes — drop instance, upload a `Cover-*-clean.json` | [`snippets/LottieScroll.tsx`](./snippets/LottieScroll.tsx) |

### Framer-native components

List components you built directly in Framer (nav bar, project cards, footer, etc.)
as **static cards**: name, screenshot or live instance, short description. No
`CodeConsole` needed unless you want to document a specific variant setup.

Suggested cards from the live site:

- Nav bar (Phone open / closed variants)
- Project cover cards
- Footer with social links
- Custom cursor (if applicable on desktop)

---

## CodeConsole setup

Import [`../../02-components/code-components/CodeConsole.tsx`](../../02-components/code-components/CodeConsole.tsx) into Framer.

| Property | What to set |
| --- | --- |
| **Code** | Paste full contents from the matching `snippets/*.tsx` file |
| **Language** | `TSX` for all `.tsx` snippets |
| **Title** | Filename, e.g. `CopyEmail.tsx` |
| **Copy** | Show |
| **Theme** | Light (match portfolio; switch to Dark if you add dark mode later) |

Suggested frame size: **min-height 280px**, width fills the card column.
`CodeConsole` scrolls internally when code is long.

---

## Suggested build order

1. Page shell + sticky nav + section frames with IDs
2. Colors (fastest — validates your Color Styles)
3. Typography (validates Text Styles)
4. Spacing + Radius
5. Import `CodeConsole`, test with `CopyEmail` snippet
6. Overrides section (start with `CopyEmail` live demo)
7. Components section (`TextScrambler` + `LottieScroll` live demos)
8. Framer-native component cards
9. Post-build review (checklist below)

**Estimated time:** half a day to a full day depending on polish.

---

## Post-build review checklist

Run through this after the page is assembled in Framer. If anything looks off,
tweak in Framer first; only then ask to adjust `CodeConsole` styling in the repo.

- [ ] Sticky nav scrolls to the correct section on click (all 6 links)
- [ ] Color swatches match hex values in [`01-foundations/README.md`](../../01-foundations/README.md)
- [ ] Typography samples use Text Styles (not one-off local styles)
- [ ] Desktop breakpoint (≥768px) shows correct type + spacing values
- [ ] `CopyEmail` demo copies email and shows toast
- [ ] `TextScrambler` demo animates on the chosen trigger
- [ ] `LottieScroll` demo plays when scrolled into view
- [ ] Each `CodeConsole` shows the right file; Copy button works
- [ ] Superseded overrides are clearly labeled as reference-only
- [ ] Page matches portfolio padding and visual tone on mobile and desktop

If `CodeConsole` needs tweaks (colors, radius, font size), note what to change
and update `02-components/code-components/CodeConsole.tsx` in this repo.
