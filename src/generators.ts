import type { BrandDirection, Palette } from "./brand-types.js";
import { pickOn } from "./tokens.js";

const RADIUS_PX: Record<BrandDirection["radius"], number> = { sharp: 0, soft: 6, round: 12 };

/**
 * A generative brand mark: three offset squares in the direction's three brand
 * colors — a literal glyph for the 3-color system — with the direction's corner
 * radius. Square, legible at 16px, themeable. A real starting point, not final art.
 */
export function renderLogoSvg(d: BrandDirection, theme: "light" | "dark" = "light"): string {
  const p: Palette = d[theme];
  const r = RADIUS_PX[d.radius];
  const sq = (x: number, y: number, fill: string) =>
    `<rect x="${x}" y="${y}" width="20" height="20" rx="${r}" fill="${fill}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="${d.name} mark">
  ${sq(2, 2, p.tertiary)}
  ${sq(6, 6, p.secondary)}
  ${sq(10, 10, p.primary)}
</svg>`;
}

/** Primary lockup as inline SVG: mark + wordmark. */
export function renderLockupSvg(d: BrandDirection, name: string, theme: "light" | "dark" = "light"): string {
  const p = d[theme];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 32" role="img" aria-label="${name}">
  ${renderLogoSvg(d, theme).replace(/^<svg[^>]*>|<\/svg>$/g, "").trim()}
  <text x="40" y="22" font-family="${d.fonts.display}, sans-serif" font-size="20" font-weight="700" fill="${p.fg}">${name}</text>
</svg>`;
}

/** Tailwind v4 `@theme` block mapping the direction's tokens to Tailwind color/radius vars. */
export function renderTailwindTheme(d: BrandDirection): string {
  const p = d.light;
  return `/* vibebrand — ${d.name}: Tailwind v4 @theme (light; wrap the dark values in a dark variant) */
@theme {
  --color-bg: ${p.bg};
  --color-fg: ${p.fg};
  --color-muted: ${p.muted};
  --color-primary: ${p.primary};
  --color-on-primary: ${pickOn(p.primary)};
  --color-secondary: ${p.secondary};
  --color-on-secondary: ${pickOn(p.secondary)};
  --color-tertiary: ${p.tertiary};
  --color-on-tertiary: ${pickOn(p.tertiary)};
  --radius: ${RADIUS_PX[d.radius] / 16}rem;
  --font-display: "${d.fonts.display}", sans-serif;
  --font-body: "${d.fonts.body}", sans-serif;
  --font-mono: "${d.fonts.mono}", monospace;
}`;
}

/** The files `vibebrand init` writes into a project, as {filename: contents}. */
export function renderInitFiles(d: BrandDirection, cssFromTokens: string): Record<string, string> {
  return {
    "vibebrand-tokens.css": cssFromTokens,
    "vibebrand-tailwind.css": renderTailwindTheme(d),
    "vibebrand-logo.svg": renderLogoSvg(d, "light"),
    "vibebrand-logo-dark.svg": renderLogoSvg(d, "dark"),
  };
}
