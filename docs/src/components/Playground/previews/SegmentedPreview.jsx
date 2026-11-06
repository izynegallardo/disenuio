import { Segmented } from 'disenuio'
import React from 'react'
import { parseList } from '../../../utils/controlValues'

export default function SegmentedPreview({ props, values }) {
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
