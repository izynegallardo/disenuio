import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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

        expect(button).toHaveClass(styles.button, styles.solid, styles.medium)
        expect(button).not.toHaveClass(styles.outline, styles.ghost)
    })

    it.each([
        ['solid', 'small'],
        ['outline', 'medium'],
        ['ghost', 'large'],
    ])('applies the %s variant and the %s size', (variant, size) => {
        // toHaveClass ignores undefined, so a renamed class would pass without this check.
        expect(styles[variant]).toBeDefined()
        expect(styles[size]).toBeDefined()

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

    describe('promise handling', () => {
        const STATUS_DURATION_MS = 1500

        function deferred() {
            let resolve
            let reject
            const promise = new Promise((res, rej) => {
                resolve = res
                reject = rej
            })

            return { promise, resolve, reject }
        }

        beforeEach(() => {
            vi.useFakeTimers()
        })

        afterEach(() => {
            vi.useRealTimers()
        })

        it('stays a single plain button when onClick is synchronous', () => {
            const { container } = render(<Button onClick={() => {}}>Save</Button>)

            fireEvent.click(screen.getByRole('button'))

            expect(container.children).toHaveLength(1)
            expect(screen.queryByRole('status')).not.toBeInTheDocument()
            expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy')
        })

        it('shows a loading state while the promise is pending', () => {
            const { promise } = deferred()
            render(<Button onClick={() => promise}>Save</Button>)

            fireEvent.click(screen.getByRole('button'))

            expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
            expect(screen.getByRole('button')).toHaveClass(styles.isLoading)
            expect(screen.getByRole('status')).toHaveTextContent('Loading')
        })

        it('ignores extra clicks while busy', () => {
            const { promise } = deferred()
            const onClick = vi.fn(() => promise)
            render(<Button onClick={onClick}>Save</Button>)

            fireEvent.click(screen.getByRole('button'))
            fireEvent.click(screen.getByRole('button'))

            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('shows success when the promise resolves, then goes back to idle', async () => {
            const { promise, resolve } = deferred()
            render(<Button onClick={() => promise}>Save</Button>)

            fireEvent.click(screen.getByRole('button'))
            await act(async () => resolve())

            expect(screen.getByRole('button')).toHaveClass(styles.buttonSuccess)
            expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy')
            expect(screen.getByRole('status')).toHaveTextContent('Success')

            act(() => vi.advanceTimersByTime(STATUS_DURATION_MS))

            expect(screen.getByRole('button')).not.toHaveClass(styles.buttonSuccess)
            expect(screen.getByRole('status')).toBeEmptyDOMElement()
        })

        it('shows error when the promise rejects, then goes back to idle', async () => {
            const { promise, reject } = deferred()
            render(<Button onClick={() => promise}>Save</Button>)

            fireEvent.click(screen.getByRole('button'))
            await act(async () => reject(new Error('nope')))

            expect(screen.getByRole('button')).toHaveClass(styles.buttonError)
            expect(screen.getByRole('status')).toHaveTextContent('Error')

            act(() => vi.advanceTimersByTime(STATUS_DURATION_MS))

            expect(screen.getByRole('button')).not.toHaveClass(styles.buttonError)
        })

        it('can be clicked again once it is idle', async () => {
            const onClick = vi.fn(() => Promise.resolve())
            render(<Button onClick={onClick}>Save</Button>)

            fireEvent.click(screen.getByRole('button'))
            await act(async () => {})
            act(() => vi.advanceTimersByTime(STATUS_DURATION_MS))
            fireEvent.click(screen.getByRole('button'))

            expect(onClick).toHaveBeenCalledTimes(2)
        })

        it('keeps the label in the DOM while busy so the width does not change', () => {
            const { promise } = deferred()
            render(<Button onClick={() => promise}>Save</Button>)

            fireEvent.click(screen.getByRole('button'))

            expect(screen.getByText('Save')).toHaveClass(styles.isHidden)
        })

        it('uses statusDuration for how long the result stays', async () => {
            render(
                <Button onClick={() => Promise.resolve()} statusDuration={500}>
                    Save
                </Button>,
            )

            fireEvent.click(screen.getByRole('button'))
            await act(async () => {})

            expect(screen.getByRole('button')).toHaveClass(styles.buttonSuccess)

            act(() => vi.advanceTimersByTime(500))

            expect(screen.getByRole('button')).not.toHaveClass(styles.buttonSuccess)
        })

        it('accepts custom labels for other languages', () => {
            const { promise } = deferred()
            render(
                <Button onClick={() => promise} loadingLabel='Cargando'>
                    Guardar
                </Button>,
            )

            fireEvent.click(screen.getByRole('button'))

            expect(screen.getByRole('status')).toHaveTextContent('Cargando')
        })

        it('does not throw when it unmounts before the promise settles', async () => {
            const { promise, resolve } = deferred()
            const { unmount } = render(<Button onClick={() => promise}>Save</Button>)

            fireEvent.click(screen.getByRole('button'))
            unmount()

            await act(async () => resolve())
            act(() => vi.advanceTimersByTime(STATUS_DURATION_MS))
        })
    })
})
