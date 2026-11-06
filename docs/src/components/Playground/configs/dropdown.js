import { quote } from '../../../utils/buildCode'
import { parseList } from '../../../utils/controlValues'
import DropdownPreview from '../previews/DropdownPreview'

export default {
    name: 'Dropdown',
    controls: [
        {
            name: 'optionsText',
            label: 'Options',
            type: 'text',
            defaultValue: 'Apple, Banana, Cherry, Mango',
            target: 'simulation',
        },
        {
            name: 'placeholder',
            label: 'Placeholder',
            type: 'text',
            defaultValue: 'Select an option',
        },
        { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
        { name: 'aria-invalid', label: 'Invalid', type: 'boolean', defaultValue: false },
    ],
    extraCode: (values) => {
        const options = parseList(values.optionsText).map(quote).join(', ')

        return ["label='Fruit'", `options={[${options}]}`, 'value={value}', 'onChange={setValue}']
    },
    Preview: DropdownPreview,
}
