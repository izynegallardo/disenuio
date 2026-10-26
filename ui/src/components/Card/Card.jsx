import { classNames } from '../../utils/classNames'
import { UploadCloudIcon } from '../Icons/Icons'
import styles from './Card.module.css'

export default function Card({ title, message, className, children, ...rest }) {
    const cardClass = classNames(styles.card, className)

    return (
        <article {...rest} className={cardClass} data-disenuio=''>
            <div className={styles.iconWrapper}>{children ? children : <UploadCloudIcon />}</div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {message && <p className={styles.message}>{message}</p>}
        </article>
    )
}
