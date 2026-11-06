import { Toggle } from 'disenuio'

export default function TogglePreview({ props }) {
    // Toggle keeps its own state, so a new initial value needs a fresh instance.
    return (
        <Toggle
            key={String(props.initialValue)}
            {...props}
            label={props.label ?? 'Example toggle'}
        />
    )
}
