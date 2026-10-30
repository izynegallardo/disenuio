import { Badge } from 'disenuio'
import SampleGroup from '../SampleGroup/SampleGroup'

const sizes = ['small', 'medium', 'large']
const shapes = ['square', 'pill']
const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']

export default function BadgeSamples() {
    return (
        <>
            {shapes.map((shape) => (
                <SampleGroup key={shape} label={shape}>
                    {sizes.map((size) => (
                        <Badge key={size} shape={shape} size={size}>
                            {size}
                        </Badge>
                    ))}
                </SampleGroup>
            ))}
            <SampleGroup label='colors'>
                {colors.map((color) => (
                    <Badge key={color} shape='pill' color={color}>
                        {color}
                    </Badge>
                ))}
            </SampleGroup>
        </>
    )
}
