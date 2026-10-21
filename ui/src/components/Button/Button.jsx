import { classNames } from '../../utils/classNames'
import styles from './Button.module.css'

export default function Button({
    variant = 'solid',
    size = 'medium',
    type = 'button',
    className,
    children,
    ...rest
}) {
    return (
        <button
            type={type}
            className={classNames(styles.button, styles[variant], styles[size], className)}
            {...rest}
        >
            {children}
        </button>
    )
}
