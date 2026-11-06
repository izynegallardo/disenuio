import { Button, Toast } from 'disenuio'
import React from 'react'

// A toast appears on its own, so the preview is a button that shows one.
export default function ToastPreview({ props, values }) {
    const [shownId, setShownId] = React.useState(null)
    const counterRef = React.useRef(0)

    function show() {
        counterRef.current += 1
        setShownId(counterRef.current)
    }

    const action = values.withAction ? { label: 'Undo', onClick: () => {} } : undefined

    return (
        <>
            <Button variant='outline' onClick={show}>
                Show toast
            </Button>
            {shownId !== null && (
                <Toast key={shownId} {...props} action={action} onClose={() => setShownId(null)} />
            )}
        </>
    )
}
