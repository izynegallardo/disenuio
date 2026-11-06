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

/**
 * An inline message for the page, such as a notice, a success or an error.
 *
 * @param {Object} props
 * @param {'info' | 'success' | 'warning' | 'error'} [props.status='info'] Sets the color and icon.
 * @param {string} [props.statusLabel] Read by screen readers before the title. Defaults to a word
 * for the status. Pass `''` to leave it out, or a translation.
 * @param {React.ReactNode} [props.title]
 * @param {React.ElementType} [props.titleAs='p'] Element or component used for the title.
 * @param {React.ReactNode} [props.message]
 * @param {string} [props.className]
 * @param {Object} [props.rest] Any other prop is passed to the root `<div>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Banner status='success' title='Profile saved' message='Your changes are live.' />
 * ```
 */
export default function Banner({
    status = 'info',
    statusLabel = STATUS_LABELS[status],
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
