import { Button, ToolTip } from 'disenuio'
import React from 'react'
import SampleGroup from '../SampleGroup/SampleGroup'
import styles from './ToolTipSamples.module.css'

const variants = ['bold', 'light']
const colors = ['black', 'blue', 'pink', 'green']

export default function ToolTipSamples() {
    const [round, setRound] = React.useState(0)

    return (
        <div className={styles.toolTipSamples}>
            <Button variant='outline' size='sm' onClick={() => setRound((current) => current + 1)}>
                Show dismissed tooltips again
            </Button>
            {variants.map((variant) => (
                <SampleGroup key={`${variant}-${round}`} label={variant} direction='column'>
                    {colors.map((color) => (
                        <ToolTip
                            key={color}
                            variant={variant}
                            color={color}
                            title={`${color} tooltip`}
                            message='Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'
                        />
                    ))}
                </SampleGroup>
            ))}
        </div>
    )
}
