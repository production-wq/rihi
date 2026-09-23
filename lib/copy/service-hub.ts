/**
 * service-hub.ts
 *
 * Long-form copy for the seven statewide service hubs.
 *
 * CLAUDE.md section 11 sets a 900 word floor and names what has to be covered:
 * what the service involves, how it differs across New England building stock
 * with named examples, materials and options with real trade-offs including
 * cost differences, what drives price in this market, timeline, and six to
 * eight FAQs answering real questions.
 *
 * Word counts are floors, not targets. Padding to hit one produces exactly the
 * thin content this project exists to beat, so these are written to the point
 * where they stop being useful and then stopped.
 *
 * Voice rules from docs/competitors.md apply to every string: open with a fact
 * rather than the brand, put a number in every section, write the mechanism
 * rather than the drama, stay neutral because there is no product line to
 * defend, and never claim a licence, insurance, crews, or a track record.
 */

import type { Faq } from "../schema";

export interface HubSection {
  heading: string;
  body: string[];
}

export interface ServiceHubCopy {
  /** Opens the page. States something true about the reader's situation. */
  lede: string;
  sections: HubSection[];
  /** The specific detail that goes in the meta description. */
  metaDetail: string;
  faqs: Faq[];
}

export const SERVICE_HUB: Record<string, ServiceHubCopy> = {
  /* ================================================================ ROOFING */
  roofing: {
    lede: "Most roof leaks in this region are not shingle failures. They are flashing failures at a chimney, a valley, a sidewall, or a vent boot, and they happen on roofs with years of life left. Knowing which problem you have is the difference between a 900 dollar repair and a 20,000 dollar replacement.",
    metaDetail:
      "Ice and water shield six feet up from the eave, board sheathing on pre-1950 decks, real cost ranges",
    sections: [
      {
        heading: "What a replacement actually involves here",
        body: [
          "A full tear-off removes the existing shingle down to the deck, replaces any sheathing that has failed, and rebuilds the roof as a system: ice and water shield at the eaves and in the valleys, synthetic underlayment over the field, drip edge, flashing at every penetration, shingle, and ridge venting. Every one of those layers has a failure mode, and the cheap version of the job is usually cheap because one of them was skipped.",
          "The item that moves the number most on older housing is what is under the shingle. On anything built before roughly 1950 the sheathing is typically board rather than plywood, laid with gaps, and after a century of movement some of those boards are split, cupped, or rotted at the eave. You cannot see that from the ground and neither can the person quoting. A quote that carries a written deck allowance, something like 20 percent of the area at a stated dollar rate per square foot, is a quote from someone who has done this before. A quote with no deck line is a change order waiting to happen on day two.",
          "Ice and water shield is not optional in this climate. It is a self-adhering membrane that seals around the nails driven through it, and it is the only thing standing between a backed-up ice dam and your ceiling. It should run at least six feet up from the eave, further on a low-eave cape or anywhere with a history of staining on the ceiling below, and it belongs in every valley and around every chimney regardless of what the minimum says.",
        ],
      },
      {
        heading: "The same roof job, four different houses",
        body: [
          "On a Providence or Worcester triple-decker, the main roof is rarely the problem. The leak is over the rear ell or the back porch stack, where the pitch drops below what asphalt shingle can handle and somebody shingled it anyway. That section needs EPDM or modified bitumen and a proper transition where it meets the main plane. Price the two areas separately, because a bid covering only the pitched roof has not covered the part that is leaking.",
          "On a postwar cape in Warwick or East Providence, the eave sits seven or eight feet off the ground and the ice dam risk concentrates in that short run. The fix is almost entirely in the attic: air sealing the ceiling plane, getting insulation to a real depth, and balancing soffit intake against ridge exhaust. A new roof over an unchanged attic gets you a new roof and the same ice dams next February.",
          "On a Victorian, you are not buying one roof. You are buying a main plane at 10:12 or steeper plus turret, dormer, porch, and bay sections, and every junction between them is a valley or a sidewall. Count the planes before comparing quotes, because a bid assuming three planes and a bid assuming seven are not comparable numbers.",
          "On a coastal cottage in Westerly, Narragansett, or down the Connecticut shoreline, the fastener matters more than the shingle. Electro-galvanised nails corrode in salt air and the shingle stays put until the nail head fails, at which point a section lifts in one piece during a nor'easter. Stainless or hot-dipped galvanised costs very little more across a whole roof.",
        ],
      },
      {
        heading: "Materials, and what the difference actually buys",
        body: [
          "Architectural asphalt is the regional default and deserves to be. It runs roughly 5.25 to 7.50 dollars a square foot installed, carries a 110 to 130 mph wind rating, and lasts 25 to 30 years. Three-tab, at 4.00 to 5.50, saves maybe 15 percent and gives up ten years of life and half the wind rating. That trade rarely makes sense, and three-tab is barely specified now outside of rental turnover.",
          "Premium architectural at 7.00 to 9.50 buys a heavier mat, a 130 mph rating, and 30 to 40 years. Worth it on a steep roof you do not want to stage again, or in an exposed coastal location. Not worth it on a low ranch roof you can reach from a ladder.",
          "Standing seam metal runs 14.00 to 20.00, lasts 50 years or more, holds a 140 mph rating, and sheds snow well, which matters on a roof that sits under a persistent ice dam. The cost is roughly three times asphalt, so it makes sense as a permanent decision on a house you are keeping, not as a value play.",
          "Synthetic slate at 18.00 to 26.00 is usually a historic district answer. It reads correctly on a Federal or a stone colonial where architectural asphalt looks wrong, and it is far more likely to be approved than asphalt where there is design review. Real slate repair is specialty work and replacing a slate roof with asphalt on a house framed for slate is usually a mistake, both visually and structurally.",
          "EPDM at 7.50 to 11.00 is not an alternative to any of the above. It is the correct material for the low-slope sections that show up constantly in this region: rear ells, porch and piazza roofs, dormer tops, and additions. Most urban New England roof leaks start on one of those.",
        ],
      },
      {
        heading: "What drives the price",
        body: [
          "Five things, roughly in order. Surface area, which is footprint multiplied by a pitch factor, so a 10:12 roof carries about 40 percent more material than its footprint suggests. Pitch itself, because anything above 7:12 needs staging rather than a ladder. Deck condition, which is the unknown. Complexity, meaning the count of planes, valleys, dormers, and penetrations. And layers, since tearing off two layers instead of one adds roughly a dollar a square foot in labour and disposal.",
          "Geography moves it too. The same roof costs noticeably more in Fairfield County or Greater Boston than in the Blackstone Valley or the Pioneer Valley, and on Block Island or Nantucket the material transport surcharge is real. Our roofing calculator applies those adjustments so you can see the number for your town rather than a national average.",
        ],
      },
      {
        heading: "How long it takes",
        body: [
          "A simple gable roof on a ranch or a cape is one to two days. A typical colonial with a few valleys and a chimney is two to four. A triple-decker with a rear ell and staging constraints is four to seven. A complex Victorian with multiple planes can run a week or more. Weather adds days, and no honest contractor opens a roof they cannot dry in before the next rain.",
          "Permits are pulled by the contractor at the municipal building department, and inspection is against the state building code. That process is routine almost everywhere in the region and rarely drives the schedule. What does drive it, on a house under historic review, is approval of the material and sometimes the colour, which can add four to eight weeks before anything is ordered.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I repair or replace?",
        answer:
          "If the shingle is intact and the leak traces to a flashing detail at a chimney, valley, sidewall, or vent boot, repair. A roof with eight good years left and one bad chimney flashing does not need replacing, and anyone telling you otherwise is selling a roof. Replace when the shingle is curling or losing granules across the field, when there are multiple leaks in unrelated locations, or when the deck itself is failing.",
      },
      {
        question: "What is an ice dam and why does my roof get one?",
        answer:
          "Heat escaping into the attic melts the snowpack on the roof above it. The meltwater runs down to the cold overhang past the heated part of the house, refreezes there, and builds a dam. Water then backs up behind that dam and pushes up under the shingles, which are designed to shed water running down, not to hold water sitting still. It is an insulation and ventilation problem that presents as a roof problem, and a new roof alone will not fix it.",
      },
      {
        question: "Do gutter guards prevent ice dams?",
        answer:
          "No. Gutters do not cause ice dams and guards do not prevent them. The dam forms on the roof surface at the cold eave, above the gutter, and would form there if the gutter were removed entirely. Anyone selling guards on that basis is selling the wrong product for the problem. Air sealing, insulation, and balanced ventilation are the fix.",
      },
      {
        question: "How much does a roof replacement cost in this market?",
        answer:
          "For a typical single family with an 1,800 square foot footprint and architectural asphalt, the range across these three states runs roughly 11,000 to 24,000 dollars before adjusting for region and housing stock. A pre-1940 house adds around 8 percent for deck risk, a historic district adds more, and Fairfield County and Greater Boston sit well above the regional midpoint. The roofing calculator produces a figure for your town and your roof.",
      },
      {
        question: "What is board sheathing and why does it matter?",
        answer:
          "Before plywood became standard around 1950, roof decks were built from individual boards laid across the rafters with gaps between them. Those boards split, cup, and rot at the eave over a century. You cannot assess them until the old shingle is off, which is why a deck allowance belongs in the quote rather than in a conversation on the second morning.",
      },
      {
        question: "Can I put a new roof over the old one?",
        answer:
          "Most codes allow two layers total. It saves roughly 15 percent on the job by avoiding tear-off and disposal. It also means nobody inspects the deck, the second layer traps heat and shortens the life of both, and the eventual tear-off costs more. On anything older than about 1950 it is usually a false economy, because the deck is exactly what needed looking at.",
      },
      {
        question: "What wind rating do I need near the coast?",
        answer:
          "Within a mile of open water, a 110 mph architectural shingle is the practical floor and 130 is better. Wind uplift almost always starts at a rake edge or a ridge and works inward, so the edge details and the starter course matter as much as the rating on the bundle. Stainless or hot-dipped fasteners belong in the same specification.",
      },
      {
        question: "Do I need a permit?",
        answer:
          "Yes, for a replacement. Your contractor pulls it at the municipal building department and the work is inspected against the state building code. In a local historic district, material and sometimes colour need approval before anything is ordered, which is a separate process and can add four to eight weeks.",
      },
    ],
  },

  /* ================================================================ WINDOWS */
  windows: {
    lede: "A cape has 12 to 16 window openings. A triple-decker has 40 to 60 across three floors. Those are not the same project, they do not price the same way per opening, and a quote built from a count rather than a measure is a guess on housing this old.",
    metaDetail:
      "Insert versus full frame, weight-and-pulley sash, historic district profiles, per-opening costs",
    sections: [
      {
        heading: "Insert or full frame, which is the real decision",
        body: [
          "An insert window fits inside the existing frame. The old sash and the weights come out, the new unit goes into the opening that remains, and the interior and exterior trim stay untouched. It costs less, installs faster, and it loses one to two inches of glass on each dimension because the new frame sits inside the old one.",
          "A full-frame replacement takes everything back to the rough opening. It costs more and takes longer, and it lets the installer see and fix rot at the sill, flash the opening properly, and insulate the cavity. On a house with weight-and-pulley sash, that cavity is the point: the weight pockets on either side of every window are open voids running the full height of the frame, and they have been venting heat since the house was built. Insert windows leave them exactly as they are.",
          "The honest answer is that it depends on what you are buying. If the goal is comfort and energy on a pre-1940 house, full frame does something insert cannot. If the interior trim is original and worth keeping, insert is usually right even though it performs slightly worse. On a triple-decker with 50 openings, price both ways before deciding, because at that count the difference is a five-figure number either direction.",
        ],
      },
      {
        heading: "What your housing stock means for the job",
        body: [
          "Triple-deckers and mill housing carry weight-and-pulley sash in openings that were framed by eye. Every opening needs individual measurement. At 40 to 60 units the per-opening price dominates everything, so a 100 dollar difference is 5,000 dollars on the project.",
          "Older colonials and farmhouses run 12 to 25 openings in three or four different sizes, many out of square by half an inch or more, and sills on the weather side are frequently rotted. That repair is carpentry and should be a stated allowance rather than a discovery.",
          "Victorians have tall narrow openings, often 72 inches or more, sometimes with segmental arched heads and frequently a bay on the first floor. Height and shape push those units into custom pricing and longer lead times. Count them separately.",
          "Postwar ranches and split levels are the easy case: standard sizes, aluminium sliders or single-hungs, plywood sheathing. Better pricing, shorter lead times, and usually two to three days on site. The original aluminium frames are typically why the room is cold, because aluminium conducts heat straight through the wall.",
          "In a local historic district, the approved profile has to be settled before anything is ordered. Stock vinyl is rarely approved on a visible facade. Wood or wood-clad with a simulated divided light in the correct pattern is the usual outcome, and review can add four to eight weeks.",
        ],
      },
      {
        heading: "Materials and real numbers",
        body: [
          "Vinyl runs roughly 650 to 1,100 dollars a unit installed, lasts 20 to 30 years, and posts a U-factor around 0.27 to 0.32. It is the value answer and there is nothing wrong with it on a postwar house. It is rarely approved in a historic district and it cannot be refinished.",
          "Fiberglass at 900 to 1,500 lasts 30 to 50 years, holds a similar U-factor, and handles coastal exposure better than anything else in the price range. It expands and contracts at nearly the same rate as glass, which is why the seals last.",
          "Wood clad at 1,100 to 2,200 gives a wood interior with a protected exterior, and it is usually what gets approved under historic review. All wood at 1,200 to 2,400 lasts 40 to 60 years if the finish is maintained on a real schedule, and it will not last on the weather side without one.",
          "One thing worth saying plainly because nobody selling windows says it: if your existing windows are already double glazed and in sound condition, replacing them will not pay for itself on energy. The gain is 4 to 7 percent of heating load. There are good reasons to replace them anyway, including comfort, noise, condensation, and how they operate, but energy savings is not the honest argument.",
        ],
      },
      {
        heading: "What drives the price",
        body: [
          "Opening count first, then unit size, then material, then whether the job is insert or full frame, then anything non-standard. A bay, a bow, an arched head, or a grouped assembly acting as one unit each carry a premium and a longer lead time.",
          "Then geography. The same 16 window job costs meaningfully more in Fairfield County than in the Quiet Corner. Our cost tools apply the regional adjustment for your specific town.",
        ],
      },
      {
        heading: "How long it takes",
        body: [
          "A 12 to 16 opening cape or ranch is two to three days for insert work. The same house full frame is three to five. A 25 opening colonial runs four to seven days. A triple-decker at 50 openings is typically two to three weeks, and the staging on floors two and three is what sets that pace.",
          "Lead time is usually longer than installation. Stock vinyl sizes can arrive in two to three weeks. Custom sizes, wood clad units, and anything needing historic approval commonly run six to twelve weeks. Order timing, not install time, is what determines whether the job happens before winter.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it worth replacing windows that already have double glazing?",
        answer:
          "Not on energy alone. Moving from an older double pane to a modern one cuts heating load by roughly 4 to 7 percent, which rarely pays back within the life of the window. Comfort, noise, condensation between panes, failed seals, and windows that no longer open are all legitimate reasons to replace. Energy savings, by itself, is not.",
      },
      {
        question: "What are weight pockets and why do they matter?",
        answer:
          "In a pre-1940 double hung, the sash is counterbalanced by iron weights hanging on cords inside hollow pockets built into each side of the frame. Those pockets are open cavities running the height of the window with no insulation in them. They are a significant part of why old windows feel cold, and only a full-frame replacement lets an installer seal and insulate them.",
      },
      {
        question: "How much does window replacement cost here?",
        answer:
          "Installed per opening, vinyl runs roughly 650 to 1,100 dollars, fiberglass 900 to 1,500, and wood clad 1,100 to 2,200. A 12 to 20 opening house therefore lands somewhere around 9,000 to 24,000 dollars before adjusting for region and housing stock. A triple-decker at 40 to 60 openings is a different order of project entirely.",
      },
      {
        question: "Can I replace windows in a historic district?",
        answer:
          "Usually yes, but the profile needs approval before ordering. Commissions typically care about the muntin pattern, the sash proportion, the material, and sometimes the exterior colour. Wood or wood-clad with simulated divided lights in the original pattern is the common approved answer. Start the approval conversation before you sign a contract, not after.",
      },
      {
        question: "Should I repair my old windows instead?",
        answer:
          "On a genuinely early house, often yes. Restoring the sash, replacing the cords and glazing putty, weatherstripping the frame, and fitting a good exterior storm gets you most of the energy performance of replacement while keeping glass that cannot be bought back. It is not what a window company will tell you, and on a pre-1850 house it is frequently the right call.",
      },
      {
        question: "What time of year should this happen?",
        answer:
          "Installation happens year round, one opening at a time, so the house is never open for long. The real constraint is lead time: if you want the job done before heating season, ordering by late summer matters more than the install date. Spring and early summer are the least busy windows for scheduling.",
      },
      {
        question: "What does U-factor mean?",
        answer:
          "It measures how fast heat passes through the whole assembly, so lower is better. Modern double pane units land around 0.25 to 0.32. Single pane with no storm is roughly 1.0, which is why a room with old windows and no storms feels cold no matter how high the thermostat goes.",
      },
    ],
  },

  /* ================================================================= SIDING */
  siding: {
    lede: "What is behind the siding usually matters more than what goes over it. On most pre-1940 housing in this region the wall cavity is empty, there is no housewrap, and the sheathing is board. A re-side is the one moment in the life of the house when fixing all three is cheap.",
    metaDetail:
      "Fiber cement holds paint 12 to 15 years in coastal exposure where vinyl fades, real per square foot numbers",
    sections: [
      {
        heading: "The job under the job",
        body: [
          "Stripping the old cladding exposes the sheathing, the cavity, and every place water has been getting in. That is the opportunity. Blowing dense-pack insulation into an empty cavity while the wall is open costs a fraction of doing it as a standalone job later, and on a pre-1940 house it is usually the single largest comfort improvement available. Housewrap and proper flashing at windows and doors go on at the same time.",
          "The rot is predictable and worth pricing before it is found. It concentrates at the bottom course where the wall meets the foundation, at the corner boards, and under any window with a failed sill. That work is carpentry, not siding, and it belongs in the quote as an allowance with a unit rate.",
        ],
      },
      {
        heading: "Materials, with the trade-offs stated honestly",
        body: [
          "Vinyl runs 4.50 to 8.00 dollars a square foot installed, lasts 25 to 40 years, and needs nothing done to it. It fades in full southern exposure and it cannot be repainted to fix that. It is rarely approved in a historic district. On a postwar ranch or cape it is a perfectly defensible answer and roughly half the installed cost of fiber cement.",
          "Fiber cement at 9.50 to 16.00 lasts 40 to 60 years and holds paint 12 to 15 years even in coastal exposure, which is where vinyl fades fastest. It is heavy, it needs careful cutting, and the installation quality matters more than with vinyl. If you are staying in the house twenty years, the lifetime cost frequently comes out lower than vinyl despite costing twice as much up front.",
          "Cedar shingle at 11.00 to 19.00 is the regional answer on the coast for good reason. It moves with humidity, weathers to grey rather than failing, and handles salt air better than almost anything. It either gets stained every 5 to 8 years or is left alone to weather, and both are legitimate choices. Cedar clapboard at 10.00 to 17.00 needs repainting every 5 to 8 years, which is a real recurring cost to put in the model.",
          "Engineered wood at 7.50 to 12.50 sits between vinyl and fiber cement, lasts 25 to 35 years, and needs repainting every 8 to 12. It handles coastal exposure less well than either cedar or fiber cement.",
          "Because this is a referral service rather than a contractor with a product line to defend, here is the neutral version: vinyl wins on upfront cost, fiber cement usually wins on lifetime cost if you are staying, cedar wins on coastal durability and appearance, and in a historic district the decision is frequently made for you.",
        ],
      },
      {
        heading: "What your housing stock changes",
        body: [
          "A three-decker carries 2,800 to 4,000 square feet of wall across three stories with narrow side yards, which makes staging a genuine cost driver rather than a detail. A cape carries 1,200 to 1,800 square feet with simple geometry and is the least expensive re-side in this housing stock. A farmhouse with a main block and an ell frequently totals 2,200 to 3,200 and meets a stone foundation on an irregular line that needs a proper water table detail.",
          "On a Victorian, the trim is the house. Brackets, frieze boards, window heads, and shingle courses in the gable are what make it read correctly, and covering them is what makes a re-sided Victorian look wrong. Price it as siding plus trim restoration and expect the trim to be a large share of the labour.",
          "On a colonial, match the existing exposure. A four inch clapboard exposure replaced with a seven inch panel reads wrong from the street even when the material is good.",
        ],
      },
      {
        heading: "What drives the price",
        body: [
          "Wall area first, then material, then the condition of what is underneath, then access. A three-story building with eight feet to the neighbour costs more per square foot to stage than a ranch with open yard on all sides. Trim detail and the number of corners, windows, and doors to work around all add labour that square footage alone does not capture.",
          "Coastal exposure adds roughly 6 percent for upgraded fasteners and materials. Within a mile of open water, stainless fasteners are the specification, not an upgrade.",
        ],
      },
      {
        heading: "How long it takes",
        body: [
          "A cape or a ranch is four to seven working days. A colonial or a farmhouse runs seven to twelve. A three-decker is two to four weeks depending on staging and trim. Add insulation work and allow another one to three days, which is time well spent while the wall is open.",
          "Weather matters more here than on a roof, because the wall is exposed for longer and housewrap left open to driving rain is not doing its job. Most contractors sequence a re-side elevation by elevation for exactly that reason.",
        ],
      },
    ],
    faqs: [
      {
        question: "Vinyl or fiber cement?",
        answer:
          "Vinyl costs roughly half as much installed, lasts 25 to 40 years, and needs no repainting at all. Fiber cement lasts 40 to 60 years and holds paint 12 to 15 years even in coastal exposure where vinyl fades. If you are in the house under ten years, vinyl usually wins on the numbers. If you are staying, or you are within a mile of open water, fiber cement usually does.",
      },
      {
        question: "Should I insulate while the siding is off?",
        answer:
          "On a pre-1940 house with an empty cavity, almost always. Dense-pack cellulose or blown fiberglass into an open wall is a fraction of what the same work costs later through drilled holes, and it cuts heating load by roughly 10 to 16 percent. It is the best value decision available during a re-side.",
      },
      {
        question: "Can I put new siding over the old?",
        answer:
          "Physically yes, and some contractors will quote it that way because it is faster. It also means nobody looks at the sheathing, nobody finds the rot, the cavity stays empty, and the wall gets thicker than the window and door trim was built for. On anything older than about 1960 it is usually the wrong call.",
      },
      {
        question: "What does siding cost in this market?",
        answer:
          "For a typical 1,800 square feet of wall, vinyl lands around 8,000 to 14,000 dollars and fiber cement around 17,000 to 29,000 before regional adjustment. Cedar runs higher again. A three-decker with 3,500 square feet of wall is a substantially larger project than either figure suggests.",
      },
      {
        question: "Will vinyl be approved in my historic district?",
        answer:
          "Rarely on a visible facade. Most commissions in this region require clapboard or shingle in the original exposure, painted or stained. Fiber cement is sometimes approved, cedar usually is. Check with the local commission before you price the job, because the decision is frequently made for you.",
      },
      {
        question: "How does salt air affect the choice?",
        answer:
          "It attacks fasteners first, then finishes. Within a mile of open water, stainless fasteners are the specification regardless of cladding. Fiber cement and cedar both hold up well. Engineered wood does less well, and any steel component will show corrosion within a few seasons.",
      },
    ],
  },

  /* ==================================================== BATHROOM REMODELING */
  "bathroom-remodeling": {
    lede: "Whether the plumbing moves is the single largest cost variable in a bathroom remodel. Keeping the toilet, sink, and tub where they are can cut a project by a third, and in a house on a concrete slab the difference is larger still.",
    metaDetail:
      "A tub to shower conversion in a 5 by 8 runs 5 to 9 days, and cast iron waste adds a known number",
    sections: [
      {
        heading: "The projects people actually ask for",
        body: [
          "A tub to shower conversion is the most requested bathroom project in this region and the largest winnable search term in this whole market. In the standard 5 by 8 footprint that dominates postwar capes, ranches, and three-decker units, it typically takes 5 to 9 working days and lands around 9,500 dollars at the regional baseline before adjustment. The tub comes out, the drain is reworked, the walls are rebuilt with proper backer and waterproofing, and a low-threshold or curbless pan goes in.",
          "A full remodel keeping the existing layout runs 15 to 25 working days and roughly 21,000 dollars at baseline. The same remodel moving fixtures runs 25 to 40 days and roughly 34,000, and that gap is almost entirely the plumbing.",
          "An ADA accessible conversion, with a barrier-free entry, a linear drain, blocking for grab bars, and a 36 inch door, runs around 16,000 at baseline over 7 to 14 days. Doing the blocking now even if the grab bars come later costs almost nothing and saves opening the wall again.",
        ],
      },
      {
        heading: "What this housing stock puts behind the wall",
        body: [
          "Cast iron waste is standard in anything built before roughly 1960 in this region. It is not a defect and it does not need replacing on principle, but where it has to be cut and transitioned to PVC it adds roughly 1,600 dollars. Galvanised supply is a bigger item at around 2,400, and it is worth doing when found because galvanised pipe closes up with corrosion from the inside and you will not get the pressure back any other way.",
          "Plaster and lath is slower and dirtier to demolish than drywall and produces more debris, which shows up in both labour and disposal. Budget more demolition time on a pre-1940 house than a contractor used to newer construction might quote.",
          "In a three-decker the bathrooms stack vertically on a shared waste stack. If that stack is being opened on one floor, it is worth considering all three at once, because access will never be this good again.",
          "In a slab-on-grade ranch, moving a fixture means cutting and patching concrete. That is why the same layout change costs far more in a ranch than in a house over a basement or a crawl space. Establish which you have before designing anything.",
          "Under a cape's sloped upstairs ceiling, the knee wall limits where a shower head can go and sometimes rules out a standard enclosure entirely. Measure the headroom at the shower location before choosing fixtures.",
        ],
      },
      {
        heading: "Finish level, and where the money actually goes",
        body: [
          "Builder grade runs roughly 80 percent of mid-range. High end runs about 155 percent. That spread is tile, fixtures, vanity, and glass, and it is the easiest place to control the budget because none of it is structural.",
          "The things worth not economising on are the waterproofing behind the tile, the valve, and the exhaust fan. A cheap valve fails inside a finished wall. An undersized or unducted fan puts the moisture from every shower into the framing, which in this climate means mould in the bay above the ceiling. Neither is visible in the finished room, which is exactly why they get cut.",
        ],
      },
      {
        heading: "What drives the price",
        body: [
          "Project type first, then size, then whether plumbing moves, then finish level, then what is found behind the wall. A second floor bathroom adds a few hundred for material handling. A historic district adds nothing to a purely interior bathroom, since interior work is generally outside commission review, though a new vent stack penetration through the roof may not be.",
          "Regional adjustment is significant. The same bathroom costs roughly 30 percent more in Fairfield County than in the Pioneer Valley.",
        ],
      },
      {
        heading: "How long you are without the room",
        body: [
          "Tub to shower, 5 to 9 working days. Shower replacement, 4 to 8. Tub replacement, 3 to 7. Full remodel in the same layout, 15 to 25. Full remodel with a new layout, 25 to 40. Those are working days, so a 20 day project is about a month on the calendar.",
          "Timeline is frequently the deciding factor in a one-bathroom house and almost nobody in this market publishes it. If it is your only bathroom, ask the contractor to sequence the work so the toilet is back in service overnight, which is usually possible and rarely offered unless asked.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a tub to shower conversion cost?",
        answer:
          "Around 9,500 dollars at the regional baseline for a standard 5 by 8 bathroom, before adjusting for your town and your house. A pre-1940 house adds roughly 8 percent, cast iron waste that has to be cut adds about 1,600, and a high-end finish selection can push the total up by half again. Our bathroom calculator produces a figure for your specific situation.",
      },
      {
        question: "Why does moving the plumbing cost so much?",
        answer:
          "Because it means opening the floor to reroute waste lines, which have to maintain a consistent slope, and that slope has to fit within the available joist depth. In a house over a basement it is manageable. In a slab-on-grade ranch it means cutting concrete, rerouting, and repouring. Minor moves within the same wall run around 1,800 dollars. Relocating fixtures runs around 5,500 and up.",
      },
      {
        question: "What is cast iron waste and does it need replacing?",
        answer:
          "It is the drain pipe used in most housing here before roughly 1960. It lasts a long time and does not need replacing just because it is old. Where a remodel requires cutting into it and transitioning to PVC, that adds about 1,600 dollars. Galvanised supply pipe is the more urgent find, because it corrodes closed from the inside and costs around 2,400 to replace.",
      },
      {
        question: "How long will I be without the bathroom?",
        answer:
          "A tub to shower conversion is 5 to 9 working days. A full remodel in the same layout is 15 to 25. If it is your only bathroom, ask for the work to be sequenced so the toilet is usable overnight, which is usually achievable and rarely offered unless you raise it.",
      },
      {
        question: "Do I need a permit for a bathroom remodel?",
        answer:
          "For anything involving plumbing or electrical, yes. Your contractor pulls it at the municipal building department and the work is inspected against the state building code. A cosmetic refresh with no plumbing or wiring changes generally does not require one, though the threshold varies by municipality.",
      },
      {
        question: "Is a curbless shower possible in an older house?",
        answer:
          "Sometimes, and it depends entirely on the floor framing. A curbless pan needs the drain assembly to sit below the finished floor, which means either enough joist depth to recess it or raising the floor level in the room. In a house with 2x8 joists it is often not possible without structural work. Ask before designing around it.",
      },
    ],
  },

  /* ===================================================== KITCHEN REMODELING */
  "kitchen-remodeling": {
    lede: "In a house built before 1940, the wall you want to remove is often carrying the floor above it. Finding that out during design costs a structural assessment. Finding it out during demolition costs a change order and a week.",
    metaDetail:
      "Chimney chases that cannot move, load-bearing walls in pre-1940 framing, and real cost bands",
    sections: [
      {
        heading: "The three versions of this project",
        body: [
          "Cabinet refacing keeps the boxes and replaces the doors, drawer fronts, and visible surfaces. It works when the existing layout is fine and the cabinet boxes are sound, which on solid wood cabinetry from the 1950s they frequently are. It is the cheapest meaningful change available and it is over in days rather than weeks.",
          "A minor remodel keeps the footprint and the plumbing locations while replacing cabinets, counters, and appliances. It recoups roughly 81 percent at resale in this region, which is the highest of any kitchen project and higher than most home improvements of any kind.",
          "A major or upscale remodel moves walls, relocates plumbing, and rebuilds the room. It recoups roughly 54 and 40 percent respectively. That is worth knowing plainly: an upscale kitchen is a lifestyle decision, not an investment, and that is a perfectly good reason to do it if you are staying in the house.",
        ],
      },
      {
        heading: "What older framing does to the plan",
        body: [
          "In a pre-1900 colonial or farmhouse, interior walls are frequently structural and the load path runs down to a foundation point that may not be where you expect. Removing one needs a beam sized for the span and a bearing path all the way down. That is not a reason to abandon the idea, it is a reason to have it assessed before the design is finalised rather than after the cabinets are ordered.",
          "The chimney chase is the other fixed object. In a colonial or an antique house it is masonry running from the basement to the roof and it does not move. Designing cabinets around it usually produces a better kitchen than a plan that pretends it is not there.",
          "In a postwar cape the wall between the kitchen and the dining room is frequently non-structural, which makes opening it up one of the highest-impact and lowest-cost changes available in this housing stock. In a ranch, the load typically sits on the exterior walls and one central bearing line, so there is often one wall that needs a beam and several that do not.",
          "In a farmhouse the floors are out of level, frequently by an inch or more across the room, and every cabinet run has to be scribed. That is real labour and it belongs in the quote.",
          "One item that surprises people in older housing: the electrical panel. A modern kitchen load, with an induction range, a dishwasher, a disposal, a microwave, and dedicated small appliance circuits, frequently exceeds what a 100 amp panel in a 1920s house can carry. Budget for a service upgrade as a real possibility.",
        ],
      },
      {
        heading: "Where the budget goes",
        body: [
          "Cabinetry is typically 30 to 40 percent of a kitchen, appliances 15 to 20, counters 10 to 15, labour 20 to 25, and the rest is flooring, lighting, plumbing, and finish. Structural work, if any, sits on top of all of it.",
          "Counters are where the range is widest. Laminate, butcher block, quartz, and stone span a large multiple of each other, and the decision is almost entirely aesthetic and maintenance driven rather than functional. Honed stone marks, quartz does not, butcher block needs oiling and takes a knife mark that sands out.",
          "The neutral point, since there is no product line here to defend: a mid-range kitchen done well outperforms an upscale kitchen done badly at resale, and both outperform a kitchen where the money went into finishes while the layout stayed awkward.",
        ],
      },
      {
        heading: "What drives the price",
        body: [
          "Scope first, by a wide margin. Then cabinetry grade, then whether the layout changes, then whether plumbing or structure moves, then appliances. Regional adjustment applies as it does everywhere: the same kitchen costs substantially more in Greater Boston or Fairfield County than in Central Massachusetts or the Quiet Corner.",
        ],
      },
      {
        heading: "How long it takes",
        body: [
          "Refacing is three to five days. A minor remodel keeping the layout is three to five weeks. A major remodel with layout changes is eight to fourteen weeks, and a structural change or a service upgrade adds to that.",
          "Cabinet lead time is usually the critical path. Stock runs two to four weeks, semi-custom six to ten, and full custom ten to sixteen. Order timing determines the schedule far more than the on-site work does, and a kitchen that starts before the cabinets are confirmed is a kitchen that sits half finished.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is refacing worth it instead of new cabinets?",
        answer:
          "When the layout works and the boxes are sound, yes. Solid wood boxes from the 1940s through 1960s are frequently better built than what would replace them, and refacing costs a fraction of replacement while changing the whole appearance of the room. When the layout is the problem, refacing does not solve it and the money is better spent elsewhere.",
      },
      {
        question: "Can I remove the wall between the kitchen and the dining room?",
        answer:
          "Often, but it needs assessing first. In a postwar cape or ranch that wall is frequently non-structural. In a pre-1900 colonial it frequently is structural, and removing it means a properly sized beam with a bearing path down to the foundation. Have it assessed during design. Finding out during demolition is the expensive version.",
      },
      {
        question: "What does a kitchen remodel cost in this market?",
        answer:
          "Refacing and countertop work start around 8,000 to 15,000 dollars. A minor remodel keeping the footprint runs roughly 21,000 to 45,000. A major remodel moving walls and plumbing runs 50,000 to 90,000 and up, before regional adjustment. Greater Boston and Fairfield County sit well above those midpoints.",
      },
      {
        question: "Which kitchen project holds its value best?",
        answer:
          "A minor remodel, at roughly 81 percent recouped in this region. A major remodel recoups around 54 percent and an upscale one around 40. If resale is the goal, the minor remodel is the clear answer. If you are staying ten years, recoup matters much less than whether the room works.",
      },
      {
        question: "Do I need a permit?",
        answer:
          "Yes, for anything involving plumbing, electrical, or structural change, which is nearly every kitchen remodel. Your contractor pulls it at the municipal building department. Interior kitchen work is generally outside historic district review, though changes to windows or exterior openings are not.",
      },
      {
        question: "How long will I be without a kitchen?",
        answer:
          "Three to five weeks for a minor remodel, eight to fourteen for a major one. Ask the contractor to set up a temporary kitchen with the refrigerator, a microwave, and a sink somewhere accessible. Most will if asked, and it makes a significant difference over two months.",
      },
    ],
  },

  /* ============================================================ ENTRY DOORS */
  "entry-doors": {
    lede: "An entry door replacement recoups roughly 92 percent of its cost at resale, the highest of any project in this category. It is also the one most often done badly, because in an older house the opening is rarely standard and the jamb is rarely plumb.",
    metaDetail:
      "Fiberglass will not rot or warp, steel corrodes from the bottom edge in salt air, real installed costs",
    sections: [
      {
        heading: "Why the jamb is the job",
        body: [
          "A pre-hung door is a slab already hung in a new frame, and it drops neatly into a square, plumb opening. Older houses do not have those. A century of settlement means the opening is out of plumb, out of square, or both, and frequently not a current standard size. Setting a door in that opening means shimming, adjusting, and sometimes rebuilding the frame, and the labour in that is often larger than the cost of the door.",
          "That is why quotes vary so much on what looks like a simple job. A quote that assumes a stock 36 by 80 unit drops in has not looked at the house. Ask specifically whether the opening was measured and whether the price assumes frame work.",
          "The threshold and the sill are the other half. On a house with a granite step, check the pitch: many have settled to slope back toward the house, which channels water at the door no matter what door is in it. That is a masonry fix, not a door fix, and no new door will solve it.",
        ],
      },
      {
        heading: "Materials and what they do in this climate",
        body: [
          "Fiberglass runs roughly 1,800 to 4,000 dollars installed, lasts 30 to 50 years, will not rot, warp, or rust, and takes a convincing wood-grain finish. In coastal exposure it is the clear answer.",
          "Steel at 1,200 to 2,400 is the cheapest and it is the wrong choice near salt water. It corrodes from the bottom edge up, usually within about five years of coastal exposure, and any dent is permanent. Inland and under a sheltered entry it is perfectly serviceable for 20 to 30 years.",
          "Wood at 2,500 to 7,000 lasts anywhere from 30 years to a century depending entirely on whether the finish is maintained. It is what historic district commissions approve, it is what belongs on a Federal or Greek Revival entry, and it needs a storm door and a refinish every five to eight years to get there.",
          "A storm door adds roughly 400 to 900 installed and does more than people expect on a shallow, unsheltered entry, which describes most capes and ranches in this region. On a deep covered porch it adds less.",
        ],
      },
      {
        heading: "What the house asks for",
        body: [
          "A Federal entry is a composition of door, transom, sidelights, and surround, and replacing the door alone without addressing the rest usually looks wrong. A Victorian opening is often 84 or 90 inches rather than 80, which pushes it into custom territory on height alone. A three-decker has three entries taking traffic from three households, which argues for commercial-grade hardware.",
          "On a coastal cottage, the hardware specification matters as much as the door: plated finishes fail in salt air, and solid brass or stainless is the answer.",
          "Where the original door survives on an early house and is sound, restoration plus weatherstripping plus a well-fitted storm door usually beats replacement on both cost and appearance. A door made in 1820 from old-growth stock is better material than anything at any price today.",
        ],
      },
      {
        heading: "What drives the price",
        body: [
          "Material and size first, then whether the opening is standard, then glass, then hardware, then whether sidelights or a transom are involved. Anything non-standard is custom, and custom means a six to twelve week lead time rather than two.",
        ],
      },
      {
        heading: "How long it takes",
        body: [
          "A straightforward replacement into a sound standard opening is a single day. An opening needing frame rebuilding, rot repair at the sill, or new sidelights runs two to three days. The house is only open for a few hours in any case, which is why this is a comfortable project to do in cold weather.",
        ],
      },
    ],
    faqs: [
      {
        question: "Fiberglass or steel?",
        answer:
          "Fiberglass, in almost every case in this region. It costs roughly 50 percent more, lasts 30 to 50 years against 20 to 30, will not dent permanently, and does not corrode. Within a mile of open water, steel is simply the wrong material: the bottom edge corrodes within about five years regardless of the finish.",
      },
      {
        question: "How much does an entry door cost installed?",
        answer:
          "Steel runs roughly 1,200 to 2,400 dollars, fiberglass 1,800 to 4,000, and wood 2,500 to 7,000. Sidelights, a transom, or a non-standard opening push those higher. In an older house, frame work is frequently a larger share of the total than the door itself.",
      },
      {
        question: "Why is my quote so much higher than the price of the door?",
        answer:
          "Because in a house that has settled, the opening is rarely square or plumb and often not a standard size. Setting a door properly means shimming, adjusting, sometimes rebuilding the frame, and frequently repairing rot at the sill. That labour is the job. A quote that matches the retail price of the slab has not accounted for any of it.",
      },
      {
        question: "Is a storm door worth adding?",
        answer:
          "On a shallow, unsheltered entry, yes. It cuts wind-driven rain on the door, adds a modest thermal buffer, and extends the life of the finish, particularly on wood. Under a deep covered porch the benefit is smaller. Budget roughly 400 to 900 installed.",
      },
      {
        question: "Can I replace an entry door in a historic district?",
        answer:
          "Usually, with approval of the panel configuration, material, and sometimes the hardware and colour. A six panel wood door in the correct proportion, painted, is the typical approved answer. Fiberglass is sometimes approved where it is not on a prominent facade. Check with the commission before ordering.",
      },
      {
        question: "Does an entry door really recoup 92 percent?",
        answer:
          "That is the regional figure for a standard replacement, and it is the highest recoup rate of any project in this category. The reason is that it is the first thing anyone sees and the cost is low relative to the visual change. It is one of the few improvements that is genuinely defensible as an investment rather than a lifestyle choice.",
      },
    ],
  },

  /* ================================================================ GUTTERS */
  gutters: {
    lede: "Undersized five inch gutter on a large roof plane is the most common defect on older housing in this region. It does not leak, it overflows, and it does it only in heavy rain, which is why it goes unnoticed for years while the water goes into the foundation.",
    metaDetail:
      "Six inch over 700 square foot planes, seamless gutter formed on site, real per foot numbers",
    sections: [
      {
        heading: "Sizing, which is the part that gets ignored",
        body: [
          "Gutter capacity is a function of the trough size, the downspout count, and the roof area draining into it. A five inch K-style gutter handles a moderate plane on a shallow pitch. Put it under a 900 square foot plane at 9:12 and it overflows in a downpour no matter how clean it is, because the water arrives faster than the trough can carry it to a downspout.",
          "Six inch gutter with a 3 by 4 downspout carries roughly 40 percent more than five inch with a 2 by 3, and the cost difference is small. On any plane over about 700 square feet, or any steep roof, it is the right call. This single decision fixes more chronic wet-basement problems than any other gutter work.",
          "Downspout placement and discharge matter as much as the trough. A downspout emptying two feet from the foundation is putting the entire roof's water against the wall. Extensions, a splash block run well away from the house, or a tie-in to a drain are cheap and they are what the gutter is actually for.",
        ],
      },
      {
        heading: "Seamless gutters, and what they do and do not solve",
        body: [
          "Seamless gutter is roll-formed on site from a coil, so a 40 foot run is one continuous piece with no joints along its length. Joints are where sectional gutter leaks, so removing them removes the most common failure. It is the regional default and it is worth the small premium.",
          "What it does not remove is the corners. Every inside and outside corner is a mitre, and mitres are still joints. On a Victorian or a shingle-style house with a complex roofline, the corner count drives both the price and the reliability, and the workmanship at those corners is what separates a good install from a callback.",
          "Hanger spacing is the other quality marker. Standard is 36 inches. On an exposed coastal elevation or under a roof that carries heavy snow load, tighter spacing keeps the gutter from working loose over a few seasons.",
        ],
      },
      {
        heading: "Guards, honestly",
        body: [
          "Gutter guards work well under pine needles and moderate leaf load. Under heavy oak and maple leaf fall, which is most of this region, the better designs reduce cleaning frequency rather than eliminating it. Anyone promising you never clean them again is overselling.",
          "Guards do not prevent ice dams. This is worth stating plainly because it is the most common false claim in this category. An ice dam forms on the roof surface above the gutter and would form there if the gutter were removed entirely. The cause is heat escaping into the attic and the fix is air sealing, insulation, and balanced ventilation. A guard salesman who tells you otherwise is selling the wrong product for your problem.",
          "Guards also add weight and can make cleaning harder when they do clog, since the guard has to come off first. On a three story house where cleaning means a tall ladder, that trade is usually still worth it. On a single story ranch you can reach easily, often it is not.",
        ],
      },
      {
        heading: "What drives the price",
        body: [
          "Linear footage first, then trough size, then material, then the number of corners and downspouts, then height and access. A three-decker with short runs at three different heights costs more per foot than a ranch with one long run you can reach from a six foot ladder.",
          "Aluminium is the default. Copper costs several times as much and lasts several times as long, and on a house that already has copper flashing it is the correct choice, because mixing copper and aluminium in the same water path causes galvanic corrosion at the junction.",
        ],
      },
      {
        heading: "How long it takes",
        body: [
          "A typical single family with 150 to 200 linear feet is one day. A larger or more complex roofline runs one to two. Guards on an existing system are usually a same-day job. Nothing here is a multi-week project, and any quote suggesting otherwise deserves a question.",
        ],
      },
    ],
    faqs: [
      {
        question: "Five inch or six inch gutter?",
        answer:
          "Six inch on any roof plane over about 700 square feet, and on any steep roof regardless of area. Six inch with a 3 by 4 downspout carries roughly 40 percent more water than five inch with a 2 by 3, and the price difference is small. Undersized gutter on a large plane is the most common defect on older housing here.",
      },
      {
        question: "Do gutter guards stop ice dams?",
        answer:
          "No. The dam forms on the roof surface at the cold eave, above the gutter, and would form there with no gutter at all. Ice dams are caused by heat escaping into the attic and are fixed by air sealing, insulation, and balanced soffit-to-ridge ventilation. Any product sold as an ice dam solution on the basis of the gutter is being sold for the wrong problem.",
      },
      {
        question: "What does gutter installation cost?",
        answer:
          "Roughly 1,500 to 5,200 dollars for a typical house with about 180 linear feet of seamless aluminium gutter and downspouts, before regional adjustment. Copper runs several times that. Guards add roughly 8 to 20 dollars a linear foot depending on the type.",
      },
      {
        question: "Are gutter guards worth it under oak and maple?",
        answer:
          "They reduce how often you clean rather than eliminating it. Under heavy deciduous leaf fall, expect to still service them, and note that a clogged guard is harder to clear than an open gutter because the guard has to come off. On a three story house where cleaning means a tall ladder, the trade is usually worth it. On a reachable single story, often not.",
      },
      {
        question: "How often do gutters need cleaning here?",
        answer:
          "Twice a year under significant tree cover, once in late autumn after the leaves are down and once in spring. Under heavy oak, three times is realistic. A gutter that overflows only in heavy rain and is otherwise clear is usually undersized rather than clogged.",
      },
      {
        question: "Can gutters be installed in winter?",
        answer:
          "Yes. Aluminium is formed on site and installation does not depend on temperature the way sealant-heavy work does. The practical constraint is ice on the roof edge and safe ladder footing, not the material.",
      },
    ],
  },
};

/** Approximate word count of a hub's body copy, used by the content validator. */
export function hubWordCount(slug: string): number {
  const copy = SERVICE_HUB[slug];
  if (!copy) return 0;
  const text = [
    copy.lede,
    ...copy.sections.flatMap((s) => [s.heading, ...s.body]),
    ...copy.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
