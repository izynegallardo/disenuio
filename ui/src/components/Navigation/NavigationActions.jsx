import { classNames } from '../../utils/classNames'
import styles from './Navbar.module.css'

// Room for icon links, a button or a search field. Set apart from the links by a divider.
export default function NavbarActions({ className, children, ...rest }) {
    return (
        <div {...rest} className={classNames(styles.actions, className)}>
            {children}
        </div>
    )
}
