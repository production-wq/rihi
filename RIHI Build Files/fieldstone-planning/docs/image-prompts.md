# image-prompts.md

Every image slot on the site. Read this file at the start of every session, alongside `CLAUDE.md` and `docs/competitors.md`.

**Rule: do not invent filenames.** If a component needs an image that is not in this file, stop and add the slot here first, with a prompt and a folder path. A referenced file that does not exist breaks the build. A generated file that nothing references is wasted work.

**Total slots: 41.**

---

## GENERATION SETTINGS

- **Model:** Gemini Imagen. Generate at the largest available size, then downscale.
- **Output pipeline:** generate to PNG, convert to AVIF plus WebP with a JPEG fallback, and serve through `next/image` with explicit width and height. Never ship the raw PNG.
- **Budget:** hero images under 250KB in AVIF. All others under 120KB.
- **Naming:** exactly the filename given. Lowercase, hyphenated, no spaces.

## RULES THAT APPLY TO EVERY PROMPT

**Architecture must be authentically New England.** The single most common failure is a generic beige suburban two-story with an attached three-car garage, a stone-veneer water table, and a palm-adjacent landscape. That house does not exist in Rhode Island, Massachusetts, or Connecticut. Every prompt below names a specific regional building type. Do not soften them.

Specifically banned from every image: McMansions, attached three-car garages, stucco, adobe, red clay tile roofs, palm trees, desert or southwestern landscaping, HOA-style cul-de-sac streetscapes, Pacific Northwest cedar-and-glass contemporaries, and southern wraparound porches with columns.

**Required regional signals**, use at least two per exterior image: mature deciduous trees, specifically oak and maple; fieldstone walls; clapboard or cedar shingle siding; asphalt shingle roofs at a real pitch, 6:12 to 12:12; brick chimneys, often more than one; narrow side yards in urban images; granite curbing or granite steps; overcast or low-angle light.

**No identifiable people.** Where a person is required, frame from behind or at a distance, no visible face.

**No brand marks.** No manufacturer logos on shingle bundles, siding wrap, trucks, or equipment. No visible street signs or house numbers that read as a real address.

**No text.** Image models render text badly and it dates the asset.

**Light.** Overcast, early morning, or late afternoon. Avoid high-contrast midday sun and avoid the orange-teal grade that makes an image read as stock.

**Alt text.** Every prompt below carries the alt text to use. Alt text describes the image. It is never keyword-stuffed. See CLAUDE.md section 7.

---

## 1. HERO IMAGES (2)

**Folder:** `/public/images/hero/`

### 1.1 `hero-desktop`
- **Aspect ratio:** 21:9, render 2560x1097
- **Used on:** homepage hero, full-bleed behind the transparent header
- **Prompt:** A wide establishing photograph of a New England residential street in early autumn. In the left third, a three-story wooden triple decker with grey clapboard siding, a full-width covered porch on each floor, and a low-pitch roof over the rear ell. In the centre and right, older two-and-a-half story colonials and a Victorian with a steep 10:12 asphalt shingle roof and two brick chimneys. Mature maples with leaves beginning to turn, granite curbing along the sidewalk, narrow driveways, no garages. Overcast soft daylight, muted colour, slight haze. Documentary photography, natural perspective at eye level, no lens distortion, no people, no vehicles in the foreground.
- **Alt text:** A street of triple deckers and colonial houses lined with maple trees in early autumn.
- **Note:** The right third must stay visually quiet. Headline and form sit over it.

### 1.2 `hero-mobile`
- **Aspect ratio:** 4:5, render 1200x1500
- **Used on:** homepage hero below 768px
- **Prompt:** A vertical photograph of a single New England triple decker seen from the sidewalk, three stories of grey clapboard with stacked covered porches, white trim, a brick chimney, and an asphalt shingle roof. A mature maple frames the left edge. Granite steps up from the sidewalk. Overcast soft daylight, muted colour. Documentary photography, eye level, no people, no text.
- **Alt text:** A three-story triple decker with stacked front porches seen from the sidewalk.
- **Note:** Not a crop of the desktop hero. A vertical frame needs a vertical subject.

---

## 2. SERVICE HERO IMAGES (7)

**Folder:** `/public/images/services/`
**Aspect ratio:** 16:9, render 1920x1080
**Used on:** the hero band of each `/services/[service]/` page

### 2.1 `service-hero-roofing`
- **Prompt:** A steep asphalt shingle roof on an older New England colonial house, photographed from across the street at roughly second floor height. Dark grey architectural shingles, a brick chimney with visible step flashing, a valley running between two roof planes, and a lower flat-roofed rear addition visible behind. Bare deciduous branches at the frame edge. Overcast light. Documentary photography, no people, no logos.
- **Alt text:** A steep asphalt shingle roof with a brick chimney and step flashing on an older colonial house.

### 2.2 `service-hero-windows`
- **Prompt:** A close exterior view of three double hung windows on the second floor of a nineteenth century New England house with white clapboard siding. Simple flat window casings, weathered white paint, wavy old glass reflecting bare trees. One window has a visible storm sash. Soft overcast light, muted colour. Architectural documentary photography, straight on, no people.
- **Alt text:** Three double hung windows with flat casings on the clapboard wall of a nineteenth century house.

### 2.3 `service-hero-siding`
- **Prompt:** A detail photograph of the corner of a New England house where cedar shingle siding weathered to silver grey meets white painted corner trim. Individual shingle courses visible with irregular weathering, a section of newer unweathered shingle nearby showing the colour difference. Soft overcast light. Macro architectural photography, shallow depth of field, no people, no logos.
- **Alt text:** Weathered grey cedar shingle siding meeting white corner trim, with newer shingles showing the colour difference.

### 2.4 `service-hero-bathroom-remodeling`
- **Prompt:** A small finished bathroom in an older New England house, roughly five feet by eight feet. A white subway tile walk-in shower with a low threshold and a clear glass panel, a simple white vanity, hexagonal mosaic floor tile, and a single double hung window with a deep sill and painted wood trim. Daylight from the window, no artificial staging, no towels arranged decoratively. Interior architectural photography, wide angle without distortion, no people.
- **Alt text:** A compact bathroom with a white subway tile walk-in shower and a double hung window with a deep sill.

### 2.5 `service-hero-kitchen-remodeling`
- **Prompt:** A renovated kitchen in an older New England house. Shaker cabinets painted a muted sage green, honed stone countertops, a farmhouse sink under a double hung window, wide plank wood floors, and a plastered chimney chase visible at one end of the room. Daylight from the window. Interior architectural photography, natural composition, no people, no branded appliances visible.
- **Alt text:** A renovated kitchen with sage green shaker cabinets, a farmhouse sink, and a plastered chimney chase.

### 2.6 `service-hero-entry-doors`
- **Prompt:** The front entry of a New England Federal style house. A six panel painted wood door in deep green with a rectangular transom above, flanked by simple pilasters, set in white clapboard. Granite steps up to the threshold, a boot scraper set into the stone, brass hardware with visible patina. Overcast light. Architectural documentary photography, straight on, no people.
- **Alt text:** A green six panel front door with a transom above, set in white clapboard with granite steps.

### 2.7 `service-hero-gutters`
- **Prompt:** A detail of white aluminium K-style gutter along the eave of a New England house, with a downspout turning down the corner. Asphalt shingle roof edge with drip edge visible above, white fascia, grey clapboard siding below. A few wet oak leaves caught in the gutter. Overcast light after rain, water beading on the surfaces. Architectural detail photography, no people, no logos.
- **Alt text:** White K-style gutter and downspout along the eave of a house, with wet oak leaves caught in the trough.

---

## 3. SERVICE CARD IMAGES (7)

**Folder:** `/public/images/service-cards/`
**Aspect ratio:** 3:2, render 900x600
**Used on:** the seven homepage service cards and the `/services/` index grid

These are deliberately tighter and simpler than the service heroes. At card size a wide scene turns to mush. Each one is a single legible object or detail.

| Filename | Prompt | Alt text |
|---|---|---|
| `card-roofing` | A section of dark grey architectural asphalt shingles on a steep roof, photographed at an angle, with a brick chimney and step flashing entering the frame at the right. Overcast light, muted colour, no people, no logos. | Dark grey architectural shingles on a steep roof beside a brick chimney. |
| `card-windows` | A single white double hung window with simple flat casing on grey clapboard siding, photographed straight on. Old glass with a slight ripple. Soft overcast light, no people. | A white double hung window with flat casing on grey clapboard siding. |
| `card-siding` | Overlapping courses of cedar shingle siding weathered to silver grey, photographed straight on and filling the frame. Natural variation between shingles. Soft overcast light, no people. | Overlapping courses of silver grey weathered cedar shingle siding. |
| `card-bathroom-remodeling` | A white subway tile shower wall with a chrome fixture and a low tiled threshold, photographed straight on in a small bathroom. Daylight, no staging, no people. | A white subway tile shower wall with a chrome fixture and a low threshold. |
| `card-kitchen-remodeling` | A corner of a kitchen with muted sage green shaker cabinets, honed stone countertop, and a simple brass pull. Daylight from the side, no people, no branded appliances. | A corner of sage green shaker cabinets with a honed stone countertop. |
| `card-entry-doors` | A deep green six panel wood front door with brass hardware, set in white painted trim, photographed straight on. Overcast light, no people. | A deep green six panel wood front door with brass hardware. |
| `card-gutters` | A white aluminium gutter and the corner turn of a downspout against grey clapboard siding, photographed from below at an angle. Overcast light after rain, no people, no logos. | A white gutter and downspout corner against grey clapboard siding. |

---

## 4. GALLERY IMAGES (14)

**Folder:** `/public/images/gallery/`
**Aspect ratio:** 4:3, render 1200x900
**Used on:** `/gallery/`, and in the relevant service hub galleries

Two per service. Each pair shows completed work on a genuinely different New England building type, so the gallery reads as regional range rather than seven versions of the same house.

**Important.** These are illustrative renderings of finished work, not photographs of projects this business performed. Do not caption them as completed projects, do not attach a town name implying a real job, and replace them with real contractor photography as soon as it is available. The gallery placeholder copy in `content.ts` says exactly this.

### Roofing
- **`gallery-roofing-triple-decker`**
  A completed asphalt shingle roof on a three-story New England triple decker, photographed from across the street. New dark grey architectural shingles on the main roof, a visible lower flat roof section over the rear ell, three stacked porches on the front, grey clapboard siding. Narrow side yard, neighbouring house close by. Overcast light, no people.
  *Alt: A three-story triple decker with a newly shingled roof and a lower flat roof over the rear ell.*
- **`gallery-roofing-cape-cod`**
  A completed roof on a Cape Cod style house, one and a half stories, low eaves, two shed dormers, weathered cedar shingle siding, new charcoal asphalt shingles, a central brick chimney. Sandy soil and scrub pine at the edges. Overcast coastal light, no people.
  *Alt: A Cape Cod house with two shed dormers and a newly shingled charcoal roof.*

### Windows
- **`gallery-windows-victorian`**
  The facade of a New England Victorian with newly installed double hung windows, tall narrow openings with decorative headers, a bay window on the first floor, painted trim in two colours. Mature maple to one side. Overcast light, no people.
  *Alt: A Victorian house facade with newly installed tall double hung windows and a first floor bay.*
- **`gallery-windows-colonial`**
  The front of a centre chimney colonial with twelve-over-twelve style double hung windows in white clapboard, five windows across the second floor and two flanking a central door below. A fieldstone wall in the foreground. Overcast light, no people.
  *Alt: A centre chimney colonial with new twelve-over-twelve style windows and a fieldstone wall in front.*

### Siding
- **`gallery-siding-coastal-cottage`**
  A shingled coastal cottage with newly installed cedar shingle siding still light in colour, white trim, a screened porch, and beach grass and a weathered fence in the foreground. Flat grey coastal light, no people.
  *Alt: A coastal cottage with newly installed cedar shingle siding and a screened porch, beach grass in front.*
- **`gallery-siding-farmhouse`**
  A New England farmhouse with new white fiber cement lap siding and black shutters, a wide ell running off the back, a stone foundation, and a barn partly visible behind. Bare trees and open field. Overcast light, no people.
  *Alt: A farmhouse with new white lap siding and black shutters, with a rear ell and a barn behind.*

### Bathrooms
- **`gallery-bathroom-tub-to-shower`**
  A finished tub to shower conversion in a small bathroom, white subway tile to the ceiling, a low tiled curb, a clear glass panel, a recessed niche, and a chrome rain head. A small double hung window with painted trim at the end wall. Daylight, no people, no staging.
  *Alt: A tub to shower conversion with white subway tile, a low curb, and a recessed niche.*
- **`gallery-bathroom-walk-in`**
  A finished barrier free walk-in shower with large format grey tile, a linear drain, a folding bench, and a grab bar, in a bathroom with wide plank floors and a painted wood door. Daylight from a side window, no people.
  *Alt: A barrier free walk-in shower with grey tile, a linear drain, a bench, and a grab bar.*

### Kitchens
- **`gallery-kitchen-triple-decker`**
  A renovated kitchen in a working class New England multi-family, compact, with white shaker cabinets, a butcher block counter, open shelving on one wall, and a double hung window over the sink looking onto a close neighbouring house. Daylight, no people.
  *Alt: A compact renovated kitchen with white shaker cabinets and a window looking onto a close neighbouring house.*
- **`gallery-kitchen-colonial`**
  A renovated kitchen in an older colonial, with a large plastered chimney chase in the middle of one wall, cabinets built around it, soapstone counters, wide plank floors, and exposed hand-hewn ceiling beams. Daylight from two windows, no people.
  *Alt: A renovated colonial kitchen with cabinets built around a plastered chimney chase and exposed beams.*

### Entry Doors
- **`gallery-door-federal`**
  A newly installed Federal style entry, a black painted six panel door with a fanlight above and sidelights either side, set in white clapboard with granite steps. Overcast light, no people.
  *Alt: A black Federal style entry door with a fanlight and sidelights, set in white clapboard.*
- **`gallery-door-ranch`**
  A newly installed fibreglass entry door with a half-light on a mid-century New England ranch, brick veneer to one side, painted wood siding to the other, a simple concrete stoop, foundation shrubs. Overcast light, no people.
  *Alt: A new half-light fibreglass entry door on a mid-century ranch with brick and painted siding.*

### Gutters
- **`gallery-gutters-victorian`**
  Newly installed white seamless gutter running along the complex roofline of a New England Victorian, following a change in roof plane, with a downspout at the corner. Decorative brackets and painted trim visible. Overcast light, no people, no logos.
  *Alt: New white seamless gutter following the complex roofline of a Victorian house.*
- **`gallery-gutters-colonial`**
  Newly installed white six inch gutter along the long eave of a colonial with a steep roof, a downspout at each end, dark grey shingles above and white clapboard below, wet from recent rain. Overcast light, no people, no logos.
  *Alt: New white six inch gutter along the long eave of a colonial house after rain.*

---

## 5. ABOUT PAGE IMAGE (1)

**Folder:** `/public/images/about/`

### 5.1 `about-jobsite`
- **Aspect ratio:** 3:2, render 1600x1067
- **Used on:** `/about/`
- **Prompt:** A contractor on a residential job site in New England, seen from behind and at a distance, standing on the ground and looking up at the roof of an older two-and-a-half story clapboard house. Work truck with a ladder rack parked at the kerb, an extension ladder against the eave, a tarp on the lawn. Mature oak trees, granite curbing. Overcast morning light, muted colour. Documentary photography, no visible face, no readable logos on the truck or clothing.
- **Alt text:** A contractor seen from behind looking up at the roof of an older clapboard house from the front lawn.
- **Note:** From behind, at a distance, no face. See the rules at the top of this file.

---

## 6. BLOG FEATURED IMAGES (7)

**Folder:** `/public/images/blog/`
**Aspect ratio:** 2:1, render 1600x800
**Used on:** blog cards and post headers, one per service category, selected from the post's primary `relatedServiceSlugs` entry

These are more atmospheric and less product-focused than the service images, because they sit above written guides rather than selling a service.

| Filename | Prompt | Alt text |
|---|---|---|
| `blog-roofing` | The roofline of an older New England house in winter, snow on the asphalt shingles, an ice dam with icicles built up along the eave, meltwater staining below. Bare branches against a flat grey sky. Documentary photography, muted colour, no people. | An ice dam with icicles built up along the snow-covered eave of an older house. |
| `blog-windows` | Interior view of an old double hung window on a winter morning, condensation on the lower sash, frost at the corners of the glass, a deep painted sill, and a bare tree visible outside. Soft window light, muted colour, no people. | An old double hung window with condensation and frost at the corners of the glass. |
| `blog-siding` | A detail of failing paint on wood clapboard siding, cracked and lifting in places with bare weathered wood showing through, alongside a section of intact paint. Soft overcast light, muted colour, no people. | Cracked and lifting paint on wood clapboard siding with bare weathered wood showing through. |
| `blog-bathroom-remodeling` | A small bathroom mid-renovation in an older house, studs and old board sheathing exposed on one wall, a cast iron tub removed and sitting on the floor, dust sheeting, daylight from a single window. Documentary photography, no people. | A small bathroom mid-renovation with exposed studs and an old cast iron tub removed. |
| `blog-kitchen-remodeling` | A kitchen mid-renovation in an older house, cabinets removed, an exposed brick chimney chase, old plaster and lath visible on one wall, wide plank subfloor, daylight from two windows. Documentary photography, no people. | A kitchen mid-renovation with an exposed brick chimney chase and plaster and lath walls. |
| `blog-entry-doors` | A worn painted wood front door on an older New England house, paint checked and peeling near the bottom rail, a weathered brass knob, granite step below with visible wear. Overcast light, no people. | A worn painted front door with peeling paint at the bottom rail and a weathered brass knob. |
| `blog-gutters` | A gutter overflowing in heavy rain at the corner of an older house, water sheeting over the front edge, wet oak leaves packed in the trough, splashing on the ground below. Grey rainy light, no people, no logos. | A gutter overflowing in heavy rain with wet oak leaves packed in the trough. |

---

## 7. TRUST SECTION IMAGES (3)

**Folder:** `/public/images/trust/`
**Aspect ratio:** 1:1, render 800x800
**Used on:** the three "why start here" points on the homepage

Square, quiet, and abstract enough to sit behind text without competing. Each one has to earn its place next to its specific claim.

### 7.1 `trust-pricing`
- **Pairs with:** "We publish the numbers"
- **Prompt:** A close overhead view of a folded paper estimate on a worn wooden work surface, handwritten figures partly visible but not legible, a carpenter's pencil and a retractable tape measure beside it. Soft window light from one side, muted colour. Still life documentary photography, no people, no readable text, no logos.
- **Alt text:** A folded paper estimate on a wooden surface with a carpenter's pencil and tape measure.

### 7.2 `trust-response`
- **Pairs with:** "You hear back the same day"
- **Prompt:** A work truck parked at the kerb outside an older New England clapboard house in early morning, ladder rack loaded, back doors open. Long low light, dew on the grass, mature trees. Documentary photography, no people, no readable logos on the truck.
- **Alt text:** A work truck with a loaded ladder rack parked outside an older clapboard house in early morning.

### 7.3 `trust-coverage`
- **Pairs with:** "All three states, all seven services"
- **Prompt:** A New England fieldstone wall running along the edge of a country road, mossy granite stones stacked without mortar, mature maples behind it, the road curving out of frame. Overcast autumn light, muted colour. Landscape documentary photography, no people, no signage.
- **Alt text:** A mossy fieldstone wall running along the edge of a country road lined with maples.

---

## SLOT SUMMARY

| Section | Count | Folder |
|---|---|---|
| Hero | 2 | `/public/images/hero/` |
| Service heroes | 7 | `/public/images/services/` |
| Service cards | 7 | `/public/images/service-cards/` |
| Gallery | 14 | `/public/images/gallery/` |
| About | 1 | `/public/images/about/` |
| Blog featured | 7 | `/public/images/blog/` |
| Trust | 3 | `/public/images/trust/` |
| **Total** | **41** | |

## POST-GENERATION CHECKLIST

Run this on every generated image before it goes in the repo. Rejecting and regenerating is cheap. A single McMansion on the homepage undercuts the entire regional positioning the copy is built on.

- [ ] Is the architecture actually a New England building type, or a generic suburban house?
- [ ] Is the roof pitch plausible, 6:12 or steeper on anything pitched?
- [ ] At least two regional signals present, per the rules at the top?
- [ ] No palms, stucco, clay tile, adobe, or desert planting?
- [ ] No attached three-car garage?
- [ ] No identifiable faces?
- [ ] No brand marks, logos, or readable text anywhere in frame?
- [ ] Light is overcast or low-angle, not harsh midday?
- [ ] Colour is muted, not the orange-and-teal stock grade?
- [ ] Correct filename and folder, exactly as specified?
- [ ] Exported to AVIF and WebP, within the size budget?
- [ ] Alt text copied verbatim from this file into the component?
