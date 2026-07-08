import { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType } from "framer"
import lottie from "lottie-web"

/**
 * LottieScroll — a self-contained Lottie player for Framer.
 *
 * Why this exists (replaces the Dot Lottie component):
 *  - Full fit control (contain / cover / fill) so there is NEVER a black
 *    letterbox/backdrop area, regardless of the frame's shape.
 *  - No LottieFiles dependency.
 *  - Plays once when scrolled into view (top-edge trigger, height-independent).
 *
 * Supply the animation with the "JSON file" control (upload a
 * Cover-*-clean.json) or the "JSON URL" control.
 *
 * Changelog
 *   v1.0.0 (30-06-2026) — Initial version: replaces the Dot Lottie component.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function LottieScroll(props) {
    const { file, url, fit, trigger, timingMode, speed, duration, triggerLine } =
        props

    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const sentinelRef = useRef<HTMLDivElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const animRef = useRef<any>(null)
    const [data, setData] = useState<any>(null)

    const src = file || url

    // Resolve the playback speed. In "duration" mode, derive the speed needed to
    // run the whole animation in exactly `duration` seconds, from its natural
    // length: naturalSeconds = (op - ip) / fr.
    const resolveSpeed = (json: any) => {
        if (timingMode === "duration" && duration > 0 && json) {
            const fr = json.fr || 60
            const naturalSeconds = ((json.op || 0) - (json.ip || 0)) / fr
            if (naturalSeconds > 0) return naturalSeconds / duration
        }
        return speed || 1
    }

    const preserveAspectRatio =
        fit === "cover"
            ? "xMidYMid slice"
            : fit === "fill"
              ? "none"
              : "xMidYMid meet"

    // Load the JSON whenever the source changes.
    useEffect(() => {
        let cancelled = false
        if (!src) {
            setData(null)
            return
        }
        fetch(src)
            .then((r) => r.json())
            .then((json) => {
                if (!cancelled) setData(json)
            })
            .catch(() => {
                if (!cancelled) setData(null)
            })
        return () => {
            cancelled = true
        }
    }, [src])

    // (Re)create the animation when data or render options change.
    useEffect(() => {
        const container = containerRef.current
        if (!container || !data) return

        if (animRef.current) {
            animRef.current.destroy()
            animRef.current = null
        }

        const autoplay = trigger === "loopAutoplay" || trigger === "autoplay"
        const loop = trigger === "loopAutoplay"

        const anim = lottie.loadAnimation({
            container,
            renderer: "svg",
            loop,
            autoplay,
            animationData: JSON.parse(JSON.stringify(data)),
            rendererSettings: {
                preserveAspectRatio,
                progressiveLoad: true,
            },
        })
        anim.setSpeed(resolveSpeed(data))
        animRef.current = anim

        let observer: IntersectionObserver | null = null
        let played = false

        if (trigger === "onView") {
            anim.goToAndStop(0, true)
            const sentinel = sentinelRef.current
            if (sentinel && typeof IntersectionObserver !== "undefined") {
                // Height-independent trigger: observe a 1px sentinel at the top
                // edge and fire when it crosses `triggerLine` down the viewport
                // (e.g. 0.85 = play when the top reaches ~85% viewport height).
                const line = triggerLine ?? 0.85
                const bottomInset = Math.round((1 - line) * 100)
                observer = new IntersectionObserver(
                    (entries) => {
                        const entry = entries[0]
                        if (entry && entry.isIntersecting && !played) {
                            played = true
                            anim.goToAndPlay(0, true)
                            if (observer) observer.disconnect()
                        }
                    },
                    {
                        threshold: 0,
                        rootMargin: `0px 0px -${bottomInset}% 0px`,
                    }
                )
                observer.observe(sentinel)
            } else {
                anim.play()
            }
        }

        return () => {
            if (observer) observer.disconnect()
            anim.destroy()
            animRef.current = null
        }
    }, [data, preserveAspectRatio, trigger, timingMode, speed, duration, triggerLine])

    return (
        <div
            ref={wrapperRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <div
                ref={sentinelRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 1,
                    pointerEvents: "none",
                }}
            />
            <div
                ref={containerRef}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    )
}

LottieScroll.defaultProps = {
    fit: "cover",
    trigger: "onView",
    timingMode: "speed",
    speed: 1,
    duration: 5,
    triggerLine: 0.85,
    url: "",
}

addPropertyControls(LottieScroll, {
    file: {
        type: ControlType.File,
        title: "JSON file",
        allowedFileTypes: ["json"],
    },
    url: {
        type: ControlType.String,
        title: "JSON URL",
        placeholder: "https://… (used if no file)",
    },
    fit: {
        type: ControlType.Enum,
        title: "Fit",
        options: ["contain", "cover", "fill"],
        optionTitles: ["Contain (may letterbox)", "Cover (crop)", "Fill (stretch)"],
        displaySegmentedControl: true,
    },
    trigger: {
        type: ControlType.Enum,
        title: "Play",
        options: ["onView", "autoplay", "loopAutoplay"],
        optionTitles: ["On scroll into view", "Autoplay once", "Loop"],
    },
    timingMode: {
        type: ControlType.Enum,
        title: "Timing",
        options: ["speed", "duration"],
        optionTitles: ["Speed", "Duration"],
        displaySegmentedControl: true,
    },
    speed: {
        type: ControlType.Number,
        title: "Speed",
        min: 0.1,
        max: 4,
        step: 0.1,
        displayStepper: true,
        hidden: (p) => p.timingMode !== "speed",
    },
    duration: {
        type: ControlType.Number,
        title: "Duration",
        unit: "s",
        min: 0.1,
        max: 600,
        step: 0.5,
        hidden: (p) => p.timingMode !== "duration",
    },
    triggerLine: {
        type: ControlType.Number,
        title: "Trigger at",
        min: 0.1,
        max: 0.95,
        step: 0.05,
        hidden: (p) => p.trigger !== "onView",
        description:
            "Viewport position (0–1) where the top edge starts playback. 0.85 works well for tall and short covers.",
    },
})
