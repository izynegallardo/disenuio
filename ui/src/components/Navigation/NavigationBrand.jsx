import { classNames } from '../../utils/classNames'
import styles from './Navbar.module.css'

export default function NavbarBrand({ as: Tag = 'a', className, children, ...rest }) {
    return (
        <Tag {...rest} className={classNames(styles.brand, className)}>
            {children}
        </Tag>
    )
}
