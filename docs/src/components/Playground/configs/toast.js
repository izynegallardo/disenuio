import ToastPreview from '../previews/ToastPreview'

const POSITIONS = ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']

export default {
    name: 'Toast',
    controls: [
        {
            name: 'type',
            label: 'Type',
            type: 'options',
            options: ['', 'success', 'warning', 'error', 'info'],
            defaultValue: '',
        },
        {
            name: 'position',
            label: 'Position',
            type: 'options',
            options: POSITIONS,
            defaultValue: 'topCenter',
        },
        { name: 'title', label: 'Title', type: 'text', defaultValue: 'Changes saved' },
        {
            name: 'message',
            label: 'Message',
            type: 'text',
            defaultValue: 'Your changes have been saved and synced successfully.',
        },
        {
            name: 'duration',
            label: 'Duration',
            type: 'range',
            min: 1000,
            max: 20000,
            step: 500,
            unit: 'ms',
            defaultValue: 4000,
        },
        { name: 'showProgress', label: 'Progress bar', type: 'boolean', defaultValue: false },
        { name: 'closeButton', label: 'Close button', type: 'boolean', defaultValue: false },
        { name: 'pauseOnHover', label: 'Pause on hover', type: 'boolean', defaultValue: true },
        {
            name: 'withAction',
            label: 'Action button',
            type: 'boolean',
            defaultValue: false,
            target: 'simulation',
        },
    ],
    extraCode: (values) =>
        values.withAction ? ["action={{ label: 'Undo', onClick: handleUndo }}"] : [],
    Preview: ToastPreview,
}
