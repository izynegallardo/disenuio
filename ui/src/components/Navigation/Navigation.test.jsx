import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Navbar from './Navbar'
import styles from './Navbar.module.css'

function Example(props) {
    return (
        <Navbar {...props}>
            <Navbar.Brand href='/'>disenUIo</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Menu>
                <Navbar.Links label='Main'>
                    <Navbar.Link href='#samples'>Samples</Navbar.Link>
                    <Navbar.Link href='#docs' current>
                        Docs
                    </Navbar.Link>
                </Navbar.Links>
                <Navbar.Actions>
                    <a href='https://github.com'>GitHub</a>
                </Navbar.Actions>
            </Navbar.Menu>
        </Navbar>
    )
}

const getToggle = () => screen.getByRole('button', { name: 'Menu' })

describe('Navbar', () => {
    describe('structure', () => {
        it('is a banner with a labelled navigation of links', () => {
            render(<Example />)

            expect(screen.getByRole('banner')).toBeInTheDocument()
            expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument()
            expect(screen.getAllByRole('listitem')).toHaveLength(2)
            expect(screen.getByRole('link', { name: 'Samples' })).toHaveAttribute(
                'href',
                '#samples',
            )
        })

        it('renders the brand as a link', () => {
            render(<Example />)

            expect(screen.getByRole('link', { name: 'disenUIo' })).toHaveAttribute('href', '/')
        })

        it('marks the current link for assistive technology', () => {
            render(<Example />)

            expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
                'aria-current',
                'page',
            )
            expect(screen.getByRole('link', { name: 'Samples' })).not.toHaveAttribute(
                'aria-current',
            )
        })

        it('keeps the actions inside the menu', () => {
            render(<Example />)

            const menu = document.getElementById(getToggle().getAttribute('aria-controls'))

            expect(menu).toContainElement(screen.getByRole('link', { name: 'GitHub' }))
            expect(menu).toContainElement(screen.getByRole('navigation', { name: 'Main' }))
        })

        it('is sticky unless told otherwise', () => {
            const { rerender } = render(<Example />)

            expect(screen.getByRole('banner')).toHaveClass(styles.navbar, styles.sticky)

            rerender(<Example sticky={false} />)

            expect(screen.getByRole('banner')).not.toHaveClass(styles.sticky)
        })

        it('merges a custom className and forwards attributes', () => {
            render(<Example className='customClass' id='site-header' />)

            expect(screen.getByRole('banner')).toHaveClass(styles.navbar, 'customClass')
            expect(screen.getByRole('banner')).toHaveAttribute('id', 'site-header')
        })

        it('lets links and the brand render as another element', () => {
            render(
                <Navbar>
                    <Navbar.Brand as='div'>Logo</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Menu>
                        <Navbar.Links>
                            <Navbar.Link as='button' type='button'>
                                Pricing
                            </Navbar.Link>
                        </Navbar.Links>
                    </Navbar.Menu>
                </Navbar>,
            )

            expect(screen.getByText('Logo').tagName).toBe('DIV')
            expect(screen.getByRole('button', { name: 'Pricing' })).toBeInTheDocument()
        })

        it('throws when a part is used outside a Navbar', () => {
            const error = vi.spyOn(console, 'error').mockImplementation(() => {})

            expect(() => render(<Navbar.Toggle />)).toThrow('inside <Navbar>')

            error.mockRestore()
        })
    })

    describe('toggle', () => {
        it('starts closed and points at the menu it controls', () => {
            render(<Example />)

            expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
            expect(document.getElementById(getToggle().getAttribute('aria-controls'))).toHaveClass(
                styles.menu,
            )
            expect(screen.getByRole('banner')).not.toHaveClass(styles.isOpen)
        })

        it('opens and closes the menu', async () => {
            const user = userEvent.setup()
            render(<Example />)

            await user.click(getToggle())

            expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
            expect(screen.getByRole('banner')).toHaveClass(styles.isOpen)

            await user.click(getToggle())

            expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
            expect(screen.getByRole('banner')).not.toHaveClass(styles.isOpen)
        })

        it('opens from the keyboard', async () => {
            const user = userEvent.setup()
            render(<Example />)

            await user.tab()
            await user.tab()
            await user.keyboard('{Enter}')

            expect(getToggle()).toHaveFocus()
            expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
        })

        it('accepts a custom label and still calls a consumer onClick', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            render(
                <Navbar>
                    <Navbar.Toggle label='Open navigation' onClick={onClick} />
                    <Navbar.Menu />
                </Navbar>,
            )

            await user.click(screen.getByRole('button', { name: 'Open navigation' }))

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(screen.getByRole('banner')).toHaveClass(styles.isOpen)
        })
    })

    describe('closing', () => {
        it('closes with Escape and returns focus to the toggle', async () => {
            const user = userEvent.setup()
            render(<Example />)

            await user.click(getToggle())
            await user.tab()

            expect(screen.getByRole('link', { name: 'Samples' })).toHaveFocus()

            await user.keyboard('{Escape}')

            expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
            expect(getToggle()).toHaveFocus()
        })

        it('closes when a link is followed, and still calls its onClick', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            render(
                <Navbar>
                    <Navbar.Toggle />
                    <Navbar.Menu>
                        <Navbar.Links>
                            <Navbar.Link href='#samples' onClick={onClick}>
                                Samples
                            </Navbar.Link>
                        </Navbar.Links>
                    </Navbar.Menu>
                </Navbar>,
            )

            await user.click(getToggle())
            await user.click(screen.getByRole('link', { name: 'Samples' }))

            expect(onClick).toHaveBeenCalledTimes(1)
            expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
        })

        it('closes when clicking outside', async () => {
            const user = userEvent.setup()
            render(
                <>
                    <Example />
                    <button type='button'>Outside</button>
                </>,
            )

            await user.click(getToggle())
            await user.click(screen.getByRole('button', { name: 'Outside' }))

            expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
        })

        it('stays open when clicking inside the menu', async () => {
            const user = userEvent.setup()
            render(<Example />)

            await user.click(getToggle())
            await user.click(screen.getByRole('link', { name: 'GitHub' }))

            expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
        })

        describe('when the screen grows to the wide layout', () => {
            afterEach(() => {
                delete window.matchMedia
            })

            it('closes the menu', async () => {
                const user = userEvent.setup()
                const listeners = new Set()
                window.matchMedia = vi.fn(() => ({
                    matches: false,
                    addEventListener: (_event, listener) => listeners.add(listener),
                    removeEventListener: (_event, listener) => listeners.delete(listener),
                }))
                render(<Example />)

                await user.click(getToggle())
                act(() => listeners.forEach((listener) => listener({ matches: true })))

                expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
            })
        })
    })
})
