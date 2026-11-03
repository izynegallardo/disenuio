import { Button } from 'disenuio'

// Stands in for a real request, so the button has a promise to react to.
function simulateRequest(outcome, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (outcome === 'resolve') resolve()
            else reject(new Error('Request failed'))
        }, delay)
    })
}

function ButtonPreview({ props, content, values }) {
    const onClick = values.isAsync ? () => simulateRequest(values.outcome, values.delay) : undefined

    return (
        <Button {...props} onClick={onClick}>
            {content}
        </Button>
    )
}

const isAsync = (values) => values.isAsync

export default {
    name: 'Button',
    controls: [
        {
            name: 'variant',
            label: 'Variant',
            type: 'options',
            options: ['solid', 'outline', 'ghost'],
            defaultValue: 'solid',
        },
        {
            name: 'size',
            label: 'Size',
            type: 'options',
            options: ['small', 'medium', 'large'],
            defaultValue: 'medium',
        },
        {
            name: 'label',
            label: 'Label',
            type: 'text',
            defaultValue: 'Save changes',
            target: 'children',
        },
        { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
        {
            name: 'isAsync',
            label: 'Async onClick',
            type: 'boolean',
            defaultValue: true,
            target: 'simulation',
        },
        {
            name: 'outcome',
            label: 'Promise',
            type: 'options',
            options: ['resolve', 'reject'],
            defaultValue: 'resolve',
            target: 'simulation',
            enabledWhen: isAsync,
        },
        {
            name: 'delay',
            label: 'Delay',
            type: 'range',
            min: 300,
            max: 3000,
            step: 100,
            unit: 'ms',
            defaultValue: 1200,
            target: 'simulation',
            enabledWhen: isAsync,
        },
    ],
    extraCode: (values) => (values.isAsync ? ['onClick={() => api.save()}'] : []),
    Preview: ButtonPreview,
}
