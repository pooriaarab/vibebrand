---
name: vibebrand
description: Generate a tokenized brand/design system for a project — pick one of 14 distinct, emotion-tagged directions and emit CSS design tokens (light + dark), a font pairing, and radius/shadow language; plus a parametric mascot system (one .avatar.json → avatar, favicon, expressions, animation). Use when a project needs a palette, theme, design tokens, a starting brand direction, or a character/mascot. Triggers: "give me design tokens", "pick a brand direction", "generate a theme/palette", "I need a design system", "brand this project", "design a mascot/character/logo animal".
user-invocable: true
argument-hint: "[direction-id] (e.g. brutalist, signal, aurora)"
---

# vibebrand

Generate a complete tokenized design-system foundation from a chosen direction.

## Commands

```bash
npx vibebrand directions        # list the 14 emotion-tagged directions
npx vibebrand tokens <id>       # print the design-system CSS (custom properties, light + dark)
npx vibebrand json <id>         # structured token object (JSON)
npx vibebrand fonts <id>        # Google Fonts <link> href for the direction
```

Or as a library: `import { getDirection, renderTokensCss } from "vibebrand"`.

## When to use

- A project has **no brand yet** and you need a real, distinct starting point (not a
  default). Pick a direction whose _emotion_ fits the product, generate its tokens, build
  inside them.
- You want a themeable token layer (light + dark) with a matched radius + shadow language.

For the full multi-direction _exploration_ (build several prototypes, review, pick) use the
`saas-brand-system` skill — vibebrand is the packaged token generator for the chosen direction.

## Mascot system

Give the brand a character, not just tokens. One `.avatar.json` spec renders a whole
mascot — avatar, favicon (the same character scaled, never a redraw), every expression,
accessories, light/dark, and a CSS idle animation — via `mascot/engine.js`.

```js
import { renderAvatar, renderTile, renderIdle } from "vibebrand/mascot/engine.js";
renderAvatar(spec, { expression: "happy" }); // hero
renderTile(spec, { size: 32 }); // favicon
renderIdle(spec); // ambient animation
```

- **Reference specs:** `mascot/rabbit.avatar.json`, `bat.avatar.json`, `sheep.avatar.json`
  — same engine, three animals. To brand a new project, copy a spec, swap the `palette`,
  reshape the silhouette parts for the animal; expressions/tiles/animation come free.
- **Explore live:** open `mascot/brand-lab.html` (or `?b=bat` / `?b=sheep`).
- **Method:** shape language, the three-quarter turn, favicon-is-the-character, light/dark,
  why you draw it once — see `docs/mascot-system.md`.
- **Rule:** never draw the mascot twice (a separate simplified favicon drifts). Never
  auto-trace a generated raster (broken SVG). Hand-build one geometry; review by looking.

## Output

The CSS puts the light palette on `:root`, the dark palette on `[data-theme="dark"]` +
`prefers-color-scheme`, plus `--radius`, `--shadow-sm/md/lg`, and `--font-display/body/mono`.
Reference the vars in components and the UI themes automatically.
