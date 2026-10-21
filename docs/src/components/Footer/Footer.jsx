import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span>&copy; {new Date().getFullYear()} Izyne Gallardo. MIT</span>
        </footer>
    )
}
