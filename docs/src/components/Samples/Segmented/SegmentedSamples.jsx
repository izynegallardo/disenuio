import { Segmented } from 'disenuio'
import React from 'react'
import SampleGroup from '../SampleGroup/SampleGroup'

const sizeOptions = ['small', 'medium', 'large']

const planOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
]

export default function SegmentedSamples() {
    const [size, setSize] = React.useState('medium')
    const [plan, setPlan] = React.useState('monthly')

    return (
        <>
            <SampleGroup label='default' direction='column'>
                <Segmented label='Size' value={size} options={sizeOptions} onChange={setSize} />
                <p>Selected: {size}</p>
            </SampleGroup>
            <SampleGroup label='value and label' direction='column'>
                <Segmented label='Billing' value={plan} options={planOptions} onChange={setPlan} />
                <p>Selected: {plan}</p>
            </SampleGroup>
            <SampleGroup label='disabled'>
                <Segmented label='Size' value='medium' options={sizeOptions} disabled />
            </SampleGroup>
        </>
    )
}
