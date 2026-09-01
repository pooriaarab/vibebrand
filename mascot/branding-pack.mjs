// vibebrand · branding-pack builder
// Emit a full brand asset pack from one .avatar.json spec.
//   node mascot/branding-pack.mjs <spec.avatar.json> <outDir> ["Display Name" "Tagline"]
//
// Everything is SVG (resolution-independent). Rasterize to PNG downstream where a
// platform requires it (favicon PNGs, social uploads).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { renderTile, renderAvatar } from "./engine.js";

const [, , specPath, outDir = ".", nameArg, tagArg] = process.argv;
if (!specPath) {
  console.error("usage: branding-pack.mjs <spec> <outDir> [name] [tagline]");
  process.exit(1);
}
const spec = JSON.parse(readFileSync(specPath, "utf8"));
mkdirSync(outDir, { recursive: true });
const P = spec.palette;
const field = P.field,
  ink = P.ink || "#161616";
const title = nameArg || spec.name;
const tagline = tagArg || "";

// the character with no field, as an inner <g> we can place onto any canvas
const glyph = (size) =>
  renderAvatar(spec, { size, showField: false }).replace(/^<svg[^>]*>|<\/svg>$/g, "");
const [, , VW, VH] = spec.viewBox;

// place the 0..VW glyph into a w×h canvas at (x,y) scaled to `gh` tall
function place(gh, x, y) {
  const s = gh / VH;
  return `<g transform="translate(${x} ${y}) scale(${s})">${glyph(gh)}</g>`;
}
function textBlock({ x, y, big, small, colBig, colSmall }) {
  const t = big
    ? `<text x="${x}" y="${y}" font-family="system-ui,Segoe UI,Roboto,sans-serif" font-size="${big.size}" font-weight="800" fill="${colBig}" letter-spacing="-1">${big.t}</text>`
    : "";
  const s = small
    ? `<text x="${x}" y="${y + (big ? big.size * 0.8 : 0)}" font-family="system-ui,Segoe UI,Roboto,sans-serif" font-size="${small.size}" font-weight="500" fill="${colSmall}">${small.t}</text>`
    : "";
  return t + s;
}
const svg = (w, h, inner) =>
  `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>\n`;
const onWhite = (c) => "#ffffff";
const write = (name, s) => {
  writeFileSync(`${outDir}/${name}`, s);
  console.log("  ", name);
};

console.log(`${title} → ${outDir}`);

// --- icons / favicons ---
write("favicon.svg", renderTile(spec, { size: 64, shape: "round" }));
write("icon-512.svg", renderTile(spec, { size: 512, shape: "round" }));
write(
  "icon-maskable-512.svg",
  svg(
    512,
    512,
    `<rect width="512" height="512" fill="${field}"/>` +
      `<g transform="translate(51.2 51.2) scale(0.8)">${renderTile(spec, { size: 512, shape: "round", bg: field }).replace(/^<svg[^>]*>|<\/svg>$/g, "")}</g>`,
  ),
);
write("apple-touch-180.svg", renderTile(spec, { size: 180, shape: "round" }));

// --- logo / mark ---
write("logo-on-brand.svg", renderAvatar(spec, { size: 512 })); // character on brand field
write("mark-transparent.svg", renderAvatar(spec, { size: 512, showField: false })); // raw character, no bg
write("mark-outline.svg", renderAvatar(spec, { size: 512, showField: false, outline: field })); // safe on any page

// --- profile pictures (square, 1:1) ---
write("profile-512.svg", renderTile(spec, { size: 512, shape: "round" }));
write(
  "profile-square-512.svg",
  svg(512, 512, `<rect width="512" height="512" fill="${field}"/>${place(512, 40, 24)}`),
);

// --- Open Graph 1200×630 ---
write(
  "og-1200x630.svg",
  svg(
    1200,
    630,
    `<rect width="1200" height="630" fill="${field}"/>` +
      place(430, 96, 100) +
      textBlock({
        x: 560,
        y: 300,
        big: { t: title, size: 84 },
        small: tagline ? { t: tagline, size: 34 } : null,
        colBig: onWhite(),
        colSmall: "rgba(255,255,255,.82)",
      }),
  ),
);

// --- LinkedIn cover 1584×396 ---
write(
  "linkedin-cover-1584x396.svg",
  svg(
    1584,
    396,
    `<rect width="1584" height="396" fill="${field}"/>` +
      place(320, 120, 40) +
      textBlock({
        x: 500,
        y: 190,
        big: { t: title, size: 66 },
        small: tagline ? { t: tagline, size: 30 } : null,
        colBig: onWhite(),
        colSmall: "rgba(255,255,255,.82)",
      }),
  ),
);

// --- X / Twitter header 1500×500 ---
write(
  "x-header-1500x500.svg",
  svg(
    1500,
    500,
    `<rect width="1500" height="500" fill="${field}"/>` +
      place(360, 150, 70) +
      textBlock({
        x: 560,
        y: 250,
        big: { t: title, size: 72 },
        small: tagline ? { t: tagline, size: 32 } : null,
        colBig: onWhite(),
        colSmall: "rgba(255,255,255,.82)",
      }),
  ),
);

// --- pack README ---
write(
  "README.md",
  `# ${title} — brand assets

Generated from \`${spec.name}.avatar.json\` by vibebrand's mascot engine. All SVG
(scalable). Rasterize to PNG where a platform needs it.

| File | Use |
|------|-----|
| \`favicon.svg\`, \`apple-touch-180.svg\` | site favicon / iOS home-screen |
| \`icon-512.svg\`, \`icon-maskable-512.svg\` | PWA manifest icons |
| \`logo-on-brand.svg\` | logo on the brand field |
| \`mark-transparent.svg\` | character alone, no background (overlays) |
| \`mark-outline.svg\` | character with a brand outline — safe on any page, light or dark |
| \`profile-512.svg\`, \`profile-square-512.svg\` | social profile pictures |
| \`og-1200x630.svg\` | Open Graph / link preview |
| \`linkedin-cover-1584x396.svg\` | LinkedIn cover |
| \`x-header-1500x500.svg\` | X / Twitter header |

Brand field \`${field}\`. Regenerate: \`node vibebrand/mascot/branding-pack.mjs ${spec.name}.avatar.json <out> "${title}" "${tagline}"\`
`,
);

console.log("done");
