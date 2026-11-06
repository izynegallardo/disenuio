import React from 'react'
import a11y from '../../styles/a11y.module.css'
import { classNames } from '../../utils/classNames'
import { STATUS_LABELS } from '../../utils/statusLabels'
import { CheckIcon, CrossIcon } from '../Icons/Icons'
import styles from './Button.module.css'

const STATUS_ICONS = {
    loading: <span className={styles.buttonSpinner} />,
    success: <CheckIcon />,
    error: <CrossIcon />,
}

function isThenable(value) {
    return typeof value?.then === 'function'
}

/**
 * A button with loading, success and error states for async actions.
 *
 * @param {Object} props
 * @param {'solid' | 'outline' | 'ghost'} [props.variant='solid']
 * @param {'small' | 'medium' | 'large'} [props.size='medium']
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => unknown} [props.onClick] Return a
 * promise to show loading, success and error states.
 * @param {number} [props.statusDuration=1500] Milliseconds the success or error state stays.
 * @param {string} [props.loadingLabel='Loading'] Screen reader text while loading.
 * @param {string} [props.successLabel='Success'] Screen reader text on success.
 * @param {string} [props.errorLabel='Error'] Screen reader text on error.
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the native `<button>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Button variant='outline' size='large' onClick={saveProfile}>Save</Button>
 * ```
 */
export default function Button({
    variant = 'solid',
    size = 'medium',
    type = 'button',
    onClick,
    statusDuration = 1500,
    loadingLabel = STATUS_LABELS.loading,
    successLabel = STATUS_LABELS.success,
    errorLabel = STATUS_LABELS.error,
    className,
    children,
    ...rest
}) {
    const [status, setStatus] = React.useState('idle') // idle || loading || success || error
    const [hasUsedPromise, setHasUsedPromise] = React.useState(false)
    const resetTimerRef = React.useRef(null)
    const isMountedRef = React.useRef(true)

    React.useEffect(() => {
        isMountedRef.current = true

        return () => {
            isMountedRef.current = false
            clearTimeout(resetTimerRef.current)
        }
    }, [])

    function settle(nextStatus) {
        if (!isMountedRef.current) return

        setStatus(nextStatus)
        resetTimerRef.current = setTimeout(() => setStatus('idle'), statusDuration)
    }

    function handleClick(event) {
        // While a promise is pending or its result is showing, extra clicks do nothing.
        if (status !== 'idle') {
            event.preventDefault()
            return
        }

        const result = onClick?.(event)

        if (!isThenable(result)) return

        setHasUsedPromise(true)
        setStatus('loading')
        result.then(
            () => settle('success'),
            () => settle('error'),
        )
    }

    const isBusy = status !== 'idle'

    const buttonClass = classNames(
        styles.button,
        styles[variant],
        styles[size],
        status === 'loading' && styles.isLoading,
        status === 'success' && styles.buttonSuccess,
        status === 'error' && styles.buttonError,
        className,
    )

    const liveLabels = { loading: loadingLabel, success: successLabel, error: errorLabel }

    return (
        <>
            <button
                type={type}
                className={buttonClass}
                {...rest}
                onClick={handleClick}
                aria-busy={status === 'loading' || undefined}
                data-disenuio=''
            >
                {/* Hidden, not removed, while busy: the button keeps its width and does not jump. */}
                <span className={classNames(styles.content, isBusy && styles.isHidden)}>
                    {children}
                </span>
                {isBusy && (
                    <span className={styles.statusIcon} aria-hidden>
                        {STATUS_ICONS[status]}
                    </span>
                )}
            </button>
            {/* Only rendered once a click returned a promise, so plain buttons stay a single element. */}
            {hasUsedPromise && (
                <span role='status' className={a11y.srOnly}>
                    {liveLabels[status]}
                </span>
            )}
        </>
    )
}
