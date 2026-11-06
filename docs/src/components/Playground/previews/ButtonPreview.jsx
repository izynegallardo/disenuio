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

export default function ButtonPreview({ props, content, values }) {
    const onClick = values.isAsync ? () => simulateRequest(values.outcome, values.delay) : undefined

    return (
        <Button {...props} onClick={onClick}>
            {content}
        </Button>
    )
}
