/**
 * hero-formats.mjs
 *
 * Emits AVIF and WebP siblings for the two hero images only.
 *
 * -----------------------------------------------------------------------------
 * WHY THE HERO IS THE ONE EXCEPTION
 * -----------------------------------------------------------------------------
 * Everywhere else, next/image handles format negotiation from a single JPEG,
 * which is why scripts/process-images.mjs writes only JPEGs.
 *
 * The hero cannot use that path. docs/image-prompts.md specifies two different
 * photographs, not two crops: "Not a crop of the desktop hero. A vertical frame
 * needs a vertical subject." Art direction like that needs a <picture> element
 * with media queries, and a <picture> bypasses the next/image optimizer, so the
 * formats have to exist as real files.
 *
 * Two images, three formats, referenced by exactly one component. That is a
 * targeted exception rather than the blanket generation the image-prompts rule
 * warns against.
 */

import sharp from "sharp";
import { stat } from "node:fs/promises";

const HEROES = [
  { name: "hero-desktop", w: 2560, h: 1097 },
  { name: "hero-mobile", w: 1200, h: 1500 },
];

for (const hero of HEROES) {
  const src = `public/images/hero/${hero.name}.jpg`;

  // Step quality down until the AVIF fits the 250KB hero budget in
  // docs/image-prompts.md. The floor is 40, below which the overcast sky in
  // both heroes starts banding visibly.
  let quality = 58;
  let bytes = Infinity;
  while (quality >= 40) {
    await sharp(src).avif({ quality, effort: 6 }).toFile(`public/images/hero/${hero.name}.avif`);
    bytes = (await stat(`public/images/hero/${hero.name}.avif`)).size;
    if (bytes <= 250 * 1024) break;
    quality -= 4;
  }

  await sharp(src).webp({ quality: 74 }).toFile(`public/images/hero/${hero.name}.webp`);

  const sizes = await Promise.all(
    ["avif", "webp", "jpg"].map(async (ext) => {
      const { size } = await stat(`public/images/hero/${hero.name}.${ext}`);
      return `${ext} ${Math.round(size / 1024)}KB`;
    })
  );
  console.log(`${hero.name.padEnd(14)} ${hero.w}x${hero.h}  avif q${quality}  ${sizes.join("  ")}`);
}
