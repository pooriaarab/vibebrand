import type { BrandDirection, Palette } from "./catalog.js";

const RADIUS: Record<BrandDirection["radius"], string> = {
  sharp: "0",
  soft: "0.625rem",
  round: "1rem",
};

/** Shadow language keyed off the button press personality. */
function shadowScale(d: BrandDirection): { sm: string; md: string; lg: string } {
  if (d.press === "hard-stamp") {
    return {
      sm: "2px 2px 0 var(--fg)",
      md: "4px 4px 0 var(--fg)",
      lg: "6px 6px 0 var(--fg)",
    };
  }
  return {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 12px -2px rgba(0,0,0,0.10)",
    lg: "0 12px 32px -6px rgba(0,0,0,0.16)",
  };
}

function paletteVars(p: Palette, indent = "  "): string {
  return [
    `${indent}--bg: ${p.bg};`,
    `${indent}--fg: ${p.fg};`,
    `${indent}--accent: ${p.accent};`,
    `${indent}--accent-alt: ${p.accentAlt};`,
    `${indent}--muted: ${p.muted};`,
  ].join("\n");
}

/**
 * Render a direction to a self-contained block of CSS custom properties:
 * light palette on :root, dark palette on [data-theme="dark"] and
 * prefers-color-scheme, plus radius / shadow / font tokens.
 */
export function renderTokensCss(d: BrandDirection): string {
  const s = shadowScale(d);
  return `/* vibebrand — ${d.name} (${d.emotion})
   ${d.blurb}
   signature: ${d.signature} */
:root {
${paletteVars(d.light)}

  --radius: ${RADIUS[d.radius]};
  --shadow-sm: ${s.sm};
  --shadow-md: ${s.md};
  --shadow-lg: ${s.lg};

  --font-display: "${d.fonts.display}", system-ui, sans-serif;
  --font-body: "${d.fonts.body}", system-ui, sans-serif;
  --font-mono: "${d.fonts.mono}", ui-monospace, monospace;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${paletteVars(d.dark, "    ")}
  }
}

[data-theme="dark"] {
${paletteVars(d.dark)}
}
`;
}

/** Structured token object (for JSON export / programmatic use). */
export function renderTokensJson(d: BrandDirection) {
  return {
    id: d.id,
    name: d.name,
    emotion: d.emotion,
    radius: RADIUS[d.radius],
    shadows: shadowScale(d),
    fonts: d.fonts,
    color: { light: d.light, dark: d.dark },
  };
}

/** Google Fonts <link> href for a direction's fonts. */
export function googleFontsHref(d: BrandDirection): string {
  const families = [...new Set([d.fonts.display, d.fonts.body, d.fonts.mono])]
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
