import { Button } from 'disenuio'
import styles from './Main.module.css'

const variants = ['solid', 'outline', 'ghost']
const sizes = ['small', 'medium', 'large']

export default function Main() {
    return (
        <>
            <header>
                <h1 className={styles.pageTitle}>disenUIo</h1>
                <p className={styles.pageSubtitle}>Component playground</p>
            </header>

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
