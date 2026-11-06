import useMount from '../../hooks/useMount'
import a11y from '../../styles/a11y.module.css'
import { clamp } from '../../utils/clamp'
import { classNames } from '../../utils/classNames'
import { STATUS_LABELS } from '../../utils/statusLabels'
import Button from '../Button/Button'
import {
    BellIcon,
    CrossIcon,
    ErrorOutlineIcon,
    InfoOutlineIcon,
    SuccessOutlineIcon,
    WarningOutlineIcon,
} from '../Icons/Icons'
import styles from './Toast.module.css'

const ICON_MAP = {
    success: <SuccessOutlineIcon />,
    warning: <WarningOutlineIcon />,
    error: <ErrorOutlineIcon />,
    info: <InfoOutlineIcon />,
}

/**
 * A short message that closes by itself. Renders nothing after it is closed.
 *
 * @param {Object} props
 * @param {'topCenter' | 'topLeft' | 'topRight' | 'bottomCenter' | 'bottomLeft' | 'bottomRight'} [props.position='topCenter']
 * @param {'default' | 'success' | 'warning' | 'error' | 'info'} [props.type]
 * @param {string} [props.statusLabel] Screen reader text before the title. Defaults to a word for
 * the type. Pass `''` to leave it out.
 * @param {React.ReactNode} [props.title]
 * @param {React.ElementType} [props.titleAs='p'] Element or component used for the title.
 * @param {React.ReactNode} [props.message]
 * @param {{label: string, onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void, disabled?: boolean}} [props.action]
 * A button for a follow-up, such as "Undo".
 * @param {number} [props.duration=4000] Milliseconds before it closes. Kept between 1000 and 20000.
 * @param {boolean} [props.pauseOnHover=true] Hover or focus pauses the countdown.
 * @param {boolean} [props.showProgress=false] Shows a countdown bar.
 * @param {boolean} [props.closeButton=false] Shows a close button.
 * @param {string} [props.closeLabel='Close'] Accessible name of the close button.
 * @param {boolean} [props.open=true] Set to `false` to close it from code.
 * @param {() => void} [props.onClose] Called after the toast has closed.
 * @param {string} [props.className]
 * @param {Object} [props.rest] Any other prop is passed to the root `<div>`.
 * @returns {React.JSX.Element | null}
 *
 * @example
 * ```jsx
 * <Toast type='success' title='Saved' message='Your changes are live.' closeButton />
 * ```
 */
export default function Toast({
    position = 'topCenter',
    type,
    statusLabel = STATUS_LABELS[type],
    title,
    titleAs: TitleTag = 'p',
    message,
    action,
    duration = 4000,
    pauseOnHover = true,
    showProgress,
    closeButton,
    closeLabel = 'Close',
    open = true,
    onClose,
    className,
    ...rest
}) {
    const clampDuration = clamp(duration, 1000, 20000)

    const { isMounted, isActive, isPaused, handleClose, handleAnimationEnd, pauseHandlers } =
        useMount({
            mountOnRender: true,
            open,
            duration: clampDuration,
            pauseOnHover,
            functionOnClose: onClose,
        })

    const icon = ICON_MAP[type] || <BellIcon />

    const toastClass = classNames(
        styles.toast,
        styles[position],
        styles[type],
        isActive ? styles.animateIn : styles.animateOut,
        className,
    )

    const hasAction = Boolean(action?.label)

    // Errors and warnings interrupt the screen reader (alert), the rest wait their turn (status).
    const role = type === 'error' || type === 'warning' ? 'alert' : 'status'

    function handleAction(event) {
        action?.onClick?.(event)
        handleClose()
    }

    function handleKeyDown(event) {
        rest.onKeyDown?.(event)

        // Escape dismisses the toast while focus is inside it.
        if (event.key === 'Escape' && !event.defaultPrevented) handleClose()
    }

    return isMounted ? (
        // biome-ignore lint/a11y/noStaticElementInteractions: a live region, not a control. Its handlers only catch Escape and focus bubbling up from the buttons inside it, and pause the timer on hover.
        <div
            role={role}
            {...rest}
            className={toastClass}
            data-disenuio=''
            onKeyDown={handleKeyDown}
            onAnimationEnd={handleAnimationEnd}
            {...pauseHandlers}
        >
            <div className={styles.contentContainer}>
                <div className={styles.iconContainer}>{icon}</div>
                <div className={styles.content}>
                    {statusLabel && <span className={a11y.srOnly}>{statusLabel}</span>}
                    {title && <TitleTag className={styles.title}>{title}</TitleTag>}
                    {message && <p className={styles.message}>{message}</p>}
                </div>
                <div className={styles.iconContainer}>
                    {closeButton && (
                        <Button
                            variant='ghost'
                            aria-label={closeLabel}
                            onClick={handleClose}
                            className={styles.closeButton}
                        >
                            <CrossIcon className={styles.crossIcon} />
                        </Button>
                    )}
                </div>
            </div>
            {(hasAction || showProgress) && (
                <div className={styles.bottomControls}>
                    {hasAction && (
                        <Button
                            size='small'
                            onClick={handleAction}
                            disabled={action.disabled}
                            className={styles.actionButton}
                        >
                            {action.label}
                        </Button>
                    )}
                    {showProgress && (
                        <div className={styles.progressBarContainer} aria-hidden>
                            <div className={styles.progressBarOffset}>
                                <div
                                    className={styles.progressBar}
                                    style={{ '--duration': `${clampDuration}ms` }}
                                    data-active={isActive}
                                    data-paused={isPaused}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    ) : null
}
