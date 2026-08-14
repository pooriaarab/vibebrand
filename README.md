# vibebrand

Generate a complete, tokenized brand/design system in seconds. Pick one of 14
distinct, emotion-tagged directions and get a ready-to-use set of CSS design
tokens (light + dark), a font pairing, and a starting point for the rest of the
brand kit.

Productizes the `saas-brand-system` workflow: instead of hand-rolling a palette
and theme every time, commit to a *direction* and generate the foundation.

```bash
npx vibebrand directions          # list the directions
npx vibebrand tokens brutalist    # print the design-system CSS
npx vibebrand tokens signal > tokens.css
```

## Use it as a library

```ts
import { getDirection, renderTokensCss, createVibebrand } from "vibebrand";

const css = renderTokensCss(getDirection("blueprint")!);

// or the façade
const vb = createVibebrand();
vb.directions();        // all 14
vb.tokens("aurora");    // CSS custom properties
vb.json("aurora");      // structured token object
```

Each direction ships a light + dark palette (oklch), a radius + shadow language
matched to its "press personality", and display/body/mono fonts. Drop the CSS on
`:root`, reference `var(--bg)`, `var(--fg)`, `var(--accent)`, `var(--radius)`,
`var(--shadow-md)`, `var(--font-display)` in your components, and the whole UI
themes — including a working dark mode.

## The directions

`signal` · `fanout` · `blueprint` · `anime` · `brutalist` · `aurora` ·
`synthwave` · `editorial` · `kinetic` · `organic` · `cyberpunk` · `luxury` ·
`clay` · `constellation` — each targets a distinct emotion (run
`vibebrand directions` for the list).

## Roadmap

- **Logo / favicon / OG generators** — emit an SVG mark, favicon set, and OG
  image per direction.
- **MCP server** (`vibebrand-mcp`) — drive the generators from any AI agent.
- **`vibebrand init`** — scaffold tokens + logo + a `/brand` guidelines page
  straight into a project.
- **Framework adapters** — Tailwind v4 `@theme` export, shadcn token map.

Part of the [getvibe.dev](https://getvibe.dev) family.

## License

MIT © Pooria Arab
