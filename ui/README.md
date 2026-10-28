# disenUIo

Reusable, performant React components.

> Work in progress. Not published yet.

## Install

```sh
npm install disenuio
```

Requires React 19 (`react` and `react-dom` are peer dependencies).

## Usage

Import the stylesheet once, near your app entry, then use the components.

```jsx
import 'disenuio/style.css'
import { Button } from 'disenuio'

export default function App() {
    return (
        <Button variant='outline' size='lg' onClick={() => console.log('clicked')}>
            Save
        </Button>
    )
}
```

## Components

| Component | Props                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------- |
| `Button`  | `variant`: `solid` / `outline` / `ghost`, `size`: `sm` / `md` / `lg`, plus all native button props |

## Development

From the repository root:

```sh
npm run dev:docs   # playground with hot reload (reads ui/src directly)
npm run dev:ui     # rebuild ui/dist on change
npm run build      # build the library, then the demo page
npm run test       # run the test suites
npm run lint
```

## License

This project is under [MIT license](../LICENSE).
