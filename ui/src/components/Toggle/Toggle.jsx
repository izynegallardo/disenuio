import useToggle from '../../hooks/useToggle'
import { classNames } from '../../utils/classNames'
import styles from './Toggle.module.css'

/**
 * A switch for an on/off setting.
 *
 * @param {Object} props
 * @param {boolean} [props.initialValue=false] Starting state. The toggle keeps its own state.
 * @param {(checked: boolean) => void} [props.onChange] Called with the new state after a click.
 * @param {string} [props.label] Accessible name. Or pass `aria-labelledby`.
 * @param {string} [props.color] Color when on. Any CSS color. Defaults to the primary color.
 * @param {string} [props.className]
 * @param {React.CSSProperties} [props.style]
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick] Call
 * `event.preventDefault()` to cancel a change.
 * @param {Object} [props.rest] Any other prop is passed to the `<button role="switch">`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Toggle label='Notifications' onChange={(checked) => setNotifications(checked)} />
 * ```
 */
export default function Toggle({
    initialValue = false,
    onChange,
    label,
    color,
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
