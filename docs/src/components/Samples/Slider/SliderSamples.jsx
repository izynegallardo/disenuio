import { Slider } from 'disenuio'
import React from 'react'
import SampleGroup from '../SampleGroup/SampleGroup'

export default function SliderSamples() {
    const [volume, setVolume] = React.useState(40)
    const [duration, setDuration] = React.useState(1500)

    return (
        <>
            <SampleGroup label='default'>
                <Slider aria-label='Default slider' defaultValue={50} />
            </SampleGroup>
            <SampleGroup label='controlled' direction='column'>
                <Slider
                    aria-label='Volume'
                    value={volume}
                    onChange={(event) => setVolume(Number(event.target.value))}
                />
                <p>Volume: {volume}</p>
            </SampleGroup>
            <SampleGroup label='min, max and step' direction='column'>
                <Slider
                    aria-label='Duration in milliseconds'
                    min={300}
                    max={3000}
                    step={100}
                    value={duration}
                    onChange={(event) => setDuration(Number(event.target.value))}
                />
                <p>Duration: {duration}ms</p>
            </SampleGroup>
            <SampleGroup label='disabled'>
                <Slider aria-label='Disabled slider' defaultValue={30} disabled />
            </SampleGroup>
        </>
    )
}
