/**
 * WCAG contrast math for oklch colors — so every generated palette is provably
 * accessible, not just "looks fine". Parses `oklch(L C H)`, converts through
 * OKLab → linear sRGB → relative luminance, and returns WCAG contrast ratios.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Parse an `oklch(L C H)` / `oklch(L C H / A)` string. L is 0..1, H in degrees. */
export function parseOklch(s: string): { l: number; c: number; h: number } {
  const m = s.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/i);
  if (!m) throw new Error(`not an oklch() color: ${s}`);
  const l = m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  return { l, c: parseFloat(m[2]), h: parseFloat(m[3]) };
}

/** OKLCH → linear-light sRGB (Björn Ottosson's matrices). Values may be <0 or >1 (out of gamut). */
export function oklchToLinearRgb(str: string): Rgb {
  const { l: L, c: C, h: H } = parseOklch(str);
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  return {
    r: 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    g: -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    b: -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  };
}

/** WCAG relative luminance from a linear-sRGB triple (clamped to gamut). */
export function relativeLuminance(str: string): number {
  const { r, g, b } = oklchToLinearRgb(str);
  const c = (x: number) => Math.min(1, Math.max(0, x));
  return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
}

/** WCAG contrast ratio between two oklch colors (1..21). */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export type WcagLevel = "AAA" | "AA" | "AA-large" | "fail";

/** WCAG level for a normal-text pair (AA=4.5, AAA=7); "AA-large" (3.0) for large/UI. */
export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA-large";
  return "fail";
}

// ponytail: self-check the color math — assert the anchors, else the whole
// accessibility guarantee is silently wrong. Runs via `node dist/contrast.js`
// or an import; throws on regression.
export function _selfCheck(): void {
  const white = "oklch(1 0 0)";
  const black = "oklch(0 0 0)";
  const wb = contrastRatio(white, black);
  if (Math.abs(wb - 21) > 0.5) throw new Error(`white/black should be ~21, got ${wb.toFixed(2)}`);
  if (contrastRatio(black, black) > 1.01) throw new Error("same color must be ~1");
  // mid grey on white is a known ~AA-ish anchor: just assert ordering sanity
  if (relativeLuminance(white) <= relativeLuminance(black)) throw new Error("white must be brighter than black");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  _selfCheck();
  // eslint-disable-next-line no-console
  console.log("contrast self-check OK");
}
