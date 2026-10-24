import { Badge, Banner, Button } from 'disenuio'

import React from 'react'
import Section from '../Section/Section'
import styles from './Samples.module.css'

const variants = ['solid', 'outline', 'ghost']
const sizes = ['small', 'medium', 'large']

export default function Samples() {
    // const [btnStatus, setBtnStatus] = React.useState('idle')

    // function registerUserAPI(shouldSucceed) {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             shouldSucceed ? resolve() : reject(new Error('Timeout'))
    //         }, 1500)
    //     })
    // }

    // async function handleRegister(shouldSucceed) {
    //     setBtnStatus('loading')

    //     try {
    //         await registerUserAPI()
    //         setBtnStatus('success')
    //     } catch (error) {
    //         setBtnStatus('error')
    //     } finally {
    //         // Revert back to clickable idle state after the visual feedback window
    //         setTimeout(() => setBtnStatus('idle'), 2000)
    //     }
    // }

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
            <Badge>Badge</Badge>
            <Banner
                title='Congratulations!'
                message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.'
            />
        </Section>
    )
}
