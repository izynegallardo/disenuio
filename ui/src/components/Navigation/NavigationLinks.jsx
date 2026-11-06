import { classNames } from '../../utils/classNames'
import styles from './Navigation.module.css'

/**
 * The navigation landmark that holds the list of links.
 *
 * @param {Object} props
 * @param {string} [props.label='Main'] Accessible name of the navigation landmark.
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the root `<nav>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Navigation.Links label='Main'>
 *     <Navigation.Link href='#samples'>Samples</Navigation.Link>
 *     <Navigation.Link href='#docs'>Docs</Navigation.Link>
 * </Navigation.Links>
 * ```
 */
export default function NavigationLinks({ label = 'Main', className, children, ...rest }) {
    return (
        <nav {...rest} aria-label={label} className={classNames(styles.links, className)}>
            <ul className={styles.list}>{children}</ul>
        </nav>
    )
}
