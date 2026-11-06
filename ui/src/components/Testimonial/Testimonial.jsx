import QuotesIcon from '../../assets/quotes.svg'
import { classNames } from '../../utils/classNames'
import styles from './Testimonial.module.css'

/**
 * A customer quote with an optional photo and author.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.message The quote.
 * @param {React.ReactNode} [props.name] Who said it.
 * @param {React.ReactNode} [props.companyPosition] Their role or company.
 * @param {React.ReactNode} [props.image] A photo, usually an `<img>`. Switches the layout to the
 * one with an image.
 * @param {string} [props.className]
 * @param {Object} [props.rest] Any other prop is passed to the root `<figure>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Testimonial
 *     message='Setup took five minutes.'
 *     name='Ana Cruz'
 *     companyPosition='Designer at Acme'
 *     image={<img src='/ana.jpg' alt='Ana Cruz' />}
 * />
 * ```
 */
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
