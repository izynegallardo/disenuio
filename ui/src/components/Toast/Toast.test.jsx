import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Toast from './Toast'

// jsdom never fires `animationend`, so a closing toast is removed by the hook's fallback timer.
const EXIT_FALLBACK_MS = 1000
const MIN_DURATION_MS = 1000

function advance(ms) {
    act(() => {
        vi.advanceTimersByTime(ms)
    })
}

describe('Toast', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    describe('semantics', () => {
        it('is a polite status by default', () => {
            render(<Toast message='Saved' />)

            expect(screen.getByRole('status')).toHaveTextContent('Saved')
        })

        it.each(['error', 'warning'])('is an alert for the %s type', (type) => {
            render(<Toast type={type} message='Careful' />)

            expect(screen.getByRole('alert')).toHaveTextContent('Careful')
        })

        it.each(['success', 'info'])('stays a status for the %s type', (type) => {
            render(<Toast type={type} message='Fine' />)

            expect(screen.getByRole('status')).toBeInTheDocument()
            expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })

        it('lets the consumer override the role', () => {
            render(<Toast type='error' role='status' message='Careful' />)

            expect(screen.getByRole('status')).toBeInTheDocument()
        })

        it('does not render an empty title element', () => {
            const { container } = render(<Toast message='Only a message' />)

            // The message is the only paragraph, the title slot renders nothing.
            expect(container.querySelectorAll('p')).toHaveLength(1)
        })
    })

    describe('status label', () => {
        it.each([
            ['success', 'Success'],
            ['warning', 'Warning'],
            ['error', 'Error'],
            ['info', 'Information'],
        ])('announces the %s type as text', (type, label) => {
            render(<Toast type={type} message='Hello' />)

            expect(screen.getByText(label)).toBeInTheDocument()
        })

        it('has no status text without a type', () => {
            render(<Toast message='Hello' />)

            expect(screen.getByRole('status')).not.toHaveTextContent(
                /Success|Warning|Error|Information/,
            )
        })

        it('accepts a custom label for other languages', () => {
            render(<Toast type='success' statusLabel='Listo' message='Hello' />)

            expect(screen.getByText('Listo')).toBeInTheDocument()
            expect(screen.queryByText('Success')).not.toBeInTheDocument()
        })

        it('can be turned off with an empty label', () => {
            render(<Toast type='success' statusLabel='' message='Hello' />)

            expect(screen.queryByText('Success')).not.toBeInTheDocument()
        })
    })

    describe('close button', () => {
        it('has an accessible name', () => {
            render(<Toast message='Hello' closeButton />)

            expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
        })

        it('accepts a custom name', () => {
            render(<Toast message='Hello' closeButton closeLabel='Cerrar' />)

            expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument()
        })

        it('closes the toast and calls onClose once', () => {
            const onClose = vi.fn()
            render(<Toast message='Hello' closeButton onClose={onClose} />)

            fireEvent.click(screen.getByRole('button', { name: 'Close' }))
            advance(EXIT_FALLBACK_MS)

            expect(screen.queryByText('Hello')).not.toBeInTheDocument()
            expect(onClose).toHaveBeenCalledTimes(1)
        })
    })

    describe('action', () => {
        it('runs the action and then closes the toast', () => {
            const onClick = vi.fn()
            render(<Toast message='Deleted' action={{ label: 'Undo', onClick }} />)

            fireEvent.click(screen.getByRole('button', { name: 'Undo' }))
            advance(EXIT_FALLBACK_MS)

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(screen.queryByText('Deleted')).not.toBeInTheDocument()
        })

        it('renders no action button without a label', () => {
            render(<Toast message='Hello' action={{ onClick: vi.fn() }} />)

            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })
    })

    describe('keyboard', () => {
        it('closes on Escape while focus is inside the toast', () => {
            const onClose = vi.fn()
            render(<Toast message='Hello' closeButton onClose={onClose} />)

            fireEvent.keyDown(screen.getByRole('button', { name: 'Close' }), { key: 'Escape' })
            advance(EXIT_FALLBACK_MS)

            expect(screen.queryByText('Hello')).not.toBeInTheDocument()
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('ignores other keys', () => {
            render(<Toast message='Hello' closeButton />)

            fireEvent.keyDown(screen.getByRole('button', { name: 'Close' }), { key: 'a' })
            advance(EXIT_FALLBACK_MS)

            expect(screen.getByText('Hello')).toBeInTheDocument()
        })

        it('still calls a consumer onKeyDown', () => {
            const onKeyDown = vi.fn()
            render(<Toast message='Hello' onKeyDown={onKeyDown} />)

            fireEvent.keyDown(screen.getByRole('status'), { key: 'a' })

            expect(onKeyDown).toHaveBeenCalledTimes(1)
        })
    })

    describe('auto dismiss', () => {
        it('closes by itself after its duration', () => {
            render(<Toast message='Hello' duration={MIN_DURATION_MS} />)

            advance(MIN_DURATION_MS)
            advance(EXIT_FALLBACK_MS)

            expect(screen.queryByText('Hello')).not.toBeInTheDocument()
        })

        it('pauses while hovered and resumes afterwards', () => {
            render(<Toast message='Hello' duration={MIN_DURATION_MS} />)
            const toast = screen.getByRole('status')

            fireEvent.mouseEnter(toast)
            advance(10_000)

            expect(screen.getByText('Hello')).toBeInTheDocument()

            fireEvent.mouseLeave(toast)
            advance(MIN_DURATION_MS)
            advance(EXIT_FALLBACK_MS)

            expect(screen.queryByText('Hello')).not.toBeInTheDocument()
        })

        it('pauses while keyboard focus is inside and resumes on blur', () => {
            render(<Toast message='Hello' duration={MIN_DURATION_MS} closeButton />)
            const button = screen.getByRole('button', { name: 'Close' })

            act(() => button.focus())
            advance(10_000)

            expect(screen.getByText('Hello')).toBeInTheDocument()

            act(() => button.blur())
            advance(MIN_DURATION_MS)
            advance(EXIT_FALLBACK_MS)

            expect(screen.queryByText('Hello')).not.toBeInTheDocument()
        })

        it('does not pause when pauseOnHover is off', () => {
            render(<Toast message='Hello' duration={MIN_DURATION_MS} pauseOnHover={false} />)

            fireEvent.mouseEnter(screen.getByRole('status'))
            advance(MIN_DURATION_MS)
            advance(EXIT_FALLBACK_MS)

            expect(screen.queryByText('Hello')).not.toBeInTheDocument()
        })
    })

    describe('open', () => {
        it('closes with its exit step when open becomes false', () => {
            const onClose = vi.fn()
            const { rerender } = render(<Toast message='Hello' onClose={onClose} />)

            rerender(<Toast message='Hello' open={false} onClose={onClose} />)
            advance(EXIT_FALLBACK_MS)

            expect(screen.queryByText('Hello')).not.toBeInTheDocument()
            expect(onClose).toHaveBeenCalledTimes(1)
        })
    })
})
