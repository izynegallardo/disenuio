import React from 'react'

import { Banner, Button, Card, Testimonial, Toast, ToolTip } from 'disenuio'
import Badges from '../Badges/Badges'

import { uploadIcon } from '../Icons/Icons'
import model from '../../assets/model.jpg'

import Section from '../Section/Section'
import styles from './Samples.module.css'

const tabs = ['Badge', 'Button', 'Banner', 'Card', 'Testimonial', 'Toast', 'Tooltip']

export default function Samples() {
    const [tab, setTab] = React.useState(tabs[0])

    return (
        <Section
            id='samples'
            title='Samples'
            blurb='Every component, every state. Pick one on the left and click around.'
        >
            <div className={styles.tabContainer}>
                <div className={styles.tabList} role='tablist'>
                    {tabs.map((t) => (
                        <Button
                            className={`${styles.tabButton} ${tab === t ? styles.focusTab : ''}`}
                            key={t}
                            variant='ghost'
                            onClick={() => {
                                setTab(t)
                            }}
                            role='tab'
                            aria-selected={tab === t}
                        >
                            {t}
                        </Button>
                    ))}
                </div>
                <div className={styles.panel}>
                    <h3 className={styles.panelName}>{tab}</h3>
                    <div className={styles.components}>{tab === 'Badge' && <Badges />}</div>
                </div>
            </div>
        </Section>
    )
}

// {/* {variants.map((variant) => (
//     <div className={styles.group} key={variant}>
//         <p className={styles.groupLabel}>{variant}</p>
//         <div className={styles.row}>
//             {sizes.map((size) => (
//                 <Button key={size} variant={variant} size={size}>
//                     {size}
//                 </Button>
//             ))}
//             <Button variant={variant} disabled>
//                 disabled
//             </Button>
//         </div>
//     </div>
// ))} */}
// <Button onClick={() => console.log('Clicked!')}>Button</Button>
// <Badge shape='pill'>Badge</Badge>
// <Banner
//     title='Banner Component'
//     message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.'
// />
// <Card
//     icon={uploadIcon}
//     title='Card Component'
//     message='Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.'
// />
// <Testimonial
//     image={<img src={model} alt='Portrait of May Andersons' />}
//     message='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue. Amet feugiat est integer dolor auctor adipiscing nunc urna, sit.'
//     name='May Andersons'
//     companyPosition='Workcation, CTO'
// />
// <ToolTip
//     title='Tooltip Component'
//     message='Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'
// />
// <Toast
//     pauseOnHover
//     showProgress
//     closeButton
//     type='success'
//     title='Toast Component'
//     message='Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'
//     action={{ label: 'Undo', onClick: () => console.log('Undo clicked') }}
// />
