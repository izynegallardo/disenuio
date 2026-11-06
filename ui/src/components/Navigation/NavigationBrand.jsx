import { classNames } from '../../utils/classNames'
import styles from './Navigation.module.css'

/**
 * The name or logo of the site, usually a link to the home page. Use it inside `Navigation`.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='a'] Element or component used for the brand.
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the rendered element.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Navigation.Brand href='/'>disenUIo</Navigation.Brand>
 * ```
 */
export default function NavigationBrand({ as: Tag = 'a', className, children, ...rest }) {
    return (
        <Tag {...rest} className={classNames(styles.brand, className)}>
            {children}
        </Tag>
    )
}
