# Repository Instructions

Work autonomously within this repository.

Do not stop to ask for confirmation before:

- creating files
- editing files
- moving files
- deleting obsolete files
- refactoring code
- updating configuration
- installing or removing project dependencies when necessary
- running build, test, lint, Storybook, and package validation commands

Use Git history as the recovery mechanism.

Prefer completing the requested task end-to-end over preserving obsolete code "just in case".

## Scope

Only make changes that are relevant to the requested task.

Do not modify files outside this repository.

Do not introduce unnecessary frameworks, abstractions, dependencies, or architectural complexity.

## Implementation workflow

Before significant changes:

1. Inspect the existing repository.
2. Understand the current build, package, test, Storybook, and TypeScript setup.
3. Reuse healthy infrastructure where appropriate.

Then proceed directly with implementation without waiting for approval.

After changes:

1. Run relevant tests.
2. Run the build.
3. Run lint/type checks when available.
4. Run any task-specific validation requested by the user.
5. Fix problems found during validation before finishing.

## Code quality

Prefer:

- simple implementations
- explicit configuration
- minimal public APIs
- maintainable TypeScript
- removal of dead code
- consistency with the existing toolchain

Avoid:

- compatibility wrappers for obsolete APIs
- commented-out legacy code
- speculative abstractions
- placeholder implementations unless explicitly requested

## Reporting

When the task requests an audit or implementation report, keep it concise and factual.

Report:

- what changed
- what was removed
- what was retained
- validation commands run
- any remaining limitations
