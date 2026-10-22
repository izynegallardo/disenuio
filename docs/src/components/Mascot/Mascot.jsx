import Logo from '../../assets/react.png'
import styles from './Mascot.module.css'

export default function Mascot() {
    return (
        <button
            type='button'
            tabindex='-1'
            aria-label='Corgi mascot'
            aria-hidden
            className={styles.mascotButton}
        >
            <img
                src={Logo}
                alt='disenUIo corgi mascot'
                draggable={false}
                className={styles.mascotImage}
            />
            <span className={styles.mascotShadow} />
        </button>
    )
}
