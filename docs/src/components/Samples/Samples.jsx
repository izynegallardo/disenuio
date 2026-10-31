import { Button } from 'disenuio'
import React from 'react'
import { handleKeyDown } from '../../utils/handleKeyDown'
import Section from '../Section/Section'
import BadgeSamples from './Badge/BadgeSamples'
import BannerSamples from './Banner/BannerSamples'
import ButtonSamples from './Button/ButtonSamples'
import CardSamples from './Card/CardSamples'
import InputSamples from './Input/InputSamples'
import styles from './Samples.module.css'
import SegmentedSamples from './Segmented/SegmentedSamples'
import SliderSamples from './Slider/SliderSamples'
import TestimonialSamples from './Testimonial/TestimonialSamples'
import ToastSamples from './Toast/ToastSamples'
import ToggleSamples from './Toggle/ToggleSamples'
import ToolTipSamples from './ToolTip/ToolTipSamples'

const SAMPLES = {
    Badge: BadgeSamples,
    Banner: BannerSamples,
    Button: ButtonSamples,
    Card: CardSamples,
    Input: InputSamples,
    Segmented: SegmentedSamples,
    Slider: SliderSamples,
    Testimonial: TestimonialSamples,
    Toast: ToastSamples,
    Toggle: ToggleSamples,
    Tooltip: ToolTipSamples,
}

const tabs = Object.keys(SAMPLES)

export default function Samples() {
    const [tab, setTab] = React.useState(tabs[0])
    const baseId = React.useId()

    const tabId = (name) => `${baseId}-tab-${name.toLowerCase()}`
    const panelId = `${baseId}-panel`

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
                    onKeyDown={(event) => handleKeyDown(event, tabs, tab, setTab)}
                >
                    {tabs.map((name) => (
                        <Button
                            className={[styles.tabButton, tab === name && styles.focusTab]
                                .filter(Boolean)
                                .join(' ')}
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
