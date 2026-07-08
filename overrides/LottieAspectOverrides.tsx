/**
 * LottieAspectOverrides — wrap Dot Lottie to trim letterbox via aspect-ratio height.
 *
 * Status: 🔴 Deprecated — superseded by LottieScroll; not on the live site.
 *
 * Problem it solves: the earlier attempt at the padding/letterbox problem by
 * wrapping Framer's Dot Lottie and computing height from each animation's
 * aspect ratio. It works partially but can't reach the part that creates the
 * letterbox — superseded by LottieScroll.tsx.
 *
 * Usage: reference only; kept as the honest "before" in the escape-hatch story.
 * Was applied to Dot Lottie instances on project cover sections (abandoned).
 *
 * Changelog
 *   v1.0.1 (08-07-2026) — Add 🔴 Deprecated status line.
 *   v1.0.0 (30-06-2026) — Initial version (superseded by LottieScroll).
 */

import {
    forwardRef,
    ComponentType,
    useEffect,
    useRef,
    useState,
} from "react"

// Intrinsic animation ratios (height / width).
const GUEST_RATIO = 220 / 684
const HOSTER_RATIO = 270 / 684
const INPUTS_RATIO = 409 / 684

// Scrub durations (ms) — natural length at 60fps per animation.
const GUEST_DURATION = 6250
const HOSTER_DURATION = 7320
const INPUTS_DURATION = 4000

const PLAY_FALLBACK_MS = 1500

// Measures the wrapper's real width and returns the height that keeps the
// animation's aspect ratio, so the black letterbox is trimmed. Using an
// explicit pixel height (instead of CSS aspect-ratio) avoids the 0x0 collapse
// when the container width is indefinite.
function useTrimmedHeight(ratio: number, wrapperRef: any) {
    const [height, setHeight] = useState<number | undefined>(undefined)

    useEffect(() => {
        const element = wrapperRef.current
        if (!element) return

        const measure = () => {
            const w = element.clientWidth
            if (w > 0) setHeight(w * ratio)
        }

        measure()

        let ro: ResizeObserver | null = null
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(measure)
            ro.observe(element)
        }
        window.addEventListener("resize", measure)

        return () => {
            if (ro) ro.disconnect()
            window.removeEventListener("resize", measure)
        }
    }, [ratio, wrapperRef])

    return height
}

function usePlayOnceOnView(duration: number, wrapperRef: any) {
    const [progress, setProgress] = useState(0)
    const hasPlayed = useRef(false)
    const raf = useRef<number | null>(null)

    useEffect(() => {
        let cancelled = false

        const startPlaying = () => {
            if (hasPlayed.current) return
            hasPlayed.current = true

            const startTime = performance.now()
            const tick = (now: number) => {
                if (cancelled) return
                const pct = Math.min((now - startTime) / duration, 1)
                setProgress(pct * 100)
                if (pct < 1) raf.current = requestAnimationFrame(tick)
            }
            raf.current = requestAnimationFrame(tick)
        }

        const element = wrapperRef.current
        let observer: IntersectionObserver | null = null

        if (element && typeof IntersectionObserver !== "undefined") {
            observer = new IntersectionObserver(
                ([entry]) => {
                    if (!entry.isIntersecting) return
                    startPlaying()
                    if (observer) observer.disconnect()
                },
                { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
            )
            observer.observe(element)
        } else {
            startPlaying()
        }

        const fallback = setTimeout(startPlaying, PLAY_FALLBACK_MS)

        return () => {
            cancelled = true
            if (observer) observer.disconnect()
            if (raf.current !== null) cancelAnimationFrame(raf.current)
            clearTimeout(fallback)
        }
    }, [duration, wrapperRef])

    return progress
}

// Each override MUST be a literal export function.
// Framer's picker cannot detect: export const x = makeOverride(...)

/** Cover-guest-ds-clean.json */
export function withGuestAspect(Component): ComponentType {
    return forwardRef((props: any, ref: any) => {
        const wrapperRef = useRef(null)
        const progress = usePlayOnceOnView(GUEST_DURATION, wrapperRef)
        const height = useTrimmedHeight(GUEST_RATIO, wrapperRef)

        return (
            <div
                ref={wrapperRef}
                style={{
                    ...props.style,
                    height: height ?? props.style?.height,
                    position: props.style?.position ?? "relative",
                }}
            >
                <Component
                    {...props}
                    ref={ref}
                    style={{ width: "100%", height: "100%" }}
                    autoplay={false}
                    hoverPlay={false}
                    loop={false}
                    progress={progress}
                />
            </div>
        )
    })
}

/** Cover-hoster-ds-clean.json */
export function withHosterAspect(Component): ComponentType {
    return forwardRef((props: any, ref: any) => {
        const wrapperRef = useRef(null)
        const progress = usePlayOnceOnView(HOSTER_DURATION, wrapperRef)
        const height = useTrimmedHeight(HOSTER_RATIO, wrapperRef)

        return (
            <div
                ref={wrapperRef}
                style={{
                    ...props.style,
                    height: height ?? props.style?.height,
                    position: props.style?.position ?? "relative",
                }}
            >
                <Component
                    {...props}
                    ref={ref}
                    style={{ width: "100%", height: "100%" }}
                    autoplay={false}
                    hoverPlay={false}
                    loop={false}
                    progress={progress}
                />
            </div>
        )
    })
}

/** Cover-inputs-clean.json */
export function withInputsAspect(Component): ComponentType {
    return forwardRef((props: any, ref: any) => {
        const wrapperRef = useRef(null)
        const progress = usePlayOnceOnView(INPUTS_DURATION, wrapperRef)
        const height = useTrimmedHeight(INPUTS_RATIO, wrapperRef)

        return (
            <div
                ref={wrapperRef}
                style={{
                    ...props.style,
                    height: height ?? props.style?.height,
                    position: props.style?.position ?? "relative",
                }}
            >
                <Component
                    {...props}
                    ref={ref}
                    style={{ width: "100%", height: "100%" }}
                    autoplay={false}
                    hoverPlay={false}
                    loop={false}
                    progress={progress}
                />
            </div>
        )
    })
}
