/**
 * subservice.ts
 *
 * Reads the generated sub-service copy. See lib/copy/generated.ts for why this
 * copy is a checked-in file rather than a build-time model call.
 *
 * Returns null when an entry is missing, and the page falls back to the
 * researched description in lib/data/services.ts rather than rendering an empty
 * body or failing the build.
 */

import type { Faq } from "../schema";
import raw from "../generated/subservice-copy.json";

export interface SubServiceCopy {
  lede: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  faqs: Faq[];
}

const COPY = raw as Record<string, SubServiceCopy>;

export function subServiceCopy(
  serviceSlug: string,
  subServiceSlug: string
): SubServiceCopy | null {
  return COPY[`${serviceSlug}/${subServiceSlug}`] ?? null;
}

export function subServiceWordCount(copy: SubServiceCopy): number {
  const text = [
    copy.lede,
    ...copy.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...copy.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
