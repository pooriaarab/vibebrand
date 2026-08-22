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
        (p.rx != null ? ` rx="${esc(p.rx)}"` : "") + ` fill="${fill}"${st}${rot}/>`;
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

// A cheap, generic outline: re-draw the silhouette parts behind, scaled up a
// touch about the focus point, in one flat color. Works for any animal because
// it never assumes a shape — it just inflates the silhouette group.
function outlineLayer(parts, pal, focus, colorHex, amount = 0.045) {
  const sil = parts.filter(p => p.silhouette);
  if (!sil.length) return "";
  const inked = sil.map(p => renderPart({ ...p, fill: "__o", stroke: undefined }, { __o: colorHex })).join("");
  const s = 1 + amount, cx = focus?.cx ?? 200, cy = focus?.cy ?? 200;
  return `<g transform="translate(${cx - s * cx} ${cy - s * cy}) scale(${s})">${inked}</g>`;
}

// ---- avatar -----------------------------------------------------------------
// opts beyond the spec: expression, accessory, field, size, outline, showField,
//   headTurn (-1..1) — shift ONLY the non-silhouette feature parts (eyes, nose,
//     mouth, highlights…) ±18px on x, so the head reads as glancing sideways;
//   flip (bool) — mirror the whole character horizontally about the viewBox
//     center (wraps the tilt group in scale(-1,1)). Both default to no-ops.
export function renderAvatar(spec, opts = {}) {
  const { expression, accessory, field = "field", size = 240, outline = null, showField = true, headTurn = 0, flip = false } = opts;
  const pal = { ...spec.palette, field: spec.palette[field] || spec.palette.field };
  const [x0, y0, w, h] = spec.viewBox;
  const vb = spec.viewBox.join(" ");
  const parts = applyExpression(spec.parts, spec.expressions?.[expression]);
  const fieldPart = parts.find(p => p.id === "field");
  const rest = parts.filter(p => p.id !== "field");
  const acc = (spec.accessories?.[accessory] || []).map(p => renderPart(p, pal)).join("");
  const back = showField && fieldPart ? renderPart(fieldPart, pal) : "";
  const ol = outline ? outlineLayer(rest, pal, spec.focus, outline) : "";
  const dx = Math.round(Math.max(-1, Math.min(1, +headTurn || 0)) * 18 * 100) / 100;
  const body = rest.map(p => {
    const el = renderPart(p, pal);
    return dx && !p.silhouette ? `<g transform="translate(${esc(dx)} 0)">${el}</g>` : el;
  }).join("");
  const tilt = spec.tilt
    ? `<g transform="rotate(${spec.tilt} ${spec.focus?.cx ?? x0 + w / 2} ${spec.focus?.cy ?? y0 + h / 2})">${ol}${body}${acc}</g>`
    : `${ol}${body}${acc}`;
  const char = flip ? `<g transform="translate(${esc(2 * x0 + w)} 0) scale(-1 1)">${tilt}</g>` : tilt;
  return `<svg width="${size}" height="${size}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${back}${char}</svg>`;
}

// ---- favicon / app tile: SAME geometry, framed on the head, clipped ---------
// Guarantees the icon can never drift from the character — it is the character.
export function renderTile(spec, opts = {}) {
  const { size = 64, shape = "round", radius = 0.23, field = "field", bg } = opts;
  const id = "m" + (_cid++);
  const [x0, y0, w, h] = spec.viewBox;
  const f = spec.focus || { cx: x0 + w / 2, cy: y0 + h / 2, scale: 0.9 };
  const s = f.scale ?? 0.9, cx = w / 2, cy = h * 0.52;
  const fill = esc(bg || spec.palette[field] || spec.palette.field);
  const shp = shape === "circle"
    ? `<circle cx="${w / 2}" cy="${h / 2}" r="${w / 2}"/>`
    : `<rect width="${w}" height="${h}" rx="${w * radius}"/>`;
  const inner = renderAvatar(spec, { size, showField: false }).replace(/^<svg[^>]*>|<\/svg>$/g, "");
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">` +
    `<defs><clipPath id="${id}">${shp}</clipPath></defs>` +
    `<g clip-path="url(#${id})"><rect width="${w}" height="${h}" fill="${fill}"/>` +
    `<g transform="translate(${cx - s * f.cx} ${cy - s * f.cy}) scale(${s})">${inner}</g></g></svg>`;
}

// ---- expression sheet -------------------------------------------------------
export function expressionNames(spec) { return Object.keys(spec.expressions || { happy: {} }); }

// ---- idle animation: emit a <style> + wrapped groups from the spec's tracks --
// Supported properties: translateY, rotate, scaleY. Portable, zero-dependency —
// no Lottie runtime. Returns an SVG string that animates in any browser.
export function renderIdle(spec, opts = {}) {
  const { size = 160, field = "field" } = opts;
  const pal = { ...spec.palette, field: spec.palette[field] || spec.palette.field };
  const [x0, y0, w, h] = spec.viewBox;
  const idle = spec.animations?.idle;
  const parts = spec.parts.filter(p => p.id !== "field");
  const fieldPart = spec.parts.find(p => p.id === "field");
  const iid = "m" + (_cid++); // unique per call, so keyframe names never collide across mascots on one page
  const iter = idle?.loop === false ? "1" : "infinite";
  const cls = {}; // partId -> [animName...]
  let css = "@media(prefers-reduced-motion:reduce){[class^=cr-]{animation:none!important}}";
  (idle?.tracks || []).forEach((t, i) => {
    if (!t.keys?.length) return;
    const name = iid + "k" + i, unit = t.property === "rotate" ? "deg" : t.property === "translateY" ? "%" : "";
    const dur = t.keys[t.keys.length - 1][0];
    if (!(dur > 0)) return;
    const frames = t.keys.map(([time, v]) => {
      const pct = (time / dur * 100).toFixed(1);
      const fn = t.property === "translateY" ? `translateY(${esc(v)}${unit})`
        : t.property === "rotate" ? `rotate(${esc(v)}${unit})` : `scaleY(${esc(v)})`;
      return `${pct}%{transform:${fn}}`;
    }).join("");
    css += `@keyframes ${name}{${frames}}`;
    const targets = Array.isArray(t.target) ? t.target : [t.target];
    targets.forEach(id => { (cls[id] = cls[id] || []).push({ name, dur }); });
  });
  const render = p => {
    const a = cls[p.id];
    const el = renderPart(p, pal);
    if (!a) return el;
    const anim = a.map(x => `${esc(x.name)} ${esc(x.dur)}s ease-in-out ${iter}`).join(",");
    const ox = p.cx != null ? `${esc(p.cx)}px` : "50%", oy = p.cy != null ? `${esc(p.cy)}px` : "50%";
    return `<g class="cr-${esc(p.id)}" style="animation:${anim};transform-box:view-box;transform-origin:${ox} ${oy}">${el}</g>`;
  };
  const body = parts.map(render).join("");
  const tilt = spec.tilt ? `<g transform="rotate(${spec.tilt} ${spec.focus?.cx ?? x0 + w / 2} ${spec.focus?.cy ?? y0 + h / 2})">${body}</g>` : body;
  return `<svg width="${size}" height="${size}" viewBox="${x0} ${y0} ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><style>${css}</style>` +
    (fieldPart ? renderPart(fieldPart, pal) : "") + tilt + `</svg>`;
}

// Convenience for Node consumers: everything in one namespace.
export default { renderPart, renderAvatar, renderTile, renderIdle, expressionNames };
