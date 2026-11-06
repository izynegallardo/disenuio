import { classNames } from '../../utils/classNames'
import styles from './Navigation.module.css'
import { useNavigation } from './NavigationContext'

/**
 * What the burger opens: the links and the actions.
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the root `<div>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Navigation.Menu>
 *     <Navigation.Links>...</Navigation.Links>
 *     <Navigation.Actions>...</Navigation.Actions>
 * </Navigation.Menu>
 * ```
 */
export default function NavigationMenu({ className, children, ...rest }) {
    const { menuId } = useNavigation()

    return (
        <div {...rest} id={menuId} className={classNames(styles.menu, className)}>
            {children}
        </div>
    )
}
