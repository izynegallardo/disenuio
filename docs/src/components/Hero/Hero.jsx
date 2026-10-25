import { CodeBlock } from 'disenuio'
import Mascot from '../Mascot/Mascot'
import styles from './Hero.module.css'

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div>
                <h1 className={styles.heroTitle}>
                    disenUIo
                    <Mascot />
                </h1>
            </div>
            <div className={styles.heroBlock}>
                <p className={styles.heroSubtitle}>
                    Lightweight, ready-to-use React components with built-in promise handling, fully
                    customizable to fit your needs.
                </p>
                <CodeBlock label='termnial' code='npm install disenuio' />
            </div>
        </section>
    )
}
