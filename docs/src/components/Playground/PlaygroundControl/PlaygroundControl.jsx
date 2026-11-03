import { Dropdown, Input, Segmented, Slider, Toggle } from 'disenuio'
import { toOption } from '../../../utils/controlValues'
import Row from '../../Row/Row'
import styles from './PlaygroundControl.module.css'

// Longer lists do not fit in a row as a Segmented, so they become a Dropdown.
const MAX_SEGMENTED_OPTIONS = 3

function renderControl({ control, value, disabled, onChange, labelId }) {
    // Every control is named by the visible label of its row.
    const shared = { 'aria-labelledby': labelId, disabled }

    switch (control.type) {
        case 'text':
            return (
                <div className={styles.field}>
                    <Input
                        {...shared}
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                    />
                </div>
            )
        case 'number':
            // Uncontrolled, so the field can be emptied while typing a new number.
            return (
                <div className={`${styles.field} ${styles.fieldSmall}`}>
                    <Input
                        {...shared}
                        type='number'
                        defaultValue={value}
                        onChange={(event) => {
                            const number = event.target.valueAsNumber

                            if (!Number.isNaN(number)) onChange(number)
                        }}
                    />
                </div>
            )
        case 'boolean':
            return <Toggle {...shared} initialValue={value} onChange={onChange} />
        case 'range':
            return (
                <div className={styles.field}>
                    <Slider
                        {...shared}
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        value={value}
                        onChange={(event) => onChange(Number(event.target.value))}
                    />
                </div>
            )
        case 'options': {
            const options = control.options.map(toOption)

            return options.length > MAX_SEGMENTED_OPTIONS ? (
                <div className={styles.field}>
                    <Dropdown {...shared} options={options} value={value} onChange={onChange} />
                </div>
            ) : (
                <Segmented {...shared} options={options} value={value} onChange={onChange} />
            )
        }
        default:
            return null
    }
}

export default function PlaygroundControl({ control, value, disabled = false, onChange }) {
    const hint = control.type === 'range' ? `${value}${control.unit ?? ''}` : undefined

    return (
        <Row label={control.label} hint={hint}>
            {(labelId) => renderControl({ control, value, disabled, onChange, labelId })}
        </Row>
    )
}
