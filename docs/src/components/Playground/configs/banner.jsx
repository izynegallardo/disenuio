import { Banner } from 'disenuio'

function BannerPreview({ props }) {
    return <Banner {...props} />
}

export default {
    name: 'Banner',
    stage: 'wide',
    controls: [
        {
            name: 'status',
            label: 'Status',
            type: 'options',
            options: ['info', 'success', 'warning', 'error'],
            defaultValue: 'info',
        },
        { name: 'title', label: 'Title', type: 'text', defaultValue: 'Update available' },
        {
            name: 'message',
            label: 'Message',
            type: 'text',
            defaultValue: 'A new version is ready. Restart the app to get the latest changes.',
        },
    ],
    Preview: BannerPreview,
}
