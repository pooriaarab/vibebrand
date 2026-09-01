import type { BrandDirection } from "../brand-types.js";

export const signal: BrandDirection = {
  id: "signal",
  name: "Signal",
  emotion: "alive · fast · technical",
  blurb: "Terminal-meets-neon. A signal that fires and travels.",
  light: { bg: "oklch(0.99 0.003 250)", fg: "oklch(0.16 0.01 250)", muted: "oklch(0.45 0.02 250)", primary: "oklch(0.52 0.14 210)", secondary: "oklch(0.50 0.16 145)", tertiary: "oklch(0.52 0.22 320)" },
  dark: { bg: "oklch(0.15 0.012 250)", fg: "oklch(0.97 0.006 250)", muted: "oklch(0.70 0.02 250)", primary: "oklch(0.82 0.16 200)", secondary: "oklch(0.88 0.20 130)", tertiary: "oklch(0.72 0.20 320)" },
  fonts: { display: "Space Grotesk", body: "Inter", mono: "JetBrains Mono" },
  signature: "live dispatch console + light pulses travelling wires from one node to many",
  press: "glow-inset",
  radius: "sharp",
};
