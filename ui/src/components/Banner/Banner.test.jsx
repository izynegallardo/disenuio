import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Banner from './Banner'

describe('Banner', () => {
    it('is a polite status', () => {
        render(<Banner title='Heads up' message='Something happened' />)

        expect(screen.getByRole('status')).toHaveTextContent('Something happened')
    })

    it('lets the consumer override the role', () => {
        render(<Banner role='alert' message='Something happened' />)

        expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it.each([
        ['success', 'Success'],
        ['warning', 'Warning'],
        ['error', 'Error'],
        ['info', 'Information'],
    ])('announces the %s status as text', (status, label) => {
        render(<Banner status={status} message='Hello' />)

        expect(screen.getByText(label)).toBeInTheDocument()
    })

    it('announces the default status as information', () => {
        render(<Banner message='Hello' />)

        expect(screen.getByText('Information')).toBeInTheDocument()
    })

    it('accepts a custom label for other languages', () => {
        render(<Banner status='error' statusLabel='Fallo' message='Hello' />)

        expect(screen.getByText('Fallo')).toBeInTheDocument()
        expect(screen.queryByText('Error')).not.toBeInTheDocument()
    })

    it('can turn the label off with an empty string', () => {
        render(<Banner status='error' statusLabel='' message='Hello' />)

        expect(screen.queryByText('Error')).not.toBeInTheDocument()
    })

    it('uses a paragraph for the title unless told otherwise', () => {
        render(<Banner title='Heads up' />)

        expect(screen.queryByRole('heading')).not.toBeInTheDocument()
        expect(screen.getByText('Heads up').tagName).toBe('P')
    })

    it('renders the title with the element the consumer chooses', () => {
        render(<Banner title='Heads up' titleAs='h3' />)

        expect(screen.getByRole('heading', { level: 3, name: 'Heads up' })).toBeInTheDocument()
    })
})
