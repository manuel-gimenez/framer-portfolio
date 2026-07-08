/**
 * ChipText — paragraph text with inline code chips for highlighted words.
 *
 * Status: 🟢 Live — System page token documentation paragraphs.
 *
 * Problem it solves: the design-system / System page needs body copy where
 * token names (bg, fg, border, etc.) read as inline code chips without
 * hand-building a stack of text + chip layers for every sentence.
 *
 * Usage: System page token documentation paragraphs.
 *
 * Changelog
 *   v1.1.1 (08-07-2026) — Add 🟢 Live status line.
 *   v1.1.0 (03-07-2026) — Add inline chip markers (e.g. `text`) for
 *     per-occurrence control, so a word can be a chip in one place and plain
 *     text in another. Word-list auto-matching still applies to unmarked text.
 *   v1.0.1 (03-07-2026) — Fix Chip Pad / Chip Radius: Framer's Padding &
 *     BorderRadius controls pass a string, not an object, so the values were
 *     ignored. Helpers now accept both string and object.
 *   v1.0.0 (03-07-2026) — Initial version.
 *
 * @framerIntrinsicWidth 600
 * @framerIntrinsicHeight 80
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */

import React, { useMemo, type CSSProperties } from "react"
import { addPropertyControls, ControlType } from "framer"

type FontValue = Record<string, unknown>

// Framer's Padding / BorderRadius controls pass a string (e.g. "8px 8px 8px
// 8px" or "70px"), but older/fused states can pass an object — handle both.
type PaddingValue =
    | string
    | {
          paddingTop?: number
          paddingRight?: number
          paddingBottom?: number
          paddingLeft?: number
      }

type BorderValue = {
    borderWidth: number
    borderStyle: string
    borderColor: string
}

type BorderRadiusValue =
    | string
    | {
          borderTopLeftRadius?: number
          borderTopRightRadius?: number
          borderBottomRightRadius?: number
          borderBottomLeftRadius?: number
      }

type TextSegment = { type: "text" | "chip"; value: string }

interface ChipTextProps {
    text: string
    chipMarker: string
    chipWords: string
    caseSensitive: boolean
    textColor: string
    font: FontValue
    chipFill: string
    chipTextColor: string
    chipFont: FontValue
    chipPadding: PaddingValue
    chipBorder: BorderValue
    chipRadius: BorderRadiusValue
    style?: CSSProperties
}

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function parseChipWords(raw: string): string[] {
    return raw
        .split(",")
        .map((word) => word.trim())
        .filter(Boolean)
}

// Auto-chip every whole-word occurrence from the word list (used on the parts
// of the text that aren't explicitly marked).
function chipByWordList(
    text: string,
    chipWords: string[],
    caseSensitive: boolean
): TextSegment[] {
    if (!text) return []
    if (chipWords.length === 0) return [{ type: "text", value: text }]

    const flags = caseSensitive ? "g" : "gi"
    const pattern = new RegExp(
        `\\b(${chipWords.map(escapeRegExp).join("|")})\\b`,
        flags
    )

    const segments: TextSegment[] = []
    let lastIndex = 0

    for (const match of text.matchAll(pattern)) {
        const index = match.index ?? 0

        if (index > lastIndex) {
            segments.push({
                type: "text",
                value: text.slice(lastIndex, index),
            })
        }

        segments.push({ type: "chip", value: match[1] })
        lastIndex = index + match[0].length
    }

    if (lastIndex < text.length) {
        segments.push({ type: "text", value: text.slice(lastIndex) })
    }

    return segments
}

function parseTextSegments(
    text: string,
    marker: string,
    chipWords: string[],
    caseSensitive: boolean
): TextSegment[] {
    if (!text) return [{ type: "text", value: "" }]

    // No marker configured → fall back to pure word-list matching.
    if (!marker) {
        const segments = chipByWordList(text, chipWords, caseSensitive)
        return segments.length > 0 ? segments : [{ type: "text", value: text }]
    }

    // Marked segments (e.g. `text`) become chips regardless of the word list,
    // giving per-occurrence control. Unmarked runs still honor the word list.
    const m = escapeRegExp(marker)
    const markerPattern = new RegExp(`${m}([^${m}]+)${m}`, "g")

    const segments: TextSegment[] = []
    let lastIndex = 0

    for (const match of text.matchAll(markerPattern)) {
        const index = match.index ?? 0

        if (index > lastIndex) {
            segments.push(
                ...chipByWordList(
                    text.slice(lastIndex, index),
                    chipWords,
                    caseSensitive
                )
            )
        }

        segments.push({ type: "chip", value: match[1] })
        lastIndex = index + match[0].length
    }

    if (lastIndex < text.length) {
        segments.push(
            ...chipByWordList(text.slice(lastIndex), chipWords, caseSensitive)
        )
    }

    return segments.length > 0 ? segments : [{ type: "text", value: text }]
}

function paddingToCss(padding: PaddingValue): string | undefined {
    if (padding == null) return undefined
    if (typeof padding === "string") return padding

    const {
        paddingTop = 0,
        paddingRight = 0,
        paddingBottom = 0,
        paddingLeft = 0,
    } = padding

    return `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`
}

function radiusToCss(radius: BorderRadiusValue): string | undefined {
    if (radius == null) return undefined
    if (typeof radius === "string") return radius

    const {
        borderTopLeftRadius = 0,
        borderTopRightRadius = 0,
        borderBottomRightRadius = 0,
        borderBottomLeftRadius = 0,
    } = radius

    if (
        borderTopLeftRadius === borderTopRightRadius &&
        borderTopRightRadius === borderBottomRightRadius &&
        borderBottomRightRadius === borderBottomLeftRadius
    ) {
        return `${borderTopLeftRadius}px`
    }

    return `${borderTopLeftRadius}px ${borderTopRightRadius}px ${borderBottomRightRadius}px ${borderBottomLeftRadius}px`
}

export default function ChipText(props: ChipTextProps) {
    const {
        text = "Tokens are grouped by functional category (`bg`, `fg`, `border`, `interactive`) and organized using an incremental scale. Using `fg` instead of `text` broadens each token's applicability to text, icons and other foreground elements while keeping the naming system concise and consistent.",
        chipMarker = "`",
        chipWords = "",
        caseSensitive = true,
        textColor = "#212121",
        font,
        chipFill = "#FAFAFA",
        chipTextColor = "#212121",
        chipFont,
        chipPadding = "2px 6px 2px 6px",
        chipBorder = {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#E9E9E9",
        },
        chipRadius = "4px",
        style,
    } = props

    const segments = useMemo(
        () =>
            parseTextSegments(
                text,
                chipMarker,
                parseChipWords(chipWords),
                caseSensitive
            ),
        [text, chipMarker, chipWords, caseSensitive]
    )

    const chipStyle: CSSProperties = {
        display: "inline",
        background: chipFill,
        color: chipTextColor,
        padding: paddingToCss(chipPadding),
        borderWidth: chipBorder.borderWidth,
        borderStyle: chipBorder.borderStyle,
        borderColor: chipBorder.borderColor,
        borderRadius: radiusToCss(chipRadius),
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        ...chipFont,
    }

    return (
        <p
            style={{
                margin: 0,
                width: "100%",
                color: textColor,
                whiteSpace: "pre-wrap",
                ...font,
                ...style,
            }}
        >
            {segments.map((segment, index) =>
                segment.type === "chip" ? (
                    <span key={index} style={chipStyle}>
                        {segment.value}
                    </span>
                ) : (
                    <React.Fragment key={index}>
                        {segment.value}
                    </React.Fragment>
                )
            )}
        </p>
    )
}

addPropertyControls(ChipText, {
    text: {
        type: ControlType.String,
        title: "Text",
        displayTextArea: true,
        description:
            "Wrap words in the marker (default `) to make them chips — this lets the same word be a chip in one place and plain text in another.",
        defaultValue:
            "Tokens are grouped by functional category (`bg`, `fg`, `border`, `interactive`) and organized using an incremental scale. Using `fg` instead of `text` broadens each token's applicability to text, icons and other foreground elements while keeping the naming system concise and consistent.",
    },
    chipMarker: {
        type: ControlType.String,
        title: "Marker",
        description:
            "Character that wraps a word to force a chip. Leave empty to only use Chip Words.",
        defaultValue: "`",
    },
    chipWords: {
        type: ControlType.String,
        title: "Chip Words",
        displayTextArea: true,
        description:
            "Optional. Comma-separated words auto-chipped everywhere they appear (in unmarked text).",
        defaultValue: "",
    },
    caseSensitive: {
        type: ControlType.Boolean,
        title: "Case",
        defaultValue: true,
        enabledTitle: "Match",
        disabledTitle: "Ignore",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text",
        defaultValue: "#212121",
    },
    font: {
        type: ControlType.Font,
        title: "Font",
        controls: "extended",
        defaultFontType: "sans-serif",
        defaultValue: {
            fontSize: "16px",
            variant: "Regular",
            letterSpacing: "0em",
            lineHeight: "1.5em",
        },
    },
    chipFill: {
        type: ControlType.Color,
        title: "Chip Fill",
        defaultValue: "#FAFAFA",
    },
    chipTextColor: {
        type: ControlType.Color,
        title: "Chip Text",
        defaultValue: "#212121",
    },
    chipFont: {
        type: ControlType.Font,
        title: "Chip Font",
        controls: "extended",
        defaultFontType: "monospace",
        defaultValue: {
            fontSize: "14px",
            variant: "Regular",
            letterSpacing: "0em",
            lineHeight: "1.4em",
        },
    },
    chipPadding: {
        type: ControlType.Padding,
        title: "Chip Pad",
        defaultValue: "2px 6px 2px 6px",
    },
    chipBorder: {
        type: ControlType.Border,
        title: "Chip Border",
        defaultValue: {
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#E9E9E9",
        },
    },
    chipRadius: {
        type: ControlType.BorderRadius,
        title: "Chip Radius",
        defaultValue: "4px",
    },
})
