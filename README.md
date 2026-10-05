# @krnjs/react-ui

React components and design foundations for the Portfolio warm editorial
interface. Storybook is the visual component reference:
[aquamarine-quokka-e5ba7c.netlify.app](https://aquamarine-quokka-e5ba7c.netlify.app/).

## Installation

```bash
npm install @krnjs/react-ui
```

Import the required stylesheet once in the consuming application:

```ts
import "@krnjs/react-ui/styles.css";
```

Apply `portfolio-foundation` at an appropriate application root to opt into the
inherited page colour, typography, selection, and focus-visible defaults:

```tsx
<body className="portfolio-foundation">...</body>
```

The stylesheet also registers the semantic `--portfolio-*` custom properties.
Consumers may provide Inter; otherwise the foundation uses its system-font
fallbacks.

## Generic UI primitives

- `Container`
- `Button`
- `ButtonLink`
- `IconButton`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Radio`
- `Switch`
- `Alert`
- `Badge`
- `Spinner`
- `VisuallyHidden`
- `Progress`

Import generic primitives from the package root:

```tsx
import { Alert, Button, Input, Progress } from "@krnjs/react-ui";
import "@krnjs/react-ui/styles.css";
```

## Portfolio patterns

The preferred entry point for the more opinionated site and editorial patterns
is `@krnjs/react-ui/portfolio`:

- `Tag`
- `PageIntro`
- `SectionHeader`
- `ProjectRow`
- `SiteHeader`
- `SiteFooter`

Root imports of these components remain available for compatibility throughout 0.2.x,
but new Portfolio code should use the dedicated subpath.

```tsx
import { Container } from "@krnjs/react-ui";
import { PageIntro, SiteHeader } from "@krnjs/react-ui/portfolio";
import "@krnjs/react-ui/styles.css";

export function PortfolioIntro() {
  return (
    <div className="portfolio-foundation">
      <SiteHeader brand="Portfolio" currentPath="/" />
      <main>
        <PageIntro
          eyebrow="SOFTWARE ENGINEER"
          heading="Thoughtful software, built to last."
          description="Clear interfaces, practical integrations and maintainable systems."
        />
        <Container>Additional page content</Container>
      </main>
    </div>
  );
}
```

React and React DOM are peer dependencies and must be provided by the consuming
application.

## Development

```bash
npm install
npm run storybook
npm run typecheck
npm run lint
npm test
npm run build
npm run build-storybook
npm pack --dry-run
```

The package is ESM-only. JavaScript imports do not inject CSS; use the explicit
`@krnjs/react-ui/styles.css` export shown above.
