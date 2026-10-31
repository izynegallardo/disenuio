import { classNames } from '../../utils/classNames'
import styles from './Slider.module.css'

export default function Slider({
    min = 0,
    max = 100,
    step = 1,
    value, // controlled. Use defaultValue for uncontrolled
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
