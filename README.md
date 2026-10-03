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

## Components

- `Container`
- `Tag`
- `SiteHeader`
- `SiteFooter`
- `ProjectRow`
- `SectionHeader`
- `PageIntro`

```tsx
import {
  Container,
  PageIntro,
  SiteHeader,
} from "@krnjs/react-ui";
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
