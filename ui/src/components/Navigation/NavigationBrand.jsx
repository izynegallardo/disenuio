import { classNames } from '../../utils/classNames'
import styles from './Navigation.module.css'

export default function NavigationBrand({ as: Tag = 'a', className, children, ...rest }) {
    return (
        <Tag {...rest} className={classNames(styles.brand, className)}>
            {children}
        </Tag>
    )
}
