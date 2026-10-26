import { classNames } from '../../utils/classNames'
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../Icons/Icons'
import styles from './Banner.module.css'

const ICON_MAP = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
    info: <InfoIcon />,
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
        <div {...rest} className={bannerClass} aria-live='polite' data-disenuio=''>
            <div className={styles.iconContainer}>{icon}</div>
            <div className={styles.content}>
                {title && <h4 className={styles.title}>{title}</h4>}
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    )
}
