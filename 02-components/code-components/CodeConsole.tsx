import React, { useCallback, useMemo, type CSSProperties } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * CodeConsole — syntax-highlighted code block with copy for the System page.
 *
 * Status: 🟢 Live — System page source blocks beside live demos.
 *
 * Problem it solves: the System design-system page needs to show real source
 * next to live component/override demos. Framer has no native code block with
 * copy + syntax highlight, so this component fills that gap.
 *
 * Usage: dropped on the System page beside each live demo; paste the source
 * into the `code` property control.
 *
 * Changelog
 *   v1.1.2 (08-07-2026) — Add 🟢 Live status line.
 *   v1.1.1 (04-07-2026) — Copy toast reads "CODE COPIED".
 *   v1.0.0 (30-06-2026) — Initial version.
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

type Language = "tsx" | "ts" | "css"
type Theme = "light" | "dark"

interface CodeConsoleProps {
    code: string
    language: Language
    title: string
    showCopy: boolean
    theme: Theme
    style?: CSSProperties
}

type TokenType =
    | "plain"
    | "comment"
    | "string"
    | "keyword"
    | "number"
    | "tag"
    | "attr"
    | "property"
    | "punctuation"

interface Token {
    type: TokenType
    value: string
}

const KEYWORDS = new Set([
    "import",
    "export",
    "from",
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "switch",
    "case",
    "break",
    "continue",
    "default",
    "type",
    "interface",
    "extends",
    "implements",
    "async",
    "await",
    "new",
    "this",
    "true",
    "false",
    "null",
    "undefined",
    "void",
    "typeof",
    "instanceof",
    "as",
    "in",
    "of",
    "try",
    "catch",
    "finally",
    "throw",
])

const CSS_PROPERTIES = new Set([
    "color",
    "background",
    "background-color",
    "border",
    "border-radius",
    "font-family",
    "font-size",
    "font-weight",
    "line-height",
    "letter-spacing",
    "padding",
    "margin",
    "display",
    "position",
    "width",
    "height",
    "opacity",
    "transform",
    "transition",
    "z-index",
    "overflow",
    "flex",
    "gap",
])

const THEMES: Record<
    Theme,
    {
        shell: string
        header: string
        border: string
        title: string
        label: string
        body: string
        lineNumber: string
        copyBg: string
        copyText: string
        copyHover: string
        tokens: Record<TokenType, string>
    }
> = {
    light: {
        shell: "#fafafa",
        header: "#ffffff",
        border: "#e9e9e9",
        title: "#414141",
        label: "#778877",
        body: "#ffffff",
        lineNumber: "#778877",
        copyBg: "transparent",
        copyText: "#757575",
        copyHover: "#f0f0f0",
        tokens: {
            plain: "#212121",
            comment: "#757575",
            string: "#059669",
            keyword: "#b45309",
            number: "#414141",
            tag: "#7c3aed",
            attr: "#757575",
            property: "#3b41da",
            punctuation: "#757575",
        },
    },
    dark: {
        shell: "#141414",
        header: "#1a1a1a",
        border: "#333333",
        title: "#e9e9e9",
        label: "#a0a0a0",
        body: "#0d0d0d",
        lineNumber: "#666666",
        copyBg: "transparent",
        copyText: "#a0a0a0",
        copyHover: "#2a2a2a",
        tokens: {
            plain: "#d4d4d4",
            comment: "#546e7a",
            string: "#f78c6c",
            keyword: "#ffcb6b",
            number: "#c8c8c8",
            tag: "#c792ea",
            attr: "#a0a0a0",
            property: "#82aaff",
            punctuation: "#565656",
        },
    },
}

function isIdentStart(ch: string) {
    return /[A-Za-z_$]/.test(ch)
}

function isIdentPart(ch: string) {
    return /[A-Za-z0-9_$]/.test(ch)
}

function readString(line: string, start: number, quote: string) {
    let i = start + 1
    while (i < line.length) {
        if (line[i] === "\\") {
            i += 2
            continue
        }
        if (line[i] === quote) {
            return line.slice(start, i + 1)
        }
        i += 1
    }
    return line.slice(start)
}

function tokenizeTsLine(line: string, language: Language): Token[] {
    const tokens: Token[] = []
    let i = 0

    if (line.trimStart().startsWith("//")) {
        return [{ type: "comment", value: line }]
    }

    while (i < line.length) {
        const ch = line[i]

        if (ch === "/" && line[i + 1] === "/") {
            tokens.push({ type: "comment", value: line.slice(i) })
            break
        }

        if (ch === "'" || ch === '"' || ch === "`") {
            const value = readString(line, i, ch)
            tokens.push({ type: "string", value })
            i += value.length
            continue
        }

        if (language === "tsx" && ch === "<") {
            const rest = line.slice(i)
            const tagMatch = rest.match(/^<\/?[A-Za-z][\w.-]*/)
            if (tagMatch) {
                tokens.push({ type: "tag", value: tagMatch[0] })
                i += tagMatch[0].length
                continue
            }
        }

        if (isIdentStart(ch)) {
            let j = i + 1
            while (j < line.length && isIdentPart(line[j])) j += 1
            const word = line.slice(i, j)
            const next = line.slice(j).trimStart()
            const type: TokenType = KEYWORDS.has(word)
                ? "keyword"
                : language === "tsx" && next.startsWith("=")
                  ? "attr"
                  : "plain"
            tokens.push({ type, value: word })
            i = j
            continue
        }

        if (/[0-9]/.test(ch)) {
            let j = i + 1
            while (j < line.length && /[0-9.xA-Fa-f]/.test(line[j])) j += 1
            tokens.push({ type: "number", value: line.slice(i, j) })
            i = j
            continue
        }

        tokens.push({ type: "punctuation", value: ch })
        i += 1
    }

    return tokens
}

const CSS_FUNCTIONS = new Set(["var", "calc", "rgb", "rgba", "hsl", "hsla", "oklch"])

function isCssSelectorContext(before: string) {
    const trimmed = before.trimEnd()
    return (
        trimmed === "" ||
        trimmed.endsWith("{") ||
        trimmed.endsWith(",") ||
        trimmed.endsWith("@")
    )
}

function tokenizeCssLine(line: string): Token[] {
    const tokens: Token[] = []
    let i = 0

    if (line.trimStart().startsWith("/*")) {
        return [{ type: "comment", value: line }]
    }

    while (i < line.length) {
        const ch = line[i]

        if (ch === "/" && line[i + 1] === "/") {
            tokens.push({ type: "comment", value: line.slice(i) })
            break
        }

        if (ch === "'" || ch === '"') {
            const value = readString(line, i, ch)
            tokens.push({ type: "string", value })
            i += value.length
            continue
        }

        if (ch === "#") {
            let j = i + 1
            while (j < line.length && /[0-9A-Fa-f]/.test(line[j])) j += 1
            tokens.push({ type: "string", value: line.slice(i, j) })
            i = j
            continue
        }

        if (ch === "@" || (ch === ":" && isCssSelectorContext(line.slice(0, i)))) {
            let j = i + 1
            while (j < line.length && /[a-zA-Z0-9_-]/.test(line[j])) j += 1
            tokens.push({ type: "tag", value: line.slice(i, j) })
            i = j
            continue
        }

        if (isIdentStart(ch) || ch === "-") {
            let j = i + 1
            while (j < line.length && /[A-Za-z0-9_-]/.test(line[j])) j += 1
            const word = line.slice(i, j)
            const rest = line.slice(j).trimStart()
            let type: TokenType = "plain"

            if (CSS_FUNCTIONS.has(word)) {
                type = "keyword"
            } else if (word.startsWith("--")) {
                type = "property"
            } else if (
                rest.startsWith(":") &&
                CSS_PROPERTIES.has(word.replace(/^--/, ""))
            ) {
                type = "property"
            }

            tokens.push({ type, value: word })
            i = j
            continue
        }

        if (/[0-9]/.test(ch)) {
            let j = i + 1
            while (j < line.length && /[0-9.]/.test(line[j])) j += 1
            tokens.push({ type: "number", value: line.slice(i, j) })
            i = j
            continue
        }

        tokens.push({ type: "punctuation", value: ch })
        i += 1
    }

    return tokens
}

function tokenizeLine(line: string, language: Language): Token[] {
    if (language === "css") return tokenizeCssLine(line)
    return tokenizeTsLine(line, language)
}

function showCopyToast(x: number, y: number) {
    const isMobile = window.innerWidth < 768
    const toast = document.createElement("div")
    toast.textContent = "CODE COPIED"

    Object.assign(toast.style, {
        position: "fixed",
        left: isMobile ? "16px" : `${x}px`,
        top: "0px",
        zIndex: "2147483647",
        padding: "8px 14px",
        borderRadius: "999px",
        background: "#3B41DA",
        color: "#FFFFFF",
        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        opacity: "0",
        transform: isMobile
            ? "scale(0.96)"
            : "translate(-50%, -50%) scale(0.96)",
        transformOrigin: isMobile ? "left center" : "center",
        transition: "opacity 180ms ease, transform 180ms ease",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    })

    document.body.appendChild(toast)

    const top = isMobile ? y - toast.offsetHeight - 12 : y
    toast.style.top = `${top}px`

    requestAnimationFrame(() => {
        toast.style.opacity = "1"
        toast.style.transform = isMobile
            ? "scale(1)"
            : "translate(-50%, -50%) scale(1)"
    })

    setTimeout(() => {
        toast.style.opacity = "0"
        toast.style.transform = isMobile
            ? "scale(0.96)"
            : "translate(-50%, -50%) scale(0.96)"
        setTimeout(() => toast.remove(), 180)
    }, 1200)
}

function CopyIcon({ color }: { color: string }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
        >
            <rect
                x="5.25"
                y="5.25"
                width="8.5"
                height="8.5"
                rx="1.5"
                stroke={color}
                strokeWidth="1.25"
            />
            <path
                d="M3.75 10.75V4.25C3.75 3.56 4.31 3 5 3h6.5"
                stroke={color}
                strokeWidth="1.25"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default function CodeConsole({
    code,
    language,
    title,
    showCopy,
    theme,
    style,
}: CodeConsoleProps) {
    const palette = THEMES[theme]
    const lines = useMemo(() => code.replace(/\r\n/g, "\n").split("\n"), [code])

    const handleCopy = useCallback(
        async (event: React.MouseEvent<HTMLButtonElement>) => {
            try {
                await navigator.clipboard.writeText(code)
                showCopyToast(event.clientX, event.clientY)
            } catch (error) {
                console.error("Clipboard failed:", error)
            }
        },
        [code]
    )

    return (
        <div
            style={{
                ...style,
                width: "100%",
                height: "100%",
                minWidth: 0,
                borderRadius: 12,
                border: `1px solid ${palette.border}`,
                background: palette.shell,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "10px 14px",
                    borderBottom: `1px solid ${palette.border}`,
                    background: palette.header,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        minWidth: 0,
                    }}
                >
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <span
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#ff5f57",
                            }}
                        />
                        <span
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#febc2e",
                            }}
                        />
                        <span
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#28c840",
                            }}
                        />
                    </div>
                    <span
                        style={{
                            color: palette.title,
                            fontSize: 12,
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {title}
                    </span>
                    <span
                        style={{
                            color: palette.label,
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            flexShrink: 0,
                        }}
                    >
                        {language}
                    </span>
                </div>

                {showCopy && (
                    <button
                        type="button"
                        onClick={handleCopy}
                        aria-label="Copy code"
                        title="Copy code"
                        style={{
                            border: "none",
                            background: palette.copyBg,
                            color: palette.copyText,
                            borderRadius: 6,
                            padding: "6px",
                            cursor: "pointer",
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: 0,
                        }}
                        onMouseEnter={(event) => {
                            event.currentTarget.style.background =
                                palette.copyHover
                        }}
                        onMouseLeave={(event) => {
                            event.currentTarget.style.background = palette.copyBg
                        }}
                    >
                        <CopyIcon color={palette.copyText} />
                    </button>
                )}
            </div>

            <div
                style={{
                    flex: 1,
                    overflow: "auto",
                    background: palette.body,
                    padding: "14px 0",
                }}
            >
                <pre
                    style={{
                        margin: 0,
                        padding: "0 14px",
                        fontSize: 12,
                        lineHeight: "20px",
                        tabSize: 2,
                    }}
                >
                    {lines.map((line, index) => {
                        const tokens = tokenizeLine(line, language)
                        return (
                            <div
                                key={`${index}-${line}`}
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    minHeight: 20,
                                }}
                            >
                                <span
                                    style={{
                                        width: 28,
                                        flexShrink: 0,
                                        textAlign: "right",
                                        color: palette.lineNumber,
                                        userSelect: "none",
                                    }}
                                >
                                    {index + 1}
                                </span>
                                <code style={{ whiteSpace: "pre-wrap" }}>
                                    {tokens.map((token, tokenIndex) => (
                                        <span
                                            key={`${index}-${tokenIndex}`}
                                            style={{
                                                color: palette.tokens[token.type],
                                                fontStyle:
                                                    token.type === "comment"
                                                        ? "italic"
                                                        : "normal",
                                            }}
                                        >
                                            {token.value}
                                        </span>
                                    ))}
                                </code>
                            </div>
                        )
                    })}
                </pre>
            </div>
        </div>
    )
}

addPropertyControls(CodeConsole, {
    code: {
        type: ControlType.String,
        title: "Code",
        displayTextArea: true,
        defaultValue: `export function CopyEmail(Component) {\n  return forwardRef((props, ref) => (\n  <Component ref={ref} {...props} onClick={...} />\n  ))\n}`,
    },
    language: {
        type: ControlType.Enum,
        title: "Language",
        options: ["tsx", "ts", "css"],
        optionTitles: ["TSX", "TS", "CSS"],
        defaultValue: "tsx",
    },
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: "CopyEmail.tsx",
    },
    showCopy: {
        type: ControlType.Boolean,
        title: "Copy",
        defaultValue: true,
        enabledTitle: "Show",
        disabledTitle: "Hide",
    },
    theme: {
        type: ControlType.Enum,
        title: "Theme",
        options: ["light", "dark"],
        optionTitles: ["Light", "Dark"],
        defaultValue: "light",
        displaySegmentedControl: true,
    },
})
