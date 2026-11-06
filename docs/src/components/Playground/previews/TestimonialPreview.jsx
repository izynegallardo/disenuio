import { Testimonial } from 'disenuio'
import model from '../../../assets/model.jpg'
import { portraitAlt } from '../../../utils/portraitAlt'

export default function TestimonialPreview({ props, values }) {
    const image = values.showImage ? <img src={model} alt={portraitAlt(values.name)} /> : undefined

    return <Testimonial {...props} image={image} />
}
