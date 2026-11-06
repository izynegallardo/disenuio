import React from 'react'

/**
 * Like useEffect, but skips the first run (mount). Safe in StrictMode: the mount flag is
 * reset when React simulates an unmount, so the double effect run in development does not
 * count as an update.
 *
 * The effect's return value is only used as a cleanup when it is a function. Anything else
 * (a number from an arrow function like `() => count++`) is ignored instead of being
 * handed to React, which would warn.
 *
 * `deps` is forwarded as is, so linters cannot check it here: the caller's own dependency
 * array is where it must be complete. Both linters are told about that on the line below.
 */
export default function useEffectOnUpdate(effectFunction, deps) {
    const isFirstRender = React.useRef(true)

    React.useEffect(() => {
        return () => {
            isFirstRender.current = true
        }
    }, [])

    React.useEffect(
        () => {
            if (isFirstRender.current) {
                isFirstRender.current = false
                return
            }

            const cleanup = effectFunction()

            return typeof cleanup === 'function' ? cleanup : undefined
        },
        // biome-ignore lint/correctness/useExhaustiveDependencies: deps are the caller's, forwarded on purpose
        deps, // oxlint-disable-line react-hooks/exhaustive-deps
    )
}
