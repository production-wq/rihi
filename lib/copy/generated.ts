/**
 * generated.ts
 *
 * Reads the per-page copy produced by scripts/generate-city-copy.mjs.
 *
 * -----------------------------------------------------------------------------
 * WHY THE COPY IS A CHECKED-IN FILE RATHER THAN A BUILD-TIME CALL
 * -----------------------------------------------------------------------------
 * The generation runs once, offline, and its output is committed. Nothing calls
 * a model during a build. Three reasons:
 *
 *   Reproducible builds. The same commit produces the same pages, so a deploy
 *   never silently rewrites indexed content.
 *   Reviewable. The copy arrives as a diff a human can read before it ships,
 *   which is the review requirement CLAUDE.md section 12 places on generated
 *   blog drafts, applied here for the same reason.
 *   No build-time dependency on an external API.
 *
 * Every verifiable figure on these pages still comes from the data layer. This
 * module supplies prose only. The Local Ledger, the cost bands, the permitting
 * authority, the ZIP codes, and the FAQs are rendered from typed repo data and
 * never from this file.
 *
 * When a page has no generated entry, the caller falls back to the
 * deterministic composition in city-body.ts, so a missing entry degrades to
 * plainer copy rather than to a broken build.
 */

import type { City } from "../data/cities";
import type { Paragraph } from "./city-body";
import raw from "../generated/city-copy.json";

interface GeneratedSection {
  heading: string;
  paragraphs: string[];
}

const COPY = raw as Record<string, GeneratedSection[]>;

function toParagraphs(sections: GeneratedSection[] | undefined): Paragraph[] | null {
  if (!sections?.length) return null;
  return sections.map((s) => ({ heading: s.heading, body: s.paragraphs }));
}

export function generatedCityHub(city: City): Paragraph[] | null {
  return toParagraphs(COPY[`hub:${city.state}:${city.slug}`]);
}

export function generatedServiceCity(city: City, serviceSlug: string): Paragraph[] | null {
  return toParagraphs(COPY[`svc:${city.state}:${city.slug}:${serviceSlug}`]);
}

export function generatedPageCount(): number {
  return Object.keys(COPY).length;
}
