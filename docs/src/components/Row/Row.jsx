import React from 'react'
import styles from './Row.module.css'

/**
 * A label on the left, a control on the right.
 *
 * `children` can be a function that receives the id of the label, so the control can point
 * to it with aria-labelledby: `<Row label='Size'>{(labelId) => <Slider aria-labelledby={labelId} />}</Row>`.
 */
export default function Row({ label, hint, className, children, ...rest }) {
    const labelId = React.useId()
    const rowClass = [styles.row, className].filter(Boolean).join(' ')

    return (
        <div {...rest} className={rowClass}>
            <span className={styles.labelGroup}>
                <span id={labelId} className={styles.label}>
                    {label}
                </span>
                {hint && <span className={styles.hint}>{hint}</span>}
            </span>
            {typeof children === 'function' ? children(labelId) : children}
        </div>
    )
}
