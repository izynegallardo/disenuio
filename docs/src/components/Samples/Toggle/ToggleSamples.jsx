import { Toggle } from 'disenuio'
import React from 'react'
import SampleGroup from '../SampleGroup/SampleGroup'

export default function ToggleSamples() {
    const [notifications, setNotifications] = React.useState(false)

    return (
        <>
            <SampleGroup label='default'>
                <Toggle label='Default toggle' />
            </SampleGroup>
            <SampleGroup label='on by default'>
                <Toggle label='Enabled toggle' initialValue />
            </SampleGroup>
            <SampleGroup label='onChange' direction='column'>
                <Toggle label='Notifications' onChange={setNotifications} />
                <p>Notifications are {notifications ? 'on' : 'off'}</p>
            </SampleGroup>
            <SampleGroup label='custom color'>
                <Toggle label='Green toggle' color='#059669' initialValue />
                <Toggle label='Pink toggle' color='#db2777' initialValue />
            </SampleGroup>
            <SampleGroup label='disabled'>
                <Toggle label='Disabled off' disabled />
                <Toggle label='Disabled on' disabled initialValue />
            </SampleGroup>
        </>
    )
}
