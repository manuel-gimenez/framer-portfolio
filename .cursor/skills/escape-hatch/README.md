# Escape Hatch

**A method for getting unstuck fast by changing the *level* you're solving at.**

When you've tried the same fix three or four times and the problem is still
there, the answer is usually not attempt number five. It's stepping back and
asking: *am I even solving this at the right level?* Often the thing you're
fighting is the wrong thing to fight — and the fastest path is to **replace it,
not repair it.**

This isn't about being a "10x engineer." It's a repeatable move anyone can run,
on purpose, to stop bleeding time.

---

## The core idea

Every problem can be solved at more than one level:

- **Inside the thing** — tweak the code/config/component you were handed.
- **Around the thing** — work with or wrap it differently.
- **Replace the thing** — swap it for something you control.

Most people get stuck because they only ever try level 1, harder. They add
attempt after attempt at the same altitude. The Escape Hatch is the deliberate
decision to **change altitude** once level 1 stops paying off.

> If the component is the problem, build your own component.

---

## When to pull the hatch

You're in the loop when you notice any of these:

- You've made **3+ attempts** at the same problem and the core symptom remains.
- Each new attempt is a *variation* of the last, not a *different idea*.
- You're guessing more than you're reasoning ("maybe this flag fixes it").
- You can't clearly explain **why** the last fix didn't work.
- The fix list is growing but your understanding isn't.

Set a budget **before** you start: a time-box (e.g. 2 hours) or an attempt-box
(e.g. 4 tries). When you hit it, you don't push harder — you pull the hatch.

---

## The protocol

```
1. STOP        Don't start attempt N+1 of the same approach.
2. NAME        Write the real problem in one sentence, no solution words.
3. QUESTION    Challenge the assumption you never questioned.
4. RELEVEL     List 2-3 solutions at different levels (inside / around / replace).
5. CHOOSE      Pick highest leverage + lowest uncertainty. Re-box the time.
6. VERIFY      Prove it works on the smallest possible case first.
```

### The reframe questions (step 3)

- What am I assuming is fixed that I could actually change?
- Am I fixing a **symptom** or the **cause**?
- Is the thing I'm fixing even the right thing to fix?
- What would I do if I **owned** the part that's fighting me?
- What's the simplest version that would prove the new approach in 10 minutes?

---

## Worked example: the Lottie covers

**The problem (as first framed):** "My Lottie covers in Framer show a black bar. Fix the code override that controls them."

**Level 1, tried repeatedly:** patch the override on the existing *Dot Lottie*
component — force aspect ratio (collapsed the whole preview to 0×0), respect
sizing, compute height from width, fix a `forwardRef` signature warning… Each
attempt removed one error and revealed another. The black bar *still* sat there,
because the component letterboxes the animation itself — the override could never
reach the part actually creating the bar.

**The Escape Hatch:** instead of asking *"how do I fix the override on this
component?"*, the question became *"why am I using this component at all? If the
component is the problem, why not build our own?"*

**Level 3, once:** a small custom player (`lottie-web`) with direct control of
fit (`contain` / `cover` / `fill`) — so the animation fills its frame with no
black bar, on every breakpoint. One reframing solved in a single move what a
dozen patches couldn't.

**The lesson:** the hours spent at level 1 weren't wasted — they're what proved
level 1 was a dead end. The skill isn't avoiding the dead end; it's *noticing it
faster next time* and changing altitude on purpose.

---

## Principles

- **Bounded attempts beat infinite grit.** A budget turns "I'm failing" into "I
  hit my limit, time to reframe" — same situation, very different next move.
- **Replace > repair** when you don't control the broken part.
- **Sunk cost is information, not obligation.** Failed attempts tell you where
  *not* to dig. Spend them, then move.
- **Understanding is the real progress metric.** If your fix count is rising but
  your understanding isn't, you're in the loop.
- **Speed comes from altitude changes, not faster typing.**

---

## Using this when pairing with an AI

The reframe is easy to miss in the moment — for humans *and* assistants — because
each individual patch looks reasonable. Make it explicit:

- Agree on the budget up front ("3 attempts, then we step back").
- When you hit it, ask directly: *"What would a level-3 / replace-it solution
  look like?"*
- Have the assistant list approaches at **different levels**, not three flavors
  of the same one.

A companion Cursor skill that automates this nudge lives in [`skill/`](skill/).
It's designed to fire after repeated failed attempts and force a reframe — so
next time, pulling the hatch can be the assistant's idea too.

---

## License

MIT — use it, share it, adapt it.
