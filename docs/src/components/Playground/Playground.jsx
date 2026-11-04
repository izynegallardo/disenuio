import { CodeBlock } from 'disenuio'
import React from 'react'
import { buildCode } from '../../utils/buildCode'
import {
    getChildren,
    getComponentProps,
    getDefaultValues,
    isControlEnabled,
} from '../../utils/controlValues'
import Section from '../Section/Section'
import { DEFAULT_PLAYGROUND, PLAYGROUNDS } from './configs'
import styles from './Playground.module.css'
import PlaygroundControl from './PlaygroundControl/PlaygroundControl'

const NAMES = PLAYGROUNDS.map((playground) => playground.name)

// The first row picks the component. It is a control like the others.
const COMPONENT_CONTROL = { name: 'component', label: 'Component', type: 'options', options: NAMES }

export default function Playground() {
    const [name, setName] = React.useState(DEFAULT_PLAYGROUND)
    // Values are kept per component, so switching back finds the controls as they were left.
    const [valuesByName, setValuesByName] = React.useState({})

    const config = PLAYGROUNDS.find((playground) => playground.name === name)
    const { controls, Preview } = config

    const values = valuesByName[name] ?? getDefaultValues(controls)

    function setValue(controlName, value) {
        setValuesByName((current) => ({
            ...current,
            [name]: { ...(current[name] ?? getDefaultValues(controls)), [controlName]: value },
        }))
    }

    const stageClass = [styles.stage, config.stage === 'wide' && styles.stageWide]
        .filter(Boolean)
        .join(' ')

    return (
        <Section
            id='playground'
            title='Playground'
            blurb='Pick a component, tweak its props, copy the JSX.'
        >
            <div className={styles.playground}>
                <fieldset className={styles.controls} aria-label={`${name} props`}>
                    <PlaygroundControl
                        control={COMPONENT_CONTROL}
                        value={name}
                        onChange={setName}
                    />
                    {controls.map((control) => (
                        <PlaygroundControl
                            key={`${name}-${control.name}`}
                            control={control}
                            value={values[control.name]}
                            disabled={!isControlEnabled(control, values)}
                            onChange={(value) => setValue(control.name, value)}
                        />
                    ))}
                </fieldset>
                <div className={styles.output}>
                    <div className={styles.preview}>
                        <div className={stageClass}>
                            <Preview
                                key={name}
                                props={getComponentProps(controls, values)}
                                content={getChildren(controls, values)}
                                values={values}
                            />
                        </div>
                    </div>
                    <CodeBlock label='jsx' code={buildCode(config, values)} />
                </div>
            </div>
        </Section>
    )
}
