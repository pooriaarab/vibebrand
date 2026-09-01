import type { BrandDirection } from "../brand-types.js";

export const organic: BrandDirection = {
  id: "organic",
  name: "Organic / Living",
  emotion: "warmth · growth",
  blurb: "Mycelial roots grow the event to platforms. Moss + clay + gold.",
  light: { bg: "oklch(0.96 0.02 85)", fg: "oklch(0.26 0.03 120)", muted: "oklch(0.46 0.04 120)", primary: "oklch(0.52 0.12 150)", secondary: "oklch(0.53 0.14 45)", tertiary: "oklch(0.62 0.11 88)" },
  dark: { bg: "oklch(0.19 0.024 155)", fg: "oklch(0.94 0.02 90)", muted: "oklch(0.70 0.03 130)", primary: "oklch(0.72 0.13 148)", secondary: "oklch(0.72 0.14 60)", tertiary: "oklch(0.82 0.12 88)" },
  fonts: { display: "Fraunces", body: "DM Sans", mono: "JetBrains Mono" },
  signature: "morphing gooey blobs; mycelial roots growing from event to nodes (draw-on)",
  press: "glow-inset",
  radius: "round",
};
