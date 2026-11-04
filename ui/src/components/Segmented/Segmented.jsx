import React from 'react'
import { classNames } from '../../utils/classNames'
import styles from './Segmented.module.css'

// An option is a plain value ('small') or an object ({ value: 'small', label: 'Small' }).
function toOption(option) {
    return typeof option === 'object' && option !== null ? option : { value: option, label: option }
}

export default function Segmented({
    value,
    options,
    onChange, // (value) => void
    disabled = false,
    label,
    className,
    ...rest
}) {
    const optionRefs = React.useRef([])

    const items = options.map(toOption)
    const selectedIndex = items.findIndex((item) => item.value === value)

    // Radio group pattern: only one button is in the tab order, arrow keys move between them.
    const tabStopIndex = selectedIndex === -1 ? 0 : selectedIndex

    function select(index) {
        onChange?.(items[index].value)
        optionRefs.current[index]?.focus()
    }

    function handleKeyDown(event, index) {
        const last = items.length - 1
        let next

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            next = index === last ? 0 : index + 1
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            next = index === 0 ? last : index - 1
        } else if (event.key === 'Home') {
            next = 0
        } else if (event.key === 'End') {
            next = last
        } else {
            return
        }

        event.preventDefault()
        select(next)
    }

    const segmentedClass = classNames(styles.segmented, className)

    return (
        <div
            role='radiogroup'
            aria-label={label}
            aria-disabled={disabled || undefined}
            {...rest}
            className={segmentedClass}
            data-disenuio=''
        >
            {items.map((item, index) => {
                const isSelected = index === selectedIndex
                const optionClass = classNames(styles.option, isSelected && styles.isSelected)

                return (
                    // A radio group of buttons with a roving tab stop, styled as one control.
                    // biome-ignore lint/a11y/useSemanticElements: ARIA radio group pattern on buttons
                    <button
                        key={String(item.value)}
                        ref={(node) => {
                            optionRefs.current[index] = node
                        }}
                        type='button'
                        role='radio'
                        aria-checked={isSelected}
                        tabIndex={index === tabStopIndex ? 0 : -1}
                        disabled={disabled}
                        className={optionClass}
                        onClick={() => onChange?.(item.value)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                    >
                        {item.label}
                    </button>
                )
            })}
        </div>
    )
}
