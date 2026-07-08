# Visual research — System page

Quick ideas and reference targets for **structure**, not final visuals. Your
tokens are in [`../../01-foundations/README.md`](../../01-foundations/README.md). Match
the portfolio tone: minimal, editorial, Inter, generous desktop whitespace,
muted `text/tertiary` green-gray.

**10-minute sprint:** Skim the **Pattern menu** per section below. Pick **one
pattern (A or B)** to try in Framer. Save screenshots of refs you like in
`04-knowledge/system-page/references/` (create folder when you start collecting).

---

## Reference sites (start here)

| Site | Why look | Steal for |
| --- | --- | --- |
| [jacobolenick.com/design-system](https://www.jacobolenick.com/design-system/) | Close to your goal; sticky nav, specimen rows | Overall page rhythm, code + demo cards |
| [vercel.com/design](https://vercel.com/design) | Clean grouping, dark/light discipline | Semantic color grouping, scale tables |
| [Linear](https://linear.app) | Editorial + product | Typography specimen, motion notes |
| [radix-ui.com/colors](https://www.radix-ui.com/colors) | Scale thinking | Primitive vs semantic color structure |
| [tailwindcss.com/docs/customizing-spacing](https://tailwindcss.com/docs/customizing-spacing) | Bar scale | Spacing visualization |
| [material.io/design/motion](https://m3.material.io/styles/motion/overview) | Duration / easing vocabulary | Motion section structure |

Add your own as you browse. One screenshot + one sentence per ref is enough.

---

## Pattern menu by section

### Colors ✓ (built — use for consistency check)

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Swatch card** | 64px fill + token name + hex (current spec) | ✓ Default |
| **B — In context** | Same swatches plus a mini UI (button, card, text) using each semantic color | Good for `text/tertiary` story |
| **C — Primitive ladder** | Gray scale row, then semantic mapping table | Radix-style; more formal |

**Research question:** Do you show primitives (`gray-100`…) or only semantic
names? Recommendation: **semantic only** on the page; primitives in a collapsed
footnote or skip (you only have 6 grays).

---

### Typography ✓ (built)

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Specimen row** | Sample line + style name + mobile/desktop metrics (current spec) | ✓ Default |
| **B — Scale ladder** | All styles in one column, size descending — shows hierarchy at a glance | Strong for hero sizes |
| **C — Role groups** | Headings / Body / Labels as subsections | Easier to scan 12 styles |

**Research question:** Hero styles (`hero-large` 164px desktop) — full width
sample or truncated with ellipsis? Recommendation: **truncate** on desktop with
"Ag" or short phrase; full word on mobile.

---

### Spacing ✓ (built)

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Horizontal bars** | Width = token, fixed height (current spec) | ✓ Default |
| **B — Stack demo** | Fake card stack with gaps labeled (`gap-500`, etc.) | Shows semantic gaps in context |
| **C — Page map** | Diagram of section padding (`padding-top` 40→200) | Pairs well with **Layout** section |

**Research question:** Show all 13 primitives or a subset? Recommendation:
**all primitives** in one row (scroll on mobile); semantic table below.

---

### Radius ✓ (built)

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Square samples** | 80×80 squares, labeled (current spec) | ✓ Default |
| **B — Same component, five radii** | One button or card shape repeated | Shows real usage |
| **C — Pill + square contrast** | `radius-pill` next to `radius-sm` only | Minimal |

**Research question:** Tie each radius to a real site element? Recommendation:
yes — caption under each: *Code console · Toast · Button*.

---

### Layout (next)

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Anatomy diagram** | Page frame: header, content max-width, section padding arrows | Best match for your 16→240px padding |
| **B — Grid overlay** | 12-col or simple 2-col with `padding-horizontal` callouts | If you use a grid |
| **C — Component zones** | Nav / main / footer blocks with measurements | Links to nav + footer component cards |

**Research question:** Document max content width (680–800px)? Recommendation:
**yes** — one diagram with your editorial width centered inside `padding-horizontal`.

**Tokens to document:** `padding-horizontal`, `padding-top`, `padding-bottom`,
content max-width (proposed in build spec).

---

### Breakpoints (next)

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Device trio** | Phone / tablet / desktop frames, same component | Framer-native |
| **B — Token delta table** | What changes at ≥768px (type, padding, gaps) | You already have data in DS README |
| **C — Single breakpoint line** | One vertical line at 768px, before/after labels | Minimal |

**Research question:** Only 768px or more breakpoints? Recommendation: **768px
primary** for now; note Phone nav variant as behavioral breakpoint.

---

### Motion (next)

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Token table** | duration, easing name, example | Start here — you may not have tokens yet |
| **B — Interaction gallery** | Hover, tap, scroll — link to live site behaviors | TextScrambler, LottieScroll, nav |
| **C — Do / don't** | Native Framer vs code motion | Ties to `why-native-first` |

**Research question:** Formal motion tokens or descriptive? Recommendation:
**descriptive first** (e.g. "menu variant transition: Framer default 0.3s ease");
add tokens when you extract repeats.

---

### Overrides & code components ✓ (built)

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Demo + CodeConsole** | 2-col card (current spec) | ✓ Default |
| **B — Stack on mobile** | Demo above code | Required for narrow width |
| **C — Superseded badge** | Gray label for native replacements | Already in spec |

---

### Framer-native components (next)

Cards for: **custom cursor**, **footer**, **nav bar**, **site identity**, **menu item**.

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Variant matrix** | Rows = variants (Phone open/closed), cols = states | Nav bar, menu item |
| **B — Anatomy + measurements** | Labeled screenshot | Site identity, footer |
| **C — Live instance** | Embedded component from main site | Custom cursor (desktop only) |

**Research question:** Screenshot vs live? Recommendation: **live** when
possible; screenshot for cursor (hard to embed on same page).

---

### Procedures (next)

**Cursor skills** · **AI workflows**

| Pattern | Description | Fits your DS? |
| --- | --- | --- |
| **A — Step list** | Numbered workflow matching `design-process/README.md` | Meta — documents your process |
| **B — Skill cards** | Name, when to use, link to `03-procedures/skills` or rules | Cursor skills |
| **C — Before/after** | Native-first story (like `why-native-first.md`) | AI workflows |

---

## 10-minute action plan

1. Open [jacobolenick.com/design-system](https://www.jacobolenick.com/design-system/) — note sticky nav + section rhythm (**2 min**).
2. For **Layout** and **Breakpoints**, pick A or B from tables above (**2 min**).
3. Screenshot one spacing reference (Tailwind or Vercel) → save to `references/` (**3 min**).
4. Write one sentence per *next* section in [`sections.md`](./sections.md) Structure field (**3 min**).

Later: upload foundation screenshots and ask Cursor to refine structures against
your real Framer frames.

---

## Folder for your screenshots

```
04-knowledge/system-page/references/
  README.md          ← naming convention
  layout-*.png
  breakpoints-*.png
  ...
```

See [`references/README.md`](./references/README.md).
