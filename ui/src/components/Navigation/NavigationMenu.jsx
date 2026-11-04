import { classNames } from '../../utils/classNames'
import styles from './Navigation.module.css'
import { useNavigation } from './NavigationContext'

// What the toggle opens: the links and the actions. Always visible on wide screens.
export default function NavigationMenu({ className, children, ...rest }) {
    const { menuId } = useNavigation()

    return (
        <div {...rest} id={menuId} className={classNames(styles.menu, className)}>
            {children}
        </div>
    )
}
