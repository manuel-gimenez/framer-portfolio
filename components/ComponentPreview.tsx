/**
 * ComponentPreview — live demo box with restart for the System page.
 *
 * Status: 🟢 Live — System page scramble demos (TextScrambler, MobileComingSoon).
 *
 * Problem it solves: the System page needs a consistent frame to show scramble-
 * text demos in motion (TextScrambler + MobileComingSoon). LottieScroll and
 * CopyEmail are documented beside CodeConsole only — no live preview here.
 *
 * Usage: drop two instances on the System page beside CodeConsole — one per
 * demo. Pick Demo, edit Props (JSON), tap Restart to replay.
 * Cursor hover on restart is deferred (see docs/debt.md); leave Cursor Hover Off.
 *
 * Changelog
 *   v1.4.4 (08-07-2026) — Status 🟢 Live; cursor hover default Off (debt paused).
 *   v1.4.3 (07-07-2026) — Framer store bridge for cursor hover (replaces events).
 *   v1.4.2 (07-07-2026) — Window bridge for cursor hover; default variant Hover-01.
 *   v1.4.1 (07-07-2026) — Restart icon dispatches cursor-custom hover events;
 *     pairs with overrides/CursorHoverSync.tsx on cursor-custom.
 *   v1.4.0 (07-07-2026) — Scope to Text Scrambler + Mobile Coming Soon only;
 *     remove Lottie Scroll and Copy Email previews.
 *   v1.3.0 (06-07-2026) — Autoplay previews; restart icon; Lottie file upload.
 *   v1.0.0 (06-07-2026) — Initial version.
 *
 * @framerIntrinsicWidth 600
 * @framerIntrinsicHeight 160
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
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
import { addPropertyControls, ControlType } from "framer"

const BUILD_ID = "v1.4.4"

/** Must match overrides/CursorHoverSync.tsx */
const CURSOR_SETTER_KEY = "__portfolioCursorHoverSetter"

type CursorHoverPatch = { active: boolean; variant: string }

function dispatchCursorHover(active: boolean, variant: string) {
    if (typeof window === "undefined") return
    const w = window as Window & {
        [CURSOR_SETTER_KEY]?: (update: CursorHoverPatch) => void
    }
    w[CURSOR_SETTER_KEY]?.({ active, variant })
}

type HorizontalAlign = "left" | "center" | "right"
type VerticalAlign = "top" | "center" | "bottom"

type DemoId = "textScrambler" | "mobileComingSoon"

type ImageValue = { src?: string; srcSet?: string; alt?: string } | string

interface ComponentPreviewProps {
    demo: DemoId
    props: string
    minHeight: number
    padding: string
    horizontalAlign: HorizontalAlign
    verticalAlign: VerticalAlign
    background: string
    border: string
    borderRadius: number
    iconColor: string
    iconHover: string
    customRestartIcon: ImageValue
    showRestart: boolean
    cursorHover: boolean
    cursorHoverVariant: string
    style?: CSSProperties
}

const DEMO_DEFAULTS: Record<DemoId, Record<string, unknown>> = {
    textScrambler: {
        text: "AI LAB",
        durationMs: 2000,
        fps: 24,
        staggerMs: 20,
        charset: "AI<>[]{}01#*",
        preserveSpaces: true,
        textColor: "#212121",
    },
    mobileComingSoon: {
        label: "AI LAB",
        autoplayDelayMs: 400,
    },
}

const PROPS_HINTS: Record<DemoId, string> = {
    textScrambler: '{"text":"AI LAB","durationMs":2000,"textColor":"#212121"}',
    mobileComingSoon: '{"label":"AI LAB","autoplayDelayMs":400}',
}

const ALIGN_ITEMS: Record<VerticalAlign, CSSProperties["alignItems"]> = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
}

const JUSTIFY_CONTENT: Record<
    HorizontalAlign,
    CSSProperties["justifyContent"]
> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n))
}

function imageSrc(value: ImageValue | undefined): string | null {
    if (!value) return null
    if (typeof value === "string") return value || null
    return value.src || null
}

function parseProps(
    demo: DemoId,
    raw: string
): { values: Record<string, unknown>; error: string | null } {
    const defaults = DEMO_DEFAULTS[demo]
    const trimmed = raw.trim()
    if (!trimmed) return { values: { ...defaults }, error: null }

    try {
        const parsed = JSON.parse(trimmed) as Record<string, unknown>
        return { values: { ...defaults, ...parsed }, error: null }
    } catch {
        return {
            values: { ...defaults },
            error: "Invalid Props JSON — check commas, quotes, and braces.",
        }
    }
}

function DefaultRestartIcon({ color }: { color: string }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M13.25 2.75V6.25H9.75"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M2.75 8A5.25 5.25 0 0 1 12.5 4.1"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
}

function RestartButton({
    onClick,
    iconColor,
    iconHover,
    customRestartIcon,
    cursorHover,
    cursorHoverVariant,
}: {
    onClick: () => void
    iconColor: string
    iconHover: string
    customRestartIcon: ImageValue
    cursorHover: boolean
    cursorHoverVariant: string
}) {
    const customSrc = imageSrc(customRestartIcon)

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Restart preview"
            title="Restart preview"
            style={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 2,
                border: "none",
                background: "transparent",
                color: iconColor,
                borderRadius: 6,
                padding: 6,
                cursor: cursorHover ? "none" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 0,
                width: 28,
                height: 28,
            }}
            onMouseEnter={(event) => {
                event.currentTarget.style.background = iconHover
                if (cursorHover) {
                    dispatchCursorHover(true, cursorHoverVariant)
                }
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.background = "transparent"
                if (cursorHover) {
                    dispatchCursorHover(false, cursorHoverVariant)
                }
            }}
        >
            {customSrc ? (
                <img
                    src={customSrc}
                    alt=""
                    width={16}
                    height={16}
                    style={{ display: "block", objectFit: "contain" }}
                />
            ) : (
                <DefaultRestartIcon color={iconColor} />
            )}
        </button>
    )
}

// ——— Text Scrambler ———

function pickChar(charset: string) {
    const safe = charset.length > 0 ? charset : "AI<>[]{}01#*"
    return safe[Math.floor(Math.random() * safe.length)]
}

function buildScrambleFrame(
    text: string,
    charset: string,
    preserveSpaces: boolean,
    perCharProgress: number[]
) {
    let out = ""
    for (let i = 0; i < text.length; i++) {
        const target = text[i]
        if (preserveSpaces && target === " ") {
            out += " "
            continue
        }
        const p = clamp(perCharProgress[i] ?? 0, 0, 1)
        if (p >= 1) {
            out += target
        } else {
            const chance = p * p
            out += Math.random() < chance ? target : pickChar(charset)
        }
    }
    return out
}

function TextScramblerPreview({
    text,
    durationMs,
    fps,
    staggerMs,
    charset,
    preserveSpaces,
    textColor,
}: {
    text: string
    durationMs: number
    fps: number
    staggerMs: number
    charset: string
    preserveSpaces: boolean
    textColor: string
}) {
    const [frameText, setFrameText] = useState(text)
    const rafId = useRef<number | null>(null)

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

    useEffect(() => {
        setFrameText(text)
        if (typeof window === "undefined") return

        const stop = () => {
            if (rafId.current != null) {
                window.cancelAnimationFrame(rafId.current)
                rafId.current = null
            }
        }

        stop()
        const frameInterval = 1000 / clamp(fps, 1, 60)
        const startTime = window.performance?.now?.() ?? Date.now()
        let lastFrameAt = startTime

        const tick = (now: number) => {
            const elapsed = now - startTime
            if (now - lastFrameAt >= frameInterval - 1) {
                lastFrameAt = now
                const perCharProgress = perCharStartMs.map((s) =>
                    clamp((elapsed - s) / Math.max(1, durationMs), 0, 1)
                )
                startTransition(() =>
                    setFrameText(
                        buildScrambleFrame(
                            text,
                            charset,
                            preserveSpaces,
                            perCharProgress
                        )
                    )
                )
            }

            if (elapsed >= totalMs) {
                startTransition(() => setFrameText(text))
                rafId.current = null
                return
            }

            rafId.current = window.requestAnimationFrame(tick)
        }

        rafId.current = window.requestAnimationFrame(tick)
        return stop
    }, [
        text,
        durationMs,
        fps,
        staggerMs,
        charset,
        preserveSpaces,
        perCharStartMs,
        totalMs,
    ])

    return (
        <span
            style={{
                display: "inline-block",
                color: textColor,
                whiteSpace: "pre",
                userSelect: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "-0.01em",
            }}
        >
            {frameText}
        </span>
    )
}

// ——— Mobile Coming Soon ———

const SCRAMBLE_CHARS = "AI<>[]{}01#*"
const COMING_SOON_TEXT = "COMING SOON"

function randomScramble(length: number) {
    return Array.from(
        { length },
        () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    ).join("")
}

function runScrambleSequence(
    initialLabel: string,
    onLabel: (label: string) => void,
    onDone: () => void
) {
    const totalFrames = 14
    let frame = 0
    let backInterval: number | undefined
    let holdTimeout: number | undefined

    const interval = window.setInterval(() => {
        frame++

        if (frame < totalFrames) {
            onLabel(randomScramble(COMING_SOON_TEXT.length))
        } else {
            window.clearInterval(interval)
            onLabel(COMING_SOON_TEXT)

            holdTimeout = window.setTimeout(() => {
                let backFrame = 0

                backInterval = window.setInterval(() => {
                    backFrame++

                    if (backFrame < totalFrames) {
                        onLabel(randomScramble(initialLabel.length))
                    } else {
                        if (backInterval) window.clearInterval(backInterval)
                        onLabel(initialLabel)
                        onDone()
                    }
                }, 35)
            }, 800)
        }
    }, 35)

    return () => {
        window.clearInterval(interval)
        if (backInterval) window.clearInterval(backInterval)
        if (holdTimeout) window.clearTimeout(holdTimeout)
    }
}

function MobileComingSoonPreview({
    label: initialLabel,
    autoplayDelayMs,
}: {
    label: string
    autoplayDelayMs: number
}) {
    const [label, setLabel] = useState(initialLabel)

    useEffect(() => {
        setLabel(initialLabel)

        let cancelled = false
        let cleanupSequence: (() => void) | undefined

        const startTimer = window.setTimeout(() => {
            if (cancelled) return
            cleanupSequence = runScrambleSequence(
                initialLabel,
                (next) => {
                    if (!cancelled) setLabel(next)
                },
                () => {}
            )
        }, autoplayDelayMs)

        return () => {
            cancelled = true
            window.clearTimeout(startTimer)
            if (cleanupSequence) cleanupSequence()
        }
    }, [initialLabel, autoplayDelayMs])

    return (
        <span
            style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "#212121",
                letterSpacing: "-0.01em",
                userSelect: "none",
                pointerEvents: "none",
            }}
        >
            {label}
        </span>
    )
}

function renderDemo(demo: DemoId, values: Record<string, unknown>) {
    switch (demo) {
        case "textScrambler":
            return (
                <TextScramblerPreview
                    text={String(values.text ?? "AI LAB")}
                    durationMs={Number(values.durationMs ?? 2000)}
                    fps={Number(values.fps ?? 24)}
                    staggerMs={Number(values.staggerMs ?? 20)}
                    charset={String(values.charset ?? "AI<>[]{}01#*")}
                    preserveSpaces={values.preserveSpaces !== false}
                    textColor={String(values.textColor ?? "#212121")}
                />
            )

        case "mobileComingSoon":
            return (
                <MobileComingSoonPreview
                    label={String(values.label ?? "AI LAB")}
                    autoplayDelayMs={Number(values.autoplayDelayMs ?? 400)}
                />
            )

        default:
            return null
    }
}

export default function ComponentPreview({
    demo,
    props: propsRaw,
    minHeight,
    padding,
    horizontalAlign,
    verticalAlign,
    background,
    border,
    borderRadius,
    iconColor,
    iconHover,
    customRestartIcon,
    showRestart,
    cursorHover,
    cursorHoverVariant,
    style,
}: ComponentPreviewProps) {
    const [restartKey, setRestartKey] = useState(0)

    const { values, error } = useMemo(
        () => parseProps(demo, propsRaw),
        [demo, propsRaw]
    )

    const handleRestart = useCallback(() => {
        setRestartKey((key) => key + 1)
    }, [])

    return (
        <div
            data-build={BUILD_ID}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
                minWidth: 0,
                minHeight,
                borderRadius,
                border: `1px solid ${border}`,
                background,
                overflow: "hidden",
            }}
        >
            {showRestart && (
                <RestartButton
                    onClick={handleRestart}
                    iconColor={iconColor}
                    iconHover={iconHover}
                    customRestartIcon={customRestartIcon}
                    cursorHover={cursorHover}
                    cursorHoverVariant={cursorHoverVariant}
                />
            )}

            <div
                style={{
                    width: "100%",
                    height: "100%",
                    minHeight,
                    boxSizing: "border-box",
                    padding,
                    display: "flex",
                    alignItems: ALIGN_ITEMS[verticalAlign],
                    justifyContent: JUSTIFY_CONTENT[horizontalAlign],
                }}
            >
                {error ? (
                    <span
                        style={{
                            color: "#B45309",
                            fontFamily: "Inter, sans-serif",
                            fontSize: 13,
                            lineHeight: "20px",
                            textAlign: "center",
                            maxWidth: 360,
                        }}
                    >
                        {error}
                    </span>
                ) : (
                    <div
                        key={`${demo}-${restartKey}`}
                        style={{
                            display: "flex",
                            alignItems: ALIGN_ITEMS[verticalAlign],
                            justifyContent: JUSTIFY_CONTENT[horizontalAlign],
                            width:
                                horizontalAlign === "center" ? "auto" : "100%",
                            maxWidth: "100%",
                        }}
                    >
                        {renderDemo(demo, values)}
                    </div>
                )}
            </div>
        </div>
    )
}

ComponentPreview.defaultProps = {
    demo: "textScrambler",
    props: JSON.stringify(DEMO_DEFAULTS.textScrambler, null, 2),
    minHeight: 160,
    padding: "40px 56px 40px 24px",
    horizontalAlign: "center",
    verticalAlign: "center",
    background: "#FAFAFA",
    border: "#E9E9E9",
    borderRadius: 16,
    iconColor: "#757575",
    iconHover: "#F0F0F0",
    showRestart: true,
    cursorHover: false,
    cursorHoverVariant: "Hover-01",
}

addPropertyControls(ComponentPreview, {
    demo: {
        type: ControlType.Enum,
        title: "Demo",
        options: ["textScrambler", "mobileComingSoon"],
        optionTitles: ["Text Scrambler", "Mobile Coming Soon"],
        defaultValue: "textScrambler",
    },
    props: {
        type: ControlType.String,
        title: "Props",
        displayTextArea: true,
        description:
            "JSON props for the selected demo. Restart replays the animation.",
        defaultValue: JSON.stringify(DEMO_DEFAULTS.textScrambler, null, 2),
        placeholder: PROPS_HINTS.textScrambler,
    },
    minHeight: {
        type: ControlType.Number,
        title: "Min Height",
        min: 80,
        max: 720,
        step: 8,
        displayStepper: true,
        defaultValue: 160,
    },
    padding: {
        type: ControlType.Padding,
        title: "Padding",
        defaultValue: "40px 56px 40px 24px",
    },
    horizontalAlign: {
        type: ControlType.Enum,
        title: "Align H",
        options: ["left", "center", "right"],
        optionTitles: ["Left", "Center", "Right"],
        displaySegmentedControl: true,
        defaultValue: "center",
    },
    verticalAlign: {
        type: ControlType.Enum,
        title: "Align V",
        options: ["top", "center", "bottom"],
        optionTitles: ["Top", "Center", "Bottom"],
        displaySegmentedControl: true,
        defaultValue: "center",
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#FAFAFA",
    },
    border: {
        type: ControlType.Color,
        title: "Border",
        defaultValue: "#E9E9E9",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Radius",
        min: 0,
        max: 48,
        step: 1,
        displayStepper: true,
        defaultValue: 16,
    },
    showRestart: {
        type: ControlType.Boolean,
        title: "Restart",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    cursorHover: {
        type: ControlType.Boolean,
        title: "Cursor Hover",
        defaultValue: false,
        enabledTitle: "Link",
        disabledTitle: "Off",
        description:
            "Experimental — paused. See docs/debt.md. Do not enable until CursorHoverSync is fixed.",
        hidden: ({ showRestart }) => !showRestart,
    },
    cursorHoverVariant: {
        type: ControlType.String,
        title: "Cursor Variant",
        defaultValue: "Hover-01",
        placeholder: "Hover-01",
        description:
            "Set here in Properties — not in code. Exact variant name from cursor-custom.",
        hidden: ({ showRestart, cursorHover }) =>
            !showRestart || !cursorHover,
    },
    customRestartIcon: {
        type: ControlType.Image,
        title: "Restart Icon",
        description: "Optional. Upload your own 16×16 icon to replace the default.",
        hidden: ({ showRestart }) => !showRestart,
    },
    iconColor: {
        type: ControlType.Color,
        title: "Icon",
        defaultValue: "#757575",
        hidden: ({ showRestart, customRestartIcon }) =>
            !showRestart || !!imageSrc(customRestartIcon),
    },
    iconHover: {
        type: ControlType.Color,
        title: "Icon Hover",
        defaultValue: "#F0F0F0",
        hidden: ({ showRestart }) => !showRestart,
    },
})