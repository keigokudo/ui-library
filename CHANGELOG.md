# Changelog

## 0.2.0 - 2026-10-04

- Added reusable action primitives, text form controls, selection controls, and
  feedback/status primitives.
- Added `VisuallyHidden` and native `Progress` accessibility/status primitives.
- Added reusable `info`, `success`, `warning`, and `error` semantic status
  tokens.
- Added the `@krnjs/react-ui/portfolio` entry point for the opinionated
  Portfolio patterns. Portfolio exports remain available from the package root
  for compatibility throughout 0.2.x.
- Made Storybook accessibility violations fail browser validation.
- Corrected `Alert` title typing to accept arbitrary React content.

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
