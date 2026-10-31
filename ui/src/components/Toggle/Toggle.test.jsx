import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import Toggle from './Toggle'
import styles from './Toggle.module.css'

describe('Toggle', () => {
    describe('semantics', () => {
        it('is a switch named by its label', () => {
            render(<Toggle label='Notifications' />)

            expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument()
        })

        it('is off by default', () => {
            render(<Toggle label='Notifications' />)

            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
        })

        it('starts on with initialValue', () => {
            render(<Toggle label='Notifications' initialValue />)

            expect(screen.getByRole('switch')).toBeChecked()
        })

        it('never submits a form by accident', () => {
            render(<Toggle label='Notifications' />)

            expect(screen.getByRole('switch')).toHaveAttribute('type', 'button')
        })

        it('does not put a stray "false" class on the button', () => {
            render(<Toggle label='Notifications' />)

            const toggle = screen.getByRole('switch')

            expect(toggle).toHaveClass(styles.toggle)
            expect(toggle).not.toHaveClass('false')
            expect(toggle).not.toHaveClass(styles.isChecked)
        })
    })

    describe('changing', () => {
        it('turns on and off with a click', async () => {
            const user = userEvent.setup()
            render(<Toggle label='Notifications' />)
            const toggle = screen.getByRole('switch')

            await user.click(toggle)

            expect(toggle).toBeChecked()
            expect(toggle).toHaveClass(styles.isChecked)

            await user.click(toggle)

            expect(toggle).not.toBeChecked()
            expect(toggle).not.toHaveClass(styles.isChecked)
        })

        it.each([['{Enter}'], [' ']])('toggles with the %j key', async (key) => {
            const user = userEvent.setup()
            render(<Toggle label='Notifications' />)

            await user.tab()
            await user.keyboard(key)

            expect(screen.getByRole('switch')).toBeChecked()
        })

        it('calls onChange once with the new value', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Toggle label='Notifications' onChange={onChange} />)

            await user.click(screen.getByRole('switch'))

            expect(onChange).toHaveBeenCalledTimes(1)
            expect(onChange).toHaveBeenLastCalledWith(true)

            await user.click(screen.getByRole('switch'))

            expect(onChange).toHaveBeenCalledTimes(2)
            expect(onChange).toHaveBeenLastCalledWith(false)
        })

        it('does not call onChange on mount, not even in StrictMode', () => {
            const onChange = vi.fn()
            render(
                <StrictMode>
                    <Toggle label='Notifications' onChange={onChange} />
                </StrictMode>,
            )

            expect(onChange).not.toHaveBeenCalled()
        })

        it('does not warn when onChange returns a value', async () => {
            const user = userEvent.setup()
            const error = vi.spyOn(console, 'error').mockImplementation(() => {})
            render(<Toggle label='Notifications' onChange={() => 42} />)

            await user.click(screen.getByRole('switch'))

            expect(error).not.toHaveBeenCalled()
            error.mockRestore()
        })

        it('does nothing when disabled', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(<Toggle label='Notifications' onChange={onChange} disabled />)

            await user.click(screen.getByRole('switch'))

            expect(screen.getByRole('switch')).not.toBeChecked()
            expect(onChange).not.toHaveBeenCalled()
        })
    })

    describe('consumer props', () => {
        it('still calls a consumer onClick', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            render(<Toggle label='Notifications' onClick={onClick} />)

            await user.click(screen.getByRole('switch'))

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(screen.getByRole('switch')).toBeChecked()
        })

        it('lets onClick cancel the change with preventDefault', async () => {
            const user = userEvent.setup()
            const onChange = vi.fn()
            render(
                <Toggle
                    label='Notifications'
                    onChange={onChange}
                    onClick={(event) => event.preventDefault()}
                />,
            )

            await user.click(screen.getByRole('switch'))

            expect(screen.getByRole('switch')).not.toBeChecked()
            expect(onChange).not.toHaveBeenCalled()
        })

        it('merges a custom className with the built-in classes', () => {
            render(<Toggle label='Notifications' className='customClass' />)

            expect(screen.getByRole('switch')).toHaveClass(styles.toggle, 'customClass')
        })

        it('sets the track color through a custom property', () => {
            render(<Toggle label='Notifications' color='#059669' />)

            expect(screen.getByRole('switch').style.getPropertyValue('--disenuio-toggle-color')).toBe(
                '#059669',
            )
        })

        it('keeps a consumer style next to the color', () => {
            render(<Toggle label='Notifications' color='#059669' style={{ marginTop: '4px' }} />)

            expect(screen.getByRole('switch')).toHaveStyle({ marginTop: '4px' })
        })
    })
})
