/**
 * cities-phase1.ts
 *
 * CRITICAL DATA FILE. Do not regenerate or bulk-rewrite. See CLAUDE.md section 4.
 *
 * PHASE 1: All 39 Rhode Island municipalities.
 *
 * Rhode Island is the entire state, not a selection. Ordered by county:
 * Providence (16), Kent (5), Washington (9), Newport (6), Bristol (3).
 *
 * Rhode Island runs first because it is the smallest complete state in the
 * target market. 39 city hubs plus 273 service x city pages is a footprint a
 * new domain can get fully indexed in 3 to 4 weeks, which makes it a real test
 * of the model rather than a guess. See docs/seo-strategy.md.
 *
 * SEQUENCING NOTE within Phase 1. Couto Construction is the strongest organic
 * competitor in the market and their footprint is the East Bay and the
 * southeastern Massachusetts corridor. Bristol, Warren, Barrington, Tiverton,
 * and Little Compton are the contested towns. Providence County and Kent County
 * are effectively open. If a partial Phase 1 launch is ever needed, lead with
 * Providence and Kent. See docs/competitors.md.
 */

import type { City } from "./cities";

export const CITIES_PHASE_1: City[] = [
  // ===========================================================================
  // PROVIDENCE COUNTY (16)
  // ===========================================================================
  {
    slug: "providence",
    city: "Providence",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02903", "02904", "02905", "02906", "02907", "02908", "02909"],
    nearbyTowns: ["Cranston", "North Providence", "Pawtucket", "East Providence", "Johnston"],
    populationTier: "large",
    phase: 1,
    subServiceLive: false,
    region: "Providence Metro",
    homeStyleNote:
      "Triple-deckers dominate Elmwood, the West End, Olneyville, and Smith Hill, most built 1890 to 1920 with low-slope rear ells that leak long before the main roof does. The East Side runs to Victorians, Colonial Revivals, and Federal brick around Benefit Street, much of it inside historic district review.",
  },
  {
    slug: "cranston",
    city: "Cranston",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02905", "02910", "02920", "02921"],
    nearbyTowns: ["Providence", "Warwick", "Johnston", "West Warwick", "Scituate"],
    populationTier: "large",
    phase: 1,
    subServiceLive: false,
    region: "Providence Metro",
    homeStyleNote:
      "Two distinct halves. Eastern Cranston, Edgewood and Pawtuxet, holds Victorians and early 1900s colonials on tight lots. Western Cranston is postwar: ranches, split levels, and raised ranches built 1950 to 1975, most with original aluminum sliders and 5-inch gutter undersized for the roof plane.",
  },
  {
    slug: "warwick",
    city: "Warwick",
    state: "RI",
    county: "Kent County",
    zipCodes: ["02886", "02888", "02889", "02818"],
    nearbyTowns: ["Cranston", "West Warwick", "East Greenwich", "Coventry"],
    populationTier: "large",
    phase: 1,
    subServiceLive: false,
    region: "Kent County",
    homeStyleNote:
      "Rhode Island's deepest concentration of postwar capes and ranches, built out fast between 1945 and 1965 across Apponaug, Hoxsie, and Greenwood. Add shoreline exposure in Conimicut, Oakland Beach, and Warwick Neck, where salt air shortens paint life and eats steel door bottoms.",
  },
  {
    slug: "pawtucket",
    city: "Pawtucket",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02860", "02861"],
    nearbyTowns: ["Providence", "Central Falls", "North Providence", "Lincoln", "East Providence"],
    populationTier: "medium-large",
    phase: 1,
    subServiceLive: false,
    region: "Blackstone Valley",
    homeStyleNote:
      "Mill city stock: triple-deckers and two-families packed around the Slater Mill corridor and Darlington, mostly 1880 to 1925. Narrow side yards make staging a real constraint on siding work, and many roofs are complex multi-plane geometry with several low-slope sections.",
  },
  {
    slug: "east-providence",
    city: "East Providence",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02914", "02915", "02916"],
    nearbyTowns: ["Providence", "Pawtucket", "Barrington", "Seekonk"],
    populationTier: "medium-large",
    phase: 1,
    subServiceLive: false,
    region: "East Bay",
    homeStyleNote:
      "Riverside and Rumford hold early 1900s colonials and bungalows, while the Watchemoket and Kent Heights sections are dense two-families and postwar capes. Waterfront exposure along the Providence and Seekonk rivers means wind-driven rain on the western elevations.",
  },
  {
    slug: "woonsocket",
    city: "Woonsocket",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02895"],
    nearbyTowns: ["Cumberland", "North Smithfield", "Lincoln", "Blackstone"],
    populationTier: "medium-large",
    phase: 1,
    subServiceLive: false,
    region: "Blackstone Valley",
    homeStyleNote:
      "One of the densest concentrations of French-Canadian mill worker housing in New England. Triple-deckers and tenement blocks through Social, Bernon, and Fairmount, most 1890 to 1915, many with original wood clapboard under one or two layers of later siding and asphalt shingle over board sheathing.",
  },
  {
    slug: "north-providence",
    city: "North Providence",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02904", "02911"],
    nearbyTowns: ["Providence", "Johnston", "Smithfield", "Lincoln", "Pawtucket"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "Providence Metro",
    homeStyleNote:
      "Dense inner-ring suburb. Marieville and Centredale hold 1920s bungalows and two-families, and the balance is postwar capes and raised ranches on small lots. Vinyl siding installed in the 1980s and 1990s is now at end of life across much of the housing stock.",
  },
  {
    slug: "cumberland",
    city: "Cumberland",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02864"],
    nearbyTowns: ["Woonsocket", "Lincoln", "Central Falls", "Attleboro", "North Smithfield"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "Blackstone Valley",
    homeStyleNote:
      "Mixed stock. Valley Falls and Ashton hold mill village housing and stone-and-frame worker cottages along the Blackstone, while Diamond Hill and the eastern side are 1970s through 2000s colonials and garrison colonials on larger lots with full-size double hung openings.",
  },
  {
    slug: "johnston",
    city: "Johnston",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02919"],
    nearbyTowns: ["Providence", "Cranston", "North Providence", "Scituate", "Smithfield"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "Providence Metro",
    homeStyleNote:
      "Predominantly postwar. Ranches and raised ranches from the 1950s through the 1970s across Thornton and Simmonsville, with newer colonial subdivisions toward the western end. Larger lots than the neighboring cities, which makes staging and material drop straightforward.",
  },
  {
    slug: "lincoln",
    city: "Lincoln",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02865"],
    nearbyTowns: ["Pawtucket", "Cumberland", "Smithfield", "North Providence", "Woonsocket"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "Blackstone Valley",
    homeStyleNote:
      "Lonsdale and Manville are Blackstone mill villages with tight rows of worker housing and some stone construction. Quinnville and the Great Road corridor hold genuinely old colonial-era houses, and the rest is postwar and later suburban development.",
  },
  {
    slug: "smithfield",
    city: "Smithfield",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02917", "02828"],
    nearbyTowns: ["North Providence", "Johnston", "Lincoln", "North Smithfield", "Glocester"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "Northern Rhode Island",
    homeStyleNote:
      "Greenville and Esmond are the population centers, with 19th century mill village housing around the Woonasquatucket and a large share of 1960s through 1990s colonials and contemporaries. Wooded lots mean heavy leaf load and gutter guard demand well above the state average.",
  },
  {
    slug: "central-falls",
    city: "Central Falls",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02863"],
    nearbyTowns: ["Pawtucket", "Cumberland", "Lincoln", "Providence"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "Blackstone Valley",
    homeStyleNote:
      "The densest square mile in Rhode Island and almost entirely triple-deckers and tenements from 1880 to 1915. Zero-lot-line conditions on many parcels, so siding and roofing work frequently requires a neighbor access agreement and staging from the street.",
  },
  {
    slug: "north-smithfield",
    city: "North Smithfield",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02896"],
    nearbyTowns: ["Woonsocket", "Smithfield", "Burrillville", "Cumberland", "Lincoln"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "Northern Rhode Island",
    homeStyleNote:
      "Slatersville is one of the oldest planned mill villages in the country, with early 1800s worker housing under historic district review. Outside the village the stock is farmhouses, capes, and later colonial subdivisions on wooded acreage.",
  },
  {
    slug: "burrillville",
    city: "Burrillville",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02830", "02839", "02859", "02826"],
    nearbyTowns: ["North Smithfield", "Glocester", "Smithfield"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "Northern Rhode Island",
    homeStyleNote:
      "A collection of mill villages, Harrisville, Pascoag, Oakland, and Mapleville, each with 19th century worker housing, plus farmhouses and capes on large wooded lots. Snow load is heavier here than on the coast and ice damming is a routine annual problem rather than an occasional one.",
  },
  {
    slug: "scituate",
    city: "Scituate",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02857", "02831", "02825"],
    nearbyTowns: ["Johnston", "Cranston", "Foster", "Coventry", "Glocester"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "Northern Rhode Island",
    homeStyleNote:
      "North Scituate village holds Greek Revival and Federal houses, and the balance of the town is farmhouses, antique capes, and 1970s through 1990s colonials on multi-acre wooded lots around the Scituate Reservoir watershed, where septic and setback rules shape any addition work.",
  },
  {
    slug: "glocester",
    city: "Glocester",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02814", "02857", "02859"],
    nearbyTowns: ["Burrillville", "Smithfield", "Scituate", "Foster"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "Northern Rhode Island",
    homeStyleNote:
      "Chepachet village is a well-preserved 18th and 19th century streetscape with center chimney colonials and Greek Revival storefronts. Outside the village, antique farmhouses and later capes on heavily wooded acreage, with the state's highest routine snow loads.",
  },
  {
    slug: "foster",
    city: "Foster",
    state: "RI",
    county: "Providence County",
    zipCodes: ["02825"],
    nearbyTowns: ["Scituate", "Glocester", "Coventry"],
    populationTier: "tiny",
    phase: 1,
    subServiceLive: false,
    region: "Northern Rhode Island",
    homeStyleNote:
      "The most rural municipality in Rhode Island. Genuine 18th century center chimney colonials and stone-ender remnants, farmhouses, and scattered later capes on large parcels. Long driveways and no municipal water shape both access and job pricing.",
  },

  // ===========================================================================
  // KENT COUNTY (5)  Warwick is listed above under Providence Metro ordering.
  // ===========================================================================
  {
    slug: "west-warwick",
    city: "West Warwick",
    state: "RI",
    county: "Kent County",
    zipCodes: ["02893"],
    nearbyTowns: ["Warwick", "Coventry", "Cranston", "East Greenwich"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "Kent County",
    homeStyleNote:
      "Built around the Pawtuxet River mills. Arctic, Natick, and Phenix are dense mill villages with two-family and triple-decker housing from 1880 to 1920, tight lots, and a high proportion of roofs with multiple low-slope sections over rear additions.",
  },
  {
    slug: "coventry",
    city: "Coventry",
    state: "RI",
    county: "Kent County",
    zipCodes: ["02816", "02827"],
    nearbyTowns: ["West Warwick", "Warwick", "West Greenwich", "Scituate", "Foster"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "Kent County",
    homeStyleNote:
      "The largest town by land area in the state, and the stock changes as you move west. Anthony and Washington villages hold 19th century mill housing, the middle of town is postwar ranches and capes, and western Coventry is farmhouses and newer colonials on wooded acreage.",
  },
  {
    slug: "east-greenwich",
    city: "East Greenwich",
    state: "RI",
    county: "Kent County",
    zipCodes: ["02818"],
    nearbyTowns: ["Warwick", "West Warwick", "North Kingstown", "Coventry"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "Kent County",
    homeStyleNote:
      "Main Street and the hill above the harbor hold Federal, Greek Revival, and Victorian houses under historic district review, where window replacement means an approved profile and often a wood or clad unit rather than vinyl. West of Route 1 the stock is postwar and newer colonials.",
  },
  {
    slug: "west-greenwich",
    city: "West Greenwich",
    state: "RI",
    county: "Kent County",
    zipCodes: ["02817"],
    nearbyTowns: ["Coventry", "East Greenwich", "Exeter", "Richmond"],
    populationTier: "tiny",
    phase: 1,
    subServiceLive: false,
    region: "Kent County",
    homeStyleNote:
      "Heavily wooded and sparsely built. A handful of antique farmhouses and capes, with most of the housing stock being 1980s through 2000s colonials and contemporaries on multi-acre lots. Heavy oak leaf load makes gutter guard a routine part of any gutter conversation here.",
  },

  // ===========================================================================
  // WASHINGTON COUNTY, SOUTH COUNTY (9)
  // ===========================================================================
  {
    slug: "south-kingstown",
    city: "South Kingstown",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02879", "02881", "02883", "02892"],
    nearbyTowns: ["Narragansett", "North Kingstown", "Charlestown", "Exeter", "Richmond"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "South County",
    homeStyleNote:
      "Wakefield and Peace Dale are 19th century mill villages with dense worker housing. Kingston holds colonial-era and Greek Revival houses around the university. Matunuck and Green Hill are shingled coastal cottages taking direct salt exposure, where fastener corrosion and paint life drive material choice.",
  },
  {
    slug: "north-kingstown",
    city: "North Kingstown",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02852", "02874"],
    nearbyTowns: ["East Greenwich", "South Kingstown", "Exeter", "Jamestown"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "South County",
    homeStyleNote:
      "Wickham and Wickford Village hold one of the best-preserved collections of 18th century houses in New England, under strict historic review. Quonset-era and postwar housing fills the middle of town, and Saunderstown holds shoreline houses on Narragansett Bay exposure.",
  },
  {
    slug: "westerly",
    city: "Westerly",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02891", "02804", "02808"],
    nearbyTowns: ["Charlestown", "Hopkinton", "Stonington", "Richmond"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "South County",
    homeStyleNote:
      "Downtown Westerly holds Victorian and granite-era commercial and residential blocks from the quarrying period. Watch Hill and Misquamicut are shingle-style coastal houses and cottages in the harshest salt and wind exposure in the state, where stainless fasteners and fiber cement earn their premium.",
  },
  {
    slug: "narragansett",
    city: "Narragansett",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02882", "02874"],
    nearbyTowns: ["South Kingstown", "North Kingstown", "Jamestown", "Charlestown"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "South County",
    homeStyleNote:
      "Victorian summer cottages and shingle-style houses around the Pier and Point Judith, many converted to year-round use without ever being insulated for it. Direct ocean exposure on the eastern elevations, and a large seasonal rental stock where roof and siding work has to fit a tight off-season window.",
  },
  {
    slug: "charlestown",
    city: "Charlestown",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02813"],
    nearbyTowns: ["Westerly", "South Kingstown", "Richmond", "Hopkinton"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "South County",
    homeStyleNote:
      "Small shingled cottages along the Ninigret and Quonochontaug pond shorelines, many originally seasonal and since winterized, plus antique capes and farmhouses inland. Coastal Resources Management Council jurisdiction affects work near the ponds and barrier beaches.",
  },
  {
    slug: "hopkinton",
    city: "Hopkinton",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02832", "02833", "02804", "02808"],
    nearbyTowns: ["Westerly", "Richmond", "Charlestown", "Exeter"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "South County",
    homeStyleNote:
      "Hope Valley and Ashaway are small mill villages with 19th century worker housing along the Wood and Pawcatuck rivers. The rest of the town is antique farmhouses, capes, and later ranches on wooded acreage well inland from any salt exposure.",
  },
  {
    slug: "richmond",
    city: "Richmond",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02875", "02892", "02898", "02832"],
    nearbyTowns: ["Hopkinton", "Charlestown", "Exeter", "South Kingstown"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "South County",
    homeStyleNote:
      "Carolina and Wyoming are small river villages with 19th century housing. The balance of the town is capes, ranches, and later colonials on large wooded lots, with a growing share of 1990s and 2000s subdivision construction now hitting first roof replacement age.",
  },
  {
    slug: "exeter",
    city: "Exeter",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02822"],
    nearbyTowns: ["North Kingstown", "South Kingstown", "Richmond", "West Greenwich"],
    populationTier: "tiny",
    phase: 1,
    subServiceLive: false,
    region: "South County",
    homeStyleNote:
      "Rural and wooded with no real village center. Antique farmhouses and stone-wall parcels, plus 1980s through 2000s colonials and contemporaries on multi-acre lots. Long private drives affect equipment access on roofing and siding jobs.",
  },
  {
    slug: "new-shoreham",
    city: "New Shoreham",
    state: "RI",
    county: "Washington County",
    zipCodes: ["02807"],
    nearbyTowns: ["Narragansett", "South Kingstown"],
    populationTier: "tiny",
    phase: 1,
    subServiceLive: false,
    region: "Block Island",
    homeStyleNote:
      "Block Island. Shingled Victorian hotels and cottages plus weathered capes and farmhouses, all in the most severe wind and salt exposure in Rhode Island. Every material arrives by ferry, which changes both cost and scheduling on any project more than a few squares.",
  },

  // ===========================================================================
  // NEWPORT COUNTY (6)
  // ===========================================================================
  {
    slug: "newport",
    city: "Newport",
    state: "RI",
    county: "Newport County",
    zipCodes: ["02840"],
    nearbyTowns: ["Middletown", "Portsmouth", "Jamestown"],
    populationTier: "medium",
    phase: 1,
    subServiceLive: false,
    region: "Newport County",
    homeStyleNote:
      "The Point and Historic Hill hold one of the largest concentrations of pre-1800 colonial houses in America, under strict Historic District Commission review that governs window profiles, siding material, and roof color. Bellevue Avenue holds Gilded Age mansions, and the Fifth Ward is dense Victorian and vernacular housing.",
  },
  {
    slug: "middletown",
    city: "Middletown",
    state: "RI",
    county: "Newport County",
    zipCodes: ["02842"],
    nearbyTowns: ["Newport", "Portsmouth", "Tiverton"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "Newport County",
    homeStyleNote:
      "Largely postwar, built out around the naval station in the 1950s and 1960s with capes and ranches, plus later colonial subdivisions. Second Beach and Sachuest exposure puts the eastern side of town in direct ocean wind, and many original aluminum sliders are still in service.",
  },
  {
    slug: "portsmouth",
    city: "Portsmouth",
    state: "RI",
    county: "Newport County",
    zipCodes: ["02871", "02872"],
    nearbyTowns: ["Middletown", "Tiverton", "Newport", "Bristol"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "Newport County",
    homeStyleNote:
      "Aquidneck Island's northern end. Antique farmhouses and colonials along East and West Main Road, postwar ranches through the middle of town, and waterfront houses at Common Fence Point and Island Park taking full bay exposure and periodic storm surge.",
  },
  {
    slug: "tiverton",
    city: "Tiverton",
    state: "RI",
    county: "Newport County",
    zipCodes: ["02878"],
    nearbyTowns: ["Portsmouth", "Little Compton", "Fall River", "Westport"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "East Bay",
    homeStyleNote:
      "Tiverton Four Corners holds a preserved 18th and 19th century village. The northern end near the Fall River line is denser mill-adjacent housing, and the Sakonnet River shoreline holds cottages and later waterfront houses with direct westerly wind exposure.",
  },
  {
    slug: "little-compton",
    city: "Little Compton",
    state: "RI",
    county: "Newport County",
    zipCodes: ["02837"],
    nearbyTowns: ["Tiverton", "Westport"],
    populationTier: "tiny",
    phase: 1,
    subServiceLive: false,
    region: "East Bay",
    homeStyleNote:
      "One of the best-preserved colonial farm landscapes in New England. Center chimney colonials, shingled farmhouses, and stone walls around the Commons, plus shingle-style houses on the Sakonnet Point shoreline in heavy salt and wind exposure.",
  },
  {
    slug: "jamestown",
    city: "Jamestown",
    state: "RI",
    county: "Newport County",
    zipCodes: ["02835"],
    nearbyTowns: ["Newport", "North Kingstown", "Narragansett"],
    populationTier: "tiny",
    phase: 1,
    subServiceLive: false,
    region: "Newport County",
    homeStyleNote:
      "Conanicut Island. Victorian summer cottages around the village and East Ferry, shingled and clapboard houses along Beavertail Road, and farmhouses on the island's southern end. Salt exposure on all sides and bridge-dependent access for material delivery.",
  },

  // ===========================================================================
  // BRISTOL COUNTY (3)
  // ===========================================================================
  {
    slug: "bristol",
    city: "Bristol",
    state: "RI",
    county: "Bristol County",
    zipCodes: ["02809"],
    nearbyTowns: ["Warren", "Barrington", "Portsmouth"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "East Bay",
    homeStyleNote:
      "Hope Street and the Bristol waterfront hold Federal and Greek Revival houses from the shipping era, many under historic district review. Off the main streets the stock is Victorian and early 1900s two-families, and the eastern side toward Mount Hope Bay is postwar and later.",
  },
  {
    slug: "warren",
    city: "Warren",
    state: "RI",
    county: "Bristol County",
    zipCodes: ["02885"],
    nearbyTowns: ["Bristol", "Barrington", "Swansea"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "East Bay",
    homeStyleNote:
      "A compact working waterfront town with dense Federal and Victorian housing on narrow lots through the Water Street and Main Street area. Many two-family conversions, and the low elevation near the Warren River puts foundation and gutter drainage under real pressure in heavy rain.",
  },
  {
    slug: "barrington",
    city: "Barrington",
    state: "RI",
    county: "Bristol County",
    zipCodes: ["02806"],
    nearbyTowns: ["Warren", "East Providence", "Bristol"],
    populationTier: "small",
    phase: 1,
    subServiceLive: false,
    region: "East Bay",
    homeStyleNote:
      "Largely a 1920s through 1960s suburb of colonials, garrison colonials, and capes on well-treed lots, with a set of larger shingle-style and Colonial Revival houses near Rumstick Point and Nayatt. Water on three sides means wind exposure that a wooded lot masks until a nor'easter.",
  },
];
