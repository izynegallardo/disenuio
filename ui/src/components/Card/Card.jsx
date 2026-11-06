import { classNames } from '../../utils/classNames'
import styles from './Card.module.css'

/**
 * A card with an optional icon, title and message. `children` render after the message.
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] Shown in a badge on the top edge. Usually an icon.
 * @param {React.ReactNode} [props.title]
 * @param {React.ElementType} [props.titleAs='h3'] Element or component used for the title.
 * @param {React.ReactNode} [props.message]
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the root `<article>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Card icon={<MyIcon />} title='Fast' message='Small, focused components.'>
 *     <Button variant='outline'>Learn more</Button>
 * </Card>
 * ```
 */
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
