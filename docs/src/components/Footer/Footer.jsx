import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
    const [currentYear] = React.useState(() => new Date().getFullYear())

    return (
        <footer className={styles.footer}>
            <span>&copy; {currentYear} disenUIo Contributors. MIT</span>
        </footer>
    )
}
