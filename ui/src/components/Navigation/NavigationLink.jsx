import { classNames } from '../../utils/classNames'
import { useNavbar } from './NavbarContext'
import styles from './Navbar.module.css'

export default function NavbarLink({
    as: Tag = 'a', // pass a router link component to navigate without a page load
    current = false, // the link of the page or section the user is on
    className,
    onClick,
    children,
    ...rest
}) {
    const { closeMenu } = useNavbar()

    // Following a link closes the menu, otherwise it would stay over the page.
    function handleClick(event) {
        onClick?.(event)
        closeMenu()
    }

    return (
        <li className={styles.item}>
            <Tag
                {...rest}
                className={classNames(styles.link, className)}
                aria-current={current ? 'page' : undefined}
                onClick={handleClick}
            >
                {children}
            </Tag>
        </li>
    )
}
