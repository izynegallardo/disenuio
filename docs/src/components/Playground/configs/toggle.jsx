import { Toggle } from 'disenuio'

function TogglePreview({ props }) {
    // Toggle keeps its own state, so a new initial value needs a fresh instance.
    return (
        <Toggle
            key={String(props.initialValue)}
            {...props}
            label={props.label ?? 'Example toggle'}
        />
    )
}

export default {
    name: 'Toggle',
    controls: [
        { name: 'label', label: 'Label', type: 'text', defaultValue: 'Notifications' },
        { name: 'initialValue', label: 'On by default', type: 'boolean', defaultValue: false },
        {
            name: 'color',
            label: 'Color',
            type: 'options',
            options: [
                '',
                { value: '#059669', label: 'green' },
                { value: '#db2777', label: 'pink' },
                { value: '#ea580c', label: 'orange' },
            ],
            defaultValue: '',
        },
        { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    Preview: TogglePreview,
}
