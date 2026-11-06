import { classNames } from '../../utils/classNames'
import styles from './Badge.module.css'

/**
 * A small label for a status, count or category.
 *
 * @param {Object} props
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] Text size.
 * @param {'square' | 'pill'} [props.shape='square'] Corner style.
 * @param {'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink'} [props.color]
 * Color scheme. Leave it out for the primary color.
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the root `<span>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Badge color='green' shape='pill'>Active</Badge>
 * ```
 */
export default function Badge({
    size = 'medium',
    shape = 'square',
    color,
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
