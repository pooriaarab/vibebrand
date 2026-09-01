import type { BrandDirection } from "../brand-types.js";

export const cyberpunk: BrandDirection = {
  id: "cyberpunk",
  name: "Cyberpunk / HUD",
  emotion: "intensity · adrenaline",
  blurb: "Neon-noir ops console, HUD reticles. Magenta + cyan + amber.",
  light: { bg: "oklch(0.96 0.012 220)", fg: "oklch(0.20 0.03 220)", muted: "oklch(0.44 0.04 220)", primary: "oklch(0.55 0.26 350)", secondary: "oklch(0.52 0.13 200)", tertiary: "oklch(0.53 0.15 75)" },
  dark: { bg: "oklch(0.15 0.02 220)", fg: "oklch(0.92 0.03 195)", muted: "oklch(0.68 0.05 200)", primary: "oklch(0.68 0.27 350)", secondary: "oklch(0.85 0.15 195)", tertiary: "oklch(0.80 0.17 75)" },
  fonts: { display: "Chakra Petch", body: "Inter", mono: "JetBrains Mono" },
  signature: "HUD corner brackets + reticles, scan lines, glitch on a keyword, chamfered buttons",
  press: "glow-inset",
  radius: "sharp",
};
