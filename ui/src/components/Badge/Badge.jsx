import { classNames } from '../../utils/classNames'
import styles from './Badge.module.css'

export default function Badge({
    size = 'md', // sm, md, lg
    variant = 'square', // square || pill
    color, // gray || red || yellow || green || blue || indigo || purple || pink
    className,
    children,
    ...rest
}) {
    const badgeClass = classNames(
        styles.badge,
        styles[size],
        styles[variant],
        styles[color],
        className,
    )

    return (
        <span {...rest} className={badgeClass}>
            {children}
        </span>
    )
}
