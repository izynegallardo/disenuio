import React from 'react'
import { classNames } from '../../utils/classNames'
import styles from './Navigation.module.css'
import NavigationActions from './NavigationActions'
import NavigationBrand from './NavigationBrand'
import NavigationBurger from './NavigationBurger'
import NavigationContext from './NavigationContext'
import NavigationLink from './NavigationLink'
import NavigationLinks from './NavigationLinks'
import NavigationMenu from './NavigationMenu'

// Wide screens show the menu inline. Keep in step with the media query in Navigation.module.css.
const WIDE_SCREEN_QUERY = '(min-width: 768px)'

// The burger is a part of this component, not a separate one: it only makes sense next to
// the menu it opens, and it shares the open state through context.
//
// Customization hooks. Optional:
//   --disenuio-navigation-max-width   width of the content, centered (default 1200px)
//   --disenuio-navigation-z-index     stacking order while sticky (default 100)

/**
 * A responsive site header whose menu collapses behind a burger button on small screens. Build it
 * with `Navigation.Brand`, `Navigation.Burger`, `Navigation.Menu`, `Navigation.Links`,
 * `Navigation.Link` and `Navigation.Actions`.
 *
 * @param {Object} props
 * @param {boolean} [props.sticky=true] Keeps the header at the top while scrolling.
 * @param {string} [props.className]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the root `<header>`.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Navigation>
 *     <Navigation.Brand href='/'>disenUIo</Navigation.Brand>
 *     <Navigation.Burger />
 *     <Navigation.Menu>
 *         <Navigation.Links label='Main'>
 *             <Navigation.Link href='#samples' current>Samples</Navigation.Link>
 *             <Navigation.Link href='#docs'>Docs</Navigation.Link>
 *         </Navigation.Links>
 *         <Navigation.Actions>
 *             <a href='https://github.com/izynegallardo/disenuio'>GitHub</a>
 *         </Navigation.Actions>
 *     </Navigation.Menu>
 * </Navigation>
 * ```
 */
function Navigation({ sticky = true, className, children, ...rest }) {
    const menuId = React.useId()
    const rootRef = React.useRef(null)
    const toggleRef = React.useRef(null)
    const [isOpen, setIsOpen] = React.useState(false)

    const toggleMenu = React.useCallback(() => setIsOpen((current) => !current), [])
    const closeMenu = React.useCallback(() => setIsOpen(false), [])

    // Tapping anywhere outside the navigation closes the menu, and so does Escape.
    React.useEffect(() => {
        if (!isOpen) return

        function handlePointerDown(event) {
            if (!rootRef.current.contains(event.target)) setIsOpen(false)
        }

        // Focus goes back to the burger only if it was inside the navigation.
        function handleKeyDown(event) {
            if (event.key !== 'Escape') return

            if (rootRef.current.contains(document.activeElement)) toggleRef.current?.focus()

            setIsOpen(false)
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    // Growing into the wide layout (rotating a tablet, resizing) leaves no menu open behind.
    React.useEffect(() => {
        const query = window.matchMedia?.(WIDE_SCREEN_QUERY)

        if (!query) return

        function handleChange(event) {
            if (event.matches) setIsOpen(false)
        }

        query.addEventListener('change', handleChange)

        return () => query.removeEventListener('change', handleChange)
    }, [])

    const context = React.useMemo(
        () => ({ isOpen, menuId, toggleRef, toggleMenu, closeMenu }),
        [isOpen, menuId, toggleMenu, closeMenu],
    )

    const navigationClass = classNames(
        styles.navigation,
        sticky && styles.sticky,
        isOpen && styles.isOpen,
        className,
    )

    return (
        <NavigationContext.Provider value={context}>
            <header {...rest} ref={rootRef} className={navigationClass} data-disenuio=''>
                <div className={styles.container}>{children}</div>
            </header>
        </NavigationContext.Provider>
    )
}

Navigation.Brand = NavigationBrand
Navigation.Burger = NavigationBurger
Navigation.Menu = NavigationMenu
Navigation.Links = NavigationLinks
Navigation.Link = NavigationLink
Navigation.Actions = NavigationActions

export default Navigation
