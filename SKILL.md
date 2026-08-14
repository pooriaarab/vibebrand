---
name: vibebrand
description: Generate a tokenized brand/design system for a project — pick one of 14 distinct, emotion-tagged directions and emit CSS design tokens (light + dark), a font pairing, and radius/shadow language. Use when a project needs a palette, theme, design tokens, or a starting brand direction fast. Triggers: "give me design tokens", "pick a brand direction", "generate a theme/palette", "I need a design system", "brand this project".
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
  default). Pick a direction whose *emotion* fits the product, generate its tokens, build
  inside them.
- You want a themeable token layer (light + dark) with a matched radius + shadow language.

For the full multi-direction *exploration* (build several prototypes, review, pick) use the
`saas-brand-system` skill — vibebrand is the packaged token generator for the chosen direction.

## Output

The CSS puts the light palette on `:root`, the dark palette on `[data-theme="dark"]` +
`prefers-color-scheme`, plus `--radius`, `--shadow-sm/md/lg`, and `--font-display/body/mono`.
Reference the vars in components and the UI themes automatically.
