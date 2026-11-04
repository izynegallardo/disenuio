import React from 'react'

const NavigationContext = React.createContext(null)

export default NavigationContext

export function useNavigation() {
    const context = React.useContext(NavigationContext)

    if (!context) {
        throw new Error(
            'Navigation.Burger, Navigation.Menu and Navigation.Link must be used inside <Navigation>.',
        )
    }

    return context
}
