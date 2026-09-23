/**
 * tools.ts
 *
 * The five interactive tools. Specified in docs/tools-spec.md.
 *
 * Every one follows the rules at the top of that document: an estimate is never
 * presented as a quote, output is always a range rather than a single number,
 * the result appears before any contact details are requested, and the
 * calculation runs client side.
 */

export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  /** What it does, in one sentence, for the index and the meta description. */
  description: string;
  /** The specific detail for the meta description. */
  metaDetail: string;
  /** Which service the lead handoff prefills. */
  service: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "roofing-cost-calculator",
    name: "Roofing Cost Calculator",
    shortName: "Roofing cost",
    description:
      "Footprint, pitch, material, and deck condition, adjusted for your town and the age of your house. Returns a range with a line-item breakdown, plus the specific unknowns for that roof.",
    metaDetail:
      "Pitch multipliers, tear-off layers, and a deck allowance for pre-1940 board sheathing",
    service: "roofing",
  },
  {
    slug: "bathroom-remodel-cost-calculator",
    name: "Bathroom Remodel Cost Calculator",
    shortName: "Bathroom cost",
    description:
      "Tub to shower conversion through a full remodel, with the plumbing question weighted the way it actually behaves. Returns a range and a timeline in working days.",
    metaDetail:
      "Whether the plumbing moves is the largest variable, and cast iron waste carries a known number",
    service: "bathroom-remodeling",
  },
  {
    slug: "energy-savings-estimator",
    name: "Energy Savings Estimator",
    shortName: "Energy savings",
    description:
      "Models each upgrade as a percentage reduction in heating load, stacks them with diminishing returns, and says plainly when a measure will not pay for itself.",
    metaDetail:
      "Attic insulation usually returns more per dollar than windows on pre-1940 housing",
    service: "windows",
  },
  {
    slug: "home-improvement-roi-calculator",
    name: "Home Improvement ROI Calculator",
    shortName: "Project ROI",
    description:
      "Northeast recoup rates by project, adjusted for regional demand. Says directly when a project is a lifestyle decision rather than an investment.",
    metaDetail:
      "Entry doors recoup roughly 92 percent, an upscale kitchen roughly 40",
    service: "entry-doors",
  },
  {
    slug: "material-comparison-tool",
    name: "Material Comparison Tool",
    shortName: "Material comparison",
    description:
      "Side by side upfront cost, expected life, maintenance schedule, and total cost of ownership over the years you plan to stay. Never declares a single winner, because different materials win on different axes.",
    metaDetail:
      "Fiber cement holds paint 12 to 15 years in coastal exposure where vinyl fades",
    service: "siding",
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
