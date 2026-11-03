import React from 'react'

const NavbarContext = React.createContext(null)

export default NavbarContext

// The parts of a Navbar share its open state, so they only work inside one.
export function useNavbar() {
    const context = React.useContext(NavbarContext)

    if (!context) {
        throw new Error('Navbar.Toggle, Navbar.Menu and Navbar.Link must be used inside <Navbar>.')
    }

    return context
}
