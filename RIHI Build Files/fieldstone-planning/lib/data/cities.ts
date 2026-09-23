/**
 * cities.ts
 *
 * CRITICAL DATA FILE. Barrel export and helpers for all 559 municipalities.
 * Do not regenerate or bulk-rewrite. See CLAUDE.md section 4.
 *
 * -----------------------------------------------------------------------------
 * COMPOSITION
 * -----------------------------------------------------------------------------
 *   Phase 1   cities-phase1.ts    39 Rhode Island municipalities (all of RI)
 *   Phase 2   cities-phase2.ts    50 Massachusetts, top 50 by population
 *   Phase 3   cities-phase3.ts   169 Connecticut municipalities (all of CT)
 *   Phase 4   cities-phase4.ts   100 Massachusetts, ranked 51 to 150
 *   Phase 5   cities-phase5.ts   201 Massachusetts, remaining
 *   -------------------------------------------------------------------------
 *   TOTAL                        559
 *
 *   Rhode Island   39   (39 in phase 1)
 *   Massachusetts 351   (50 + 100 + 201 across phases 2, 4, 5)
 *   Connecticut   169   (169 in phase 3)
 *
 * -----------------------------------------------------------------------------
 * URL MAPPING
 * -----------------------------------------------------------------------------
 *   /locations/[stateSlug]/                      state hub, 3 pages
 *   /locations/[stateSlug]/[city.slug]/          city hub, 559 pages at full rollout
 *   /locations/[stateSlug]/[city.slug]/[service]/  service x city, 3,913 pages
 *
 * Never import a phase file directly in a route. Always source from
 * getLiveCities(), which applies the ACTIVE_PHASE gate.
 *
 * -----------------------------------------------------------------------------
 * DATA CAVEATS, READ BEFORE RELYING ON A FIELD
 * -----------------------------------------------------------------------------
 * zipCodes        Representative, not exhaustive. Large municipalities carry
 *                 many more ZIPs than are listed. Verify against USPS before
 *                 using a ZIP in customer-facing copy or in schema.
 * populationTier  Bucketed from 2020 Decennial Census figures.
 * Phase 2/4/5 ordering  Massachusetts population ranking is approximate and
 *                 drawn from 2020 Census figures. Municipalities near a phase
 *                 boundary may be one or two ranks off. This affects rollout
 *                 sequence only, never correctness, since all 351 appear.
 * homeStyleNote   Researched per municipality. NEVER bulk-regenerate. This
 *                 field is the primary defense against thin templated content
 *                 and is the source material for the Local Ledger.
 */

import { CITIES_PHASE_1 } from "./cities-phase1";
import { CITIES_PHASE_2 } from "./cities-phase2";
import { CITIES_PHASE_3 } from "./cities-phase3";
import { CITIES_PHASE_4 } from "./cities-phase4";
import { CITIES_PHASE_5 } from "./cities-phase5";

export type StateCode = "RI" | "MA" | "CT";

export type PopulationTier =
  | "large"
  | "medium-large"
  | "medium"
  | "small"
  | "tiny";

export type Phase = 1 | 2 | 3 | 4 | 5;

export interface City {
  /** URL segment. Lowercase, hyphenated. NEVER change after launch. */
  slug: string;
  /** Display name, properly cased. */
  city: string;
  state: StateCode;
  /** Full county name including the word County. */
  county: string;
  /** Representative ZIP codes. Not exhaustive. */
  zipCodes: string[];
  /** Adjacent municipalities. Powers lateral internal linking. */
  nearbyTowns: string[];
  populationTier: PopulationTier;
  /** Rollout phase. Gated by ACTIVE_PHASE. */
  phase: Phase;
  /** Second gate for the unbuilt city x service x subservice tier. */
  subServiceLive: boolean;
  /** Specific to this municipality's actual housing stock. Never generic. */
  homeStyleNote: string;
  /** Sub-state region label. Powers grouping in link blocks and state hubs. */
  region: string;
}

export const STATE_NAMES: Record<StateCode, string> = {
  RI: "Rhode Island",
  MA: "Massachusetts",
  CT: "Connecticut",
};

export const STATE_SLUGS: Record<StateCode, string> = {
  RI: "rhode-island",
  MA: "massachusetts",
  CT: "connecticut",
};

export const SLUG_TO_STATE: Record<string, StateCode> = {
  "rhode-island": "RI",
  massachusetts: "MA",
  connecticut: "CT",
};

/** Every municipality, regardless of phase. Do not use in routes. */
export const ALL_CITIES: City[] = [
  ...CITIES_PHASE_1,
  ...CITIES_PHASE_2,
  ...CITIES_PHASE_3,
  ...CITIES_PHASE_4,
  ...CITIES_PHASE_5,
];

/* ---------------------------------------------------------------------------
 * PHASE GATE
 * ------------------------------------------------------------------------- */

/**
 * Reads ACTIVE_PHASE. Defaults to 0 when unset or unparseable.
 *
 * The zero default is deliberate. A missing environment variable must never
 * publish thousands of pages by accident.
 */
export function getActivePhase(): number {
  const raw = process.env.ACTIVE_PHASE;
  if (!raw) return 0;
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < 0 || parsed > 5) return 0;
  return parsed;
}

/**
 * The only city source a route may use. Applies the ACTIVE_PHASE gate.
 *
 * At ACTIVE_PHASE=0 this returns an empty array and no city pages are built,
 * which is correct. Sitemap entries, footer links, and nearby-town links must
 * all filter through this function.
 */
export function getLiveCities(): City[] {
  const active = getActivePhase();
  if (active < 1) return [];
  return ALL_CITIES.filter((c) => c.phase <= active);
}

/**
 * Cities cleared for the city x service x subservice tier.
 *
 * That tier is NOT BUILT. Every city currently has subServiceLive: false.
 * Do not build it without explicit instruction. See services.ts header.
 */
export function getLiveCitiesWithSubServices(): City[] {
  return getLiveCities().filter((c) => c.subServiceLive);
}

/* ---------------------------------------------------------------------------
 * LOOKUPS
 * ------------------------------------------------------------------------- */

/**
 * Slugs are unique within a state but NOT globally. Bristol, Warren, and
 * Middletown all exist in more than one of these three states, and there are
 * over a dozen other collisions. Always pass the state.
 */
export function getCityBySlug(
  slug: string,
  state: StateCode
): City | undefined {
  return ALL_CITIES.find((c) => c.slug === slug && c.state === state);
}

/** Live cities only. Use for state hub link blocks. */
export function getCitiesByState(state: StateCode): City[] {
  return getLiveCities().filter((c) => c.state === state);
}

/** Live cities only. County names must include the word County. */
export function getCitiesByCounty(county: string, state: StateCode): City[] {
  return getLiveCities().filter(
    (c) => c.county === county && c.state === state
  );
}

/** Live cities only. Region labels are sub-state, e.g. "Providence Metro". */
export function getCitiesByRegion(region: string, state?: StateCode): City[] {
  return getLiveCities().filter(
    (c) => c.region === region && (state ? c.state === state : true)
  );
}

/* ---------------------------------------------------------------------------
 * LINK GRAPH HELPERS
 * ------------------------------------------------------------------------- */

/**
 * Nearby towns that are live, resolved to City objects.
 *
 * nearbyTowns holds display names, which may cross state lines (Pawtucket
 * neighbors Attleboro, MA). Same-state matches are preferred, then any state.
 * Capped to protect against link blocks that balloon on dense metro cities.
 */
export function getNearbyCities(city: City, limit = 6): City[] {
  const live = getLiveCities();
  const out: City[] = [];
  for (const name of city.nearbyTowns) {
    const match =
      live.find((c) => c.city === name && c.state === city.state) ??
      live.find((c) => c.city === name);
    if (match && match.slug !== city.slug) out.push(match);
    if (out.length >= limit) break;
  }
  return out;
}

/** Grouped for state hub rendering. Never render 351 cities as a flat list. */
export function groupCitiesByRegion(state: StateCode): Map<string, City[]> {
  const map = new Map<string, City[]>();
  for (const c of getCitiesByState(state)) {
    const bucket = map.get(c.region) ?? [];
    bucket.push(c);
    map.set(c.region, bucket);
  }
  for (const [, bucket] of map) {
    bucket.sort((a, b) => a.city.localeCompare(b.city));
  }
  return map;
}

export function getCityUrl(city: City): string {
  return `/locations/${STATE_SLUGS[city.state]}/${city.slug}/`;
}

export function getCityServiceUrl(city: City, serviceSlug: string): string {
  return `/locations/${STATE_SLUGS[city.state]}/${city.slug}/${serviceSlug}/`;
}

/* ---------------------------------------------------------------------------
 * VALIDATION, called by scripts/validate-data.ts
 * ------------------------------------------------------------------------- */

export const EXPECTED_COUNTS = {
  RI: 39,
  MA: 351,
  CT: 169,
  TOTAL: 559,
} as const;

export function validateCityData(): string[] {
  const errors: string[] = [];

  const counts: Record<StateCode, number> = { RI: 0, MA: 0, CT: 0 };
  for (const c of ALL_CITIES) counts[c.state] += 1;

  (Object.keys(counts) as StateCode[]).forEach((s) => {
    if (counts[s] !== EXPECTED_COUNTS[s]) {
      errors.push(
        `${s}: expected ${EXPECTED_COUNTS[s]} municipalities, found ${counts[s]}`
      );
    }
  });

  if (ALL_CITIES.length !== EXPECTED_COUNTS.TOTAL) {
    errors.push(
      `TOTAL: expected ${EXPECTED_COUNTS.TOTAL}, found ${ALL_CITIES.length}`
    );
  }

  // Slugs must be unique within a state.
  const seen = new Set<string>();
  for (const c of ALL_CITIES) {
    const key = `${c.state}:${c.slug}`;
    if (seen.has(key)) errors.push(`Duplicate slug: ${key}`);
    seen.add(key);
  }

  for (const c of ALL_CITIES) {
    if (!c.homeStyleNote || c.homeStyleNote.trim().length < 40) {
      errors.push(`${c.state}:${c.slug} homeStyleNote missing or too short`);
    }
    if (!c.zipCodes.length) errors.push(`${c.state}:${c.slug} has no zipCodes`);
    if (!c.county.endsWith("County")) {
      errors.push(`${c.state}:${c.slug} county should end in "County"`);
    }
    if (!/^[a-z0-9-]+$/.test(c.slug)) {
      errors.push(`${c.state}:${c.slug} slug has invalid characters`);
    }
  }

  return errors;
}
