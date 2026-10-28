import { Badge, Banner, Button, Card, Testimonial, Toast, ToolTip } from 'disenuio'

import React from 'react'
import model from '../../assets/model.jpg'
import { uploadIcon } from '../Icons/Icons'
import Section from '../Section/Section'
import styles from './Samples.module.css'

const variants = ['solid', 'outline', 'ghost']
const sizes = ['sm', 'md', 'lg']

export default function Samples() {
    return (
        <Section
            id='samples'
            title='Samples'
            blurb='Every component, every state. Pick one on the left and click around.'
        >
            {/* {variants.map((variant) => (
                <div className={styles.group} key={variant}>
                    <p className={styles.groupLabel}>{variant}</p>
                    <div className={styles.row}>
                        {sizes.map((size) => (
                            <Button key={size} variant={variant} size={size}>
                                {size}
                            </Button>
                        ))}
                        <Button variant={variant} disabled>
                            disabled
                        </Button>
                    </div>
                </div>
            ))} */}
            <Button onClick={() => console.log('Clicked!')}>Button</Button>
            <Badge shape='pill'>Badge</Badge>
            <Banner
                title='Banner Component'
                message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.'
            />
            <Card
                icon={uploadIcon}
                title='Card Component'
                message='Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.'
            />
            <Testimonial
                image={<img src={model} alt='Portrait of May Andersons' />}
                message='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit.'
                name='May Andersons'
                companyPosition='Workcation, CTO'
            />
            <ToolTip
                title='Tooltip Component'
                message='Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'
            />
            <Toast
                pauseOnHover
                showProgress
                closeButton
                title='Toast Component'
                message='Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'
                action={{ label: 'Undo', onClick: () => console.log('Undo clicked') }}
            />
        </Section>
    )
}
