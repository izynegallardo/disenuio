import { Button } from 'disenuio'
import SampleGroup from '../SampleGroup/SampleGroup'

const variants = ['solid', 'outline', 'ghost']
const sizes = ['small', 'medium', 'large']

export default function ButtonSamples() {
    return (
        <>
            {variants.map((variant) => (
                <SampleGroup key={variant} label={variant}>
                    {sizes.map((size) => (
                        <Button key={size} variant={variant} size={size}>
                            {size}
                        </Button>
                    ))}
                    <Button variant={variant} disabled>
                        disabled
                    </Button>
                </SampleGroup>
            ))}
        </>
    )
}
