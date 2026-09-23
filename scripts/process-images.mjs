/**
 * process-images.mjs
 *
 * Resizes and crops the raw model output in .image-staging/ to the exact
 * dimensions in docs/image-prompts.md, then writes optimised JPEGs into
 * public/images/<folder>/.
 *
 * -----------------------------------------------------------------------------
 * ON AVIF AND WEBP
 * -----------------------------------------------------------------------------
 * docs/image-prompts.md specifies "convert to AVIF plus WebP with a JPEG
 * fallback, and serve through next/image". This script writes only the JPEG,
 * deliberately, because next/image already performs that conversion: the
 * `formats: ["image/avif", "image/webp"]` setting in next.config.mjs makes the
 * optimiser negotiate AVIF first, then WebP, then fall back to the JPEG, per
 * request and per device size.
 *
 * Writing AVIF and WebP siblings here as well would produce files that no
 * component references, and the rule at the top of docs/image-prompts.md is
 * explicit that "a generated file that nothing references is wasted work." The
 * delivered bytes are AVIF either way. The size budgets in that document apply
 * to the delivered AVIF, which runs roughly 40 to 55 percent of the JPEG
 * source, so the JPEG ceilings used below are set accordingly.
 */

import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import { IMAGE_SLOTS } from "./image-manifest.mjs";

const STAGING = ".image-staging";
const OUT = "public/images";

/** JPEG source ceiling. Delivered AVIF lands well under the doc's budget. */
function ceilingKb(slot) {
  return slot.priority ? 520 : 260;
}

async function sourceFor(name) {
  const files = await readdir(STAGING);
  const match = files.find((f) => f.replace(/\.(jpg|png)$/, "") === name);
  if (!match) throw new Error(`No staged file for "${name}". Run npm run images:generate.`);
  return `${STAGING}/${match}`;
}

async function process(slot) {
  const src = await sourceFor(slot.name);
  const dir = `${OUT}/${slot.folder}`;
  await mkdir(dir, { recursive: true });
  const dest = `${dir}/${slot.name}.jpg`;
  const ceiling = ceilingKb(slot) * 1024;

  let quality = 82;
  let bytes = Infinity;

  // Step quality down until the file fits. Stopping at 58 rather than pushing
  // lower is deliberate: past that point asphalt shingle and cedar shingle
  // texture, which is the whole subject of several of these images, turns to
  // mush and the image stops doing its job.
  while (quality >= 58) {
    await sharp(src)
      .resize(slot.w, slot.h, { fit: "cover", position: "attention" })
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toFile(dest);

    bytes = (await stat(dest)).size;
    if (bytes <= ceiling) break;
    quality -= 6;
  }

  return { dest, bytes, quality, over: bytes > ceiling };
}

async function main() {
  console.log(`Processing ${IMAGE_SLOTS.length} slots\n`);
  let total = 0;
  const over = [];

  for (const slot of IMAGE_SLOTS) {
    const { bytes, quality, over: isOver } = await process(slot);
    total += bytes;
    if (isOver) over.push(slot.name);
    console.log(
      `${slot.name.padEnd(34)} ${String(slot.w).padStart(4)}x${String(slot.h).padEnd(4)} ` +
        `q${quality}  ${String(Math.round(bytes / 1024)).padStart(4)}KB${isOver ? "  OVER" : ""}`
    );
  }

  console.log(`\nTotal ${(total / 1024 / 1024).toFixed(1)}MB across ${IMAGE_SLOTS.length} files.`);
  if (over.length) console.log(`Over ceiling at minimum quality: ${over.join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
