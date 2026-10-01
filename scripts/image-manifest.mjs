/**
 * image-manifest.mjs
 *
 * The 27 image slots from docs/image-prompts.md, transcribed verbatim.
 *
 * Filenames, folders, aspect ratios, prompts, and alt text all come from that
 * document. Do not invent a slot here. Add it to docs/image-prompts.md first,
 * then transcribe it. See the rule at the top of that file.
 *
 * `ar` is the aspect ratio requested from the image model. `w` and `h` are the
 * final output dimensions. Where the two disagree, the processing step crops
 * to the final ratio. The model does not offer 2:1, so the blog slots are
 * generated at 16:9 and cropped.
 */

const SHARED_SUFFIX =
  " Muted colour grade, not orange and teal. No text, no lettering, no signage, no watermarks. No brand marks or manufacturer logos. No identifiable faces. No palm trees, no stucco, no adobe, no clay tile roofs, no desert planting, no attached three-car garage, no McMansion.";

export const IMAGE_SLOTS = [
  // ---------------------------------------------------------------- HERO (2)
  {
    name: "hero-desktop",
    folder: "hero",
    ar: "21:9",
    w: 2560,
    h: 1097,
    budgetKb: 250,
    priority: true,
    alt: "A street of triple deckers and colonial houses lined with maple trees in early autumn.",
    prompt:
      "A wide establishing photograph of a New England residential street in early autumn. In the left third, a three-story wooden triple decker with grey clapboard siding, a full-width covered porch on each floor, and a low-pitch roof over the rear ell. In the centre and right, older two-and-a-half story colonials and a Victorian with a steep 10:12 asphalt shingle roof and two brick chimneys. Mature maples with leaves beginning to turn, granite curbing along the sidewalk, narrow driveways, no garages. Overcast soft daylight, muted colour, slight haze. Documentary photography, natural perspective at eye level, no lens distortion, no people, no vehicles in the foreground. The right third of the frame must stay visually quiet and uncluttered.",
  },
  {
    name: "hero-mobile",
    folder: "hero",
    ar: "4:5",
    w: 1200,
    h: 1500,
    budgetKb: 250,
    priority: true,
    alt: "A three-story triple decker with stacked front porches seen from the sidewalk.",
    prompt:
      "A vertical photograph of a single New England triple decker seen from the sidewalk, three stories of grey clapboard with stacked covered porches, white trim, a brick chimney, and an asphalt shingle roof. A mature maple frames the left edge. Granite steps up from the sidewalk. Overcast soft daylight, muted colour. Documentary photography, eye level, no people.",
  },

  // ------------------------------------------------------- SERVICE HEROES (7)
  {
    name: "service-hero-roofing",
    folder: "services",
    ar: "16:9",
    w: 1920,
    h: 1080,
    alt: "A steep asphalt shingle roof with a brick chimney and step flashing on an older colonial house.",
    prompt:
      "A steep asphalt shingle roof on an older New England colonial house, photographed from across the street at roughly second floor height. Dark grey architectural shingles, a brick chimney with visible step flashing, a valley running between two roof planes, and a lower flat-roofed rear addition visible behind. Bare deciduous branches at the frame edge. Overcast light. Documentary photography, no people.",
  },
  {
    name: "service-hero-windows",
    folder: "services",
    ar: "16:9",
    w: 1920,
    h: 1080,
    alt: "Three double hung windows with flat casings on the clapboard wall of a nineteenth century house.",
    prompt:
      "A close exterior view of three double hung windows on the second floor of a nineteenth century New England house with white clapboard siding. Simple flat window casings, weathered white paint, wavy old glass reflecting bare trees. One window has a visible storm sash. Soft overcast light, muted colour. Architectural documentary photography, straight on, no people.",
  },
  {
    name: "service-hero-siding",
    folder: "services",
    ar: "16:9",
    w: 1920,
    h: 1080,
    alt: "Weathered grey cedar shingle siding meeting white corner trim, with newer shingles showing the colour difference.",
    prompt:
      "A detail photograph of the corner of a New England house where cedar shingle siding weathered to silver grey meets white painted corner trim. Individual shingle courses visible with irregular weathering, a section of newer unweathered shingle nearby showing the colour difference. Soft overcast light. Macro architectural photography, shallow depth of field, no people.",
  },
  {
    name: "service-hero-bathroom-remodeling",
    folder: "services",
    ar: "16:9",
    w: 1920,
    h: 1080,
    alt: "A compact bathroom with a white subway tile walk-in shower and a double hung window with a deep sill.",
    prompt:
      "A small finished bathroom in an older New England house, roughly five feet by eight feet. A white subway tile walk-in shower with a low threshold and a clear glass panel, a simple white vanity, hexagonal mosaic floor tile, and a single double hung window with a deep sill and painted wood trim. Daylight from the window, no artificial staging, no towels arranged decoratively. Interior architectural photography, wide angle without distortion, no people.",
  },
  {
    name: "service-hero-kitchen-remodeling",
    folder: "services",
    ar: "16:9",
    w: 1920,
    h: 1080,
    alt: "A renovated kitchen with sage green shaker cabinets, a farmhouse sink, and a plastered chimney chase.",
    prompt:
      "A renovated kitchen in an older New England house. Shaker cabinets painted a muted sage green, honed stone countertops, a farmhouse sink under a double hung window, wide plank wood floors, and a plastered chimney chase visible at one end of the room. Daylight from the window. Interior architectural photography, natural composition, no people, no branded appliances visible.",
  },
  {
    name: "service-hero-entry-doors",
    folder: "services",
    ar: "16:9",
    w: 1920,
    h: 1080,
    alt: "A green six panel front door with a transom above, set in white clapboard with granite steps.",
    prompt:
      "The front entry of a New England Federal style house. A six panel painted wood door in deep green with a rectangular transom above, flanked by simple pilasters, set in white clapboard. Granite steps up to the threshold, a boot scraper set into the stone, brass hardware with visible patina. Overcast light. Architectural documentary photography, straight on, no people.",
  },
  {
    name: "service-hero-gutters",
    folder: "services",
    ar: "16:9",
    w: 1920,
    h: 1080,
    alt: "White K-style gutter and downspout along the eave of a house, with wet oak leaves caught in the trough.",
    prompt:
      "A detail of white aluminium K-style gutter along the eave of a New England house, with a downspout turning down the corner. Asphalt shingle roof edge with drip edge visible above, white fascia, grey clapboard siding below. A few wet oak leaves caught in the gutter. Overcast light after rain, water beading on the surfaces. Architectural detail photography, no people.",
  },

  // -------------------------------------------------------- SERVICE CARDS (7)
  {
    name: "card-roofing",
    folder: "service-cards",
    ar: "3:2",
    w: 900,
    h: 600,
    budgetKb: 120,
    alt: "Dark grey architectural shingles on a steep roof beside a brick chimney.",
    prompt:
      "A section of dark grey architectural asphalt shingles on a steep roof, photographed at an angle, with a brick chimney and step flashing entering the frame at the right. Overcast light, muted colour, no people.",
  },
  {
    name: "card-windows",
    folder: "service-cards",
    ar: "3:2",
    w: 900,
    h: 600,
    budgetKb: 120,
    alt: "A white double hung window with flat casing on grey clapboard siding.",
    prompt:
      "A single white double hung window with simple flat casing on grey clapboard siding, photographed straight on. Old glass with a slight ripple. Soft overcast light, no people.",
  },
  {
    name: "card-siding",
    folder: "service-cards",
    ar: "3:2",
    w: 900,
    h: 600,
    budgetKb: 120,
    alt: "Overlapping courses of silver grey weathered cedar shingle siding.",
    prompt:
      "Overlapping courses of cedar shingle siding weathered to silver grey, photographed straight on and filling the frame. Natural variation between shingles. Soft overcast light, no people.",
  },
  {
    name: "card-bathroom-remodeling",
    folder: "service-cards",
    ar: "3:2",
    w: 900,
    h: 600,
    budgetKb: 120,
    alt: "A white subway tile shower wall with a chrome fixture and a low threshold.",
    prompt:
      "A white subway tile shower wall with a chrome fixture and a low tiled threshold, photographed straight on in a small bathroom. Daylight, no staging, no people.",
  },
  {
    name: "card-kitchen-remodeling",
    folder: "service-cards",
    ar: "3:2",
    w: 900,
    h: 600,
    budgetKb: 120,
    alt: "A corner of sage green shaker cabinets with a honed stone countertop.",
    prompt:
      "A corner of a kitchen with muted sage green shaker cabinets, honed stone countertop, and a simple brass pull. Daylight from the side, no people, no branded appliances.",
  },
  {
    name: "card-entry-doors",
    folder: "service-cards",
    ar: "3:2",
    w: 900,
    h: 600,
    budgetKb: 120,
    alt: "A deep green six panel wood front door with brass hardware.",
    prompt:
      "A deep green six panel wood front door with brass hardware, set in white painted trim, photographed straight on. Overcast light, no people.",
  },
  {
    name: "card-gutters",
    folder: "service-cards",
    ar: "3:2",
    w: 900,
    h: 600,
    budgetKb: 120,
    alt: "A white gutter and downspout corner against grey clapboard siding.",
    prompt:
      "A white aluminium gutter and the corner turn of a downspout against grey clapboard siding, photographed from below at an angle. Overcast light after rain, no people.",
  },

  // ----------------------------------------------------------------- ABOUT (1)
  {
    name: "about-jobsite",
    folder: "about",
    ar: "3:2",
    w: 1600,
    h: 1067,
    alt: "A contractor seen from behind looking up at the roof of an older clapboard house from the front lawn.",
    prompt:
      "A contractor on a residential job site in New England, seen from behind and at a distance, standing on the ground and looking up at the roof of an older two-and-a-half story clapboard house. Work truck with a ladder rack parked at the kerb, an extension ladder against the eave, a tarp on the lawn. Mature oak trees, granite curbing. Overcast morning light, muted colour. Documentary photography, no visible face, no readable logos on the truck or clothing.",
  },

  // ------------------------------------------------------- BLOG FEATURED (7)
  // The model does not offer 2:1. Generated at 16:9 and cropped in processing.
  {
    name: "blog-roofing",
    folder: "blog",
    ar: "16:9",
    w: 1600,
    h: 800,
    alt: "An ice dam with icicles built up along the snow-covered eave of an older house.",
    prompt:
      "The roofline of an older New England house in winter, snow on the asphalt shingles, an ice dam with icicles built up along the eave, meltwater staining below. Bare branches against a flat grey sky. Documentary photography, muted colour, no people.",
  },
  {
    name: "blog-windows",
    folder: "blog",
    ar: "16:9",
    w: 1600,
    h: 800,
    alt: "An old double hung window with condensation and frost at the corners of the glass.",
    prompt:
      "Interior view of an old double hung window on a winter morning, condensation on the lower sash, frost at the corners of the glass, a deep painted sill, and a bare tree visible outside. Soft window light, muted colour, no people.",
  },
  {
    name: "blog-siding",
    folder: "blog",
    ar: "16:9",
    w: 1600,
    h: 800,
    alt: "Cracked and lifting paint on wood clapboard siding with bare weathered wood showing through.",
    prompt:
      "A detail of failing paint on wood clapboard siding, cracked and lifting in places with bare weathered wood showing through, alongside a section of intact paint. Soft overcast light, muted colour, no people.",
  },
  {
    name: "blog-bathroom-remodeling",
    folder: "blog",
    ar: "16:9",
    w: 1600,
    h: 800,
    alt: "A small bathroom mid-renovation with exposed studs and an old cast iron tub removed.",
    prompt:
      "A small bathroom mid-renovation in an older house, studs and old board sheathing exposed on one wall, a cast iron tub removed and sitting on the floor, dust sheeting, daylight from a single window. Documentary photography, no people.",
  },
  {
    name: "blog-kitchen-remodeling",
    folder: "blog",
    ar: "16:9",
    w: 1600,
    h: 800,
    alt: "A kitchen mid-renovation with an exposed brick chimney chase and plaster and lath walls.",
    prompt:
      "A kitchen mid-renovation in an older house, cabinets removed, an exposed brick chimney chase, old plaster and lath visible on one wall, wide plank subfloor, daylight from two windows. Documentary photography, no people.",
  },
  {
    name: "blog-entry-doors",
    folder: "blog",
    ar: "16:9",
    w: 1600,
    h: 800,
    alt: "A worn painted front door with peeling paint at the bottom rail and a weathered brass knob.",
    prompt:
      "A worn painted wood front door on an older New England house, paint checked and peeling near the bottom rail, a weathered brass knob, granite step below with visible wear. Overcast light, no people.",
  },
  {
    name: "blog-gutters",
    folder: "blog",
    ar: "16:9",
    w: 1600,
    h: 800,
    alt: "A gutter overflowing in heavy rain with wet oak leaves packed in the trough.",
    prompt:
      "A gutter overflowing in heavy rain at the corner of an older house, water sheeting over the front edge, wet oak leaves packed in the trough, splashing on the ground below. Grey rainy light, no people.",
  },

  // ------------------------------------------------------------- TRUST (3)
  {
    name: "trust-pricing",
    folder: "trust",
    ar: "1:1",
    w: 800,
    h: 800,
    budgetKb: 120,
    alt: "A folded paper estimate on a wooden surface with a carpenter's pencil and tape measure.",
    prompt:
      "A close overhead view of a folded paper estimate on a worn wooden work surface, handwritten figures partly visible but not legible, a carpenter's pencil and a retractable tape measure beside it. Soft window light from one side, muted colour. Still life documentary photography, no people, no readable text.",
  },
  {
    name: "trust-response",
    folder: "trust",
    ar: "1:1",
    w: 800,
    h: 800,
    budgetKb: 120,
    alt: "A work truck with a loaded ladder rack parked outside an older clapboard house in early morning.",
    prompt:
      "A work truck parked at the kerb outside an older New England clapboard house in early morning, ladder rack loaded, back doors open. Long low light, dew on the grass, mature trees. Documentary photography, no people, no readable logos on the truck.",
  },
  {
    name: "trust-coverage",
    folder: "trust",
    ar: "1:1",
    w: 800,
    h: 800,
    budgetKb: 120,
    alt: "A mossy fieldstone wall running along the edge of a country road lined with maples.",
    prompt:
      "A New England fieldstone wall running along the edge of a country road, mossy granite stones stacked without mortar, mature maples behind it, the road curving out of frame. Overcast autumn light, muted colour. Landscape documentary photography, no people, no signage.",
  },
];

export function fullPrompt(slot) {
  return slot.prompt + SHARED_SUFFIX;
}

export const EXPECTED_SLOT_COUNT = 27;
