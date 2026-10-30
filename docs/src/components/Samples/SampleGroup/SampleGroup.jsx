import styles from './SampleGroup.module.css'

export default function SampleGroup({
    label,
    direction = 'row', // row || column
    className,
    children,
    ...rest
}) {
    const sampleGroupClass = [styles.group, className].filter(Boolean).join(' ')

    return (
        <fieldset {...rest} className={sampleGroupClass}>
            <legend className={styles.label}>{label}</legend>
            <div className={`${styles.items} ${styles[direction]}`}>{children}</div>
        </fieldset>
    )
}
