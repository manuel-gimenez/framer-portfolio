# Procedures

How I work on this portfolio — rules for consistency and skills for getting
unstuck. Maps to the **PROCEDURES** block on the System page.

| Folder | What it is |
| --- | --- |
| [`rules/`](./rules/) | Cursor rules (`.mdc`) — native-first, code headers, status lights |
| [`skills/`](./skills/) | Problem-solving playbooks (e.g. escape-hatch) |

**Cursor IDE:** [`.cursor/rules`](../.cursor/rules) and
[`.cursor/skills`](../.cursor/skills) are **symlinks** to this folder. Cursor
only auto-loads rules from `.cursor/rules/` — so we keep one copy here and
symlink it. **Edit files in `03-procedures/`** (or via the symlink — same file).
