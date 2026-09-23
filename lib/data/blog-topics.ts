/**
 * blog-topics.ts
 *
 * CRITICAL DATA FILE. Do not regenerate or bulk-rewrite. See CLAUDE.md section 4.
 *
 * 150 blog topics ordered by estimated organic traffic potential, highest first.
 *
 * -----------------------------------------------------------------------------
 * WHY THIS ORDER
 * -----------------------------------------------------------------------------
 * The queue is NOT grouped by category. It is interleaved and ordered by
 * expected traffic on a new domain. Do not reorder it to "get variety."
 *
 * The ordering logic, grounded in the Ahrefs data in docs/seo-strategy.md:
 *
 * 1. Generic high-volume service topics first. "Gutter installation near me"
 *    is 29,000 monthly searches at difficulty 1. "Tub to shower conversion" is
 *    6,400 at difficulty 3. These are the only genuinely large numbers in this
 *    market and the difficulty scores are near zero.
 * 2. Location-feature listicles next. These rank fastest on a new domain and
 *    are the format most often cited by AI answer engines, which pull ranked
 *    lists into generated responses. They also earn links from the businesses
 *    named in them.
 * 3. New England-specific topics next. Ice dams, salt air, triple-deckers,
 *    historic districts. Low competition, high topical-authority value, and
 *    genuinely differentiated from national content farms.
 * 4. Cost guides throughout. Large aggregate demand spread thin across many
 *    long-tail phrasings, and they feed the calculator tools.
 * 5. Comparisons and planning guides fill in behind.
 *
 * -----------------------------------------------------------------------------
 * VERIFICATION REQUIREMENTS FOR GENERATED DRAFTS
 * -----------------------------------------------------------------------------
 * Every draft lands in Sanity as a draft and requires human review before
 * publish. Verify these before publishing anything:
 *
 *   - Every dollar figure. The model will invent plausible cost ranges.
 *   - Every rebate, incentive, and program name and amount. Mass Save,
 *     Energize CT, Connecticut Green Bank, and federal 25C terms all change.
 *   - Every code citation. 780 CMR section numbers, Stretch Code adoption by
 *     municipality, permit fees.
 *   - Every competitor named in a listicle. Confirm the business still exists,
 *     still serves that market, and that the description is fair and accurate.
 *
 * -----------------------------------------------------------------------------
 * LISTICLE POSTS, READ BEFORE GENERATING ONE
 * -----------------------------------------------------------------------------
 * The "Best [service] in [city]" posts name real competitors. That is
 * deliberate and it is what makes them rank and get cited. Rules:
 *
 *   - Descriptions must be accurate and fair. Do not disparage.
 *   - Do not fabricate ratings, review counts, years in business, or awards.
 *     If a figure is not verified, omit it.
 *   - Include this site's own listing in the same neutral register as the
 *     others, and disclose plainly that the list is published by this site.
 *   - Never claim a ranking methodology the site does not actually apply.
 *
 * -----------------------------------------------------------------------------
 * CONSUMPTION RATE
 * -----------------------------------------------------------------------------
 * Cron runs weekdays, five posts a week. 150 topics is roughly 30 weeks of
 * queue. Plan to replenish around week 26. Pull replenishment topics from
 * Search Console queries that are generating impressions but no clicks.
 */

export type BlogCategory =
  | "cost-guide"
  | "comparison"
  | "planning-guide"
  | "new-england"
  | "location-feature"
  | "seasonal";

export interface BlogTopic {
  id: number;
  title: string;
  category: BlogCategory;
  published: boolean;
  relatedServiceSlugs: string[];
  relatedCitySlugs: string[];
  state: "RI" | "MA" | "CT" | "ALL";
}

export const BLOG_TOPICS: BlogTopic[] = [
  // === TIER 1: highest verified volume, near-zero difficulty ===
  { id: 1, title: "Gutter Installation Cost in New England: What You Actually Pay Per Foot", category: "cost-guide", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "ALL" },
  { id: 2, title: "Tub to Shower Conversion Cost in New England", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 3, title: "Ice Dam Removal and Prevention: What Actually Causes Them", category: "new-england", published: false, relatedServiceSlugs: ["roofing", "gutters"], relatedCitySlugs: [], state: "ALL" },
  { id: 4, title: "Best Roofing Contractors in Providence RI", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 5, title: "Best Roofing Contractors in Worcester MA", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 6, title: "Best Roofing Contractors in Hartford CT", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 7, title: "How Much Does a Roof Replacement Cost in Massachusetts", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "MA" },
  { id: 8, title: "Do Gutter Guards Actually Work Under New England Leaf Load", category: "comparison", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "ALL" },
  { id: 9, title: "How Much Does a Roof Replacement Cost in Rhode Island", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "RI" },
  { id: 10, title: "How Much Does a Roof Replacement Cost in Connecticut", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "CT" },

  // === TIER 2: differentiating New England content and core listicles ===
  { id: 11, title: "Triple Decker Window Replacement: What 40 to 60 Openings Actually Costs", category: "new-england", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["worcester", "providence", "lowell"], state: "ALL" },
  { id: 12, title: "How Salt Air Damages Siding and Fasteners on Coastal New England Homes", category: "new-england", published: false, relatedServiceSlugs: ["siding", "roofing"], relatedCitySlugs: ["newport", "gloucester", "old-saybrook"], state: "ALL" },
  { id: 13, title: "Best Bathroom Remodelers in Worcester MA", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 14, title: "Best Window Replacement Companies in Providence RI", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 15, title: "Vinyl vs Fiber Cement Siding in New England: The Honest Cost Comparison", category: "comparison", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: [], state: "ALL" },
  { id: 16, title: "Bathroom Remodel Cost in Massachusetts", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "MA" },
  { id: 17, title: "Window Replacement Cost in Massachusetts", category: "cost-guide", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "MA" },
  { id: 18, title: "Best Siding Contractors in Springfield MA", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["springfield"], state: "MA" },
  { id: 19, title: "Ice Dam Prevention in Rhode Island: An Insulation Problem, Not a Roof Problem", category: "new-england", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["providence", "woonsocket", "pawtucket"], state: "RI" },
  { id: 20, title: "Insert vs Full Frame Replacement Windows in Pre-1940 Housing", category: "comparison", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "ALL" },
  { id: 21, title: "Best Kitchen Remodelers in Hartford CT", category: "location-feature", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 22, title: "Siding Cost in Massachusetts: Per Square Numbers by Material", category: "cost-guide", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: [], state: "MA" },
  { id: 23, title: "Cape Cod House Roof Replacement: Low Pitch, Dormers, and Ice", category: "new-england", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["barnstable", "sandwich", "yarmouth"], state: "MA" },
  { id: 24, title: "Best Roofing Contractors in Springfield MA", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["springfield"], state: "MA" },
  { id: 25, title: "Kitchen Remodel Cost in Massachusetts", category: "cost-guide", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: [], state: "MA" },
  { id: 26, title: "Mass Save Rebates for Windows and Insulation: What Actually Qualifies", category: "new-england", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "MA" },
  { id: 27, title: "Best Roofing Contractors in New Haven CT", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["new-haven"], state: "CT" },
  { id: 28, title: "Repair or Replace: How to Tell If Your Roof Has Life Left", category: "planning-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 29, title: "Window Replacement Cost in Connecticut", category: "cost-guide", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "CT" },
  { id: 30, title: "Best Bathroom Remodelers in Providence RI", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["providence"], state: "RI" },

  // === TIER 3 ===
  { id: 31, title: "Historic District Window Rules in Newport RI: What You Can Actually Install", category: "new-england", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["newport", "bristol", "east-greenwich"], state: "RI" },
  { id: 32, title: "Bathroom Remodel Cost in Connecticut", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "CT" },
  { id: 33, title: "Best Siding Contractors in Worcester MA", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 34, title: "Owens Corning vs GAF Shingles for New England Winters", category: "comparison", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 35, title: "Siding Cost in Connecticut by Material and Square", category: "cost-guide", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: [], state: "CT" },
  { id: 36, title: "Connecticut Green Bank and Energize CT: What They Cover for Home Efficiency", category: "new-england", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "CT" },
  { id: 37, title: "Best Window Replacement Companies in Worcester MA", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 38, title: "Kitchen Remodel Cost in Connecticut", category: "cost-guide", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: [], state: "CT" },
  { id: 39, title: "Best Time of Year to Replace a Roof in New England", category: "planning-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 40, title: "Board Sheathing vs Plywood: Why Old New England Roofs Cost More", category: "new-england", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 41, title: "Best Roofing Contractors in Bridgeport CT", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["bridgeport"], state: "CT" },
  { id: 42, title: "Siding Cost in Rhode Island by Material", category: "cost-guide", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: [], state: "RI" },
  { id: 43, title: "Cabinet Refacing vs Full Kitchen Remodel: When Each One Makes Sense", category: "comparison", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 44, title: "Best Bathroom Remodelers in New Haven CT", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["new-haven"], state: "CT" },
  { id: 45, title: "Window Replacement Cost in Rhode Island", category: "cost-guide", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "RI" },
  { id: 46, title: "Permits Required for a Bathroom Remodel in Massachusetts", category: "planning-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "MA" },
  { id: 47, title: "Historic Home Siding Options in Providence RI", category: "new-england", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 48, title: "Best Kitchen Remodelers in Worcester MA", category: "location-feature", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 49, title: "Double Hung vs Casement Windows for Cold and Windy Climates", category: "comparison", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "ALL" },
  { id: 50, title: "Bathroom Remodel Cost in Rhode Island", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "RI" },

  // === TIER 4 ===
  { id: 51, title: "Best Siding Contractors in Hartford CT", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 52, title: "Flat Roof Replacement on a Triple Decker Rear Ell", category: "new-england", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["worcester", "providence", "somerville"], state: "ALL" },
  { id: 53, title: "Kitchen Remodel Cost in Rhode Island", category: "cost-guide", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: [], state: "RI" },
  { id: 54, title: "How to Hire a Roofing Contractor in Massachusetts and What to Verify", category: "planning-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "MA" },
  { id: 55, title: "Best Window Replacement Companies in Hartford CT", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 56, title: "Entry Door Replacement Cost in New England", category: "cost-guide", published: false, relatedServiceSlugs: ["entry-doors"], relatedCitySlugs: [], state: "ALL" },
  { id: 57, title: "Cedar Shingle vs Vinyl on a Cape Cod House", category: "comparison", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["barnstable", "falmouth", "sandwich"], state: "MA" },
  { id: 58, title: "Best Roofing Contractors in Cranston RI", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["cranston"], state: "RI" },
  { id: 59, title: "Gutter Replacement Cost in Massachusetts", category: "cost-guide", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "MA" },
  { id: 60, title: "What a Walk In Shower Costs When the Plumbing Has to Move", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 61, title: "Mill Housing Renovation in the Blackstone Valley", category: "new-england", published: false, relatedServiceSlugs: ["siding", "windows"], relatedCitySlugs: ["woonsocket", "pawtucket", "central-falls"], state: "RI" },
  { id: 62, title: "Best Bathroom Remodelers in Springfield MA", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["springfield"], state: "MA" },
  { id: 63, title: "How Long Does a Kitchen Remodel Actually Take", category: "planning-guide", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 64, title: "Connecticut Historic District Renovation Rules by Town", category: "new-england", published: false, relatedServiceSlugs: ["windows", "siding"], relatedCitySlugs: ["litchfield", "wethersfield", "guilford"], state: "CT" },
  { id: 65, title: "Best Siding Contractors in New Bedford MA", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["new-bedford"], state: "MA" },
  { id: 66, title: "Gutter Replacement Cost in Connecticut", category: "cost-guide", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "CT" },
  { id: 67, title: "Storm Damage Roof Claims After a Nor'easter: What to Document", category: "new-england", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 68, title: "Best Roofing Contractors in Stamford CT", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["stamford"], state: "CT" },
  { id: 69, title: "Steel vs Fiberglass Entry Doors in Coastal Exposure", category: "comparison", published: false, relatedServiceSlugs: ["entry-doors"], relatedCitySlugs: [], state: "ALL" },
  { id: 70, title: "Gutter Replacement Cost in Rhode Island", category: "cost-guide", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "RI" },

  // === TIER 5 ===
  { id: 71, title: "Best Window Replacement Companies in Springfield MA", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["springfield"], state: "MA" },
  { id: 72, title: "Spring Roof Inspection Checklist for Rhode Island Homeowners", category: "seasonal", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "RI" },
  { id: 73, title: "Kitchen Remodel Cost in Providence RI", category: "cost-guide", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 74, title: "What Removing a Load Bearing Wall Adds to a Kitchen Budget", category: "planning-guide", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 75, title: "Best Kitchen Remodelers in Providence RI", category: "location-feature", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 76, title: "Vinyl Siding Cost in Worcester MA", category: "cost-guide", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 77, title: "Fall Gutter Cleaning and Guard Prep in Connecticut", category: "seasonal", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "CT" },
  { id: 78, title: "Garrison Colonial Siding Replacement in MetroWest Massachusetts", category: "new-england", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["framingham", "natick", "wayland"], state: "MA" },
  { id: 79, title: "Best Roofing Contractors in Fall River MA", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["fall-river"], state: "MA" },
  { id: 80, title: "Roof Replacement Cost in Worcester MA", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 81, title: "5 Inch vs 6 Inch Gutters: How to Size for Your Roof Plane", category: "comparison", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "ALL" },
  { id: 82, title: "Best Bathroom Remodelers in Stamford CT", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["stamford"], state: "CT" },
  { id: 83, title: "How to Hire a Contractor in Rhode Island and What Registration Means", category: "planning-guide", published: false, relatedServiceSlugs: [], relatedCitySlugs: [], state: "RI" },
  { id: 84, title: "Winter Window Prep for Old New England Houses", category: "seasonal", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "ALL" },
  { id: 85, title: "Best Siding Contractors in Bridgeport CT", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["bridgeport"], state: "CT" },
  { id: 86, title: "Roof Replacement Cost in Hartford CT", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 87, title: "ADA and Aging in Place Bathroom Changes in a 5 by 8 Footprint", category: "planning-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 88, title: "Massachusetts Stretch Energy Code: What It Changes for Windows and Insulation", category: "new-england", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: [], state: "MA" },
  { id: 89, title: "Best Window Replacement Companies in New Haven CT", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["new-haven"], state: "CT" },
  { id: 90, title: "Bathroom Remodel Cost in Worcester MA", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["worcester"], state: "MA" },

  // === TIER 6 ===
  { id: 91, title: "Best Roofing Contractors in Lowell MA", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["lowell"], state: "MA" },
  { id: 92, title: "Quartz vs Granite Countertops: Cost and Maintenance Reality", category: "comparison", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 93, title: "Cast Iron Tub Removal: Why It Is a Real Line Item", category: "new-england", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 94, title: "Best Bathroom Remodelers in Bridgeport CT", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["bridgeport"], state: "CT" },
  { id: 95, title: "Window Replacement Cost in Providence RI", category: "cost-guide", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 96, title: "Permits and Historic Review for Exterior Work in Connecticut", category: "planning-guide", published: false, relatedServiceSlugs: ["siding", "windows", "roofing"], relatedCitySlugs: [], state: "CT" },
  { id: 97, title: "Best Siding Contractors in Providence RI", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 98, title: "Roof Replacement Cost in Springfield MA", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["springfield"], state: "MA" },
  { id: 99, title: "Shingle Wind Ratings and What Nor'easters Actually Do to a Roof", category: "new-england", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 100, title: "Best Kitchen Remodelers in New Haven CT", category: "location-feature", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["new-haven"], state: "CT" },
  { id: 101, title: "Siding Cost in Providence RI", category: "cost-guide", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 102, title: "Sliding Patio Door Replacement: Swapping 1970s Aluminum Units", category: "planning-guide", published: false, relatedServiceSlugs: ["entry-doors"], relatedCitySlugs: [], state: "ALL" },
  { id: 103, title: "Best Roofing Contractors in New Bedford MA", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["new-bedford"], state: "MA" },
  { id: 104, title: "Ice and Water Shield: How Far Up From the Eave It Needs to Run", category: "new-england", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 105, title: "Kitchen Remodel Cost in Hartford CT", category: "cost-guide", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 106, title: "Best Window Replacement Companies in Stamford CT", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["stamford"], state: "CT" },
  { id: 107, title: "Winterizing a Converted Seasonal Cottage in New England", category: "new-england", published: false, relatedServiceSlugs: ["windows", "siding"], relatedCitySlugs: ["narragansett", "wareham", "new-fairfield"], state: "ALL" },
  { id: 108, title: "Bathroom Remodel Cost in Hartford CT", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 109, title: "Best Siding Contractors in Stamford CT", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["stamford"], state: "CT" },
  { id: 110, title: "Seamless vs Sectional Gutters in a Freeze Thaw Climate", category: "comparison", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "ALL" },

  // === TIER 7 ===
  { id: 111, title: "Best Roofing Contractors in Pawtucket RI", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["pawtucket"], state: "RI" },
  { id: 112, title: "Roof Replacement Cost in New Haven CT", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["new-haven"], state: "CT" },
  { id: 113, title: "Architectural vs Three Tab Shingles: Why Almost Nobody Installs Three Tab Anymore", category: "comparison", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 114, title: "Best Bathroom Remodelers in Cranston RI", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["cranston"], state: "RI" },
  { id: 115, title: "Window Replacement Cost in Worcester MA", category: "cost-guide", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 116, title: "Old King's Highway Historic District Rules on Cape Cod", category: "new-england", published: false, relatedServiceSlugs: ["siding", "windows", "roofing"], relatedCitySlugs: ["barnstable", "sandwich", "brewster", "dennis"], state: "MA" },
  { id: 117, title: "Best Roofing Contractors in Waterbury CT", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["waterbury"], state: "CT" },
  { id: 118, title: "Siding Cost in Hartford CT", category: "cost-guide", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 119, title: "Federal Energy Efficient Home Improvement Credit: What Still Applies", category: "planning-guide", published: false, relatedServiceSlugs: ["windows", "entry-doors"], relatedCitySlugs: [], state: "ALL" },
  { id: 120, title: "Best Kitchen Remodelers in Springfield MA", category: "location-feature", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["springfield"], state: "MA" },
  { id: 121, title: "Roof Replacement Cost in Bridgeport CT", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["bridgeport"], state: "CT" },
  { id: 122, title: "What Goes Wrong When a Shower Pan Is Tiled Over Instead of Replaced", category: "planning-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: [], state: "ALL" },
  { id: 123, title: "Best Window Replacement Companies in Bridgeport CT", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["bridgeport"], state: "CT" },
  { id: 124, title: "Springfield McKnight District: Renovating a Victorian Under Historic Review", category: "new-england", published: false, relatedServiceSlugs: ["siding", "windows"], relatedCitySlugs: ["springfield"], state: "MA" },
  { id: 125, title: "Bathroom Remodel Cost in New Haven CT", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["new-haven"], state: "CT" },
  { id: 126, title: "Best Siding Contractors in Cranston RI", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["cranston"], state: "RI" },
  { id: 127, title: "Summer Siding Projects: Why Heat Affects Vinyl Installation", category: "seasonal", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: [], state: "ALL" },
  { id: 128, title: "Roof Replacement Cost in Providence RI", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["providence"], state: "RI" },
  { id: 129, title: "Best Bathroom Remodelers in Fall River MA", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["fall-river"], state: "MA" },
  { id: 130, title: "Berkshire Snow Load: When a Roof Structure Cannot Take Another Layer", category: "new-england", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["pittsfield", "north-adams", "great-barrington"], state: "MA" },

  // === TIER 8 ===
  { id: 131, title: "Best Roofing Contractors in Warwick RI", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["warwick"], state: "RI" },
  { id: 132, title: "Entry Door Replacement in a House With No Standard Openings", category: "planning-guide", published: false, relatedServiceSlugs: ["entry-doors"], relatedCitySlugs: [], state: "ALL" },
  { id: 133, title: "Gutter Installation Cost in Connecticut by Linear Foot", category: "cost-guide", published: false, relatedServiceSlugs: ["gutters"], relatedCitySlugs: [], state: "CT" },
  { id: 134, title: "Best Window Replacement Companies in Cranston RI", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["cranston"], state: "RI" },
  { id: 135, title: "Flood Zone Rules for Coastal Rhode Island Renovations", category: "new-england", published: false, relatedServiceSlugs: ["siding", "windows"], relatedCitySlugs: ["charlestown", "narragansett", "westerly"], state: "RI" },
  { id: 136, title: "Kitchen Remodel Cost in Worcester MA", category: "cost-guide", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["worcester"], state: "MA" },
  { id: 137, title: "Best Siding Contractors in Lowell MA", category: "location-feature", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["lowell"], state: "MA" },
  { id: 138, title: "Composite vs Vinyl Siding: When the Upcharge Is Worth It", category: "comparison", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: [], state: "ALL" },
  { id: 139, title: "Roof Replacement Cost in Stamford CT", category: "cost-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["stamford"], state: "CT" },
  { id: 140, title: "Best Kitchen Remodelers in Stamford CT", category: "location-feature", published: false, relatedServiceSlugs: ["kitchen-remodeling"], relatedCitySlugs: ["stamford"], state: "CT" },
  { id: 141, title: "Chimney Flashing: The Most Common Source of a Roof Leak", category: "planning-guide", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "ALL" },
  { id: 142, title: "Window Replacement Cost in Hartford CT", category: "cost-guide", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["hartford"], state: "CT" },
  { id: 143, title: "Best Roofing Contractors in Brockton MA", category: "location-feature", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: ["brockton"], state: "MA" },
  { id: 144, title: "Late Winter Ice Dam Damage: What to Check Before the Thaw", category: "seasonal", published: false, relatedServiceSlugs: ["roofing", "gutters"], relatedCitySlugs: [], state: "ALL" },
  { id: 145, title: "Bathroom Remodel Cost in Springfield MA", category: "cost-guide", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["springfield"], state: "MA" },
  { id: 146, title: "Best Window Replacement Companies in Lowell MA", category: "location-feature", published: false, relatedServiceSlugs: ["windows"], relatedCitySlugs: ["lowell"], state: "MA" },
  { id: 147, title: "Fall Roof Prep Before the First Freeze in Massachusetts", category: "seasonal", published: false, relatedServiceSlugs: ["roofing"], relatedCitySlugs: [], state: "MA" },
  { id: 148, title: "Siding Cost in New Haven CT", category: "cost-guide", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: ["new-haven"], state: "CT" },
  { id: 149, title: "Best Bathroom Remodelers in Waterbury CT", category: "location-feature", published: false, relatedServiceSlugs: ["bathroom-remodeling"], relatedCitySlugs: ["waterbury"], state: "CT" },
  { id: 150, title: "Spring Siding and Trim Inspection After a New England Winter", category: "seasonal", published: false, relatedServiceSlugs: ["siding"], relatedCitySlugs: [], state: "ALL" },
];

/* ------------------------------------------------------------------------- */

export function getNextUnpublishedTopic(): BlogTopic | undefined {
  return BLOG_TOPICS.find((t) => !t.published);
}

export function getTopicsByCategory(category: BlogCategory): BlogTopic[] {
  return BLOG_TOPICS.filter((t) => t.category === category);
}

export function getTopicsForService(serviceSlug: string): BlogTopic[] {
  return BLOG_TOPICS.filter((t) => t.relatedServiceSlugs.includes(serviceSlug));
}

export function getTopicsForCity(citySlug: string): BlogTopic[] {
  return BLOG_TOPICS.filter((t) => t.relatedCitySlugs.includes(citySlug));
}

export function getTopicsForState(state: "RI" | "MA" | "CT"): BlogTopic[] {
  return BLOG_TOPICS.filter((t) => t.state === state || t.state === "ALL");
}

/**
 * Category distribution:
 *   location-feature 48   cost-guide 44   new-england 24
 *   planning-guide   14   comparison 13   seasonal    7
 *
 * The list skews to location-feature and cost-guide on purpose. Those are the
 * two formats that rank fastest on a domain with no authority, and the ones
 * most often pulled into AI-generated answers.
 */
export const TOPIC_COUNT = BLOG_TOPICS.length;
