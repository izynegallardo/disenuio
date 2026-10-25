import React from 'react'
import { classNames } from '../../utils/classNames'
import { CheckIcon, CopyIcon } from '../Icons/Icons'
import styles from './CodeBlock.module.css'

export default function CodeBlock({ label, code, className, ...rest }) {
    const [copied, setCopied] = React.useState(false)

    function copy() {
        navigator.clipboard?.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 1400)
    }

    const codeBlockClass = classNames(styles.codeBlock, className)

    return (
        <div {...rest} className={codeBlockClass}>
            <div className={styles.header}>
                <span>{label ?? 'terminal'}</span>
                <button className={styles.copyButton} type='button' onClick={copy}>
                    {copied ? (
                        <CheckIcon className={styles.icon} />
                    ) : (
                        <CopyIcon className={styles.icon} />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre className={styles.codePanel}>
                <code>{code}</code>
            </pre>
        </div>
    )
}
