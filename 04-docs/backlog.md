# Backlog

Work we **intend to do later** — not blocked code, not shipped yet.

| | **Backlog** (this file) | **[debt.md](./debt.md)** |
| --- | --- | --- |
| **What** | Planned improvements, new sections, skills | Partial fixes, shortcuts, paused code |
| **Example** | “Add copy-tone skill when we have more subtitles” | `CursorHoverSync` broken — don’t apply on site |
| **Tone** | “When we have time” | “This has a cost if we ignore it” |

Add items when we defer something on purpose. Remove or strike when shipped.
Keep entries short — link to `debt.md` for technical detail.

Organized to match the numbered repo folders.

---

## 01-foundations

System page **Foundations** blocks and token docs — add to [`copy/tone.md`](./copy/tone.md) when each section ships.

- [ ] Spacing — subtitle + add to `tone.md` when live
- [ ] Layout — section on System page (diagram / content width)
- [ ] Breakpoints — section on System page (what changes at `768px`)
- [ ] Motion — section on System page (site behaviors; no formal tokens yet)

---

## 02-components

**Code components**, **code overrides**, and **UI components** (native Framer) on the System page.

- [ ] `LottieScroll` — screenshot from live project cover on System page (no live preview for now)
- [ ] `ComponentPreview` — extend demos beyond TextScrambler if budget allows
- [ ] **UI components** — document native pieces (nav-bar, footer, `cursor-custom`, menu item) as cards on System page
- [ ] Per-component one-liners only when header is not enough (e.g. “Live on Guest cover”) — see [`copy/tone.md`](./copy/tone.md)

---

## 03-procedures

Rules, skills, and **Procedures** block on the System page.

- [ ] **copy-tone skill** — create `03-procedures/skills/copy-tone/` when ~8+ approved subtitles exist in `tone.md` and copy requests are frequent
- [ ] **Procedures** section on System page — rules + skills cards, link to `why-native-first` / escape-hatch

---

## 04-docs

Repo docs and copy reference — not the live Framer page.

- [ ] Grow [`copy/tone.md`](./copy/tone.md) as new System page subtitles are approved
- [ ] Subtitles still needed: Spacing, Layout, Breakpoints, Motion, Procedures, UI components (when built)

---

## Done

_Move items here with date when shipped._

- [x] Copy tone guide + Foundations + Code components/overrides subtitles (08-07-2026) — [`copy/tone.md`](./copy/tone.md)
- [x] System page hero intro (08-07-2026) — [`copy/tone.md`](./copy/tone.md#page-intro--design-system)
