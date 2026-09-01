import type { BrandDirection } from "../brand-types.js";

export const clay: BrandDirection = {
  id: "clay",
  name: "Clay / Soft 3D",
  emotion: "joy · tactility",
  blurb: "Puffy pressable clay shapes. Violet + coral + mint.",
  light: { bg: "oklch(0.97 0.012 285)", fg: "oklch(0.24 0.03 290)", muted: "oklch(0.48 0.04 290)", primary: "oklch(0.55 0.19 290)", secondary: "oklch(0.60 0.16 25)", tertiary: "oklch(0.58 0.13 165)" },
  dark: { bg: "oklch(0.22 0.035 290)", fg: "oklch(0.95 0.01 290)", muted: "oklch(0.72 0.03 290)", primary: "oklch(0.72 0.19 290)", secondary: "oklch(0.76 0.16 25)", tertiary: "oklch(0.82 0.12 165)" },
  fonts: { display: "Fredoka", body: "DM Sans", mono: "JetBrains Mono" },
  signature: "puffy clay shapes with dual soft shadows; event orb pops out to squishy platform coins",
  press: "gradient-lift",
  radius: "round",
};
