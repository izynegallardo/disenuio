import { Badge } from 'disenuio'
import styles from './Badges.module.css'

const sizes = ['small', 'medium', 'large']
const badgeShapes = ['square', 'pill']
const colors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']

export default function Badges() {
    return (
        <>
            {badgeShapes.map((shape) => (
                <div className={styles.badges} key={shape}>
                    <p className={styles.shapeName} key={shape}>
                        {shape}
                    </p>
                    <div className={styles.badgeContainer}>
                        {sizes.map((size) => (
                            <Badge key={size} shape={shape} size={size}>
                                {size}
                            </Badge>
                        ))}
                    </div>
                </div>
            ))}
            <p className={styles.shapeName}>colors</p>
            <div className={styles.badgeContainer}>
                {colors.map((color) => (
                    <Badge key={color} shape='pill' color={color}>
                        {color}
                    </Badge>
                ))}
            </div>
        </>
    )
}
