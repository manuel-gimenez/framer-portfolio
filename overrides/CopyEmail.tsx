/**
 * CopyEmail — click-to-copy email override for Framer.
 *
 * Status: 🟢 Live — footer Contact button.
 *
 * Problem it solves: the footer "Contact" button shouldn't force a `mailto:`
 * that opens a mail client the visitor may not have set up. Instead, clicking
 * copies the email straight to the clipboard so they can paste it wherever they
 * want, with an "EMAIL COPIED" toast at the cursor (pinned to the left edge on
 * mobile) for clear feedback.
 *
 * Usage: applied to the footer Contact button.
 *
 * Changelog
 *   v1.0.1 (08-07-2026) — Add 🟢 Live status line.
 *   v1.0.0 (30-06-2026) — Initial version.
 */

import { forwardRef, type ComponentType } from "react"

export function CopyEmail(Component): ComponentType {
    return forwardRef((props, ref) => {
        return (
            <Component
                ref={ref}
                {...props}
                onClick={async (event) => {
                    event.preventDefault()

                    const email = "manuel.gimenez86@gmail.com"

                    try {
                        await navigator.clipboard.writeText(email)
                    } catch (error) {
                        console.error("Clipboard failed:", error)
                    }

                    const isMobile = window.innerWidth < 768

                    const toast = document.createElement("div")
                    toast.textContent = "EMAIL COPIED"

                    Object.assign(toast.style, {
                        position: "fixed",
                        left: isMobile ? "16px" : `${event.clientX}px`,
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
                    })

                    document.body.appendChild(toast)

                    const toastHeight = toast.offsetHeight

                    const top = isMobile
                        ? event.clientY - toastHeight - 12
                        : event.clientY

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

                        setTimeout(() => {
                            toast.remove()
                        }, 180)
                    }, 1200)
                }}
            />
        )
    })
}
