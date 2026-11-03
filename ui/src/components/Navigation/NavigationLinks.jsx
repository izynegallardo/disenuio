import { classNames } from '../../utils/classNames'
import styles from './Navbar.module.css'

// The navigation landmark. `label` tells screen readers apart if a page has more than one.
export default function NavbarLinks({ label = 'Main', className, children, ...rest }) {
    return (
        <nav {...rest} aria-label={label} className={classNames(styles.links, className)}>
            <ul className={styles.list}>{children}</ul>
        </nav>
    )
}
