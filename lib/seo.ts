/**
 * seo.ts
 *
 * Canonical URLs and metadata construction. See CLAUDE.md section 9.
 *
 * Rules enforced here rather than left to each page:
 *   - Every page self-canonicals to its absolute URL built from
 *     NEXT_PUBLIC_SITE_URL.
 *   - Trailing slash on, consistently.
 *   - Lowercase only. No uppercase segments anywhere.
 *   - Meta descriptions between 140 and 158 characters, each carrying a
 *     specific detail rather than just the keyword, and never ending with the
 *     brand name.
 */

import type { Metadata } from "next";
import { SITE } from "./content";

/**
 * The absolute origin every canonical, Open Graph URL, and sitemap entry is
 * built from.
 *
 * Getting this wrong does not break the build, it breaks canonicalisation
 * across all 376 pages at once, which is the single most damaging silent error
 * available on an SEO project. So the resolution order is explicit and a
 * production build without it fails rather than shipping localhost.
 *
 * VERCEL_URL is read, not created. It is a system variable Vercel injects, and
 * reading it lets preview deployments self-canonical correctly instead of
 * pointing at production or at localhost. Note the VERCEL_ prefix is reserved,
 * so no custom variable in this project may use it.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl.replace(/\/$/, "")}`;

  if (process.env.VERCEL_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set on this production deployment. " +
        "Every canonical, Open Graph URL, and sitemap entry would point at localhost. " +
        "Set it in the Vercel project settings to the real domain, with no trailing slash."
    );
  }

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Absolute URL for a path. Enforces lowercase and a trailing slash. */
export function absoluteUrl(path: string): string {
  const clean = path.toLowerCase().replace(/\/+$/, "");
  if (!clean || clean === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${clean.startsWith("/") ? "" : "/"}${clean}/`;
}

export const META_MIN = 140;
export const META_MAX = 158;

/**
 * Trims a description to the 140 to 158 character window.
 *
 * Truncation happens at a word boundary. A description that arrives under the
 * minimum is returned as is rather than padded, because padding to hit a count
 * is exactly the thin-content behaviour CLAUDE.md section 11 warns against. The
 * copy layer is responsible for writing enough detail; this is a ceiling, not a
 * generator.
 */
export function clampDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= META_MAX) return clean;
  const cut = clean.slice(0, META_MAX);
  const lastSpace = cut.lastIndexOf(" ");
  return cut.slice(0, lastSpace > 0 ? lastSpace : META_MAX).replace(/[,.;:]$/, "");
}

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Slot name from lib/images.ts, for Open Graph. */
  image?: { src: string; width: number; height: number; alt: string };
  noindex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const desc = clampDescription(description);

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE.brandName,
      type: "website",
      locale: "en_US",
      images: image
        ? [
            {
              url: `${SITE_URL}${image.src}`,
              width: image.width,
              height: image.height,
              alt: image.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description: desc,
    },
  };
}

/* ---------------------------------------------------------------------------
 * META DESCRIPTION TEMPLATES
 *
 * The six shapes in CLAUDE.md section 9. Each takes the specific detail as an
 * argument rather than generating one, because "every one must contain a
 * specific detail, not just the keyword."
 * ------------------------------------------------------------------------- */

export const metaTemplates = {
  serviceHub: (service: string, detail: string) =>
    `${service} across Rhode Island, Massachusetts, and Connecticut. ${detail}. Free quotes, no obligation.`,

  subService: (subService: string, detail: string) =>
    `${subService} in RI, MA, and CT. ${detail}. Compare quotes from contractors in your town.`,

  stateHub: (state: string, count: number, unit: string, detail: string) =>
    `Roofing, windows, siding, baths, kitchens, doors, and gutters across ${state}. Covering all ${count} ${unit}. ${detail}. Free quotes.`,

  cityHub: (city: string, st: string, stockDetail: string) =>
    `Home improvement contractors in ${city}, ${st}. ${stockDetail}. Roofing, windows, siding, baths, kitchens, doors, gutters.`,

  serviceCity: (
    service: string,
    city: string,
    st: string,
    stockDetail: string,
    band: string,
    county: string
  ) =>
    `${service} in ${city}, ${st}. ${stockDetail}. Typical range ${band}. Free quotes from contractors who work in ${county}.`,
} as const;

/** Page title. Never ends with the brand name; the layout template adds it. */
export function pageTitle(parts: string[]): string {
  return parts.filter(Boolean).join(" | ");
}
