import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import Segmented from './Segmented'
import styles from './Segmented.module.css'

const OPTIONS = ['sm', 'md', 'lg']

function Harness({ initial = 'md', options = OPTIONS, onChange }) {
    const [value, setValue] = React.useState(initial)

    function handleChange(next) {
        setValue(next)
        onChange?.(next)
    }

    return <Segmented label='Size' value={value} options={options} onChange={handleChange} />
}

describe('Segmented', () => {
    describe('semantics', () => {
        it('is a named radio group with one radio per option', () => {
            render(<Harness />)

            expect(screen.getByRole('radiogroup', { name: 'Size' })).toBeInTheDocument()
            expect(screen.getAllByRole('radio')).toHaveLength(3)
        })

        it('marks only the matching option as checked', () => {
            render(<Harness initial='md' />)

            expect(screen.getByRole('radio', { name: 'md' })).toBeChecked()
            expect(screen.getByRole('radio', { name: 'sm' })).not.toBeChecked()
            expect(screen.getByRole('radio', { name: 'lg' })).not.toBeChecked()
        })

        it('styles the selected option', () => {
            render(<Harness initial='md' />)

            expect(screen.getByRole('radio', { name: 'md' })).toHaveClass(styles.isSelected)
            expect(screen.getByRole('radio', { name: 'sm' })).not.toHaveClass(styles.isSelected)
        })

        it('has no checked option when the value matches nothing', () => {
            render(<Segmented label='Size' value='xl' options={OPTIONS} onChange={vi.fn()} />)

            expect(screen.queryByRole('radio', { checked: true })).not.toBeInTheDocument()
        })
    })

    describe('options', () => {
        it('shows the label of an option object and reports its value', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            const options = [
                { value: 'monthly', label: 'Monthly' },
                { value: 'yearly', label: 'Yearly' },
            ]
            render(<Segmented value='monthly' options={options} onChange={onChange} />)

            await user.click(screen.getByRole('radio', { name: 'Yearly' }))

            expect(onChange).toHaveBeenCalledWith('yearly')
        })
    })

    describe('mouse', () => {
        it('calls onChange with the clicked value', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Harness onChange={onChange} />)

            await user.click(screen.getByRole('radio', { name: 'lg' }))

            expect(onChange).toHaveBeenCalledWith('lg')
            expect(screen.getByRole('radio', { name: 'lg' })).toBeChecked()
        })

        it('does not crash without an onChange', async () => {
            const user = userEvent.setup()
            render(<Segmented value='md' options={OPTIONS} />)

            await user.click(screen.getByRole('radio', { name: 'lg' }))

            expect(screen.getByRole('radio', { name: 'md' })).toBeChecked()
        })
    })

    describe('keyboard', () => {
        it('puts only the selected option in the tab order', () => {
            render(<Harness initial='md' />)

            expect(screen.getByRole('radio', { name: 'md' })).toHaveAttribute('tabindex', '0')
            expect(screen.getByRole('radio', { name: 'sm' })).toHaveAttribute('tabindex', '-1')
            expect(screen.getByRole('radio', { name: 'lg' })).toHaveAttribute('tabindex', '-1')
        })

        it('falls back to the first option when nothing is selected', () => {
            render(<Segmented value='xl' options={OPTIONS} onChange={vi.fn()} />)

            expect(screen.getByRole('radio', { name: 'sm' })).toHaveAttribute('tabindex', '0')
        })

        it('moves with the arrow keys and wraps around', async () => {
            const user = userEvent.setup()
            render(<Harness initial='md' />)

            await user.tab()
            await user.keyboard('{ArrowRight}')

            expect(screen.getByRole('radio', { name: 'lg' })).toBeChecked()
            expect(screen.getByRole('radio', { name: 'lg' })).toHaveFocus()

            await user.keyboard('{ArrowRight}')

            expect(screen.getByRole('radio', { name: 'sm' })).toBeChecked()

            await user.keyboard('{ArrowLeft}')

            expect(screen.getByRole('radio', { name: 'lg' })).toBeChecked()
        })

        it('jumps to the first and last option with Home and End', async () => {
            const user = userEvent.setup()
            render(<Harness initial='md' />)

            await user.tab()
            await user.keyboard('{End}')

            expect(screen.getByRole('radio', { name: 'lg' })).toBeChecked()

            await user.keyboard('{Home}')

            expect(screen.getByRole('radio', { name: 'sm' })).toBeChecked()
        })

        it('ignores other keys', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Harness onChange={onChange} />)

            await user.tab()
            await user.keyboard('a')

            expect(onChange).not.toHaveBeenCalled()
        })
    })

    describe('disabled', () => {
        it('disables every option and ignores clicks', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(
                <Segmented
                    value='md'
                    options={OPTIONS}
                    onChange={onChange}
                    disabled
                    label='Size'
                />,
            )

            await user.click(screen.getByRole('radio', { name: 'lg' }))

            for (const radio of screen.getAllByRole('radio')) expect(radio).toBeDisabled()
            expect(onChange).not.toHaveBeenCalled()
        })
    })

    it('merges a custom className with the built-in class', () => {
        render(<Segmented value='md' options={OPTIONS} className='customClass' />)

        expect(screen.getByRole('radiogroup')).toHaveClass(styles.segmented, 'customClass')
    })
})
