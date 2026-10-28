import useMount from '../../hooks/useMount'
import { classNames } from '../../utils/classNames'
import Button from '../Button/Button'
import { CrossIcon, TrayIcon } from '../Icons/Icons'
import styles from './ToolTip.module.css'

export default function ToolTip({
    title,
    titleAs: TitleTag = 'p',
    message,
    color, // black, blue, pink, green
    variant, // bold, light
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
