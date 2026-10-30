import { Testimonial } from 'disenuio'
import model from '../../../assets/model.jpg'
import SampleGroup from '../SampleGroup/SampleGroup'

export default function TestimonialSamples() {
    return (
        <SampleGroup label='default'>
            <Testimonial
                image={<img src={model} alt='Portrait of May Andersons' />}
                message='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit.'
                name='May Andersons'
                companyPosition='Workcation, CTO'
            />
        </SampleGroup>
    )
}
