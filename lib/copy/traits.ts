/**
 * traits.ts
 *
 * Reads structured traits out of each municipality's researched homeStyleNote.
 *
 * -----------------------------------------------------------------------------
 * WHY THIS EXISTS
 * -----------------------------------------------------------------------------
 * CLAUDE.md section 11 requires that at least 60 percent of every service x city
 * page be specific to that city and that service, and section 4 forbids
 * regenerating homeStyleNote values because each one is researched per
 * municipality. Those two rules together mean the page copy has to be driven
 * BY the researched data rather than written alongside it.
 *
 * This module is the reader. It turns prose that a human researched into flags
 * the copy layer can compose against, so a Providence roofing page argues about
 * rear-ell low slope and a Barnstable roofing page argues about shed dormers and
 * low eaves, because those cities' notes actually say those things.
 *
 * It never writes to the data and never infers a trait the note does not
 * support. A city whose note does not mention the shore is not coastal here,
 * even if its county touches water.
 */

import type { City } from "../data/cities";

export type StockFlag =
  | "triple-decker"
  | "mill-housing"
  | "colonial"
  | "federal"
  | "victorian"
  | "cape"
  | "ranch"
  | "split-level"
  | "farmhouse"
  | "coastal-cottage"
  | "shingle-style"
  | "tudor-stone"
  | "antique";

export type EraFlag = "pre-1900" | "pre-1940" | "postwar" | "modern";

export interface CityTraits {
  /** Every stock type the note supports, most prominent first. */
  stock: StockFlag[];
  /** The single dominant stock type, used to open city copy. */
  primaryStock: StockFlag | null;
  era: EraFlag[];
  coastal: boolean;
  historicDistrict: boolean;
  /** Tight lots and close neighbours, which constrains staging. */
  dense: boolean;
  island: boolean;
  /** Earliest four-digit year named in the note, when there is one. */
  earliestYear: number | null;
}

/**
 * Ordered most specific first. The first match becomes primaryStock, so
 * triple-decker beats colonial on a note that names both, which is correct:
 * triple-deckers are the defining constraint wherever they appear.
 */
const STOCK_PATTERNS: Array<[StockFlag, RegExp]> = [
  ["triple-decker", /\btriple[- ]deckers?\b|\bthree[- ]deckers?\b|\bthree[- ]famil(?:y|ies)\b/i],
  ["mill-housing", /\bmill (?:housing|worker|village|town)|\bworker (?:row|housing)\b|\btenement/i],
  ["tudor-stone", /\bTudor revival\b|\bstone colonials?\b|\bestates?\b|\bbackcountry\b/i],
  ["shingle-style", /\bshingle[- ]style\b/i],
  ["coastal-cottage", /\b(?:summer |shingled |beach )cottages?\b|\bcoastal cottages?\b|\bcottages?\b|\bshingled houses\b|\bcedar shingle\b|\bseasonal camps?\b/i],
  ["federal", /\bFederal\b(?! Emergency)/],
  ["victorian", /\bvictorians?\b|\bqueen anne\b|\bsecond empire\b/i],
  ["cape", /\bcapes?\b(?!\s+(?:Cod Canal|Verde))|\bcape cod (?:houses?|style)\b/i],
  ["split-level", /\bsplit[- ]levels?\b|\braised ranch(?:es)?\b/i],
  ["ranch", /\branch(?:es)?\b/i],
  ["farmhouse", /\bfarmhouses?\b|\bcent(?:er|re) chimney\b|\bsaltbox(?:es)?\b/i],
  ["colonial", /\bcolonials?\b|\bcolonial revival\b|\bgarrison\b/i],
  ["antique", /\bantique\b|\bfirst period\b|\bgeorgian\b|\bgreek revival\b|\b(?:17th|18th|19th) century\b|\bpre-1800\b/i],
];

const COASTAL = /\bcoastal\b|\bshoreline\b|\bshore\b|\bsalt air\b|\bsalt[- ]exposed\b|\bwaterfront\b|\boceanfront\b|\bbeach\b|\bharbou?r\b|\bbay\b|\btidal\b|\bsound\b/i;
const HISTORIC = /\bhistoric district\b|\bhistoric review\b|\bhistoric(?:al)? (?:commission|preservation)\b|\blandmark district\b/i;
const DENSE = /\bnarrow (?:side yards?|lots?|driveways?)\b|\btight lots?\b|\bclose(?:ly)? (?:spaced|packed)\b|\bpacked\b|\bdense\b|\bstaging\b|\burban\b/i;
/**
 * Ferry-dependent municipalities, as an explicit list.
 *
 * This one is not pattern-matched, because a regex gets it wrong in both
 * directions and the error is expensive: the island modifier is +30 percent,
 * the largest in docs/tools-spec.md.
 *
 * False positives a regex produces here: "Rhode Island" flags half that state.
 * The Cape towns sit in the "Cape and Islands" region but reach the mainland
 * over the Bourne and Sagamore bridges, so their materials arrive by truck.
 * Aquidneck Island (Newport, Middletown, Portsmouth) and Conanicut Island
 * (Jamestown) are likewise bridge-connected.
 *
 * What remains is the set where materials and labour genuinely cross water:
 * Block Island, Nantucket, the six Martha's Vineyard towns, and Cuttyhunk.
 */
const FERRY_ISLANDS = new Set([
  "RI:new-shoreham",
  "MA:nantucket",
  "MA:gosnold",
  "MA:tisbury",
  "MA:oak-bluffs",
  "MA:edgartown",
  "MA:west-tisbury",
  "MA:chilmark",
  "MA:aquinnah",
]);

/**
 * Regions with salt exposure, which drives the fastener and paint-life penalty
 * in docs/tools-spec.md. Region is more reliable than prose here: a note about
 * Newport's Victorians may never use the word "coastal" while the town is
 * obviously on the water.
 */
const COASTAL_REGIONS = new Set([
  "South County",
  "Newport County",
  "East Bay",
  "Block Island",
  "Cape and Islands",
  "South Shore",
  "North Shore",
  "South Coast",
  "Connecticut Shoreline",
  "Southeastern Connecticut",
]);

const ERA_PATTERNS: Array<[EraFlag, RegExp]> = [
  ["pre-1900", /\b1[0-8]\d{2}s?\b|\bpre-19\d{2}\b|\b(?:seventeenth|eighteenth|nineteenth) century\b|\b(?:17th|18th|19th) century\b|\bcolonial[- ]era\b|\bpre-1800\b/i],
  ["pre-1940", /\b19[0-3]\ds?\b|\bearly 1900s\b|\bturn of the century\b/i],
  ["postwar", /\bpostwar\b|\bpost[- ]war\b|\b19[4-7]\ds?\b|\bmid[- ]century\b/i],
  ["modern", /\b19[89]\ds?\b|\b20[0-2]\ds?\b|\bnew construction\b|\bsubdivision/i],
];

/**
 * Regions where materials genuinely arrive by boat. Newport County is NOT here:
 * Aquidneck Island is bridge-connected, so it carries no transport surcharge.
 */
const ISLAND_REGIONS = new Set(["Block Island", "Cape and Islands"]);

export function getCityTraits(city: City): CityTraits {
  const note = city.homeStyleNote;

  const stock: StockFlag[] = [];
  for (const [flag, pattern] of STOCK_PATTERNS) {
    if (pattern.test(note)) stock.push(flag);
  }

  const era: EraFlag[] = [];
  for (const [flag, pattern] of ERA_PATTERNS) {
    if (pattern.test(note)) era.push(flag);
  }

  const years = [...note.matchAll(/\b(1[6-9]\d{2}|20[0-2]\d)\b/g)].map((m) => Number(m[1]));

  return {
    stock,
    primaryStock: stock[0] ?? null,
    era,
    coastal: COASTAL.test(note) || COASTAL_REGIONS.has(city.region),
    historicDistrict: HISTORIC.test(note),
    dense: DENSE.test(note),
    island: FERRY_ISLANDS.has(`${city.state}:${city.slug}`),
    earliestYear: years.length ? Math.min(...years) : null,
  };
}

/** True when the stock is old enough that board sheathing is the default assumption. */
export function hasOlderStock(traits: CityTraits): boolean {
  return traits.era.includes("pre-1900") || traits.era.includes("pre-1940");
}

/**
 * Deterministic variant picker.
 *
 * Copy variants must be stable across builds, so the same city always renders
 * the same sentence. A random pick would make every deploy a content change and
 * would make the uniqueness check unreproducible. Hashing the seed gives
 * variation across cities and stability within one.
 */
export function pick<T>(options: readonly T[], seed: string): T {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return options[Math.abs(hash) % options.length];
}

/** Human-readable label for a stock flag, for use mid-sentence. */
export const STOCK_LABEL: Record<StockFlag, string> = {
  "triple-decker": "triple-deckers",
  "mill-housing": "mill worker housing",
  colonial: "colonials",
  federal: "Federal-era houses",
  victorian: "Victorians",
  cape: "capes",
  ranch: "ranches",
  "split-level": "split levels",
  farmhouse: "farmhouses",
  "coastal-cottage": "shingled coastal cottages",
  "shingle-style": "shingle-style houses",
  "tudor-stone": "stone and Tudor revival houses",
  antique: "antique housing",
};

/**
 * Era for cost and technique purposes, falling back to what the stock implies
 * when the note names no years.
 *
 * A note reading "center chimney colonials and saltboxes, many genuinely 18th
 * century" states its era. A note reading "postwar capes and ranches" implies
 * one without printing a number. Both need an era to price against, and the
 * housing-stock modifiers in docs/tools-spec.md are keyed to construction date.
 */
const STOCK_ERA: Record<StockFlag, EraFlag> = {
  antique: "pre-1900",
  federal: "pre-1900",
  farmhouse: "pre-1900",
  colonial: "pre-1900",
  "mill-housing": "pre-1940",
  "triple-decker": "pre-1940",
  victorian: "pre-1940",
  "shingle-style": "pre-1940",
  "tudor-stone": "pre-1940",
  "coastal-cottage": "pre-1940",
  cape: "postwar",
  ranch: "postwar",
  "split-level": "postwar",
};

const ERA_RANK: Record<EraFlag, number> = {
  "pre-1900": 0,
  "pre-1940": 1,
  postwar: 2,
  modern: 3,
};

/** The oldest era the city's data supports. Drives cost modifiers and technique. */
export function dominantEra(traits: CityTraits): EraFlag {
  const stated = [...traits.era].sort((a, b) => ERA_RANK[a] - ERA_RANK[b])[0];
  if (stated) return stated;
  const implied = traits.stock
    .map((s) => STOCK_ERA[s])
    .sort((a, b) => ERA_RANK[a] - ERA_RANK[b])[0];
  return implied ?? "postwar";
}

/**
 * Additive cost modifier for a SPECIFIC PROJECT, per docs/tools-spec.md step 3.
 *
 * Used by the calculators, where the homeowner answers for their own house and
 * toggles historic district themselves. Do not use this for a city-wide figure:
 * see cityLedgerModifier below for why.
 */
export function stockCostModifier(traits: CityTraits): number {
  let modifier = 0;
  const era = dominantEra(traits);
  if (era === "pre-1900") modifier += 0.14;
  else if (era === "pre-1940") modifier += 0.08;
  if (traits.historicDistrict) modifier += 0.2;
  if (traits.stock.includes("triple-decker")) modifier += 0.12;
  if (traits.coastal) modifier += 0.06;
  if (traits.island) modifier += 0.3;
  return modifier;
}

/**
 * City-level cost modifier for the Local Ledger band.
 *
 * Deliberately NOT the same as stockCostModifier. A ledger range describes a
 * typical project across the whole municipality, and two of the project-level
 * modifiers do not average that way:
 *
 *   Historic district. Providence has districts on the East Side, but most of
 *   the city is not in one. Applying the full 20 percent to the city band would
 *   overstate the typical job. It is applied at a quarter weight, reflecting
 *   that a minority of the stock sits under review, and the page copy names the
 *   district condition separately so a homeowner in one knows it applies.
 *
 *   Triple-decker. Same reasoning. The 12 percent applies to a three-family
 *   job, not to every job in a city that has them.
 *
 * Era, coastal, and island exposure do apply municipality-wide and carry full
 * weight, because they are conditions of the place rather than of one house.
 */
export function cityLedgerModifier(traits: CityTraits): number {
  let modifier = 0;
  const era = dominantEra(traits);
  if (era === "pre-1900") modifier += 0.14;
  else if (era === "pre-1940") modifier += 0.08;
  if (traits.historicDistrict) modifier += 0.05;
  if (traits.stock.includes("triple-decker")) modifier += 0.03;
  if (traits.coastal) modifier += 0.06;
  if (traits.island) modifier += 0.3;
  return modifier;
}
