# Design Context

## Overview

`vibebrand` generates design foundations; it does not enforce one house style.
The selected direction controls palette, type roles, radius, shadow, and emotional intent.
Keep generator behavior deterministic and outputs easy to inspect.
Keep CLI output readable without ANSI color.

## Colors

- Every direction defines `bg`, `fg`, `muted`, `primary`, `secondary`, and `tertiary`.
- Each direction provides separate light and dark palettes in OKLCH.
- Generated CSS derives `surface` and `border` from background and foreground.
- `pickOn()` chooses near-black or near-white text for each brand fill.
- Check foreground, muted, and all on-color pairs at `4.5:1`.
- Keep mascot colors inside each specification's semantic palette.
- Limit roster hue rotation to the configured finite set.

Do not treat one direction's colors as the `vibebrand` product palette.

## Typography

- Every direction defines display, body, and mono font roles.
- Generated CSS includes system fallbacks for all three roles.
- Google Fonts URLs are optional generated output, not a runtime requirement.
- Use monospace alignment for CLI lists and contrast reports.
- Keep direction names, emotions, ratios, and status labels easy to scan.

## Layout

- Token output defines variables, not application page structure.
- Emit light tokens on `:root`.
- Emit automatic dark tokens under `prefers-color-scheme: dark`.
- Support explicit `[data-theme="dark"]` tokens.
- Keep generated SVG view boxes and coordinates stable.
- Use each mascot specification's focus data when creating tiles.
- Align CLI columns from catalog data rather than fixed direction names.

## Elevation & Depth

- Use the selected direction's press behavior to choose shadows.
- `hard-stamp` uses solid offset shadows.
- Other press modes currently share restrained translucent shadows.
- Preserve the direction's sharp, soft, or round radius choice.
- Render mascot parts in their declared back-to-front order.
- Keep any outline behavior derived from the source mascot specification.

## Shapes

- Generated marks use three offset `20px` squares in a `32px` view box.
- Map sharp, soft, and round marks to `0`, `6`, and `12` pixel corners.
- Mascot primitives include rectangles, ellipses, circles, paths, and text.
- Derive mascot tiles from the master avatar and focus data.
- Keep face geometry stable across seeded roster variants.
- Do not create separate favicon artwork that drifts from its mascot spec.

## Components

- Direction catalog: identity, emotion, palettes, fonts, press, radius, and signature.
- Token renderer: CSS variables, JSON, contrast report, and font URL.
- Mark renderer: light and dark logo SVGs and wordmark lockups.
- Tailwind renderer: a v4 `@theme` block for the light palette.
- Initializer: tokens, Tailwind tokens, and two logo files.
- Mascot avatar: full character from one specification.
- Mascot tile: focused circular or rounded-square crop.
- Idle renderer: inline CSS animation with reduced-motion handling.
- Roster renderer: deterministic variants from user-provided seeds.

## Do's and Don'ts

- Do run `vibebrand check --all` after catalog or contrast changes.
- Do preserve exact direction IDs and semantic token names.
- Do keep generated files valid without the `vibebrand` runtime.
- Do keep reduced-motion rules in generated mascot animation.
- Do test marks and tiles at small sizes.
- Don't bypass `pickOn()` for on-color text.
- Don't claim a direction guarantees accessibility beyond checked pairs.
- Don't add unbounded colors to seeded rosters.
- Don't present roadmap commands as shipped.
- Don't add live routes without confirmed deployment ownership.
