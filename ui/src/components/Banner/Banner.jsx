import ErrorIcon from '../../assets/status-solid-error.svg'
import InfoIcon from '../../assets/status-solid-info.svg'
import SuccessIcon from '../../assets/status-solid-success.svg'
import WarningIcon from '../../assets/status-solid-warning.svg'

import { classNames } from '../../utils/classNames'
import styles from './Banner.module.css'

const ICON_MAP = {
    success: { src: SuccessIcon, alt: 'success icon' },
    warning: { src: WarningIcon, alt: 'warning icon' },
    error: { src: ErrorIcon, alt: 'error icon' },
    info: { src: InfoIcon, alt: 'information icon' },
}

export default function Banner({
    status = 'info', // info || success || warning || error
    title,
    message,
    className,
    ...rest
}) {
    const icon = ICON_MAP[status] || ICON_MAP.info

    const bannerClass = classNames(styles.banner, styles[status], className)

    return (
        <div {...rest} className={bannerClass} aria-live='polite'>
            <div className={styles.iconContainer}>
                <img src={icon.src} alt={icon.alt} className={styles.icon} />
            </div>
            <div className={styles.content}>
                {title && <h4 className={styles.title}>{title}</h4>}
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    )
}
