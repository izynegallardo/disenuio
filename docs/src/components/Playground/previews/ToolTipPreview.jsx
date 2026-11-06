import { Button, ToolTip } from 'disenuio'
import React from 'react'

// A tooltip removes itself when closed, so the preview offers a way to bring it back.
export default function ToolTipPreview({ props }) {
    const [isDismissed, setIsDismissed] = React.useState(false)

    if (isDismissed) {
        return (
            <Button variant='outline' onClick={() => setIsDismissed(false)}>
                Show tooltip again
            </Button>
        )
    }

    return <ToolTip {...props} onClose={() => setIsDismissed(true)} />
}
