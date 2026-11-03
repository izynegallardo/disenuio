// Helpers shared by the playground and its configs. A "control" is one row of the
// panel (see components/Playground/configs). Its shape:
//
//   name          the prop name, also the key in the values object
//   label         text of the row
//   type          'text' | 'number' | 'boolean' | 'options' | 'range'
//   defaultValue  must match the component's own default, so printing can skip it
//   options       ['a', 'b'] or [{ value, label }]            (options)
//   min max step unit                                         (range)
//   target        'children' = the text between the tags,
//                 'simulation' = only drives the preview (not a prop), printed by extraCode
//   enabledWhen   (values) => boolean, disables the row when false

// An option is a plain string or { value, label }. An empty string means "not passed".
export function toOption(option) {
    if (typeof option === 'object' && option !== null) return option

    return { value: option, label: option === '' ? 'default' : option }
}

export function getDefaultValues(controls) {
    return Object.fromEntries(controls.map((control) => [control.name, control.defaultValue]))
}

export function isControlEnabled(control, values) {
    return control.enabledWhen ? control.enabledWhen(values) : true
}

// Props for the live component. Controls with a target are not props, and an empty
// string means "leave the prop out".
export function getComponentProps(controls, values) {
    const props = {}

    for (const control of controls) {
        if (control.target) continue

        const value = values[control.name]

        if (value !== '') props[control.name] = value
    }

    return props
}

export function getChildren(controls, values) {
    const control = controls.find((item) => item.target === 'children')
    const value = control ? values[control.name] : ''

    return value === '' ? undefined : value
}

// 'small, medium, large' -> ['small', 'medium', 'large'] without blanks or duplicates.
export function parseList(text) {
    const items = text
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)

    return [...new Set(items)]
}
