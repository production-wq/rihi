/**
 * cost-data.ts
 *
 * Every cost figure, multiplier, and material property on the site.
 *
 * Transcribed from docs/tools-spec.md. That document is the source of truth;
 * this file is its typed form. Do not add a figure here that is not in that
 * document, and do not change one here without changing it there.
 *
 * -----------------------------------------------------------------------------
 * READ BEFORE RELYING ON ANY NUMBER IN THIS FILE
 * -----------------------------------------------------------------------------
 * These are directional estimates for this market, derived from typical
 * regional pricing and the verified CPC and job-value data in
 * docs/seo-strategy.md. They are not quotes. docs/tools-spec.md is explicit
 * that they must be validated against actual contractor quotes before launch,
 * and that the multipliers matter more than the base numbers.
 *
 * LAST_REVIEWED renders in the tool UI on purpose. A stale date being publicly
 * visible is the forcing function that keeps this file current. Review
 * quarterly. Stale cost data is worse than none, because it destroys the
 * credibility the tools were built to establish.
 *
 * Nothing in this file is a rebate, incentive, or program amount. Those are
 * never hardcoded. See INCENTIVE_PROGRAMS at the bottom, which is qualitative
 * by design.
 */

import type { StateCode } from "./cities";

export const LAST_REVIEWED = "2026-09-01";

/* ---------------------------------------------------------------------------
 * STEP 1: STATE LABOUR MULTIPLIER
 * ------------------------------------------------------------------------- */

export const STATE_MULTIPLIER: Record<StateCode, number> = {
  MA: 1.0,
  CT: 0.97,
  RI: 0.94,
};

/* ---------------------------------------------------------------------------
 * STEP 2: REGIONAL MULTIPLIER
 *
 * Keyed to the `region` field on every City record, so the tools inherit the
 * geography already in the data set rather than defining a second one.
 * ------------------------------------------------------------------------- */

export const REGION_MULTIPLIER: Record<string, number> = {
  "Fairfield County": 1.28,
  "Greater Boston": 1.22,
  "Cape and Islands": 1.2,
  "Newport County": 1.14,
  MetroWest: 1.12,
  "North Shore": 1.1,
  "Connecticut Shoreline": 1.06,
  "New Haven County": 1.05,
  "South Shore": 1.04,
  "Farmington Valley": 1.02,
  "South County": 1.02,
  "Greater Hartford": 1.0,
  "Middlesex County": 0.98,
  "Providence Metro": 0.98,
  "East Bay": 0.98,
  "Merrimack Valley": 0.98,
  "Kent County": 0.96,
  "Northwest Hills": 0.96,
  "South Coast": 0.95,
  "Southeastern Connecticut": 0.95,
  "Central Massachusetts": 0.94,
  "Northern Rhode Island": 0.94,
  "Tolland County": 0.94,
  "Naugatuck Valley": 0.93,
  "Blackstone Valley": 0.93,
  Berkshires: 0.92,
  "Pioneer Valley": 0.9,
  "Quiet Corner": 0.9,
  "Block Island": 1.45,
};

/** Regions not in the table price at the state baseline rather than guessing. */
export const DEFAULT_REGION_MULTIPLIER = 1.0;

export function regionMultiplier(region: string): number {
  return REGION_MULTIPLIER[region] ?? DEFAULT_REGION_MULTIPLIER;
}

/* ---------------------------------------------------------------------------
 * STEP 3: HOUSING STOCK MODIFIERS
 *
 * Additive percentages applied after the geographic multipliers. Implemented in
 * lib/copy/traits.ts, which reads the conditions out of each municipality's
 * homeStyleNote. Listed here so the documented values live beside the rates.
 * ------------------------------------------------------------------------- */

export const STOCK_MODIFIERS = {
  pre1940: 0.08,
  pre1900: 0.14,
  historicDistrict: 0.2,
  tripleDecker: 0.12,
  coastal: 0.06,
  difficultAccess: 0.1,
  ferryIsland: 0.3,
} as const;

/* ---------------------------------------------------------------------------
 * TYPICAL PROJECT COSTS BY SERVICE
 *
 * Massachusetts baseline, before geographic and stock adjustment. These drive
 * the Local Ledger cost band on every city and service x city page.
 * The unit is a whole typical project, not a rate.
 * ------------------------------------------------------------------------- */

export interface ServiceCostBand {
  /** Low end of a typical project, MA baseline, before adjustment. */
  low: number;
  /** High end of a typical project, MA baseline, before adjustment. */
  high: number;
  /** What the band assumes, rendered next to the figure. Never omit this. */
  basis: string;
}

export const SERVICE_COST: Record<string, ServiceCostBand> = {
  roofing: {
    low: 11000,
    high: 24000,
    basis: "full tear-off and replacement, architectural asphalt, 1,800 sq ft footprint",
  },
  windows: {
    low: 9000,
    high: 24000,
    basis: "12 to 20 openings, vinyl or fiberglass double hung, installed",
  },
  siding: {
    low: 14000,
    high: 38000,
    basis: "full re-side, 1,800 sq ft of wall, vinyl through fiber cement",
  },
  "bathroom-remodeling": {
    low: 9500,
    high: 28000,
    basis: "tub to shower conversion through a full remodel in the same layout",
  },
  "kitchen-remodeling": {
    low: 21000,
    high: 68000,
    basis: "cabinet refacing through a full remodel, same footprint",
  },
  "entry-doors": {
    low: 1800,
    high: 6500,
    basis: "one entry door, fiberglass or wood, installed with new jamb",
  },
  gutters: {
    low: 1500,
    high: 5200,
    basis: "roughly 180 linear feet of seamless aluminium gutter with downspouts",
  },
};

/* ---------------------------------------------------------------------------
 * TOOL 1: ROOFING COST CALCULATOR
 * ------------------------------------------------------------------------- */

export const ROOF_PITCH = [
  { value: "low", label: "Low slope, under 3:12", multiplier: 1.0 },
  { value: "moderate", label: "4:12 to 6:12", multiplier: 1.12 },
  { value: "steep", label: "7:12 to 9:12", multiplier: 1.25 },
  { value: "very-steep", label: "10:12 or steeper", multiplier: 1.4 },
] as const;

export const ROOF_MATERIAL = [
  { value: "3-tab", label: "3-tab asphalt", rate: 4.25 },
  { value: "architectural", label: "Architectural asphalt", rate: 5.75 },
  { value: "premium", label: "Premium architectural", rate: 7.5 },
  { value: "epdm", label: "EPDM low-slope", rate: 8.5 },
  { value: "metal", label: "Standing seam metal", rate: 16.0 },
  { value: "synthetic-slate", label: "Synthetic slate", rate: 22.0 },
] as const;

export const ROOF_LAYERS = [
  { value: "none", label: "None, new deck", adjustment: -0.85 },
  { value: "one", label: "One layer", adjustment: 0 },
  { value: "two-plus", label: "Two or more layers", adjustment: 1.1 },
] as const;

export const ROOF_DECK = [
  { value: "sound", label: "Sound", rate: 0, coverage: 0 },
  { value: "some", label: "Some repair expected", rate: 1.2, coverage: 0.2 },
  { value: "full", label: "Full re-deck", rate: 3.4, coverage: 1 },
] as const;

export const ROOF_COMPLEXITY = [
  { value: "simple", label: "Simple gable", multiplier: 1.0 },
  { value: "moderate", label: "Some dormers or valleys", multiplier: 1.1 },
  { value: "complex", label: "Complex, multiple planes", multiplier: 1.22 },
] as const;

export const ICE_WATER_RATE = 1.15;

export const HOME_AGE = [
  { value: "post-1980", label: "Post-1980", modifier: 0 },
  { value: "1940-1980", label: "1940 to 1980", modifier: 0 },
  { value: "1900-1940", label: "1900 to 1940", modifier: 0.08 },
  { value: "pre-1900", label: "Pre-1900", modifier: 0.14 },
] as const;

/* ---------------------------------------------------------------------------
 * TOOL 2: BATHROOM REMODEL COST CALCULATOR
 * ------------------------------------------------------------------------- */

export const BATH_PROJECT = [
  { value: "tub-to-shower", label: "Tub to shower conversion", base: 9500, days: [5, 9] },
  { value: "shower-replacement", label: "Shower replacement", base: 8000, days: [4, 8] },
  { value: "tub-replacement", label: "Tub replacement", base: 6500, days: [3, 7] },
  { value: "full-same-layout", label: "Full remodel, same layout", base: 21000, days: [15, 25] },
  { value: "full-new-layout", label: "Full remodel, new layout", base: 34000, days: [25, 40] },
  { value: "ada", label: "ADA accessible conversion", base: 16000, days: [7, 14] },
] as const;

export const BATH_SIZE = [
  { value: "small", label: "Small, under 40 sq ft", multiplier: 0.85 },
  { value: "standard", label: "Standard 5x8, 40 to 60 sq ft", multiplier: 1.0 },
  { value: "large", label: "Large, 60 to 100 sq ft", multiplier: 1.3 },
  { value: "primary", label: "Primary suite, 100+ sq ft", multiplier: 1.65 },
] as const;

export const BATH_PLUMBING = [
  { value: "none", label: "No, fixtures stay put", adjustment: 0 },
  { value: "minor", label: "Minor, within the same wall", adjustment: 1800 },
  { value: "relocate", label: "Yes, relocating fixtures", adjustment: 5500 },
] as const;

export const BATH_WASTE_LINE = [
  { value: "unknown", label: "Unknown or PVC", adjustment: 0 },
  { value: "cast-iron", label: "Cast iron", adjustment: 1600 },
  { value: "galvanized", label: "Galvanized supply present", adjustment: 2400 },
] as const;

export const BATH_FINISH = [
  { value: "builder", label: "Builder grade", multiplier: 0.8 },
  { value: "mid", label: "Mid-range", multiplier: 1.0 },
  { value: "high", label: "High end", multiplier: 1.55 },
] as const;

export const BATH_SECOND_FLOOR_ADJUSTMENT = 900;

/* ---------------------------------------------------------------------------
 * TOOL 3: ENERGY SAVINGS ESTIMATOR
 * ------------------------------------------------------------------------- */

export const ENERGY_MEASURES = [
  {
    value: "windows",
    label: "Replace windows",
    low: 0.12,
    high: 0.18,
    note: "Largest single window gain, and only from single pane with no storms.",
  },
  {
    value: "attic",
    label: "Add attic insulation",
    low: 0.15,
    high: 0.22,
    note: "Usually the best return per dollar in this housing stock.",
  },
  {
    value: "wall",
    label: "Add wall insulation",
    low: 0.1,
    high: 0.16,
    note: "Blown-in retrofit into an empty cavity.",
  },
  {
    value: "air-seal",
    label: "Air seal",
    low: 0.08,
    high: 0.14,
    note: "Cheapest measure, most overlooked.",
  },
  {
    value: "doors",
    label: "Replace entry doors",
    low: 0.02,
    high: 0.04,
    note: "Small. Not worth doing on energy alone.",
  },
] as const;

/** Upgrading an already-double-glazed window returns very little. Say so. */
export const WINDOW_UPGRADE_MODEST = { low: 0.04, high: 0.07 };

/** Each stacked measure contributes at 80 percent of its standalone value. */
export const STACKING_DISCOUNT = 0.8;

export const HEATING_DEGREE_FACTOR: Record<string, number> = {
  Berkshires: 1.15,
  "Northwest Hills": 1.15,
  "Pioneer Valley": 1.08,
  "Greater Boston": 1.0,
  "Cape and Islands": 0.92,
  "South County": 0.92,
  "Newport County": 0.92,
  "Block Island": 0.92,
};

export const DEFAULT_HEATING_DEGREE_FACTOR = 1.05;

/* ---------------------------------------------------------------------------
 * TOOL 4: HOME IMPROVEMENT ROI CALCULATOR
 *
 * Northeast regional recoup rates. Directional, and to be reviewed annually
 * against published remodeling cost-versus-value data.
 * ------------------------------------------------------------------------- */

export const RECOUP_RATE = [
  { value: "entry-door", label: "Entry door replacement", rate: 0.92, service: "entry-doors" },
  { value: "siding-fiber-cement", label: "Siding replacement, fiber cement", rate: 0.84, service: "siding" },
  { value: "kitchen-minor", label: "Kitchen remodel, minor", rate: 0.81, service: "kitchen-remodeling" },
  { value: "roof-asphalt", label: "Roof replacement, asphalt", rate: 0.68, service: "roofing" },
  { value: "windows-vinyl", label: "Window replacement, vinyl", rate: 0.67, service: "windows" },
  { value: "bath-mid", label: "Bathroom remodel, mid-range", rate: 0.66, service: "bathroom-remodeling" },
  { value: "kitchen-major", label: "Kitchen remodel, major", rate: 0.54, service: "kitchen-remodeling" },
  { value: "bath-upscale", label: "Bathroom remodel, upscale", rate: 0.45, service: "bathroom-remodeling" },
  { value: "kitchen-upscale", label: "Kitchen remodel, upscale", rate: 0.4, service: "kitchen-remodeling" },
] as const;

export const REGIONAL_DEMAND_FACTOR: Record<string, number> = {
  "Fairfield County": 1.08,
  "Greater Boston": 1.06,
  "Cape and Islands": 1.05,
  MetroWest: 1.04,
  "Newport County": 1.04,
  Berkshires: 0.94,
  "Quiet Corner": 0.94,
};

export const DEFAULT_DEMAND_FACTOR = 1.0;

/* ---------------------------------------------------------------------------
 * TOOL 5: MATERIAL COMPARISON
 * ------------------------------------------------------------------------- */

export interface Material {
  value: string;
  label: string;
  /** Installed cost. Per square foot, except windows and doors, which are per unit. */
  low: number;
  high: number;
  unit: "sqft" | "unit";
  lifeLow: number;
  lifeHigh: number;
  maintenance: string;
  /** Years between maintenance cycles. Zero means none required. */
  maintenanceCycle: number;
  coastal: "Excellent" | "Good" | "Fair";
  historic: "Usually required" | "Usually approved" | "Sometimes" | "Rarely approved";
  note?: string;
}

export const MATERIALS: Record<string, Material[]> = {
  siding: [
    { value: "vinyl", label: "Vinyl", low: 4.5, high: 8.0, unit: "sqft", lifeLow: 25, lifeHigh: 40, maintenance: "None, fades in full sun", maintenanceCycle: 0, coastal: "Good", historic: "Rarely approved" },
    { value: "insulated-vinyl", label: "Insulated vinyl", low: 7.0, high: 11.0, unit: "sqft", lifeLow: 25, lifeHigh: 40, maintenance: "None", maintenanceCycle: 0, coastal: "Good", historic: "Rarely approved" },
    { value: "fiber-cement", label: "Fiber cement", low: 9.5, high: 16.0, unit: "sqft", lifeLow: 40, lifeHigh: 60, maintenance: "Repaint every 12 to 15 years", maintenanceCycle: 13, coastal: "Excellent", historic: "Sometimes" },
    { value: "engineered-wood", label: "Engineered wood", low: 7.5, high: 12.5, unit: "sqft", lifeLow: 25, lifeHigh: 35, maintenance: "Repaint every 8 to 12 years", maintenanceCycle: 10, coastal: "Fair", historic: "Sometimes" },
    { value: "cedar-shingle", label: "Cedar shingle", low: 11.0, high: 19.0, unit: "sqft", lifeLow: 30, lifeHigh: 50, maintenance: "Stain every 5 to 8 years, or let it weather", maintenanceCycle: 7, coastal: "Excellent", historic: "Usually required" },
    { value: "cedar-clapboard", label: "Cedar clapboard", low: 10.0, high: 17.0, unit: "sqft", lifeLow: 30, lifeHigh: 50, maintenance: "Repaint every 5 to 8 years", maintenanceCycle: 7, coastal: "Good", historic: "Usually required" },
  ],
  roofing: [
    { value: "3-tab", label: "3-tab asphalt", low: 4.0, high: 5.5, unit: "sqft", lifeLow: 15, lifeHigh: 20, maintenance: "None", maintenanceCycle: 0, coastal: "Fair", historic: "Sometimes", note: "60 mph wind rating. Rarely specified now." },
    { value: "architectural", label: "Architectural asphalt", low: 5.25, high: 7.5, unit: "sqft", lifeLow: 25, lifeHigh: 30, maintenance: "None", maintenanceCycle: 0, coastal: "Good", historic: "Sometimes", note: "110 to 130 mph wind rating. The regional default." },
    { value: "premium", label: "Premium architectural", low: 7.0, high: 9.5, unit: "sqft", lifeLow: 30, lifeHigh: 40, maintenance: "None", maintenanceCycle: 0, coastal: "Good", historic: "Sometimes", note: "130 mph wind rating." },
    { value: "metal", label: "Standing seam metal", low: 14.0, high: 20.0, unit: "sqft", lifeLow: 50, lifeHigh: 70, maintenance: "None", maintenanceCycle: 0, coastal: "Excellent", historic: "Sometimes", note: "140 mph wind rating. Sheds snow well." },
    { value: "synthetic-slate", label: "Synthetic slate", low: 18.0, high: 26.0, unit: "sqft", lifeLow: 50, lifeHigh: 70, maintenance: "None", maintenanceCycle: 0, coastal: "Excellent", historic: "Usually approved", note: "110 mph wind rating. Appropriate in a historic district." },
    { value: "epdm", label: "EPDM low slope", low: 7.5, high: 11.0, unit: "sqft", lifeLow: 20, lifeHigh: 30, maintenance: "None", maintenanceCycle: 0, coastal: "Good", historic: "Sometimes", note: "For rear ells and porch roofs." },
  ],
  windows: [
    { value: "vinyl", label: "Vinyl", low: 650, high: 1100, unit: "unit", lifeLow: 20, lifeHigh: 30, maintenance: "None", maintenanceCycle: 0, coastal: "Good", historic: "Rarely approved", note: "U-factor 0.27 to 0.32." },
    { value: "fiberglass", label: "Fiberglass", low: 900, high: 1500, unit: "unit", lifeLow: 30, lifeHigh: 50, maintenance: "None", maintenanceCycle: 0, coastal: "Excellent", historic: "Sometimes", note: "U-factor 0.25 to 0.30." },
    { value: "wood-clad", label: "Wood clad", low: 1100, high: 2200, unit: "unit", lifeLow: 30, lifeHigh: 50, maintenance: "Interior finish upkeep", maintenanceCycle: 15, coastal: "Good", historic: "Usually approved", note: "U-factor 0.26 to 0.31." },
    { value: "all-wood", label: "All wood", low: 1200, high: 2400, unit: "unit", lifeLow: 40, lifeHigh: 60, maintenance: "Repaint every 7 to 10 years", maintenanceCycle: 8, coastal: "Fair", historic: "Usually required", note: "U-factor 0.30 to 0.35, and 40 to 60 years only if maintained." },
  ],
  "entry-doors": [
    { value: "steel", label: "Steel", low: 1200, high: 2400, unit: "unit", lifeLow: 20, lifeHigh: 30, maintenance: "Touch up finish", maintenanceCycle: 8, coastal: "Fair", historic: "Rarely approved", note: "Dents permanently, and the bottom edge corrodes in salt air." },
    { value: "fiberglass", label: "Fiberglass", low: 1800, high: 4000, unit: "unit", lifeLow: 30, lifeHigh: 50, maintenance: "None", maintenanceCycle: 0, coastal: "Excellent", historic: "Sometimes", note: "Will not rot or warp, and takes a wood-grain finish." },
    { value: "wood", label: "Wood", low: 2500, high: 7000, unit: "unit", lifeLow: 30, lifeHigh: 100, maintenance: "Refinish every 5 to 8 years", maintenanceCycle: 7, coastal: "Fair", historic: "Usually approved", note: "Appropriate in a historic district, and needs a storm door." },
  ],
};

export const EXPOSURE = [
  { value: "inland", label: "Inland", multiplier: 1.0 },
  { value: "coastal", label: "Coastal, within 1 mile", multiplier: 1.06 },
  { value: "oceanfront", label: "Direct oceanfront", multiplier: 1.12 },
] as const;

/* ---------------------------------------------------------------------------
 * INCENTIVE PROGRAMS
 *
 * QUALITATIVE ONLY. No dollar figure appears here, and none may be added
 * without a verified date beside it.
 *
 * docs/tools-spec.md: "Never invent a rebate, incentive, or program figure.
 * Mass Save, Energize CT, Connecticut Green Bank, and federal 25C terms all
 * change, sometimes mid-year." Program names below are quoted exactly as
 * published, which is why Connecticut's "Home Energy Solutions" keeps a word
 * that is otherwise banned in copy. See CLAUDE.md section 8.
 * ------------------------------------------------------------------------- */

export interface IncentiveProgram {
  name: string;
  description: string;
  url: string;
}

export const INCENTIVE_PROGRAMS: Record<StateCode, IncentiveProgram[]> = {
  MA: [
    {
      name: "Mass Save",
      description:
        "Runs a no-cost home energy assessment and offers coverage toward insulation and air sealing for qualifying homes. Terms and coverage levels change, and the Stretch Energy Code applies in municipalities that have adopted it.",
      url: "https://www.masssave.com/",
    },
  ],
  CT: [
    {
      name: "Energize CT",
      description:
        "Runs the Home Energy Solutions assessment, which covers air sealing and basic weatherization at the visit. Program terms change.",
      url: "https://energizect.com/",
    },
    {
      name: "Connecticut Green Bank",
      description:
        "Offers financing for energy improvements, including options that attach repayment to the property rather than the borrower.",
      url: "https://www.ctgreenbank.com/",
    },
  ],
  RI: [
    {
      name: "Rhode Island Energy",
      description:
        "Runs home energy assessments and offers incentives toward insulation and air sealing. Terms change.",
      url: "https://www.rienergy.com/",
    },
  ],
};

export const FEDERAL_CREDIT_NOTE =
  "A federal Energy Efficient Home Improvement Credit exists for qualifying work. Limits and eligibility change, so confirm current terms with a tax professional before counting on it.";

export const COST_DISCLAIMER_SHORT =
  "An estimate for this market, not a quote.";
