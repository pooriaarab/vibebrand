import type { BrandDirection } from "../brand-types.js";

export const editorial: BrandDirection = {
  id: "editorial",
  name: "Editorial / Swiss",
  emotion: "sophistication · authority",
  blurb: "Giant serif, strict grid, pull-quotes, vermilion + ink-blue + gold.",
  light: { bg: "oklch(0.98 0.006 85)", fg: "oklch(0.18 0.01 60)", muted: "oklch(0.44 0.02 60)", primary: "oklch(0.55 0.21 28)", secondary: "oklch(0.42 0.10 250)", tertiary: "oklch(0.58 0.11 85)" },
  dark: { bg: "oklch(0.185 0.012 60)", fg: "oklch(0.95 0.01 85)", muted: "oklch(0.70 0.02 60)", primary: "oklch(0.68 0.19 28)", secondary: "oklch(0.72 0.12 250)", tertiary: "oklch(0.80 0.11 85)" },
  fonts: { display: "Fraunces", body: "Archivo", mono: "JetBrains Mono" },
  signature: "strict column rules, section numerals, hanging pull-quote, hairline contents-page index",
  press: "restrained",
  radius: "sharp",
};
