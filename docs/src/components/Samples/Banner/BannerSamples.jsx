import { Banner } from 'disenuio'
import SampleGroup from '../SampleGroup/SampleGroup'

const banners = [
    {
        status: 'info',
        title: 'Update available',
        message: 'A new version is ready. Restart the app to get the latest changes.',
    },
    {
        status: 'success',
        title: 'Congratulations!',
        message: 'Your changes have been saved and synced successfully.',
    },
    {
        status: 'warning',
        title: 'Attention',
        message: 'Your trial ends in three days. Add a payment method to keep your projects.',
    },
    {
        status: 'error',
        title: 'There is a problem with your application',
        message: 'We could not process your request. Check your connection and try again.',
    },
]

export default function BannerSamples() {
    return (
        <>
            {banners.map(({ status, title, message }) => (
                <SampleGroup key={status} label={status} direction='column'>
                    <Banner status={status} title={title} message={message} />
                </SampleGroup>
            ))}
        </>
    )
}
