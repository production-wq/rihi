# CLAUDE.md

Operating instructions for Claude Code on this repository. Read this file completely before writing any code.

## MANDATORY SESSION START

At the beginning of every session, before writing a single line of code or copy, read these three files in this order:

1. `CLAUDE.md` (this file)
2. `docs/competitors.md`
3. `docs/image-prompts.md`

`competitors.md` defines the copy voice by negative space. It documents exactly how every competitor in this market writes, and the banned words list is derived from that research. Writing copy without reading it produces copy that sounds like the competition, which defeats the entire purpose of this project.

`image-prompts.md` defines every image slot on the site, its filename, and its folder path. Referencing an image that is not in that file, or inventing a new filename, breaks the build and creates orphaned asset requests.

If you have not read all three, stop and read them.

## 1. PROJECT IDENTITY

**Working brand name:** Fieldstone Home Improvement

> PLACEHOLDER. The brand name is not finalized. It is defined exactly once, in `lib/content.ts` as `SITE.brandName`, and referenced everywhere else through that constant. Never hardcode the brand name in a component, a page, a meta tag, or a piece of copy. Changing the name should be a one-line edit.

**What this is:** A lead generation and referral website covering home improvement services across Rhode Island, Massachusetts, and Connecticut. The business model is capturing high-intent organic search traffic at the city and service level, qualifying the homeowner through a form, and routing that lead to a vetted contractor partner.

**What this is not:** This is not a contractor's website. The business does not employ trades, does not hold contractor licenses, does not carry contractor insurance, and does not perform work. Every piece of copy on this site must be true for a referral operation. See section 8, Copy Rules, for the specific language constraints this creates. This is the single most important compliance rule in the project and it is not negotiable.

**Why this site can win:** Every competitor in this three state market is either geographically limited to one county, service limited to exteriors only, or running a site with no city level pages at all. Verified Ahrefs data on eighteen competitors shows the strongest organic performer in the entire market at roughly 3,000 monthly organic visits and a Domain Rating of 14. Most sit under 400 monthly visits with a DR under 20. There is no incumbent with real programmatic coverage. See `docs/competitors.md` for the full data set.

**The strategic reality you must internalize:** No single keyword in this market justifies this build. State level head terms are tiny. "Roofing contractors Rhode Island" is 150 searches a month. "Roofers Hartford CT" is 40. The thesis is aggregate long tail across roughly 559 municipalities multiplied by 7 service categories, where difficulty scores are near zero and cost per click runs from 3 to 35 dollars. Volume comes from breadth, not from any one page. This means page quality at scale matters more than any single hero page, and it means thin duplicated city pages will kill the entire project. Every city page must earn its index slot.

## 2. TECH STACK

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 14, App Router | Server components by default. Client components only where interaction requires it. |
| Language | TypeScript, strict mode | No `any`. No `@ts-ignore` without an adjacent comment explaining why. |
| Styling | Tailwind CSS | Tokens only. See section 6. |
| CMS | Sanity | Blog content only. Service and city data live in the repo as typed TypeScript. |
| Hosting | Vercel | `ACTIVE_PHASE` environment variable gates city rollout. |
| Forms | Formspree | No server side form handler. No database. |
| Analytics | GA4 | Plus Google Search Console. |
| Blog generation | Gemini 2.5 Flash | Vercel cron, weekdays. |
| Fonts | next/font, self hosted | No external font CDN requests. |

Deliberate omissions: no database, no authentication, no user accounts, no e-commerce, no server state. If a task seems to require one of these, stop and ask rather than introducing it.

## 3. FILE STRUCTURE

```
/
├── CLAUDE.md                          # This file. Read first, every session.
├── .env.example                       # Every environment variable, documented.
├── next.config.mjs
├── tailwind.config.ts                 # Design tokens. Do not add raw hex values in components.
├── tsconfig.json
│
├── docs/
│   ├── competitors.md                 # READ EVERY SESSION. Voice and positioning source of truth.
│   ├── image-prompts.md               # READ EVERY SESSION. Every image slot, filename, and prompt.
│   ├── seo-strategy.md                # Competitive analysis, keyword strategy, phase gates, projections.
│   └── tools-spec.md                  # Specification for the five interactive calculators.
│
├── app/
│   ├── layout.tsx                     # Root layout. Fonts, header, footer, GA4, Organization schema.
│   ├── page.tsx                       # Homepage.
│   ├── not-found.tsx                  # 404. Copy lives in content.ts.
│   ├── sitemap.ts                     # Dynamic. Must respect ACTIVE_PHASE. See section 9.
│   ├── robots.ts                      # Dynamic.
│   │
│   ├── services/
│   │   ├── page.tsx                   # /services/ index of all 7 categories.
│   │   └── [service]/
│   │       ├── page.tsx               # /services/roofing/ statewide service hub.
│   │       └── [subService]/
│   │           └── page.tsx           # /services/roofing/roof-replacement/
│   │
│   ├── locations/
│   │   ├── page.tsx                   # /locations/ index of the three states.
│   │   └── [state]/
│   │       ├── page.tsx               # /locations/rhode-island/ state hub.
│   │       └── [city]/
│   │           ├── page.tsx           # /locations/rhode-island/providence/ city hub.
│   │           └── [service]/
│   │               └── page.tsx       # /locations/rhode-island/providence/roofing/ deepest tier.
│   │
│   ├── blog/
│   │   ├── page.tsx                   # Blog hub.
│   │   └── [slug]/page.tsx            # Sanity-driven post.
│   │
│   ├── tools/
│   │   ├── page.tsx                   # Tools index.
│   │   └── [tool]/page.tsx            # Five calculators. See docs/tools-spec.md.
│   │
│   ├── about/page.tsx
│   ├── free-estimate/page.tsx
│   ├── gallery/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms-conditions/page.tsx
│   │
│   └── api/
│       └── cron/
│           └── generate-post/route.ts # Gemini blog generation. CRON_SECRET protected.
│
├── components/
│   ├── layout/                        # Header, Footer, MobileNav, Container.
│   ├── forms/                         # EstimateForm, InlineLeadForm, FormField.
│   ├── sections/                      # Hero, ServiceGrid, WhyUs, Reviews, FinalCta, LocalLedger.
│   ├── seo/                           # JsonLd components, one per schema type.
│   └── ui/                            # Button, Card, Accordion, Breadcrumbs, Badge.
│
├── lib/
│   ├── data/
│   │   ├── services.ts                # CRITICAL DATA FILE. See section 4.
│   │   ├── cities.ts                  # CRITICAL DATA FILE. Barrel export and helpers.
│   │   ├── cities-phase1.ts           # CRITICAL DATA FILE. 39 Rhode Island municipalities.
│   │   ├── cities-phase2.ts           # CRITICAL DATA FILE. Top 50 Massachusetts by population.
│   │   ├── cities-phase3.ts           # CRITICAL DATA FILE. 169 Connecticut municipalities.
│   │   ├── cities-phase4.ts           # CRITICAL DATA FILE. Massachusetts 51 to 150.
│   │   ├── cities-phase5.ts           # CRITICAL DATA FILE. Remaining Massachusetts.
│   │   └── blog-topics.ts             # CRITICAL DATA FILE. 150 prioritized topics.
│   ├── content.ts                     # All site-wide copy. Single source of truth for words.
│   ├── schema.ts                      # JSON-LD builders.
│   ├── phase.ts                       # ACTIVE_PHASE parsing and gating logic.
│   └── sanity/                        # Client, queries, image URL builder.
│
├── public/
│   └── images/
│       ├── hero/
│       ├── services/
│       ├── service-cards/
│       ├── gallery/
│       ├── blog/
│       ├── trust/
│       └── about/
│
└── scripts/
    └── validate-data.ts               # Municipality counts, duplicate slugs, missing fields.
```

## 4. CRITICAL DATA FILES

These files are the foundation of the entire site. Treat them as production data, not as scratch code.

```
lib/data/services.ts
lib/data/cities.ts
lib/data/cities-phase1.ts
lib/data/cities-phase2.ts
lib/data/cities-phase3.ts
lib/data/cities-phase4.ts
lib/data/cities-phase5.ts
lib/data/blog-topics.ts
```

**Never regenerate, overwrite, bulk-rewrite, reformat, or "clean up" any of these files without an explicit instruction naming the specific file and the specific change.**

Specific prohibitions:

- Do not rewrite a phase file to "make it consistent" with another phase file.
- Do not regenerate `homeStyleNote` values in bulk. Each one is researched and specific to that municipality. Bulk regeneration produces generic filler, which is exactly the failure mode this project is built to avoid.
- Do not change a city `slug` after launch. Slugs are URLs. Changing one silently breaks an indexed page and every internal link pointing at it. If a slug must change, that is a separate task requiring a redirect.
- Do not reorder entries to alphabetize. Order within phase files carries meaning, usually county grouping or population rank.
- Do not add cities to a phase file to "round out coverage." Phase membership is a rollout decision, not a data decision.
- Do not delete a municipality because you cannot verify its housing stock. Ask instead.
- Do not modify `subServiceLive` on any city. That flag is flipped deliberately, city by city, once a city hub page has demonstrated indexing.

Allowed without asking: adding a new field to an interface (with a default that does not change existing behavior), fixing a genuine typo in prose, and correcting a factually wrong ZIP code.

Before committing a change to any of these files, run `scripts/validate-data.ts`. It checks that Rhode Island totals 39, Connecticut totals 169, Massachusetts totals 351 across phases 2, 4, and 5, that no slug appears twice, and that no required field is empty.

## 5. PHASED ROLLOUT SYSTEM

City page generation is controlled by a single environment variable, `ACTIVE_PHASE`, read at build time.

| Phase | Scope | Approximate page count added |
|---|---|---|
| 0 | Service hubs, sub-service pages, state hubs, static pages, tools. No city pages. | ~50 |
| 1 | All 39 Rhode Island municipalities | 39 city hubs + 273 service x city |
| 2 | Top 50 Massachusetts cities by population | 50 city hubs + 350 service x city |
| 3 | All 169 Connecticut municipalities | 169 city hubs + 1,183 service x city |
| 4 | Massachusetts 51 to 150 by population | 100 city hubs + 700 service x city |
| 5 | Remaining Massachusetts municipalities | 201 city hubs + 1,407 service x city |

### How the gate works

`lib/phase.ts` exports `getActivePhase()`, which parses `ACTIVE_PHASE` and defaults to `0` if unset or unparseable. Defaulting to zero is deliberate. A missing environment variable must never publish 4,000 pages by accident.

`getLiveCities()` in `lib/data/cities.ts` returns only cities whose `phase` value is less than or equal to the active phase. Every `generateStaticParams` for a city route must source from `getLiveCities()`. Never import a phase file directly in a route.

`getLiveCitiesWithSubServices()` returns the subset that additionally has `subServiceLive: true`. This is a second, finer gate used for the eventual `/locations/[state]/[city]/[service]/[subService]/` tier. That tier is not built yet. Do not build it without instruction.

The sitemap and the footer city links must both source from `getLiveCities()`. A city that is not live must not appear anywhere in the site's internal link graph or in the sitemap.

### Phase gate criteria

Do not advance `ACTIVE_PHASE` until all of the following are true for the current phase. These are hard gates, not guidelines. Advancing early is the most common way programmatic SEO projects fail, because it floods a low authority domain with pages Google will not crawl, and crawl budget starvation then delays the pages that would have ranked.

1. At least 3 to 4 full weeks have elapsed since the phase deployed.
2. At least 80 percent of the phase's city hub pages are indexed, confirmed in Google Search Console under Pages, not by `site:` operator.
3. Impressions on city pages are climbing week over week for at least three consecutive weeks.
4. At least some click activity exists on city pages, not only on service hubs. A phase with impressions and zero clicks means the pages are being indexed but read as irrelevant, and adding more of them makes the problem larger.
5. No spike in Search Console's "Crawled, currently not indexed" or "Discovered, currently not indexed" buckets.
6. Core Web Vitals still passing on mobile.

If criterion 4 fails while 2 and 3 pass, the correct response is to improve the existing city page template, not to advance the phase.

Full detail on thresholds lives in `docs/seo-strategy.md`.

## 6. BRAND, COLOR, AND TYPOGRAPHY

The palette is deliberately not slate navy and warm gold. That combination belongs to another project in this portfolio and is also the single most common contractor site palette in the market. Three options were developed; the implemented one is "Salt Marsh."

**Salt Marsh palette**

| Token | Hex | Use |
|---|---|---|
| `marsh` (primary) | `#14332B` | Headers, footer, primary surfaces, display type |
| `marsh-deep` | `#0C201B` | Footer base, overlay scrims |
| `cranberry` (accent) | `#A32035` | Primary CTAs, active states, key figures |
| `cranberry-deep` | `#7C1728` | CTA hover, pressed states |
| `oyster` (background) | `#F7F5F0` | Page background |
| `granite` | `#4A5157` | Body copy |
| `granite-light` | `#8A9298` | Captions, metadata, disabled |
| `shell` | `#E4E0D6` | Hairlines, dividers, card borders |

Rationale: deep marsh green reads as regional rather than generic, and almost no competitor in this market uses green. Cranberry is grounded in southeastern New England (the bogs run through Plymouth County, Cape Cod, and Carver) and gives a high-contrast CTA color that is not the orange or fire-engine red every roofing site defaults to. Oyster is a warm off-white that is deliberately not the near-#F4F1EA cream that saturates AI-generated design.

**Typography**

| Role | Family | Notes |
|---|---|---|
| Display | Fraunces (variable) | Headlines and section titles. Optical sizing on. Never below 24px. |
| Body | Instrument Sans | All running copy, navigation, buttons, form labels. |
| Utility | IBM Plex Mono | Eyebrows, the Local Ledger, price figures, ZIP codes, permit references. |

The mono face is a load-bearing part of the identity, not decoration. Any real, verifiable local datum renders in mono: a ZIP code, a price range, a permit authority, a housing stock date range. Marketing prose never renders in mono. This gives the reader an instant visual signal separating "we looked this up" from "we are talking."

Type scale (defined in `tailwind.config.ts`, never inline):

```
display-xl  clamp(2.75rem, 6vw, 4.5rem)   /  1.02  /  -0.025em
display-lg  clamp(2.25rem, 4.5vw, 3.5rem) /  1.06  /  -0.02em
display-md  clamp(1.875rem, 3vw, 2.5rem)  /  1.12  /  -0.015em
display-sm  1.5rem                        /  1.2   /  -0.01em
body-lg     1.125rem                      /  1.65
body        1rem                          /  1.65
body-sm     0.9375rem                     /  1.6
caption     0.8125rem                     /  1.5   /   0.01em
mono        0.8125rem                     /  1.4   /   0.06em  / uppercase
```

Use the full scale. A page that only uses `display-md`, `body`, and `caption` looks like a template. Real hierarchy uses five or six steps.

## 7. DESIGN STANDARDS

These are enforced. A pull request that violates them gets reworked.

**No templated AI layouts.** The specific failure pattern to avoid: full-bleed hero with centered headline, three evenly spaced feature cards with icons above the text, a stats bar of four big numbers, a testimonial carousel, a final centered CTA. That is the default output shape and this market is already full of it.

**Break the grid at least once per page.** Every page template must have exactly one moment where the layout departs from the container: an image bleeding past the right edge, an asymmetric two-thirds split, a pull quote breaking the left margin, a section with a different background running full width while the content stays offset. One per page. Not three. Restraint is what makes the one moment read as intentional.

**The signature element: the Local Ledger.** Every city hub and every service x city page carries a mono-set data strip near the top with four to six real, verifiable local facts: predominant housing stock and era, typical roof pitch or siding substrate for that stock, the permitting authority for that municipality, the ZIP codes covered, and a project cost range for that service in that market. It is set in IBM Plex Mono on a `shell` background with hairline rules between fields. It is the one thing on the page that no competitor has, and it makes the page verifiably local rather than a find-and-replace template. If the ledger cannot be filled with real data for a given city, the page is not ready to publish.

**Micro-interactions on every interactive element.** Buttons, links, form fields, accordions, and cards all need a considered hover, focus, and active state. Transitions 150 to 200ms, `ease-out`. No transition longer than 300ms anywhere. All of it wrapped in `prefers-reduced-motion` respect.

**Mobile-first verification at 390px.** Before moving on from any template, verify it at 390px wide. Not at 375, not at "mobile breakpoint," at 390. Check: no horizontal scroll, tap targets at least 44px, the Local Ledger stacks legibly rather than shrinking to unreadable, display type does not overflow, forms are usable one-handed. Roughly 65 to 70 percent of home improvement search traffic is mobile. A desktop-first page is a page that fails most of its visitors.

**Navigation on scroll.** Header starts transparent over the hero with white type. On scroll past 80px it transitions to a solid `oyster` background with `marsh` type and a `shell` bottom hairline, over 200ms. It stays sticky. On mobile the phone number and the estimate CTA remain visible at all scroll positions; everything else collapses into the menu.

**Accessibility floor, unannounced.** Visible keyboard focus using the `focus-ring` token on every interactive element. Semantic headings in order, one `h1` per page. Alt text on every image, describing the image, never keyword-stuffed. Color contrast at least 4.5:1 for body copy. Forms with real `<label>` elements, never placeholder-only fields.

## 8. COPY RULES

### Hard prohibitions

**No em dashes.** Anywhere. Not in copy, not in metadata, not in code comments, not in documentation, not in commit messages. Use a period, a comma, a colon, or restructure the sentence. This applies to en dashes used as sentence punctuation as well. En dashes in numeric ranges are fine.

**Banned words.** These are banned because `docs/competitors.md` documents every one of them being used by multiple competitors in this market. Using them makes this site sound like every site it is trying to outrank.

```
transform        sanctuary       dream home      curated
elevated         seamless        passion         craftsmanship
stunning         exquisite       journey         leverage
world-class      solutions       premier         cutting-edge
innovative       state-of-the-art               bespoke
artisan          meticulous      unparalleled    dedication
commitment
```

**Three narrow exceptions, and only these three.** "Seamless" is banned as a marketing adjective and permitted only in "seamless gutters," which is the actual product name for roll-formed gutter, carries real search volume, and has no synonym. Never write "a seamless process" or "seamless experience." Program names are quoted exactly as they are published, so Connecticut's "Home Energy Solutions" keeps its name even though "solutions" is banned. And `transform` as a CSS property is code, not copy.

Also avoid, as second-tier offenders documented in competitor copy: "peace of mind," "trusted partner," "attention to detail," "top-notch," "we treat your home like our own," "no job too big or too small," "your vision, our expertise."

### Legal and factual constraints, non-negotiable

This is a lead generation and referral business. The following claims are false for this entity and must never appear:

- Any claim that the business is licensed. No "licensed contractor," no license numbers, no "fully licensed."
- Any claim that the business is insured or bonded.
- Any claim of in-house crews, in-house trades, employed installers, or "our installers."
- Any claim of years in business, projects completed, homes served, or customers served, unless supplied by the client as a verified figure.
- Any manufacturer certification claim. No GAF Master Elite, no James Hardie Elite Preferred, no Owens Corning Preferred. Those belong to contractors, not to a referral site.
- Any warranty offer. The site does not warrant work it does not perform.

What the site can truthfully say: it connects homeowners with contractors in their area, it covers all of Rhode Island, Massachusetts, and Connecticut, quotes are free and carry no obligation, and the contractors in the network are vetted before being included. Where the network is being built, say so plainly rather than implying scale that does not exist.

Correct framing: "We match your project with contractors who work in Pawtucket." Incorrect framing: "Our Pawtucket roofing crews."

### Specificity over vagueness

Every claim should be something a competitor could not paste onto their own site unchanged. Concrete beats abstract, always.

| Vague | Specific |
|---|---|
| "We handle all types of roofing projects." | "Asphalt on a 6:12 colonial, low-slope EPDM over a Providence triple-decker rear ell, or ice and water shield running six feet up from the eave." |
| "New England weather is tough on homes." | "Ice dams form when heat escaping into the attic melts snow that refreezes at the cold eave. It is an insulation and ventilation problem that shows up as a roof problem." |
| "Serving the greater Worcester area." | "Worcester's three-family housing stock, most of it built between 1890 and 1925, means window replacement usually involves 40 to 60 openings across three floors and weight-and-pulley sashes that were never designed to come out." |
| "Quality windows at affordable prices." | "A double hung vinyl replacement in a standard opening runs roughly 650 to 1,100 dollars installed in this market. A wood clad unit in a historic district with an approved profile runs closer to 1,400 to 2,200." |
| "Transform your bathroom." | "A tub to shower conversion in a 5 by 8 bathroom, the standard footprint in a postwar cape, typically takes 5 to 9 days and runs 8,000 to 16,000 dollars depending on whether the plumbing moves." |
| "We use quality materials." | "Fiber cement holds paint 12 to 15 years in coastal exposure where vinyl fades. Vinyl costs roughly half as much installed and does not need repainting at all." |

### New England housing stock language

Copy must reference the actual building stock of the actual place. This is the primary differentiator against every competitor and against every AI-generated competitor site that will eventually appear. Use these vocabularies where they are true:

**Rhode Island.** Triple-deckers in Providence, Pawtucket, Central Falls, and Woonsocket. East Side Victorians and Colonial Revivals in Providence. Colonial-era and Federal housing in Newport, Bristol, and Wickford. Victorian summer cottages in Newport and Narragansett. Mill housing and worker row homes in the Blackstone Valley. Shingled coastal cottages in Westerly, Charlestown, Narragansett, and Little Compton. Postwar capes and ranches across Warwick, Cranston, and North Providence.

**Massachusetts.** Triple-deckers in Worcester, Springfield, Lowell, Lawrence, Somerville, Dorchester, and New Bedford. Garrison colonials and split levels across MetroWest and the North Shore suburbs. Cape Cod houses, both original and postwar reproduction, everywhere. Antique first period and Georgian housing in Essex County, Concord, Lexington, and Ipswich. Victorians in Springfield's McKnight district, Cambridge, and Newton. Farmhouses and center chimney colonials in Franklin, Hampshire, and western Worcester counties. Shingle style and salt-exposed coastal homes on Cape Cod, the South Shore, and the Islands. Brownstones and bowfronts in Boston's Back Bay and South End. Berkshire cottages and Greek Revival in Berkshire County.

**Connecticut.** Center chimney colonials and saltboxes throughout, many genuinely 18th century. Victorians in Hartford, New Haven, Norwich, and New London. Tudor revival, shingle style, and stone colonials in Fairfield County. Postwar capes and ranches in the Naugatuck Valley and the eastern part of the state. Long Island Sound coastal homes in New Haven, Middlesex, and New London counties. Mill worker housing in Willimantic, Putnam, and Danielson. Farmhouses and Greek Revival in Litchfield County and the Quiet Corner.

### State-specific references

Reference real state programs, codes, and authorities by name where accurate:

- Massachusetts: Mass Save, the Massachusetts State Building Code (780 CMR), the Stretch Energy Code and its municipal adoption, Massachusetts Historical Commission review, local historic district commissions.
- Connecticut: the Connecticut Green Bank, Energize CT, the Connecticut State Building Code, the State Historic Preservation Office, local historic district commissions.
- Rhode Island: Rhode Island Energy programs, the Rhode Island State Building Code (SBC-1), the Rhode Island Historical Preservation and Heritage Commission, the Coastal Resources Management Council for shoreline work.

Never invent a program name, a rebate amount, a code section, or a permit fee. If a figure is not verified, write the sentence without the figure.

### Voice

Write like a knowledgeable contractor explaining a job to a homeowner at the kitchen table. Direct, specific, unhurried, willing to say when something is not worth doing. Short sentences carry more authority than long ones. Numbers carry more authority than adjectives. Never exclamation points. Never rhetorical questions as headlines. Never second-person hype ("You deserve...").

## 9. SEO RULES

### Schema markup

Every page type gets structured data, built through `lib/schema.ts`, rendered by a component in `components/seo/`, never hand-written into a page.

| Page type | Schema |
|---|---|
| All pages | `Organization`, `WebSite` in root layout |
| Service hub | `Service`, `BreadcrumbList`, `FAQPage` when FAQs present |
| Sub-service | `Service`, `BreadcrumbList` |
| State hub | `CollectionPage`, `BreadcrumbList` |
| City hub | `CollectionPage`, `BreadcrumbList` |
| Service x city | `Service` with `areaServed`, `BreadcrumbList`, `FAQPage` |
| Blog post | `BlogPosting`, `BreadcrumbList` |
| Tool page | `SoftwareApplication`, `BreadcrumbList` |

**Do not emit `LocalBusiness` schema.** The site is not a local business with a physical location serving customers at that address. Emitting it is a misrepresentation and risks a manual action.

**Do not emit `Review` or `AggregateRating` schema** until real, verifiable, first-party reviews exist. The reviews currently in `content.ts` are marked placeholders. Marking up placeholder reviews as structured data is review fraud. This is not a judgment call.

### Canonical URLs

- Every page self-canonicals to its absolute URL built from `NEXT_PUBLIC_SITE_URL`.
- Trailing slash policy: trailing slash on, consistently, matching the URL structure in section 3.
- Lowercase only. No uppercase segments anywhere.
- Paginated blog pages self-canonical. Never canonical page 2 to page 1.
- A city page that is not live under the current phase must return a 404, not a redirect and not a soft 404 with a "coming soon" message.

### Meta description templates

Between 140 and 158 characters. Every one must contain a specific detail, not just the keyword. Never end with the brand name.

- Service hub: `{Service} across Rhode Island, Massachusetts, and Connecticut. {Specific technical or cost detail}. Free quotes, no obligation.`
- Sub-service: `{SubService} in RI, MA, and CT. {Specific detail about the work}. Compare quotes from contractors in your town.`
- State hub: `{Service list} contractors across {State}. Covering all {N} {municipalities/towns}. {State-specific detail}. Free quotes.`
- City hub: `Home improvement contractors in {City}, {ST}. {Housing stock detail from homeStyleNote}. Roofing, windows, siding, baths, kitchens, doors, gutters.`
- Service x city: `{Service} in {City}, {ST}. {Housing-stock-specific detail}. Typical range {cost band}. Free quotes from contractors who work in {County}.`
- Blog: first 150 characters of the post's own opening claim, never a generic summary.

### Robots and indexing

- Default: `index, follow`.
- `noindex, follow` on: internal search results, form thank-you pages, any tag or filter page with fewer than three items.
- `noindex` on nothing else. If a page is not worth indexing, it should not have been built.
- `robots.txt` allows all crawlers, disallows `/api/`, and points to the sitemap.
- Include an `llms.txt` at the root listing the service hubs, state hubs, and highest-value blog posts, for AI crawler discovery.

### Sitemap

Generated dynamically in `app/sitemap.ts`. Must respect `ACTIVE_PHASE`. Must include `lastModified`. Must not include noindexed pages. Once the total exceeds 10,000 URLs, split into a sitemap index by page type: services, locations, blog, tools.

## 10. INTERNAL LINKING SILO RULES

The link graph is the single highest-leverage SEO asset in a programmatic build. It is also the thing most likely to be broken by an inattentive edit. These rules are absolute.

**Service hub, `/services/roofing/`**
- Links down to all of its sub-service pages.
- Links down to its service x city pages for live cities, grouped by state, then by region. Never a flat list of 559 links. Group and collapse.
- Links across to the other six service hubs.
- Links to the three state hubs.
- Links to the three to five highest-priority blog posts tagged with this service.

**Sub-service page, `/services/roofing/roof-replacement/`**
- Links up to its parent service hub.
- Links across to sibling sub-services within the same category only.
- Links to relevant blog posts.
- Does not link directly to city pages. That path runs through the service hub.

**State hub, `/locations/massachusetts/`**
- Links down to every live city in that state, grouped by region, then county.
- Links across to the seven service hubs.
- Links to blog posts with `state: "MA"` or `state: "ALL"`.
- Links across to the other two state hubs.

**City hub, `/locations/rhode-island/providence/`**
- Links down to all seven of its service x city pages. This is the most important link block on the site.
- Links up to its state hub.
- Links laterally to three to six nearby cities, sourced from `nearbyTowns`. Only to cities that are live.
- Links to blog posts whose `relatedCitySlugs` include this city.

**Service x city page, `/locations/rhode-island/providence/roofing/`**
- Links up to its city hub.
- Links up to its service hub.
- Links laterally to the same service in three to six nearby towns.
- Links laterally to two or three other services in the same city.
- Links to one or two blog posts matching both the service and the state.

**Blog post**
- Links to its primary service hub in the first third of the post. Not in a footer block.
- Links to the relevant state hub.
- Links to two or three city pages where genuinely relevant.
- Links to two or three other posts.
- Links to a tool page when the post discusses cost.

**Universal rules**
- Never link to a city that is not live in the current phase. Every link must be filtered through `getLiveCities()`.
- Never generate a link block by looping over all cities without grouping and limiting.
- Anchor text is descriptive and varied. Never "click here." Never the same exact anchor repeated site-wide.
- No orphan pages. Every generated page must be reachable from at least two other pages.
- Breadcrumbs on every page below the homepage, matching the URL hierarchy exactly.

## 11. PAGE CONTENT RULES BY TYPE

Word counts are floors, not targets. Padding to hit a count produces the thin content this project is trying to beat.

**Homepage.** Hero with a claim that names the three states. Seven service cards. Why us, three points. Three state entry points. Placeholder reviews section. Final CTA with form. No word count target; density over length.

**Service hub, minimum 900 words.** What the service covers. How it differs across New England building stock, with named examples. Materials and options with real trade-offs, including cost differences. What drives price in this market. Timeline. Sub-service links with one-line descriptions. Six to eight FAQs answering real questions, marked up as `FAQPage`. Grouped links to city pages.

**Sub-service page, minimum 600 words.** Narrow and technical. What this specific work involves, when a homeowner needs it versus the alternative, what it costs in this market, how long it takes, what goes wrong when it is done badly.

**State hub, minimum 700 words.** The state's housing stock by region, named. State-specific programs, codes, and permitting realities. Regional weather exposure that drives demand. Grouped links to every live city. Links to all seven services.

**City hub, minimum 500 words of genuinely unique copy.** Opens with the Local Ledger. Then: this city's housing stock, specific, drawing on `homeStyleNote` but expanding well past it. Neighborhoods by name where they exist. What that stock means for each of the seven services. Permitting authority. Links to all seven service x city pages and to nearby towns.

**Service x city page, minimum 450 words of genuinely unique copy.** This is the deepest tier and the largest page count, which makes it the highest duplication risk on the site. The rule: at least 60 percent of the body must be specific to this city and this service combination and could not be pasted onto another city's page unchanged. Opens with the Local Ledger scoped to this service. Then: what this service means on this city's housing stock specifically, typical scope and cost range for this market, local permitting, three to four FAQs written for this combination.

**If you cannot write 450 genuinely specific words for a service x city combination, do not generate the page.** A missing page costs nothing. Four thousand near-duplicate pages cost the entire domain.

**Blog post, 1,200 to 2,000 words.** See section 12.

**Tool page.** Calculator above the fold. Explanation of the calculation and its assumptions below. Never present an estimate as a quote. Every output ends in a route to the lead form.

## 12. BLOG AUTOMATION

**Schedule.** Vercel cron, weekdays, `0 9 * * 1-5`, hitting `/api/cron/generate-post`. The route requires `CRON_SECRET` in an `Authorization` header and returns 401 without it. Five posts a week, roughly 250 a year against a 150-topic queue, so the queue needs replenishing at around week 30.

**Queue.** `lib/data/blog-topics.ts`, ordered by estimated traffic potential. The cron selects the highest-priority topic with `published: false`, generates, publishes to Sanity as a draft, and flips the flag. Never generate a topic already marked published. Never generate two posts on the same day.

**Model.** Gemini 2.5 Flash for the draft. The generation prompt must include: the banned words list, the no-em-dash rule, the referral-business constraints from section 8, the relevant `homeStyleNote` values for any cities in `relatedCitySlugs`, and the required internal links from section 10.

**Human review before publish.** Posts land in Sanity as drafts. Nothing auto-publishes to the live site. Cost figures, code references, and program names in a generated draft must be verified by a human before publish, because the model will invent plausible-sounding rebate amounts and permit fees.

**Topic order matters.** The queue is ordered by traffic potential for a reason. Location-feature listicles and New England-specific posts rank fastest on a new domain and are the posts most likely to be cited by AI search systems. Do not reorder the queue to "get variety."

## 13. PERFORMANCE TARGETS

Lighthouse, mobile, on a real deployed URL, not localhost:

| Metric | Target |
|---|---|
| Performance | 90+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| LCP | under 2.0s |
| CLS | under 0.05 |
| INP | under 200ms |
| Total JS, city page | under 120KB gzipped |

Rules that follow from this: `next/image` everywhere with explicit width and height, hero images `priority`, everything else lazy. AVIF and WebP. Self-hosted fonts through `next/font` with `display: swap`. No client-side JavaScript on a page that does not need interaction; a service x city page should ship close to zero. GA4 loaded with `next/script` at `afterInteractive`. No third-party chat widget, heat map, or tracking pixel without an explicit decision, because each one costs 10 to 20 Lighthouse points.

## 14. QUALITY PHILOSOPHY

This project succeeds or fails on one question: is each generated page worth existing?

Programmatic SEO has a well-earned bad reputation because most implementations answer that question with volume. They generate a template, swap a city name and a service name into eight slots, ship four thousand pages, and watch Google index six hundred of them and rank none. The 2024 and 2025 core updates were specifically effective at identifying scaled content with no independent value, and a domain that trips that classifier does not recover by trimming.

The defense is not "more words." The defense is that every page contains something true about that specific place that a template could not have produced. The Local Ledger enforces this structurally: a page cannot be published without real permitting authority, real housing stock, real ZIP codes, and a real cost range for that market. The `homeStyleNote` field enforces it in the copy. The 60 percent uniqueness rule on service x city pages enforces it in the body.

The phased rollout exists for the same reason. Rhode Island first, 39 municipalities, because if the model does not work on 39 pages it will not work on 559, and finding that out at 39 costs three weeks instead of a domain.

When a decision is close, choose fewer, better pages. When a shortcut is available that would generate content faster at lower specificity, do not take it, and say why in your response rather than taking it silently.

The competitive research in `docs/competitors.md` shows the bar here is low. The strongest competitor in a three-state, six-million-person market gets 3,000 organic visits a month. This is winnable with quality that would be unremarkable in a competitive vertical. It is not winnable with scaled thin content, because scaled thin content loses to nothing at all.
