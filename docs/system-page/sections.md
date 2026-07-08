# System page — section briefs

One place to lock **structure** before visual polish. Update **Structure** when
you finish research. Token values live in [`../design-system/README.md`](../design-system/README.md).

**Status:** `done` · `structure` · `research` · `todo`

---

## Page shell

| Field | Value |
| --- | --- |
| **Title** | Design System (or System) |
| **Intro** | Tokens, typography, spacing, and live code from this portfolio. |
| **Nav** | Sticky: Colors · Typography · Spacing · Radius · Layout · Breakpoints · Motion · Overrides · Components · Native · Procedures |
| **Content width** | Max 680–800px centered; `padding-horizontal` 16 → 240 |
| **Structure** | Header → sticky anchor nav → stacked sections with IDs |

---

## Foundations

### Colors — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Swatch card grid |
| **Structure** | Label `Foundations` → 2-col grid (1 col mobile) → each cell: 64px fill, token name, hex |
| **Tokens** | 8 semantic Color Styles (see design-system doc) |
| **Research notes** | _Optional: in-context mini UI (pattern B)_ |

### Typography — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Specimen row |
| **Structure** | 12 rows → sample text in Text Style → name → mobile metrics → desktop metrics |
| **Tokens** | All `typo-*` styles, Inter 400–700 |
| **Research notes** | _Consider role groups (C) if 12 rows feel long_ |

### Spacing — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Horizontal bars + semantic table |
| **Structure** | Primitives row (bars) → table mobile→desktop for gaps + padding |
| **Tokens** | Primitives + `gap-*`, `padding-*` |
| **Research notes** | _Pair with Layout diagram for padding-top/bottom story_ |

### Radius — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Labeled squares |
| **Structure** | 5 squares 80×80 → token, px, usage caption |
| **Tokens** | `radius-sm` … `radius-pill` |
| **Research notes** | _Add real component names under each (CodeConsole, CopyEmail toast)_ |

### Layout — `research`

| Field | Value |
| --- | --- |
| **Status** | research |
| **Pattern** | _Pick: A anatomy diagram or C component zones_ |
| **Structure** | _TBD — page frame showing content width + padding arrows_ |
| **Tokens** | `padding-horizontal`, `padding-top`, `padding-bottom`, content max-width |
| **Research notes** | Upload `Portfolio-foundation-layout` when ready |

### Breakpoints — `research`

| Field | Value |
| --- | --- |
| **Status** | research |
| **Pattern** | _Pick: B token delta table or A device trio_ |
| **Structure** | _TBD — primary breakpoint 768px; what changes per token group_ |
| **Tokens** | All mobile→desktop pairs in design-system doc |
| **Research notes** | Upload `Portfolio-foundation-breakpoint` when ready |

### Motion — `todo`

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Pick: B interaction gallery or C native vs code_ |
| **Structure** | _TBD — list site motions: TextScrambler, LottieScroll, nav variant, hover states_ |
| **Tokens** | _None formal yet — document behaviors first_ |
| **Research notes** | Material motion overview for vocabulary |

---

## Code

### Overrides — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Demo + CodeConsole |
| **Structure** | Card per override → title + description → demo | snippet → superseded badge where applicable |
| **Items** | CopyEmail (live), MobileComingSoon, ClosePhoneNavOnSectionLink†, LottieAspectOverrides† |
| **Research notes** | † reference-only per `why-native-first.md` |

### Components (code) — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Demo + CodeConsole |
| **Structure** | TextScrambler + LottieScroll live demos |
| **Items** | See `snippets/` |

---

## Framer-native components — `todo`

### Nav bar

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Variant matrix (A)_ |
| **Structure** | _TBD — Phone closed / Phone open; link to native Set Variant fix_ |
| **Research notes** | Screenshot from live site |

### Menu item

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Variant matrix row or anatomy_ |
| **Structure** | _TBD — default, hover, active; WORK/CONTACT vs AI LAB behavior_ |

### Site identity

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Anatomy (B)_ |
| **Structure** | _TBD — logo/wordmark, sizes, placement in nav_ |

### Footer

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Anatomy (B)_ |
| **Structure** | _TBD — links, social, spacing, type styles used_ |

### Custom cursor

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Screenshot + specs (C hybrid)_ |
| **Structure** | _TBD — desktop only; states: default, link hover, disabled on touch_ |
| **Research notes** | Code or native? Document build method |

---

## Procedures — `todo`

### Cursor skills

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | B — Skill cards |
| **Structure** | _TBD — name, trigger, path under `.cursor/skills`_ |

### AI workflows

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | C — Before/after (native-first) |
| **Structure** | _TBD — link `design-process`, `why-native-first`, escape hatch_ |

---

## Section order (anchor IDs)

```
colors → typography → spacing → radius → layout → breakpoints → motion
→ overrides → components → native (sub: nav, menu, identity, footer, cursor)
→ procedures
```

Native subsections can share one `native` anchor with in-page subheadings, or
split IDs if sticky nav gets too long.
