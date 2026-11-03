import { Badge } from 'disenuio'

function BadgePreview({ props, content }) {
    return <Badge {...props}>{content}</Badge>
}

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
        { name: 'label', label: 'Label', type: 'text', defaultValue: 'New', target: 'children' },
    ],
    Preview: BadgePreview,
}
