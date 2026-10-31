import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import Slider from './Slider'
import styles from './Slider.module.css'

function ControlledSlider({ onChange }) {
    const [value, setValue] = React.useState(20)

    return (
        <Slider
            aria-label='Volume'
            value={value}
            onChange={(event) => {
                setValue(Number(event.target.value))
                onChange?.(event)
            }}
        />
    )
}

describe('Slider', () => {
    it('is a slider named by aria-label', () => {
        render(<Slider aria-label='Volume' />)

        expect(screen.getByRole('slider', { name: 'Volume' })).toBeInTheDocument()
    })

    it('uses the native range defaults', () => {
        render(<Slider aria-label='Volume' />)
        const slider = screen.getByRole('slider')

        expect(slider).toHaveAttribute('min', '0')
        expect(slider).toHaveAttribute('max', '100')
        expect(slider).toHaveAttribute('step', '1')
    })

    it('accepts a custom range and step', () => {
        render(<Slider aria-label='Duration' min={300} max={3000} step={100} />)
        const slider = screen.getByRole('slider')

        expect(slider).toHaveAttribute('min', '300')
        expect(slider).toHaveAttribute('max', '3000')
        expect(slider).toHaveAttribute('step', '100')
    })

    it('is always a range input, whatever type is passed', () => {
        render(<Slider aria-label='Volume' type='text' />)

        expect(screen.getByRole('slider')).toHaveAttribute('type', 'range')
    })

    it('starts at defaultValue when uncontrolled', () => {
        render(<Slider aria-label='Volume' defaultValue={70} />)

        expect(screen.getByRole('slider')).toHaveValue('70')
    })

    it('follows the value when controlled', () => {
        const onChange = vi.fn()
        render(<ControlledSlider onChange={onChange} />)

        expect(screen.getByRole('slider')).toHaveValue('20')

        fireEvent.change(screen.getByRole('slider'), { target: { value: '65' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(screen.getByRole('slider')).toHaveValue('65')
    })

    it('can be disabled', () => {
        render(<Slider aria-label='Volume' disabled />)

        expect(screen.getByRole('slider')).toBeDisabled()
    })

    it('merges a custom className with the built-in class', () => {
        render(<Slider aria-label='Volume' className='customClass' />)

        expect(screen.getByRole('slider')).toHaveClass(styles.slider, 'customClass')
    })
})
