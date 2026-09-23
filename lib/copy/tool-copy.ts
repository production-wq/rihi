/**
 * tool-copy.ts
 *
 * Explanatory copy that sits below each calculator.
 *
 * docs/tools-spec.md: "The explanatory copy is what makes the page rank; the
 * calculator is what makes it convert." So this is not filler under a widget.
 * It states how the calculation works, what it assumes, and what the tool
 * cannot know, which is also the honest thing to publish alongside a number.
 */

import type { Faq } from "../schema";

export interface ToolCopy {
  lede: string;
  how: string[];
  cannotKnow: string[];
  faqs: Faq[];
}

export const TOOL_COPY: Record<string, ToolCopy> = {
  "roofing-cost-calculator": {
    lede: "Enter the footprint, the pitch, and what is on the roof now. The figure adjusts for your town, the age of the house, and the condition of the deck, which is the part nobody can see until the old shingle comes off.",
    how: [
      "The footprint is multiplied by a pitch factor to get actual roof surface, because a 10:12 roof carries roughly 40 percent more material than its ground footprint suggests. That surface area is priced at the installed rate for the material selected, then adjusted for tear-off layers, deck repair, ice and water shield at the eaves, and roof complexity.",
      "Two geographic adjustments follow. A state labour multiplier, then a regional one keyed to your town, because the same roof costs substantially more in Fairfield County or Greater Boston than in the Blackstone Valley or the Pioneer Valley. Housing stock modifiers apply last: pre-1940 construction, a historic district, and coastal exposure each add a documented percentage.",
      "The output range is deliberately asymmetric, running from 15 percent below the calculated figure to 20 percent above. Roofing overruns more often than it underruns, because what is under the shingles is genuinely unknown until the tear-off.",
    ],
    cannotKnow: [
      "The actual condition of the sheathing, which is why the deck allowance is an input rather than a certainty",
      "Chimney condition, since a rebuild or a new crown is separate work that frequently comes up during a re-roof",
      "Whether the attic ventilation is adequate, which determines whether ice dams come back",
      "Access constraints on your specific lot, which move labour more than most people expect",
    ],
    faqs: [
      {
        question: "Why does the calculator ask for footprint rather than roof area?",
        answer:
          "Because you can measure a footprint and most people cannot measure a roof. The pitch selection converts one to the other. If you already know your roof surface area, enter a footprint that produces it: divide the surface by the pitch factor shown for your selection.",
      },
      {
        question: "Why is the deck allowance defaulted on for older houses?",
        answer:
          "Anything built before roughly 1950 has board sheathing rather than plywood, and after a century those boards split, cup, and rot at the eave. Some percentage almost always needs replacing. Defaulting it on produces a more honest number than discovering it on day two of the job.",
      },
      {
        question: "Is this a quote?",
        answer:
          "No. It is an estimate for this market based on typical scope. Actual pricing depends on your house, the access, and what turns up once work starts. Use it to know whether a quote you receive is in a sensible range, not as a number to hold a contractor to.",
      },
      {
        question: "Why does my town change the price?",
        answer:
          "Labour rates vary substantially across these three states, and the difference between the highest and lowest cost markets here is over 50 percent on the same work. The regional multiplier is applied from the town you select rather than from a single state average.",
      },
    ],
  },

  "bathroom-remodel-cost-calculator": {
    lede: "The plumbing question is the one that matters most. Keeping fixtures where they are can cut a bathroom project by a third, and in a slab-on-grade house the difference is larger still.",
    how: [
      "The project type sets a base figure, which is then scaled by bathroom size and finish level. Additions follow for plumbing relocation, waste and supply pipe replacement, and second floor access. Then the geographic adjustments apply, state first and region second, and the housing stock modifiers last.",
      "The timeline is drawn from typical scope rather than calculated, and it is given in working days. A 20 working day project is roughly a month on the calendar. Timeline is frequently the deciding factor in a one bathroom house and almost nobody in this market publishes it.",
    ],
    cannotKnow: [
      "What the floor framing under the bathroom looks like, which determines whether a curbless shower is possible",
      "Whether there is a slow leak that has already compromised the subfloor, which is common and is repaired before anything else",
      "Whether the house is on a slab or over a basement, which changes the cost of moving a fixture by thousands",
      "What is inside the wall, which in pre-1960 housing here is frequently cast iron and sometimes galvanised",
    ],
    faqs: [
      {
        question: "Why is a tub to shower conversion the default?",
        answer:
          "Because it is the most requested bathroom project in this region, and because the 5 by 8 footprint it usually happens in is the dominant bathroom size in postwar capes, ranches, and three-decker units across all three states.",
      },
      {
        question: "What does cast iron waste actually mean for the cost?",
        answer:
          "Cast iron drain pipe is standard in housing built here before roughly 1960. It does not need replacing because it is old. Where a remodel requires cutting into it and transitioning to PVC, that adds a known amount. Galvanised supply pipe is the more urgent find, because it corrodes closed from the inside.",
      },
      {
        question: "Does a historic district affect a bathroom?",
        answer:
          "Usually not, because interior work generally falls outside commission review. A new vent stack penetration through the roof can be a different matter. The toggle is here because some districts do review anything that changes the exterior envelope.",
      },
      {
        question: "Is this a quote?",
        answer:
          "No. It is an estimate for this market based on typical scope. A contractor has to see the room, and what is behind the wall in an older house is not knowable from a form.",
      },
    ],
  },

  "energy-savings-estimator": {
    lede: "Each upgrade is modelled as a percentage reduction in heating load, then converted to dollars against what you actually spend. Where a measure will not pay for itself, this says so.",
    how: [
      "Every measure carries a documented range for how much heating load it removes. Those ranges are applied against your annual heating spend, or against an estimate built from square footage, fuel type, and the age of the house when you leave the spend blank.",
      "Measures stack with diminishing returns. The first contributes at full value and each subsequent one at 80 percent of its standalone figure, because once the attic is insulated the windows have less to save. Total reduction is capped, because no envelope package eliminates heating load.",
      "A regional heating degree day factor is applied from your town. The Berkshires and the Northwest Hills run meaningfully colder than the Cape or coastal Rhode Island, and the same upgrade saves more where there are more heating days.",
      "One adjustment worth naming: if your windows are already double glazed, the model drops the window measure from the single pane figure to the much smaller realistic one. Replacing working double pane windows returns 4 to 7 percent, not 12 to 18.",
    ],
    cannotKnow: [
      "How leaky the house actually is, which a blower door test measures and a form cannot",
      "Whether the attic has adequate ventilation, which affects both comfort and ice dams",
      "What is genuinely in the wall cavity, since blown-in retrofits from the 1970s are common and vary in quality",
      "Your actual fuel price, which moves substantially year to year",
    ],
    faqs: [
      {
        question: "Why does attic insulation usually beat windows?",
        answer:
          "Because heat rises and the attic is where most of it leaves. Going from no insulation to a full depth cuts heating load by roughly 15 to 22 percent and costs a fraction of a whole house of windows. On most pre-1940 housing in this region it is the best return per dollar available.",
      },
      {
        question: "Why does the tool tell me not to do something?",
        answer:
          "Because sometimes that is the accurate answer, and this is a referral service rather than a contractor, so there is no product line to defend. If the payback runs past 25 years, the upgrade is not paying for itself on energy. There may still be good reasons to do it, and the tool names them.",
      },
      {
        question: "Why are there no rebate amounts shown?",
        answer:
          "Because program terms change, sometimes mid-year, and a wrong figure here would be worse than no figure. Mass Save, Energize CT, the Connecticut Green Bank, and Rhode Island Energy all run assessments and incentives worth pursuing. The panel links to each one so you can confirm current terms directly.",
      },
      {
        question: "Where do the savings percentages come from?",
        answer:
          "They are directional figures for typical New England housing, reviewed against the cost data on this site. They are ranges rather than single numbers because the actual result depends on how leaky your particular house is, which nobody knows without testing it.",
      },
    ],
  },

  "home-improvement-roi-calculator": {
    lede: "Recoup rates for the Northeast, adjusted for regional demand. Where a project is mostly a lifestyle decision rather than an investment, this says so instead of dressing it up.",
    how: [
      "The project cost is multiplied by a published recoup rate for that project type, then by a regional demand factor for your town. Fairfield County, Greater Boston, and the Cape all run above the regional norm; the Berkshires and the Quiet Corner run below.",
      "The plain-language read changes based on when you plan to sell, because the same number means different things. If you are not selling, recoup is close to irrelevant and the question is whether the work is worth it to live with. If you are selling within a year, condition matters in a way the recoup rate does not capture: a roof or siding in visibly poor condition can block a sale or trigger a price reduction well in excess of what fixing it costs.",
    ],
    cannotKnow: [
      "What your local market actually rewards, which varies street by street more than region by region",
      "The condition of what is there now, which is often the larger factor than the upgrade itself",
      "Whether your house is already at the ceiling for its street, where further investment returns very little",
      "How long you will actually stay, which is the input that changes the answer most",
    ],
    faqs: [
      {
        question: "Why do entry doors recoup so much more than kitchens?",
        answer:
          "Because the cost is low relative to the visual change, and it is the first thing anyone sees. An entry door replacement recoups roughly 92 percent in this region. An upscale kitchen recoups around 40 percent, because most of the spend goes into finishes that the next owner would have chosen differently.",
      },
      {
        question: "Does a high recoup rate mean I should do the project?",
        answer:
          "Only if you are selling soon. Recoup rate answers one narrow question: how much of this comes back at resale. If you are staying ten years, a 40 percent recoup on a kitchen you use every day may be a far better decision than a 92 percent recoup on a door you barely notice.",
      },
      {
        question: "Where do these rates come from?",
        answer:
          "They are Northeast regional figures, directional rather than precise, reviewed annually against published remodeling cost versus value data. They are a planning framework, not an appraisal.",
      },
      {
        question: "Why does it ask for my home value?",
        answer:
          "Mostly as a sanity check on scale. A 60,000 dollar kitchen in a 250,000 dollar house behaves very differently at resale than the same kitchen in a 900,000 dollar house, and being aware of that ratio is more useful than the recoup percentage on its own.",
      },
    ],
  },

  "material-comparison-tool": {
    lede: "Upfront cost, expected life, maintenance schedule, and total cost over the years you plan to stay. No single winner is declared, because different materials genuinely win on different axes.",
    how: [
      "Installed cost per unit is multiplied by your quantity, then adjusted for your state, your region, and your exposure. Maintenance cost is calculated from how many cycles fall inside the years you plan to stay, at a typical cost per cycle. Lifetime cost is the sum of the two.",
      "The output gives four separate answers: lowest upfront, lowest lifetime, best in coastal exposure, and most likely to be approved in a historic district. Those are frequently four different materials, and collapsing them into one recommendation would hide the actual decision rather than help with it.",
      "This is the tool the referral model makes credible. A contractor selling one siding line cannot publish a neutral comparison. There is no product here to defend, so the comparison can say plainly when the cheap option is the right option.",
    ],
    cannotKnow: [
      "The condition of what is behind the existing cladding, which sometimes changes the material decision entirely",
      "Whether your specific house sits inside a district boundary, which can be a street-by-street question",
      "Local contractor availability for specialty materials, which affects both price and schedule",
      "How much the appearance matters to you, which is frequently the deciding factor and is not a number",
    ],
    faqs: [
      {
        question: "Why does the tool refuse to pick a winner?",
        answer:
          "Because there is not one. Vinyl wins on upfront cost. Fiber cement usually wins on lifetime cost if you are staying. Cedar wins on coastal durability and on what a historic commission will approve. Those are real trade-offs and pretending one material is simply best would be less useful, not more.",
      },
      {
        question: "How is lifetime cost calculated?",
        answer:
          "Installed cost plus the maintenance cycles that fall within the years you plan to stay. A material needing repainting every 7 years costs more over 20 years than the sticker price suggests, and a material needing nothing costs exactly what it cost to install.",
      },
      {
        question: "Why does coastal exposure change the recommendation?",
        answer:
          "Salt air attacks fasteners before it attacks finishes, and it shortens paint life substantially. Fiber cement holds paint 12 to 15 years in coastal exposure where vinyl fades and cannot be repainted to fix it. Cedar weathers rather than failing. Steel components corrode from the bottom edge.",
      },
      {
        question: "Will vinyl be approved in my historic district?",
        answer:
          "Rarely on a visible facade. Most commissions in this region require clapboard or shingle in the original exposure. The tool flags this when your town has district review, but the boundary is often street by street, so confirm with the local commission directly.",
      },
    ],
  },
};
