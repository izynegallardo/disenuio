import { classNames } from '../../utils/classNames'
import styles from './Navigation.module.css'
import { useNavigation } from './NavigationContext'

/**
 * One link of the menu. Use it inside `Navigation.Links`.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='a'] Element or component used for the link, such as a
 * router link.
 * @param {boolean} [props.current=false] Marks the link of the page the user is on.
 * @param {string} [props.className]
 * @param {(event: React.MouseEvent) => void} [props.onClick]
 * @param {React.ReactNode} [props.children]
 * @param {Object} [props.rest] Any other prop is passed to the rendered element.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Navigation.Link href='#samples' current>Samples</Navigation.Link>
 * ```
 */
export default function NavigationLink({
    as: Tag = 'a',
    current = false,
    className,
    onClick,
    children,
    ...rest
}) {
    const { closeMenu } = useNavigation()

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
