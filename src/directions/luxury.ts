import type { BrandDirection } from "../brand-types.js";

export const luxury: BrandDirection = {
  id: "luxury",
  name: "Luxury / Obsidian & Gold",
  emotion: "prestige · desire",
  blurb: "Obsidian + gold, fine serif, gold-foil sheen + deep burgundy.",
  light: { bg: "oklch(0.965 0.012 84)", fg: "oklch(0.22 0.02 60)", muted: "oklch(0.44 0.03 60)", primary: "oklch(0.53 0.12 74)", secondary: "oklch(0.45 0.10 40)", tertiary: "oklch(0.42 0.13 20)" },
  dark: { bg: "oklch(0.16 0.008 60)", fg: "oklch(0.93 0.018 82)", muted: "oklch(0.68 0.03 70)", primary: "oklch(0.82 0.13 85)", secondary: "oklch(0.72 0.10 55)", tertiary: "oklch(0.62 0.15 22)" },
  fonts: { display: "Cormorant Garamond", body: "Jost", mono: "JetBrains Mono" },
  signature: "thin gold hairline system, gold-foil sheen on hover, gold-line constellation, deep space",
  press: "restrained",
  radius: "sharp",
};
