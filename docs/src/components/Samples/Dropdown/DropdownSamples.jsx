import { Dropdown } from 'disenuio'
import React from 'react'
import SampleGroup from '../SampleGroup/SampleGroup'

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango']

const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
]

export default function DropdownSamples() {
    const [fruit, setFruit] = React.useState(null)

    return (
        <>
            <SampleGroup label='default' direction='column'>
                <Dropdown label='Fruit' options={fruits} value={fruit} onChange={setFruit} />
                <p>Selected: {fruit ?? 'nothing yet'}</p>
            </SampleGroup>
            <SampleGroup label='default value'>
                <Dropdown label='Fruit' options={fruits} defaultValue='Mango' />
            </SampleGroup>
            <SampleGroup label='value and label'>
                <Dropdown label='Size' options={sizes} defaultValue='medium' />
            </SampleGroup>
            <SampleGroup label='placeholder'>
                <Dropdown
                    label='Country'
                    options={['Philippines', 'Japan', 'Norway']}
                    placeholder='Choose a country'
                />
            </SampleGroup>
            <SampleGroup label='invalid'>
                <Dropdown label='Fruit' options={fruits} aria-invalid='true' />
            </SampleGroup>
            <SampleGroup label='disabled'>
                <Dropdown label='Fruit' options={fruits} defaultValue='Apple' disabled />
            </SampleGroup>
        </>
    )
}
