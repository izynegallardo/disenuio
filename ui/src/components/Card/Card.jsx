import UploadIcon from '../../assets/upload-cloud.svg'
import { classNames } from '../../utils/classNames'
import styles from './Card.module.css'

export default function Card({ title, message, className, children, ...rest }) {
    const cardClass = classNames(styles.card, className)

    return (
        <article {...rest} className={cardClass}>
            <div className={styles.iconWrapper}>
                {children ? children : <img src={UploadIcon} alt='upload icon' />}
            </div>
            {title && <h3 className={styles.title}>{title}</h3>}
            {message && <p className={styles.message}>{message}</p>}
        </article>
    )
}
