# Brand Context

## Identity

`vibebrand` is a CLI and library for generating a brand-system starting point.
It offers 14 named directions, token output, marks, and a parametric mascot system.

## Audience

The primary audience is developers creating a new product interface or identity.
Programmatic consumers can use the same catalog through the library API.

## Promise

Choose a direction and receive consistent light and dark tokens, font roles, and assets.
Use automated contrast checks to catch invalid color pairs before adoption.
Treat generated work as a grounded starting point, not a finished brand strategy.

## Voice

- Use exact names, commands, values, and results.
- Explain visual choices through their intended emotion.
- Keep CLI text compact and useful in plain terminals.
- Separate shipped commands from roadmap items.
- Avoid claims that all generated interfaces are accessible without further testing.

## Claims

Current source supports these claims:

- The catalog contains 14 named directions.
- Each direction defines light and dark OKLCH palettes.
- Each palette includes primary, secondary, and tertiary colors.
- Contrast checks cover foreground, muted, and on-color pairs at `4.5:1`.
- The CLI emits CSS, JSON, Google Fonts URLs, SVG marks, and Tailwind v4 tokens.
- `init` writes token, Tailwind, and light and dark logo files.
- One mascot JSON spec can render avatars, tiles, idle animation, and seeded rosters.

Do not present roadmap items as shipped commands.

## Naming

- Write `vibebrand` in lowercase for the product, package, CLI, and library.
- Use direction IDs in lowercase code and configuration.
- Use the catalog's direction display names in prose.
- Preserve mascot names from their specification files.
- Write `getvibe.dev` only as the separate catalog domain.

## Boundaries

This repository does not own the `getvibe.dev` deployment.
Do not add live routes here without confirmed deployment ownership and user approval.

## Assets

- Direction catalog: `src/catalog.ts`.
- Token and contrast output: `src/tokens.ts`.
- Marks and scaffold output: `src/generators.ts`.
- Mascot system: `mascot/engine.js` and `docs/mascot-system.md`.
