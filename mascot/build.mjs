// vibebrand · mascot asset builder
// Render a brand's static SVG assets from its .avatar.json spec.
//   node mascot/build.mjs <spec.avatar.json> <outDir>
// Emits: favicon.svg (round tile), icon.svg (large round tile), logo.svg (avatar
// on the brand field), mark.svg (transparent, outlined — safe on any page).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { renderTile, renderAvatar } from "./engine.js";

const [, , specPath, outDir = "."] = process.argv;
if (!specPath) { console.error("usage: build.mjs <spec.avatar.json> <outDir>"); process.exit(1); }
const spec = JSON.parse(readFileSync(specPath, "utf8"));
mkdirSync(outDir, { recursive: true });

const write = (name, svg) => { writeFileSync(`${outDir}/${name}`, svg + "\n"); console.log("wrote", `${outDir}/${name}`); };
write("favicon.svg", renderTile(spec, { size: 64, shape: "round" }));
write("icon.svg", renderTile(spec, { size: 512, shape: "round" }));
write("logo.svg", renderAvatar(spec, { size: 512 }));
write("mark.svg", renderAvatar(spec, { size: 512, showField: false, outline: spec.palette.field }));
console.log(`\n${spec.name}: 4 assets written to ${outDir}`);
