import type { BrandDirection } from "../brand-types.js";

export const aurora: BrandDirection = {
  id: "aurora",
  name: "Aurora / Ethereal",
  emotion: "awe · calm",
  blurb: "Drifting northern-lights behind glass. Luminous, cinematic.",
  light: { bg: "oklch(0.97 0.012 240)", fg: "oklch(0.24 0.04 265)", muted: "oklch(0.48 0.05 265)", primary: "oklch(0.55 0.20 300)", secondary: "oklch(0.49 0.13 175)", tertiary: "oklch(0.58 0.20 340)" },
  dark: { bg: "oklch(0.17 0.03 260)", fg: "oklch(0.96 0.01 250)", muted: "oklch(0.72 0.03 260)", primary: "oklch(0.70 0.24 340)", secondary: "oklch(0.82 0.15 175)", tertiary: "oklch(0.72 0.20 300)" },
  fonts: { display: "Fraunces", body: "Inter", mono: "JetBrains Mono" },
  signature: "slow-drifting aurora blobs behind glass; a radiant core firing soft beams to nodes",
  press: "glow-inset",
  radius: "soft",
};
