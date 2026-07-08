# Components

Everything you **build** for the site — code from Framer's Code panel plus
supporting assets. Maps to the **COMPONENTS** block on the System page.

| Folder | System page subsection | Framer import path |
| --- | --- | --- |
| [`code-components/`](./code-components/) | Code components | Copy `.tsx` into Framer Code panel |
| [`code-overrides/`](./code-overrides/) | Code overrides | Copy `.tsx` into Framer Code panel |
| [`custom-code/`](./custom-code/) | _(site-wide)_ | Site Settings → Custom Code |
| [`lotties/`](./lotties/) | _(assets)_ | Upload or link from `LottieScroll` |

Native canvas components (nav-bar, footer, cursor-custom) live in the Framer
project file — not in this repo.

## Naming

Two conventions on purpose — folders vs React files:

| Layer | Style | Example |
| --- | --- | --- |
| Folders | `kebab-case` | `code-components/`, `code-overrides/`, `custom-code/` |
| React / Framer `.tsx` | `PascalCase` | `CodeConsole.tsx`, `TextScrambler.tsx`, `CopyEmail.tsx` |
| Assets | `kebab-case` | `Cover-motion-clean.json`, `disable-tap-highlight.html` |

**Folders** use kebab-case for repo paths, GitHub readability, and System page
anchor IDs (`code-components`, `code-overrides`).

**Component files** use PascalCase because they match the exported React name
(`export default function CodeConsole`) — standard in React/TypeScript and what
Framer shows in the Code panel. Renaming to `code-console.tsx` would fight that
convention without benefit.

**Rule of thumb:** category = kebab-case; component = PascalCase.
