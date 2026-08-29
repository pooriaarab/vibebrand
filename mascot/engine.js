// vibebrand · mascot engine
// -----------------------------------------------------------------------------
// Render a brand mascot from a portable `.avatar.json` spec. Framework-free ES
// module — the SAME file runs in the browser and in Node, and the SAME spec
// drives the avatar, the favicon/app-icon, the expression sheet, and a CSS idle
// animation. One geometry → nothing drifts when you resize or restyle.
//
// A spec is data, not code (modelled on bible-strong-avatar-lab): swap the
// `parts` for a different animal (bat, sheep, fox…) and everything else — the
// expression system, the tile framing, the animation — keeps working. See
// `docs/mascot-system.md` for the full method and `mascot/rabbit.avatar.json`
// for a complete reference spec.
//
// Spec shape:
//   {
//     name, viewBox:[x,y,w,h], tilt,             // tilt = whole-character lean (deg)
//     focus:{cx,cy,scale},                       // head framing used by renderTile
//     palette:{ body, ink, field, accent, disc } // named colors; parts fill by name
//     parts:[ { id, type, ...geometry, fill,     // back-to-front paint order
//               stroke, strokeWidth, rotate, cx, cy, silhouette } ],
//     expressions:{ <name>:{ <partId>:{overrides} } },
//     accessories:{ <name>:[ parts ] },
//     animations:{ idle:{ loop, tracks:[ {target, property, keys:[[t,val]] } ] } }
//   }
// Geometry by `type`: rect{x,y,w,h,rx} · ellipse{cx,cy,rx,ry} · circle{cx,cy,r}
//   · path{d} · text{x,y,size,text,weight,italic}. Any part may set `rotate`
//   (about cx,cy), `stroke`+`strokeWidth`, and `fill:"none"`.
// -----------------------------------------------------------------------------

let _cid = 0;

// Specs are data that may come from an LLM/agent or an untrusted source, and
// their string values are interpolated straight into SVG/CSS/HTML (e.g. by
// brand-lab.html's innerHTML). Escape every spec-derived value used inside a
// markup attribute or text node to prevent it breaking out into new markup.
const ESCAPE_MAP = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = v => String(v).replace(/[&<>"']/g, c => ESCAPE_MAP[c]);

const color = (pal, key) => esc((key && pal[key]) ? pal[key] : (key || "none"));
const isSet = v => v !== null && v !== undefined;

function attrRotate(p) {
  return p.rotate ? ` transform="rotate(${esc(p.rotate)} ${esc(p.cx ?? 0)} ${esc(p.cy ?? 0)})"` : "";
}
function attrStroke(pal, p) {
  const s = p.stroke && pal[p.stroke] ? pal[p.stroke] : p.stroke;
  if (!s || s === "none") return "";
  return ` stroke="${esc(s)}" stroke-linecap="round" stroke-linejoin="round"` +
         (p.strokeWidth ? ` stroke-width="${esc(p.strokeWidth)}"` : "");
}

// Render one part to an SVG element string.
export function renderPart(p, pal) {
  const fill = color(pal, p.fill);
  const st = attrStroke(pal, p), rot = attrRotate(p);
  switch (p.type) {
    case "rect":
      return `<rect x="${esc(p.x)}" y="${esc(p.y)}" width="${esc(p.w)}" height="${esc(p.h)}"` +
        (isSet(p.rx) ? ` rx="${esc(p.rx)}"` : "") + ` fill="${fill}"${st}${rot}/>`;
    case "ellipse":
      return `<ellipse cx="${esc(p.cx)}" cy="${esc(p.cy)}" rx="${esc(p.rx)}" ry="${esc(p.ry)}" fill="${fill}"${st}${rot}/>`;
    case "circle":
      return `<circle cx="${esc(p.cx)}" cy="${esc(p.cy)}" r="${esc(p.r)}" fill="${fill}"${st}${rot}/>`;
    case "path":
      return `<path d="${esc(p.d)}" fill="${fill}"${st}${rot}/>`;
    case "text":
      return `<text x="${esc(p.x)}" y="${esc(p.y)}" font-size="${esc(p.size)}"` +
        (p.weight ? ` font-weight="${esc(p.weight)}"` : "") +
        (p.italic ? ` font-style="italic"` : "") + ` fill="${fill}"${st}${rot}>${esc(p.text)}</text>`;
    default:
      return "";
  }
}

// Apply a named expression's per-part overrides. Overrides set to `null` delete
// the property (so a spec can turn an ellipse eye into a path arc, etc.).
function applyExpression(parts, expr) {
  const ov = expr || {};
  return parts.map(p => {
    if (!ov[p.id]) return p;
    const merged = { ...p, ...ov[p.id] };
    for (const k of Object.keys(ov[p.id])) if (ov[p.id][k] === null) delete merged[k];
    return merged;
  });
}

function paletteFor(spec, field) {
  return { ...spec.palette, field: spec.palette[field] || spec.palette.field };
}
function viewBoxOf(spec) {
  const [x0, y0, w, h] = spec.viewBox;
  return { x0, y0, w, h, vb: spec.viewBox.join(" ") };
}
function splitField(parts) {
  return { fieldPart: parts.find(p => p.id === "field"), rest: parts.filter(p => p.id !== "field") };
}
function paintField(fieldPart, pal, showField = true) {
  return showField && fieldPart ? renderPart(fieldPart, pal) : "";
}
function tiltOrigin(spec, { x0, y0, w, h }) {
  return { cx: spec.focus?.cx ?? x0 + w / 2, cy: spec.focus?.cy ?? y0 + h / 2 };
}
function withTilt(spec, box, inner) {
  if (!spec.tilt) return inner;
  const { cx, cy } = tiltOrigin(spec, box);
  return `<g transform="rotate(${spec.tilt} ${cx} ${cy})">${inner}</g>`;
}
function svgAt(size, viewBox, inner) {
  return `<svg width="${size}" height="${size}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

// A cheap, generic outline: re-draw the silhouette parts behind, scaled up a
// touch about the focus point, in one flat color. Works for any animal because
// it never assumes a shape — it just inflates the silhouette group.
function outlineLayer({ parts, focus, colorHex, amount = 0.045 }) {
  const sil = parts.filter(p => p.silhouette);
  if (!sil.length) return "";
  const inked = sil.map(p => renderPart({ ...p, fill: "__o", stroke: undefined }, { __o: colorHex })).join("");
  const s = 1 + amount, cx = focus?.cx ?? 200, cy = focus?.cy ?? 200;
  return `<g transform="translate(${cx - s * cx} ${cy - s * cy}) scale(${s})">${inked}</g>`;
}
function maybeOutline(parts, focus, outline) {
  return outline ? outlineLayer({ parts, focus, colorHex: outline }) : "";
}
function accessoryParts(spec, accessory, pal) {
  return (spec.accessories?.[accessory] || []).map(p => renderPart(p, pal)).join("");
}
function headTurnX(headTurn) {
  return Math.round(Math.max(-1, Math.min(1, +headTurn || 0)) * 18 * 100) / 100;
}
function paintParts(parts, pal, dx) {
  return parts.map(p => {
    const el = renderPart(p, pal);
    return dx && !p.silhouette ? `<g transform="translate(${esc(dx)} 0)">${el}</g>` : el;
  }).join("");
}
function maybeFlip(flip, x0, w, inner) {
  return flip ? `<g transform="translate(${esc(2 * x0 + w)} 0) scale(-1 1)">${inner}</g>` : inner;
}
function tileShape(shape, w, h, radius) {
  return shape === "circle"
    ? `<circle cx="${w / 2}" cy="${h / 2}" r="${w / 2}"/>`
    : `<rect width="${w}" height="${h}" rx="${w * radius}"/>`;
}
function tileFocus(spec, { x0, y0, w, h }) {
  return spec.focus || { cx: x0 + w / 2, cy: y0 + h / 2, scale: 0.9 };
}

// ---- avatar -----------------------------------------------------------------
// opts beyond the spec: expression, accessory, field, size, outline, showField,
//   headTurn (-1..1) — shift ONLY the non-silhouette feature parts (eyes, nose,
//     mouth, highlights…) ±18px on x, so the head reads as glancing sideways;
//   flip (bool) — mirror the whole character horizontally about the viewBox
//     center (wraps the tilt group in scale(-1,1)). Both default to no-ops.
export function renderAvatar(spec, opts = {}) {
  const { expression, accessory, field = "field", size = 240, outline = null, showField = true, headTurn = 0, flip = false } = opts;
  const pal = paletteFor(spec, field);
  const box = viewBoxOf(spec);
  const parts = applyExpression(spec.parts, spec.expressions?.[expression]);
  const { fieldPart, rest } = splitField(parts);
  const acc = accessoryParts(spec, accessory, pal);
  const ol = maybeOutline(rest, spec.focus, outline);
  const body = paintParts(rest, pal, headTurnX(headTurn));
  const char = maybeFlip(flip, box.x0, box.w, withTilt(spec, box, `${ol}${body}${acc}`));
  return svgAt(size, box.vb, `${paintField(fieldPart, pal, showField)}${char}`);
}

// ---- favicon / app tile: SAME geometry, framed on the head, clipped ---------
// Guarantees the icon can never drift from the character — it is the character.
export function renderTile(spec, opts = {}) {
  const { size = 64, shape = "round", radius = 0.23, field = "field", bg } = opts;
  const id = "m" + (_cid++);
  const box = viewBoxOf(spec), { w, h } = box;
  const f = tileFocus(spec, box);
  const s = f.scale ?? 0.9, cx = w / 2, cy = h * 0.52;
  const fill = esc(bg || paletteFor(spec, field).field);
  const inner = renderAvatar(spec, { size, showField: false }).replace(/^<svg[^>]*>|<\/svg>$/g, "");
  return svgAt(size, `0 0 ${w} ${h}`,
    `<defs><clipPath id="${id}">${tileShape(shape, w, h, radius)}</clipPath></defs>` +
    `<g clip-path="url(#${id})"><rect width="${w}" height="${h}" fill="${fill}"/>` +
    `<g transform="translate(${cx - s * f.cx} ${cy - s * f.cy}) scale(${s})">${inner}</g></g>`);
}

// ---- expression sheet -------------------------------------------------------
export function expressionNames(spec) { return Object.keys(spec.expressions || { happy: {} }); }

function idleUnit(property) {
  if (property === "rotate") return "deg";
  if (property === "translateY") return "%";
  return "";
}
function idleTransform(property, v, unit) {
  if (property === "translateY") return `translateY(${esc(v)}${unit})`;
  if (property === "rotate") return `rotate(${esc(v)}${unit})`;
  return `scaleY(${esc(v)})`;
}
function idleIter(idle) {
  return idle?.loop === false ? "1" : "infinite";
}
function compileOneTrack(t, i, iid, cls) {
  if (!t.keys?.length) return "";
  const name = iid + "k" + i, unit = idleUnit(t.property);
  const dur = t.keys[t.keys.length - 1][0];
  if (!(dur > 0)) return "";
  const frames = t.keys.map(([time, v]) => {
    const pct = (time / dur * 100).toFixed(1);
    return `${pct}%{transform:${idleTransform(t.property, v, unit)}}`;
  }).join("");
  const targets = Array.isArray(t.target) ? t.target : [t.target];
  targets.forEach(id => { (cls[id] = cls[id] || []).push({ name, dur }); });
  return `@keyframes ${name}{${frames}}`;
}
function compileIdleTracks(tracks, iid, cls) {
  let css = "";
  (tracks || []).forEach((t, i) => { css += compileOneTrack(t, i, iid, cls); });
  return css;
}
function originOf(p) {
  const ox = isSet(p.cx) ? `${esc(p.cx)}px` : "50%", oy = isSet(p.cy) ? `${esc(p.cy)}px` : "50%";
  return `${ox} ${oy}`;
}
function wrapIdlePart(p, el, anims, iter) {
  if (!anims) return el;
  const anim = anims.map(x => `${esc(x.name)} ${esc(x.dur)}s ease-in-out ${iter}`).join(",");
  return `<g class="cr-${esc(p.id)}" style="animation:${anim};transform-box:view-box;transform-origin:${originOf(p)}">${el}</g>`;
}

// ---- idle animation: emit a <style> + wrapped groups from the spec's tracks --
// Supported properties: translateY, rotate, scaleY. Portable, zero-dependency —
// no Lottie runtime. Returns an SVG string that animates in any browser.
export function renderIdle(spec, opts = {}) {
  const { size = 160, field = "field" } = opts;
  const pal = paletteFor(spec, field);
  const box = viewBoxOf(spec);
  const idle = spec.animations?.idle;
  const { fieldPart, rest } = splitField(spec.parts);
  const iid = "m" + (_cid++); // unique per call, so keyframe names never collide across mascots on one page
  const iter = idleIter(idle);
  const cls = {}; // partId -> [animName...]
  const css = "@media(prefers-reduced-motion:reduce){[class^=cr-]{animation:none!important}}" +
    compileIdleTracks(idle?.tracks, iid, cls);
  const body = rest.map(p => wrapIdlePart(p, renderPart(p, pal), cls[p.id], iter)).join("");
  return svgAt(size, `${box.x0} ${box.y0} ${box.w} ${box.h}`,
    `<style>${css}</style>` + paintField(fieldPart, pal) + withTilt(spec, box, body));
}

// ---- seeded roster (deterministic variants from one spec) ------------------

// FNV-1a 32-bit — fast, portable, deterministic across runtimes.
function fnv1a(str) {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

// Deterministic float in [0, 1) from a seed + key pair. Same inputs always
// give the same output on any runtime.
export function seededTrait(seed, key) {
  // JSON-encode the pair rather than joining on a separator. A plain "|" join
  // is ambiguous: ("a|b", "c") and ("a", "b|c") both hash "a|b|c" and return the
  // same trait, so a seed containing the separator could silently collide with
  // another entity — the exact opposite of what a roster is for.
  return fnv1a(JSON.stringify([String(seed), String(key)])) / 0x100000000;
}

// colour helpers for variantSpec — hex ↔ HSL ↔ rotate
// Accepts #rgb, #rgba, #rrggbb and #rrggbbaa. Alpha is dropped, since the
// output is opaque hex either way.
//
// The shorthand expansion is load-bearing: parseInt("fff", 16) reads as 0x000fff,
// so #fff would rotate as rgb(0, 15, 255) instead of staying white. The 8-digit
// case matters for the same reason plus one worse — folding alpha into the RGB
// bits can flip the sign of `>> 16`. Both are silently wrong colours from a
// perfectly valid palette.
function hexToRgb(hex) {
  let h = hex.slice(1);
  if (h.length === 3 || h.length === 4) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  } else {
    h = h.slice(0, 6);
  }
  const v = parseInt(h, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const l = (mx + mn) / 2;
  let h = 0, s = 0;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (mx === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
// Hoisted rather than nested: it captures nothing, so defining it inside
// hslToRgbStr would rebuild the closure on every colour conversion.
function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgbStr({ h, s, l }) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) {
    const g = Math.round(l * 255);
    return "#" + [g, g, g].map(v => v.toString(16).padStart(2, "0")).join("");
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}
// #rgb, #rgba, #rrggbb, #rrggbbaa — the forms hexToRgb can actually read.
const HEX_RE = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

function rotateHex(hex, degrees) {
  // Non-hex palette values (`none`, a keyword, a url()) pass through untouched.
  if (!hex || hex === "none" || !hex.startsWith("#")) return hex;
  // A malformed hex must NOT slip through. parseInt returns NaN, and
  // (NaN >> 16) & 255 is 0, so `#ggg` would render solid black with no warning —
  // the same silent-wrong-result assertRosterOpts exists to prevent.
  if (!HEX_RE.test(hex)) {
    throw new TypeError(`variantSpec: malformed hex colour in palette: ${hex}`);
  }
  const { r, g, b } = hexToRgb(hex);
  const hsl = rgbToHsl(r, g, b);
  hsl.h = ((hsl.h + degrees) % 360 + 360) % 360;
  return hslToRgbStr(hsl);
}

// Build a new spec (never mutates the input) with deterministic variations
// keyed on `seed`. Colour hues rotate from a fixed, enumerable set. Silhouette
// geometry jitters independently per part property. Face parts pass through
// untouched — that keeps the roster one character.
// Rotate every palette entry except ink, which keeps the linework constant.
function rotatePalette(palette, hueOff) {
  const out = {};
  for (const [k, v] of Object.entries(palette)) {
    out[k] = k === "ink" ? v : rotateHex(v, hueOff);
  }
  return out;
}

// Jitter silhouette geometry only, independently per part and per property.
// Face parts (no silhouette flag) are returned untouched — that is what keeps
// a roster one character rather than a set of unrelated creatures.
const JITTERED = ["rx", "ry", "cx", "cy"];
function jitterSilhouettes(parts, seed, jitter) {
  return parts.map(part => {
    const p = { ...part };
    if (!p.silhouette) return p;
    for (const prop of JITTERED) {
      if (p[prop] === undefined) continue;
      const offset = (seededTrait(seed, p.id + "|" + prop) * 2 - 1) * jitter;
      p[prop] = p[prop] * (1 + offset);
    }
    return p;
  });
}

// Config mistakes raise here rather than rendering something subtly wrong:
// an empty or NaN-bearing hue set silently produced greyscale, and a
// non-finite jitter put NaN straight into cx/cy/rx/ry.
//
// jitter is a PROPORTION of each part's own value, so [0, 1) is its meaningful
// range, not merely a safe one: at 1 a part can collapse to zero size, and a
// large-but-finite value overflows p[prop] * (1 + offset) to Infinity.
function assertRosterOpts(hues, jitter) {
  if (!Array.isArray(hues) || hues.length === 0 || !hues.every(Number.isFinite)) {
    throw new TypeError("variantSpec: `hues` must be a non-empty array of finite degree offsets");
  }
  if (!Number.isFinite(jitter) || jitter < 0 || jitter >= 1) {
    throw new RangeError("variantSpec: `jitter` must be a finite number in [0, 1)");
  }
}

export function variantSpec(spec, seed, opts = {}) {
  const { jitter = 0.06, hues = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324] } = opts;
  // Fail loudly on an empty set. Left alone, hueOff is undefined, rotateHex
  // rotates by NaN, and every variant comes out greyscale — a silent, puzzling
  // wrong result from what is plainly a config mistake.
  assertRosterOpts(hues, jitter);
  // ONE hue offset per seed, drawn from the fixed enum.
  const hueOff = hues[Math.floor(seededTrait(seed, "hue") * hues.length)];
  const palette = rotatePalette(spec.palette, hueOff);
  const parts = jitterSilhouettes(spec.parts, seed, jitter);

  // Spread rather than enumerate. Listing fields by hand means any spec key
  // added later — a new animation block, metadata, anything — is silently
  // dropped from every variant, which would surface as a missing feature on
  // rosters only, long after the field was added.
  return {
    ...spec,
    focus: spec.focus ? { ...spec.focus } : undefined,
    palette,
    parts,
  };
}

// Render a roster of variants — one per seed.
export function renderRoster(spec, seeds, opts = {}) {
  return seeds.map(seed => ({
    seed,
    svg: renderAvatar(variantSpec(spec, seed, opts), opts)
  }));
}

// Convenience for Node consumers: everything in one namespace.
export default { renderPart, renderAvatar, renderTile, renderIdle, expressionNames, seededTrait, variantSpec, renderRoster };
