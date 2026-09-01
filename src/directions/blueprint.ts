import type { BrandDirection } from "../brand-types.js";

export const blueprint: BrandDirection = {
  id: "blueprint",
  name: "Blueprint",
  emotion: "trust · precision",
  blurb: "Premium enterprise. Engineering grid, glass, indigo signal.",
  light: { bg: "oklch(0.99 0.003 265)", fg: "oklch(0.20 0.015 265)", muted: "oklch(0.46 0.03 265)", primary: "oklch(0.52 0.20 275)", secondary: "oklch(0.54 0.20 305)", tertiary: "oklch(0.49 0.13 220)" },
  dark: { bg: "oklch(0.16 0.015 265)", fg: "oklch(0.96 0.006 265)", muted: "oklch(0.70 0.02 265)", primary: "oklch(0.66 0.19 278)", secondary: "oklch(0.68 0.19 305)", tertiary: "oklch(0.74 0.13 220)" },
  fonts: { display: "Inter", body: "Inter", mono: "JetBrains Mono" },
  signature: "fine engineering grid, glass cards, hairline node graph traced by one indigo signal",
  press: "restrained",
  radius: "soft",
};
