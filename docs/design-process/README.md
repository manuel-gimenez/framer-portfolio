# Design process

Repeatable workflow for designing anything on this portfolio — pages, sections,
components, or documentation like the **System** page.

Use this when you start a new design task. Skip steps only when the scope is
tiny (e.g. a one-line copy tweak).

---

## Overview

```
Research → Define structure → Execute → Review
```

| Phase | Goal | Output |
| --- | --- | --- |
| **Research** | Gather references; understand patterns | Mood board, notes, section sketches |
| **Define structure** | Decide layout per section before polishing | Section briefs (wireframe-level) |
| **Execute** | Build in Framer (native-first) | Live page / component |
| **Review** | Validate against tokens + behavior | Checklist pass |

**Time rule of thumb** (from your System page plan): ~12h total for a full
documentation page — research 1h, structure 4h, execute 5h, review 2h. Adjust
per scope.

---

## Phase 1 — Research

**When:** Before opening Framer for a new page or major section.

**Inputs you can upload to Cursor**

- [ ] `Portfolio-foundation-colors`
- [ ] `Portfolio-foundation-typography`
- [ ] `Portfolio-foundation-spacing`
- [ ] `Portfolio-foundation-radius`
- [ ] `Portfolio-foundation-layout`
- [ ] `Portfolio-foundation-breakpoint`

**What to do**

1. Pick 3–5 design-system or portfolio references (see
   [`../system-page/visual-research.md`](../system-page/visual-research.md)).
2. For each section you need, note **one pattern you like** (layout, not colors).
3. Screenshot or link; add a one-line note: *why this works for my site*.
4. Cross-check against existing tokens in
   [`../../foundations/README.md`](../../foundations/README.md) — don't invent
   new values during research.

**Stop when:** You can describe each section in one sentence (*"Colors = 2-col
swatch grid with hex under each swatch"*).

**Cursor prompt template**

> I'm designing [section name] for my System page. My tokens are in
> `foundations/README.md`. Here are reference screenshots: [attach].
> Propose 2 layout structures that match my minimal editorial style. No final
> design — wireframe-level only.

---

## Phase 2 — Define structure

**When:** After research, before high-fidelity build.

**What to do**

1. Open [`../system-page/sections.md`](../system-page/sections.md) and fill or
   confirm the **Structure** field per section.
2. List section order and anchor IDs (for sticky nav).
3. Note what is **native Framer** vs **code** (see
   [`../why-native-first.md`](../why-native-first.md)).
4. Estimate hours per section in
   [`checklist.md`](./checklist.md).

**Stop when:** Every section has a chosen layout pattern and a build method.

---

## Phase 3 — Execute

**When:** Structure is agreed.

**Order (System page)**

1. Page shell + sticky nav + empty section frames with IDs
2. Foundations (fastest first: colors → typography → spacing → radius)
3. Remaining foundations (layout → breakpoints → motion)
4. Code demos (`CodeConsole` + live instances)
5. Framer-native component cards
6. Procedures (Cursor skills, AI workflows)

Full build steps: [`../system-page/README.md`](../system-page/README.md).

**Rules**

- Native-first for interactions and layout.
- Reuse Color Styles, Text Styles, and spacing tokens — no one-off values.
- Code only when Framer can't do it.

---

## Phase 4 — Review

**When:** Section or full page is assembled.

**What to do**

1. Run the post-build checklist in
   [`../system-page/README.md`](../system-page/README.md#post-build-review-checklist).
2. Mobile + desktop (≥768px) pass.
3. Log changes in section briefs or [`foundations/README.md`](../../foundations/README.md) if tokens changed.

**Stop when:** Checklist is green or issues are filed for a follow-up iteration.

---

## Files in this repo

| File | Purpose |
| --- | --- |
| [`checklist.md`](./checklist.md) | Task list, hours, status |
| [`../system-page/visual-research.md`](../system-page/visual-research.md) | Reference sites + section prompts |
| [`../system-page/sections.md`](../system-page/sections.md) | Per-section structure briefs |
| [`../system-page/README.md`](../system-page/README.md) | Framer build spec |
| [`../../foundations/README.md`](../../foundations/README.md) | Token source of truth |

---

## System page roadmap

Aligned with your FigJam board.

### Done (execute)

- [x] Colors
- [x] Typography
- [x] Spacing
- [x] Radius
- [x] Code components
- [x] Code overrides

### Next — Foundations

- [ ] Layout
- [ ] Breakpoints
- [ ] Motion

### Next — Components (Framer-native)

- [ ] Custom cursor
- [ ] Footer
- [ ] Nav bar
- [ ] Site identity
- [ ] Menu item

### Next — Procedures

- [ ] Cursor skills
- [ ] AI workflows
