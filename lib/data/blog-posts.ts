/**
 * blog-posts.ts
 *
 * Posts that ship with the repository, so the blog hub is never empty while the
 * Sanity pipeline is being connected. lib/sanity/client.ts merges these with
 * whatever Sanity returns. A Sanity post with the same slug wins.
 *
 * Every dollar figure in here is derived from lib/data/cost-data.ts, which is
 * itself a set of directional estimates for this market. None of them is a
 * quote and each post says so. No rebate amount, permit fee, or code section
 * number appears in any post, per CLAUDE.md section 8.
 *
 * Body format matches what the post template renders: blocks separated by a
 * blank line, "## " for a heading, and [text](/internal/path/) for an internal
 * link. Only internal links are rendered as links.
 *
 * Each entry corresponds to a topic in lib/data/blog-topics.ts, noted beside
 * it, and that topic is flagged published so the cron does not write it twice.
 */

import type { Post } from "../sanity/client";

export const LOCAL_POSTS: Post[] = [
  /* -------------------------------------------------------------------------
   * Topic 3
   * ---------------------------------------------------------------------- */
  {
    _id: "local-ice-dams",
    title: "Ice Dam Removal and Prevention: What Actually Causes Them",
    slug: "ice-dam-removal-and-prevention",
    excerpt:
      "An ice dam is an attic problem that shows up on the roof. Heat leaks upward, melts the snowpack, and the meltwater refreezes at the cold eave.",
    publishedAt: "2026-10-01T14:00:00.000Z",
    serviceSlugs: ["roofing", "gutters"],
    state: "ALL",
    category: "new-england",
    body: `An ice dam is an attic problem that shows up on the roof. The water stain on the bedroom ceiling and the wall of icicles over the front door are symptoms. The cause is heat leaking out of the living space and into the attic, and no amount of work on the shingles changes that.

## How an ice dam forms

Start with a roof that has eight inches of snow on it. The snow is a blanket. Under it, the roof deck is warmed from below by whatever heat is escaping through the attic floor: gaps around the chimney chase, the attic hatch, recessed lights, the top plates of interior walls, and bath fan ducts that were never sealed where they pass through.

That warmth melts the underside of the snowpack. The meltwater runs down the roof, following the slope, until it reaches the overhang. The overhang is past the exterior wall, so there is no heated space under it. It sits at outdoor temperature. The water freezes there.

Over a few days of this, the frozen edge grows into a ridge. Water that melts higher up now has nowhere to drain. It pools behind the ridge and sits against shingles that were designed to shed water running down, not to hold water standing still. Shingles overlap by a couple of inches. Standing water will find the overlap, run up under the course above, and come through the roof deck and into the ceiling below.

That is the whole mechanism. Heat, snow, a cold edge. If you remember one thing, remember that the ice dam is not caused by the gutter, and a new roof laid over an unchanged attic will form the same dam next February.

## Why older New England houses are worse

Three housing types account for most of the ice dam calls in this region.

**Capes and cape-style postwar houses.** A one and a half story house has knee walls, the short vertical walls under the slope on the upper floor. Behind a knee wall is a cold, awkward attic space that often has fiberglass batts pushed in loosely. The sloped section of ceiling has only the depth of the rafter for insulation, and that depth was often left half empty so there would be an air channel that never got built. Ice dams on a Cape tend to run the whole length of the eave.

**Center chimney colonials.** A big masonry chimney is a heat source running straight through the attic. Where the framing meets the masonry there is usually a gap, and warm air moves through it freely. Ice dams here often form in a patch on either side of the chimney rather than along the whole eave.

**Houses with converted attics and cathedral ceilings.** Anywhere a ceiling follows the rafters, there is very little room for insulation and ventilation to coexist. If someone finished an attic bedroom in 1985, the roof above it is the likeliest place for a dam on the whole house.

A Providence triple-decker behaves differently. Its main roof is a low pitch with a lot of surface area, and the rear ell is nearly flat. Ice and snow on the ell cause leaks, but the cause is usually drainage and ponding, not the freeze cycle at the eave. It is worth knowing which problem you have before you call anyone.

## What fixes it, in order of importance

**One: stop the air leaks into the attic.** Air sealing comes before insulation. The warm air that rises through a gap carries far more heat into the attic than the same area of uninsulated ceiling would conduct. Seal the attic hatch, the wire and pipe penetrations, the gaps around chimney framing with the right fire-rated material, and the tops of interior walls. This is cheap work and it is the part most people skip.

**Two: add insulation to the attic floor.** The recommended range for this climate zone runs from roughly R-49 to R-60. Many older houses in the region have R-11 to R-19, and plenty have less. Blown-in cellulose or fiberglass over a sealed attic floor is the usual approach. In an energy assessment, attic insulation is routinely the best return per dollar on an older house.

**Three: ventilate the roof edge to ridge.** The goal is a continuous path of outside air moving along the underside of the roof deck, entering at the soffits and leaving at the ridge. That keeps the deck cold, which is the opposite of what the melting process needs. Baffles at each rafter bay hold the insulation back so the air path stays open. Soffit vents that have been painted shut, or covered by blown-in insulation, are very common.

**Four: add ice and water shield at the eaves.** This is a self-adhering waterproof membrane laid under the shingles. It does not prevent the dam. What it does is stop the water that backs up from reaching the deck. On a roof replacement it is worth running it from the eave up past the exterior wall line, and many installers go further in the valleys and along low-slope sections. On a cold-roof problem that has been fixed at the attic, it is cheap insurance.

The order matters. If you do the fourth item and skip the first three, you have a roof that leaks less but still dams, and you will be back looking at the gutter in March.

## Removing an ice dam that is already there

Do not chip it. Hammers, shovels, and ice picks take the granules off the shingles and can crack them, especially at temperatures well below freezing. People fall off ladders doing this every winter, and it is not a job for a homeowner standing on a slick roof.

The standard professional method is low-pressure steam. It melts the dam without hammering anything. It is slower and more expensive than chipping and it is the right way to do it. Expect to pay for a minimum service call, and expect the cost to rise with the length of the eave and the height of the building.

For a leak that is already coming through, the immediate priority is the interior. Puncture the bulge in the ceiling to let the water drain into a bucket instead of letting it pool until the drywall collapses, and move whatever is below it.

Two things that can help in the short term, without fixing anything:

A roof rake from the ground takes snow off the lowest four feet or so of the roof. Without snow there is nothing to melt and refreeze. It is cheap, it works, and you should use a rake with a long handle rather than climbing.

Heat cables zig-zagged along the eave keep a channel open for meltwater. They cost money to run, and they treat the symptom. On a house with a chronic problem they are a patch, not a repair.

## Where gutters come into it

Gutters get blamed because the ice is visible there. The gutter is simply the first place the dam forms, since that is where the roof ends. A full gutter makes things slightly worse. Clean gutters will not prevent the dam. And no gutter guard prevents ice damming either, which is worth knowing before anyone sells you one on that basis. For more on that, see [do gutter guards actually work under New England leaf load](/blog/do-gutter-guards-work-new-england-leaf-load/).

If your gutters are pulling away from the fascia in winter, that is usually the weight of the ice, and the fascia behind may be rotted as well. Sort the attic first. Then replace the gutters once, rather than twice.

## What it costs

Costs are estimates for this market, not quotes.

Attic air sealing and insulation upgrades, steam removal, and a full roof replacement all sit in very different price bands, which is why the diagnosis matters. A full tear-off and replacement with architectural asphalt on an 1,800 square foot footprint runs roughly 11,000 to 24,000 dollars in Massachusetts before adjusting for your town and your house, and the price rises on older houses with board sheathing. Ice and water shield adds about 1.15 dollars per square foot in this site's calculator. The attic work is usually a fraction of the roof cost, and it is the part that decides whether the roof you buy keeps the water out.

You can run your own numbers with the [roofing cost calculator](/tools/roofing-cost-calculator/), which includes an ice and water shield option and an age-of-house adjustment.

## If you only do one thing

Go into the attic with a flashlight on a cold day with snow on the roof. Look for bare, melted patches on the roof edge from the street, and look from inside for daylight, frost, or flattened insulation near the chimney and hatch. If you can see where the air is moving, you have already done the most useful part of the diagnosis.

If the roof also needs replacement, read the [roofing guide for New England housing stock](/services/roofing/), and use the [state pages](/locations/) to find what applies where you live. If you want quotes from contractors who work in your town, the [free estimate form](/free-estimate/) is the next step. It carries no obligation.`,
  },

  /* -------------------------------------------------------------------------
   * Topic 2
   * ---------------------------------------------------------------------- */
  {
    _id: "local-tub-to-shower",
    title: "Tub to Shower Conversion Cost in New England",
    slug: "tub-to-shower-conversion-cost",
    excerpt:
      "A tub to shower conversion in a standard 5 by 8 bathroom takes 5 to 9 days. The price swings on the plumbing, the waste line, and the floor you are working on.",
    publishedAt: "2026-10-01T13:00:00.000Z",
    serviceSlugs: ["bathroom-remodeling"],
    state: "ALL",
    category: "cost-guide",
    body: `A tub to shower conversion in a standard 5 by 8 bathroom takes 5 to 9 days. The base cost is lower than most people expect. The final cost depends on three things that are hard to see from the doorway: whether the plumbing moves, what the waste line is made of, and what is behind the wall.

## What the project is

You take out the alcove tub and its surround, and put a shower in the same footprint. A 5 by 8 bathroom, 40 square feet of floor, is the standard in a postwar Cape, and the alcove tub is five feet long on the short wall. The shower that replaces it is roughly 60 inches by 32 inches.

The work is demolition, a new waterproofed shower base or pan, wall tile or panels, a glass panel or curtain rod, and a new valve and trim. If the existing tub is a cast iron unit, demolition takes extra time, because it has to be broken up in the room and carried out in pieces. A cast iron tub can weigh 300 pounds or more.

Most of the scope is in the wall. This is why it is useful to know what is behind it.

## The base cost, and the numbers that move it

Costs are estimates for this market, not quotes.

The starting point for a tub to shower conversion in a standard 5 by 8 bathroom, mid-range finishes, with the fixtures staying where they are, is roughly 9,500 dollars at a Massachusetts baseline. The timeline for that job is 5 to 9 working days.

From that baseline, these are the adjustments that apply most often:

**Bathroom size.** A bathroom under 40 square feet prices roughly 15 percent lower. A 60 to 100 square foot bathroom prices roughly 30 percent higher, mostly because there is more floor, more wall, and more tile.

**Finish level.** Builder-grade materials come in about 20 percent below mid-range. High-end tile, glass, and fixtures run roughly 55 percent above.

**Plumbing.** If the valve stays where it is, there is no adjustment. A minor move inside the same wall adds about 1,800 dollars. Relocating fixtures adds about 5,500 dollars, and it can add days.

**Waste line.** If the drain is cast iron, expect about 1,600 dollars on top, because the connection is harder to make. If the supply is galvanized pipe, it often has to be replaced, which adds about 2,400 dollars.

**Second floor.** A bathroom upstairs adds about 900 dollars, mostly for carrying material and debris and protecting the stairs.

Put those together and the range holds up. The same 5 by 8 bathroom with mid-range finishes and a minor plumbing move comes to about 11,300 dollars. With a full fixture relocation, a cast iron waste line, and a second floor location, the same job is closer to 17,500 dollars. On a typical project, the range runs from about 8,000 dollars at the bottom to about 16,000 dollars at the top, with the plumbing as the largest single swing.

## What this costs in your part of New England

Labor rates differ across the three states and inside each one. The calculator on this site uses a state factor of 1.0 for Massachusetts, 0.97 for Connecticut, and 0.94 for Rhode Island, and then a regional factor on top. That produces numbers like these for the same 9,500 dollar baseline job:

Central Massachusetts, the area around Worcester, applies a factor of 0.94, which puts the baseline at roughly 8,900 dollars.

Greater Boston applies 1.22, which puts it at roughly 11,600 dollars.

In Rhode Island, Providence Metro applies the state factor of 0.94 and a regional factor of 0.98, which brings the baseline to roughly 8,800 dollars.

In Connecticut, Fairfield County applies 0.97 and 1.28, which is where the baseline reaches roughly 11,800 dollars.

The numbers are a way of seeing the shape of the market, not a promise about any particular bid. A house built before 1940 adds around 8 percent, and a house built before 1900 adds around 14 percent, because every open wall holds a surprise.

## The surprises, and why they matter

Three things come up repeatedly in older housing in this region.

**Rot behind the old surround.** A fiberglass or tile surround hides the studs. Leaks at the valve, the tub spout, and the caulk line around the edge run water into the wall for years. When the surround comes off, the studs and subfloor at the tub end are sometimes soft. Replacing a few studs and a patch of subfloor is a modest job, but it has to be done before anything is waterproofed, and it is the most common reason a conversion runs a day or two over.

**Old plumbing.** Houses built between the 1920s and the 1960s often have galvanized supply pipe, which is corroded on the inside and restricts flow, and cast iron waste. A plumber working at the valve will tell you quickly whether the pipe is going to survive being moved. This is where the 2,400 and 1,600 dollar adjustments come from.

**A floor that is not level.** A shower pan needs a flat surface. In a house that has settled for a hundred years, the floor at the tub end is rarely flat. Leveling it takes time.

## Walk-in versus curb: a decision that affects the price

A low curb of four inches or less is the standard conversion. A true barrier-free walk-in shower, where the floor slopes to a linear drain with no curb at all, costs more, mostly because the floor has to be recessed. On a first floor over a crawlspace or basement that is feasible. On a second floor it usually means opening the ceiling below. The accessible conversion in the calculator carries a base of about 16,000 dollars and a timeline of 7 to 14 days.

## Is it worth doing?

For resale, a mid-range bathroom remodel in the Northeast recoups roughly 66 percent of its cost in the data used by the [ROI calculator](/tools/home-improvement-roi-calculator/). A tub to shower conversion in a house with a second full bathroom that still has a tub is a different case, since buyers with young children often want one. If the house has only one bathroom, take out the tub only if you are sure.

If you are staying in the house and a step-over tub has become a problem, there is no resale argument. Do it.

## How to compare bids

Ask each contractor to name the waste line material they expect and what they will do if the subfloor is soft. A bid that does not mention either is a bid that will change. Ask whether the price includes the waterproofing system, since a shower built without a proper membrane is a common reason a shower leaks inside the wall a few years later.

Ask whether a plumbing permit is pulled, and who pulls it. The requirement and the process vary by town, so check with your building department. Rhode Island, Massachusetts, and Connecticut each have their own state plumbing rules. If you are in Massachusetts, see the [Massachusetts page](/locations/massachusetts/) for how permitting works across the state.

## Next step

The [bathroom remodeling guide](/services/bathroom-remodeling/) covers every bathroom project type and what each one involves. If you are weighing a conversion against a full remodel, the sub-service pages break out the differences. And if you want quotes from contractors who work in your town, the [free estimate form](/free-estimate/) takes a couple of minutes and carries no obligation.`,
  },

  /* -------------------------------------------------------------------------
   * Topic 15
   * ---------------------------------------------------------------------- */
  {
    _id: "local-vinyl-vs-fiber-cement",
    title: "Vinyl vs Fiber Cement Siding in New England: The Honest Cost Comparison",
    slug: "vinyl-vs-fiber-cement-siding-new-england",
    excerpt:
      "Vinyl costs roughly half as much installed and never needs paint. Fiber cement lasts longer and handles salt air better. Which one wins depends on the house.",
    publishedAt: "2026-10-01T12:00:00.000Z",
    serviceSlugs: ["siding"],
    state: "ALL",
    category: "comparison",
    body: `Vinyl costs roughly half as much installed as fiber cement and never needs repainting. Fiber cement lasts longer, holds paint for 12 to 15 years in coastal exposure where vinyl fades, and gets approved more often in historic districts. Neither one is the right answer for every house. This is how to decide.

This site does not sell either product. It refers homeowners to contractors, so there is nothing to defend here, and the comparison below says so plainly where vinyl is the better choice.

## The installed cost, per square foot

Costs are estimates for this market, not quotes.

Vinyl runs 4.50 to 8.00 dollars per square foot installed, and lasts 25 to 40 years. Insulated vinyl, which has a foam backing, runs 7.00 to 11.00 dollars and lasts about the same. Fiber cement runs 9.50 to 16.00 dollars and lasts 40 to 60 years.

On a house with 1,800 square feet of wall, which is a typical two-story colonial, that works out to roughly 8,100 to 14,400 dollars for vinyl and 17,100 to 28,800 dollars for fiber cement. Whole-house siding projects in this market, including both materials and everything between them, run roughly 14,000 to 38,000 dollars.

## What the upkeep looks like

Vinyl needs nothing. You wash it. In full sun it fades over the years, particularly in dark colors, and it can crack in a hard impact in very cold weather. If a panel cracks it can be replaced, provided the color is still available and the old panels have not faded.

Fiber cement needs repainting. In a coastal exposure it holds paint for roughly 12 to 15 years. That sounds like a long time until you add the cost of repainting a whole house, and then it is an ongoing expense that vinyl does not have.

So the real comparison is not 17,000 versus 8,000 dollars. It is the up-front difference plus a repaint every dozen years or so, against a material that you install once and leave. Over a long ownership, vinyl can still come out cheaper. It does not always.

## Where fiber cement is the better choice

**Coastal exposure.** Salt-laden air, wind-driven rain, and repeated wetting are hard on every siding material. Fiber cement is rated excellent for coastal conditions, since it does not rot, does not warp, and does not rust. Vinyl is rated good: it will not corrode, but it can be loosened by wind. Along the Rhode Island and Massachusetts shore, and on the Connecticut shoreline, that difference counts. See [how salt air damages siding and fasteners](/blog/how-salt-air-damages-siding-and-fasteners/) for the mechanism.

**Historic districts.** Local historic district commissions in all three states review exterior changes on contributing structures. Vinyl is rarely approved. Fiber cement is sometimes approved, usually with a smooth profile and a specific reveal that matches the original clapboard. Cedar clapboard is usually approved, and is the safest choice if the house is inside a district. Check with the commission before ordering anything, since review runs separately from the building permit and takes weeks.

**Houses where the look matters.** A thick, crisp lap profile reads as paint on wood in a way that vinyl does not. On a Victorian with decorative shingles, or a Georgian with narrow clapboard, that matters. On a postwar ranch it often does not.

**Fire exposure.** Fiber cement does not burn. On a triple-decker in Worcester or Providence, where the next house is six or eight feet away, that is worth some thought.

## Where vinyl is the better choice

**Budget.** If the choice is vinyl now or nothing for another ten years, vinyl wins. Rotting wood underneath a failing paint job costs far more than a siding project.

**Postwar housing.** Capes and ranches from the 1940s through the 1960s, the bulk of the stock in Kent County, Rhode Island, and in the Naugatuck Valley in Connecticut, are not historic districts and have simple wall geometry. Vinyl suits them, and the savings are real.

**Insulated vinyl as an energy measure.** A foam-backed panel adds a little continuous insulation to the outside of the wall. It is not a substitute for insulating the wall cavity, and the energy benefit is modest, but on a house where the walls have no insulation at all, it helps.

**People who do not want to paint.** If the thought of repainting the house every dozen years is unwelcome, say so. There is nothing wrong with choosing the material that fits how you want to live.

## Two other materials worth pricing

Fiber cement and vinyl are not the only choices. Cedar shingle runs about 11.00 to 19.00 dollars per square foot installed, lasts 30 to 50 years, and is rated excellent in coastal exposure. Cedar clapboard runs about 10.00 to 17.00 dollars, and needs repainting every five to eight years. Engineered wood runs about 7.50 to 12.50 dollars, sits between vinyl and fiber cement on price, and needs repainting every 8 to 12 years, but it is rated only fair near salt water. If you are choosing between vinyl and fiber cement and neither feels right, cedar is the traditional answer on this housing stock, and it is the one most likely to be approved in a historic district.

## What matters more than the material

The siding material is a smaller decision than people think. Three other things decide whether the job lasts.

**What is under the old siding.** Many New England houses built before 1940 have board sheathing, not plywood. Boards shrink and move, and nails hold differently. Layers of old siding are not unusual in older mill housing, and some houses of that age carry asbestos cement shingles that should be tested before anyone disturbs them. Ask any contractor what they expect to find and what they will do about it.

**The weather barrier and flashing.** Siding is not waterproof. Water gets behind it, and the house wrap and the window flashing are what manage that. If the contractor is going to put new siding over old clapboard without opening anything up, they are hiding the problem, not solving it. A good bid includes new flashing at every window and door.

**Lead paint.** Houses built before 1978 may have lead paint on the original siding, trim, and windows. Federal rules require lead-safe work practices when disturbing painted surfaces on those houses. Ask any contractor you speak to how they handle it.

## A rough decision guide

If the house is in a historic district, the choice is probably made for you. Talk to the commission and consider cedar or an approved fiber cement profile.

If the house is within a mile of the water, choose fiber cement or cedar, and budget for repainting. A direct oceanfront exposure adds roughly 12 percent to the installed cost for the work itself, and within a mile adds about 6 percent.

If the house is a postwar Cape or ranch, inland, on a budget, vinyl is a perfectly sound answer.

If the house is a triple-decker, the wall area is large and the cost difference between the materials is large too. Get both priced, and ask about the fire separation and the upkeep over the next 20 years.

You can compare the numbers on your own house using the [material comparison tool](/tools/material-comparison-tool/), which accounts for exposure and lifespan.

## Next step

The [siding guide](/services/siding/) covers every material and the sub-service pages go into detail on each. If you are ready for prices, the [free estimate form](/free-estimate/) connects you with contractors who work in your town. Quotes are free and carry no obligation.`,
  },

  /* -------------------------------------------------------------------------
   * Topic 11
   * ---------------------------------------------------------------------- */
  {
    _id: "local-triple-decker-windows",
    title: "Triple Decker Window Replacement: What 40 to 60 Openings Actually Costs",
    slug: "triple-decker-window-replacement-cost",
    excerpt:
      "A triple-decker has 40 to 60 window openings across three floors, many with weight-and-pulley sashes. That is what drives the price, not the unit cost.",
    publishedAt: "2026-10-01T11:00:00.000Z",
    serviceSlugs: ["windows"],
    state: "ALL",
    category: "new-england",
    body: `A three-decker in Worcester, Providence, Lowell, or Pawtucket has 40 to 60 window openings across three floors. Most of them are double hung windows with weight-and-pulley sashes that were never meant to come out. That count is what drives the price, far more than the cost of any single window.

## Why the count is so high

Triple-deckers were built between roughly 1890 and 1925 as owner-occupied three-family housing. Each floor is a full apartment, with a front room, bedrooms, a kitchen, and a back porch. A typical floor has 13 to 20 openings, counting the bay windows at the front, the paired windows in the bedrooms, and the small windows in the bathrooms and stairwell. Three floors, and the total lands between 40 and 60.

Compare that to a single-family colonial, where the same job is 12 to 20 openings. A project that is routine on a suburban house becomes a major purchase on a triple-decker.

## The cost, opening by opening

Costs are estimates for this market, not quotes.

The unit costs used in this site's calculator, installed, for a standard double hung opening:

Vinyl runs 650 to 1,100 dollars per window, with a typical life of 20 to 30 years.

Fiberglass runs 900 to 1,500 dollars per window, with a typical life of 30 to 50 years.

Wood-clad runs 1,100 to 2,200 dollars per window, with a typical life of 30 to 50 years.

Multiply by the opening count and the shape of the project appears. Forty vinyl windows at the low end come to 26,000 dollars. Sixty at the top of the range come to 66,000 dollars. For fiberglass the span is 36,000 to 90,000 dollars. For wood-clad, 44,000 to 132,000 dollars. These are the totals before any adjustment for the house itself.

A triple-decker adds roughly 12 percent on top, since the work involves three floors of staging, access to rear porches, and in many cases working over a close neighbor. That puts the vinyl range at about 29,000 to 74,000 dollars. In Central Massachusetts, where the regional factor is 0.94, those numbers come down a little. In Greater Boston, at 1.22, they go up.

That is a wide range, and it is meant to be. The real number depends on how many windows there actually are, what shape they are in, and what material you pick for the front.

## You do not have to do all of them at once

This is the point most owners miss. A triple-decker's windows do not all need replacing at the same time, and the three floors may not need the same thing.

**Do the front elevation in a better material, and the sides and rear in vinyl.** The front is what people see. A wood-clad or fiberglass window with a decent profile on the street side, and vinyl on the rear and the side walls that face a neighbor, can bring the total down meaningfully.

**Do the worst floor first.** If the top floor is rented and the tenant is paying for heat, the energy case is strongest there. Heat rises, and the top floor loses the most through a roof and a set of old windows.

**Keep the storm windows on the ones you are not replacing.** An old double hung window with a good storm window over it performs better than most owners expect. The energy case for replacement is strongest for single pane glass with no storms. The estimated savings from replacing those windows are roughly 12 to 18 percent of heating costs. If the old windows already have storms, or if you are upgrading a window that is already double glazed, the gain is much smaller, roughly 4 to 7 percent. At that point it is a question of condition and comfort, not payback.

## The weight-and-pulley problem

Old double hung windows are held in balance by cast iron weights hanging in pockets inside the frame, connected to the sashes by cords over pulleys. When the cord breaks, the sash drops or sticks.

Replacing a sash with a modern balance system is simple on a house where the frame is sound. The decision is between two approaches.

**Insert replacement.** The new window goes inside the existing frame. The old sashes and the weights come out, the pockets are insulated, and the new unit fits inside. It is quicker, cheaper, and does not disturb the interior trim or the exterior casing. The cost is a slightly smaller glass area, since the new frame sits inside the old one.

**Full frame replacement.** The old window, including the frame, comes out down to the rough opening. It is the right call where the sill is rotted, the frame is out of square, or the old pockets are leaking air. It costs more, takes longer, and disturbs more trim.

Most of the time on a triple-decker, insert replacement is right for the majority of the openings, with a few full frame replacements where the sills have failed. A contractor who proposes full frame replacement on every opening, or insert on every opening without looking, has not looked at the house.

## Lead paint and the 1978 line

Houses built before 1978 may have lead paint on window sashes, frames, and casings. A triple-decker is almost certainly in that group. Federal rules require lead-safe work practices when a contractor disturbs painted surfaces in those houses, and window work is exactly the kind of work that disturbs them. Ask any contractor how they will contain dust, and ask who is responsible for cleanup.

If you are a landlord, or a young child lives in the building, each of the three states has its own lead rules for rental and child-occupied housing. Check the current requirements with the state health department before the work starts.

## How long it takes

A triple-decker at 50 openings is typically two to three weeks on site, and the staging on floors two and three is what sets the pace. A 12 to 16 opening Cape or ranch, by comparison, is two to three days for insert work. Add lead time for the order itself, since old openings are rarely a standard size and anything custom takes longer to arrive.

## Ask these questions in the quotes

How many openings did you count, and which floors? A bid with a count that does not match yours means somebody has not been through the whole house.

Which openings are insert and which are full frame? Get it in writing.

What is the plan for the pockets and the weights? Insulating the empty weight pockets is a modest job that makes a real difference to drafts.

How is lead handled? The answer should be specific.

What happens to the exterior trim? Many older houses have been wrapped in aluminum coil stock, and the trim underneath may not be in good condition.

## Where to go from here

The [window replacement guide](/services/windows/) covers each window type, materials, and what changes between a historic district and a postwar house. For the cost math on your own house, the [energy savings estimator](/tools/energy-savings-estimator/) shows what window work is likely to return, and the [material comparison tool](/tools/material-comparison-tool/) compares window types. If you are in the Worcester area, see the [Massachusetts page](/locations/massachusetts/), and for Providence and the Blackstone Valley, the [Rhode Island page](/locations/rhode-island/).

If you would rather get prices from contractors who work in your town, the [free estimate form](/free-estimate/) takes a few minutes. Quotes are free and carry no obligation.`,
  },

  /* -------------------------------------------------------------------------
   * Topic 12
   * ---------------------------------------------------------------------- */
  {
    _id: "local-salt-air",
    title: "How Salt Air Damages Siding and Fasteners on Coastal New England Homes",
    slug: "how-salt-air-damages-siding-and-fasteners",
    excerpt:
      "Salt air attacks the nail before it attacks the shingle. Electro-galvanized fasteners corrode in coastal exposure, and the failure usually comes in a nor'easter.",
    publishedAt: "2026-10-01T10:00:00.000Z",
    serviceSlugs: ["siding", "roofing"],
    state: "ALL",
    category: "new-england",
    body: `Salt air attacks the nail before it attacks anything you can see. On a coastal house, the shingle or the siding looks fine for years while the fasteners behind it corrode, and the failure usually comes all at once, in a nor'easter, when the wind finally pulls the nail head through a piece of material that stopped being held.

That is the mechanism. The rest of this is about where it matters, what to specify, and what the extra cost actually is.

## What salt does

Sea spray and wind-driven fog carry chloride in tiny droplets. They settle on every exterior surface within a mile or two of the water, and farther on a windy shoreline. Chloride accelerates corrosion in most common metals by breaking down the protective film that normally forms on the surface.

On a house, the metals that matter are the nails, screws, and staples that hold things on, the flashing, the gutters and hangers, and the hardware on doors and windows. Wood and cement products are affected too, but more slowly, and mostly through repeated wetting and drying.

Two things make this worse in New England specifically. The first is the freeze-thaw cycle. Moisture that gets into a corroded nail hole freezes and expands, widening the gap. The second is that coastal houses here often have shingle siding laid in many small pieces, each one held by a couple of fasteners, so there are thousands of nails on a wall and all of them are exposed.

## Fasteners, ranked

Three grades of fastener show up in a coastal job.

**Electro-galvanized.** A thin zinc coating applied by electroplating. It is the cheapest and the most common. In a salt environment it can fail within a few years, since the coating is thin, and nothing about it announces the failure until the nail is gone. A rust streak below a nail head is the first sign.

**Hot-dipped galvanized.** The nail is dipped in molten zinc, which gives a much thicker coating. It holds up far better in coastal conditions, and it is the usual specification for exposed work along the shore. It is a sound choice for most exposed work.

**Stainless steel.** The best performance. It does not rust in salt air. It costs more per fastener, but fasteners are a small share of a siding or roofing job, so the difference across a whole project is modest. Stainless is the specification on direct oceanfront houses and anywhere cedar will be left to weather, since the tannins in cedar can streak around coated nails.

On the roof, the same logic applies. Architectural asphalt shingles are fastened with roofing nails, and in coastal exposure along the entire South County shoreline in Rhode Island, Newport County, the Massachusetts South Shore and the Cape, and the Connecticut shoreline, stainless or hot-dipped galvanized nails are the specification rather than an upgrade.

Ask any contractor which fastener they are quoting. If the answer is vague, assume electro-galvanized.

## Dissimilar metals

Salt water is a good conductor, and when two different metals touch in it, one corrodes faster. Aluminum flashing against copper, or against untreated steel, is the usual problem. Gutters, flashing, and hangers on a shoreline house should be a consistent material, or isolated from each other. This is a small detail that can add years to a gutter system.

## How each siding material copes

The cost data behind this site rates each material for coastal use.

**Fiber cement:** excellent. It does not rot, warp, or rust. Paint is what takes the beating, and in coastal exposure it holds roughly 12 to 15 years.

**Cedar shingle:** excellent, with the right fasteners. This is the traditional material for the coast, and it has been used for centuries on the Cape and the islands for exactly that reason. It weathers to silver grey, needs no paint, and tolerates salt. The wood is fine. It is the nails that fail.

**Cedar clapboard:** good. It needs repainting every five to eight years in exposure.

**Vinyl:** good. It will not rust or rot, but wind can work panels loose, and the nail slots can wear.

**Engineered wood:** fair. The composite substrate is vulnerable if the edges are not sealed, and the repaint cycle is roughly 8 to 12 years.

You can compare these side by side in the [material comparison tool](/tools/material-comparison-tool/), and the [vinyl versus fiber cement guide](/blog/vinyl-vs-fiber-cement-siding-new-england/) goes through the trade-offs in more detail.

## What it adds to the cost

Costs are estimates for this market, not quotes.

The calculator on this site treats a house within a mile of the water as roughly 6 percent more expensive than an inland equivalent, and a direct oceanfront house as roughly 12 percent more. That is mostly the cost of better fasteners, more careful flashing, and more frequent maintenance allowances.

It is a modest premium. On a whole-house siding job priced at 25,000 dollars inland, it adds around 1,500 dollars within a mile of the shore and around 3,000 dollars on the oceanfront. For that, you lower the odds of doing the same job twice.

Block Island is a different case. Every board, every box of nails, and every crew crosses on a ferry, and the calculator applies roughly 30 percent on top for the island location. If you own a house on the island, plan for it.

## Housing types that suffer most

**Shingled cottages in Narragansett, Charlestown, Westerly, and Little Compton in Rhode Island.** Many were built as summer houses and lived in through the winter later. The shingle is cedar, the fasteners are often original or from a past re-shingling, and the exposure is direct.

**Capes on the Cape, and houses on the South Shore.** Cape Cod houses with cedar shingle siding and low eaves take wind from every side. Shingle replacement is common there, and it is the moment to switch to stainless.

**Victorian summer cottages in Newport and other shore towns.** These carry decorative trim, scrolled brackets, and complex roofs, with a lot of flashing and a lot of places for water to get in.

**Connecticut shoreline towns in New Haven, Middlesex, and New London counties.** Long Island Sound is less exposed than the open Atlantic, but salt still reaches the houses, and the fasteners on older homes are often the weak point.

## Permits near the shoreline

In Rhode Island, work close to the shoreline may fall under the Coastal Resources Management Council, which has jurisdiction over coastal construction. That covers a narrower set of projects than most owners expect, but it is worth confirming before work starts on an exposed lot. In all three states, the local building department issues the permit and inspects. Houses in a local historic district are reviewed separately, and the commission has its own timetable.

## Checking your own house

Walk the walls after a rainstorm. Look under the nail heads for rust streaks, particularly on cedar. Look at the trim at the corners. Look at the flashing above windows and where the roof meets the wall. A few streaks are an early warning, and you have time to plan. If shingles are lifting, or if you can pull one out by hand, the nails are gone.

## Next steps

The [siding guide](/services/siding/) and the [roofing guide](/services/roofing/) cover materials and costs across all three states. The [Rhode Island page](/locations/rhode-island/) and the [Massachusetts page](/locations/massachusetts/) go into the coastal housing in each region. If you want quotes from contractors who work in your town, the [free estimate form](/free-estimate/) carries no obligation.`,
  },

  /* -------------------------------------------------------------------------
   * Topic 8
   * ---------------------------------------------------------------------- */
  {
    _id: "local-gutter-guards",
    title: "Do Gutter Guards Actually Work Under New England Leaf Load",
    slug: "do-gutter-guards-work-new-england-leaf-load",
    excerpt:
      "Under heavy oak and maple leaf load, most guard types still need clearing. Micro-mesh performs best, and no guard prevents ice damming or removes maintenance.",
    publishedAt: "2026-10-01T09:00:00.000Z",
    serviceSlugs: ["gutters"],
    state: "ALL",
    category: "comparison",
    body: `Under heavy oak and maple leaf load, most gutter guards still need clearing. Micro-mesh performs best. No guard removes maintenance, and no guard prevents ice damming. The marketing claims in this category are the least reliable in home improvement, so it is worth knowing what each type does before spending money.

## What a guard is for

A guard sits over the gutter trough and lets water in while keeping debris out. The idea is that you stop climbing a ladder twice a year. The reality is that something still collects on top of the guard, or gets past it, and you still have to deal with it, only less often, if you chose well.

New England is a hard test for this. A mature lot with oaks and maples drops a lot of material. Maple leaves come down in October, flat and wet. Oak leaves fall later, often into November and sometimes hang on through the winter. In the spring, oak catkins drop in long strings. Pine needles, where there are pines, are thin enough to slip through most openings. Add the roof grit that washes off asphalt shingles and the seeds from maples, and the gutter collects more than almost any other region's.

## The main types

**Screens and perforated covers.** Sheets of metal or plastic with holes, set into or over the trough. They are cheap. The holes are large, and small debris, seeds, and grit pass through and settle in the gutter anyway. Leaves can sit flat across the top and block the openings.

**Reverse curve covers.** A solid hood curves over the front edge of the gutter. Water follows the curve and drops into a slot, while leaves slide off. They work well on a steep roof where water moves fast, and poorly in a heavy downpour, where water can shoot past the slot. On a low-slope roof they are less reliable, and in winter ice can form on the hood.

**Foam and brush inserts.** Cheap and easy to install, and they clog. Pine needles and seeds lodge in them, and they often need replacing within a few years.

**Micro-mesh.** A fine stainless steel mesh, framed in aluminum, stretched over the trough. The openings are small enough to stop most debris, including pine needles and shingle grit. It performs best in this region. It is the most expensive, and it still collects a mat of leaves on top, which dries and blows off in many cases but not all.

## What "maintenance-free" means in practice

On a lot with heavy oak and maple cover, expect to clear the surface of even a micro-mesh guard once or twice a year. A leaf blower or a soft brush on a long pole does it. It takes minutes, not hours, and you do not have to put your hands into wet leaf mold.

That is a real improvement over scooping a trough, and some owners find it worth the money. It is also not what the advertisements say.

## Guards and ice dams

Guards do not prevent ice dams. Ice dams form at the roof edge because heat escapes from the attic and melts snow, and the meltwater refreezes at the cold overhang. That has nothing to do with the gutter. If anyone sells a guard on the basis that it will stop ice damming, they are wrong. The [ice dam guide](/blog/ice-dam-removal-and-prevention/) covers what does work.

Guards can also interact badly with ice. Frozen meltwater can lift a guard, and a hood over the trough can form a solid ridge of ice along the edge. In heavy snow country, such as the Berkshires, the Northwest Hills in Connecticut, and northern Rhode Island, ask whether the product has been used through a winter at your elevation.

## Size the gutter first

The most common gutter defect on older New England houses is a 5 inch gutter on a roof plane too large for it. If the gutter overflows in a heavy rain, the problem is capacity, and a guard will make it worse, since it restricts the flow of water into the trough.

A 5 inch K-style gutter handles most roof planes. A 6 inch gutter is the right call on a large plane or a steep pitch, and the number of downspouts matters as much as the width. A long run with a single downspout at one end will overflow regardless of what is on top of it.

Before buying guards, watch the gutters during a hard rain. Where they overflow, fix the sizing and the downspout count. Then decide on the guards.

## Cost

Costs are estimates for this market, not quotes.

Installed seamless gutter, around 180 linear feet with downspouts, a typical size for a colonial, runs roughly 1,500 to 5,200 dollars. Guards are an additional cost, and the range is too wide to publish a number that would be useful. It depends on the type, the length, and the roof. Micro-mesh costs more per foot than a screen. Ask for the guard as a separate line on any quote, so you can see what you are paying for.

If the existing gutters are in poor shape, the sensible order is to replace the gutters first and add guards at the same time, because the guards fit the new gutters and the hangers are accessible.

## A cleaning routine that costs nothing

If you skip the guards, timing matters more than effort. Clear the gutters once after the maples are down, usually in late October, and again after the oaks, which can run into December. Do it before the ground freezes, so a full trough is not frozen solid for the winter. Check the downspouts by running a hose, because a clogged downspout looks like a clogged gutter. Look once more in late spring after the oak catkins drop. Three short visits a year keeps a standard gutter working, and it is also the moment to spot a sagging run or a loose hanger early.

## Who should buy them

**Buy them if** the house has a tall roofline and tall trees, if access is difficult, if the gutters are above a porch roof that is hard to reach, or if getting up a ladder is a risk for you. In those cases the cost of the guard is less than the cost of the service call.

**Skip them if** you are comfortable on a ladder, the gutters are within easy reach, and the lot has few trees. A cleaning in late fall and again in spring costs very little.

**Be careful if** the house has a history of ice damming. Fix the attic first. A guard will not hide the problem.

## Questions to ask a contractor

What is the guard made of, and what are the opening sizes?

Is it installed under the first course of shingles, or clipped to the gutter lip? Under the shingles, it can raise questions with the roof manufacturer. Ask.

What is the warranty on the guard, and who stands behind it? The contractor does, since this site does not warrant the work.

Have you seen this product through a New England winter?

## Next steps

The [gutter guide](/services/gutters/) covers installation, replacement, and guards, with the sizing and downspout rules that apply to older houses. The sub-service pages go into each. If you would rather get a price from contractors who work in your town, the [free estimate form](/free-estimate/) takes a few minutes, with no obligation.`,
  },
];
