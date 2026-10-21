import GithubLogo from '../../assets/github.svg'
import NPMLogo from '../../assets/npm.svg'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <div>
                <button className={styles.titleBtn} type='button'>
                    disenUIo
                </button>
            </div>
            <nav className={styles.headerNav}>
                <button className={styles.navBtn} type='button'>
                    Samples
                </button>
                <button className={styles.navBtn} type='button'>
                    Docs
                </button>
                <button className={styles.navBtn} type='button'>
                    Changelog
                </button>
            </nav>
            <div className={styles.headerIcons}>
                <a className={styles.headerLink} href='https://github.com/izynegallardo/disenUIo'>
                    <img className={styles.headerIcon} src={GithubLogo} alt='Github logo'></img>
                </a>
                <a className={styles.headerLink} href='https://www.npmjs.com/package/disenUIo'>
                    <img className={styles.headerIcon} src={NPMLogo} alt='NPM Logo'></img>
                </a>
            </div>
        </header>
    )
}
