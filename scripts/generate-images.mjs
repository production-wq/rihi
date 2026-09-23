/**
 * generate-images.mjs
 *
 * Generates the 41 image slots in docs/image-prompts.md through the Gemini
 * image model, writing raw output to .image-staging/.
 *
 * Run `npm run images:process` afterwards to resize, crop, and convert to
 * AVIF and WebP with a JPEG fallback. Nothing in .image-staging/ ships.
 *
 * Existing staged files are skipped, so a failed run can be re-run cheaply.
 * Pass --force to regenerate everything, or a slot name to regenerate one.
 */

import { writeFile, mkdir, readFile, access } from "node:fs/promises";
import { IMAGE_SLOTS, fullPrompt } from "./image-manifest.mjs";

const MODEL = "gemini-3-pro-image";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const STAGING = ".image-staging";

async function apiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const env = await readFile(".env.local", "utf8").catch(() => "");
  const match = env.match(/^GEMINI_API_KEY=(.+)$/m);
  if (!match) throw new Error("GEMINI_API_KEY not found in environment or .env.local");
  return match[1].trim();
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generate(slot, key) {
  const body = {
    contents: [{ parts: [{ text: fullPrompt(slot) }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: slot.ar },
    },
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const image = parts.find((p) => p.inlineData);
  if (!image) {
    const reason = json?.candidates?.[0]?.finishReason ?? "no inlineData in response";
    throw new Error(`No image returned: ${reason}`);
  }

  const buffer = Buffer.from(image.inlineData.data, "base64");
  const ext = image.inlineData.mimeType.includes("png") ? "png" : "jpg";
  const path = `${STAGING}/${slot.name}.${ext}`;
  await writeFile(path, buffer);
  return { path, bytes: buffer.length };
}

async function main() {
  const key = await apiKey();
  await mkdir(STAGING, { recursive: true });

  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const only = args.filter((a) => !a.startsWith("--"));

  let targets = IMAGE_SLOTS;
  if (only.length) targets = IMAGE_SLOTS.filter((s) => only.includes(s.name));

  console.log(`Generating ${targets.length} slots through ${MODEL}\n`);

  const failed = [];
  let done = 0;

  for (const slot of targets) {
    const already =
      (await exists(`${STAGING}/${slot.name}.jpg`)) ||
      (await exists(`${STAGING}/${slot.name}.png`));

    if (already && !force) {
      done += 1;
      console.log(`[${done}/${targets.length}] skip     ${slot.name} (already staged)`);
      continue;
    }

    let lastError;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        const { bytes } = await generate(slot, key);
        done += 1;
        console.log(
          `[${done}/${targets.length}] ok       ${slot.name}  ${slot.ar}  ${Math.round(bytes / 1024)}KB`
        );
        lastError = null;
        break;
      } catch (err) {
        lastError = err;
        if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 4000));
      }
    }

    if (lastError) {
      done += 1;
      failed.push(slot.name);
      console.log(`[${done}/${targets.length}] FAILED   ${slot.name}: ${lastError.message}`);
    }

    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\nStaged ${targets.length - failed.length} of ${targets.length}.`);
  if (failed.length) {
    console.log(`Failed: ${failed.join(", ")}`);
    console.log(`Re-run: npm run images:generate -- ${failed.join(" ")}`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
