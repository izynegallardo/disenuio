import { Button } from 'disenuio'

import React from 'react'
import Section from '../Section/Section'
import styles from './Samples.module.css'

const variants = ['solid', 'outline', 'ghost']
const sizes = ['small', 'medium', 'large']

export default function Samples() {
    return (
        <Section
            id='samples'
            title='Samples'
            blurb='Every component, every state. Pick one on the left and click around.'
        >
            {variants.map((variant) => (
                <div className={styles.group} key={variant}>
                    <p className={styles.groupLabel}>{variant}</p>
                    <div className={styles.row}>
                        {sizes.map((size) => (
                            <Button key={size} variant={variant} size={size}>
                                {size}
                            </Button>
                        ))}
                        <Button variant={variant} disabled>
                            disabled
                        </Button>
                    </div>
                </div>
            ))}
        </Section>
    )
}
