import { classNames } from '../../utils/classNames'
import styles from './Navigation.module.css'

/**
 * Room for icon links, a button or a search field.
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the root `<div>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Navigation.Actions>
 *     <a href='https://github.com/izynegallardo/disenuio' aria-label='GitHub'>GH</a>
 * </Navigation.Actions>
 * ```
 */
export default function NavigationActions({ className, children, ...rest }) {
    return (
        <div {...rest} className={classNames(styles.actions, className)}>
            {children}
        </div>
    )
}
