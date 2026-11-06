import { classNames } from '../../utils/classNames'
import { CrossIcon, MenuIcon } from '../Icons/Icons'
import styles from './Navigation.module.css'
import { useNavigation } from './NavigationContext'

/**
 * The button that opens and closes the menu on small screens.
 *
 * @param {Object} props
 * @param {string} [props.label='Menu'] Accessible name of the button.
 * @param {string} [props.className]
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} [props.onClick]
 * @param {Object} [props.rest] Any other prop is passed to the native `<button>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Navigation.Burger label='Open menu' />
 * ```
 */
export default function NavigationBurger({ label = 'Menu', className, onClick, ...rest }) {
    const { isOpen, menuId, toggleRef, toggleMenu } = useNavigation()

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
