import Logo from '../../assets/react.png'
import styles from './Mascot.module.css'

export default function Mascot() {
    return (
        <button
            type='button'
            tabIndex='-1'
            aria-label='react mascot'
            aria-hidden
            className={styles.mascotButton}
        >
            <img src={Logo} alt='react mascot' draggable={false} className={styles.mascotImage} />
            <span className={styles.mascotShadow} />
        </button>
    )
}
