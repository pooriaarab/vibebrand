// vibebrand · mascot engine tests (node:test, zero dependencies)
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  seededTrait,
  variantSpec,
  renderRoster,
} from "./engine.js";

// Quiet helper: load the reference spec without import assertions
import { readFileSync } from "node:fs";
const spec = JSON.parse(readFileSync(new URL("rabbit.avatar.json", import.meta.url), "utf-8"));

// Grab the default hue set so tests reference the same constant
const DEFAULT_HUES = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];

describe("seededTrait", () => {
  it("returns a float in [0, 1)", () => {
    for (const seed of ["alice", "bob", "", "\0", "你好"]) {
      const t = seededTrait(seed, "hue");
      assert(t >= 0, `${seed}: expected >= 0, got ${t}`);
      assert(t < 1, `${seed}: expected < 1, got ${t}`);
    }
  });

  it("is deterministic — same inputs always give the same output", () => {
    const a = seededTrait("alice", "hue");
    for (let i = 0; i < 20; i++) {
      assert.strictEqual(seededTrait("alice", "hue"), a);
    }
  });

  it("differs across seeds", () => {
    const seen = new Set();
    for (const seed of ["alice", "bob", "carol", "dave", "eve", "frank"]) {
      seen.add(seededTrait(seed, "hue"));
    }
    assert(seen.size > 1, "expected at least two distinct values across seeds");
  });

  it("differs across keys for the same seed", () => {
    assert.notStrictEqual(seededTrait("alice", "hue"), seededTrait("alice", "earL|rx"));
  });
});

describe("variantSpec – immutability", () => {
  it("does NOT mutate the input spec", () => {
    const before = JSON.stringify(spec);
    variantSpec(spec, "alice");
    const after = JSON.stringify(spec);
    assert.strictEqual(after, before, "input spec was mutated");
  });
});

describe("variantSpec – determinism", () => {
  it("same seed gives byte-identical output twice", () => {
    const a = JSON.stringify(variantSpec(spec, "alice"));
    const b = JSON.stringify(variantSpec(spec, "alice"));
    assert.strictEqual(b, a);
  });
});

describe("variantSpec – palette", () => {
  it("two different seeds give different body palettes (at least one of 5 differs)", () => {
    const colors = new Set();
    for (const seed of ["alice", "bob", "carol", "dave", "eve"]) {
      colors.add(variantSpec(spec, seed).palette.body);
    }
    // With 5 seeds and 10 hue slots, probability all 5 hit the same offset is
    // 10 * (1/10)^5 = 0.001 — practically guaranteed to see at least 2 distinct.
    assert(colors.size > 1, `expected at least 2 distinct body colors across 5 seeds, got ${colors.size}`);
  });

  it("ink is never hue-rotated", () => {
    for (const seed of ["alice", "bob", "carol", "dave", "eve"]) {
      assert.strictEqual(variantSpec(spec, seed).palette.ink, spec.palette.ink,
        `ink changed for seed ${seed}`);
    }
  });

  it("every generated palette colour comes from the fixed hue set — ≤10 distinct body colours over 200 seeds", () => {
    const colors = new Set();
    const seeds = Array.from({ length: 200 }, (_, i) => "s" + i);
    for (const seed of seeds) {
      colors.add(variantSpec(spec, seed).palette.body);
    }
    assert(colors.size <= DEFAULT_HUES.length,
      `expected ≤${DEFAULT_HUES.length} distinct body colours, got ${colors.size}`);
  });
});

describe("variantSpec – silhouette", () => {
  it("face parts (no silhouette:true) are geometrically unchanged vs the source", () => {
    const faceIds = new Set(["eyeL", "eyeR", "nose", "mouth"]);
    const sourceParts = spec.parts.filter(p => faceIds.has(p.id));

    for (const seed of ["alice", "bob", "carol"]) {
      const variant = variantSpec(spec, seed);
      for (const sp of sourceParts) {
        const vp = variant.parts.find(p => p.id === sp.id);
        for (const k of Object.keys(sp)) {
          if (k === "id") continue;
          assert.strictEqual(vp[k], sp[k],
            `face part "${sp.id}" property "${k}" changed for seed "${seed}": ${vp[k]} !== ${sp[k]}`);
        }
      }
    }
  });

  it("silhouette parts have geometry jittered", () => {
    const silIds = new Set(["earL", "earR", "head", "body"]);
    // Use a seed likely to jitter perceptibly — but any seed works if we compare
    // at least one property. We accept that a 0-jitter effect of the random
    // offset on a large value could round to the same; we just check at least
    // one property changed.
    let changed = false;
    for (const seed of ["jittertest1", "jittertest2", "jittertest3"]) {
      const variant = variantSpec(spec, seed);
      for (const id of silIds) {
        const orig = spec.parts.find(p => p.id === id);
        const vp = variant.parts.find(p => p.id === id);
        for (const prop of ["rx", "ry", "cx", "cy"]) {
          if (orig[prop] === undefined) continue;
          // Jittered values should differ — because the offset is non-zero and
          // the value is multiplied by (1 + offset), the only way it can round
          // to the same is if offset = 0 exactly (which has probability ~0).
          if (Math.abs(vp[prop] - orig[prop]) > 1e-10) changed = true;
        }
      }
    }
    assert(changed, "expected at least one silhouette property to jitter across 3 seeds");
  });
});

describe("renderRoster", () => {
  it("returns one entry per seed", () => {
    const roster = renderRoster(spec, ["alice", "bob", "carol"]);
    assert.strictEqual(roster.length, 3);
    assert.strictEqual(roster[0].seed, "alice");
    assert.strictEqual(roster[2].seed, "carol");
  });

  it("every entry is an SVG string", () => {
    const roster = renderRoster(spec, ["alice", "bob"]);
    for (const entry of roster) {
      assert(typeof entry.svg === "string");
      assert(entry.svg.startsWith("<svg"));
      assert(entry.svg.endsWith("</svg>"));
    }
  });

  it("two different seeds produce different SVG output", () => {
    const [a, b] = renderRoster(spec, ["alice", "bob"]).map(e => e.svg);
    // Palette differs so SVGs must differ
    assert.notStrictEqual(a, b);
  });
});

describe("variantSpec – opts passthrough", () => {
  it("accepts custom hues", () => {
    const hues = [0, 90, 180, 270];
    for (const seed of ["a", "b", "c", "d", "e"]) {
      const v = variantSpec(spec, seed, { hues });
      assert.notStrictEqual(v.palette.body, spec.palette.body);
    }
  });

  it("accepts custom jitter", () => {
    const v1 = variantSpec(spec, "alice", { jitter: 0 });
    const v2 = variantSpec(spec, "alice", { jitter: 0.2 });
    // With jitter=0, geometry should match source exactly
    const origBody = spec.parts.find(p => p.id === "body");
    const v1Body = v1.parts.find(p => p.id === "body");
    assert.strictEqual(v1Body.cx, origBody.cx, "jitter=0 should leave cx unchanged");
    // With jitter=0.2 they should differ
    const v2Body = v2.parts.find(p => p.id === "body");
    assert.notStrictEqual(v2Body.cx, origBody.cx);
  });
});

describe("variantSpec – forward compatibility", () => {
  // A spec field the engine does not know about must survive into every variant.
  // Enumerating fields by hand drops it silently, and only on rosters, so the
  // regression would surface long after the field was added.
  it("preserves unknown spec fields", () => {
    const extended = JSON.parse(JSON.stringify(spec));
    extended.futureField = { anything: 1 };
    const out = variantSpec(extended, "seed-a");
    assert.deepStrictEqual(out.futureField, { anything: 1 });
  });
});

describe("variantSpec – colour parsing", () => {
  // #fff must not be read as 0x000fff. A 3-digit palette entry would otherwise
  // come out a wrong colour even at hue offset 0, from a valid spec.
  it("expands 3-digit hex before rotating", () => {
    const white = JSON.parse(JSON.stringify(spec));
    white.palette.body = "#fff";
    // Hue rotation of a zero-saturation colour must leave it white.
    const out = variantSpec(white, "any-seed", { hues: [180] });
    assert.equal(out.palette.body.toLowerCase(), "#ffffff");
  });
});

describe("variantSpec – config validation", () => {
  // An empty set left hueOff undefined, rotateHex rotated by NaN, and every
  // variant silently came out greyscale. A throw names the mistake instead.
  it("rejects an empty hue set", () => {
    assert.throws(() => variantSpec(spec, "a", { hues: [] }), TypeError);
  });

  it("rejects a non-array hue set", () => {
    assert.throws(() => variantSpec(spec, "a", { hues: 180 }), TypeError);
  });
});

describe("variantSpec – hex forms and numeric config", () => {
  it("handles 4- and 8-digit alpha hex without folding alpha into RGB", () => {
    for (const value of ["#ffff", "#ffffffff"]) {
      const withAlpha = JSON.parse(JSON.stringify(spec));
      withAlpha.palette.body = value;
      const out = variantSpec(withAlpha, "a", { hues: [180] });
      assert.equal(out.palette.body.toLowerCase(), "#ffffff", value);
    }
  });

  it("rejects non-finite hue offsets", () => {
    assert.throws(() => variantSpec(spec, "a", { hues: [NaN] }), TypeError);
    assert.throws(() => variantSpec(spec, "a", { hues: [0, Infinity] }), TypeError);
  });

  it("rejects a non-finite jitter", () => {
    assert.throws(() => variantSpec(spec, "a", { jitter: NaN }), TypeError);
  });
});
