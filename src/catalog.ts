/**
 * The vibebrand direction catalog — distinct, emotion-tagged brand worlds.
 * Each is a full design-system starting point: palette (light + dark), a font
 * pairing, a signature visual device, and a button "press personality".
 *
 * Productizes the `saas-brand-system` skill's style catalog. Colors are oklch.
 */

export interface Palette {
  /** page background */
  bg: string;
  /** primary text / ink */
  fg: string;
  /** the one (or first) brand accent */
  accent: string;
  /** secondary accent / support */
  accentAlt: string;
  /** muted surface */
  muted: string;
}

export interface BrandDirection {
  id: string;
  name: string;
  /** the single emotion this world targets */
  emotion: string;
  /** one-line description */
  blurb: string;
  light: Palette;
  dark: Palette;
  fonts: { display: string; body: string; mono: string };
  /** the signature visual device carried across the design */
  signature: string;
  /** how buttons behave on press — where the brand lives */
  press: "glow-inset" | "gradient-lift" | "hard-stamp" | "restrained";
  radius: "sharp" | "soft" | "round";
}

export const DIRECTIONS: BrandDirection[] = [
  {
    id: "signal",
    name: "Signal",
    emotion: "alive · fast · technical",
    blurb: "Terminal-meets-neon. A signal that fires and travels.",
    light: { bg: "oklch(0.99 0.003 250)", fg: "oklch(0.16 0.01 250)", accent: "oklch(0.62 0.14 210)", accentAlt: "oklch(0.72 0.19 130)", muted: "oklch(0.96 0.005 250)" },
    dark: { bg: "oklch(0.15 0.012 250)", fg: "oklch(0.97 0.006 250)", accent: "oklch(0.82 0.16 200)", accentAlt: "oklch(0.88 0.20 130)", muted: "oklch(0.22 0.012 250)" },
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
    light: { bg: "oklch(0.98 0.012 90)", fg: "oklch(0.20 0.02 330)", accent: "oklch(0.66 0.28 350)", accentAlt: "oklch(0.75 0.18 45)", muted: "oklch(0.95 0.02 60)" },
    dark: { bg: "oklch(0.17 0.03 330)", fg: "oklch(0.96 0.01 330)", accent: "oklch(0.70 0.26 350)", accentAlt: "oklch(0.78 0.18 45)", muted: "oklch(0.24 0.03 330)" },
    fonts: { display: "Sora", body: "Inter", mono: "JetBrains Mono" },
    signature: "a prism splitting the event beam into per-destination colored beams",
    press: "gradient-lift",
    radius: "round",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    emotion: "trust · precision",
    blurb: "Premium enterprise. Engineering grid, glass, one indigo signal.",
    light: { bg: "oklch(0.99 0.003 265)", fg: "oklch(0.20 0.015 265)", accent: "oklch(0.52 0.20 275)", accentAlt: "oklch(0.56 0.22 305)", muted: "oklch(0.96 0.006 265)" },
    dark: { bg: "oklch(0.16 0.015 265)", fg: "oklch(0.96 0.006 265)", accent: "oklch(0.60 0.21 278)", accentAlt: "oklch(0.56 0.22 305)", muted: "oklch(0.22 0.015 265)" },
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
    light: { bg: "oklch(0.97 0.02 90)", fg: "oklch(0.16 0.01 30)", accent: "oklch(0.66 0.20 25)", accentAlt: "oklch(0.68 0.15 250)", muted: "oklch(0.94 0.02 90)" },
    dark: { bg: "oklch(0.19 0.05 285)", fg: "oklch(0.96 0.02 90)", accent: "oklch(0.70 0.20 25)", accentAlt: "oklch(0.72 0.16 250)", muted: "oklch(0.26 0.05 285)" },
    fonts: { display: "Space Grotesk", body: "Inter", mono: "JetBrains Mono" },
    signature: "a courier mascot throwing event packets with manga speed-lines + comic starbursts",
    press: "hard-stamp",
    radius: "soft",
  },
  {
    id: "brutalist",
    name: "Brutalist Terminal",
    emotion: "confidence · power",
    blurb: "Exposed grid, mono system, acid accent, hard offset blocks.",
    light: { bg: "oklch(0.96 0.005 90)", fg: "oklch(0.16 0 0)", accent: "oklch(0.88 0.22 130)", accentAlt: "oklch(0.72 0.19 130)", muted: "oklch(0.93 0.004 90)" },
    dark: { bg: "oklch(0.14 0.008 150)", fg: "oklch(0.90 0.13 135)", accent: "oklch(0.88 0.22 130)", accentAlt: "oklch(0.72 0.19 135)", muted: "oklch(0.20 0.01 150)" },
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
    light: { bg: "oklch(0.97 0.012 240)", fg: "oklch(0.24 0.04 265)", accent: "oklch(0.64 0.22 300)", accentAlt: "oklch(0.80 0.15 175)", muted: "oklch(0.95 0.012 240)" },
    dark: { bg: "oklch(0.17 0.03 260)", fg: "oklch(0.96 0.01 250)", accent: "oklch(0.70 0.24 340)", accentAlt: "oklch(0.82 0.15 175)", muted: "oklch(0.23 0.03 260)" },
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
    light: { bg: "oklch(0.96 0.02 320)", fg: "oklch(0.22 0.06 285)", accent: "oklch(0.66 0.28 350)", accentAlt: "oklch(0.82 0.16 200)", muted: "oklch(0.93 0.03 320)" },
    dark: { bg: "oklch(0.18 0.06 285)", fg: "oklch(0.96 0.02 320)", accent: "oklch(0.66 0.28 350)", accentAlt: "oklch(0.82 0.16 200)", muted: "oklch(0.24 0.06 285)" },
    fonts: { display: "Chakra Petch", body: "Inter", mono: "JetBrains Mono" },
    signature: "perspective neon grid to a glowing sunset orb; event rockets across with neon trails",
    press: "gradient-lift",
    radius: "sharp",
  },
  {
    id: "editorial",
    name: "Editorial / Swiss",
    emotion: "sophistication · authority",
    blurb: "Giant serif, strict grid, pull-quotes, one vermilion accent.",
    light: { bg: "oklch(0.98 0.006 85)", fg: "oklch(0.18 0.01 60)", accent: "oklch(0.60 0.22 28)", accentAlt: "oklch(0.52 0.20 28)", muted: "oklch(0.95 0.006 85)" },
    dark: { bg: "oklch(0.185 0.012 60)", fg: "oklch(0.95 0.01 85)", accent: "oklch(0.66 0.20 28)", accentAlt: "oklch(0.72 0.16 28)", muted: "oklch(0.24 0.012 60)" },
    fonts: { display: "Fraunces", body: "Archivo", mono: "JetBrains Mono" },
    signature: "strict column rules, section numerals, hanging pull-quote, hairline contents-page index",
    press: "restrained",
    radius: "sharp",
  },
  {
    id: "kinetic",
    name: "Kinetic / Motion-first",
    emotion: "momentum · excitement",
    blurb: "Marquee rails, live counters, everything moves. Electric yellow.",
    light: { bg: "oklch(0.97 0.01 95)", fg: "oklch(0.15 0.01 250)", accent: "oklch(0.88 0.19 100)", accentAlt: "oklch(0.66 0.22 35)", muted: "oklch(0.94 0.01 95)" },
    dark: { bg: "oklch(0.15 0.01 250)", fg: "oklch(0.97 0.01 95)", accent: "oklch(0.88 0.19 100)", accentAlt: "oklch(0.66 0.22 35)", muted: "oklch(0.22 0.01 250)" },
    fonts: { display: "Anton", body: "Inter", mono: "JetBrains Mono" },
    signature: "opposing marquee rails, live dispatch counter, continuously-looping fan-out",
    press: "hard-stamp",
    radius: "sharp",
  },
  {
    id: "organic",
    name: "Organic / Living",
    emotion: "warmth · growth",
    blurb: "Mycelial roots grow the event to platforms. Moss + clay, soft.",
    light: { bg: "oklch(0.96 0.02 85)", fg: "oklch(0.28 0.03 120)", accent: "oklch(0.55 0.12 150)", accentAlt: "oklch(0.68 0.14 45)", muted: "oklch(0.93 0.028 82)" },
    dark: { bg: "oklch(0.19 0.024 155)", fg: "oklch(0.94 0.02 90)", accent: "oklch(0.72 0.13 148)", accentAlt: "oklch(0.72 0.14 60)", muted: "oklch(0.25 0.024 155)" },
    fonts: { display: "Fraunces", body: "DM Sans", mono: "JetBrains Mono" },
    signature: "morphing gooey blobs; mycelial roots growing from event to nodes (draw-on)",
    press: "glow-inset",
    radius: "round",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk / HUD",
    emotion: "intensity · adrenaline",
    blurb: "Neon-noir ops console, HUD reticles, glitch, packet stream.",
    light: { bg: "oklch(0.96 0.012 220)", fg: "oklch(0.20 0.03 220)", accent: "oklch(0.65 0.28 350)", accentAlt: "oklch(0.72 0.14 195)", muted: "oklch(0.93 0.012 220)" },
    dark: { bg: "oklch(0.15 0.02 220)", fg: "oklch(0.92 0.03 195)", accent: "oklch(0.65 0.28 350)", accentAlt: "oklch(0.85 0.15 195)", muted: "oklch(0.21 0.02 220)" },
    fonts: { display: "Chakra Petch", body: "Inter", mono: "JetBrains Mono" },
    signature: "HUD corner brackets + reticles, scan lines, glitch on a keyword, chamfered buttons",
    press: "glow-inset",
    radius: "sharp",
  },
  {
    id: "luxury",
    name: "Luxury / Obsidian & Gold",
    emotion: "prestige · desire",
    blurb: "Obsidian + gold, fine serif, gold-foil sheen. Infra as a luxury good.",
    light: { bg: "oklch(0.965 0.012 84)", fg: "oklch(0.24 0.02 60)", accent: "oklch(0.60 0.13 74)", accentAlt: "oklch(0.80 0.13 85)", muted: "oklch(0.94 0.012 84)" },
    dark: { bg: "oklch(0.16 0.008 60)", fg: "oklch(0.93 0.018 82)", accent: "oklch(0.80 0.13 85)", accentAlt: "oklch(0.86 0.10 88)", muted: "oklch(0.22 0.008 60)" },
    fonts: { display: "Cormorant Garamond", body: "Jost", mono: "JetBrains Mono" },
    signature: "thin gold hairline system, gold-foil sheen on hover, gold-line constellation, deep space",
    press: "restrained",
    radius: "sharp",
  },
  {
    id: "clay",
    name: "Clay / Soft 3D",
    emotion: "joy · tactility",
    blurb: "Puffy pressable clay shapes, pastel-punch, squishy buttons.",
    light: { bg: "oklch(0.97 0.012 285)", fg: "oklch(0.24 0.03 290)", accent: "oklch(0.62 0.19 290)", accentAlt: "oklch(0.72 0.16 25)", muted: "oklch(0.94 0.012 285)" },
    dark: { bg: "oklch(0.22 0.035 290)", fg: "oklch(0.95 0.01 290)", accent: "oklch(0.68 0.19 290)", accentAlt: "oklch(0.76 0.16 25)", muted: "oklch(0.28 0.035 290)" },
    fonts: { display: "Fredoka", body: "DM Sans", mono: "JetBrains Mono" },
    signature: "puffy clay shapes with dual soft shadows; event orb pops out to squishy platform coins",
    press: "gradient-lift",
    radius: "round",
  },
  {
    id: "constellation",
    name: "Constellation / Starmap",
    emotion: "wonder · reach",
    blurb: "Event = a star; platforms light up a constellation. Deep-space.",
    light: { bg: "oklch(0.97 0.012 260)", fg: "oklch(0.26 0.04 268)", accent: "oklch(0.72 0.14 275)", accentAlt: "oklch(0.86 0.11 90)", muted: "oklch(0.94 0.012 260)" },
    dark: { bg: "oklch(0.16 0.03 265)", fg: "oklch(0.95 0.012 250)", accent: "oklch(0.85 0.12 200)", accentAlt: "oklch(0.86 0.11 90)", muted: "oklch(0.22 0.03 265)" },
    fonts: { display: "Space Grotesk", body: "Inter", mono: "JetBrains Mono" },
    signature: "animated starfield; event-star connects via drawn glowing edges to twinkling platform stars",
    press: "glow-inset",
    radius: "sharp",
  },
];

export function getDirection(id: string): BrandDirection | undefined {
  return DIRECTIONS.find((d) => d.id === id);
}
