import { Card } from 'disenuio'
import { uploadIcon } from '../../Icons/Icons'
import SampleGroup from '../SampleGroup/SampleGroup'
import styles from './CardSamples.module.css'

export default function CardSamples() {
    return (
        <SampleGroup label='default' className={styles.cardSamples}>
            <Card
                icon={uploadIcon}
                title='Card Component'
                message='Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.'
            />
        </SampleGroup>
    )
}
