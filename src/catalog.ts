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

export const DIRECTIONS: BrandDirection[] = [
  {
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
  },
  {
    id: "fanout",
    name: "Fan-out / Prism",
    emotion: "delight · joy",
    blurb: "One white beam refracts through a prism into colored beams.",
    light: { bg: "oklch(0.98 0.012 90)", fg: "oklch(0.20 0.02 330)", muted: "oklch(0.48 0.04 330)", primary: "oklch(0.55 0.24 350)", secondary: "oklch(0.62 0.18 45)", tertiary: "oklch(0.52 0.20 285)" },
    dark: { bg: "oklch(0.17 0.03 330)", fg: "oklch(0.96 0.01 330)", muted: "oklch(0.72 0.04 330)", primary: "oklch(0.70 0.26 350)", secondary: "oklch(0.78 0.18 45)", tertiary: "oklch(0.68 0.20 285)" },
    fonts: { display: "Sora", body: "Inter", mono: "JetBrains Mono" },
    signature: "a prism splitting the event beam into per-destination colored beams",
    press: "gradient-lift",
    radius: "round",
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: "synthwave",
    name: "Synthwave",
    emotion: "nostalgia · exhilaration",
    blurb: "80s neon grid to a sunset horizon. Chrome type, VHS glow.",
    light: { bg: "oklch(0.96 0.02 320)", fg: "oklch(0.22 0.06 285)", muted: "oklch(0.46 0.06 285)", primary: "oklch(0.55 0.26 350)", secondary: "oklch(0.55 0.15 210)", tertiary: "oklch(0.60 0.18 45)" },
    dark: { bg: "oklch(0.18 0.06 285)", fg: "oklch(0.96 0.02 320)", muted: "oklch(0.72 0.05 285)", primary: "oklch(0.70 0.27 350)", secondary: "oklch(0.82 0.16 200)", tertiary: "oklch(0.75 0.18 45)" },
    fonts: { display: "Chakra Petch", body: "Inter", mono: "JetBrains Mono" },
    signature: "perspective neon grid to a glowing sunset orb; event rockets across with neon trails",
    press: "gradient-lift",
    radius: "sharp",
  },
  {
    id: "editorial",
    name: "Editorial / Swiss",
    emotion: "sophistication · authority",
    blurb: "Giant serif, strict grid, pull-quotes, vermilion + ink-blue + gold.",
    light: { bg: "oklch(0.98 0.006 85)", fg: "oklch(0.18 0.01 60)", muted: "oklch(0.44 0.02 60)", primary: "oklch(0.55 0.21 28)", secondary: "oklch(0.42 0.10 250)", tertiary: "oklch(0.58 0.11 85)" },
    dark: { bg: "oklch(0.185 0.012 60)", fg: "oklch(0.95 0.01 85)", muted: "oklch(0.70 0.02 60)", primary: "oklch(0.68 0.19 28)", secondary: "oklch(0.72 0.12 250)", tertiary: "oklch(0.80 0.11 85)" },
    fonts: { display: "Fraunces", body: "Archivo", mono: "JetBrains Mono" },
    signature: "strict column rules, section numerals, hanging pull-quote, hairline contents-page index",
    press: "restrained",
    radius: "sharp",
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: "luxury",
    name: "Luxury / Obsidian & Gold",
    emotion: "prestige · desire",
    blurb: "Obsidian + gold, fine serif, gold-foil sheen + deep burgundy.",
    light: { bg: "oklch(0.965 0.012 84)", fg: "oklch(0.22 0.02 60)", muted: "oklch(0.44 0.03 60)", primary: "oklch(0.53 0.12 74)", secondary: "oklch(0.45 0.10 40)", tertiary: "oklch(0.42 0.13 20)" },
    dark: { bg: "oklch(0.16 0.008 60)", fg: "oklch(0.93 0.018 82)", muted: "oklch(0.68 0.03 70)", primary: "oklch(0.82 0.13 85)", secondary: "oklch(0.72 0.10 55)", tertiary: "oklch(0.62 0.15 22)" },
    fonts: { display: "Cormorant Garamond", body: "Jost", mono: "JetBrains Mono" },
    signature: "thin gold hairline system, gold-foil sheen on hover, gold-line constellation, deep space",
    press: "restrained",
    radius: "sharp",
  },
  {
    id: "clay",
    name: "Clay / Soft 3D",
    emotion: "joy · tactility",
    blurb: "Puffy pressable clay shapes. Violet + coral + mint.",
    light: { bg: "oklch(0.97 0.012 285)", fg: "oklch(0.24 0.03 290)", muted: "oklch(0.48 0.04 290)", primary: "oklch(0.55 0.19 290)", secondary: "oklch(0.60 0.16 25)", tertiary: "oklch(0.58 0.13 165)" },
    dark: { bg: "oklch(0.22 0.035 290)", fg: "oklch(0.95 0.01 290)", muted: "oklch(0.72 0.03 290)", primary: "oklch(0.72 0.19 290)", secondary: "oklch(0.76 0.16 25)", tertiary: "oklch(0.82 0.12 165)" },
    fonts: { display: "Fredoka", body: "DM Sans", mono: "JetBrains Mono" },
    signature: "puffy clay shapes with dual soft shadows; event orb pops out to squishy platform coins",
    press: "gradient-lift",
    radius: "round",
  },
  {
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
  },
];

export function getDirection(id: string): BrandDirection | undefined {
  return DIRECTIONS.find((d) => d.id === id);
}
