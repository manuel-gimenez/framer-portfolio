import { forwardRef, type ComponentType, useState } from "react"

/**
 * MobileComingSoon — mobile "coming soon" reveal override for Framer.
 *
 * Problem it solves: the "AI LAB" navigation item is a project that isn't live
 * yet. On desktop, a custom cursor (with the scramble effect) reveals "COMING
 * SOON" on hover — but mobile has no cursor, so that signal is lost. This
 * override fills the gap: tapping the nav item on mobile (< 768px) scrambles its
 * label from "AI LAB" to "COMING SOON" and back, letting mobile users know the
 * project is on the way. No-op on larger screens, where the cursor handles it.
 *
 * Usage: applied to the "AI LAB" navigation item; the mobile counterpart to the
 * desktop custom cursor + TextScrambler. Label is driven by the `label` prop.
 *
 * Changelog
 *   v1.0.0 (30-06-2026) — Initial version.
 */
const finalText = "COMING SOON"
const originalText = "AI LAB"
const chars = "AI<>[]{}01#*"

function randomText(length: number) {
    return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
    ).join("")
}

export function MobileComingSoon(Component): ComponentType {
    return forwardRef((props: any, ref) => {
        const [label, setLabel] = useState(originalText)

        async function handleClick(event: any) {
            const isMobile = window.innerWidth < 768

            if (!isMobile) return

            event.preventDefault()

            let frame = 0
            const totalFrames = 14

            const interval = window.setInterval(() => {
                frame++

                if (frame < totalFrames) {
                    setLabel(randomText(finalText.length))
                } else {
                    clearInterval(interval)
                    setLabel(finalText)

                    setTimeout(() => {
                        let backFrame = 0

                        const backInterval = window.setInterval(() => {
                            backFrame++

                            if (backFrame < totalFrames) {
                                setLabel(randomText(originalText.length))
                            } else {
                                clearInterval(backInterval)
                                setLabel(originalText)
                            }
                        }, 35)
                    }, 800)
                }
            }, 35)
        }

        return (
            <Component
                ref={ref}
                {...props}
                label={label}
                Label={label}
                onClick={handleClick}
            />
        )
    })
}
