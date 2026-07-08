# System page — section briefs

One place to lock **structure** before visual polish. Update **Structure** when
you finish research. Token values live in [`../../01-foundations/README.md`](../../01-foundations/README.md).

**Status:** `done` · `structure` · `research` · `todo`

---

## Information architecture (page labels)

How sections group on the live System page. The repo mirrors this split:
`01-foundations/` for tokens, `02-components/code-components/` +
`02-components/code-overrides/` for code, native UI documented later under **UI
components**.

| Page label | Section heading | What goes here |
| --- | --- | --- |
| **FOUNDATIONS** | Colors, Typography, Spacing, … | Design tokens (not code) |
| **COMPONENTS** | _(parent — no H2 of its own)_ | Everything built in Framer |
| ↳ | **Code components** | `02-components/code-components/*.tsx` |
| ↳ | **Code overrides** | `02-components/code-overrides/*.tsx` |
| ↳ | **UI components** | Native canvas components — nav-bar, footer, cursor-custom (todo) |
| **PROCEDURES** | Rules, skills, workflows | `03-procedures/rules`, `03-procedures/skills` |

**Naming note:** Avoid a second heading called just "Components" under
**COMPONENTS** — use **UI components** for native Framer pieces so
**Code components** stays unambiguous.

On Framer: use a small caps **label** (`COMPONENTS`) then H2s for each row
(**Code components**, **Code overrides**, **UI components**). Your screenshot
layout (`COMPONENTS` → `Code components`) matches this pattern.

---

## Page shell

| Field | Value |
| --- | --- |
| **Title** | Design System (or System) |
| **Intro** | Tokens, typography, spacing, and live code from this portfolio. |
| **Nav** | Sticky: Colors · Typography · Spacing · Radius · Layout · Breakpoints · Motion · Code components · Code overrides · UI components · Procedures |
| **Content width** | Max 680–800px centered; `padding-horizontal` 16 → 240 |
| **Structure** | Header → sticky anchor nav → Foundations block → Components block (3 subsections) → Procedures |

---

## Foundations

### Colors — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Swatch card grid |
| **Structure** | Label `Foundations` → 2-col grid (1 col mobile) → each cell: 64px fill, token name, hex |
| **Tokens** | 8 semantic Color Styles (see [`01-foundations/README.md`](../../01-foundations/README.md)) |
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
| **Tokens** | All mobile→desktop pairs in foundations doc |
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

## Components

Page label: **COMPONENTS**. Three subsections below — do not merge code
components and overrides into one list.

### Code components — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Demo + CodeConsole |
| **Structure** | Label `Components` once → H2 **Code components** → cards for TextScrambler, LottieScroll (+ ComponentPreview demos) |
| **Items** | See `snippets/` and [`../../02-components/code-components/`](../../02-components/code-components/) |

### Code overrides — `done`

| Field | Value |
| --- | --- |
| **Status** | done |
| **Pattern** | A — Demo + CodeConsole |
| **Structure** | H2 **Code overrides** → card per override → title + description → demo \| snippet → superseded badge where applicable |
| **Items** | CopyEmail (live), MobileComingSoon, ClosePhoneNavOnSectionLink†, LottieAspectOverrides† |
| **Research notes** | † reference-only per `why-native-first.md` |

### UI components — `todo`

Native Framer canvas components (not in the Code panel). Renamed from
"Framer-native components" to avoid clashing with **Code components**.

#### Nav bar

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Variant matrix (A)_ |
| **Structure** | _TBD — Phone closed / Phone open; link to native Set Variant fix_ |
| **Research notes** | Screenshot from live site |

#### Menu item

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Variant matrix row or anatomy_ |
| **Structure** | _TBD — default, hover, active; WORK/CONTACT vs AI LAB behavior_ |

#### Site identity

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Anatomy (B)_ |
| **Structure** | _TBD — logo/wordmark, sizes, placement in nav_ |

#### Footer

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Anatomy (B)_ |
| **Structure** | _TBD — links, social, spacing, type styles used_ |

#### Custom cursor

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | _Screenshot + specs (C hybrid)_ |
| **Structure** | _TBD — desktop only; states: default, link hover, disabled on touch_ |
| **Research notes** | Code or native? Document build method |

---

## Procedures — `todo`

### Rules & skills

| Field | Value |
| --- | --- |
| **Status** | todo |
| **Pattern** | B — Skill cards |
| **Structure** | _TBD — pair rules (`03-procedures/rules`) and skills (`03-procedures/skills`) on one row or subsection_ |

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
→ code-components → code-overrides → ui-components
→ procedures
```

Native pieces share anchor `ui-components` with in-page H3s (nav, menu, footer,
cursor). Split into separate anchors only if the sticky nav gets too long.
