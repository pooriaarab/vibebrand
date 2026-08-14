#!/usr/bin/env node
import { DIRECTIONS, getDirection } from "./catalog.js";
import {
  renderTokensCss,
  renderTokensJson,
  googleFontsHref,
  checkContrast,
} from "./tokens.js";
import type { BrandDirection } from "./catalog.js";

const [cmd, arg] = process.argv.slice(2);

function listDirections() {
  const w = Math.max(...DIRECTIONS.map((d) => d.id.length));
  for (const d of DIRECTIONS) {
    console.log(`${d.id.padEnd(w)}  ${d.name} — ${d.emotion}`);
  }
}

function need(id: string | undefined) {
  const d = id ? getDirection(id) : undefined;
  if (!d) {
    console.error(`unknown direction: ${id ?? "(none)"}\nrun \`vibebrand directions\` to list them.`);
    process.exit(1);
  }
  return d;
}

switch (cmd) {
  case "directions":
  case "ls":
    listDirections();
    break;
  case "tokens":
    process.stdout.write(renderTokensCss(need(arg)) + "\n");
    break;
  case "json":
    process.stdout.write(JSON.stringify(renderTokensJson(need(arg)), null, 2) + "\n");
    break;
  case "fonts":
    console.log(googleFontsHref(need(arg)));
    break;
  case "check": {
    const targets: BrandDirection[] = arg === "--all" || arg === undefined ? DIRECTIONS : [need(arg)];
    let failed = 0;
    for (const d of targets) {
      const checks = checkContrast(d);
      const bad = checks.filter((c) => !c.pass);
      failed += bad.length;
      const mark = bad.length === 0 ? "PASS" : "FAIL";
      console.log(`\n${mark}  ${d.id} — ${d.name}`);
      for (const c of checks) {
        console.log(`  ${c.pass ? "ok " : "XX "} ${c.ratio.toFixed(2).padStart(5)}:1  ${c.level.padEnd(8)}  ${c.pair}`);
      }
    }
    if (failed > 0) {
      console.error(`\n${failed} contrast pair(s) below WCAG AA (4.5:1).`);
      process.exit(1);
    }
    console.log("\nAll pairs pass WCAG AA.");
    break;
  }
  case undefined:
  case "help":
  case "-h":
  case "--help":
    console.log(
      [
        "vibebrand — generate a tokenized brand/design system",
        "",
        "usage:",
        "  vibebrand directions          list all brand directions",
        "  vibebrand tokens <id>         print the design-system CSS (custom properties)",
        "  vibebrand json <id>           print structured tokens as JSON",
        "  vibebrand fonts <id>          print the Google Fonts <link> href",
        "  vibebrand check [id|--all]    WCAG AA contrast report (exits 1 on any fail)",
        "",
        "example:",
        "  vibebrand tokens brutalist > tokens.css",
      ].join("\n"),
    );
    break;
  default:
    console.error(`unknown command: ${cmd}\nrun \`vibebrand help\`.`);
    process.exit(1);
}
