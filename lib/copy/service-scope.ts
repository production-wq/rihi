/**
 * service-scope.ts
 *
 * Per-service scope, timeline, and quote guidance used on service x city pages.
 *
 * This is shared across cities by design. A roofing quote should be read the
 * same way in Cranston as in Coventry, and writing seven different explanations
 * of the same thing would be worse content rather than more unique content.
 *
 * The city-specific material on those pages comes from elsewhere: the
 * researched homeStyleNote, the stock combination, the computed cost band, the
 * permitting authority, the ZIP codes, and the nearby towns. See the header of
 * city-body.ts, and scripts/check-uniqueness.ts, which measures whether the
 * balance actually lands where it is supposed to.
 */

export interface ServiceScope {
  /** Working days, with what moves them. */
  timeline: string;
  /** What separates a real quote from a number on a page. */
  quote: string;
  /**
   * What actually moves the number on this trade, heaviest first.
   *
   * Rendered as a table on every service x city page. Ordered deliberately:
   * a homeowner comparing two quotes needs to know which line to look at
   * first, and every competitor in this market publishes nothing at all here.
   */
  drivers: Array<{ factor: string; effect: string; detail: string }>;
}

export const SERVICE_SCOPE: Record<string, ServiceScope> = {
  roofing: {
    timeline:
      "A simple gable roof is one to two working days. A typical colonial with a few valleys and a chimney is two to four. A three-story building with staging constraints or a complex Victorian roofline runs four to seven or more. Weather adds days, and no honest contractor opens a roof they cannot dry in before the next rain.",
    quote:
      "Three things separate a real roofing quote from a number. A written deck allowance, stated as a percentage of area at a dollar rate per square foot, because nobody can see the sheathing until the old shingle is off. An itemised flashing scope naming the chimney, valleys, sidewalls, and vent boots, since that is where most leaks actually start. And the ice and water shield coverage in feet rather than as a checkbox.",
    drivers: [
      {
        factor: "Surface area",
        effect: "Largest single factor",
        detail:
          "Footprint multiplied by a pitch factor. A 10:12 roof carries roughly 40 percent more material than its ground footprint suggests.",
      },
      {
        factor: "Deck condition",
        effect: "Up to 3.40 dollars per square foot",
        detail:
          "Unknown until the old shingle is off. On pre-1950 board sheathing some percentage almost always needs replacing.",
      },
      {
        factor: "Pitch and access",
        effect: "12 to 40 percent",
        detail:
          "Anything above 7:12 needs staging rather than a ladder, which is labour rather than material.",
      },
      {
        factor: "Plane count",
        effect: "10 to 22 percent",
        detail:
          "Every valley, dormer, and sidewall is a flashing detail. A bid assuming three planes and one assuming seven are not comparable.",
      },
      {
        factor: "Material",
        effect: "4.00 to 26.00 per square foot",
        detail:
          "Architectural asphalt is the regional default. Metal and synthetic slate are permanent decisions, not value plays.",
      },
      {
        factor: "Tear-off layers",
        effect: "Roughly 1.10 per square foot for a second layer",
        detail:
          "Two layers instead of one adds labour and disposal.",
      },
    ],
  },
  windows: {
    timeline:
      "A 12 to 16 opening house runs two to three working days for insert units and three to five for full frame. A 25 opening colonial is four to seven. A building with 40 to 60 openings across three floors is two to three weeks, and the staging above the first floor sets that pace. Lead time usually matters more than install time: stock sizes arrive in two to three weeks, custom and historic-approved units in six to twelve.",
    quote:
      "Ask whether every opening was measured individually or whether the price came off a count. On housing older than about 1940 the difference between those two quotes shows up on installation day. Ask whether it is insert or full frame, and what happens to the weight pockets. And get sill and trim repair priced as an allowance rather than discovered.",
    drivers: [
      {
        factor: "Opening count",
        effect: "Largest single factor",
        detail:
          "A cape has 12 to 16. A triple decker has 40 to 60. At that count a 100 dollar unit difference is 5,000 dollars on the project.",
      },
      {
        factor: "Insert or full frame",
        effect: "25 to 40 percent",
        detail:
          "Full frame costs more and lets the installer insulate the weight pockets, which is where the heat has been leaving.",
      },
      {
        factor: "Material",
        effect: "650 to 2,400 dollars per unit",
        detail:
          "Vinyl through all wood. The spread per opening is wider than most homeowners expect.",
      },
      {
        factor: "Non-standard sizing",
        effect: "Custom pricing and 6 to 12 week lead time",
        detail:
          "Older openings are rarely a current standard size and are frequently out of square.",
      },
      {
        factor: "Historic approval",
        effect: "Plus 20 percent and 4 to 8 weeks",
        detail:
          "Profile and muntin pattern need approval before ordering. Stock vinyl is rarely approved on a visible facade.",
      },
      {
        factor: "Sill and trim repair",
        effect: "Allowance item",
        detail:
          "Rot on the weather side is carpentry, not window work, and belongs in the quote rather than in a conversation.",
      },
    ],
  },
  siding: {
    timeline:
      "A cape or a ranch is four to seven working days. A colonial or a farmhouse is seven to twelve. A three-story building is two to four weeks depending on staging and trim detail. Add one to three days if insulation goes into the open wall, which is time worth spending.",
    quote:
      "The quote should say what happens to the wall once it is open: whether housewrap goes on, whether the cavity gets insulated, and how rot at the sill course and corner boards is priced. It should also state the exposure of the new cladding, because a four inch exposure replaced with a seven inch panel reads wrong from the street even when the material is good.",
    drivers: [
      {
        factor: "Wall area",
        effect: "Largest single factor",
        detail:
          "A cape runs 1,200 to 1,800 square feet. A three-decker runs 2,800 to 4,000 across three stories.",
      },
      {
        factor: "Material",
        effect: "4.50 to 19.00 per square foot",
        detail:
          "Vinyl through cedar shingle. Roughly a four-fold spread on the same wall.",
      },
      {
        factor: "What is behind it",
        effect: "Allowance item",
        detail:
          "Rot concentrates at the sill course, the corner boards, and under failed window sills. That is carpentry.",
      },
      {
        factor: "Insulation while open",
        effect: "10 to 16 percent of heating load",
        detail:
          "A fraction of what the same work costs later through drilled holes. The best value decision available during a re-side.",
      },
      {
        factor: "Trim detail",
        effect: "Can be a third of the labour",
        detail:
          "On a Victorian the brackets and frieze boards are the house. Covering them is what makes a re-side look wrong.",
      },
      {
        factor: "Access and staging",
        effect: "Real labour cost",
        detail:
          "Three stories with eight feet to the neighbour is slower than an open suburban lot.",
      },
    ],
  },
  gutters: {
    timeline:
      "A typical house with 150 to 200 linear feet is a single day. A complex roofline with many corners and downspouts runs one to two. Guards on an existing system are usually same-day. Nothing in this category is a multi-week project, and a quote suggesting otherwise deserves a question.",
    quote:
      "Ask for the trough size and the downspout count, not just the linear footage. Six inch gutter with a 3 by 4 downspout carries roughly 40 percent more than five inch with a 2 by 3, and undersized gutter on a large roof plane is the most common defect on older housing here. Ask where the water discharges, because a downspout emptying two feet from the foundation is the problem rather than the fix.",
    drivers: [
      {
        factor: "Linear footage",
        effect: "Largest single factor",
        detail:
          "A typical house runs 150 to 200 feet. A farmhouse with an ell commonly runs 200 to 280.",
      },
      {
        factor: "Trough size",
        effect: "Roughly 40 percent more capacity for six inch",
        detail:
          "Six inch with a 3 by 4 downspout against five inch with a 2 by 3. Undersized gutter on a large plane is the most common defect on older housing here.",
      },
      {
        factor: "Corner count",
        effect: "Drives both price and reliability",
        detail:
          "Every inside and outside corner is a mitre, and mitres are the joints that leak.",
      },
      {
        factor: "Material",
        effect: "Aluminium through copper",
        detail:
          "Copper costs several times aluminium and lasts several times as long. Never mix the two in one water path.",
      },
      {
        factor: "Height and access",
        effect: "Real labour cost",
        detail:
          "Short runs at three different heights cost more per foot than one long reachable run.",
      },
      {
        factor: "Guards",
        effect: "8 to 20 dollars per linear foot",
        detail:
          "Reduce cleaning frequency under heavy leaf load rather than eliminating it.",
      },
    ],
  },
  "entry-doors": {
    timeline:
      "A straightforward replacement into a sound, standard opening is a single day. An opening needing frame rebuilding, rot repair at the sill, or new sidelights runs two to three. The house is only open for a few hours either way, which makes this a comfortable project to do in cold weather.",
    quote:
      "Ask whether the opening was measured and whether the price assumes frame work. In a house that has settled, the jamb is rarely plumb and the opening is often not a current standard size, and that labour is usually a larger share of the cost than the door itself. A quote close to the retail price of the slab has not accounted for any of it.",
    drivers: [
      {
        factor: "Material",
        effect: "1,200 to 7,000 dollars installed",
        detail:
          "Steel through wood. Steel is the wrong answer within a mile of open water.",
      },
      {
        factor: "Opening condition",
        effect: "Frequently larger than the door",
        detail:
          "In a settled house the jamb is not plumb and the opening is not a standard size. That labour is the job.",
      },
      {
        factor: "Sidelights and transom",
        effect: "Can double the unit cost",
        detail:
          "A Federal entry is a composition. Replacing the door alone usually looks wrong.",
      },
      {
        factor: "Non-standard sizing",
        effect: "Custom pricing and 6 to 12 week lead time",
        detail:
          "A Victorian opening is often 84 or 90 inches rather than 80.",
      },
      {
        factor: "Threshold and sill",
        effect: "Masonry item",
        detail:
          "A granite step settled to slope toward the house is a water problem no door will fix.",
      },
      {
        factor: "Storm door",
        effect: "400 to 900 installed",
        detail:
          "Worth it on a shallow unsheltered entry, less so under a deep porch.",
      },
    ],
  },
  "bathroom-remodeling": {
    timeline:
      "A tub to shower conversion is 5 to 9 working days. Shower replacement is 4 to 8, tub replacement 3 to 7. A full remodel keeping the layout is 15 to 25 working days, and moving fixtures pushes it to 25 to 40. Those are working days, so a 20 day project is roughly a month on the calendar.",
    quote:
      "The quote should state plainly whether plumbing moves, because that is the single largest cost variable. It should say what happens if cast iron waste or galvanised supply is found, since both are common in housing here and both carry a known number. And it should name the waterproofing method behind the tile, the valve, and the exhaust fan, which are the three things that get cut because they are invisible in the finished room.",
    drivers: [
      {
        factor: "Whether plumbing moves",
        effect: "Largest single factor",
        detail:
          "Nothing to roughly 5,500 dollars. In a slab-on-grade house it means cutting and repouring concrete.",
      },
      {
        factor: "Project type",
        effect: "6,500 to 34,000 dollars",
        detail:
          "Tub to shower conversion through a full remodel with a new layout.",
      },
      {
        factor: "Finish level",
        effect: "80 to 155 percent of mid-range",
        detail:
          "Tile, fixtures, vanity, and glass. The easiest place to control a budget because none of it is structural.",
      },
      {
        factor: "Waste and supply pipe",
        effect: "1,600 to 2,400 dollars",
        detail:
          "Cast iron waste is standard before about 1960 here. Galvanised supply is the more urgent find.",
      },
      {
        factor: "Bathroom size",
        effect: "85 to 165 percent of standard",
        detail:
          "The 5 by 8 footprint dominates postwar capes, ranches, and three-decker units.",
      },
      {
        factor: "What is under the floor",
        effect: "Allowance item",
        detail:
          "A long slow leak frequently means framing repair before tile can go down.",
      },
    ],
  },
  "kitchen-remodeling": {
    timeline:
      "Refacing is three to five working days. A minor remodel keeping the layout is three to five weeks. A major remodel moving walls or plumbing is eight to fourteen. Cabinet lead time is usually the critical path: stock runs two to four weeks, semi-custom six to ten, full custom ten to sixteen.",
    quote:
      "If a wall is coming out, the quote should say whether it is structural and what beam is specified. Finding that out during demolition is the expensive version. It should also address the electrical panel, because a modern kitchen load frequently exceeds what a 100 amp service in an older house can carry, and a service upgrade found mid-project is a bad surprise.",
    drivers: [
      {
        factor: "Scope",
        effect: "Largest single factor, by a wide margin",
        detail:
          "Refacing through a major remodel that moves walls. Roughly a five-fold spread.",
      },
      {
        factor: "Cabinetry grade",
        effect: "30 to 40 percent of the project",
        detail:
          "Stock through full custom, with lead times from two to sixteen weeks. Usually the critical path.",
      },
      {
        factor: "Structural change",
        effect: "Beam, bearing path, and engineering",
        detail:
          "In a pre-1900 house the wall you want out is frequently carrying the floor above it.",
      },
      {
        factor: "Electrical service",
        effect: "Possible panel upgrade",
        detail:
          "A modern kitchen load frequently exceeds what a 100 amp service in an older house can carry.",
      },
      {
        factor: "Whether plumbing moves",
        effect: "Significant",
        detail:
          "Relocating a sink in a slab house means cutting concrete. Over a basement it is routine.",
      },
      {
        factor: "Counters and appliances",
        effect: "25 to 35 percent combined",
        detail:
          "Largely an aesthetic and maintenance decision rather than a functional one.",
      },
    ],
  },
};
