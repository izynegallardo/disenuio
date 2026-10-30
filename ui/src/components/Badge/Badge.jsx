import { classNames } from '../../utils/classNames'
import styles from './Badge.module.css'

export default function Badge({
    size = 'medium', // small, medium, large
    shape = 'square', // square || pill
    color, // gray || red || yellow || green || blue || indigo || purple || pink
    className,
    children,
    ...rest
}) {
    const badgeClass = classNames(
        styles.badge,
        styles[size],
        styles[shape],
        styles[color],
        className,
    )

    return (
        <span {...rest} className={badgeClass} data-disenuio=''>
            {children}
        </span>
    )
}
