/**
 * CursorHoverSync — syncs cursor-custom to hover variant from code components.
 *
 * Status: 🟡 🔧 Not ready — paused; do not apply on cursor-custom. See
 *   docs/debt.md#cursor-hover-on-restart-icon.
 *
 * Problem it solves: Framer's native Cursor → Set Variant only works on canvas
 * layers, not inside code components. ComponentPreview dispatches hover state
 * via a Framer store; this override applies it to cursor-custom's variant.
 *
 * Usage:
 *   1. Edit cursor-custom in Assets (double-click).
 *   2. Select the root frame → Code override → CursorHoverSync.
 *   3. On ComponentPreview: Cursor Hover = Link, Cursor Variant = Hover-01.
 *   4. Test in Preview (▶), desktop breakpoint — not the static canvas.
 *
 * Changelog
 *   v1.0.4 (08-07-2026) — Mark 🟡 Not ready; work paused (debt doc).
 *   v1.0.3 (07-07-2026) — Remove wrapper div (broke site custom cursor); only
 *     override variant while code-hover is active, else pass props through.
 *   v1.0.2 (07-07-2026) — Framer createStore (replaces window events).
 *   v1.0.0 (07-07-2026) — Initial version.
 */

import {
    forwardRef,
    useEffect,
    type ComponentType,
} from "react"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"

type CursorHoverState = {
    active: boolean
    variant: string
}

/** Shared singleton — same key in ComponentPreview.tsx */
const CURSOR_STORE_KEY = "__portfolioCursorHoverStore"
const CURSOR_SETTER_KEY = "__portfolioCursorHoverSetter"

type CursorStoreHook = () => [
    CursorHoverState,
    (update: Partial<CursorHoverState>) => void,
]

function getCursorHoverStore(): CursorStoreHook {
    if (typeof window === "undefined") {
        return createStore<CursorHoverState>({ active: false, variant: "" })
    }
    const w = window as Window & {
        [CURSOR_STORE_KEY]?: CursorStoreHook
    }
    if (!w[CURSOR_STORE_KEY]) {
        w[CURSOR_STORE_KEY] = createStore<CursorHoverState>({
            active: false,
            variant: "",
        })
    }
    return w[CURSOR_STORE_KEY]!
}

/**
 * Apply to the root frame inside cursor-custom (component editor).
 * Must not wrap the component — Framer's custom cursor needs a direct root.
 */
export function CursorHoverSync(Component): ComponentType {
    return forwardRef((props: Record<string, unknown>, ref) => {
        const useStore = getCursorHoverStore()
        const [hover, setHover] = useStore()

        useEffect(() => {
            const w = window as Window & {
                [CURSOR_SETTER_KEY]?: (
                    update: Partial<CursorHoverState>
                ) => void
            }
            w[CURSOR_SETTER_KEY] = setHover
            return () => {
                delete w[CURSOR_SETTER_KEY]
            }
        }, [setHover])

        if (hover.active && hover.variant) {
            return (
                <Component
                    ref={ref}
                    {...props}
                    variant={hover.variant}
                />
            )
        }

        return <Component ref={ref} {...props} />
    })
}
