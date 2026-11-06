import InputPreview from '../previews/InputPreview'

export default {
    name: 'Input',
    controls: [
        { name: 'label', label: 'Label', type: 'text', defaultValue: 'Email' },
        {
            name: 'placeholder',
            label: 'Placeholder',
            type: 'text',
            defaultValue: 'you@example.com',
        },
        {
            name: 'type',
            label: 'Type',
            type: 'options',
            options: ['text', 'email', 'password', 'number'],
            defaultValue: 'text',
        },
        { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
        { name: 'aria-invalid', label: 'Invalid', type: 'boolean', defaultValue: false },
    ],
    Preview: InputPreview,
}
