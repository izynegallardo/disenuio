import useMount from '../../hooks/useMount'
import { clamp } from '../../utils/clamp'
import { classNames } from '../../utils/classNames'
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

export default function Toast({
    position = 'topCenter', // topCenter || topLeft || topRight || bottomCenter || bottomLeft || bottomRight
    type, // default || success || warning || error || info
    title,
    titleAs: TitleTag = 'p',
    message,
    action, // { label: string, onClick?: (event) => void }
    duration = 4000,
    pauseOnHover,
    showProgress,
    closeButton,
    closeLabel = 'Close',
    onClose,
    className,
    ...rest
}) {
    const clampDuration = clamp(duration, 1000, 20000)

    const { isMounted, isActive, isPaused, handleClose, handleAnimationEnd, pauseHandlers } =
        useMount({
            mountOnRender: true,
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

    return isMounted ? (
        <div
            role={role}
            {...rest}
            className={toastClass}
            data-disenuio=''
            onAnimationEnd={handleAnimationEnd}
            {...pauseHandlers}
        >
            <div className={styles.contentContainer}>
                <div className={styles.iconContainer}>{icon}</div>
                <div className={styles.content}>
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
                            size='sm'
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
