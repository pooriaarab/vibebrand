import type { BrandDirection } from "../brand-types.js";

export const synthwave: BrandDirection = {
  id: "synthwave",
  name: "Synthwave",
  emotion: "nostalgia · exhilaration",
  blurb: "80s neon grid to a sunset horizon. Chrome type, VHS glow.",
  light: { bg: "oklch(0.96 0.02 320)", fg: "oklch(0.22 0.06 285)", muted: "oklch(0.46 0.06 285)", primary: "oklch(0.55 0.26 350)", secondary: "oklch(0.55 0.15 210)", tertiary: "oklch(0.60 0.18 45)" },
  dark: { bg: "oklch(0.18 0.06 285)", fg: "oklch(0.96 0.02 320)", muted: "oklch(0.72 0.05 285)", primary: "oklch(0.70 0.27 350)", secondary: "oklch(0.82 0.16 200)", tertiary: "oklch(0.75 0.18 45)" },
  fonts: { display: "Chakra Petch", body: "Inter", mono: "JetBrains Mono" },
  signature: "perspective neon grid to a glowing sunset orb; event rockets across with neon trails",
  press: "gradient-lift",
  radius: "sharp",
};
