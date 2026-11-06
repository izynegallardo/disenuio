import { Input } from 'disenuio'

export default function InputPreview({ props }) {
    // Without a visible label the input still needs an accessible name.
    return <Input {...props} aria-label={props.label ? undefined : 'Example input'} />
}
