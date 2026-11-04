import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import Input from './Input'
import styles from './Input.module.css'

function ControlledInput() {
    const [value, setValue] = React.useState('')

    return (
        <Input aria-label='Name' value={value} onChange={(event) => setValue(event.target.value)} />
    )
}

describe('Input', () => {
    it('is a text box by default', () => {
        render(<Input aria-label='Name' />)

        expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('type', 'text')
    })

    it('forwards the type', () => {
        render(<Input aria-label='Email' type='email' />)

        expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'email')
    })

    it('can be typed into when uncontrolled', async () => {
        const user = userEvent.setup()
        render(<Input aria-label='Name' />)

        await user.type(screen.getByRole('textbox'), 'Ada')

        expect(screen.getByRole('textbox')).toHaveValue('Ada')
    })

    it('can be typed into when controlled', async () => {
        const user = userEvent.setup()
        render(<ControlledInput />)

        await user.type(screen.getByRole('textbox'), 'Ada')

        expect(screen.getByRole('textbox')).toHaveValue('Ada')
    })

    it('calls onChange for every change', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()
        render(<Input aria-label='Name' onChange={onChange} />)

        await user.type(screen.getByRole('textbox'), 'Ada')

        expect(onChange).toHaveBeenCalledTimes(3)
    })

    describe('label', () => {
        it('is tied to the input', () => {
            render(<Input label='Email' />)

            expect(screen.getByLabelText('Email')).toBeInTheDocument()
        })

        it('does not become the value of the input', () => {
            render(<Input label='Email' />)

            expect(screen.getByLabelText('Email')).toHaveValue('')
        })

        it('gives every input its own id', () => {
            render(
                <>
                    <Input label='First' />
                    <Input label='Second' />
                </>,
            )

            expect(screen.getByLabelText('First').id).not.toBe(screen.getByLabelText('Second').id)
        })

        it('respects an id from the consumer', () => {
            render(<Input label='Email' id='email-input' />)

            expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email-input')
        })

        it('renders no wrapper without a label', () => {
            const { container } = render(<Input aria-label='Name' />)

            expect(container.firstChild.tagName).toBe('INPUT')
        })
    })

    describe('states', () => {
        it('cannot be typed into when disabled', async () => {
            const user = userEvent.setup()
            render(<Input aria-label='Name' disabled />)

            await user.type(screen.getByRole('textbox'), 'Ada')

            expect(screen.getByRole('textbox')).toHaveValue('')
        })

        it('exposes the invalid state', () => {
            render(<Input aria-label='Name' aria-invalid='true' />)

            expect(screen.getByRole('textbox')).toBeInvalid()
        })
    })

    it('merges a custom className with the built-in class', () => {
        render(<Input aria-label='Name' className='customClass' />)

        expect(screen.getByRole('textbox')).toHaveClass(styles.input, 'customClass')
    })
})
