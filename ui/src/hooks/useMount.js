import React from 'react'

// Safety net for the exit step. If `animationend` never fires (animations disabled by the
// browser or a user stylesheet, CSS not loaded), the component would stay mounted forever
// and `functionOnClose` would never be called.
const EXIT_FALLBACK_MS = 1000

export default function useMount({
    mountOnRender = false,
    open = true,
    duration,
    pauseOnHover = false,
    functionOnClose,
}) {
    const [isMounted, setIsMounted] = React.useState(mountOnRender)
    const [isActive, setIsActive] = React.useState(mountOnRender)
    const [isHovered, setIsHovered] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const remainingTimeRef = React.useRef(duration)
    const startTimeRef = React.useRef(null)
    const onCloseRef = React.useRef(functionOnClose)

    // Hover and keyboard focus both pause the countdown, so keyboard users get the same
    // extra time as mouse users (WCAG 2.2.1 Timing Adjustable).
    const isPaused = pauseOnHover && (isHovered || isFocused)

    // Always call the latest onClose, without restarting any timer when its identity changes.
    React.useEffect(() => {
        onCloseRef.current = functionOnClose
    }, [functionOnClose])

    // A new duration restarts the countdown from the full time.
    React.useEffect(() => {
        remainingTimeRef.current = duration
    }, [duration])

    // Lets a parent close the component from code, still with its exit animation.
    // It is one way: once closed and unmounted, setting `open` back to true does nothing.
    React.useEffect(() => {
        if (!open) setIsActive(false)
    }, [open])

    React.useEffect(() => {
        if (isMounted && isActive && duration && !isPaused) {
            startTimeRef.current = Date.now()

            const timer = setTimeout(() => {
                setIsActive(false)
            }, remainingTimeRef.current)

            return () => {
                clearTimeout(timer)

                if (startTimeRef.current !== null) {
                    const elapsed = Date.now() - startTimeRef.current
                    remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed)
                }
            }
        }
    }, [isMounted, isActive, duration, isPaused])

    const finishClose = React.useCallback(() => {
        setIsMounted(false)
        onCloseRef.current?.()
    }, [])

    React.useEffect(() => {
        if (isMounted && !isActive) {
            const timer = setTimeout(finishClose, EXIT_FALLBACK_MS)

            return () => clearTimeout(timer)
        }
    }, [isMounted, isActive, finishClose])

    function handleClose() {
        setIsActive(false)
    }

    function handleAnimationEnd(event) {
        if (!isActive && event.target === event.currentTarget) {
            finishClose()
        }
    }

    const pauseHandlers = pauseOnHover
        ? {
              onMouseEnter: () => setIsHovered(true),
              onMouseLeave: () => setIsHovered(false),
              onFocus: () => setIsFocused(true),
              onBlur: (event) => {
                  // Focus moving between children of the same element is not a blur.
                  if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false)
              },
          }
        : {}

    return {
        isMounted,
        isActive,
        isPaused,
        handleClose,
        handleAnimationEnd,
        pauseHandlers,
    }
}
