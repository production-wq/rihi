/**
 * ledger.ts
 *
 * Builds the Local Ledger, the mono-set data strip that opens every city hub
 * and every service x city page.
 *
 * CLAUDE.md section 7 calls this "the one thing on the page that no competitor
 * has, and it makes the page verifiably local rather than a find-and-replace
 * template," and sets a hard condition: "If the ledger cannot be filled with
 * real data for a given city, the page is not ready to publish."
 *
 * That condition is enforced here. Every field is derived from the researched
 * City record, the permitting construction in lib/data/permits.ts, or the cost
 * model in lib/data/cost-data.ts. Nothing is invented, and buildLedger throws
 * rather than emitting a field it cannot fill. A build failure is the correct
 * outcome: a ledger with a plausible-looking guess in it is worse than no page.
 */

import type { City } from "../data/cities";
import { getPermitAuthority } from "../data/permits";
import {
  SERVICE_COST,
  STATE_MULTIPLIER,
  regionMultiplier,
} from "../data/cost-data";
import {
  getCityTraits,
  dominantEra,
  cityLedgerModifier,
  STOCK_LABEL,
  type CityTraits,
  type EraFlag,
} from "./traits";

export interface LedgerField {
  label: string;
  value: string;
}

/* ---------------------------------------------------------------------------
 * ERA AND STOCK
 * ------------------------------------------------------------------------- */

const ERA_RANGE: Record<EraFlag, string> = {
  "pre-1900": "1700s to 1900",
  "pre-1940": "1890 to 1940",
  postwar: "1945 to 1975",
  modern: "1980 onward",
};

/**
 * Prefers the actual span the note names over the generic era band. A note
 * saying "most built 1890 to 1920" is better data than "1890 to 1940", and it
 * is already researched, so use it.
 */
function eraValue(city: City, traits: CityTraits): string {
  const span = city.homeStyleNote.match(
    /\b(1[6-9]\d{2})\s*(?:to|through|-|–)\s*(1[6-9]\d{2}|20[0-2]\d)\b/ // copy-lint-allow
  );
  if (span) return `${span[1]} to ${span[2]}`;
  return ERA_RANGE[dominantEra(traits)];
}

function stockValue(traits: CityTraits): string {
  const named = traits.stock.slice(0, 2).map((s) => STOCK_LABEL[s]);
  if (!named.length) return "Mixed";
  const joined = named.join(", ");
  return joined.charAt(0).toUpperCase() + joined.slice(1);
}

/* ---------------------------------------------------------------------------
 * SERVICE SUBSTRATE
 *
 * The section 7 requirement for "typical roof pitch or siding substrate for
 * that stock". Keyed on the dominant stock type, because a triple-decker and a
 * postwar cape genuinely present different substrate.
 * ------------------------------------------------------------------------- */

const SUBSTRATE: Record<string, Record<string, string>> = {
  roofing: {
    "triple-decker": "Steep main plane, low-slope rear ell",
    "mill-housing": "Steep gable, board sheathing likely",
    colonial: "6:12 to 9:12, board sheathing likely",
    federal: "8:12 to 10:12, board sheathing",
    victorian: "10:12 plus, multiple planes",
    cape: "Low eave, 8:12 to 10:12, dormers",
    ranch: "3:12 to 5:12, plywood deck",
    "split-level": "Low pitch over two levels",
    farmhouse: "Steep main, low-slope ell",
    "coastal-cottage": "Steep, salt-exposed fasteners",
    "shingle-style": "Complex planes, multiple valleys",
    "tudor-stone": "Steep, slate or synthetic slate",
    antique: "Steep gable, board sheathing",
  },
  siding: {
    "triple-decker": "Clapboard over board sheathing",
    "mill-housing": "Clapboard, narrow exposure",
    colonial: "Clapboard over board sheathing",
    federal: "Clapboard, historic profile",
    victorian: "Clapboard with trim detail",
    cape: "Shingle or clapboard, plank sheathing",
    ranch: "Plywood sheathing, mixed cladding",
    "split-level": "Plywood sheathing, mixed cladding",
    farmhouse: "Clapboard over plank",
    "coastal-cottage": "Cedar shingle, weathered",
    "shingle-style": "Cedar shingle, full coverage",
    "tudor-stone": "Stone, stucco, and half timber",
    antique: "Clapboard over plank sheathing",
  },
  windows: {
    "triple-decker": "40 to 60 openings, weight and pulley",
    "mill-housing": "Weight and pulley sash",
    colonial: "Weight and pulley, non-standard sizes",
    federal: "Historic profile, true divided light",
    victorian: "Tall narrow openings, decorative heads",
    cape: "12 to 16 openings, small sizes",
    ranch: "Aluminium sliders, standard sizes",
    "split-level": "Aluminium sliders, standard sizes",
    farmhouse: "Weight and pulley, irregular openings",
    "coastal-cottage": "Salt-exposed hardware",
    "shingle-style": "Large openings, mixed shapes",
    "tudor-stone": "Casement and leaded glass",
    antique: "Weight and pulley, out of square",
  },
  gutters: {
    "triple-decker": "Multi-plane runs, three stories",
    "mill-housing": "Close-set downspouts",
    colonial: "Long eave runs, 5 inch typical",
    federal: "Long eave runs, hidden detail",
    victorian: "Complex roofline, many corners",
    cape: "Low eave, short runs",
    ranch: "Long low runs, 5 inch typical",
    "split-level": "Split runs at two levels",
    farmhouse: "Long eave plus ell runs",
    "coastal-cottage": "Aluminium, salt exposure",
    "shingle-style": "Complex roofline, many corners",
    "tudor-stone": "Copper or half round",
    antique: "Long eave runs, plain profile",
  },
  "entry-doors": {
    "triple-decker": "Three entries, non-standard jambs",
    "mill-housing": "Non-standard openings",
    colonial: "Out of plumb jambs, granite sill",
    federal: "Transom and sidelights, historic profile",
    victorian: "Tall opening, decorative surround",
    cape: "Standard opening, low header",
    ranch: "Standard 36 inch opening",
    "split-level": "Standard opening at landing",
    farmhouse: "Out of plumb jambs, wide sill",
    "coastal-cottage": "Salt exposure at the bottom rail",
    "shingle-style": "Wide opening, sheltered entry",
    "tudor-stone": "Arched or plank door, heavy hardware",
    antique: "Out of plumb, non-standard size",
  },
  "bathroom-remodeling": {
    "triple-decker": "5x8 footprint, cast iron waste",
    "mill-housing": "Small footprint, cast iron waste",
    colonial: "Cast iron waste, plaster and lath",
    federal: "Plaster and lath, tight chases",
    victorian: "Converted room, cast iron waste",
    cape: "5x8 footprint, low knee wall",
    ranch: "5x8 on slab or crawl",
    "split-level": "5x8 over a half level",
    farmhouse: "Added bath, long runs",
    "coastal-cottage": "Seasonal plumbing, uninsulated walls",
    "shingle-style": "Larger footprint, older fixtures",
    "tudor-stone": "Plaster, tile over mud bed",
    antique: "Cast iron waste, plaster and lath",
  },
  "kitchen-remodeling": {
    "triple-decker": "Compact galley, load-bearing centre",
    "mill-housing": "Compact galley, tight chases",
    colonial: "Chimney chase, load-bearing walls",
    federal: "Chimney chase, plaster and lath",
    victorian: "Rear kitchen, later additions",
    cape: "Compact, low ceiling",
    ranch: "Open plan, slab or crawl",
    "split-level": "Open plan at upper level",
    farmhouse: "Ell kitchen, uneven floors",
    "coastal-cottage": "Compact, seasonal build",
    "shingle-style": "Larger footprint, service wing",
    "tudor-stone": "Plaster, stone exterior wall",
    antique: "Chimney chase, hand-hewn framing",
  },
};

/* ---------------------------------------------------------------------------
 * COST BAND
 * ------------------------------------------------------------------------- */

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function money(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

/**
 * The typical project band for one service in one municipality.
 *
 * Applies the documented chain from docs/tools-spec.md: state labour
 * multiplier, then regional multiplier, then the city-level stock modifier.
 * Rounding steps keep the figure honest about its own precision. A band reading
 * $10,400 to $22,600 implies a confidence the model does not have.
 */
export function serviceCostBand(city: City, serviceSlug: string): string {
  const band = SERVICE_COST[serviceSlug];
  if (!band) throw new Error(`No cost band defined for service "${serviceSlug}"`);

  const traits = getCityTraits(city);
  const factor =
    STATE_MULTIPLIER[city.state] *
    regionMultiplier(city.region) *
    (1 + cityLedgerModifier(traits));

  const step = band.high > 20000 ? 1000 : 500;
  const low = roundTo(band.low * factor, step);
  const high = roundTo(band.high * factor, step);
  return `${money(low)} to ${money(high)}`;
}

export function serviceCostBasis(serviceSlug: string): string {
  const band = SERVICE_COST[serviceSlug];
  if (!band) throw new Error(`No cost band defined for service "${serviceSlug}"`);
  return band.basis;
}

/* ---------------------------------------------------------------------------
 * BUILDERS
 * ------------------------------------------------------------------------- */

function assertFilled(fields: LedgerField[], city: City): LedgerField[] {
  for (const field of fields) {
    if (!field.value || !field.value.trim()) {
      throw new Error(
        `Local Ledger field "${field.label}" is empty for ${city.state}:${city.slug}. ` +
          `CLAUDE.md section 7: the page is not ready to publish. Fix the data rather than the ledger.`
      );
    }
  }
  return fields;
}

/** City hub ledger. Six fields, no service scope. */
export function buildCityLedger(city: City): LedgerField[] {
  const traits = getCityTraits(city);
  const permit = getPermitAuthority(city);

  return assertFilled(
    [
      { label: "Predominant stock", value: stockValue(traits) },
      { label: "Built", value: eraValue(city, traits) },
      { label: "County", value: city.county },
      { label: "Permits", value: permit.local },
      { label: "Code", value: permit.codeShort },
      { label: "ZIP codes", value: city.zipCodes.slice(0, 5).join("  ") },
    ],
    city
  );
}

/** Service x city ledger. Scoped to the service, and carries the cost band. */
export function buildServiceCityLedger(
  city: City,
  serviceSlug: string
): LedgerField[] {
  const traits = getCityTraits(city);
  const permit = getPermitAuthority(city);
  const primary = traits.primaryStock;
  const substrate = primary ? SUBSTRATE[serviceSlug]?.[primary] : undefined;

  const fields: LedgerField[] = [
    { label: "Predominant stock", value: stockValue(traits) },
    { label: "Built", value: eraValue(city, traits) },
  ];

  if (substrate) fields.push({ label: "What that means here", value: substrate });

  fields.push(
    { label: "Permits", value: permit.local },
    { label: "Typical range", value: serviceCostBand(city, serviceSlug) },
    { label: "ZIP codes", value: city.zipCodes.slice(0, 4).join("  ") }
  );

  return assertFilled(fields, city);
}
