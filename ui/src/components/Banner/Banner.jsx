import a11y from '../../styles/a11y.module.css'
import { classNames } from '../../utils/classNames'
import { STATUS_LABELS } from '../../utils/statusLabels'
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
    statusLabel = STATUS_LABELS[status], // read by screen readers before the title, '' to omit
    title,
    titleAs: TitleTag = 'p',
    message,
    className,
    ...rest
}) {
    const icon = ICON_MAP[status] || ICON_MAP.info

    const bannerClass = classNames(styles.banner, styles[status], className)

    return (
        <div role='status' {...rest} className={bannerClass} data-disenuio=''>
            <div className={styles.iconContainer}>{icon}</div>
            <div className={styles.content}>
                {statusLabel && <span className={a11y.srOnly}>{statusLabel}</span>}
                {title && <TitleTag className={styles.title}>{title}</TitleTag>}
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    )
}
