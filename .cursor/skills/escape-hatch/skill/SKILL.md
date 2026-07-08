---
name: escape-hatch
description: Detects when work is stuck in a fix-retry loop and forces a step-back reframe to solve the problem at a different level (inside / around / replace). Use when 3+ attempts at the same problem have failed, each new attempt is a variation of the last, the same symptom persists after several fixes, or progress has stalled without growing understanding.
---

# Escape Hatch

A protocol for getting unstuck fast by changing the *level* a problem is being
solved at, instead of retrying the same approach harder.

## When to apply this skill

Trigger a reframe when ANY of these are true:

- 3 or more attempts at the same problem and the core symptom remains.
- Each new attempt is a variation of the previous one, not a different idea.
- The same error/behavior persists after several "fixes".
- You cannot clearly explain why the last attempt failed.
- The list of changes is growing but understanding is not.

Prefer to set a budget early in any non-trivial debugging task (e.g. "3 attempts,
then reframe") and announce it to the user.

## The protocol

When triggered, STOP making another same-level attempt and run these steps:

```
1. STOP        Do not start attempt N+1 of the same approach.
2. NAME        State the real problem in one sentence, using no solution words.
3. QUESTION    Surface the assumption never questioned (see questions below).
4. RELEVEL     Propose 2-3 solutions at DIFFERENT levels:
                 - inside the thing (tweak what you were given)
                 - around the thing (wrap / configure differently)
                 - replace the thing (swap for something you control)
5. CHOOSE      Pick highest leverage + lowest uncertainty. Re-box the time.
6. VERIFY      Prove the new approach on the smallest possible case first.
```

The key output is step 4: the alternatives must be at genuinely different
levels, not three flavors of the same fix. If only same-level ideas appear, the
reframe has not happened yet.

## Reframe questions (step 3)

- What am I assuming is fixed that I could actually change?
- Am I fixing a symptom or the cause?
- Is the thing I'm fixing even the right thing to fix?
- What would I do if I owned the part that's fighting me?
- What is the simplest version that would prove a new approach in ~10 minutes?

## How to present it

- Briefly name that you are pulling the escape hatch and why (which loop signal).
- Show the one-sentence problem statement and the assumption being challenged.
- List the inside / around / replace options with a quick leverage vs.
  uncertainty read on each.
- Recommend one. Ask the user only if the choice depends on intent or has real
  trade-offs they should own; otherwise proceed and verify on a small case.

## Principles

- Replace beats repair when you do not control the broken part.
- Failed attempts are information (where not to dig), not a reason to keep digging.
- Speed comes from changing altitude, not from typing faster.
