import { quote } from '../../../utils/buildCode'
import { portraitAlt } from '../../../utils/portraitAlt'
import TestimonialPreview from '../previews/TestimonialPreview'

export default {
    name: 'Testimonial',
    controls: [
        {
            name: 'message',
            label: 'Message',
            type: 'text',
            defaultValue:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit.',
        },
        { name: 'name', label: 'Name', type: 'text', defaultValue: 'May Andersons' },
        {
            name: 'companyPosition',
            label: 'Position',
            type: 'text',
            defaultValue: 'Workcation, CTO',
        },
        {
            name: 'showImage',
            label: 'Image',
            type: 'boolean',
            defaultValue: true,
            target: 'simulation',
        },
    ],
    extraCode: (values) =>
        values.showImage
            ? [`image={<img src={photo} alt=${quote(portraitAlt(values.name))} />}`]
            : [],
    Preview: TestimonialPreview,
}
