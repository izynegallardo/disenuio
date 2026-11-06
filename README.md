<p align="center">
  <img src="./docs/public/favicon.svg" alt="disenUIo logo" width="110" />
</p>

<h1 align="center">disenUIo</h1>
<p align="center">Lightweight, ready-to-use React components with built-in promise handling, fully customizable to fit your needs.</p>

<p align="center">
  <a href="https://disenuio.vercel.app"><strong>Live Demo & Docs</strong></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/disenuio" style="text-decoration: none;">
    <img alt="npm version" src="https://img.shields.io/npm/v/disenuio?color=C53635&logo=npm&logoColor=C53635" />
  </a>
  <img alt="React" src="https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react" />
  <img alt="License" src="https://img.shields.io/npm/l/disenuio?label=license" />
</p>

<br />

disenUIo is a React component library built around reusability and performance. accessible, themeable components such as `Button`,
`Dropdown`, `Toast` and `Navigation`, styled with CSS Modules and plain CSS custom properties, with no
runtime styling dependency.

## Quick start

```sh
npm install disenuio
```

```jsx
import 'disenuio/style.css'
import { Button } from 'disenuio'

export default function App() {
    return <Button onClick={() => saveDraft()}>Save</Button>
}
```

When `onClick` returns a promise, the button shows loading, success and error states on its own.
The full component list, props and theming guide are in the [package README](./ui/README.md).

## Repository structure

This is an npm workspaces monorepo.

| Folder  | Package          | Purpose                                                        |
| ------- | ---------------- | -------------------------------------------------------------- |
| `ui/`   | `disenuio`       | The component library
| `docs/` | `disenuio-docs`  | Demo page and playground   |

The demo page imports the library straight from `ui/src`, so changes show up with hot reload.

## Development

Requires Node.js and npm. From the repository root:

```sh
npm install          # install all workspaces
npm run dev:docs     # demo page and playground with hot reload
npm run dev:ui       # rebuild ui/dist on change
npm run build        # build the library, then the demo page
npm run test         # run the test suites (Vitest and React Testing Library)
npm run lint         # oxlint in each workspace
npm run format:check # Biome format and lint check
npm run format:write # apply Biome fixes
```

### Conventions

- Component folders live in `ui/src/components/<Name>/` with the component, its CSS Module and an
  `index.js` that re-exports it. Tests sit beside the component as `<Name>.test.jsx`.
- Element ids are kebab-case, CSS class names are camelCase.
- Font sizes use `rem`, margin and padding use `em`, line height is unitless (usually `1.5`),
  and `px` is for `max-` and `min-` values.

## License

This project is under [MIT](./LICENSE) license.