#!/usr/bin/env node
import { DIRECTIONS, getDirection } from "./catalog.js";
import { renderTokensCss, renderTokensJson, googleFontsHref } from "./tokens.js";

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
