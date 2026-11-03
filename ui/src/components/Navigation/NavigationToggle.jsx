import { classNames } from '../../utils/classNames'
import { CrossIcon, MenuIcon } from '../Icons/Icons'
import { useNavbar } from './NavbarContext'
import styles from './Navbar.module.css'

// The button that opens and closes the menu on small screens. Hidden on wide screens.
export default function NavbarToggle({ label = 'Menu', className, onClick, ...rest }) {
    const { isOpen, menuId, toggleRef, toggleMenu } = useNavbar()

    function handleClick(event) {
        onClick?.(event)
        toggleMenu()
    }

    // The label stays the same, aria-expanded tells whether the menu is open.
    return (
        <button
            type='button'
            {...rest}
            ref={toggleRef}
            className={classNames(styles.toggle, className)}
            aria-label={label}
            aria-expanded={isOpen}
            aria-controls={menuId}
            onClick={handleClick}
        >
            {isOpen ? <CrossIcon /> : <MenuIcon />}
        </button>
    )
}
