/**
 * TextScrambler — animated character-scramble text component for Framer.
 *
 * Status: 🟢 Live — AI LAB nav label (desktop custom-cursor reveal).
 *
 * Problem it solves: the "AI LAB" project (coming soon) needed a label/nav
 * treatment that felt on-brand for an AI page. Random characters resolve into
 * the target word for a techy "decoding" reveal. On desktop it's paired with
 * the custom "coming soon" cursor on the AI LAB navigation item.
 *
 * Usage: AI LAB nav label and any inline text needing a decode animation;
 * trigger, play mode, duration, charset, color, and font are configurable.
 *
 * Changelog
 *   v1.0.1 (08-07-2026) — Add 🟢 Live status line.
 *   v1.0.0 (30-06-2026) — Initial version.
 *
 * @framerIntrinsicWidth 240
 * @framerIntrinsicHeight 28
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    startTransition,
    type CSSProperties,
} from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { useInView } from "framer-motion"

type TriggerMode = "onAppear" | "onHover" | "onClick" | "manual"
type PlayMode = "once" | "loop"

type FontValue = any

interface TextScramblerProps {
    text: string
    trigger: TriggerMode
    play: boolean
    playMode: PlayMode
    durationMs: number
    fps: number
    staggerMs: number
    charset: string
    preserveSpaces: boolean

    textColor: string

    font: FontValue

    style?: CSSProperties
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n))
}

function pickChar(charset: string) {
    const safe = charset && charset.length > 0 ? charset : "AI<>[]{}01#*"
    const i = Math.floor(Math.random() * safe.length)
    return safe[i]
}

function buildFrame(
    text: string,
    charset: string,
    preserveSpaces: boolean,
    progress: number,
    perCharProgress: number[]
) {
    // progress: 0..1 overall
    // perCharProgress: 0..1 each character
    let out = ""
    for (let i = 0; i < text.length; i++) {
        const target = text[i]
        if (preserveSpaces && target === " ") {
            out += " "
            continue
        }
        const p = clamp(perCharProgress[i] ?? progress, 0, 1)
        if (p >= 1) {
            out += target
        } else {
            // More stable near the end: occasionally show the correct char.
            const chance = p * p
            out += Math.random() < chance ? target : pickChar(charset)
        }
    }
    return out
}

export default function TextScrambler(props: TextScramblerProps) {
    const {
        text = "COMING SOON",
        trigger = "onAppear",
        play = true,
        playMode = "once",
        durationMs = 2000,
        fps = 24,
        staggerMs = 20,
        charset = "AI<>[]{}01#*",
        preserveSpaces = true,
        textColor = "#000000",
        font,
        style,
    } = props

    const isStatic = useIsStaticRenderer()

    const hostRef = useRef<HTMLSpanElement>(null)
    const inView = useInView(hostRef, { amount: 0.4, once: false })

    const [isHovering, setIsHovering] = useState(false)
    const [manualNonce, setManualNonce] = useState(0)
    const [frameText, setFrameText] = useState(text)

    const isFixedWidth = !!style && style.width === "100%"
    const isFixedHeight = !!style && style.height === "100%"

    const perCharStartMs = useMemo(() => {
        const starts: number[] = []
        for (let i = 0; i < text.length; i++)
            starts.push(i * Math.max(0, staggerMs))
        return starts
    }, [text, staggerMs])

    const totalMs = useMemo(() => {
        const lastStart = perCharStartMs[perCharStartMs.length - 1] ?? 0
        return Math.max(0, durationMs) + lastStart
    }, [durationMs, perCharStartMs])

    const shouldRun = useMemo(() => {
        if (isStatic) return false
        if (!inView) return false

        switch (trigger) {
            case "manual":
                return !!play
            case "onHover":
                return isHovering
            case "onClick":
                // run on nonce changes
                return manualNonce > 0
            case "onAppear":
            default:
                return true
        }
    }, [trigger, play, isHovering, manualNonce, isStatic, inView])

    const seedRef = useRef(0)
    const rafId = useRef<number | null>(null)
    const startTimeRef = useRef<number | null>(null)

    const stop = useCallback(() => {
        if (rafId.current != null && typeof window !== "undefined") {
            window.cancelAnimationFrame(rafId.current)
            rafId.current = null
        }
        startTimeRef.current = null
    }, [])

    const run = useCallback(() => {
        if (typeof window === "undefined") return

        stop()
        seedRef.current += 1
        const seed = seedRef.current
        const frameInterval = 1000 / clamp(fps, 1, 60)

        startTimeRef.current = window.performance?.now?.() ?? Date.now()
        let lastFrameAt = startTimeRef.current

        const tick = (now: number) => {
            if (seedRef.current !== seed) return

            const t0 = startTimeRef.current ?? now
            const elapsed = now - t0
            const shouldDraw = now - lastFrameAt >= frameInterval - 1

            if (shouldDraw) {
                lastFrameAt = now
                const perCharProgress = perCharStartMs.map((s) =>
                    clamp((elapsed - s) / Math.max(1, durationMs), 0, 1)
                )
                const overall = clamp(elapsed / Math.max(1, totalMs), 0, 1)
                const next = buildFrame(
                    text,
                    charset,
                    preserveSpaces,
                    overall,
                    perCharProgress
                )

                startTransition(() => setFrameText(next))
            }

            const done = elapsed >= totalMs
            if (done) {
                startTransition(() => setFrameText(text))
                if (playMode === "loop") {
                    startTimeRef.current = now
                    lastFrameAt = now
                    rafId.current = window.requestAnimationFrame(tick)
                    return
                }
                rafId.current = null
                return
            }

            rafId.current = window.requestAnimationFrame(tick)
        }

        rafId.current = window.requestAnimationFrame(tick)
    }, [
        charset,
        durationMs,
        fps,
        playMode,
        preserveSpaces,
        stop,
        text,
        totalMs,
        perCharStartMs,
    ])

    // Keep displayed text in sync when the target changes.
    useEffect(() => {
        startTransition(() => setFrameText(text))
    }, [text])

    // Run on trigger.
    useEffect(() => {
        if (!shouldRun) {
            // If we stop mid-way, keep whatever is currently displayed.
            stop()
            return
        }
        run()
        return () => stop()
    }, [shouldRun, run, stop])

    const onClick = useCallback(() => {
        if (trigger !== "onClick") return
        startTransition(() => setManualNonce((n) => n + 1))
    }, [trigger])

    if (isStatic) {
        return (
            <span
                ref={hostRef}
                style={{
                    ...style,
                    position: "relative",
                    display: "inline-block",
                    color: textColor,
                    whiteSpace: "pre",
                    ...(isFixedWidth
                        ? { width: "100%" }
                        : { width: "max-content" }),
                    ...(isFixedHeight ? { height: "100%" } : undefined),
                    ...font,
                }}
            >
                {text}
            </span>
        )
    }

    return (
        <span
            ref={hostRef}
            role={trigger === "onClick" ? "button" : undefined}
            tabIndex={trigger === "onClick" ? 0 : undefined}
            aria-label={
                trigger === "onClick" ? `Scramble text: ${text}` : undefined
            }
            onKeyDown={
                trigger === "onClick"
                    ? (e) => {
                          if (e.key === "Enter" || e.key === " ") onClick()
                      }
                    : undefined
            }
            onClick={trigger === "onClick" ? onClick : undefined}
            onMouseEnter={
                trigger === "onHover"
                    ? () => {
                          startTransition(() => setIsHovering(true))
                      }
                    : undefined
            }
            onMouseLeave={
                trigger === "onHover"
                    ? () => {
                          startTransition(() => setIsHovering(false))
                      }
                    : undefined
            }
            style={{
                ...style,
                position: "relative",
                display: "inline-block",
                color: textColor,
                whiteSpace: "pre",
                cursor: trigger === "onClick" ? "pointer" : undefined,
                userSelect: "none",
                ...(isFixedWidth
                    ? { width: "100%" }
                    : { width: "max-content" }),
                ...(isFixedHeight ? { height: "100%" } : undefined),
                ...font,
            }}
        >
            {frameText}
        </span>
    )
}

addPropertyControls(TextScrambler, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "FRAMER",
    },
    trigger: {
        type: ControlType.Enum,
        title: "Trigger",
        options: ["onAppear", "onHover", "onClick", "manual"],
        optionTitles: ["On Appear", "On Hover", "On Click", "Manual"],
        defaultValue: "onAppear",
    },
    play: {
        type: ControlType.Boolean,
        title: "Play",
        defaultValue: true,
        enabledTitle: "On",
        disabledTitle: "Off",
        hidden: ({ trigger }) => trigger !== "manual",
    },
    playMode: {
        type: ControlType.Enum,
        title: "Mode",
        options: ["once", "loop"],
        optionTitles: ["Once", "Loop"],
        defaultValue: "once",
    },
    durationMs: {
        type: ControlType.Number,
        title: "Duration",
        defaultValue: 1200,
        min: 100,
        max: 6000,
        step: 50,
        unit: "ms",
    },
    staggerMs: {
        type: ControlType.Number,
        title: "Stagger",
        defaultValue: 18,
        min: 0,
        max: 200,
        step: 1,
        unit: "ms",
    },
    fps: {
        type: ControlType.Number,
        title: "FPS",
        defaultValue: 30,
        min: 5,
        max: 60,
        step: 1,
    },
    charset: {
        type: ControlType.String,
        title: "Charset",
        defaultValue: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    },
    preserveSpaces: {
        type: ControlType.Boolean,
        title: "Spaces",
        defaultValue: true,
        enabledTitle: "Keep",
        disabledTitle: "Scramble",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text",
        defaultValue: "#000000",
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: "22px",
            variant: "Semibold",
            letterSpacing: "-0.01em",
            lineHeight: "1.2em",
        },
    },
})
