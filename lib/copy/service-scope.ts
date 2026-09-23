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
}

export const SERVICE_SCOPE: Record<string, ServiceScope> = {
  roofing: {
    timeline:
      "A simple gable roof is one to two working days. A typical colonial with a few valleys and a chimney is two to four. A three-story building with staging constraints or a complex Victorian roofline runs four to seven or more. Weather adds days, and no honest contractor opens a roof they cannot dry in before the next rain.",
    quote:
      "Three things separate a real roofing quote from a number. A written deck allowance, stated as a percentage of area at a dollar rate per square foot, because nobody can see the sheathing until the old shingle is off. An itemised flashing scope naming the chimney, valleys, sidewalls, and vent boots, since that is where most leaks actually start. And the ice and water shield coverage in feet rather than as a checkbox.",
  },
  windows: {
    timeline:
      "A 12 to 16 opening house runs two to three working days for insert units and three to five for full frame. A 25 opening colonial is four to seven. A building with 40 to 60 openings across three floors is two to three weeks, and the staging above the first floor sets that pace. Lead time usually matters more than install time: stock sizes arrive in two to three weeks, custom and historic-approved units in six to twelve.",
    quote:
      "Ask whether every opening was measured individually or whether the price came off a count. On housing older than about 1940 the difference between those two quotes shows up on installation day. Ask whether it is insert or full frame, and what happens to the weight pockets. And get sill and trim repair priced as an allowance rather than discovered.",
  },
  siding: {
    timeline:
      "A cape or a ranch is four to seven working days. A colonial or a farmhouse is seven to twelve. A three-story building is two to four weeks depending on staging and trim detail. Add one to three days if insulation goes into the open wall, which is time worth spending.",
    quote:
      "The quote should say what happens to the wall once it is open: whether housewrap goes on, whether the cavity gets insulated, and how rot at the sill course and corner boards is priced. It should also state the exposure of the new cladding, because a four inch exposure replaced with a seven inch panel reads wrong from the street even when the material is good.",
  },
  gutters: {
    timeline:
      "A typical house with 150 to 200 linear feet is a single day. A complex roofline with many corners and downspouts runs one to two. Guards on an existing system are usually same-day. Nothing in this category is a multi-week project, and a quote suggesting otherwise deserves a question.",
    quote:
      "Ask for the trough size and the downspout count, not just the linear footage. Six inch gutter with a 3 by 4 downspout carries roughly 40 percent more than five inch with a 2 by 3, and undersized gutter on a large roof plane is the most common defect on older housing here. Ask where the water discharges, because a downspout emptying two feet from the foundation is the problem rather than the fix.",
  },
  "entry-doors": {
    timeline:
      "A straightforward replacement into a sound, standard opening is a single day. An opening needing frame rebuilding, rot repair at the sill, or new sidelights runs two to three. The house is only open for a few hours either way, which makes this a comfortable project to do in cold weather.",
    quote:
      "Ask whether the opening was measured and whether the price assumes frame work. In a house that has settled, the jamb is rarely plumb and the opening is often not a current standard size, and that labour is usually a larger share of the cost than the door itself. A quote close to the retail price of the slab has not accounted for any of it.",
  },
  "bathroom-remodeling": {
    timeline:
      "A tub to shower conversion is 5 to 9 working days. Shower replacement is 4 to 8, tub replacement 3 to 7. A full remodel keeping the layout is 15 to 25 working days, and moving fixtures pushes it to 25 to 40. Those are working days, so a 20 day project is roughly a month on the calendar.",
    quote:
      "The quote should state plainly whether plumbing moves, because that is the single largest cost variable. It should say what happens if cast iron waste or galvanised supply is found, since both are common in housing here and both carry a known number. And it should name the waterproofing method behind the tile, the valve, and the exhaust fan, which are the three things that get cut because they are invisible in the finished room.",
  },
  "kitchen-remodeling": {
    timeline:
      "Refacing is three to five working days. A minor remodel keeping the layout is three to five weeks. A major remodel moving walls or plumbing is eight to fourteen. Cabinet lead time is usually the critical path: stock runs two to four weeks, semi-custom six to ten, full custom ten to sixteen.",
    quote:
      "If a wall is coming out, the quote should say whether it is structural and what beam is specified. Finding that out during demolition is the expensive version. It should also address the electrical panel, because a modern kitchen load frequently exceeds what a 100 amp service in an older house can carry, and a service upgrade found mid-project is a bad surprise.",
  },
};
