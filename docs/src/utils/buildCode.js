// Turns a playground config and its current values into the JSX the user can copy.
// Props left at their default are not printed.

// Prefers single quotes (the project style), falls back to double, then to JSON.
export function quote(text) {
    if (!text.includes("'")) return `'${text}'`
    if (!text.includes('"')) return `"${text}"`

    return JSON.stringify(text)
}

function formatProp(control, value) {
    if (value === undefined || value === '' || value === control.defaultValue) return null

    switch (control.type) {
        case 'boolean':
            return value ? control.name : `${control.name}={false}`
        case 'number':
        case 'range':
            return `${control.name}={${value}}`
        default: {
            // A string with both kinds of quotes needs an expression: name={"it's \"x\""}
            const needsExpression = value.includes("'") && value.includes('"')
            const text = quote(value)

            return needsExpression ? `${control.name}={${text}}` : `${control.name}=${text}`
        }
    }
}

// Text that JSX would read as syntax goes in an expression: {"a < b"}.
function formatChildren(text) {
    return /[{}<>]/.test(text) ? `{${JSON.stringify(text)}}` : text
}

function buildJsx(name, props, children) {
    const propLines = props.map((prop) => `  ${prop}`).join('\n')

    if (!children) return props.length ? `<${name}\n${propLines}\n/>` : `<${name} />`
    if (props.length) return `<${name}\n${propLines}\n>\n  ${children}\n</${name}>`

    return `<${name}>${children}</${name}>`
}

export function buildCode(config, values) {
    const props = []

    for (const control of config.controls) {
        if (control.target) continue

        const line = formatProp(control, values[control.name])

        if (line) props.push(line)
    }

    // Props that are not plain controls: handlers, state, elements.
    props.push(...(config.extraCode?.(values) ?? []))

    const childrenControl = config.controls.find((control) => control.target === 'children')
    const children = childrenControl ? formatChildren(values[childrenControl.name]) : ''

    return `import { ${config.name} } from 'disenuio'\n\n${buildJsx(config.name, props, children)}`
}
