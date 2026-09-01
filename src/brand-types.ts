/**
 * The vibebrand direction catalog — distinct, emotion-tagged brand worlds.
 * Each ships a proper 3-color system (primary / secondary / tertiary) plus
 * surfaces and text, in light AND dark, all contrast-checked to WCAG AA by the
 * token generator (see contrast.ts + tokens.ts). Colors are oklch.
 *
 * Productizes the `saas-brand-system` skill's style catalog.
 */

export interface Palette {
  /** page background */
  bg: string;
  /** primary text — MUST hit WCAG AA (4.5:1) on bg */
  fg: string;
  /** secondary/muted text — AA-large on bg */
  muted: string;
  /** brand color 1 (the lead) */
  primary: string;
  /** brand color 2 */
  secondary: string;
  /** brand color 3 / pop accent */
  tertiary: string;
}

export interface BrandDirection {
  id: string;
  name: string;
  /** the single emotion this world targets */
  emotion: string;
  blurb: string;
  light: Palette;
  dark: Palette;
  fonts: { display: string; body: string; mono: string };
  signature: string;
  /** where the brand lives — how buttons behave on press */
  press: "glow-inset" | "gradient-lift" | "hard-stamp" | "restrained";
  radius: "sharp" | "soft" | "round";
}
