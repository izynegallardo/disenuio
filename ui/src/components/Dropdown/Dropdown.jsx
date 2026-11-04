import React from 'react'
import { classNames } from '../../utils/classNames'
import { CheckIcon, ChevronDownIcon } from '../Icons/Icons'
import styles from './Dropdown.module.css'

// Keep in step with max-height of .list in the CSS (16rem at the default font size).
const LIST_MAX_HEIGHT = 256
const TYPEAHEAD_RESET_MS = 500

// An option is a plain value ('small') or an object ({ value: 'sm', label: 'Small' }).
function toOption(option) {
    return typeof option === 'object' && option !== null
        ? option
        : { value: option, label: String(option) }
}

/**
 * A select built as a "select-only combobox" (WAI-ARIA): the button keeps focus the whole
 * time and points at the highlighted option with aria-activedescendant.
 *
 * Keys: ArrowDown, ArrowUp, Enter and Space open it. When open: arrows, Home and End move,
 * Enter and Space choose, Escape closes, Tab closes, and typing jumps to a matching option.
 */
export default function Dropdown({
    options,
    value, // controlled. Use defaultValue to leave it uncontrolled. null means nothing is chosen
    defaultValue = null,
    onChange, // (value) => void, only when the choice actually changes
    placeholder = 'Select an option',
    name, // renders a hidden input so the value is part of a form submit
    disabled = false,
    label, // accessible name, or use aria-labelledby
    className,
    ...rest // go to the button: id, aria-labelledby, aria-invalid...
}) {
    const baseId = React.useId()
    const listId = `${baseId}-list`
    const optionId = (index) => `${baseId}-option-${index}`

    const [innerValue, setInnerValue] = React.useState(defaultValue)
    const [isOpen, setIsOpen] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [placement, setPlacement] = React.useState('bottom') // bottom || top

    const rootRef = React.useRef(null)
    const optionRefs = React.useRef([])
    const typeaheadRef = React.useRef({ text: '', timer: null })

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : innerValue
    const items = options.map(toOption)
    const selectedIndex = items.findIndex((item) => item.value === currentValue)
    const selected = items[selectedIndex]

    // Keep the highlighted option visible while moving through a long list.
    React.useEffect(() => {
        if (isOpen) optionRefs.current[activeIndex]?.scrollIntoView?.({ block: 'nearest' })
    }, [isOpen, activeIndex])

    // Clicking or tapping anywhere else closes the list.
    React.useEffect(() => {
        if (!isOpen) return

        function handlePointerDown(event) {
            if (!rootRef.current.contains(event.target)) setIsOpen(false)
        }

        document.addEventListener('pointerdown', handlePointerDown)

        return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [isOpen])

    React.useEffect(() => {
        const typeahead = typeaheadRef.current

        return () => clearTimeout(typeahead.timer)
    }, [])

    function open() {
        if (disabled || items.length === 0) return

        // Open upward when there is no room below but more room above.
        const { top, bottom } = rootRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - bottom

        setPlacement(spaceBelow < LIST_MAX_HEIGHT && top > spaceBelow ? 'top' : 'bottom')
        setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex)
        setIsOpen(true)
    }

    function choose(index) {
        if (!items[index]) return

        const next = items[index].value

        if (next !== currentValue) {
            if (!isControlled) setInnerValue(next)
            onChange?.(next)
        }

        setIsOpen(false)
    }

    // Typing "b" then "a" jumps to the first option starting with "ba". A single letter
    // starts after the highlighted option, so pressing it again cycles through matches.
    function typeahead(character) {
        const state = typeaheadRef.current

        clearTimeout(state.timer)
        state.text += character.toLowerCase()
        state.timer = setTimeout(() => {
            state.text = ''
        }, TYPEAHEAD_RESET_MS)

        const start = state.text.length === 1 ? activeIndex + 1 : activeIndex

        for (let step = 0; step < items.length; step += 1) {
            const index = (start + step) % items.length

            if (String(items[index].label).toLowerCase().startsWith(state.text)) {
                setActiveIndex(index)
                return
            }
        }
    }

    function handleClick() {
        if (isOpen) setIsOpen(false)
        else open()
    }

    function handleKeyDown(event) {
        const last = items.length - 1

        if (!isOpen) {
            if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
                event.preventDefault()
                open()
            }

            return
        }

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault()
                setActiveIndex(activeIndex === last ? 0 : activeIndex + 1)
                break
            case 'ArrowUp':
                event.preventDefault()
                setActiveIndex(activeIndex === 0 ? last : activeIndex - 1)
                break
            case 'Home':
                event.preventDefault()
                setActiveIndex(0)
                break
            case 'End':
                event.preventDefault()
                setActiveIndex(last)
                break
            case 'Enter':
                event.preventDefault()
                choose(activeIndex)
                break
            case 'Escape':
                event.preventDefault()
                setIsOpen(false)
                break
            case 'Tab':
                // Focus moves on as usual. The list just closes, nothing is chosen.
                setIsOpen(false)
                break
            default:
                if (event.key === ' ' && typeaheadRef.current.text === '') {
                    event.preventDefault()
                    choose(activeIndex)
                } else if (
                    event.key.length === 1 &&
                    !event.ctrlKey &&
                    !event.metaKey &&
                    !event.altKey
                ) {
                    event.preventDefault()
                    typeahead(event.key)
                }
        }
    }

    // Space activates a button on key up. It was already handled on key down.
    function handleKeyUp(event) {
        if (event.key === ' ') event.preventDefault()
    }

    function handleBlur(event) {
        if (!rootRef.current.contains(event.relatedTarget)) setIsOpen(false)
    }

    const dropdownClass = classNames(
        styles.dropdown,
        isOpen && styles.isOpen,
        placement === 'top' && styles.placementTop,
        className,
    )

    return (
        <div ref={rootRef} className={dropdownClass} data-disenuio=''>
            <button
                type='button'
                role='combobox'
                aria-haspopup='listbox'
                aria-expanded={isOpen}
                aria-controls={isOpen ? listId : undefined}
                aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
                aria-label={label}
                {...rest}
                disabled={disabled}
                className={styles.trigger}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
            >
                <span className={classNames(styles.value, !selected && styles.placeholder)}>
                    {selected ? selected.label : placeholder}
                </span>
                <ChevronDownIcon className={styles.chevron} />
            </button>
            {isOpen && (
                <div
                    id={listId}
                    role='listbox'
                    aria-label={label}
                    aria-labelledby={rest['aria-labelledby']}
                    className={styles.list}
                >
                    {items.map((item, index) => {
                        const isSelected = index === selectedIndex
                        const optionClass = classNames(
                            styles.option,
                            index === activeIndex && styles.isActive,
                            isSelected && styles.isSelected,
                        )

                        return (
                            // The combobox button handles the keys and points at the option with
                            // aria-activedescendant, so options are focusable but not tab stops.
                            // biome-ignore lint/a11y/useKeyWithClickEvents: keys are handled by the combobox
                            <div
                                key={String(item.value)}
                                ref={(node) => {
                                    optionRefs.current[index] = node
                                }}
                                id={optionId(index)}
                                role='option'
                                tabIndex={-1}
                                aria-selected={isSelected}
                                className={optionClass}
                                // Keeps focus on the button, so the list does not close on press.
                                onMouseDown={(event) => event.preventDefault()}
                                onMouseMove={() => setActiveIndex(index)}
                                onClick={() => choose(index)}
                            >
                                <span>{item.label}</span>
                                {isSelected && <CheckIcon className={styles.check} />}
                            </div>
                        )
                    })}
                </div>
            )}
            {name && <input type='hidden' name={name} value={currentValue ?? ''} />}
        </div>
    )
}
