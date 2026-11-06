import { quote } from '../../../utils/buildCode'
import { parseList } from '../../../utils/controlValues'
import SegmentedPreview from '../previews/SegmentedPreview'

export default {
    name: 'Segmented',
    controls: [
        {
            name: 'optionsText',
            label: 'Options',
            type: 'text',
            defaultValue: 'small, medium, large',
            target: 'simulation',
        },
        { name: 'label', label: 'Group label', type: 'text', defaultValue: 'Size' },
        { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    extraCode: (values) => {
        const options = parseList(values.optionsText).map(quote).join(', ')

        return [`options={[${options}]}`, 'value={value}', 'onChange={setValue}']
    },
    Preview: SegmentedPreview,
}
