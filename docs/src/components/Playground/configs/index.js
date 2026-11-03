import badge from './badge'
import banner from './banner'
import button from './button'
import card from './card'
import dropdown from './dropdown'
import input from './input'
import segmented from './segmented'
import slider from './slider'
import testimonial from './testimonial'
import toast from './toast'
import toggle from './toggle'
import tooltip from './tooltip'

// One config per component. To add a component to the playground, write its config
// (see button.jsx for a full one) and list it here.
//
//   name       the export name from 'disenuio', also used in the printed import
//   controls   the rows of the panel, see utils/controlValues.js
//   Preview    renders the live component: ({ props, content, values }) => element
//   extraCode  optional, props that are not plain controls (handlers, state, elements)
//   stage      optional, 'wide' stretches the preview to the full width
export const PLAYGROUNDS = [
    badge,
    banner,
    button,
    card,
    dropdown,
    input,
    segmented,
    slider,
    testimonial,
    toast,
    toggle,
    tooltip,
]

export const DEFAULT_PLAYGROUND = 'Button'
