/**
 * services.ts
 *
 * CRITICAL DATA FILE. Do not regenerate or bulk-rewrite without explicit instruction.
 * See CLAUDE.md section 4.
 *
 * -----------------------------------------------------------------------------
 * URL STRUCTURE MAPPING
 * -----------------------------------------------------------------------------
 *
 * A Service `slug` maps to two URL patterns:
 *
 *   /services/[service.slug]/
 *     Statewide service hub. One page per service. 7 pages total.
 *     Example: /services/roofing/
 *
 *   /locations/[state]/[city]/[service.slug]/
 *     Service x city page. The deepest live tier and the largest page count.
 *     Example: /locations/rhode-island/providence/roofing/
 *     At full rollout: 559 cities x 7 services = 3,913 pages.
 *
 * A SubService `slug` maps to:
 *
 *   /services/[service.slug]/[subService.slug]/
 *     Sub-service detail page. 41 pages total.
 *     Example: /services/roofing/roof-replacement/
 *
 *   /locations/[state]/[city]/[service.slug]/[subService.slug]/
 *     NOT BUILT. Gated behind the `subServiceLive` flag on each City.
 *     Every city currently has subServiceLive: false. Do not build this tier
 *     without explicit instruction. At full rollout it would be 559 x 41 =
 *     22,919 pages, which is far past the point where quality can be held.
 *
 * -----------------------------------------------------------------------------
 * FIELD NOTES
 * -----------------------------------------------------------------------------
 *
 * shortName        Used in nav, breadcrumbs, and card labels where space is tight.
 * description      Used on the /services/ index and in service card components.
 * metaDescription  Service hub <meta name="description">. 140 to 158 characters.
 *                  City-level meta descriptions are generated at build time from
 *                  the template in CLAUDE.md section 9, not from this field.
 * heroHeadline     H1 on the service hub page only. Not reused on city pages.
 * keywordTargets   Research targets for the writer. NOT for keyword stuffing.
 *                  These inform what a page should cover, not what phrases to
 *                  repeat. Volumes in this market are small and difficulty is
 *                  near zero; coverage beats density. See docs/seo-strategy.md.
 */

export interface SubService {
  slug: string;
  name: string;
  description: string;
  keywordTargets: string[];
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  metaDescription: string;
  heroHeadline: string;
  subServices: SubService[];
}

export const SERVICES: Service[] = [
  // ---------------------------------------------------------------------------
  // 1. ROOFING  ->  /services/roofing/
  // ---------------------------------------------------------------------------
  {
    slug: "roofing",
    name: "Roofing",
    shortName: "Roofing",
    description:
      "Roof replacement, repair, and storm damage work on New England housing stock, from steep-pitch colonials to the low-slope rear ells on a Providence triple-decker. Ice dam work is its own category here and it is usually an attic problem before it is a roof problem.",
    metaDescription:
      "Roof replacement and repair across RI, MA, and CT. Ice and water shield to code, ice dam causes explained, real cost ranges. Free quotes, no obligation.",
    heroHeadline: "Roofing across Rhode Island, Massachusetts, and Connecticut",
    subServices: [
      {
        slug: "roof-replacement",
        name: "Roof Replacement",
        description:
          "Full tear-off and replacement. On housing built before roughly 1950 the sheathing is often board rather than plywood, which adds prep time and sometimes a full re-deck. Budget for that possibility on any house that age rather than being surprised by a change order on day two.",
        keywordTargets: [
          "roof replacement",
          "new roof cost",
          "roof replacement cost",
          "tear off roof",
          "full roof replacement",
          "asphalt shingle roof replacement",
          "roof decking replacement cost",
        ],
      },
      {
        slug: "roof-repair",
        name: "Roof Repair",
        description:
          "Targeted repair when the roof has remaining life. Most leaks are not shingle failures. They are flashing failures at a chimney, a valley, a sidewall, or a vent boot. A roof with eight good years left and one bad chimney flashing does not need replacing.",
        keywordTargets: [
          "roof repair",
          "roof leak repair",
          "emergency roof repair",
          "flashing repair",
          "chimney flashing leak",
          "roof repair cost",
          "repair or replace roof",
        ],
      },
      {
        slug: "storm-damage",
        name: "Storm Damage",
        description:
          "Nor'easter and wind damage, and the insurance documentation that goes with it. Coastal Rhode Island, the South Shore, the Cape, and the Connecticut shoreline take the worst of it. Wind uplift typically starts at a rake edge or a ridge and works inward.",
        keywordTargets: [
          "storm damage roof repair",
          "wind damage roof",
          "hail damage roof",
          "roof insurance claim",
          "emergency tarp roof",
          "nor'easter roof damage",
        ],
      },
      {
        slug: "ice-dam-removal",
        name: "Ice Dam Removal and Prevention",
        description:
          "Ice dams form when heat escaping into the attic melts the snowpack, the meltwater runs to the cold overhang, and it refreezes there. The dam then pushes water back up under the shingles. Steam removal handles the emergency. Air sealing, insulation, and balanced soffit-to-ridge ventilation handle the cause.",
        keywordTargets: [
          "ice dam removal",
          "ice dam prevention",
          "ice dam roof damage",
          "steam ice dam removal",
          "attic insulation ice dams",
          "roof heat cable",
          "ice and water shield",
        ],
      },
      {
        slug: "flat-roofing",
        name: "Flat and Low-Slope Roofing",
        description:
          "EPDM, TPO, and modified bitumen on the low-slope sections that show up constantly in this region: triple-decker rear ells, porch and piazza roofs, dormer tops, and additions. A low-slope section on an otherwise pitched roof is where most urban New England roof leaks actually start.",
        keywordTargets: [
          "flat roof replacement",
          "EPDM roofing",
          "rubber roof",
          "TPO roofing",
          "low slope roof",
          "flat roof cost",
          "porch roof replacement",
        ],
      },
      {
        slug: "architectural-shingles",
        name: "Architectural Shingles",
        description:
          "Dimensional laminate shingles, now the default over three-tab in almost every replacement. Heavier, longer wind rating, and a shadow line that reads correctly on a colonial or a Victorian where a flat three-tab looks wrong.",
        keywordTargets: [
          "architectural shingles",
          "dimensional shingles",
          "architectural vs 3 tab shingles",
          "laminate shingles cost",
          "best shingles for New England",
          "shingle wind rating",
        ],
      },
      {
        slug: "owens-corning-systems",
        name: "Owens Corning Roofing Systems",
        description:
          "Full system installation rather than shingles alone: starter strip, ice and water barrier, synthetic underlayment, ridge venting, and hip and ridge caps from one manufacturer. System installation is what determines whether the manufacturer's longer warranty terms are available at all.",
        keywordTargets: [
          "Owens Corning roofing",
          "Owens Corning Duration",
          "Owens Corning vs GAF",
          "total protection roofing system",
          "roofing system warranty",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. WINDOWS  ->  /services/windows/
  // ---------------------------------------------------------------------------
  {
    slug: "windows",
    name: "Windows",
    shortName: "Windows",
    description:
      "Replacement windows across housing that ranges from 1740s twelve-over-twelve sash to 1970s aluminum sliders. In a triple-decker you are looking at 40 to 60 openings across three floors. In a cape it is 12 to 16. Those are different projects with different economics.",
    metaDescription:
      "Replacement windows across RI, MA, and CT. Insert versus full-frame, historic district profiles, per-opening costs for older housing stock. Free quotes.",
    heroHeadline: "Replacement windows for houses that were not built for them",
    subServices: [
      {
        slug: "replacement-windows",
        name: "Replacement Windows",
        description:
          "The core decision is insert versus full-frame. An insert goes into the existing frame and costs less but loses roughly an inch of glass on each dimension. Full-frame takes the unit back to the rough opening, which is the right call when the sill or frame has rot, and it is common in pre-1940 housing.",
        keywordTargets: [
          "replacement windows",
          "window replacement cost",
          "insert vs full frame windows",
          "cost per window installed",
          "vinyl replacement windows",
          "window replacement near me",
        ],
      },
      {
        slug: "double-hung-windows",
        name: "Double Hung Windows",
        description:
          "The dominant style across New England housing and the direct replacement for original weight-and-pulley sash. Both sashes operate and tilt in for cleaning, which matters on a second or third floor where the outside of the glass is otherwise unreachable.",
        keywordTargets: [
          "double hung windows",
          "double hung replacement windows",
          "double hung vs single hung",
          "tilt in windows",
          "double hung window cost",
        ],
      },
      {
        slug: "casement-windows",
        name: "Casement Windows",
        description:
          "Crank-out sash that seals against the frame under wind pressure rather than relying on a friction fit. That makes casements the better air-sealing choice on exposed elevations, which is why they show up on coastal and windward walls even in houses that are double hung everywhere else.",
        keywordTargets: [
          "casement windows",
          "casement vs double hung",
          "crank out windows",
          "casement windows cost",
          "best windows for wind",
        ],
      },
      {
        slug: "bay-windows",
        name: "Bay Windows",
        description:
          "A three-unit projection, usually a fixed center flanked by operable double hungs or casements. Bays carry their own weight through a cable or knee-brace support system, so replacement is structural work, not just a window swap.",
        keywordTargets: [
          "bay window",
          "bay window replacement",
          "bay window cost",
          "bay window installation",
          "bay vs bow window",
        ],
      },
      {
        slug: "bow-windows",
        name: "Bow Windows",
        description:
          "Four to six units in a gentle arc rather than the angled facets of a bay. Common on Victorians and on postwar colonials in this region. More glass and a softer projection, and correspondingly more cost per opening.",
        keywordTargets: [
          "bow window",
          "bow window replacement",
          "bow window cost",
          "curved window installation",
        ],
      },
      {
        slug: "picture-windows",
        name: "Picture Windows",
        description:
          "Fixed glass, no operating hardware, so the best thermal performance per square foot of any window type. Often paired with operable flankers to satisfy egress and ventilation requirements in a living space.",
        keywordTargets: [
          "picture window",
          "fixed window replacement",
          "picture window cost",
          "large window replacement",
        ],
      },
      {
        slug: "slider-windows",
        name: "Slider Windows",
        description:
          "Horizontal sliding sash. Common in postwar ranches, split levels, and basement or garden-level openings where the opening is wider than it is tall. Frequently the original 1960s aluminum units, which are single-glazed and among the worst-performing windows still in service.",
        keywordTargets: [
          "slider windows",
          "sliding windows",
          "horizontal slider window",
          "basement window replacement",
          "aluminum window replacement",
        ],
      },
      {
        slug: "energy-efficient-windows",
        name: "Energy Efficient Windows",
        description:
          "Double or triple glazing, low-E coatings, and argon fill, evaluated by U-factor rather than by an R-value that window manufacturers do not use. Mass Save in Massachusetts and Energize CT in Connecticut both run programs touching window and insulation work, and eligibility rules change, so verify current terms before relying on them.",
        keywordTargets: [
          "energy efficient windows",
          "triple pane windows",
          "low-e windows",
          "Mass Save windows",
          "window U-factor",
          "energy efficient window rebate",
          "window tax credit",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. SIDING  ->  /services/siding/
  // ---------------------------------------------------------------------------
  {
    slug: "siding",
    name: "Siding",
    shortName: "Siding",
    description:
      "Siding on housing that was originally clapboard or shingle, much of it over board sheathing with no house wrap and no insulation in the cavity. What is behind the siding usually matters more than what goes on top of it, and coastal exposure changes the calculation entirely.",
    metaDescription:
      "Siding across RI, MA, and CT. Vinyl, fiber cement, and cedar compared on cost, paint life, and coastal exposure. Real per-square numbers. Free quotes.",
    heroHeadline: "Siding, and an honest account of what each material actually costs",
    subServices: [
      {
        slug: "vinyl-siding",
        name: "Vinyl Siding",
        description:
          "The volume material in this region, and for most houses the correct economic answer. Roughly half the installed cost of fiber cement and it never needs painting. It does fade in full southern exposure, it can be damaged by a well-aimed ladder, and insulated backer board is worth the upcharge on an uninsulated wall.",
        keywordTargets: [
          "vinyl siding",
          "vinyl siding cost",
          "vinyl siding installation",
          "insulated vinyl siding",
          "vinyl siding per square",
          "best vinyl siding brands",
        ],
      },
      {
        slug: "composite-siding",
        name: "Composite Siding",
        description:
          "Engineered wood and polymer products that hold a deeper profile and a truer shadow line than vinyl, at a cost between vinyl and fiber cement. Worth considering where the house has strong architectural detail that vinyl flattens.",
        keywordTargets: [
          "composite siding",
          "engineered wood siding",
          "LP SmartSide",
          "composite vs vinyl siding",
          "composite siding cost",
        ],
      },
      {
        slug: "fiber-cement-siding",
        name: "Fiber Cement Siding",
        description:
          "Holds paint 12 to 15 years in exposures where vinyl fades and wood needs work every 5 to 7. Heavy, requires specific cutting and fastening practice, and costs roughly double vinyl installed. In coastal and full-sun exposure the paint life difference is where the money comes back.",
        keywordTargets: [
          "fiber cement siding",
          "James Hardie siding",
          "hardie board cost",
          "fiber cement vs vinyl",
          "fiber cement siding installation",
          "hardie plank New England",
        ],
      },
      {
        slug: "cedar-siding",
        name: "Cedar Siding",
        description:
          "Clapboard and shingle, the original material on most pre-1940 New England housing and often required in a local historic district. Cedar shingle weathers to grey on the coast and is the correct answer on a Cape or Newport shingle-style house. It needs maintenance on a real schedule.",
        keywordTargets: [
          "cedar siding",
          "cedar shingle siding",
          "cedar clapboard",
          "cedar shake siding cost",
          "historic district siding",
          "cedar siding maintenance",
        ],
      },
      {
        slug: "siding-repair",
        name: "Siding Repair",
        description:
          "Section repair and rot remediation, usually where water has been getting behind the cladding at a window head, a deck ledger, or a chimney. The visible damage is almost always smaller than the actual damage. Open one bay before pricing the job.",
        keywordTargets: [
          "siding repair",
          "siding rot repair",
          "replace damaged siding",
          "siding repair cost",
          "water damage behind siding",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. BATHROOM REMODELING  ->  /services/bathroom-remodeling/
  // ---------------------------------------------------------------------------
  {
    slug: "bathroom-remodeling",
    name: "Bathroom Remodeling",
    shortName: "Bathrooms",
    description:
      "Bathroom work in housing where the standard footprint is 5 by 8 feet and the plumbing is often cast iron waste and, in the oldest stock, galvanized supply. Whether the plumbing moves is the single largest cost variable in the entire project.",
    metaDescription:
      "Bathroom remodeling across RI, MA, and CT. Tub to shower conversions, walk-in showers, ADA baths. What moving the plumbing actually costs. Free quotes.",
    heroHeadline: "Bathroom remodeling in houses with 5 by 8 bathrooms and cast iron waste lines",
    subServices: [
      {
        slug: "shower-replacement",
        name: "Shower Replacement",
        description:
          "Replacing an existing shower in the existing footprint. The scope decision is whether the pan and the substrate come out. Tile over a failed pan fails again. Tile over cement board with a proper waterproofing membrane does not.",
        keywordTargets: [
          "shower replacement",
          "shower remodel cost",
          "replace shower",
          "shower pan replacement",
          "tile shower cost",
          "one day shower replacement",
        ],
      },
      {
        slug: "bathtub-replacement",
        name: "Bathtub Replacement",
        description:
          "Swapping a tub in the existing alcove. In pre-1960 housing the original is often a cast iron tub that has to be broken up in place to get it down a staircase, which is a real line item and not an upsell.",
        keywordTargets: [
          "bathtub replacement",
          "replace bathtub cost",
          "tub replacement",
          "cast iron tub removal",
          "bathtub installation cost",
        ],
      },
      {
        slug: "tub-to-shower-conversion",
        name: "Tub to Shower Conversion",
        description:
          "The highest-demand bathroom project in this market by search volume, driven largely by homeowners aging in place in two-story housing where the only full bath is upstairs. Same footprint, same drain location in most cases, which keeps it on the affordable end of bathroom work.",
        keywordTargets: [
          "tub to shower conversion",
          "convert bathtub to shower",
          "tub to shower conversion cost",
          "walk in shower conversion",
          "remove tub install shower",
          "bathtub to shower conversion near me",
        ],
      },
      {
        slug: "walk-in-shower-installation",
        name: "Walk-In Shower Installation",
        description:
          "Low-threshold or curbless entry. A true curbless installation requires recessing the pan into the floor structure, which in a house with 2x8 joists at 16 inches on center is a framing conversation before it is a tile conversation.",
        keywordTargets: [
          "walk in shower",
          "curbless shower",
          "walk in shower installation cost",
          "zero threshold shower",
          "barrier free shower",
        ],
      },
      {
        slug: "ada-accessible-bath",
        name: "ADA Accessible Bathrooms",
        description:
          "Grab bar blocking in the wall, a 60-inch turning radius where the floor plan allows it, comfort-height fixtures, and a roll-in or low-threshold entry. In older housing the constraint is usually the door width and the joist direction, both of which are worth checking before designing anything.",
        keywordTargets: [
          "ADA bathroom remodel",
          "accessible bathroom",
          "handicap accessible shower",
          "aging in place bathroom",
          "grab bar installation",
          "roll in shower",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. KITCHEN REMODELING  ->  /services/kitchen-remodeling/
  // ---------------------------------------------------------------------------
  {
    slug: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    shortName: "Kitchens",
    description:
      "Kitchen work in houses where the kitchen was a back room with a chimney in it. Pre-1940 New England kitchens are frequently small, oddly shaped, and bounded by a chimney chase, a back stair, or a pantry. Opening a wall is a structural question first.",
    metaDescription:
      "Kitchen remodeling across RI, MA, and CT. Refacing versus full remodel, real cost bands, what a load-bearing wall actually adds. Free quotes, no obligation.",
    heroHeadline: "Kitchen remodeling around chimney chases, back stairs, and old pantries",
    subServices: [
      {
        slug: "full-kitchen-remodel",
        name: "Full Kitchen Remodel",
        description:
          "Cabinets, counters, appliances, flooring, lighting, and usually electrical to bring the room to current code, since a 1950s kitchen typically has two circuits where code now expects several. Timeline runs 6 to 12 weeks and cabinet lead time is usually the critical path.",
        keywordTargets: [
          "kitchen remodel",
          "full kitchen remodel cost",
          "kitchen renovation cost",
          "kitchen remodel timeline",
          "kitchen remodel near me",
        ],
      },
      {
        slug: "kitchen-cabinet-refacing",
        name: "Kitchen Cabinet Refacing",
        description:
          "New doors, drawer fronts, and veneer over the existing boxes. Roughly a third to a half the cost of new cabinetry and it takes days rather than weeks. Only worth doing when the boxes are solid, which in older housing usually means checking the sink base for water damage first.",
        keywordTargets: [
          "cabinet refacing",
          "kitchen cabinet refacing cost",
          "refacing vs replacing cabinets",
          "cabinet refinishing",
          "reface kitchen cabinets",
        ],
      },
      {
        slug: "countertop-replacement",
        name: "Countertop Replacement",
        description:
          "Quartz, granite, and solid surface, templated after the cabinets are set and typically installed one to two weeks later. The most common standalone kitchen project and the one with the shortest disruption.",
        keywordTargets: [
          "countertop replacement",
          "quartz countertops cost",
          "granite countertops",
          "kitchen countertop installation",
          "countertop cost per square foot",
        ],
      },
      {
        slug: "kitchen-renovation",
        name: "Kitchen Renovation and Layout Changes",
        description:
          "Moving walls, relocating plumbing and gas, and reworking the layout. In a pre-1940 house the wall you want to remove is often carrying a floor above it and sometimes a chimney. That is an engineered beam and a permit, not a demolition day.",
        keywordTargets: [
          "kitchen renovation",
          "open concept kitchen",
          "remove kitchen wall",
          "load bearing wall removal cost",
          "kitchen layout change",
          "kitchen addition",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. ENTRY DOORS  ->  /services/entry-doors/
  // ---------------------------------------------------------------------------
  {
    slug: "entry-doors",
    name: "Entry Doors",
    shortName: "Doors",
    description:
      "Entry, patio, and storm doors. On older housing the opening is rarely a standard size and the existing jamb is rarely plumb, so a door job is often a framing job with a door at the end of it. Uncontested in search across all three states.",
    metaDescription:
      "Entry door replacement across RI, MA, and CT. Fiberglass, steel, sliding, and storm doors. What a non-standard opening in an old house actually costs.",
    heroHeadline: "Entry doors for openings that were never a standard size",
    subServices: [
      {
        slug: "front-door-replacement",
        name: "Front Door Replacement",
        description:
          "Slab replacement keeps the existing jamb and is cheaper. A pre-hung unit replaces the frame too and is the right call when the jamb is out of plumb or the sill is rotted, which is common on a door that has been taking weather for eighty years.",
        keywordTargets: [
          "front door replacement",
          "entry door installation",
          "front door replacement cost",
          "prehung vs slab door",
          "exterior door installation",
        ],
      },
      {
        slug: "sliding-doors",
        name: "Sliding Patio Doors",
        description:
          "Replacing 1970s and 1980s aluminum sliders, which are single-glazed, frequently off their track, and among the largest single sources of heat loss in a postwar house. Modern vinyl and fiberglass units are a straightforward swap in the same rough opening.",
        keywordTargets: [
          "sliding patio door",
          "sliding door replacement",
          "patio door installation cost",
          "sliding glass door replacement",
          "french door vs slider",
        ],
      },
      {
        slug: "storm-doors",
        name: "Storm Doors",
        description:
          "A meaningful upgrade in this climate, particularly on a north-facing entry. Interchangeable glass and screen panels, and on a wood entry door the storm door also protects the finish, which is the difference between refinishing every three years and every ten.",
        keywordTargets: [
          "storm door",
          "storm door installation",
          "storm door cost",
          "best storm doors",
          "full view storm door",
        ],
      },
      {
        slug: "fiberglass-doors",
        name: "Fiberglass Entry Doors",
        description:
          "Insulated core, will not rot, will not warp, and takes a wood-grain finish convincingly enough that it is the default choice for a period-appropriate entry that has to survive New England exposure. Costs more than steel and typically outlasts it.",
        keywordTargets: [
          "fiberglass entry door",
          "fiberglass vs steel door",
          "fiberglass door cost",
          "insulated entry door",
        ],
      },
      {
        slug: "steel-doors",
        name: "Steel Entry Doors",
        description:
          "The value option, and the strongest for security. Steel dents rather than cracks, and a dent is permanent. Coastal salt exposure is hard on a steel door at the bottom edge, which is where a fiberglass unit earns its premium.",
        keywordTargets: [
          "steel entry door",
          "steel door cost",
          "security door",
          "steel vs fiberglass entry door",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. GUTTERS  ->  /services/gutters/
  // ---------------------------------------------------------------------------
  {
    slug: "gutters",
    name: "Gutters",
    shortName: "Gutters",
    description:
      "Gutters, guards, and seamless installation. In a region with heavy leaf load, freeze-thaw cycling, and ice damming, gutters fail in ways they do not fail elsewhere. Undersized 5-inch gutter on a large roof plane is the most common defect found on older housing here.",
    metaDescription:
      "Gutter installation and replacement across RI, MA, and CT. Seamless 5 and 6 inch, guards that work under leaf load, ice damming realities. Free quotes.",
    heroHeadline: "Gutters sized for the roof plane they are actually catching",
    subServices: [
      {
        slug: "gutter-installation",
        name: "Gutter Installation",
        description:
          "New gutter on a house that has none or is getting a full replacement. Sizing is the decision that matters: 5-inch K-style handles most roof planes, 6-inch is the right call on a large plane or a steep pitch, and the downspout count matters as much as the gutter width.",
        keywordTargets: [
          "gutter installation",
          "gutter installation near me",
          "new gutters cost",
          "gutter installation cost per foot",
          "5 inch vs 6 inch gutters",
        ],
      },
      {
        slug: "gutter-guards",
        name: "Gutter Guards",
        description:
          "Worth being blunt about: under heavy oak and maple leaf load, most guard types still need periodic clearing, and the marketing claims in this category are the least reliable in home improvement. Micro-mesh performs best. No guard eliminates maintenance and no guard prevents ice damming.",
        keywordTargets: [
          "gutter guards",
          "gutter guard cost",
          "leaf guard",
          "micro mesh gutter guard",
          "do gutter guards work",
          "best gutter guards",
        ],
      },
      {
        slug: "gutter-replacement",
        name: "Gutter Replacement",
        description:
          "Replacing failed or undersized gutter. Common failure points here are the hanger spacing on an older spike-and-ferrule system, separated seams on sectional gutter, and fascia rot underneath that has to be addressed before anything gets hung back up.",
        keywordTargets: [
          "gutter replacement",
          "replace gutters cost",
          "gutter repair vs replace",
          "fascia repair gutters",
          "sagging gutters",
        ],
      },
      {
        slug: "seamless-gutters",
        name: "Seamless Gutters",
        description:
          "Roll-formed on site to the exact run length, so the only joints are at corners and outlets. Sectional gutter fails at the seams first, and in a freeze-thaw climate it fails there quickly. Seamless is the default for good reason.",
        keywordTargets: [
          "seamless gutters",
          "seamless gutter cost",
          "seamless vs sectional gutters",
          "aluminum seamless gutters",
          "seamless gutter installation",
        ],
      },
    ],
  },
];

/* ---------------------------------------------------------------------------
 * HELPERS
 * ------------------------------------------------------------------------- */

export const SERVICE_SLUGS: string[] = SERVICES.map((s) => s.slug);

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getSubService(
  serviceSlug: string,
  subServiceSlug: string
): SubService | undefined {
  return getServiceBySlug(serviceSlug)?.subServices.find(
    (ss) => ss.slug === subServiceSlug
  );
}

export function getAllSubServicePaths(): Array<{
  service: string;
  subService: string;
}> {
  return SERVICES.flatMap((s) =>
    s.subServices.map((ss) => ({ service: s.slug, subService: ss.slug }))
  );
}

/** Total sub-service pages: 7 + 8 + 5 + 5 + 4 + 5 + 4 = 38 */
export const SUB_SERVICE_COUNT: number = SERVICES.reduce(
  (n, s) => n + s.subServices.length,
  0
);
