# vibebrand

Generate a complete, tokenized brand/design system in seconds. Pick one of 14
distinct, emotion-tagged directions and get a ready-to-use set of CSS design
tokens (light + dark), a font pairing, and a starting point for the rest of the
brand kit.

Productizes the `saas-brand-system` workflow: instead of hand-rolling a palette
and theme every time, commit to a _direction_ and generate the foundation.

```bash
npx vibebrand directions          # list the directions
npx vibebrand tokens brutalist    # print the design-system CSS
npx vibebrand tailwind signal     # Tailwind v4 @theme block
npx vibebrand logo aurora         # generative brand mark (SVG)
npx vibebrand init blueprint      # write tokens.css + tailwind.css + logo.svg into your project
```

## Use it as a library

```ts
import { getDirection, renderTokensCss, createVibebrand } from "vibebrand";

const css = renderTokensCss(getDirection("blueprint")!);

// or the façade
const vb = createVibebrand();
vb.directions(); // all 14
vb.tokens("aurora"); // CSS custom properties
vb.json("aurora"); // structured token object
```

Each direction ships a **3-color system** (`--primary` / `--secondary` /
`--tertiary`) plus surfaces and text, in light + dark (oklch), a radius + shadow
language matched to its "press personality", and display/body/mono fonts. Drop
the CSS on `:root`, reference `var(--bg)`, `var(--fg)`, `var(--primary)`,
`var(--on-primary)`, `var(--radius)`, `var(--shadow-md)`, `var(--font-display)`
in your components, and the whole UI themes — including a working dark mode.

## Accessible by construction

Every palette is **WCAG AA contrast-checked** (built-in oklch → WCAG engine). The
text color for each brand fill (`--on-primary`, `--on-secondary`, `--on-tertiary`)
is auto-picked for ≥4.5:1 contrast, and `fg`/`muted` clear AA on `bg`. Verify any
direction — or gate CI on it:

```bash
npx vibebrand check brutalist   # per-pair ratio + WCAG level
npx vibebrand check --all       # exits 1 if any pair is below AA
```

## Give the brand a face

Tokens dress the UI; a **mascot** gives the brand a character — the thing that
greets people on an empty state, celebrates a success, and shrugs on a 404. The
mascot system renders a whole character from one data file:

```js
import { renderAvatar, renderTile, renderIdle } from "vibebrand/mascot/engine.js";
import spec from "./rabbit.avatar.json" assert { type: "json" };

renderAvatar(spec, { expression: "happy" }); // hero / illustration
renderTile(spec, { size: 32 });              // favicon — the same character, never a redraw
renderIdle(spec);                            // ambient CSS animation, no runtime
```

One `.avatar.json` drives the avatar, every expression, the favicon at every
size, accessories, and an idle animation — so nothing drifts when you resize or
restyle. Swap the silhouette parts for a different animal and the rest comes for
free: `mascot/rabbit.avatar.json` (Content Rabbit), `bat.avatar.json` (BlogBat),
and `sheep.avatar.json` (Supportsheep) are the same 200-line engine, three
characters. Open `mascot/brand-lab.html` to explore any of them live.

### Roster: one spec, N distinct variants

Any product with many named entities — agents, team members, workspaces, tenants —
needs each entity to look distinct but obviously the same character. The roster
system derives N deterministic variants from one spec without hand-authoring N
avatar files.

Call `renderRoster(spec, seeds)` with your entity names:

```js
import { renderRoster } from "vibebrand/mascot/engine.js";
import spec from "./rabbit.avatar.json" assert { type: "json" };

const roster = renderRoster(spec, ["alice", "bob", "carol"]);
// → [{ seed: "alice", svg: "<svg>…</svg>" }, …]
```

Each variant gets a stable hue rotation (from a fixed enumerable set — the brand
palette never grows arbitrarily) and independent silhouette jitter. The face is
held constant: every entity shares the same eyes, nose, and mouth. A
500-person roster still uses **N colours**, not 500.

The per-seed variation is also usable directly: `variantSpec(spec, "alice")`
returns a new spec you can inspect, test, or render with any engine function.

Full method — shape language, the three-quarter turn, light/dark, why you draw
it once, and why the face is held constant — is in
[`docs/mascot-system.md`](docs/mascot-system.md).

## The directions

`signal` · `fanout` · `blueprint` · `anime` · `brutalist` · `aurora` ·
`synthwave` · `editorial` · `kinetic` · `organic` · `cyberpunk` · `luxury` ·
`clay` · `constellation` — each targets a distinct emotion (run
`vibebrand directions` for the list).

## Roadmap

Shipped: Tailwind v4 `@theme` export (`tailwind`), a generative brand mark
(`logo`), project scaffolding (`init`), and the **mascot system** (`mascot/` —
`.avatar.json` + engine + lab). Next:

- **Mascot CLI** — `vibebrand mascot <spec>` to emit the favicon set + sprite.
- **Favicon + OG generators** — a favicon set and an OG image per direction.
- **MCP server** (`vibebrand-mcp`) — drive the generators from any AI agent.
- **`vibebrand init` → `/brand` page** — also scaffold a live guidelines page.
- **shadcn token map** adapter; publish to npm.

Part of the [getvibe.dev](https://getvibe.dev) family.

## License

MIT © Pooria Arab
