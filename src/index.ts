/**
 * vibebrand — generate a complete, tokenized brand/design system from a chosen
 * direction. SDK entry point.
 *
 * @example
 * import { getDirection, renderTokensCss } from "vibebrand";
 * const css = renderTokensCss(getDirection("brutalist")!);
 */

export { DIRECTIONS, getDirection } from "./catalog.js";
export type { BrandDirection, Palette } from "./catalog.js";
export {
  renderTokensCss,
  renderTokensJson,
  googleFontsHref,
  checkContrast,
  pickOn,
  type ContrastCheck,
} from "./tokens.js";
export { contrastRatio, wcagLevel, relativeLuminance, type WcagLevel } from "./contrast.js";
export {
  renderLogoSvg,
  renderLockupSvg,
  renderTailwindTheme,
  renderInitFiles,
} from "./generators.js";

import { DIRECTIONS, getDirection } from "./catalog.js";
import { renderTokensCss, renderTokensJson, checkContrast } from "./tokens.js";

/** Convenience façade over the catalog + token generators. */
export function createVibebrand() {
  return {
    directions: () => DIRECTIONS,
    get: (id: string) => getDirection(id),
    /** CSS custom-property design system for a direction id. */
    tokens: (id: string) => {
      const d = getDirection(id);
      if (!d) throw new Error(`unknown direction: ${id}`);
      return renderTokensCss(d);
    },
    /** Structured token object for a direction id. */
    json: (id: string) => {
      const d = getDirection(id);
      if (!d) throw new Error(`unknown direction: ${id}`);
      return renderTokensJson(d);
    },
    /** WCAG contrast report for a direction id (light + dark). */
    check: (id: string) => {
      const d = getDirection(id);
      if (!d) throw new Error(`unknown direction: ${id}`);
      return checkContrast(d);
    },
  };
}
