import styles from './Section.module.css'

export default function Section({ id, title, blurb, children }) {
    return (
        <section id={id} className={styles.sectionContainer}>
            <div className={styles.headerRow}>
                <h2 className={styles.heading}>{title}</h2>
                <p className={styles.description}>{blurb}</p>
            </div>
            {children}
        </section>
    )
}
