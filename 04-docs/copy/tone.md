# Tone of voice — System page copy

Reference for subtitles and body copy on the **System** page (and similar docs).
**Not** design tokens — keep this in `04-docs/copy/`, not `01-foundations/`.

## How to use

1. Read the **principles** and **reference subtitles** below before drafting.
2. Use [`ChipText`](../../02-components/code-components/ChipText.tsx) on the site —
   wrap technical terms in `` `backticks` `` for inline chips.
3. **Human check always** — AI drafts are a starting point; you review and we
   iterate together until the line reads right in Framer.

A Cursor **skill** is not needed yet. Revisit when you have ~8+ sections of
copy and ask for subtitles often; until then this doc + “match `tone.md`” in
chat is enough. Optional later: `03-procedures/skills/copy-tone/`.

---

## Principles (from your Foundations copy)

| Principle | What it looks like |
| --- | --- |
| **Declarative** | “Tokens define…”, “Semantic text styles compose…” — not “I built…” |
| **System-first** | Subject is the portfolio, tokens, or code — not the author |
| **Two beats** | Often: what it is → how it works or why it's named that way |
| **Precise vocabulary** | Design-system terms: primitive, semantic, scale, binding |
| **Chips on terms** | `` `OKLCH` ``, `` `fg` ``, `` `Code panel` `` — not whole sentences |
| **Framer context** | Say what ships in Framer vs what stays in repo / Figma when relevant |
| **No hype** | Explain; don't sell |

**Avoid:** marketing fluff, first person in subtitles, per-component blurbs when
the code header in `CodeConsole` already documents the item.

---

## Reference subtitles — Foundations

Approved copy from the live System page. Match this rhythm for new sections.

### Colors (primitives)

Primitive tokens define the portfolio's reusable color palette. `blue-400`
serves as the primary brand color, while its remaining shades are derived using
the `OKLCH` color space to maintain perceptually uniform color relationships.

### Colors (grouping)

Tokens are grouped by functional category (`bg`, `fg`, `border`, `interactive`)
and organized using an incremental scale. Using `fg` instead of `text` broadens
each token's applicability to text, icons and other foreground elements while
keeping the naming system concise and consistent.

### Typography (primitives)

Primitive tokens define the portfolio's reusable type scale. Originally
structured as Figma `variables` composed into `text styles`, the granular layer
supports design-tool binding; only `semantic text styles` are applied in
Framer, with naming kept consistent across both.

### Typography (semantic)

Semantic text styles compose typography primitives into named roles used across
the portfolio. Mobile and desktop columns show size, line height, and letter
spacing, in that order, as resolved px at 16px root; primitive bindings appear
in `tokens.css` below.

---

## Reference subtitles — Components

### Code components

Code components are self-contained modules authored in the Framer `Code panel`
and versioned in this repository as the source of truth for each implementation.
Each module exposes `property controls` on the canvas; they are used when native
Framer cannot deliver the interaction, media handling, or rendered output the
portfolio requires.

### Code overrides

Code overrides wrap existing canvas layers and add behavior on top of the native
element underneath. They are the lightest code path when the layout already
lives in Framer but needs interaction that native `variants`, links, or cursors
cannot provide on their own.

---

## ChipText paste blocks

Copy the paragraph only into the `text` property (backticks become chips).

**Code components**

```
Code components are self-contained modules authored in the Framer `Code panel` and versioned in this repository as the source of truth for each implementation. Each module exposes `property controls` on the canvas; they are used when native Framer cannot deliver the interaction, media handling, or rendered output the portfolio requires.
```

**Code overrides**

```
Code overrides wrap existing canvas layers and add behavior on top of the native element underneath. They are the lightest code path when the layout already lives in Framer but needs interaction that native `variants`, links, or cursors cannot provide on their own.
```
