import { Button } from 'disenuio'
import Mascot from '../Mascot/Mascot'
import styles from './Main.module.css'

const variants = ['solid', 'outline', 'ghost']
const sizes = ['small', 'medium', 'large']

export default function Main() {
    return (
        <>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    disenUIo
                    <Mascot />
                </h1>
                <p className={styles.heroSubtitle}>
                    Lightweight, ready-to-use React components with built-in promise handling, fully
                    customizable to fit your needs.
                </p>
            </section>

            <section
                className={styles.section}
                id='button-section'
                aria-labelledby='button-heading'
            >
                <h2 className={styles.sectionTitle} id='button-heading'>
                    Button
                </h2>

                {variants.map((variant) => (
                    <div className={styles.group} key={variant}>
                        <p className={styles.groupLabel}>{variant}</p>
                        <div className={styles.row}>
                            {sizes.map((size) => (
                                <Button key={size} variant={variant} size={size}>
                                    {size}
                                </Button>
                            ))}
                            <Button variant={variant} disabled>
                                disabled
                            </Button>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}
