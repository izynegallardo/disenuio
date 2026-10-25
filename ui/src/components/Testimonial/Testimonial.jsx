import Model from '../../assets/model.jpg'
import QuotesIcon from '../../assets/quotes.svg'
import { classNames } from '../../utils/classNames'
import styles from './Testimonial.module.css'

export default function Testimonial({
    message,
    name,
    companyPosition,
    children,
    className,
    ...rest
}) {
    const testimonialClass = classNames(styles.testimonial, className)

    return (
        <div {...rest} className={testimonialClass}>
            <div className={styles.modelContainer}>
                {children ? (
                    children
                ) : (
                    <img className={styles.model} src={Model} alt='Woman model' />
                )}
            </div>
            <div className={styles.quotes}>
                <img className={styles.quotesIcon} src={QuotesIcon} alt='Quotes Icon' />
                <h2 className={styles.quotesMessage}>
                    {message ??
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit. '}
                </h2>
                <p className={styles.name}>{name ?? 'May Andersons'}</p>
                <p className={styles.companyPosition}>{companyPosition ?? 'Workcation, CTO'}</p>
            </div>
        </div>
    )
}
