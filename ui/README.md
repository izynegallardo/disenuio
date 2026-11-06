# disenUIo

Reusable, performant React components.

[![npm version](https://img.shields.io/npm/v/disenuio?color=C53635&logo=npm&logoColor=C53635)](https://www.npmjs.com/package/disenuio)
![react](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
[![license](https://img.shields.io/npm/l/disenuio?label=license)](../LICENSE)

> Early release (0.x). The API may change between minor versions.

## Install

```sh
npm install disenuio
```

Requires React 19. `react` and `react-dom` are peer dependencies.

## Usage

Import the stylesheet once, near your app entry, then use the components.

```jsx
import 'disenuio/style.css'
import { Button } from 'disenuio'

export default function App() {
    return (
        <Button variant='outline' size='large' onClick={() => console.log('clicked')}>
            Save
        </Button>
    )
}
```

### Promise handling

When `onClick` returns a promise, `Button` shows loading, then success or error, and ignores extra
clicks in the meantime.

```jsx
<Button onClick={() => saveDraft()}>Save</Button>
```

### Navigation

`Navigation` is a compound component. The burger toggle and the menu share their open state, so
use the parts together.

```jsx
import { Navigation } from 'disenuio'

<Navigation>
    <Navigation.Brand href='/'>disenUIo</Navigation.Brand>
    <Navigation.Burger />
    <Navigation.Menu>
        <Navigation.Links label='Main'>
            <Navigation.Link href='#samples' current>
                Samples
            </Navigation.Link>
        </Navigation.Links>
    </Navigation.Menu>
</Navigation>
```

## Components

Every component accepts `className` and passes any other props to its root element, unless noted.

| Component     | Main props                                                                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Badge`       | `size`: `small` / `medium` / `large`, `shape`: `square` / `pill`, `color`: `gray` / `red` / `yellow` / `green` / `blue` / `indigo` / `purple` / `pink`                    |
| `Banner`      | `status`: `info` / `success` / `warning` / `error`, `title`, `titleAs`, `message`, `statusLabel`                                                                            |
| `Button`      | `variant`: `solid` / `outline` / `ghost`, `size`: `small` / `medium` / `large`, `onClick` (may return a promise), `statusDuration`, `loadingLabel`, `successLabel`, `errorLabel` |
| `Card`        | `icon`, `title`, `titleAs`, `message`, `children`                                                                                                                           |
| `CodeBlock`   | `code`, `label`, `resetTime`                                                                                                                                                |
| `Dropdown`    | `options` (values or `{ value, label }`), `value` or `defaultValue`, `onChange`, `placeholder`, `name`, `disabled`, `label`                                                  |
| `Input`       | `label`, `type`, `id`, plus all native input props                                                                                                                          |
| `Navigation`  | `sticky`, with `Navigation.Brand`, `.Burger`, `.Menu`, `.Links`, `.Link` and `.Actions`                                                                                      |
| `Segmented`   | `options` (values or `{ value, label }`), `value`, `onChange`, `disabled`, `label`                                                                                           |
| `Slider`      | `min`, `max`, `step`, `value`, `onChange`, plus all native range input props                                                                                                 |
| `Testimonial` | `message`, `name`, `companyPosition`, `image` (any element)                                                                                                                  |
| `Toast`       | `type`, `position`, `title`, `message`, `action` (`{ label, onClick, disabled }`), `duration`, `pauseOnHover`, `showProgress`, `closeButton`, `open`, `onClose`               |
| `Toggle`      | `initialValue`, `onChange`, `label`, `color`                                                                                                                                |
| `ToolTip`     | `title`, `titleAs`, `message`, `color`: `black` / `blue` / `pink` / `green`, `variant`: `bold` / `light`, `onClose`                                                          |

Interactive components follow the WAI-ARIA patterns for their role: `Dropdown` is a select-only
combobox, `Segmented` is a radio group, `Toggle` is a switch, and `Toast` announces errors and
warnings as alerts.

## Theming

Design tokens are CSS custom properties prefixed with `--disenuio-`. Override them on `:root`, or on
any ancestor to theme part of your app.

```css
:root {
    --disenuio-color-primary: #7c3aed;
    --disenuio-color-primary-hover: #6d28d9;
    --disenuio-color-primary-active: #5b21b6;
    --disenuio-radius: 0.5em;
}
```

Some components expose their own hooks, all optional:

| Property                                                                                                 | Affects                |
| -------------------------------------------------------------------------------------------------------- | ---------------------- |
| `--disenuio-button-bg`, `-color`, `-hover-bg`, `-padding`, `-min-width`, `-min-height`                    | `Button`               |
| `--disenuio-toggle-color`                                                                                | `Toggle`               |
| `--disenuio-dropdown-max-height`                                                                         | `Dropdown` list        |
| `--disenuio-navigation-max-width`, `--disenuio-navigation-z-index`                                       | `Navigation`           |
| `--disenuio-toast-position`, `--disenuio-toast-margin`, `--disenuio-toast-max-width`                     | `Toast`                |

The stylesheet imports the Plus Jakarta Sans and DM Mono fonts from Google Fonts. Set
`--disenuio-font-family` and `--disenuio-font-mono` to use your own fonts.

Base styles are scoped to the library's own elements, so nothing leaks into the rest of your app.

## License

This project is under [MIT](../LICENSE) license.
