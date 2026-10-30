import { Button } from 'disenuio'
import React from 'react'
import Section from '../Section/Section'
import BadgeSamples from './Badge/BadgeSamples'
import BannerSamples from './Banner/BannerSamples'
import ButtonSamples from './Button/ButtonSamples'
import CardSamples from './Card/CardSamples'
import styles from './Samples.module.css'
import TestimonialSamples from './Testimonial/TestimonialSamples'
import ToastSamples from './Toast/ToastSamples'
import ToolTipSamples from './ToolTip/ToolTipSamples'

const SAMPLES = {
    Badge: BadgeSamples,
    Button: ButtonSamples,
    Banner: BannerSamples,
    Card: CardSamples,
    Testimonial: TestimonialSamples,
    Toast: ToastSamples,
    Tooltip: ToolTipSamples,
}

const tabs = Object.keys(SAMPLES)

export default function Samples() {
    const [tab, setTab] = React.useState(tabs[0])
    const baseId = React.useId()

    const tabId = (name) => `${baseId}-tab-${name.toLowerCase()}`
    const panelId = `${baseId}-panel`

    // Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern).
    function handleKeyDown(event) {
        const current = tabs.indexOf(tab)
        let next

        if (event.key === 'ArrowRight') next = (current + 1) % tabs.length
        else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length
        else if (event.key === 'Home') next = 0
        else if (event.key === 'End') next = tabs.length - 1
        else return

        event.preventDefault()
        setTab(tabs[next])
        event.currentTarget.querySelectorAll('[role="tab"]')[next].focus()
    }

    const Sample = SAMPLES[tab]

    return (
        <Section
            id='samples'
            title='Samples'
            blurb='Every component, every state. Pick one on the left and click around.'
        >
            <div className={styles.tabContainer}>
                <div
                    className={styles.tabList}
                    role='tablist'
                    aria-label='Components'
                    onKeyDown={handleKeyDown}
                >
                    {tabs.map((name) => (
                        <Button
                            className={`${styles.tabButton} ${tab === name ? styles.focusTab : ''}`}
                            key={name}
                            id={tabId(name)}
                            variant='ghost'
                            role='tab'
                            aria-selected={tab === name}
                            aria-controls={panelId}
                            tabIndex={tab === name ? 0 : -1}
                            onClick={() => setTab(name)}
                        >
                            {name}
                        </Button>
                    ))}
                </div>
                <div
                    className={styles.panel}
                    role='tabpanel'
                    id={panelId}
                    aria-labelledby={tabId(tab)}
                >
                    <h3 className={styles.panelName}>{tab}</h3>
                    <div className={styles.components}>
                        <Sample />
                    </div>
                </div>
            </div>
        </Section>
    )
}
