import { classNames } from '../../utils/classNames'
import styles from './Card.module.css'

export default function Card({
    icon,
    title,
    titleAs: TitleTag = 'h3',
    message,
    className,
    children,
    ...rest
}) {
    const cardClass = classNames(styles.card, className)

    return (
        <article {...rest} className={cardClass} data-disenuio=''>
            {icon && <div className={styles.iconWrapper}>{icon}</div>}
            {title && <TitleTag className={styles.title}>{title}</TitleTag>}
            {message && <p className={styles.message}>{message}</p>}
            {children}
        </article>
    )
}
