import { Button, Toast } from 'disenuio'
import React from 'react'
import SampleGroup from '../SampleGroup/SampleGroup'

const types = ['default', 'success', 'warning', 'error', 'info']
const positions = ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']

export default function ToastSamples() {
    const [shown, setShown] = React.useState(null)
    const counterRef = React.useRef(0)

    function show(type, position) {
        counterRef.current += 1
        setShown({ id: counterRef.current, type, position })
    }

    return (
        <>
            <SampleGroup label='types'>
                {types.map((type) => (
                    <Button key={type} variant='outline' onClick={() => show(type, 'topCenter')}>
                        {type}
                    </Button>
                ))}
            </SampleGroup>
            <SampleGroup label='positions'>
                {positions.map((position) => (
                    <Button key={position} variant='outline' onClick={() => show('info', position)}>
                        {position}
                    </Button>
                ))}
            </SampleGroup>
            {shown && (
                <Toast
                    key={shown.id}
                    type={shown.type === 'default' ? undefined : shown.type}
                    position={shown.position}
                    showProgress
                    closeButton
                    title={`${shown.type} toast`}
                    message='Your changes have been saved and synced successfully.'
                    action={{ label: 'Undo', onClick: () => console.log('Undo clicked') }}
                    onClose={() => setShown(null)}
                />
            )}
        </>
    )
}
