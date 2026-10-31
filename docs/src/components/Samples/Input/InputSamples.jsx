import { Input } from 'disenuio'
import React from 'react'
import SampleGroup from '../SampleGroup/SampleGroup'

export default function InputSamples() {
    const [name, setName] = React.useState('')

    return (
        <>
            <SampleGroup label='default'>
                <Input aria-label='Default input' placeholder='Type something' />
            </SampleGroup>
            <SampleGroup label='with label'>
                <Input label='Email' type='email' placeholder='you@example.com' />
            </SampleGroup>
            <SampleGroup label='types'>
                <Input aria-label='Text' type='text' placeholder='text' />
                <Input aria-label='Password' type='password' placeholder='password' />
                <Input aria-label='Number' type='number' placeholder='number' />
            </SampleGroup>
            <SampleGroup label='controlled' direction='column'>
                <Input
                    label='Name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder='Your name'
                />
                <p>{name ? `Hello, ${name}!` : 'Waiting for a name'}</p>
            </SampleGroup>
            <SampleGroup label='invalid'>
                <Input aria-label='Invalid input' aria-invalid='true' defaultValue='not an email' />
            </SampleGroup>
            <SampleGroup label='disabled'>
                <Input aria-label='Disabled input' disabled defaultValue='Cannot edit' />
            </SampleGroup>
        </>
    )
}
