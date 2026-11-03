import { Button, ToolTip } from 'disenuio'
import React from 'react'

// A tooltip removes itself when closed, so the preview offers a way to bring it back.
function ToolTipPreview({ props }) {
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

export default {
    name: 'ToolTip',
    stage: 'wide',
    controls: [
        { name: 'title', label: 'Title', type: 'text', defaultValue: 'Keyboard shortcut' },
        {
            name: 'message',
            label: 'Message',
            type: 'text',
            defaultValue: 'Press Ctrl + K to open the command menu from anywhere.',
        },
        {
            name: 'color',
            label: 'Color',
            type: 'options',
            options: ['', 'black', 'blue', 'pink', 'green'],
            defaultValue: '',
        },
        {
            name: 'variant',
            label: 'Variant',
            type: 'options',
            options: ['', 'bold', 'light'],
            defaultValue: '',
        },
    ],
    Preview: ToolTipPreview,
}
