import React from 'react'
import styles from './BackgroundGrid.module.css'

export default function BackgroundGrid() {
    const ref = React.useRef(null)

    React.useEffect(() => {
        const el = ref.current
        if (!el || window.matchMedia('(pointer: coarse)').matches) return

        let raf = 0
        const onMove = (event) => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                el.style.setProperty('--mx', `${event.clientX}px`)
                el.style.setProperty('--my', `${event.clientY}px`)
            })
        }
        const onLeave = () => {
            el.style.setProperty('--mx', '-400px')
            el.style.setProperty('--my', '-400px')
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerleave', onLeave)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerleave', onLeave)
        }
    }, [])

    return (
        <div className={styles.grid} ref={ref} aria-hidden>
            <div className={styles.gridMuted}></div>
            <div className={styles.glowPointer}></div>
            <div className={styles.gridLit}></div>
        </div>
    )
}
