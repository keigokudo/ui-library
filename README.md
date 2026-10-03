# @krnjs/react-ui

React UI package foundation for the Portfolio / C2 design direction.

The package intentionally exports no components yet. It provides the CSS design
foundation that future Portfolio / C2 components will consume.

## Styles

Import the foundation explicitly from the application entry point:

```ts
import "@krnjs/react-ui/styles.css";
```

The import registers semantic `--c2-*` custom properties. Add
`class="c2-foundation"` to an application region to opt into the inherited page
colour, typography, selection, and focus-visible defaults.

The font stack prefers `Inter` when the consumer provides it and otherwise uses
system UI fonts. The package does not load or bundle fonts.

## Development

```bash
npm install
npm run storybook
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run build-storybook
npm pack --dry-run
```

## Package policy

- The published package is ESM-only and exposes only its root entry point.
- React and React DOM are peer dependencies and are never bundled. They are
  also development dependencies for local Storybook and tests.
- CSS is available only through the explicit `styles.css` subpath; importing
  the JavaScript entry point does not inject styles.
- JavaScript remains tree-shakeable. CSS files alone are marked as side effects
  so bundlers retain an explicit stylesheet import.
