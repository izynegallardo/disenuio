import useMount from '../../hooks/useMount'
import { classNames } from '../../utils/classNames'
import Button from '../Button/Button'
import { CrossIcon, TrayIcon } from '../Icons/Icons'
import styles from './ToolTip.module.css'

/**
 * A dismissible callout with an icon, title and message. Renders nothing after it is closed.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.title]
 * @param {React.ElementType} [props.titleAs='p'] Element or component used for the title.
 * @param {React.ReactNode} [props.message]
 * @param {'black' | 'blue' | 'pink' | 'green'} [props.color] Color scheme.
 * @param {'bold' | 'light'} [props.variant] Strong or soft version of the color scheme.
 * @param {string} [props.closeLabel='Close'] Accessible name of the close button.
 * @param {() => void} [props.onClose] Called once the tooltip has finished closing.
 * @param {string} [props.className]
 * @param {Object} [props.rest] Any other prop is passed to the root `<div>`.
 * @returns {React.JSX.Element | null}
 *
 * @example
 * ```jsx
 * <ToolTip
 *     color='blue'
 *     variant='light'
 *     title='Tip'
 *     message='You can drag cards to reorder them.'
 *     onClose={() => setTipSeen(true)}
 * />
 * ```
 */
export default function ToolTip({
    title,
    titleAs: TitleTag = 'p',
    message,
    color,
    variant,
    closeLabel = 'Close',
    onClose,
    className,
    ...rest
}) {
    const { isMounted, isActive, handleClose, handleAnimationEnd } = useMount({
        mountOnRender: true,
        functionOnClose: onClose,
    })

    const toolTipClass = classNames(
        styles.toolTip,
        isActive ? styles.animateIn : styles.animateOut,
        styles[color],
        styles[variant],
        className,
    )

    return isMounted ? (
        <div
            {...rest}
            className={toolTipClass}
            onAnimationEnd={handleAnimationEnd}
            data-disenuio=''
        >
            <TrayIcon className={styles.icon} />
            <div className={styles.content}>
                {title && <TitleTag className={styles.title}>{title}</TitleTag>}
                {message && <p className={styles.message}>{message}</p>}
            </div>
            <Button
                variant='ghost'
                aria-label={closeLabel}
                onClick={handleClose}
                className={styles.close}
            >
                <CrossIcon className={styles.icon} />
            </Button>
        </div>
    ) : null
}
