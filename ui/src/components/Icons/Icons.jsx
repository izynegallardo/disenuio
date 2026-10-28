import styles from './Icons.module.css'

export function CopyIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${className}`.trim()}
            aria-hidden
        >
            <rect x='9' y='9' width='12' height='12' rx='2' />
            <path d='M5 15V5a2 2 0 0 1 2-2h10' />
        </svg>
    )
}

export function CheckIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${className}`.trim()}
            aria-hidden
        >
            <path d='M5 12.5l4.5 4.5L19 7' />
        </svg>
    )
}

export function CrossIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
            strokeLinecap='round'
            className={`${styles.baseIcon} ${className}`.trim()}
            aria-hidden
        >
            <path d='M6 6l12 12M18 6L6 18' />
        </svg>
    )
}

export function TrayIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${className}`.trim()}
            aria-hidden
        >
            <rect x='3' y='3' width='18' height='18' rx='3' />
            <path d='M3 13h4.5l1.5 3h6l1.5-3H21' />
        </svg>
    )
}

export function UploadCloudIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${className}`.trim()}
            aria-hidden
        >
            <path d='M7 18a4.5 4.5 0 0 1-.9-8.9 6 6 0 0 1 11.6 1.4A3.8 3.8 0 0 1 17.5 18' />
            <path d='M12 21v-9M8.5 15.5 12 12l3.5 3.5' />
        </svg>
    )
}

export function SuccessIcon({ className = '' }) {
    return (
        <svg viewBox='0 0 24 24' className={`${styles.baseIcon} ${className}`.trim()} aria-hidden>
            <circle cx='12' cy='12' r='10' className={styles.statusSuccess} />
            <path d='M7.5 12.5l3 3 6-6.5' className={styles.statusGlyph} />
        </svg>
    )
}

export function WarningIcon({ className = '' }) {
    return (
        <svg viewBox='0 0 24 24' className={`${styles.baseIcon} ${className}`.trim()} aria-hidden>
            <path d='M12 4.5 20.5 19h-17z' className={styles.statusWarning} />
            <path d='M12 10v3.5' className={styles.statusGlyph} />
            <circle cx='12' cy='16.3' r='1.1' className={styles.statusDot} />
        </svg>
    )
}

export function ErrorIcon({ className = '' }) {
    return (
        <svg viewBox='0 0 24 24' className={`${styles.baseIcon} ${className}`.trim()} aria-hidden>
            <circle cx='12' cy='12' r='10' className={styles.statusError} />
            <path d='M8.8 8.8l6.4 6.4M15.2 8.8l-6.4 6.4' className={styles.statusGlyph} />
        </svg>
    )
}

export function InfoIcon({ className = '' }) {
    return (
        <svg viewBox='0 0 24 24' className={`${styles.baseIcon} ${className}`.trim()} aria-hidden>
            <circle cx='12' cy='12' r='10' className={styles.statusInfo} />
            <circle cx='12' cy='7.8' r='1.3' className={styles.statusDot} />
            <path d='M12 11v5.5' className={styles.statusGlyph} />
        </svg>
    )
}

export function SuccessOutlineIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${styles.statusOutlineSuccess} ${className}`.trim()}
            aria-hidden
        >
            <circle cx='12' cy='12' r='10' />
            <path d='M8 12.5l3 3 5-5.5' />
        </svg>
    )
}

export function WarningOutlineIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${styles.statusOutlineWarning} ${className}`.trim()}
            aria-hidden
        >
            <circle cx='12' cy='12' r='10' />
            <path d='M12 7.5v5.5M12 16.5h.01' />
        </svg>
    )
}

export function ErrorOutlineIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${styles.statusOutlineError} ${className}`.trim()}
            aria-hidden
        >
            <circle cx='12' cy='12' r='10' />
            <path d='M9 9l6 6M15 9l-6 6' />
        </svg>
    )
}

export function InfoOutlineIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${styles.statusOutlineInfo} ${className}`.trim()}
            aria-hidden
        >
            <circle cx='12' cy='12' r='10' />
            <path d='M12 7.5h.01M12 11v5.5' />
        </svg>
    )
}

export function BellIcon({ className = '' }) {
    return (
        <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className={`${styles.baseIcon} ${className}`.trim()}
            aria-hidden
        >
            <path d='M18 9a6 6 0 0 0-12 0c0 4.5-1.5 6-2 7.5h16c-.5-1.5-2-3-2-7.5z' />
            <path d='M10 20.5a2 2 0 0 0 4 0' />
        </svg>
    )
}
