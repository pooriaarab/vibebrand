/**
 * Lookup over the direction catalog. Types live in brand-types.ts, the
 * directions themselves in directions/.
 */

import type { BrandDirection } from "./brand-types.js";
import { DIRECTIONS } from "./directions/index.js";

export function getDirection(id: string): BrandDirection | undefined {
  return DIRECTIONS.find((d) => d.id === id);
}
