/**
 * Type stubs for modules Framer provides at runtime but aren't installed locally.
 * Editor-only — does not affect how code runs in Framer.
 */

declare module "framer" {
    export const ControlType: {
        String: string
        Boolean: string
        Number: string
        Enum: string
        Color: string
        Font: string
        File: string
        [key: string]: string
    }

    export function addPropertyControls(
        component: unknown,
        controls: Record<string, unknown>
    ): void

    export function useIsStaticRenderer(): boolean
}

declare module "framer-motion" {
    export function useInView(
        ref: React.RefObject<Element | null>,
        options?: Record<string, unknown>
    ): boolean
}

declare module "lottie-web" {
    const lottie: {
        loadAnimation(options: Record<string, unknown>): {
            destroy(): void
            play(): void
            pause(): void
            goToAndStop(frame: number, isFrame?: boolean): void
            setSpeed(speed: number): void
        }
    }
    export default lottie
}

declare module "https://framer.com/m/framer/store.js@^1.0.0" {
    export function createStore<T extends Record<string, unknown>>(
        initial: T
    ): () => [T, (update: Partial<T>) => void]
}
