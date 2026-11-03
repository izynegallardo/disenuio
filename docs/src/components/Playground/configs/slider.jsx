import { Slider } from 'disenuio'
import React from 'react'

function SliderPreview({ props }) {
    const [value, setValue] = React.useState(50)

    // The typed range can be invalid (max below min, step 0), so the preview stays usable.
    const min = props.min
    const max = Math.max(props.max, min)
    const step = props.step > 0 ? props.step : 1
    const clamped = Math.min(Math.max(value, min), max)

    return (
        <>
            <Slider
                {...props}
                max={max}
                step={step}
                aria-label='Volume'
                value={clamped}
                onChange={(event) => setValue(Number(event.target.value))}
            />
            <p>Value: {clamped}</p>
        </>
    )
}

export default {
    name: 'Slider',
    controls: [
        { name: 'min', label: 'Min', type: 'number', defaultValue: 0 },
        { name: 'max', label: 'Max', type: 'number', defaultValue: 100 },
        { name: 'step', label: 'Step', type: 'number', defaultValue: 1 },
        { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    extraCode: () => [
        "aria-label='Volume'",
        'value={value}',
        'onChange={(event) => setValue(Number(event.target.value))}',
    ],
    Preview: SliderPreview,
}
