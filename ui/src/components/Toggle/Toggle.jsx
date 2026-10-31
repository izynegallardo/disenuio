import useToggle from '../../hooks/useToggle'
import { classNames } from '../../utils/classNames'
import styles from './Toggle.module.css'

export default function Toggle({
    initialValue = false,
    onChange, // (checked: boolean) => void
    label, // accessible name, or use aria-labelledby
    color, // any CSS color, defaults to the primary color
    className,
    style,
    onClick,
    ...rest
}) {
    const [on, toggle] = useToggle({ initialValue, onToggle: onChange })

    const toggleClass = classNames(styles.toggle, on && styles.isChecked, className)
    const toggleStyle = color ? { '--disenuio-toggle-color': color, ...style } : style

    function handleClick(event) {
        onClick?.(event)

        // A consumer can cancel the change with event.preventDefault().
        if (!event.defaultPrevented) toggle()
    }

    return (
        <button
            aria-label={label}
            {...rest}
            type='button'
            role='switch'
            aria-checked={on}
            className={toggleClass}
            style={toggleStyle}
            onClick={handleClick}
            data-disenuio=''
        >
            <span className={styles.thumb} />
        </button>
    )
}
