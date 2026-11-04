import { Navigation } from 'disenuio'
import GithubLogo from '../../assets/github.svg'
import NPMLogo from '../../assets/npm.svg'
import styles from './Header.module.css'

// Navigation goes somewhere, so these are links, not buttons. The hash targets are the
// `id` of each page section. Only #samples and #playground exist so far, the others are
// placeholders.
const NAV_LINKS = [
    { label: 'Samples', href: '#samples' },
    { label: 'Playground', href: '#playground' },
    { label: 'Docs', href: '#docs' },
    { label: 'Changelog', href: '#changelog' },
]

export default function Header() {
    return (
        <Navigation className={styles.header}>
            <Navigation.Brand href='/'>
                <span className={styles.brandText}>disenUIo</span>
            </Navigation.Brand>
            <Navigation.Burger />
            <Navigation.Menu>
                <Navigation.Links label='Main'>
                    {NAV_LINKS.map(({ label, href }) => (
                        <Navigation.Link key={href} href={href}>
                            {label}
                        </Navigation.Link>
                    ))}
                </Navigation.Links>
                <Navigation.Actions>
                    <a
                        className={styles.headerLink}
                        href='https://github.com/izynegallardo/disenUIo'
                        target='_blank'
                        rel='noopener'
                    >
                        <img
                            className={styles.headerIcon}
                            src={GithubLogo}
                            alt='disenUIo on GitHub'
                        />
                    </a>
                    <a
                        className={styles.headerLink}
                        href='https://www.npmjs.com/package/disenuio'
                        target='_blank'
                        rel='noopener'
                    >
                        <img className={styles.headerIcon} src={NPMLogo} alt='disenUIo on npm' />
                    </a>
                </Navigation.Actions>
            </Navigation.Menu>
        </Navigation>
    )
}
