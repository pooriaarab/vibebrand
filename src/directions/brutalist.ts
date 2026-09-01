import type { BrandDirection } from "../brand-types.js";

export const brutalist: BrandDirection = {
  id: "brutalist",
  name: "Brutalist Terminal",
  emotion: "confidence · power",
  blurb: "Exposed grid, mono system, acid + cyan + magenta on ink.",
  light: { bg: "oklch(0.96 0.005 90)", fg: "oklch(0.16 0 0)", muted: "oklch(0.42 0.006 90)", primary: "oklch(0.62 0.18 135)", secondary: "oklch(0.49 0.15 235)", tertiary: "oklch(0.55 0.24 350)" },
  dark: { bg: "oklch(0.14 0.008 150)", fg: "oklch(0.90 0.13 135)", muted: "oklch(0.62 0.09 140)", primary: "oklch(0.88 0.22 130)", secondary: "oklch(0.78 0.15 220)", tertiary: "oklch(0.72 0.24 350)" },
  fonts: { display: "Archivo", body: "Inter", mono: "Space Mono" },
  signature: "exposed grid + section numerals, ASCII-ish fan-out, hard offset blocks (no radius)",
  press: "hard-stamp",
  radius: "sharp",
};
