# @krnjs/react-ui

React UI package foundation for the Portfolio / C2 design direction.

The package intentionally exports no components yet. The previous UI
experiments have been removed so new components can be introduced against a
clean public API.

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
- The package currently ships no CSS. Future styles must use an explicit
  package subpath; importing the JavaScript entry point must not inject global
  styles.
- The package currently has no runtime side effects, so it is marked as
  side-effect free for tree shaking. This metadata must be updated if a future
  exported CSS file or another intentional side effect is introduced.
