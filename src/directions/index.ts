/**
 * The direction catalog. One file per direction: each is an independent brand
 * world, and keeping them separate holds every file inside the line budget once
 * a formatter expands the objects.
 */

import type { BrandDirection } from "../brand-types.js";
import { signal } from "./signal.js";
import { fanout } from "./fanout.js";
import { blueprint } from "./blueprint.js";
import { anime } from "./anime.js";
import { brutalist } from "./brutalist.js";
import { aurora } from "./aurora.js";
import { synthwave } from "./synthwave.js";
import { editorial } from "./editorial.js";
import { kinetic } from "./kinetic.js";
import { organic } from "./organic.js";
import { cyberpunk } from "./cyberpunk.js";
import { luxury } from "./luxury.js";
import { clay } from "./clay.js";
import { constellation } from "./constellation.js";

export const DIRECTIONS: BrandDirection[] = [
  signal,
  fanout,
  blueprint,
  anime,
  brutalist,
  aurora,
  synthwave,
  editorial,
  kinetic,
  organic,
  cyberpunk,
  luxury,
  clay,
  constellation,
];
