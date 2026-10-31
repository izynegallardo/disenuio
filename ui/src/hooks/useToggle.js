import React from 'react'

/**
 * Boolean state with a `toggle` function.
 *
 * `onToggle(nextValue)` runs from the toggle call itself (an event handler), not from an
 * effect. That way it never fires on mount, not even in StrictMode, and it always gets the
 * new value.
 *
 * @returns {[boolean, () => void]}
 */
export default function useToggle({ initialValue = false, onToggle } = {}) {
    const [on, setOn] = React.useState(initialValue)
    const onToggleRef = React.useRef(onToggle)

    // Always call the latest callback without re-creating `toggle` when it changes.
    React.useEffect(() => {
        onToggleRef.current = onToggle
    }, [onToggle])

    const toggle = React.useCallback(() => {
        const next = !on

        setOn(next)
        onToggleRef.current?.(next)
    }, [on])

    return [on, toggle]
}
