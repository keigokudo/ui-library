# Changelog

## 0.1.0 - 2026-10-03

The public API and design foundation have changed substantially from the 0.0.x
package line. Backwards compatibility with previous 0.0.x APIs is not claimed.

- Added the Portfolio warm editorial design foundation and semantic
  `--portfolio-*` tokens.
- Added `Container`, `Tag`, `SiteHeader`, `SiteFooter`, `ProjectRow`,
  `SectionHeader`, and `PageIntro` as the supported public component set.
- Added Storybook page compositions for Home, Work, Work Detail, and About to
  validate component integration and responsive behaviour.
- Standardised the package as ESM with React and React DOM peer dependencies.
- Added the explicit `@krnjs/react-ui/styles.css` stylesheet export.
