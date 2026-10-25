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
