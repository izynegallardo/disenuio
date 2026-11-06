import CardPreview from '../previews/CardPreview'

export default {
    name: 'Card',
    controls: [
        { name: 'title', label: 'Title', type: 'text', defaultValue: 'Card Component' },
        {
            name: 'message',
            label: 'Message',
            type: 'text',
            defaultValue:
                'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
        },
        {
            name: 'showIcon',
            label: 'Icon',
            type: 'boolean',
            defaultValue: true,
            target: 'simulation',
        },
    ],
    extraCode: (values) => (values.showIcon ? ['icon={<UploadIcon />}'] : []),
    Preview: CardPreview,
}
