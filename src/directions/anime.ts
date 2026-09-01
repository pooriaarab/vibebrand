import type { BrandDirection } from "../brand-types.js";

export const anime: BrandDirection = {
  id: "anime",
  name: "Anime / Dispatch",
  emotion: "joy · surprise",
  blurb: "Cel-shaded mascot, manga speed-lines, arcade buttons.",
  light: { bg: "oklch(0.97 0.02 90)", fg: "oklch(0.16 0.01 30)", muted: "oklch(0.44 0.03 30)", primary: "oklch(0.53 0.20 25)", secondary: "oklch(0.52 0.16 250)", tertiary: "oklch(0.70 0.16 95)" },
  dark: { bg: "oklch(0.19 0.05 285)", fg: "oklch(0.96 0.02 90)", muted: "oklch(0.72 0.04 285)", primary: "oklch(0.70 0.20 25)", secondary: "oklch(0.72 0.16 250)", tertiary: "oklch(0.85 0.17 95)" },
  fonts: { display: "Space Grotesk", body: "Inter", mono: "JetBrains Mono" },
  signature: "a courier mascot throwing event packets with manga speed-lines + comic starbursts",
  press: "hard-stamp",
  radius: "soft",
};
