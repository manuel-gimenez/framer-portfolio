# Debt & tradeoffs

Tracked shortcuts, blocked work, and reference-only code. Pair with the **status
lights** in each file header (`🟢` / `🟡` / `🔴`).

## Status lights

| Light | Meaning | When to use |
| --- | --- | --- |
| 🟢 **Live** | Shipped on the published site | Component or override is applied and working in production |
| 🟡 **Not ready** | In progress, blocked, or paused | Do not rely on it; may be partial or untested end-to-end |
| 🔴 **Deprecated** | Not on the live site | Superseded or abandoned; kept as reference only |

Add a `Status:` line to every file in `components/`, `overrides/`, and
`custom-code/` (see `.cursor/rules/code-header-convention.mdc`). When status is
unclear, confirm with Manuel before marking 🟢 Live.

## Inventory (code panel)

| File | Type | Status |
| --- | --- | --- |
| `components/CodeConsole.tsx` | Component | 🟢 Live — System page |
| `components/ChipText.tsx` | Component | 🟢 Live — System page |
| `components/ComponentPreview.tsx` | Component | 🟢 Live — System page (scramble demos) |
| `components/TextScrambler.tsx` | Component | 🟢 Live — AI LAB nav (desktop) |
| `components/LottieScroll.tsx` | Component | 🟢 Live — project cover heroes |
| `overrides/CopyEmail.tsx` | Override | 🟢 Live — footer Contact |
| `overrides/MobileComingSoon.tsx` | Override | 🟢 Live — AI LAB nav (mobile) |
| `overrides/CursorHoverSync.tsx` | Override | 🟡 🔧 Not ready — see below |
| `overrides/ClosePhoneNavOnSectionLink.tsx` | Override | 🔴 Deprecated — native Set Variant ships |
| `overrides/LottieAspectOverrides.tsx` | Override | 🔴 Deprecated — superseded by LottieScroll |

---

## Open debt

### Cursor hover on ComponentPreview restart icon {#cursor-hover-on-restart-icon}

**Status:** 🟡 Paused (08-07-2026)  
**Goal:** When hovering the restart icon on `ComponentPreview`, switch the site
custom cursor (`cursor-custom`) to its **Hover-01** variant — same feel as nav
links (SYSTEM, WORK, etc.).

**What we tried**

1. **Native Framer** — `Cursor → Set Variant` on canvas layers only; does not
   reach elements inside code components (restart button inside
   `ComponentPreview`).
2. **`ControlType.ComponentInstance`** — dropdown lists page layers, not code
   components; not viable for this use case.
3. **`CursorHoverSync` override** on `cursor-custom` root + store/events from
   `ComponentPreview` — cursor disappeared when wrapping in a `div`; variant
   prop did not reliably switch to Hover-01; Framer may own cursor variant state
   at the breakpoint level.

**Files involved**

- `overrides/CursorHoverSync.tsx` — listener override (🟡 not ready; do not
  apply on `cursor-custom` until resolved)
- `components/ComponentPreview.tsx` — `cursorHover` / `cursorHoverVariant`
  props (default **Off** until debt is closed)

**Suggested next steps**

1. **Native escape hatch** — transparent Frame over the restart zone on each
   `ComponentPreview` instance → `Cursor → Set Variant → Hover-01` (manual per
   instance, but reliable).
2. **Investigate Framer cursor API** — whether breakpoint custom cursor accepts
   variant changes from code without breaking the root ref.
3. **Alternative** — drop restart-icon cursor hover; keep default cursor on
   restart (current shipped path).

**Do not apply** `CursorHoverSync` on `cursor-custom` until this debt is
resolved — it has broken the visible cursor in testing.

---

## Closed / reference only

### ClosePhoneNavOnSectionLink

Superseded by native **On Click → Set Variant "Phone closed"** on nav links.
See `docs/why-native-first.md`.

### LottieAspectOverrides

Superseded by `components/LottieScroll.tsx`. Kept for the escape-hatch story in
docs and README.
