import QuotesIcon from '../../assets/quotes.svg'
import { classNames } from '../../utils/classNames'
import styles from './Testimonial.module.css'

export default function Testimonial({ image, message, name, companyPosition, className, ...rest }) {
    const testimonialClass = classNames(styles.testimonial, image && styles.hasImage, className)

    return (
        <figure {...rest} className={testimonialClass} data-disenuio=''>
            {image && <div className={styles.imageContainer}>{image}</div>}
            <blockquote className={styles.quote}>
                <img className={styles.quotesIcon} src={QuotesIcon} alt='' />
                <p className={styles.quoteMessage}>{message}</p>
            </blockquote>
            {(name || companyPosition) && (
                <figcaption className={styles.caption}>
                    {name && <span className={styles.name}>{name}</span>}
                    {companyPosition && (
                        <span className={styles.companyPosition}>{companyPosition}</span>
                    )}
                </figcaption>
            )}
        </figure>
    )
}
