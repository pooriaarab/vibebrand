import type { BrandDirection } from "../brand-types.js";

export const constellation: BrandDirection = {
  id: "constellation",
  name: "Constellation / Starmap",
  emotion: "wonder · reach",
  blurb: "Event = a star; platforms light a constellation. Periwinkle + cyan + gold.",
  light: { bg: "oklch(0.97 0.012 260)", fg: "oklch(0.26 0.04 268)", muted: "oklch(0.48 0.05 268)", primary: "oklch(0.52 0.16 275)", secondary: "oklch(0.53 0.13 220)", tertiary: "oklch(0.60 0.12 90)" },
  dark: { bg: "oklch(0.16 0.03 265)", fg: "oklch(0.95 0.012 250)", muted: "oklch(0.70 0.03 265)", primary: "oklch(0.72 0.14 275)", secondary: "oklch(0.85 0.12 200)", tertiary: "oklch(0.86 0.11 90)" },
  fonts: { display: "Space Grotesk", body: "Inter", mono: "JetBrains Mono" },
  signature: "animated starfield; event-star connects via drawn glowing edges to twinkling platform stars",
  press: "glow-inset",
  radius: "sharp",
};
