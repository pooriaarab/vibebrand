import type { BrandDirection } from "../brand-types.js";

export const fanout: BrandDirection = {
  id: "fanout",
  name: "Fan-out / Prism",
  emotion: "delight · joy",
  blurb: "One white beam refracts through a prism into colored beams.",
  light: { bg: "oklch(0.98 0.012 90)", fg: "oklch(0.20 0.02 330)", muted: "oklch(0.48 0.04 330)", primary: "oklch(0.55 0.24 350)", secondary: "oklch(0.62 0.18 45)", tertiary: "oklch(0.52 0.20 285)" },
  dark: { bg: "oklch(0.17 0.03 330)", fg: "oklch(0.96 0.01 330)", muted: "oklch(0.72 0.04 330)", primary: "oklch(0.70 0.26 350)", secondary: "oklch(0.78 0.18 45)", tertiary: "oklch(0.68 0.20 285)" },
  fonts: { display: "Sora", body: "Inter", mono: "JetBrains Mono" },
  signature: "a prism splitting the event beam into per-destination colored beams",
  press: "gradient-lift",
  radius: "round",
};
