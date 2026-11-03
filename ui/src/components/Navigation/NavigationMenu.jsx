import { classNames } from '../../utils/classNames'
import { useNavbar } from './NavbarContext'
import styles from './Navbar.module.css'

// What the toggle opens: the links and the actions. Always visible on wide screens.
export default function NavbarMenu({ className, children, ...rest }) {
    const { menuId } = useNavbar()

    return (
        <div {...rest} id={menuId} className={classNames(styles.menu, className)}>
            {children}
        </div>
    )
}
