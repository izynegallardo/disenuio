import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import Button from './Button'
import styles from './Button.module.css'

describe('Button', () => {
    it('renders its children inside a button element', () => {
        render(<Button>Save</Button>)

        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('defaults to type button so it never submits a form by accident', () => {
        render(<Button>Save</Button>)

        expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('allows the type to be overridden', () => {
        render(<Button type='submit'>Send</Button>)

        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })

    it('uses the solid variant and medium size by default', () => {
        render(<Button>Save</Button>)

        const button = screen.getByRole('button')

        expect(button).toHaveClass(styles.button, styles.solid, styles.md)
        expect(button).not.toHaveClass(styles.outline, styles.ghost)
    })

    it.each([
        ['solid', 'sm'],
        ['outline', 'md'],
        ['ghost', 'lg'],
    ])('applies the %s variant and the %s size', (variant, size) => {
        render(
            <Button variant={variant} size={size}>
                Save
            </Button>,
        )

        expect(screen.getByRole('button')).toHaveClass(styles[variant], styles[size])
    })

    it('merges a custom className with the built-in classes', () => {
        render(<Button className='customClass'>Save</Button>)

        expect(screen.getByRole('button')).toHaveClass(styles.button, 'customClass')
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Save</Button>)

        await user.click(screen.getByRole('button'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()
        render(
            <Button onClick={handleClick} disabled>
                Save
            </Button>,
        )

        await user.click(screen.getByRole('button'))

        expect(handleClick).not.toHaveBeenCalled()
    })

    it('forwards native attributes to the button element', () => {
        render(
            <Button id='save-button' aria-label='Save changes' data-testid='save'>
                Save
            </Button>,
        )

        const button = screen.getByRole('button', { name: 'Save changes' })

        expect(button).toHaveAttribute('id', 'save-button')
        expect(button).toHaveAttribute('data-testid', 'save')
    })

    it('forwards a ref to the button element', () => {
        const ref = createRef()
        render(<Button ref={ref}>Save</Button>)

        expect(ref.current).toBe(screen.getByRole('button'))
    })
})
