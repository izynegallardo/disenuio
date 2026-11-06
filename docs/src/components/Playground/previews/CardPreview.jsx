import { Card } from 'disenuio'
import { uploadIcon } from '../../Icons/Icons'

export default function CardPreview({ props, values }) {
    return <Card {...props} icon={values.showIcon ? uploadIcon : undefined} />
}
