/**
 * stock-service.ts
 *
 * What each service actually means on each New England housing type.
 *
 * -----------------------------------------------------------------------------
 * WHY THIS FILE IS THE MOST IMPORTANT ONE IN lib/copy/
 * -----------------------------------------------------------------------------
 * CLAUDE.md section 11 sets a hard rule for service x city pages: at least 60
 * percent of the body must be specific to this city and this service and could
 * not be pasted onto another city's page unchanged. docs/competitors.md rule 6
 * restates it as a test: could this paragraph move to a different city with
 * only the city name changed?
 *
 * The answer here is that a Worcester triple-decker roof and a Wellesley
 * garrison colonial roof are genuinely different jobs, so the copy that
 * describes them should be genuinely different copy. These passages are keyed
 * to the housing stock the municipality's researched homeStyleNote actually
 * names. A city with triple-deckers gets the rear-ell argument. A city with
 * postwar capes gets the low-eave and dormer argument. Neither reads as the
 * other with a name swapped.
 *
 * -----------------------------------------------------------------------------
 * WRITING RULES THAT APPLY TO EVERY STRING BELOW
 * -----------------------------------------------------------------------------
 * No em dashes. No banned words, see CLAUDE.md section 8 and the list derived
 * from competitor copy in docs/competitors.md. A number in every passage, per
 * docs/competitors.md rule 3. The mechanism rather than the drama, per rule 5.
 * Nothing claiming this business is licensed, insured, or holds crews, per
 * rule 4. Written the way a contractor would explain it at a kitchen table.
 */

import type { StockFlag } from "./traits";

/** Service slug -> stock flag -> what the work involves on that stock. */
export const STOCK_SERVICE: Record<string, Partial<Record<StockFlag, string>>> = {
  /* ------------------------------------------------------------------ ROOFING */
  roofing: {
    "triple-decker":
      "The main roof is rarely the problem. On a three-decker the leak almost always starts on the low-slope section over the rear ell or the back porch stack, where asphalt shingle was never the right material and often got installed anyway. That section needs EPDM or modified bitumen, not shingle, and it usually needs a proper edge detail where it meets the main plane. Budget the two areas separately, because a contractor who quotes only the pitched roof has not quoted the part that is leaking. Staging is the other cost driver: three stories of ladder work with a neighbour eight feet away is slower than a suburban tear-off, and it shows up in the labour line.",
    "mill-housing":
      "Mill housing was built fast and close, usually between 1880 and 1925, with steep gables and board sheathing rather than plywood. Two things follow. Once the old shingle comes off, expect some percentage of those boards to be split or rotted at the eave, which is a change order if nobody priced it. And the side yards are narrow enough that staging and debris handling take real time. Ask for a deck allowance in writing, something like 20 percent of the area at a stated rate, so a bad deck does not become an open-ended number on day two.",
    colonial:
      "Most colonial roofs here run 6:12 to 9:12, which is walkable but steep enough to need staging on the eave side. On anything built before roughly 1950 the sheathing is board rather than plywood, and boards shrink, cup, and split. A tear-off on that deck frequently turns up 100 to 300 square feet that has to come off and go back as plywood. The other recurring item is the chimney: a centre or end chimney needs proper step flashing and a counter-flashing let into the mortar joint, not a bead of tar over the old lead.",
    federal:
      "Federal-era roofs tend to run 8:12 to 10:12 with a simple plane and a heavy chimney mass. The pitch is steep enough that everything takes longer, and the sheathing is board, often wide old-growth stock worth keeping. Where the house sits under historic review, the shingle profile and sometimes the colour need approval before anything gets ordered, and synthetic slate is more likely to be approved than an architectural asphalt. Start that conversation before the contract, not after, because approval can add four to eight weeks.",
    victorian:
      "A Victorian roof is not one roof. It is a main plane at 10:12 or steeper, plus turret, dormer, porch, and bay sections, and every junction between them is a valley or a sidewall that can leak. Count the planes before you compare quotes, because a bid that assumes three planes and a bid that assumes seven are not the same bid. Valley detail is where these fail: open metal valley outlasts a woven asphalt valley on a steep multi-plane roof, and the cost difference is small against the callback.",
    cape:
      "A cape roof looks simple and is not. The eave sits low, often only seven or eight feet off the ground, which means the ice dam risk is concentrated in a short run and the fix is almost entirely about the attic rather than the roof. Shed and gable dormers add valleys and sidewalls, and each dormer cheek is a flashing detail. Ice and water shield should run at least six feet up from the eave on a low-eave cape, and further if there is a history of staining on the ceiling below.",
    ranch:
      "Ranch roofs run shallow, commonly 3:12 to 5:12, over one long plane. The shallow pitch matters: below 4:12 most shingle manufacturers require a doubled underlayment, and below 3:12 asphalt shingle is not an appropriate material at all. The upside is that a ranch built after 1955 usually has plywood sheathing, so tear-off surprises are rarer and the deck allowance can be smaller. The long single plane also means a straightforward staging setup and a faster job, often two days rather than four.",
    "split-level":
      "A split level puts two roof planes at different heights with a wall between them, and that wall-to-roof junction is where the water gets in. The detail that matters is the kick-out flashing where the lower roof edge meets the upper wall: without it, runoff goes behind the siding instead of into the gutter, and the damage shows up inside years later. Pitches are usually shallow, 3:12 to 5:12, so underlayment requirements apply the same way they do on a ranch.",
    farmhouse:
      "A farmhouse is a main block plus an ell, and often a second ell added later, which means multiple roof planes meeting at different heights and pitches. The main block is usually steep, the ell shallower, and the junction between them is the recurring leak. Board sheathing throughout, frequently over hand-hewn or sawn rafters that are not evenly spaced, so plywood over-sheathing sometimes makes more sense than replacing boards one at a time. Price the main and the ell as separate scopes.",
    "coastal-cottage":
      "Salt air is a fastener problem before it is a shingle problem. Electro-galvanised nails corrode in coastal exposure and the shingle stays on until the nail head fails, at which point a section lifts in one piece during a nor'easter. Stainless or hot-dipped galvanised is the fix and the upcharge is small against a re-roof. Wind rating matters more here too: a 110 mph architectural shingle is the practical floor within a mile of open water, and the rake and ridge details are where uplift starts.",
    "shingle-style":
      "Shingle-style roofs carry a lot of geometry: sweeping planes, eyebrow dormers, turrets, and long valleys, often with cedar or slate originally. Replacing in kind is expensive and replacing in asphalt changes the look of the house in a way that is hard to undo, so the material decision deserves more thought than usual. Whatever goes on, the valley and dormer flashing is the majority of the labour, and a quote that does not itemise flashing has not really been priced.",
    "tudor-stone":
      "Stone and Tudor revival houses commonly carry slate or tile originally, on steep pitches with copper valleys and flashing. Slate repair is specialty work, and replacing a slate roof with asphalt is usually a mistake on a house of that construction, both visually and because the framing was designed for the weight. Synthetic slate is the usual middle path. Copper detail should be replaced in copper: mixing copper and aluminium in the same water path causes galvanic corrosion.",
    antique:
      "On a genuinely antique house the roof deck is board over hand-hewn or early sawn rafters, spacing is irregular, and nothing is square. That changes the sequence. Tear-off exposes framing that may need sistering before new deck goes down, and that work is not visible from the ground at quote time. The honest way to price it is a stated allowance with a unit rate, so the number moves predictably rather than becoming a negotiation on the third day.",
  },

  /* ------------------------------------------------------------------ WINDOWS */
  windows: {
    "triple-decker":
      "Forty to sixty openings across three floors is the job, and that count is what drives everything. At a typical installed range the unit price matters far more than it does on a twelve-window cape, so a 100 dollar difference per opening is 5,000 dollars on the project. The sashes are weight-and-pulley, meaning there are open weight pockets inside the frame that have been venting heat for a century. Insert windows leave those pockets in place. Full-frame replacement lets the installer insulate them, which is often the larger energy gain, and on a three-decker it is worth pricing both ways.",
    "mill-housing":
      "Weight-and-pulley sash in openings that were framed by eye, not to a standard size. Every opening needs measuring individually, and a contractor who quotes from a count rather than a measure is guessing. The weight pockets on either side of each frame are uninsulated voids running the height of the window, which is where a meaningful share of the heat loss actually is. Ask whether the quote includes insulating them, because insert units usually do not.",
    colonial:
      "Older colonials run 12 to 24 openings, few of them a standard size, and many of them out of square by half an inch or more. Insert replacement keeps the existing frame and trim, costs less, and loses one to two inches of glass on each dimension. Full-frame replacement costs more, takes longer, and lets the installer address rot at the sill and insulate the cavity. On a house where the interior trim is original and worth keeping, insert is usually the right answer even though it performs slightly worse.",
    federal:
      "Federal-era windows are frequently the most architecturally significant part of the facade, with true divided light and a specific muntin profile. Where the house is under historic review, the approved profile has to be settled before ordering, and a stock vinyl unit is unlikely to be approved. Wood or wood-clad with a simulated divided light in the correct pattern is the usual outcome. Allow four to eight weeks for review and a longer lead time on the units themselves.",
    victorian:
      "Tall narrow openings, often with a decorative head or a segmental arch, and frequently one-over-one glass rather than divided light. The height is what costs: a 30 by 72 opening is not priced like a 30 by 48, and a bay or a curved bay is a different order of work again. Count the bays and any arched heads separately when comparing quotes, because those are the units that carry the price and the lead time.",
    cape:
      "Twelve to sixteen openings, most of them small, and several of them upstairs in a knee-wall or dormer where the framing is tight. A cape is the most predictable window job in this housing stock and usually the fastest, often two to three days. The one thing to check is the dormer cheek windows, which are sometimes a non-standard size and sometimes sit in framing with no room for a full-frame unit, which pushes that opening to an insert whether or not the rest of the house is full-frame.",
    ranch:
      "Ranches built between 1955 and 1975 mostly carry aluminium sliders or single-hung units in standard sizes, which makes this the most straightforward window job available. Standard sizing means better pricing and shorter lead times. The two things worth checking are whether the existing units are the original aluminium, which conduct heat badly and are usually the reason the room is cold, and whether any picture window is a single large pane that needs tempered glass by code depending on its height above the floor.",
    "split-level":
      "Standard sizing throughout, with the complication that a split level typically has a stair-landing window and sometimes a tall entry window that are neither standard nor easy to reach. Those are the units to ask about specifically. The rest of the house prices like a ranch and installs about as fast.",
    farmhouse:
      "Irregular openings throughout, because the main block, the ell, and any later addition were each built to a different standard. Expect three or four different sizes across fifteen to twenty-five openings, all of them needing individual measurement. Sills on the weather side of an old farmhouse are frequently rotted, and that repair is separate from the window itself. Ask for it to be priced as an allowance rather than discovered.",
    "coastal-cottage":
      "Salt air attacks hardware before it attacks the sash. Balances, locks, and screen frames corrode in coastal exposure, so the hardware specification matters as much as the frame material. Vinyl and fiberglass both hold up well here; wood needs a maintained finish and will not last on the weather side without one. Many cottages were built seasonally, so the wall around the opening is often uninsulated, and that is worth addressing while the trim is off.",
    "shingle-style":
      "Large openings, mixed shapes, and frequently a bank of units acting as one assembly, which means the replacement has to be engineered rather than just measured. Any grouped assembly needs its structural header checked, and any unit over a certain size needs tempered glass. These houses often carry 30 to 50 openings, so the project sits closer to a triple-decker in scale than to a cape.",
    "tudor-stone":
      "Casement units, often steel originally, and sometimes leaded glass. Steel casements in a masonry opening are a specialty replacement: the opening is stone or brick, not framed wood, and the new unit has to be fitted to that rather than nailed to a rough opening. Where leaded glass exists, restoring the existing panel and adding an exterior storm often outperforms replacement on both cost and appearance.",
    antique:
      "Nothing is square, nothing is a standard size, and the existing sash may be original and worth keeping. On a genuinely early house, restoring the sash and adding a well-fitted storm window gets most of the energy benefit of replacement at a fraction of the cost, and keeps glass that cannot be bought back. That is not the answer a window company gives, but it is often the right one. Where replacement is the call, every opening gets measured and several will be custom.",
  },

  /* ------------------------------------------------------------------- SIDING */
  siding: {
    "triple-decker":
      "Three stories of wall, three porch stacks, and narrow side yards mean this is a staging job as much as a siding job. The wall area on a three-decker commonly runs 2,800 to 4,000 square feet, well past a typical single-family, so the per-square-foot material choice compounds. What is behind the clapboard matters more than what goes over it: board sheathing with no housewrap and often no insulation in the cavity. Blowing insulation while the siding is off costs far less than doing it as a separate job later.",
    "mill-housing":
      "Narrow exposure clapboard over board sheathing, houses close enough together that a full re-side needs coordination with the neighbour for staging. The cavity is usually empty, so this is the moment to blow it. Check the water table and the corner boards before pricing: on housing this age the rot is concentrated at the bottom course and at the corners where two walls meet, and that repair is carpentry, not siding.",
    colonial:
      "Clapboard over board sheathing, with the rot concentrated at the sill course, the corner boards, and under any window where the sill has failed. That repair is separate work and should be a stated allowance. On a colonial the exposure of the clapboard is part of the look of the house: a four-inch exposure replaced with a seven-inch panel reads wrong from the street even when the material is good. Match the exposure.",
    federal:
      "Under historic review, the siding decision is usually made for you: clapboard in the original exposure, painted, with the corner and water table detail intact. Vinyl is rarely approved on a Federal facade. The practical question becomes whether to repair and repaint the existing clapboard or replace in kind, and on old-growth stock that is still sound, repair almost always wins on both cost and outcome.",
    victorian:
      "Victorians carry trim that siding contractors tend to cover rather than work around, and covering it is what makes a re-sided Victorian look wrong. Brackets, frieze boards, window heads, and shingle courses in the gable are the house. Price the job as siding plus trim restoration, and expect the trim to be a significant share of the labour. Where the original is sound, a repaint cycle at 7 to 10 years often beats replacement outright.",
    cape:
      "A cape has a small wall area, commonly 1,200 to 1,800 square feet, and simple geometry, which makes it the least expensive re-side in this housing stock. The gable ends are the detail to check, since that is where wind-driven rain gets behind the cladding. On a postwar cape the sheathing is usually plank or early plywood and the cavity may have some insulation but rarely enough, so blowing it while the wall is open is worth pricing.",
    ranch:
      "Long low walls, simple geometry, plywood sheathing, and usually 1,400 to 2,200 square feet of area. This is the fastest re-side available and the most predictable. The item worth checking is the original cladding: many ranches here carry original aluminium or early vinyl, and behind it the sheathing is frequently sound, which keeps the prep cost low. Where there is brick veneer on the front, the transition detail between brick and new cladding needs to be thought through rather than trimmed over.",
    "split-level":
      "Two wall heights meeting at a change in level, which means more corners and more flashing than the square footage suggests. The junction where the lower roof meets the upper wall is the critical detail, and it has to be flashed properly before cladding goes over it. Otherwise the geometry is simple and the sheathing is plywood, so the job runs close to a ranch in cost per square foot.",
    farmhouse:
      "Main block plus ell, each with a different wall height and sometimes a different original cladding. Total area is often larger than it looks from the front, commonly 2,200 to 3,200 square feet. Old clapboard over plank sheathing, with the rot at the sill course and around the ell junction. The foundation is frequently stone, which means the bottom of the wall meets an irregular line, and that transition needs a proper water table detail rather than a cut edge.",
    "coastal-cottage":
      "Cedar shingle is the regional answer here for a reason: it moves with humidity, weathers to grey rather than failing, and holds up in salt air better than almost anything else. The cost is 11 to 19 dollars a square foot installed, roughly double vinyl, and it either gets stained every 5 to 8 years or is left to weather. Fiber cement is the practical alternative and holds paint 12 to 15 years in coastal exposure where vinyl fades. Fasteners must be stainless within a mile of open water.",
    "shingle-style":
      "The whole point of the house is the shingle, wrapping curves and sweeps that a flat panel cannot follow. Replacing cedar shingle with anything else on a shingle-style house does not work visually, which narrows the decision to cedar or a high-grade fiber cement shingle panel. Wall areas are large, frequently 3,000 square feet or more, so the material choice is the dominant cost.",
    "tudor-stone":
      "Stone and stucco with half-timber detail, which is masonry and plaster work rather than siding. The failure mode is stucco cracking where it meets timber, and water getting behind it. Repointing, patching, and repainting the timber is the recurring maintenance, and it is specialty work. A contractor who quotes this as a re-side has misunderstood the building.",
    antique:
      "Clapboard over plank sheathing on framing that is not plumb, which means every course has to be worked to the house rather than to a level line. Original old-growth clapboard is frequently still sound after two centuries and is better material than anything sold today, so the default should be repair and repaint rather than replace. Where sections must be replaced, matching the exposure and the profile matters more than the material.",
  },

  /* ------------------------------------------------------------------ GUTTERS */
  gutters: {
    "triple-decker":
      "Three stories, multiple roof planes, and a rear ell at a different height, so the gutter runs are short, numerous, and high. Downspout placement is the thing that gets done badly: water routed off a third-floor plane onto a porch roof rather than to the ground will destroy the porch roof. Count the runs and the downspouts rather than the linear feet when comparing quotes. Six-inch gutter is worth the upcharge on any plane over about 700 square feet.",
    "mill-housing":
      "Houses set close together, which means downspouts have nowhere good to discharge and frequently dump against a foundation that is already damp. Extensions or a tie-in to a drain matter more here than the gutter itself. Runs are short and the profile is usually five-inch, which is undersized on the larger rear planes.",
    colonial:
      "Long straight eave runs, which is the easiest gutter geometry there is, and the reason most colonials carry five-inch K-style without trouble. The exception is a steep roof with a large plane: at 9:12 over 900 square feet, five-inch gutter overflows in a heavy rain regardless of how clean it is, and six-inch with a larger downspout is the fix. Check the fascia before install, since on an older colonial it is often the rotted part.",
    federal:
      "Long eave runs, often with a plain or hidden gutter detail that is part of the facade. Where the house is under historic review, a half-round profile or a built-in gutter may be required rather than modern K-style, and copper is common. Built-in gutters lined with membrane are specialty work and a contractor who has not done one should not start on yours.",
    victorian:
      "Complex roofline, many corners, and frequently decorative brackets the gutter has to work around. Every corner is a mitre and every mitre is a potential leak, so the count of corners drives both price and reliability. Seamless gutter formed on site handles the long runs; the corners are where the workmanship shows. Half-round is more appropriate visually on a Victorian and costs more.",
    cape:
      "Low eave, short runs, and the smallest gutter job in this housing stock, commonly 120 to 160 linear feet. The low eave is also why ice dams on a cape back up so quickly: there is very little distance between the warm wall and the cold overhang. Gutters do not cause ice dams and gutter guards do not prevent them, and anyone selling that connection is selling the wrong product. The fix is in the attic.",
    ranch:
      "Long low runs over a shallow roof, which is the most forgiving gutter setup available and the easiest to service. Five-inch is usually adequate given the shallow pitch and modest plane size. The item to check is discharge: ranches often sit on a slab or shallow crawl, and a downspout emptying two feet from the foundation is a wet-basement problem waiting to happen.",
    "split-level":
      "Gutter runs at two different heights, with the lower roof frequently discharging near where the upper wall meets it. That junction needs a kick-out flashing, and without one the gutter is irrelevant because the water is already behind the siding. Otherwise the runs are straightforward.",
    farmhouse:
      "Main block plus ell means several separate runs at different heights, and the ell roof frequently discharges onto or against the main block. Where that happens, the upper downspout should carry past the lower roof rather than emptying onto it. Total linear footage is often larger than expected, commonly 200 to 280 feet across the whole building.",
    "coastal-cottage":
      "Aluminium in salt air holds up well, but the fasteners and the hanger hardware are where corrosion starts. Stainless hardware is the specification. Wind is the other factor: a gutter on an exposed coastal elevation needs hangers at a tighter spacing than the standard 36 inches, or it works loose over a few seasons of onshore wind.",
    "shingle-style":
      "Complex roofline with many planes and corners, frequently with copper originally. Mixing aluminium into a copper system causes galvanic corrosion at the junction, so it is copper throughout or aluminium throughout, not both. The corner count drives the price the same way it does on a Victorian.",
    "tudor-stone":
      "Copper or half-round is usually original and usually correct. Copper costs several times aluminium and lasts several times as long, and on a stone house with copper flashing already in place, matching it is the right call both visually and to avoid galvanic problems where dissimilar metals meet.",
    antique:
      "Many genuinely old houses were built without gutters at all, relying on a deep overhang and a drip line. Adding gutter to one is a decision, not a default, and where the fascia is original it means fastening into 200-year-old wood. Where the goal is keeping water off the foundation, regrading and a drip-edge detail sometimes solve the problem without putting hardware on the house.",
  },

  /* --------------------------------------------------------------- ENTRY DOORS */
  "entry-doors": {
    "triple-decker":
      "Three entries, usually a front door plus a rear door on each unit, and rarely a standard size among them. On a three-decker the doors take heavy traffic from multiple households, which argues for a solid unit and commercial-grade hardware rather than the cheapest option. Jambs on a building that has settled for a century are out of plumb, so a pre-hung unit has to be shimmed and set rather than dropped in.",
    "mill-housing":
      "Non-standard openings and jambs that have moved with the building. A replacement door in mill housing is almost always a custom size or a standard slab in a rebuilt frame, and the labour is in the frame rather than the door. Where the granite step has worn to a slope, the threshold detail needs attention or the new door will channel water inward.",
    colonial:
      "The jamb is rarely plumb and the opening is rarely a current standard size. A quote that assumes a stock 36 by 80 pre-hung unit drops straight in has not looked at the house. The usual outcome is either a custom unit or a stock slab fitted to a rebuilt frame. Where there is a granite step, check its pitch: many have settled to slope toward the house, and that is a water problem the door cannot solve.",
    federal:
      "A Federal entry is a composition: door, transom above, sidelights either side, and pilasters or a surround. Replacing the door alone without addressing the surround usually looks wrong. Under historic review the panel configuration and often the hardware need approval. A six-panel door in the correct proportion, painted rather than stained, is the typical approved answer.",
    victorian:
      "Tall openings, frequently 84 or 90 inches rather than 80, with a decorative surround and often a glazed upper panel. Height alone pushes most Victorian entries into custom territory. Where the original door survives, restoring it and adding weatherstripping and a storm door usually outperforms replacement, both on cost and on how the house reads from the street.",
    cape:
      "Standard opening in most cases, with a low header that occasionally rules out a taller unit. This is the most straightforward entry door replacement in this housing stock, usually a single day. A storm door makes more difference on a cape than on most houses, because the entry is typically shallow with little shelter over it.",
    ranch:
      "Standard 36-inch opening, plywood sheathing, and a simple stoop. Straightforward replacement, and a good candidate for a fiberglass unit with a half-light, which handles the exposure a shallow stoop gives it. The entry door is the single highest-recouping project in the ROI table at roughly 92 percent, and on a ranch it is also one of the cheapest.",
    "split-level":
      "The entry sits at a landing between levels, which means the door opens onto a short run of stairs going both up and down. That geometry limits how far the door can swing and sometimes rules out an inswing unit at full width. Measure the landing before choosing the configuration.",
    farmhouse:
      "Out of plumb jambs, a wide sill, and frequently two or three entries of different vintages. The front door on a farmhouse is often ceremonial while the ell door takes all the actual traffic, which is worth accounting for when deciding where the money goes. Rot at the bottom of the jamb is common on the weather side and is carpentry rather than door work.",
    "coastal-cottage":
      "Salt air destroys a steel door from the bottom edge up, usually starting within five years. Steel is the wrong material within a mile of open water regardless of the price difference. Fiberglass handles the exposure and takes a wood-grain finish; wood works if the finish is maintained on a real schedule. Hardware should be stainless or solid brass, not plated.",
    "shingle-style":
      "Wide entries, often sheltered under a deep porch, and frequently oversized or paired doors. The shelter helps: a protected entry lets a wood door last decades longer than an exposed one. Sizing is rarely standard, so expect a custom unit and a longer lead time.",
    "tudor-stone":
      "An arched or plank door in a masonry opening, usually with heavy strap hardware. The opening is stone or brick rather than framed wood, so the replacement is fitted to masonry, which is a different trade from a standard pre-hung install. Matching the arch profile is the hard part and the reason these are almost always custom.",
    antique:
      "The existing door may be older than the country and worth keeping. On a genuinely early house, restoration plus weatherstripping plus a well-fitted storm door gets most of the performance of a replacement while keeping material that cannot be bought. Where replacement is required, the opening will be non-standard and out of square, and the jamb work is the majority of the job.",
  },

  /* ---------------------------------------------------------- BATHROOM REMODEL */
  "bathroom-remodeling": {
    "triple-decker":
      "The standard bathroom in a three-decker is 5 by 8 feet, one per unit, stacked vertically so all three share a waste stack. That stack is usually cast iron, and if it is being opened on one floor it is worth considering on all three, because the access will never be this easy again. Cast iron adds roughly 1,600 dollars to a bathroom where the waste has to be cut and transitioned. Whether the plumbing moves is the single largest cost variable in any bathroom, and in a stacked building moving it is harder than usual.",
    "mill-housing":
      "Small footprint, frequently a bathroom carved out of a bedroom in the 1920s, with plumbing routed through chases that were never meant to carry it. Cast iron waste and sometimes galvanised supply, which is a 2,400 dollar item when it has to come out. The floor framing under an old bathroom is often compromised from a long-term slow leak, and that repair precedes everything else.",
    colonial:
      "Plaster and lath walls, cast iron waste, and a bathroom that was added to the house rather than designed into it, usually taking space from a hallway or a bedroom. Plaster demolition is slower and dirtier than drywall and the debris volume is higher. The recurring surprise is the floor: a bathroom over an unheated space or with a long-standing leak frequently needs framing repair before tile can go down.",
    federal:
      "Plaster on lath, tight chases, and a house where the original construction assumed no plumbing at all. Every supply and waste run was added later, often badly. Where the house is under historic review, exterior changes such as a new vent stack penetration may need approval, though interior work usually does not. Expect to find at least one thing behind the plaster that was not in the plan.",
    victorian:
      "Frequently a converted room with a high ceiling and a large footprint by the standards of this housing stock, which makes a full remodel more expensive than a 5 by 8 but also gives room for a proper walk-in shower without moving walls. Cast iron waste is standard. Original tile and fixtures, where they survive, are sometimes worth more than what would replace them.",
    cape:
      "The 5 by 8 bathroom is the defining footprint of a postwar cape, and it is exactly the size where a tub to shower conversion makes the most difference. That conversion runs 5 to 9 working days and lands in the range this market supports for the work. Upstairs baths in a cape sit under a sloped ceiling against a knee wall, which limits where a shower head can go and sometimes rules out a standard enclosure.",
    ranch:
      "Single level on a slab or shallow crawl, which cuts both ways. There is no floor below to work from, so plumbing changes in a slab house mean cutting concrete, which is why moving fixtures costs what it does. Where the house is on a crawl space, access is straightforward and a layout change is much cheaper. Establish which one you have before pricing a new layout.",
    "split-level":
      "The main bath usually sits over a half level rather than over living space, which makes access to the plumbing better than average. Standard postwar sizing and construction otherwise. The half-level layout means material handling is easier than in a full two-story house.",
    farmhouse:
      "The bathroom was added, often into a former pantry or the end of an ell, with long supply and waste runs back to the original stack. Long runs are the cost: relocating a fixture in a farmhouse bathroom often means a longer pipe run than the same move in a compact house. Floors are frequently out of level by an inch or more across the room, which matters for tile and for a curbless shower.",
    "coastal-cottage":
      "Many cottages were built for summer use, which means the plumbing was never designed for freezing conditions and the walls around it are frequently uninsulated. A remodel is the moment to fix both. Where the house is used seasonally, the drain-down details matter as much as the finishes. Salt air is hard on plated fixtures and hardware; solid brass or stainless outlasts chrome plate here.",
    "shingle-style":
      "Larger bathrooms than the regional norm, frequently with original fixtures and tile worth assessing before demolition. The larger footprint means the finish selection drives the budget more than the layout does. Older tile set over a mud bed is heavy and slow to remove, and the substrate underneath usually needs rebuilding.",
    "tudor-stone":
      "Plaster walls, tile over a mortar bed, and sometimes an exterior wall of solid masonry with no cavity to run pipe through. That last item is the constraint: plumbing cannot be routed through a stone exterior wall, so the layout has to work with interior walls only. Establish which walls are masonry before drawing a new layout.",
    antique:
      "Hand-hewn framing, plaster on split lath, and floors that are not level anywhere. A bathroom in a genuinely early house is entirely an addition to the original building, so every run was retrofitted and the quality varies. Expect the unexpected behind the plaster and price an allowance rather than a fixed number for what is found.",
  },

  /* ----------------------------------------------------------- KITCHEN REMODEL */
  "kitchen-remodeling": {
    "triple-decker":
      "Compact galley kitchens, usually 8 by 10 or smaller, one per unit. The wall between the kitchen and the next room is frequently carrying the floor above it, which matters because opening up a galley is the single most requested change and the one most likely to need a beam. Getting that assessed before design rather than after is the difference between a plan and a wish. Cabinet runs are short, so the cost lands in appliances, counters, and any structural work.",
    "mill-housing":
      "Small kitchens with tight chases and original layouts that assumed an icebox and a coal stove. Plumbing and electrical both need bringing forward, and the panel in a house of this age is frequently undersized for a modern kitchen load. Budget for a service upgrade as a real possibility rather than a surprise.",
    colonial:
      "There is usually a chimney chase in or near the kitchen, and it is masonry running from the basement to the roof, so it does not move. Good kitchen design in a colonial works around it, and cabinets built to the chase frequently look better than a layout that pretends it is not there. The other constraint is that interior walls in a pre-1900 colonial are often structural, so removing one needs a beam and a proper bearing path to the foundation.",
    federal:
      "Plaster on lath, a substantial chimney mass, and original trim worth protecting during demolition. The kitchen in a Federal house was usually a separate service room, sometimes in an ell, and the layout reflects that. Opening it to the rest of the house is possible but frequently involves a structural wall and always involves deciding how much original fabric to lose.",
    victorian:
      "The kitchen was at the back, often in a later addition, with a pantry alongside. That pantry is the most useful thing in the plan: converting it into storage or a prep area usually delivers more than pushing into a structural wall. Ceilings are high, so upper cabinets can run taller than standard and the room takes a large amount of trim work.",
    cape:
      "Compact kitchen with a low ceiling, commonly 7 feet 6 inches upstairs and 8 feet on the main floor. The low ceiling rules out some upper cabinet configurations and makes lighting design matter more than usual. The wall between the kitchen and the dining room in a postwar cape is frequently non-structural, which makes opening it up one of the cheaper high-impact changes available in this housing stock.",
    ranch:
      "Open plan potential is the advantage: ranch framing usually carries the load on the exterior walls and one central bearing line, so there is often one wall that can come out with a beam and several that can come out without one. Slab construction is the constraint, since moving a sink or a dishwasher on a slab means cutting concrete. Establish slab or crawl before designing a new layout.",
    "split-level":
      "The kitchen sits on the upper level, usually adjacent to the dining area with a half wall or a full wall between them. That wall is often non-structural, which makes opening it up straightforward. Material handling up a half flight is easier than a full flight, so labour runs slightly below a comparable two-story house.",
    farmhouse:
      "The kitchen is in the ell, floors are out of level, and the ceiling height frequently changes between the main block and the ell. Cabinets have to be scribed to floors and walls that are not true, which is slower work than a square room and is a real line item. The upside is space: farmhouse kitchens are often large enough for an island without moving a wall.",
    "coastal-cottage":
      "Compact kitchens built for seasonal use, frequently with minimal insulation in the exterior walls and plumbing that was never meant to run in winter. A remodel is the moment to address both. Salt air is hard on appliance finishes and on plated hardware, and cabinetry needs to tolerate humidity swings that an inland house never sees.",
    "shingle-style":
      "Large kitchens, often with a service wing or butler's pantry alongside, and ceiling heights that take a full-height cabinet run. The scale means cabinetry dominates the budget. Original service spaces are frequently the best opportunity in the plan, since converting a pantry costs far less than expanding into structure.",
    "tudor-stone":
      "Plaster walls, sometimes a solid masonry exterior wall with no cavity, and original detail worth keeping. The masonry wall is the planning constraint: plumbing and wiring cannot run through it, so the layout works off interior walls. Ceiling and trim detail in these houses is substantial and protecting it during demolition takes real time.",
    antique:
      "Hand-hewn framing, a massive central chimney, and floors that slope. The chimney is the organising feature of the plan whether or not that was intended, and working with it produces a better kitchen than fighting it. Every cabinet run needs scribing. Structural changes in a house this old need someone who understands the framing system, because the load paths are not what a modern eye expects.",
  },
};

/**
 * The passage for a city's dominant stock, falling back through its other stock
 * types. Returns null only if the service has no passage for any stock the city
 * has, which the copy layer handles by omitting the section rather than
 * printing something generic.
 */
export function stockServicePassage(
  serviceSlug: string,
  stock: StockFlag[]
): { flag: StockFlag; text: string } | null {
  const table = STOCK_SERVICE[serviceSlug];
  if (!table) return null;
  for (const flag of stock) {
    const text = table[flag];
    if (text) return { flag, text };
  }
  return null;
}
