import React from 'react'
import { classNames } from '../../utils/classNames'
import styles from './Input.module.css'

export default function Input({
    label, // visible label. Without it, pass aria-label or aria-labelledby
    type = 'text',
    id,
    className,
    ...rest
}) {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    const inputClass = classNames(styles.input, className)

    const input = (
        <input {...rest} id={inputId} type={type} className={inputClass} data-disenuio='' />
    )

    if (!label) return input

    return (
        <div className={styles.field} data-disenuio=''>
            <label htmlFor={inputId} className={styles.label}>
                {label}
            </label>
            {input}
        </div>
    )
}
