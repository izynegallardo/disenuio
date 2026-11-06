import SliderPreview from '../previews/SliderPreview'

export default {
    name: 'Slider',
    controls: [
        { name: 'min', label: 'Min', type: 'number', defaultValue: 0 },
        { name: 'max', label: 'Max', type: 'number', defaultValue: 100 },
        { name: 'step', label: 'Step', type: 'number', defaultValue: 1 },
        { name: 'disabled', label: 'Disabled', type: 'boolean', defaultValue: false },
    ],
    extraCode: () => [
        "aria-label='Volume'",
        'value={value}',
        'onChange={(event) => setValue(Number(event.target.value))}',
    ],
    Preview: SliderPreview,
}
