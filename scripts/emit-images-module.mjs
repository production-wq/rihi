/**
 * Emits lib/images.ts from scripts/image-manifest.mjs.
 *
 * Keeps filenames, dimensions, and alt text in exact sync with
 * docs/image-prompts.md. Components import from lib/images.ts and can never
 * reference a slot that does not exist. Re-run after editing the manifest.
 */
import { writeFile } from "node:fs/promises";
import { IMAGE_SLOTS } from "./image-manifest.mjs";

const entries = IMAGE_SLOTS.map((s) => {
  const alt = s.alt.replace(/"/g, '\\"');
  return `  "${s.name}": {
    src: "/images/${s.folder}/${s.name}.jpg",
    width: ${s.w},
    height: ${s.h},
    alt: "${alt}",
  },`;
}).join("\n");

const out = `/**
 * images.ts
 *
 * GENERATED FILE. Do not edit by hand.
 * Source: docs/image-prompts.md -> scripts/image-manifest.mjs
 * Regenerate: node scripts/emit-images-module.mjs
 *
 * Alt text is copied verbatim from docs/image-prompts.md. It describes the
 * image and is never keyword-stuffed. See CLAUDE.md section 7.
 *
 * Next.js serves AVIF and WebP from these JPEG sources through next/image.
 */

export interface ImageSlot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const IMAGES = {
${entries}
} as const satisfies Record<string, ImageSlot>;

export type ImageName = keyof typeof IMAGES;

/** Typed accessor. A bad slot name is a compile error, never a broken build. */
export function img(name: ImageName): ImageSlot {
  return IMAGES[name];
}

/** Service slug to its hero and card slots. */
export const SERVICE_IMAGES: Record<string, { hero: ImageName; card: ImageName }> = {
  roofing: { hero: "service-hero-roofing", card: "card-roofing" },
  windows: { hero: "service-hero-windows", card: "card-windows" },
  siding: { hero: "service-hero-siding", card: "card-siding" },
  "bathroom-remodeling": {
    hero: "service-hero-bathroom-remodeling",
    card: "card-bathroom-remodeling",
  },
  "kitchen-remodeling": {
    hero: "service-hero-kitchen-remodeling",
    card: "card-kitchen-remodeling",
  },
  "entry-doors": { hero: "service-hero-entry-doors", card: "card-entry-doors" },
  gutters: { hero: "service-hero-gutters", card: "card-gutters" },
};

/** Service slug to its blog featured image. */
export const BLOG_IMAGES: Record<string, ImageName> = {
  roofing: "blog-roofing",
  windows: "blog-windows",
  siding: "blog-siding",
  "bathroom-remodeling": "blog-bathroom-remodeling",
  "kitchen-remodeling": "blog-kitchen-remodeling",
  "entry-doors": "blog-entry-doors",
  gutters: "blog-gutters",
};

/** Gallery slots grouped by service, two each. */
export const GALLERY_BY_SERVICE: Record<string, ImageName[]> = {
  roofing: ["gallery-roofing-triple-decker", "gallery-roofing-cape-cod"],
  windows: ["gallery-windows-victorian", "gallery-windows-colonial"],
  siding: ["gallery-siding-coastal-cottage", "gallery-siding-farmhouse"],
  "bathroom-remodeling": ["gallery-bathroom-tub-to-shower", "gallery-bathroom-walk-in"],
  "kitchen-remodeling": ["gallery-kitchen-triple-decker", "gallery-kitchen-colonial"],
  "entry-doors": ["gallery-door-federal", "gallery-door-ranch"],
  gutters: ["gallery-gutters-victorian", "gallery-gutters-colonial"],
};
`;

await writeFile("lib/images.ts", out);
console.log(`lib/images.ts written, ${IMAGE_SLOTS.length} slots`);
