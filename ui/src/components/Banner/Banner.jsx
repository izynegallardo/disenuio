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
                {title && <TitleTag className={styles.title}>{title}</TitleTag>}
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    )
}
