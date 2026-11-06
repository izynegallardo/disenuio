import { Dropdown } from 'disenuio'
import React from 'react'
import { parseList } from '../../../utils/controlValues'

export default function DropdownPreview({ props, values }) {
    const options = parseList(values.optionsText)
    const [value, setValue] = React.useState(null)

    // The typed list can change under the choice, so forget a value that is gone.
    const selected = options.includes(value) ? value : null

    return (
        <Dropdown {...props} label='Fruit' options={options} value={selected} onChange={setValue} />
    )
}
