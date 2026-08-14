import type { BrandDirection, Palette } from "./catalog.js";
import { contrastRatio, wcagLevel, type WcagLevel } from "./contrast.js";

const RADIUS: Record<BrandDirection["radius"], string> = {
  sharp: "0",
  soft: "0.625rem",
  round: "1rem",
};

const INK = "oklch(0.15 0 0)";
const PAPER = "oklch(0.98 0 0)";

/** Pick the text color (near-ink or near-paper) with the best contrast on a fill. */
export function pickOn(fill: string): string {
  return contrastRatio(fill, INK) >= contrastRatio(fill, PAPER) ? INK : PAPER;
}

function shadowScale(d: BrandDirection): { sm: string; md: string; lg: string } {
  if (d.press === "hard-stamp") {
    return { sm: "2px 2px 0 var(--fg)", md: "4px 4px 0 var(--fg)", lg: "6px 6px 0 var(--fg)" };
  }
  return {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 12px -2px rgba(0,0,0,0.10)",
    lg: "0 12px 32px -6px rgba(0,0,0,0.16)",
  };
}

function paletteVars(p: Palette, indent = "  "): string {
  const lines = [
    `--bg: ${p.bg};`,
    // surface + border derived so they always track bg/fg and theme correctly
    `--surface: color-mix(in oklch, var(--bg) 92%, var(--fg));`,
    `--border: color-mix(in oklch, var(--fg) 18%, transparent);`,
    `--fg: ${p.fg};`,
    `--muted: ${p.muted};`,
    `--primary: ${p.primary};`,
    `--secondary: ${p.secondary};`,
    `--tertiary: ${p.tertiary};`,
    `--on-primary: ${pickOn(p.primary)};`,
    `--on-secondary: ${pickOn(p.secondary)};`,
    `--on-tertiary: ${pickOn(p.tertiary)};`,
  ];
  return lines.map((l) => indent + l).join("\n");
}

/**
 * Render a direction to CSS custom properties — a 3-color system (primary /
 * secondary / tertiary) with auto-computed accessible on-colors, surfaces,
 * radius/shadow/font tokens; light on :root, dark on prefers-color-scheme +
 * [data-theme="dark"].
 */
export function renderTokensCss(d: BrandDirection): string {
  const s = shadowScale(d);
  return `/* vibebrand — ${d.name} (${d.emotion})
   ${d.blurb}
   3-color system, WCAG-AA contrast-checked. signature: ${d.signature} */
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

export interface ContrastCheck {
  pair: string;
  ratio: number;
  level: WcagLevel;
  /** AA pass for its role (normal text ≥4.5; UI/on-fill treated ≥4.5 too) */
  pass: boolean;
}

/** The contrast pairs that must hold for a palette to be accessible. */
function checkPalette(p: Palette, theme: string): ContrastCheck[] {
  const pairs: [string, string, string, number][] = [
    [`${theme}: fg on bg`, p.fg, p.bg, 4.5],
    [`${theme}: muted on bg`, p.muted, p.bg, 4.5],
    [`${theme}: on-primary on primary`, pickOn(p.primary), p.primary, 4.5],
    [`${theme}: on-secondary on secondary`, pickOn(p.secondary), p.secondary, 4.5],
    [`${theme}: on-tertiary on tertiary`, pickOn(p.tertiary), p.tertiary, 4.5],
  ];
  return pairs.map(([pair, a, b, min]) => {
    const ratio = contrastRatio(a, b);
    return { pair, ratio: Math.round(ratio * 100) / 100, level: wcagLevel(ratio), pass: ratio >= min };
  });
}

/** Full contrast report for a direction (light + dark). */
export function checkContrast(d: BrandDirection): ContrastCheck[] {
  return [...checkPalette(d.light, "light"), ...checkPalette(d.dark, "dark")];
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
    color: {
      light: { ...d.light, onPrimary: pickOn(d.light.primary), onSecondary: pickOn(d.light.secondary), onTertiary: pickOn(d.light.tertiary) },
      dark: { ...d.dark, onPrimary: pickOn(d.dark.primary), onSecondary: pickOn(d.dark.secondary), onTertiary: pickOn(d.dark.tertiary) },
    },
    contrast: checkContrast(d),
  };
}

/** Google Fonts <link> href for a direction's fonts. */
export function googleFontsHref(d: BrandDirection): string {
  const families = [...new Set([d.fonts.display, d.fonts.body, d.fonts.mono])]
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
