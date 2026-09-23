/**
 * calculate.ts
 *
 * Pure calculation functions for the five tools. No React, no DOM, no fetch.
 *
 * Every formula here is transcribed from docs/tools-spec.md. Where that
 * document gives an explicit calculation chain, it is implemented in the same
 * order, because the order matters: geographic multipliers apply before the
 * additive housing-stock modifiers, not after.
 *
 * Two rules from the top of that document are enforced in the return types
 * rather than left to the UI:
 *
 *   Never display a single number. Every result carries a low and a high.
 *   An estimate is not a quote. Every result carries its assumptions.
 */

import {
  STATE_MULTIPLIER,
  regionMultiplier,
  ROOF_PITCH,
  ROOF_MATERIAL,
  ROOF_LAYERS,
  ROOF_DECK,
  ROOF_COMPLEXITY,
  ICE_WATER_RATE,
  HOME_AGE,
  BATH_PROJECT,
  BATH_SIZE,
  BATH_PLUMBING,
  BATH_WASTE_LINE,
  BATH_FINISH,
  BATH_SECOND_FLOOR_ADJUSTMENT,
  ENERGY_MEASURES,
  WINDOW_UPGRADE_MODEST,
  STACKING_DISCOUNT,
  HEATING_DEGREE_FACTOR,
  DEFAULT_HEATING_DEGREE_FACTOR,
  RECOUP_RATE,
  REGIONAL_DEMAND_FACTOR,
  DEFAULT_DEMAND_FACTOR,
  MATERIALS,
  EXPOSURE,
  type Material,
} from "../data/cost-data";
import type { City } from "../data/cities";

export interface Range {
  low: number;
  high: number;
}

export interface LineItem {
  label: string;
  amount: number;
  note?: string;
}

function round(value: number, step = 100): number {
  return Math.round(value / step) * step;
}

/**
 * State labour multiplier times regional multiplier. Steps 1 and 2.
 *
 * The selected town's own state wins over the state dropdown. The town picker
 * lists every live municipality when no state is chosen, so it is possible to
 * select Providence with the state field still empty. Falling back to a 1.0
 * multiplier there would price a Rhode Island roof at the Massachusetts
 * baseline, roughly 6 percent high. A town knows what state it is in.
 */
export function geographicFactor(city: City | null, state: string): number {
  const code = city?.state ?? state;
  const stateMult = STATE_MULTIPLIER[code as keyof typeof STATE_MULTIPLIER] ?? 1;
  return stateMult * (city ? regionMultiplier(city.region) : 1);
}

/* ---------------------------------------------------------------------------
 * TOOL 1: ROOFING
 * ------------------------------------------------------------------------- */

export interface RoofingInput {
  state: string;
  city: City | null;
  footprint: number;
  pitch: string;
  material: string;
  layers: string;
  homeAge: string;
  deck: string;
  complexity: string;
  historicDistrict: boolean;
  iceWater: boolean;
}

export interface RoofingResult {
  range: Range;
  surfaceArea: number;
  items: LineItem[];
}

export function calculateRoofing(input: RoofingInput): RoofingResult {
  const pitch = ROOF_PITCH.find((p) => p.value === input.pitch) ?? ROOF_PITCH[1];
  const material = ROOF_MATERIAL.find((m) => m.value === input.material) ?? ROOF_MATERIAL[1];
  const layers = ROOF_LAYERS.find((l) => l.value === input.layers) ?? ROOF_LAYERS[1];
  const deck = ROOF_DECK.find((d) => d.value === input.deck) ?? ROOF_DECK[1];
  const complexity =
    ROOF_COMPLEXITY.find((c) => c.value === input.complexity) ?? ROOF_COMPLEXITY[0];
  const age = HOME_AGE.find((a) => a.value === input.homeAge) ?? HOME_AGE[0];

  const surfaceArea = input.footprint * pitch.multiplier;
  const base = surfaceArea * material.rate;
  const layerAdj = surfaceArea * layers.adjustment;
  const deckAdj = surfaceArea * deck.coverage * deck.rate;

  // Ice and water shield prices across the eave run, not the whole roof.
  // Roughly a fifth of the surface area on a typical plane.
  const iceWaterAdj = input.iceWater ? surfaceArea * 0.2 * ICE_WATER_RATE : 0;

  const adjusted = (base + layerAdj + deckAdj + iceWaterAdj) * complexity.multiplier;
  const geographic = adjusted * geographicFactor(input.city, input.state);

  let modifiers = age.modifier;
  if (input.historicDistrict) modifiers += 0.2;

  const final = geographic * (1 + modifiers);

  // The asymmetric range is deliberate. Roofing overruns more often than it
  // underruns, because what is under the shingles is unknown until tear-off.
  return {
    range: { low: round(final * 0.85), high: round(final * 1.2) },
    surfaceArea: Math.round(surfaceArea),
    items: [
      { label: `${material.label}, ${Math.round(surfaceArea)} sq ft`, amount: round(base) },
      ...(layerAdj !== 0
        ? [{ label: layers.label === "None, new deck" ? "No tear-off required" : `Tear-off, ${layers.label.toLowerCase()}`, amount: round(layerAdj) }]
        : []),
      ...(deckAdj > 0
        ? [
            {
              label: "Deck allowance",
              amount: round(deckAdj),
              note: "Sheathing cannot be assessed until the old shingle is off.",
            },
          ]
        : []),
      ...(iceWaterAdj > 0
        ? [{ label: "Ice and water shield at the eaves", amount: round(iceWaterAdj) }]
        : []),
    ],
  };
}

/** The specific unknowns for this roof, named rather than generic. */
export function roofingUnknowns(input: RoofingInput, city: City | null): string[] {
  const out: string[] = [];
  if (input.homeAge === "pre-1900" || input.homeAge === "1900-1940") {
    out.push("Board sheathing rather than plywood, which splits and rots at the eave");
  }
  if (input.complexity !== "simple") {
    out.push("Flashing at every valley, sidewall, and chimney, which is where most leaks start");
  }
  if (city?.homeStyleNote.match(/triple[- ]decker|three[- ]famil/i)) {
    out.push("The low-slope rear ell section, which needs EPDM rather than shingle");
  }
  if (input.historicDistrict) {
    out.push("Material and colour approval before anything is ordered, commonly four to eight weeks");
  }
  out.push("Chimney condition, since a rebuild or a new crown is separate work");
  return out.slice(0, 4);
}

/* ---------------------------------------------------------------------------
 * TOOL 2: BATHROOM
 * ------------------------------------------------------------------------- */

export interface BathroomInput {
  state: string;
  city: City | null;
  project: string;
  size: string;
  plumbing: string;
  homeAge: string;
  wasteLine: string;
  finish: string;
  secondFloor: boolean;
  historicDistrict: boolean;
}

export interface BathroomResult {
  range: Range;
  days: [number, number];
  items: LineItem[];
}

export function calculateBathroom(input: BathroomInput): BathroomResult {
  const project = BATH_PROJECT.find((p) => p.value === input.project) ?? BATH_PROJECT[0];
  const size = BATH_SIZE.find((s) => s.value === input.size) ?? BATH_SIZE[1];
  const plumbing = BATH_PLUMBING.find((p) => p.value === input.plumbing) ?? BATH_PLUMBING[0];
  const waste = BATH_WASTE_LINE.find((w) => w.value === input.wasteLine) ?? BATH_WASTE_LINE[0];
  const finish = BATH_FINISH.find((f) => f.value === input.finish) ?? BATH_FINISH[1];
  const age = HOME_AGE.find((a) => a.value === input.homeAge) ?? HOME_AGE[0];

  const base = project.base * size.multiplier * finish.multiplier;
  const floorAdj = input.secondFloor ? BATH_SECOND_FLOOR_ADJUSTMENT : 0;
  const adjusted = base + plumbing.adjustment + waste.adjustment + floorAdj;
  const geographic = adjusted * geographicFactor(input.city, input.state);

  let modifiers = age.modifier;
  if (input.historicDistrict) modifiers += 0.2;

  const final = geographic * (1 + modifiers);

  return {
    range: { low: round(final * 0.88), high: round(final * 1.18) },
    days: [project.days[0], project.days[1]],
    items: [
      { label: `${project.label}, ${size.label.toLowerCase()}`, amount: round(base) },
      ...(plumbing.adjustment
        ? [
            {
              label: plumbing.label,
              amount: plumbing.adjustment,
              note: "The single largest cost variable in any bathroom.",
            },
          ]
        : []),
      ...(waste.adjustment ? [{ label: waste.label, amount: waste.adjustment }] : []),
      ...(floorAdj ? [{ label: "Second floor access", amount: floorAdj }] : []),
    ],
  };
}

/* ---------------------------------------------------------------------------
 * TOOL 3: ENERGY
 * ------------------------------------------------------------------------- */

export interface EnergyInput {
  state: string;
  city: City | null;
  squareFeet: number;
  homeAge: string;
  currentWindows: string;
  windowCount: number;
  atticInsulation: string;
  wallInsulation: string;
  fuel: string;
  annualSpend: number | null;
  measures: string[];
}

export interface EnergyResult {
  annualSavings: Range;
  estimatedSpend: number;
  reductionPercent: Range;
  paybackYears: Range | null;
  tenYear: Range;
  measures: Array<{ label: string; low: number; high: number; note: string }>;
  /** True when the honest answer is that this will not pay for itself. */
  poorPayback: boolean;
}

/** Cost per square foot per year to heat, by fuel. Directional. */
const FUEL_RATE: Record<string, number> = {
  gas: 0.62,
  oil: 0.95,
  propane: 1.15,
  electric: 1.4,
  "heat-pump": 0.7,
};

/** Rough installed cost of each measure, for the payback calculation. */
const MEASURE_COST: Record<string, (input: EnergyInput) => number> = {
  windows: (i) => i.windowCount * 875,
  attic: (i) => i.squareFeet * 0.55 * 3.2,
  wall: (i) => i.squareFeet * 0.9 * 2.6,
  "air-seal": () => 1600,
  doors: () => 2800,
};

export function calculateEnergy(input: EnergyInput): EnergyResult {
  const rate = FUEL_RATE[input.fuel] ?? FUEL_RATE.gas;
  const ageFactor =
    input.homeAge === "pre-1900" ? 1.35 : input.homeAge === "1900-1940" ? 1.22 : input.homeAge === "1940-1980" ? 1.1 : 1;

  const estimatedSpend = input.annualSpend ?? Math.round(input.squareFeet * rate * ageFactor);

  const degreeFactor = input.city
    ? (HEATING_DEGREE_FACTOR[input.city.region] ?? DEFAULT_HEATING_DEGREE_FACTOR)
    : DEFAULT_HEATING_DEGREE_FACTOR;

  const chosen = ENERGY_MEASURES.filter((m) => input.measures.includes(m.value));

  // Diminishing returns: each measure after the first contributes at 80 percent
  // of its standalone value, per docs/tools-spec.md.
  let low = 0;
  let high = 0;
  const detail: EnergyResult["measures"] = [];

  chosen.forEach((measure, index) => {
    // Widened from the const-asserted literal types in cost-data.ts, because
    // these get scaled below when the existing condition is already good.
    let mLow: number = measure.low;
    let mHigh: number = measure.high;

    // Replacing an already-double-glazed window returns very little. Say so
    // rather than quoting the single-pane figure.
    if (measure.value === "windows" && input.currentWindows !== "single-none" && input.currentWindows !== "single-storms") {
      mLow = WINDOW_UPGRADE_MODEST.low;
      mHigh = WINDOW_UPGRADE_MODEST.high;
    }
    if (measure.value === "attic" && input.atticInsulation === "over-12") {
      mLow *= 0.25;
      mHigh *= 0.3;
    }
    if (measure.value === "wall" && input.wallInsulation === "full") {
      mLow *= 0.15;
      mHigh *= 0.2;
    }

    const discount = index === 0 ? 1 : STACKING_DISCOUNT;
    low += mLow * discount;
    high += mHigh * discount;

    detail.push({
      label: measure.label,
      low: Math.round(estimatedSpend * mLow * degreeFactor),
      high: Math.round(estimatedSpend * mHigh * degreeFactor),
      note: measure.note,
    });
  });

  // Total reduction is capped. No envelope package eliminates heating load.
  low = Math.min(low, 0.55);
  high = Math.min(high, 0.7);

  const annualLow = Math.round(estimatedSpend * low * degreeFactor);
  const annualHigh = Math.round(estimatedSpend * high * degreeFactor);

  const cost = chosen.reduce((sum, m) => sum + (MEASURE_COST[m.value]?.(input) ?? 0), 0);
  const payback =
    annualHigh > 0 && cost > 0
      ? { low: Math.round(cost / annualHigh), high: Math.round(cost / annualLow) }
      : null;

  return {
    annualSavings: { low: annualLow, high: annualHigh },
    estimatedSpend,
    reductionPercent: { low: Math.round(low * 100), high: Math.round(high * 100) },
    paybackYears: payback,
    tenYear: { low: annualLow * 10, high: annualHigh * 10 },
    measures: detail,
    poorPayback: payback !== null && payback.low > 25,
  };
}

/* ---------------------------------------------------------------------------
 * TOOL 4: ROI
 * ------------------------------------------------------------------------- */

export interface RoiInput {
  state: string;
  city: City | null;
  homeValue: number;
  project: string;
  projectCost: number;
  selling: string;
}

export interface RoiResult {
  recouped: number;
  netCost: number;
  roiPercent: number;
  /** The plain-language read, which is the point of this tool. */
  verdict: string;
  service: string;
}

export function calculateRoi(input: RoiInput): RoiResult {
  const project = RECOUP_RATE.find((r) => r.value === input.project) ?? RECOUP_RATE[0];
  const demand = input.city
    ? (REGIONAL_DEMAND_FACTOR[input.city.region] ?? DEFAULT_DEMAND_FACTOR)
    : DEFAULT_DEMAND_FACTOR;

  const recouped = input.projectCost * project.rate * demand;
  const netCost = input.projectCost - recouped;
  const roiPercent = (recouped / input.projectCost) * 100;

  // The honest framing is the feature. See docs/tools-spec.md, tool 4.
  let verdict: string;
  if (input.selling === "not-selling") {
    verdict =
      "You are not planning to sell, which makes recoup close to irrelevant here. The question worth asking is whether the work is worth it to you for the years you will live with it. The figure below is what you would get back if that changed.";
  } else if (input.selling === "within-1") {
    verdict =
      roiPercent >= 65
        ? "Selling within a year, this is one of the better projects to do first. Worth noting separately: a roof or siding in visibly poor condition can block a sale outright or trigger a price reduction well in excess of what the repair costs, which is a different and often larger argument than the recoup rate."
        : "Selling within a year, this project is unlikely to return what it costs. Unless the current condition is actively putting buyers off, the money usually does more sitting in the sale price than in the renovation.";
  } else if (roiPercent < 60) {
    verdict =
      "Under 60 percent recouped, this is mostly a lifestyle decision rather than an investment. That is a perfectly good reason to do it if you are staying, and it is worth being clear-eyed that you are buying the use of it rather than the resale.";
  } else {
    verdict =
      "This sits in the range where the project holds a reasonable share of its cost at resale while you also get the use of it. Condition matters as much as recency: a well-maintained older installation frequently appraises closer to a new one than the numbers suggest.";
  }

  return {
    recouped: round(recouped),
    netCost: round(netCost),
    roiPercent: Math.round(roiPercent),
    verdict,
    service: project.service,
  };
}

/* ---------------------------------------------------------------------------
 * TOOL 5: MATERIAL COMPARISON
 * ------------------------------------------------------------------------- */

export interface MaterialInput {
  category: string;
  materials: string[];
  state: string;
  city: City | null;
  quantity: number;
  exposure: string;
  yearsInHome: string;
}

export interface MaterialRow {
  material: Material;
  upfront: Range;
  maintenanceCycles: number;
  maintenanceCost: number;
  lifetimeCost: Range;
}

export interface MaterialResult {
  rows: MaterialRow[];
  /** Separate answers on separate axes. Never a single winner. */
  bestUpfront: string;
  bestLifetime: string;
  bestCoastal: string;
  bestHistoric: string;
  warnings: string[];
  years: number;
}

const YEARS: Record<string, number> = {
  "under-5": 4,
  "5-15": 10,
  "15-plus": 20,
  indefinite: 30,
};

export function calculateMaterials(input: MaterialInput): MaterialResult {
  const pool = MATERIALS[input.category] ?? [];
  const chosen = pool.filter((m) => input.materials.includes(m.value));
  const exposure = EXPOSURE.find((e) => e.value === input.exposure) ?? EXPOSURE[0];
  const years = YEARS[input.yearsInHome] ?? 10;
  const geo = geographicFactor(input.city, input.state);

  const rows: MaterialRow[] = chosen.map((material) => {
    const factor = geo * exposure.multiplier;
    const upfront = {
      low: round(material.low * input.quantity * factor),
      high: round(material.high * input.quantity * factor),
    };

    const cycles = material.maintenanceCycle
      ? Math.max(0, Math.floor(years / material.maintenanceCycle))
      : 0;

    // Repainting or refinishing runs roughly 18 percent of installed cost per
    // cycle on a cladding, and is a flat per-unit cost on windows and doors.
    const perCycle =
      material.unit === "sqft"
        ? ((material.low + material.high) / 2) * input.quantity * factor * 0.18
        : ((material.low + material.high) / 2) * input.quantity * factor * 0.1;

    const maintenanceCost = round(cycles * perCycle);

    return {
      material,
      upfront,
      maintenanceCycles: cycles,
      maintenanceCost,
      lifetimeCost: {
        low: upfront.low + maintenanceCost,
        high: upfront.high + maintenanceCost,
      },
    };
  });

  const byUpfront = [...rows].sort((a, b) => a.upfront.low - b.upfront.low);
  const byLifetime = [...rows].sort((a, b) => a.lifetimeCost.low - b.lifetimeCost.low);
  const coastalRank = { Excellent: 0, Good: 1, Fair: 2 } as const;
  const byCoastal = [...rows].sort(
    (a, b) => coastalRank[a.material.coastal] - coastalRank[b.material.coastal]
  );
  const historicRank = {
    "Usually required": 0,
    "Usually approved": 1,
    Sometimes: 2,
    "Rarely approved": 3,
  } as const;
  const byHistoric = [...rows].sort(
    (a, b) => historicRank[a.material.historic] - historicRank[b.material.historic]
  );

  const warnings: string[] = [];
  if (input.exposure !== "inland") {
    warnings.push(
      "In coastal exposure, fasteners corrode before finishes fail. Stainless or hot-dipped galvanised is the specification rather than an upgrade, and anything relying on a coating has a shorter life here than the same product inland."
    );
  }
  if (years <= 5) {
    warnings.push(
      "Under five years in the house, lifetime cost matters much less than upfront cost and how the work reads to a buyer. The ROI calculator is the more useful tool for that decision."
    );
  }
  if (input.city?.homeStyleNote.match(/historic district/i)) {
    warnings.push(
      "This town has local historic district review. Vinyl is rarely approved on a visible facade, and an approved profile may be required. Confirm with the local commission before ordering."
    );
  }

  return {
    rows,
    bestUpfront: byUpfront[0]?.material.label ?? "",
    bestLifetime: byLifetime[0]?.material.label ?? "",
    bestCoastal: byCoastal[0]?.material.label ?? "",
    bestHistoric: byHistoric[0]?.material.label ?? "",
    warnings,
    years,
  };
}
