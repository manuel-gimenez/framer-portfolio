# Cursor (IDE wiring)

Symlinks only — **not a second copy**. The real files live in
[`03-procedures/`](../03-procedures/).

Cursor requires rules at `.cursor/rules/` to load them automatically. We symlink
to `03-procedures/` so hiring managers see rules + skills in the numbered folder,
and Cursor still works.

| Symlink | Target |
| --- | --- |
| [`rules/`](./rules) | [`03-procedures/rules/`](../03-procedures/rules/) |
| [`skills/`](./skills) | [`03-procedures/skills/`](../03-procedures/skills/) |
