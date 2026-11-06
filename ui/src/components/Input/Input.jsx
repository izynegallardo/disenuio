import React from 'react'
import { classNames } from '../../utils/classNames'
import styles from './Input.module.css'

/**
 * A text field with an optional label.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.label] Visible label. Without it, pass `aria-label` or
 * `aria-labelledby` so the field has an accessible name.
 * @param {string} [props.type='text'] Any native input type.
 * @param {string} [props.id] Generated when left out, so the label is always linked.
 * @param {string} [props.className]
 * @param {Object} [props.rest] Any other prop is passed to the native `<input>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Input label='Email' type='email' placeholder='you@example.com' />
 * ```
 */
export default function Input({ label, type = 'text', id, className, ...rest }) {
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
