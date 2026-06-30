import {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    type ComponentType,
} from "react"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"

/**
 * ClosePhoneNavOnSectionLink — auto-close the mobile nav after in-page scroll links.
 *
 * Problem it solves: on the nav-bar "Phone open" variant, tapping a link that
 * scrolls to a section on the SAME page (e.g. WORK on home, CONTACT anywhere)
 * left the menu open when scrolling back up. Any same-page section link should
 * dismiss the menu after tap.
 *
 * STATUS: superseded — kept as a reference, NOT used on the live site. Forcing
 * the nav's `variant` from an override does not work: the nav-bar owns its
 * variant through internal interactions, so the prop can't win. The shipped fix
 * is a NATIVE Framer interaction (On Click → Set Variant "Phone closed") on the
 * WORK / CONTACT links. See ../docs/why-native-first.md for the full story.
 *
 * Usage (abandoned approach): applied to the nav-bar instance; tried to detect
 * taps on menu links and force the closed variant via a Framer store.
 *
 * Changelog
 *   v1.0.3 (30-06-2026) — Marked superseded; solved natively (On Click → Set
 *     Variant). Kept as a reference example for the native-first rule.
 *   v1.0.2 (30-06-2026) — Capture-phase listeners + Framer store; still could not
 *     beat the component's internal variant state.
 *   v1.0.1 (30-06-2026) — Generalized: close on any same-page section link.
 *   v1.0.0 (30-06-2026) — Initial version.
 */

const VARIANT_CLOSED = "Phone closed"
const MOBILE_MAX_WIDTH = 768

// Layer names from the nav-bar component (Phone open > Dropdown > Links).
const MENU_LINKS_LAYER_NAMES = ["Links", "Dropdown"]

// Header row with name + hamburger/X — taps here should NOT force-close.
const MENU_HEADER_LAYER_NAMES = ["Holder"]

// Labels that should NEVER close the menu.
const KEEP_OPEN_LABELS = ["AI LAB"]

const useNavStore = createStore({
    /** When set, overrides the nav-bar variant until the menu is opened again. */
    forcedVariant: null as string | null,
})

function normalizeText(value: string | null | undefined): string {
    return (value ?? "").replace(/\s+/g, " ").trim().toUpperCase()
}

function getFramerLayerName(el: HTMLElement): string | null {
    return el.getAttribute("data-framer-name")
}

function isInsideNamedLayer(el: HTMLElement, names: string[]): boolean {
    let node: HTMLElement | null = el
    while (node) {
        const name = getFramerLayerName(node)
        if (name && names.includes(name)) return true
        node = node.parentElement
    }
    return false
}

function getTapTarget(target: EventTarget | null): HTMLElement | null {
    if (!(target instanceof HTMLElement)) return null
    return target.closest(
        "a, button, [role='button'], [data-framer-component-type], [data-framer-name]"
    )
}

function isKeepOpen(el: HTMLElement): boolean {
    const label = normalizeText(el.textContent)
    return KEEP_OPEN_LABELS.some((keep) => label.includes(normalizeText(keep)))
}

function isSamePageSectionLink(el: HTMLElement): boolean {
    if (typeof window === "undefined") return false

    const anchor = el.closest("a")
    const href = anchor?.getAttribute("href") ?? ""
    if (!href.includes("#")) return false

    try {
        const resolved = new URL(href, window.location.href)
        const samePath = resolved.pathname === window.location.pathname
        return samePath && resolved.hash.length > 1
    } catch {
        return /^\.?\/?#/.test(href)
    }
}

function isMenuLinkTap(el: HTMLElement): boolean {
    if (isInsideNamedLayer(el, MENU_HEADER_LAYER_NAMES)) return false
    return isInsideNamedLayer(el, MENU_LINKS_LAYER_NAMES)
}

function shouldCloseMenu(event: Event): boolean {
    if (typeof window === "undefined") return false
    if (window.innerWidth >= MOBILE_MAX_WIDTH) return false

    const target = getTapTarget(event.target)
    if (!target) return false
    if (isKeepOpen(target)) return false

    if (isMenuLinkTap(target)) return true
    if (isSamePageSectionLink(target)) return true

    return false
}

function shouldResetForceClose(event: Event): boolean {
    const target = getTapTarget(event.target)
    if (!target) return false
    // Hamburger / X live in the header row — let Framer open or close normally.
    return isInsideNamedLayer(target, MENU_HEADER_LAYER_NAMES)
}

export function ClosePhoneNavOnSectionLink(Component): ComponentType {
    return forwardRef((props: any, ref) => {
        const rootRef = useRef<HTMLElement | null>(null)
        const [store, setStore] = useNavStore()

        const setRefs = useCallback(
            (node: HTMLElement | null) => {
                rootRef.current = node
                if (typeof ref === "function") ref(node)
                else if (ref) ref.current = node
            },
            [ref]
        )

        const closeMenu = useCallback(() => {
            setStore({ forcedVariant: VARIANT_CLOSED })
        }, [setStore])

        const resetForceClose = useCallback(() => {
            setStore({ forcedVariant: null })
        }, [setStore])

        useEffect(() => {
            const root = rootRef.current
            if (!root) return

            const onPointerUp = (event: Event) => {
                if (shouldResetForceClose(event)) {
                    resetForceClose()
                    return
                }
                if (shouldCloseMenu(event)) {
                    // Defer so Framer's link/scroll handler runs first.
                    window.setTimeout(closeMenu, 0)
                }
            }

            root.addEventListener("pointerup", onPointerUp, true)
            root.addEventListener("click", onPointerUp, true)

            return () => {
                root.removeEventListener("pointerup", onPointerUp, true)
                root.removeEventListener("click", onPointerUp, true)
            }
        }, [closeMenu, resetForceClose])

        const activeVariant = store.forcedVariant ?? props.variant

        return (
            <Component
                ref={setRefs}
                {...props}
                variant={activeVariant}
            />
        )
    })
}

/**
 * Optional: apply to individual menu-item layers if the root override still
 * misses taps (Framer sometimes stops propagation inside nested components).
 */
export function ClosePhoneNavOnMenuItem(Component): ComponentType {
    return forwardRef((props: any, ref) => {
        const [, setStore] = useNavStore()

        const handleTap = (event: any) => {
            if (typeof window !== "undefined" && window.innerWidth < MOBILE_MAX_WIDTH) {
                const target = getTapTarget(event?.target ?? null)
                if (target && !isKeepOpen(target)) {
                    window.setTimeout(
                        () => setStore({ forcedVariant: VARIANT_CLOSED }),
                        0
                    )
                }
            }
            props.onTap?.(event)
            props.onClick?.(event)
        }

        return (
            <Component
                ref={ref}
                {...props}
                onTap={handleTap}
                onClick={handleTap}
            />
        )
    })
}
