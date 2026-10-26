import React from 'react'
import { classNames } from '../../utils/classNames'
import Button from '../Button/Button'
import { CrossIcon, TrayIcon } from '../Icons/Icons'
import styles from './ToolTip.module.css'

export default function ToolTip({
    title,
    message,
    color, // black, blue, pink, green
    variant, // bold, light
    onClose,
    className,
    ...rest
}) {
    const [isMounted, setIsMounted] = React.useState(true)
    const [isActive, setIsActive] = React.useState(false)

    function handleAnimationEnd(event) {
        if (!isActive && event.target === event.currentTarget) {
            setIsMounted((prevIsMounted) => !prevIsMounted)
            if (onClose) onClose()
        }
    }

    React.useEffect(() => {
        queueMicrotask(() => {
            setIsActive(true)
        })
    }, [])

    function handleClose() {
        setIsActive((prevIsActive) => !prevIsActive)
    }

    const toolTipClass = classNames(
        styles.toolTip,
        isActive ? styles.animateIn : styles.animateOut,
        styles[color],
        styles[variant],
        className,
    )

    return isMounted ? (
        <div
            {...rest}
            className={toolTipClass}
            onAnimationEnd={handleAnimationEnd}
            data-disenuio=''
        >
            <TrayIcon className={`${styles.icon} ${styles.tray}`} />
            <div className={styles.content}>
                <h4 className={styles.title}>{title ?? 'Tooltip Component'}</h4>
                <p className={styles.message}>
                    {message ??
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'}
                </p>
            </div>
            <Button onClick={handleClose} className={styles.close}>
                <CrossIcon className={styles.icon} />
            </Button>
        </div>
    ) : null
}
