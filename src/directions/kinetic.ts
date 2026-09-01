import type { BrandDirection } from "../brand-types.js";

export const kinetic: BrandDirection = {
  id: "kinetic",
  name: "Kinetic / Motion-first",
  emotion: "momentum · excitement",
  blurb: "Marquee rails, live counters, everything moves. Yellow + red + blue.",
  light: { bg: "oklch(0.97 0.01 95)", fg: "oklch(0.15 0.01 250)", muted: "oklch(0.44 0.02 250)", primary: "oklch(0.53 0.18 45)", secondary: "oklch(0.50 0.15 240)", tertiary: "oklch(0.62 0.14 100)" },
  dark: { bg: "oklch(0.15 0.01 250)", fg: "oklch(0.97 0.01 95)", muted: "oklch(0.70 0.02 250)", primary: "oklch(0.88 0.19 100)", secondary: "oklch(0.66 0.22 35)", tertiary: "oklch(0.72 0.16 240)" },
  fonts: { display: "Anton", body: "Inter", mono: "JetBrains Mono" },
  signature: "opposing marquee rails, live dispatch counter, continuously-looping fan-out",
  press: "hard-stamp",
  radius: "sharp",
};
