import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import styles from './DefaultLayout.module.css'

export default function DefaultLayout({ children }) {
    return (
        <div className={styles.default}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}
