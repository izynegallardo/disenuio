import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import Dropdown from './Dropdown'
import styles from './Dropdown.module.css'

const OPTIONS = ['info', 'success', 'warning', 'error']

function Harness({ initial = null, onChange, ...rest }) {
    const [value, setValue] = React.useState(initial)

    function handleChange(next) {
        setValue(next)
        onChange?.(next)
    }

    return <Dropdown label='Status' options={OPTIONS} value={value} onChange={handleChange} {...rest} />
}

const getTrigger = () => screen.getByRole('combobox', { name: 'Status' })

describe('Dropdown', () => {
    describe('closed', () => {
        it('is a collapsed combobox named by its label', () => {
            render(<Harness />)

            expect(getTrigger()).toHaveAttribute('aria-expanded', 'false')
            expect(getTrigger()).toHaveAttribute('aria-haspopup', 'listbox')
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })

        it('shows the placeholder until something is chosen', () => {
            render(<Harness placeholder='Pick a status' />)

            expect(getTrigger()).toHaveTextContent('Pick a status')
            expect(screen.getByText('Pick a status')).toHaveClass(styles.placeholder)
        })

        it('shows the label of the chosen option', () => {
            render(<Harness initial='warning' />)

            expect(getTrigger()).toHaveTextContent('warning')
            expect(getTrigger()).not.toHaveTextContent('Select an option')
        })

        it('does not open when disabled', async () => {
            const user = userEvent.setup()
            render(<Harness disabled />)

            await user.click(getTrigger())

            expect(getTrigger()).toBeDisabled()
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })

        it('does not open without options', async () => {
            const user = userEvent.setup()
            render(<Dropdown label='Status' options={[]} />)

            await user.click(getTrigger())

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })
    })

    describe('mouse', () => {
        it('opens a listbox with every option', async () => {
            const user = userEvent.setup()
            render(<Harness />)

            await user.click(getTrigger())

            expect(getTrigger()).toHaveAttribute('aria-expanded', 'true')
            expect(screen.getByRole('listbox', { name: 'Status' })).toBeInTheDocument()
            expect(screen.getAllByRole('option')).toHaveLength(4)
        })

        it('marks the chosen option as selected', async () => {
            const user = userEvent.setup()
            render(<Harness initial='warning' />)

            await user.click(getTrigger())

            expect(screen.getByRole('option', { name: 'warning' })).toHaveAttribute(
                'aria-selected',
                'true',
            )
            expect(screen.getByRole('option', { name: 'info' })).toHaveAttribute(
                'aria-selected',
                'false',
            )
        })

        it('closes when the trigger is clicked again', async () => {
            const user = userEvent.setup()
            render(<Harness />)

            await user.click(getTrigger())
            await user.click(getTrigger())

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })

        it('chooses an option, closes, and keeps focus on the trigger', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Harness onChange={onChange} />)

            await user.click(getTrigger())
            await user.click(screen.getByRole('option', { name: 'success' }))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenCalledWith('success')
            expect(getTrigger()).toHaveTextContent('success')
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
            expect(getTrigger()).toHaveFocus()
        })

        it('does not call onChange when the same option is chosen again', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Harness initial='info' onChange={onChange} />)

            await user.click(getTrigger())
            await user.click(screen.getByRole('option', { name: 'info' }))

            expect(onChange).not.toHaveBeenCalled()
        })

        it('closes when clicking outside', async () => {
            const user = userEvent.setup()
            render(
                <>
                    <Harness />
                    <button type='button'>Outside</button>
                </>,
            )

            await user.click(getTrigger())
            await user.click(screen.getByRole('button', { name: 'Outside' }))

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })
    })

    describe('keyboard', () => {
        it.each(['{ArrowDown}', '{ArrowUp}', '{Enter}', ' '])('opens with %j', async (key) => {
            const user = userEvent.setup()
            render(<Harness />)

            await user.tab()
            await user.keyboard(key)

            expect(getTrigger()).toHaveAttribute('aria-expanded', 'true')
        })

        it('starts on the chosen option, or the first one', async () => {
            const user = userEvent.setup()
            const { unmount } = render(<Harness />)

            await user.tab()
            await user.keyboard('{ArrowDown}')

            expect(getTrigger()).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', { name: 'info' }).id,
            )

            unmount()
            render(<Harness initial='warning' />)

            await user.tab()
            await user.keyboard('{ArrowDown}')

            expect(getTrigger()).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', { name: 'warning' }).id,
            )
        })

        it('moves with the arrow keys and wraps around', async () => {
            const user = userEvent.setup()
            render(<Harness />)

            await user.tab()
            await user.keyboard('{ArrowDown}{ArrowDown}')

            expect(getTrigger()).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', { name: 'success' }).id,
            )

            await user.keyboard('{ArrowUp}{ArrowUp}')

            expect(getTrigger()).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', { name: 'error' }).id,
            )
        })

        it('jumps with Home and End', async () => {
            const user = userEvent.setup()
            render(<Harness initial='success' />)

            await user.tab()
            await user.keyboard('{ArrowDown}{End}')

            expect(getTrigger()).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', { name: 'error' }).id,
            )

            await user.keyboard('{Home}')

            expect(getTrigger()).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', { name: 'info' }).id,
            )
        })

        it.each(['{Enter}', ' '])('chooses the highlighted option with %j', async (key) => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Harness onChange={onChange} />)

            await user.tab()
            await user.keyboard('{ArrowDown}{ArrowDown}')
            await user.keyboard(key)

            expect(onChange).toHaveBeenCalledWith('success')
            expect(getTrigger()).toHaveTextContent('success')
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        })

        it('closes with Escape and changes nothing', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Harness initial='info' onChange={onChange} />)

            await user.tab()
            await user.keyboard('{ArrowDown}{ArrowDown}{Escape}')

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
            expect(getTrigger()).toHaveTextContent('info')
            expect(getTrigger()).toHaveFocus()
            expect(onChange).not.toHaveBeenCalled()
        })

        it('closes with Tab and changes nothing', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Harness onChange={onChange} />)

            await user.tab()
            await user.keyboard('{ArrowDown}{ArrowDown}')
            await user.tab()

            expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
            expect(onChange).not.toHaveBeenCalled()
        })

        it('jumps to the option that starts with the typed letters', async () => {
            const user = userEvent.setup()
            render(<Harness />)

            await user.tab()
            await user.keyboard('{ArrowDown}w')

            expect(getTrigger()).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', { name: 'warning' }).id,
            )
        })

        it('cycles through options that share a first letter', async () => {
            const user = userEvent.setup()
            render(<Harness options={['apple', 'apricot', 'banana']} />)

            await user.tab()
            await user.keyboard('{ArrowDown}')
            await user.keyboard('a')

            expect(getTrigger()).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', { name: 'apricot' }).id,
            )
        })
    })

    describe('options', () => {
        it('shows the label of an option object and reports its value', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            const options = [
                { value: 'sm', label: 'Small' },
                { value: 'lg', label: 'Large' },
            ]
            render(<Harness options={options} onChange={onChange} />)

            await user.click(getTrigger())
            await user.click(screen.getByRole('option', { name: 'Large' }))

            expect(onChange).toHaveBeenCalledWith('lg')
            expect(getTrigger()).toHaveTextContent('Large')
        })

        it('treats an empty string as a real value', async () => {
            const user = userEvent.setup()
            const options = [
                { value: '', label: 'default' },
                { value: 'blue', label: 'blue' },
            ]
            render(<Harness initial='' options={options} />)

            expect(getTrigger()).toHaveTextContent('default')

            await user.click(getTrigger())

            expect(screen.getByRole('option', { name: 'default' })).toHaveAttribute(
                'aria-selected',
                'true',
            )
        })
    })

    describe('uncontrolled', () => {
        it('starts at defaultValue and updates itself', async () => {
            const user = userEvent.setup()
            render(<Dropdown label='Status' options={OPTIONS} defaultValue='info' />)

            expect(getTrigger()).toHaveTextContent('info')

            await user.click(getTrigger())
            await user.click(screen.getByRole('option', { name: 'error' }))

            expect(getTrigger()).toHaveTextContent('error')
        })
    })

    describe('forms and styling', () => {
        it('renders a hidden input with the value when it has a name', () => {
            const { container } = render(
                <Dropdown label='Status' options={OPTIONS} defaultValue='success' name='status' />,
            )

            expect(container.querySelector('input[type="hidden"]')).toHaveValue('success')
            expect(container.querySelector('input[type="hidden"]')).toHaveAttribute('name', 'status')
        })

        it('renders no hidden input without a name', () => {
            const { container } = render(<Dropdown label='Status' options={OPTIONS} />)

            expect(container.querySelector('input')).not.toBeInTheDocument()
        })

        it('forwards attributes to the trigger', () => {
            render(<Harness id='status-dropdown' aria-invalid='true' />)

            expect(getTrigger()).toHaveAttribute('id', 'status-dropdown')
            expect(getTrigger()).toBeInvalid()
        })

        it('merges a custom className on the wrapper', () => {
            const { container } = render(
                <Dropdown label='Status' options={OPTIONS} className='customClass' />,
            )

            expect(container.firstChild).toHaveClass(styles.dropdown, 'customClass')
        })
    })
})
