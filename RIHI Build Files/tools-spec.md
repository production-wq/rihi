# tools-spec.md

Specification for five interactive tools at `/tools/[tool]/`.

---

## WHY THESE EXIST

Two reasons, and the second one is the important one.

**Traffic.** Cost-guide queries are the largest informational segment in this market. "Bathroom remodel cost Massachusetts" is a verified 100 searches a month at difficulty 0, and there are hundreds of variations of that shape across seven services and three states. Calculator pages rank for those and hold on to them.

**Conversion.** This is the point. A cost-guide blog post captures a researcher who is six weeks to eighteen months from buying. A calculator turns that researcher into someone who has just told you their house, their project scope, and their town. That is a qualified lead in everything but name, and the handoff from a completed calculation to the estimate form is the highest-intent moment anywhere on the site.

**No competitor in this three-state market publishes cost figures at all.** Every one of the sixteen sites reviewed in `docs/competitors.md` says "free estimate" and stops. Publishing real numbers is both the differentiator and the reason these pages will rank.

---

## RULES THAT APPLY TO ALL FIVE

**An estimate is not a quote, and the interface must never blur that.** Every output carries a plain statement that the figure is an estimate for this market and that actual pricing depends on the house, the access, and what turns up once work starts. Never display a single number. Always display a range.

**Never invent a rebate, incentive, or program figure.** Mass Save, Energize CT, Connecticut Green Bank, and federal 25C terms all change, sometimes mid-year. If a current figure cannot be verified, the tool describes the program qualitatively and links out. It does not guess. Every hardcoded incentive value carries a `verifiedDate` and the UI shows it.

**No lead gate.** The result appears immediately, before any contact details are requested. Gating the number behind a form kills both the ranking signal and the trust, and this site's entire positioning is that it tells you things nobody else will.

**Client-side calculation.** No API call, no server round trip. The whole point is instant feedback as inputs change.

**Accessible and mobile-first.** Real `<label>` elements, keyboard operable, visible focus rings, verified at 390px. Roughly two thirds of this traffic is mobile.

**Cost data lives in one place.** `lib/data/cost-data.ts`, versioned, with a `lastReviewed` date rendered in the UI. Review quarterly. Stale cost data is worse than none, because it destroys the credibility the tool was built to establish.

**All figures below are directional estimates** derived from typical regional pricing and the verified CPC and job-value data in `docs/seo-strategy.md`. Validate against actual contractor quotes before launch and adjust. The multipliers matter more than the base numbers, and both need real-world checking.

---

## SHARED: STATE AND REGIONAL COST MODEL

Every tool applies the same two-step geographic adjustment. Defined once, in `lib/data/cost-data.ts`.

### Step 1: state labor multiplier

| State | Multiplier | Reasoning |
|---|---|---|
| Massachusetts | 1.00 | Baseline. Largest market, largest contractor pool. |
| Connecticut | 0.97 | Slightly lower labor cost outside Fairfield County. |
| Rhode Island | 0.94 | Smallest market, lowest regional labor rates. |

### Step 2: regional multiplier, applied on top

Keyed to the `region` field on every City record, so the tool inherits the geography already in the data set.

| Region | Mult | Reasoning |
|---|---|---|
| Fairfield County, CT | 1.28 | Highest cost market in all three states by a wide margin |
| Greater Boston, MA | 1.22 | High labor cost, difficult access, permitting overhead |
| Cape and Islands, MA | 1.20 | Ferry logistics, seasonal labor, historic district review |
| Newport County, RI | 1.14 | Historic review, high-value stock |
| MetroWest, MA | 1.12 | |
| North Shore, MA | 1.10 | |
| New Haven County, CT | 1.05 | |
| South Shore, MA | 1.04 | |
| Greater Hartford, CT | 1.00 | |
| Farmington Valley, CT | 1.02 | |
| Providence Metro, RI | 0.98 | |
| Kent County, RI | 0.96 | |
| East Bay, RI | 0.98 | |
| South County, RI | 1.02 | Coastal premium |
| Connecticut Shoreline | 1.06 | Coastal premium, flood zone requirements |
| Merrimack Valley, MA | 0.98 | |
| Central Massachusetts | 0.94 | |
| Blackstone Valley | 0.93 | Lowest cost corridor in the region |
| South Coast, MA | 0.95 | |
| Naugatuck Valley, CT | 0.93 | |
| Pioneer Valley, MA | 0.90 | |
| Northern Rhode Island | 0.94 | |
| Southeastern Connecticut | 0.95 | |
| Tolland County, CT | 0.94 | |
| Quiet Corner, CT | 0.90 | |
| Northwest Hills, CT | 0.96 | Rural access offsets lower labor |
| Berkshires, MA | 0.92 | |
| Middlesex County, CT | 0.98 | |
| Block Island, RI | 1.45 | Ferry-dependent materials and labor |

### Step 3: housing-stock modifiers

Additive percentages, applied after the geographic multipliers. These come straight from `homeStyleNote` conditions and are what make the tools feel like they know the house.

| Condition | Modifier | Reasoning |
|---|---|---|
| Pre-1940 construction | +8% | Board sheathing, non-standard dimensions, unknowns |
| Pre-1900 construction | +14% | All of the above, more so |
| Local historic district | +20% | Approved materials, review process, longer timeline |
| Triple decker or 3-family | +12% | Three floors, staging, access, unit count |
| Coastal salt exposure | +6% | Upgraded fasteners and materials |
| Steep or difficult access | +10% | Staging cost |
| Island, ferry required | +30% | Material transport and labor lodging |

---

## TOOL 1: ROOFING COST CALCULATOR

**URL:** `/tools/roofing-cost-calculator/`
**Schema:** `SoftwareApplication`, `applicationCategory: "UtilitiesApplication"`, plus `BreadcrumbList`

### Inputs

| Input | Type | Options / range | Notes |
|---|---|---|---|
| State | select, required | RI, MA, CT | Drives multiplier |
| Town | autocomplete, required | 559 municipalities | Sourced from `getLiveCities()`. Drives regional multiplier and prefills housing-stock defaults from `homeStyleNote`. |
| Roof footprint | number, required | 600 to 5,000 sq ft | Help text: this is the ground footprint, not the roof surface. |
| Roof pitch | select, required | Low slope under 3:12 (×1.0), 4:12 to 6:12 (×1.12), 7:12 to 9:12 (×1.25), 10:12 or steeper (×1.40) | Pitch multiplier converts footprint to surface area and prices access difficulty. |
| Material | select, required | 3-tab asphalt ($4.25/sq ft), architectural asphalt ($5.75), premium architectural ($7.50), EPDM low-slope ($8.50), standing seam metal ($16.00), synthetic slate ($22.00) | Per square foot installed, MA baseline. |
| Layers to remove | select, required | None, new deck (−$0.85/sq ft), one layer (baseline), two or more (+$1.10/sq ft) | |
| Home age | select, required | Post-1980, 1940 to 1980, 1900 to 1940 (+8%), pre-1900 (+14%) | Prefilled from `homeStyleNote` where inferable. |
| Deck condition | select, required | Sound (0), some repair expected (+$1.20/sq ft on 20% of area), full re-deck (+$3.40/sq ft) | Default to "some repair expected" for pre-1940. Explain why. |
| Complexity | select, required | Simple gable (1.0), some dormers or valleys (1.10), complex, multiple planes (1.22) | |
| Historic district | toggle | +20% | |
| Add ice and water shield | toggle, default on | +$1.15/sq ft on eaves | Default on. This is New England. |

### Calculation

```
surfaceArea   = footprint × pitchMultiplier
base          = surfaceArea × materialRate
adjusted      = (base + layerAdj + deckAdj + iceWaterAdj) × complexity
geographic    = adjusted × stateMultiplier × regionMultiplier
final         = geographic × (1 + sum of housing modifiers)
displayRange  = final × 0.85  to  final × 1.20
```

The asymmetric range is deliberate. Roofing overruns more often than it underruns, because what is under the shingles is unknown until the tear-off.

### Output

Range, plus a line-item breakdown of materials, tear-off, deck allowance, and ice and water shield. Plus a mono-set "what could change this" block naming the two or three specific unknowns for that house: board sheathing on a pre-1940 roof, chimney flashing, and the rear ell low-slope section on a triple decker.

### Lead handoff

Below the result: "Get quotes for this roof." Prefills the estimate form with town, state, service = roofing, and a generated description including the footprint, pitch, and material selected.

### Internal links

Up to `/services/roofing/`. Across to `/services/roofing/roof-replacement/`, `/roof-repair/`, `/ice-dam-removal/`. Down to the roofing page for the selected town. Out to the roofing cost-guide posts for the selected state, and to the Home Improvement ROI Calculator.

---

## TOOL 2: BATHROOM REMODEL COST CALCULATOR

**URL:** `/tools/bathroom-remodel-cost-calculator/`
**Schema:** `SoftwareApplication` plus `BreadcrumbList`

Priority note: "tub to shower conversion" is a verified 6,400 monthly searches at difficulty 3, the largest winnable term in the project. That path through this tool should be the most prominent one.

### Inputs

| Input | Type | Options / range | Notes |
|---|---|---|---|
| State | select, required | RI, MA, CT | |
| Town | autocomplete, required | 559 municipalities | |
| Project type | select, required | Tub to shower conversion ($9,500 base), shower replacement ($8,000), tub replacement ($6,500), full remodel, same layout ($21,000), full remodel, new layout ($34,000), ADA accessible conversion ($16,000) | MA baseline. |
| Bathroom size | select, required | Small, under 40 sq ft (×0.85), standard 5×8, 40 to 60 sq ft (×1.0), large, 60 to 100 (×1.30), primary suite, 100+ (×1.65) | Default to standard. It is the dominant footprint in this housing stock. |
| Does plumbing move | select, required | No, fixtures stay put (×1.0); minor, within the same wall (+$1,800); yes, relocating fixtures (+$5,500) | **Label this as the single largest cost variable, because it is.** |
| Home age | select, required | Post-1980, 1940 to 1980, 1900 to 1940 (+8%), pre-1900 (+14%) | |
| Waste line material | select | Unknown or PVC (0), cast iron (+$1,600), galvanized supply present (+$2,400) | Help text: common in pre-1960 housing here. If you do not know, choose unknown. |
| Finish level | select, required | Builder grade (×0.80), mid-range (×1.0), high end (×1.55) | |
| Second floor bathroom | toggle | +$900 | Material handling and access. |
| Historic district | toggle | +20% | |

### Calculation

```
base       = projectTypeBase × sizeMultiplier × finishMultiplier
adjusted   = base + plumbingAdj + wasteLineAdj + floorAdj
geographic = adjusted × stateMultiplier × regionMultiplier
final      = geographic × (1 + housing modifiers)
range      = final × 0.88  to  final × 1.18
```

### Output

Range, plus a breakdown, plus an estimated timeline in working days: tub to shower 5 to 9 days, full remodel same layout 15 to 25, full remodel new layout 25 to 40. Timeline is frequently the deciding factor and nobody publishes it.

### Lead handoff and links

Prefills service = bathroom-remodeling with the project type and size in the description. Links up to `/services/bathroom-remodeling/`, across to the tub-to-shower and walk-in shower sub-service pages, down to the bathroom page for the selected town, and out to the bathroom cost-guide posts.

---

## TOOL 3: ENERGY SAVINGS ESTIMATOR

**URL:** `/tools/energy-savings-estimator/`
**Schema:** `SoftwareApplication` plus `BreadcrumbList`

The tool most exposed to the incentive-accuracy problem. Read the rules at the top of this file again before touching the program data.

### Inputs

| Input | Type | Options / range | Notes |
|---|---|---|---|
| State | select, required | RI, MA, CT | Determines which programs surface |
| Town | autocomplete, required | 559 municipalities | Regional heating degree days |
| Home square footage | number, required | 600 to 6,000 | |
| Home age | select, required | Post-2000, 1980 to 2000, 1940 to 1980, 1900 to 1940, pre-1900 | Proxy for envelope performance |
| Current windows | select, required | Single pane, no storms (worst); single pane with storms; older double pane, pre-1990; modern double pane; triple pane | |
| Number of windows | number, required | 4 to 80 | Help text: a cape has 12 to 16, a triple decker has 40 to 60. |
| Attic insulation | select, required | None or unknown, under 6 inches, 6 to 12 inches, over 12 inches | |
| Wall insulation | select, required | None, likely pre-1940; unknown; blown-in retrofit; full cavity | |
| Heating fuel | select, required | Natural gas, oil, propane, electric resistance, heat pump | Drives the dollar conversion |
| Annual heating spend | number, optional | $500 to $8,000 | If blank, estimate from square footage, fuel, and age. |
| Planned upgrades | multi-select, required | Replace windows, add attic insulation, add wall insulation, air seal, replace entry doors | |

### Calculation

Model each measure as a percentage reduction in heating load, then dollarize against actual or estimated spend.

| Measure | Estimated reduction | Notes |
|---|---|---|
| Single pane, no storms → modern double pane | 12 to 18% | Largest single window gain |
| Older double pane → modern double pane | 4 to 7% | Often not worth it on energy alone. Say so. |
| Attic none → R-49 | 15 to 22% | Usually the best return per dollar in this housing stock |
| Wall none → blown-in | 10 to 16% | |
| Air sealing | 8 to 14% | Cheapest measure, most overlooked |
| Entry door replacement | 2 to 4% | Small. Do not oversell it. |

Apply diminishing returns when measures stack: total reduction is capped and each additional measure contributes at 80% of its standalone value.

Multiply by a regional heating degree day factor: Berkshires and Northwest Hills 1.15, inland MA and CT 1.05, Pioneer Valley 1.08, coastal RI and Cape 0.92, Greater Boston 1.0.

### Output

Estimated annual savings range, simple payback period in years, and ten-year cumulative savings.

**Be honest when the answer is no.** If payback exceeds 25 years, say plainly that the upgrade is unlikely to pay for itself on energy alone, and note the other reasons someone might still do it: comfort, noise, condensation, appearance, resale. Every competitor overstates this. Not overstating it is the differentiator.

### Incentive display

A qualitative panel keyed to state, never a hardcoded dollar amount unless verified with a date:

- **Massachusetts:** Mass Save. Describe the assessment and typical measure coverage. Link to the official site. Note that the Stretch Energy Code applies in adopting municipalities and that terms change.
- **Connecticut:** Energize CT and the Connecticut Green Bank. Describe the Home Energy Solutions assessment and available financing. Link out.
- **Rhode Island:** Rhode Island Energy programs. Link out.
- **Federal:** the Energy Efficient Home Improvement Credit. State that it exists, that terms and limits change, and that a tax professional should confirm eligibility. **Do not print a dollar figure without a verified date.**

Every panel shows: "Program terms verified [date]. Confirm current terms before relying on them."

### Lead handoff and links

Prefills service = windows where windows are selected, otherwise the highest-savings measure. Links up to `/services/windows/`, across to the energy-efficient-windows sub-service page, and out to the Mass Save and Energize CT blog posts.

---

## TOOL 4: HOME IMPROVEMENT ROI CALCULATOR

**URL:** `/tools/home-improvement-roi-calculator/`
**Schema:** `SoftwareApplication` plus `BreadcrumbList`

### Inputs

| Input | Type | Options / range |
|---|---|---|
| State | select, required | RI, MA, CT |
| Town | autocomplete, required | 559 municipalities |
| Current home value | number, required | $100,000 to $3,000,000 |
| Project | select, required | Roof replacement, window replacement, siding replacement, entry door replacement, bathroom remodel (mid-range), bathroom remodel (upscale), kitchen remodel (minor), kitchen remodel (major), kitchen remodel (upscale) |
| Estimated project cost | number, required | Prefilled from the other calculators if the user arrives from one |
| Planning to sell | select, required | Within 1 year, 1 to 3 years, 3 to 7 years, not planning to sell |

### Calculation

```
recouped   = projectCost × recoupRate × regionalDemandFactor
netCost    = projectCost − recouped
roiPercent = (recouped / projectCost) × 100
```

Estimated recoup rates, Northeast regional, directional and to be reviewed annually against published remodeling cost-versus-value data:

| Project | Recoup rate |
|---|---|
| Entry door replacement | 92% |
| Siding replacement, fiber cement | 84% |
| Roof replacement, asphalt | 68% |
| Window replacement, vinyl | 67% |
| Bathroom remodel, mid-range | 66% |
| Kitchen remodel, minor | 81% |
| Kitchen remodel, major | 54% |
| Kitchen remodel, upscale | 40% |
| Bathroom remodel, upscale | 45% |

Regional demand factor: Fairfield County 1.08, Greater Boston 1.06, MetroWest 1.04, Cape and Islands 1.05, Newport County 1.04, most other regions 1.0, Berkshires and Quiet Corner 0.94.

### Output

Recouped value, net cost, ROI percentage, and a plain-language read.

**The honest framing is the feature.** Where recoup is under 60%, say directly that the project is mostly a lifestyle decision rather than an investment, and that this is fine if the homeowner is staying. Where the user is not planning to sell, lead with that framing rather than with the ROI number, because ROI is close to irrelevant to them. Where they are selling within a year, note that a roof or siding in visibly poor condition can block a sale or trigger a price reduction well in excess of its repair cost, which is a different and often larger argument than recoup rate.

### Lead handoff and links

Prefills the selected project. Links to the matching service hub, to the Roofing and Bathroom calculators, and to the relevant cost-guide posts.

---

## TOOL 5: MATERIAL COMPARISON TOOL

**URL:** `/tools/material-comparison-tool/`
**Schema:** `SoftwareApplication` plus `BreadcrumbList`

The tool the referral model makes uniquely credible. A contractor selling one siding line cannot publish a neutral comparison. This site has no product to defend.

### Inputs

| Input | Type | Options |
|---|---|---|
| Category | select, required | Siding, roofing, windows, entry doors |
| Materials to compare | multi-select, 2 to 4 | Filtered by category |
| State | select, required | RI, MA, CT |
| Town | autocomplete, required | 559 municipalities. Drives cost and surfaces exposure warnings. |
| Home square footage or wall area | number, required | For cost estimation |
| Exposure | select, required | Inland (1.0), coastal within 1 mile (1.06), direct oceanfront (1.12) | Prefilled from the town's region |
| Planned time in home | select, required | Under 5 years, 5 to 15, 15 or more, indefinitely | Drives the lifetime-cost view |

### Material data

**Siding**
| Material | Installed $/sq ft | Life | Maintenance | Coastal | Historic OK |
|---|---|---|---|---|---|
| Vinyl | $4.50 to $8.00 | 25 to 40 yr | None, fades in full sun | Good | Rarely approved |
| Insulated vinyl | $7.00 to $11.00 | 25 to 40 yr | None | Good | Rarely approved |
| Fiber cement | $9.50 to $16.00 | 40 to 60 yr | Repaint 12 to 15 yr | Excellent | Sometimes |
| Engineered wood | $7.50 to $12.50 | 25 to 35 yr | Repaint 8 to 12 yr | Fair | Sometimes |
| Cedar shingle | $11.00 to $19.00 | 30 to 50 yr | Stain 5 to 8 yr, or weather naturally | Excellent | Usually required |
| Cedar clapboard | $10.00 to $17.00 | 30 to 50 yr | Repaint 5 to 8 yr | Good | Usually required |

**Roofing**
| Material | Installed $/sq ft | Life | Wind rating | Notes |
|---|---|---|---|---|
| 3-tab asphalt | $4.00 to $5.50 | 15 to 20 yr | 60 mph | Rarely specified now |
| Architectural asphalt | $5.25 to $7.50 | 25 to 30 yr | 110 to 130 mph | Regional default |
| Premium architectural | $7.00 to $9.50 | 30 to 40 yr | 130 mph | |
| Standing seam metal | $14.00 to $20.00 | 50+ yr | 140 mph | Sheds snow well |
| Synthetic slate | $18.00 to $26.00 | 50+ yr | 110 mph | Historic district appropriate |
| EPDM low slope | $7.50 to $11.00 | 20 to 30 yr | n/a | For rear ells and porch roofs |

**Windows**
| Material | Installed per unit | Life | U-factor | Historic OK |
|---|---|---|---|---|
| Vinyl | $650 to $1,100 | 20 to 30 yr | 0.27 to 0.32 | Rarely approved |
| Fiberglass | $900 to $1,500 | 30 to 50 yr | 0.25 to 0.30 | Sometimes |
| Wood clad | $1,100 to $2,200 | 30 to 50 yr | 0.26 to 0.31 | Usually approved |
| All wood | $1,200 to $2,400 | 40 to 60 yr, maintained | 0.30 to 0.35 | Usually required |

**Entry doors**
| Material | Installed | Life | Notes |
|---|---|---|---|
| Steel | $1,200 to $2,400 | 20 to 30 yr | Dents permanently, poor at the bottom edge in salt |
| Fiberglass | $1,800 to $4,000 | 30 to 50 yr | Will not rot or warp, takes a wood-grain finish |
| Wood | $2,500 to $7,000 | 30 to 100 yr, maintained | Historic district appropriate, needs a storm door |

### Output

A side-by-side table with upfront cost for the entered area, expected life, maintenance schedule and lifetime maintenance cost, total cost of ownership over the planned time in home, and a suitability note for that town's exposure and historic status.

**Contextual warnings, driven by the town:**
- Coastal or oceanfront exposure selected: note the fastener and paint-life penalty on wood and steel, and the case for fiber cement or upgraded stainless fasteners.
- Town has a historic district: note that vinyl is rarely approved and that an approved profile may be required. Link to the state's historic review post.
- Time in home under 5 years: note plainly that lifetime cost matters less than upfront cost and resale, and point to the ROI calculator.
- Island town: note the material transport surcharge.

**Never declare a single winner.** Output "best for lowest upfront cost," "best for lowest lifetime cost," "best for coastal exposure," and "best for a historic district" as separate answers. The honest result is that different materials win on different axes, and saying so is the credibility this tool is built on.

### Lead handoff and links

Prefills the service matching the selected category and includes the materials compared in the description. Links to the matching service hub, to the sub-service pages for each material compared, and to the relevant comparison blog posts.

---

## IMPLEMENTATION NOTES

**File structure**

```
app/tools/
├── page.tsx                              tools index
├── roofing-cost-calculator/page.tsx
├── bathroom-remodel-cost-calculator/page.tsx
├── energy-savings-estimator/page.tsx
├── home-improvement-roi-calculator/page.tsx
└── material-comparison-tool/page.tsx

components/tools/
├── ToolShell.tsx          layout, schema, disclaimer, lead handoff
├── TownAutocomplete.tsx   shared, sources getLiveCities()
├── ResultRange.tsx        shared range display
├── Breakdown.tsx          shared line-item output
└── [one component per tool]

lib/data/cost-data.ts      ALL cost figures, multipliers, and material data
lib/tools/calculate.ts     pure functions, unit tested
```

**Page structure.** Calculator above the fold. Below it: how the calculation works and what it assumes, what the tool cannot know, links to related services and guides, and three or four FAQs marked up as `FAQPage`. The explanatory copy is what makes the page rank; the calculator is what makes it convert.

**State in the URL.** Serialize inputs to query parameters so results are shareable and so a homeowner can send the figure to a spouse. Do not use browser storage.

**Analytics.** Track calculator starts, completions, and lead-form handoffs as separate GA4 events. Completion rate is the tool health metric. Handoff rate is the business metric.

**Quarterly review.** Cost data, multipliers, recoup rates, and every incentive program. Set a recurring reminder. The `lastReviewed` date renders in the UI, so a stale date is publicly visible, which is the correct forcing function.
