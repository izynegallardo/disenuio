import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Navigation from './Navigation'
import styles from './Navigation.module.css'

function Example(props) {
    return (
        <Navigation {...props}>
            <Navigation.Brand href='/'>disenUIo</Navigation.Brand>
            <Navigation.Burger />
            <Navigation.Menu>
                <Navigation.Links label='Main'>
                    <Navigation.Link href='#samples'>Samples</Navigation.Link>
                    <Navigation.Link href='#docs' current>
                        Docs
                    </Navigation.Link>
                </Navigation.Links>
                <Navigation.Actions>
                    <a href='https://github.com'>GitHub</a>
                </Navigation.Actions>
            </Navigation.Menu>
        </Navigation>
    )
}

const getToggle = () => screen.getByRole('button', { name: 'Menu' })

describe('Navigation', () => {
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

            expect(screen.getByRole('banner')).toHaveClass(styles.navigation, styles.sticky)

            rerender(<Example sticky={false} />)

            expect(screen.getByRole('banner')).not.toHaveClass(styles.sticky)
        })

        it('merges a custom className and forwards attributes', () => {
            render(<Example className='customClass' id='site-header' />)

            expect(screen.getByRole('banner')).toHaveClass(styles.navigation, 'customClass')
            expect(screen.getByRole('banner')).toHaveAttribute('id', 'site-header')
        })

        it('lets links and the brand render as another element', () => {
            render(
                <Navigation>
                    <Navigation.Brand as='div'>Logo</Navigation.Brand>
                    <Navigation.Burger />
                    <Navigation.Menu>
                        <Navigation.Links>
                            <Navigation.Link as='button' type='button'>
                                Pricing
                            </Navigation.Link>
                        </Navigation.Links>
                    </Navigation.Menu>
                </Navigation>,
            )

            expect(screen.getByText('Logo').tagName).toBe('DIV')
            expect(screen.getByRole('button', { name: 'Pricing' })).toBeInTheDocument()
        })

        it('throws when a part is used outside a Navigation', () => {
            const error = vi.spyOn(console, 'error').mockImplementation(() => {})

            expect(() => render(<Navigation.Burger />)).toThrow('inside <Navigation>')

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
                <Navigation>
                    <Navigation.Burger label='Open navigation' onClick={onClick} />
                    <Navigation.Menu />
                </Navigation>,
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

        it('closes with Escape even when focus is outside, without moving it', async () => {
            const user = userEvent.setup()
            render(
                <>
                    <Example />
                    <button type='button'>Outside</button>
                </>,
            )

            await user.click(getToggle())
            screen.getByRole('button', { name: 'Outside' }).focus()
            await user.keyboard('{Escape}')

            expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
            expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus()
        })

        it('closes when a link is followed, and still calls its onClick', async () => {
            const user = userEvent.setup()
            const onClick = vi.fn()
            render(
                <Navigation>
                    <Navigation.Burger />
                    <Navigation.Menu>
                        <Navigation.Links>
                            <Navigation.Link href='#samples' onClick={onClick}>
                                Samples
                            </Navigation.Link>
                        </Navigation.Links>
                    </Navigation.Menu>
                </Navigation>,
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
                act(() => {
                    for (const listener of listeners) listener({ matches: true })
                })

                expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
            })
        })
    })
})
