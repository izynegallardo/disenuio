// Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern).
// The list is vertical on wide screens and horizontal on narrow ones, so both axes work.
export function handleKeyDown(event, tabs, tab, setTab) {
    const current = tabs.indexOf(tab)
    let next

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % tabs.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
        next = (current - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return

    event.preventDefault()
    setTab(tabs[next])
    event.currentTarget.querySelectorAll('[role="tab"]')[next].focus()
}
