import React from 'react'
import a11y from '../../styles/a11y.module.css'
import { classNames } from '../../utils/classNames'
import { CheckIcon, CopyIcon } from '../Icons/Icons'
import styles from './CodeBlock.module.css'

export default function CodeBlock({ label, code, resetTime = 1400, className, ...rest }) {
    const [copied, setCopied] = React.useState(false)
    const resetTimerRef = React.useRef(null)
    const isMountedRef = React.useRef(true)

    React.useEffect(() => {
        isMountedRef.current = true

        return () => {
            isMountedRef.current = false
            clearTimeout(resetTimerRef.current)
        }
    }, [])

    async function copy() {
        try {
            await navigator.clipboard.writeText(code)
        } catch {
            return
        }

        if (!isMountedRef.current) return

        setCopied(true)
        clearTimeout(resetTimerRef.current)
        resetTimerRef.current = setTimeout(() => setCopied(false), resetTime)
    }

    const codeBlockClass = classNames(styles.codeBlock, className)
    const name = label ?? 'terminal'

    return (
        <div {...rest} className={codeBlockClass} data-disenuio=''>
            <div className={styles.header}>
                <span>{name}</span>
                <button className={styles.copyButton} type='button' onClick={copy}>
                    {copied ? (
                        <CheckIcon className={styles.icon} />
                    ) : (
                        <CopyIcon className={styles.icon} />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
                <span role='status' className={a11y.srOnly}>
                    {copied ? 'Copied to clipboard' : ''}
                </span>
            </div>
            <section className={styles.codePanel} tabIndex={0} aria-label={`${name} code`}>
                <pre style={{ margin: 0, padding: 0, whiteSpace: 'inherit' }}>
                    <code>{code}</code>
                </pre>
            </section>
        </div>
    )
}
