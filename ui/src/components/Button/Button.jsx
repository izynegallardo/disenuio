import { classNames } from '../../utils/classNames'
import styles from './Button.module.css'

export default function Button({
    variant = 'solid',
    size = 'md',
    type = 'button',
    className,
    children,
    ...rest
}) {
    const buttonClass = classNames(styles.button, styles[variant], styles[size], className)

    return (
        <button type={type} className={buttonClass} {...rest}>
            {children}
        </button>
    )
}
