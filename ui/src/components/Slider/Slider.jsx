import { classNames } from '../../utils/classNames'
import styles from './Slider.module.css'

/**
 * A range slider.
 *
 * @param {Object} props
 * @param {number} [props.min=0]
 * @param {number} [props.max=100]
 * @param {number} [props.step=1]
 * @param {number} [props.value] Controlled value. Use `defaultValue` to leave it uncontrolled.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange]
 * @param {string} [props.className]
 * @param {Object} [props.rest] Any other prop is passed to the native range `<input>`, except
 * `type`, which is always `range`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Slider
 *     aria-label='Volume'
 *     min={0}
 *     max={10}
 *     defaultValue={5}
 *     onChange={(event) => setVolume(Number(event.target.value))}
 * />
 * ```
 */
export default function Slider({
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    className,
    ...rest
}) {
    const sliderClass = classNames(styles.slider, className)

    return (
        <input
            {...rest}
            type='range'
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className={sliderClass}
            data-disenuio=''
        />
    )
}
