import ToolTipPreview from '../previews/ToolTipPreview'

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
