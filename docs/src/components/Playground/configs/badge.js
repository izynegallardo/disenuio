import BadgePreview from '../previews/BadgePreview'

export default {
    name: 'Badge',
    controls: [
        {
            name: 'size',
            label: 'Size',
            type: 'options',
            options: ['small', 'medium', 'large'],
            defaultValue: 'medium',
        },
        {
            name: 'shape',
            label: 'Shape',
            type: 'options',
            options: ['square', 'pill'],
            defaultValue: 'square',
        },
        {
            name: 'color',
            label: 'Color',
            type: 'options',
            options: ['', 'gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'],
            defaultValue: '',
        },
        { name: 'label', label: 'Label', type: 'text', defaultValue: 'Status', target: 'children' },
    ],
    Preview: BadgePreview,
}
