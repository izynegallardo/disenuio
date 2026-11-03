import { Segmented } from 'disenuio'
import React from 'react'
import { quote } from '../../../utils/buildCode'
import { parseList } from '../../../utils/controlValues'

function SegmentedPreview({ props, values }) {
    const options = parseList(values.optionsText)
    const [value, setValue] = React.useState(options[0])

    // The typed list can change under the selection, so fall back to the first option.
    const selected = options.includes(value) ? value : options[0]

    if (options.length === 0) return <p>Add at least one option.</p>

    return (
        <>
            <Segmented
                {...props}
                label={props.label ?? 'Options'}
                value={selected}
                options={options}
                onChange={setValue}
            />
            <p>Selected: {selected}</p>
        </>
    )
}

export default {
    name: 'Segmented',
    controls: [
        {
            name: 'optionsText',
            label: 'Options',
            type: 'text',
            defaultValue: 'small, medium, large',
            target: 'simulation',
        },
        { name: 'label', label: 'Group label', type: 'text', defaultValue: 'Size' },
        { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    extraCode: (values) => {
        const options = parseList(values.optionsText).map(quote).join(', ')

        return [`options={[${options}]}`, 'value={value}', 'onChange={setValue}']
    },
    Preview: SegmentedPreview,
}
