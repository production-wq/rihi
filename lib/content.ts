/**
 * content.ts
 *
 * Every word of site-wide copy. Single source of truth.
 *
 * RULES ENFORCED IN THIS FILE, see CLAUDE.md section 8:
 *   - No em dashes anywhere.
 *   - No banned words.
 *   - Nothing claiming the business is licensed, insured, bonded, or that it
 *     employs trades. This is a lead generation and referral operation.
 *   - No years in business, no project counts, no manufacturer certifications,
 *     no warranty offers.
 *   - Brand name appears exactly once, in SITE.brandName. Never hardcode it.
 */

export const SITE = {
  /** PLACEHOLDER brand name. Change here and nowhere else. */
  brandName: "Fieldstone Home Improvement",
  brandShort: "Fieldstone",
  tagline: "Home improvement contractors across Rhode Island, Massachusetts, and Connecticut",
  phone: "",
  email: "",
} as const;

/* ---------------------------------------------------------------------------
 * HOMEPAGE
 * ------------------------------------------------------------------------- */

export const HOME = {
  hero: {
    eyebrow: "RI  ·  MA  ·  CT",
    headline: "Your house was built in 1912. Get quotes from people who know what that means.",
    subheadline:
      "Roofing, windows, siding, baths, kitchens, doors, and gutters across all 559 cities and towns in Rhode Island, Massachusetts, and Connecticut. Tell us about the project and we will match it with contractors who work in your town. Free, and there is no obligation to hire anyone.",
    primaryCta: "Get free quotes",
    secondaryCta: "Browse services",
  },

  /**
   * Trust bar. Four items, all true for a referral operation with no history.
   * Deliberately NOT: licensed, insured, years in business, projects completed.
   */
  trustBar: [
    {
      label: "All 559 cities and towns",
      detail: "Every municipality in RI, MA, and CT",
    },
    {
      label: "Seven service categories",
      detail: "Exteriors and interiors, one place",
    },
    {
      label: "Free quotes, no obligation",
      detail: "Compare and walk away if you want",
    },
    {
      label: "Contractors vetted before referral",
      detail: "We check credentials before anyone calls you",
    },
  ],

  services: {
    headline: "Seven things people call us about",
    subheadline:
      "Most contractors in this region do exteriors or interiors, not both. Here you can handle the roof this year and the bathroom next year without starting over.",
  },

  serviceCards: [
    {
      slug: "roofing",
      title: "Roofing",
      blurb:
        "Replacement, repair, storm damage, and ice dams. On a house built before 1950 the sheathing is often board rather than plywood, which changes the number.",
    },
    {
      slug: "windows",
      title: "Windows",
      blurb:
        "A cape has 12 to 16 openings. A triple decker has 40 to 60 across three floors. Those are different projects with different economics.",
    },
    {
      slug: "siding",
      title: "Siding",
      blurb:
        "Vinyl, fiber cement, composite, and cedar. What is behind the siding usually matters more than what goes on top of it.",
    },
    {
      slug: "bathroom-remodeling",
      title: "Bathrooms",
      blurb:
        "Tub to shower conversions, walk-in showers, and full remodels. Whether the plumbing moves is the single largest cost variable.",
    },
    {
      slug: "kitchen-remodeling",
      title: "Kitchens",
      blurb:
        "Refacing, countertops, and full remodels. In a pre-1940 house the wall you want to remove is often carrying the floor above it.",
    },
    {
      slug: "entry-doors",
      title: "Entry Doors",
      blurb:
        "Front doors, sliders, and storm doors. In an older house the opening is rarely standard and the jamb is rarely plumb.",
    },
    {
      slug: "gutters",
      title: "Gutters",
      blurb:
        "Installation, replacement, and guards. Undersized 5 inch gutter on a large roof plane is the most common defect on older housing here.",
    },
  ],

  /**
   * Why us. Three points: pricing transparency, response speed, coverage.
   * None of these claims require a license, insurance, or a track record.
   */
  whyUs: {
    headline: "Why start here",
    points: [
      {
        title: "We publish the numbers",
        body:
          "Every service page and every cost guide on this site carries real price ranges for this market. A tub to shower conversion in a 5 by 8 bathroom runs 8,000 to 16,000 dollars depending on whether the plumbing moves. Nobody else in this region publishes that. You should know roughly what a project costs before the first contractor walks through your door.",
      },
      {
        title: "You hear back the same day",
        body:
          "Fill out the form and your project goes to contractors who work in your town, not a call center three states away. The most common complaint about home improvement is that nobody calls back. We built the whole process around fixing that one thing.",
      },
      {
        title: "All three states, all seven services",
        body:
          "Most contractors here cover one county or one trade. We cover every city and town in Rhode Island, Massachusetts, and Connecticut, across seven service categories. Whether you are in Providence, Pittsfield, or Putnam, and whether it is a roof or a kitchen, this is the same starting point.",
      },
    ],
  },

  /**
   * ============================ PLACEHOLDER ============================
   * These three reviews are WRITTEN EXAMPLES, not real customer feedback.
   *
   * DO NOT PUBLISH AS-IS. Replace with verified first-party reviews before
   * the site goes live, or delete the section entirely.
   *
   * DO NOT attach Review or AggregateRating schema to this content under any
   * circumstances. Marking up invented testimonials as structured data is
   * review fraud, exposes the business to FTC action under the endorsement
   * rules, and risks a Google manual action.
   *
   * They exist here so the section can be designed and laid out. The
   * `isPlaceholder` flag should gate rendering in production.
   * ====================================================================
   */
  reviews: {
    isPlaceholder: true,
    headline: "What homeowners say",
    items: [
      {
        name: "Placeholder, replace before launch",
        location: "Providence, RI",
        body:
          "We have a triple decker on the Southside and every contractor who looked at it quoted the front roof and ignored the flat section over the back porch, which is where the leak actually was. The two people we got through here both walked the rear ell first. That told us everything.",
      },
      {
        name: "Placeholder, replace before launch",
        location: "Worcester, MA",
        body:
          "Fifty two windows in a three family on Vernon Hill. I had no idea what that should cost and the range on this site turned out to be about right. Got three quotes in four days and picked the middle one.",
      },
      {
        name: "Placeholder, replace before launch",
        location: "Hartford, CT",
        body:
          "Our house is in a historic district in the West End so the window profile had to be approved before anything got ordered. The contractor had done work under the same commission before and knew the process, which saved us probably a month.",
      },
    ],
  },

  finalCta: {
    headline: "Tell us about the project",
    body:
      "It takes about a minute. You will hear from contractors who work in your town, usually the same day. Free, and no obligation to hire anyone.",
    button: "Get free quotes",
  },
} as const;

/* ---------------------------------------------------------------------------
 * NAVIGATION AND FOOTER
 * ------------------------------------------------------------------------- */

export const NAV = {
  primary: [
    { label: "Services", href: "/services/" },
    { label: "Locations", href: "/locations/" },
    { label: "Cost Tools", href: "/tools/" },
    { label: "Guides", href: "/blog/" },
    { label: "About", href: "/about/" },
  ],
  cta: { label: "Get free quotes", href: "/free-estimate/" },
} as const;

export const FOOTER = {
  columns: [
    {
      heading: "Services",
      links: [
        { label: "Roofing", href: "/services/roofing/" },
        { label: "Windows", href: "/services/windows/" },
        { label: "Siding", href: "/services/siding/" },
        { label: "Bathroom Remodeling", href: "/services/bathroom-remodeling/" },
        { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling/" },
        { label: "Entry Doors", href: "/services/entry-doors/" },
        { label: "Gutters", href: "/services/gutters/" },
      ],
    },
    {
      heading: "States Covered",
      links: [
        { label: "Rhode Island, 39 municipalities", href: "/locations/rhode-island/" },
        { label: "Massachusetts, 351 municipalities", href: "/locations/massachusetts/" },
        { label: "Connecticut, 169 municipalities", href: "/locations/connecticut/" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about/" },
        { label: "Cost Tools", href: "/tools/" },
        { label: "Guides", href: "/blog/" },
        { label: "Project Gallery", href: "/gallery/" },
        { label: "Get Free Quotes", href: "/free-estimate/" },
      ],
    },
  ],
  disclosure:
    "This site connects homeowners with independent contractors. It is not a contractor, does not perform work, and does not employ trades. Contractors are independently licensed and insured in the states where they operate. Cost ranges shown are estimates for this market and are not quotes.",
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Terms and Conditions", href: "/terms-conditions/" },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * ESTIMATE FORM
 * ------------------------------------------------------------------------- */

export const ESTIMATE_FORM = {
  headline: "Get free quotes",
  intro:
    "Tell us what you are working on. The more specific you are about the house, the better the match.",
  submitLabel: "Send it",
  submittingLabel: "Sending",
  successHeadline: "Got it",
  successBody:
    "Your project is on its way to contractors who work in your town. Most people hear back the same day. If you do not hear anything within two business days, reply to the confirmation email and we will chase it.",
  privacyNote:
    "We share your details only with the contractors matched to your project. We do not sell your information.",

  fields: [
    {
      name: "name",
      label: "Your name",
      type: "text",
      required: true,
      autoComplete: "name",
      placeholder: "",
      error: "Enter your name so contractors know who they are calling.",
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      required: true,
      autoComplete: "tel",
      placeholder: "",
      help: "Most contractors call rather than email.",
      error: "Enter a phone number contractors can reach you on.",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      autoComplete: "email",
      placeholder: "",
      error: "Enter an email address so we can send your confirmation.",
    },
    {
      name: "city",
      label: "Town or city",
      type: "text",
      required: true,
      autoComplete: "address-level2",
      placeholder: "",
      error: "Enter your town or city so we can match contractors who work there.",
    },
    {
      name: "state",
      label: "State",
      type: "select",
      required: true,
      autoComplete: "address-level1",
      options: [
        { value: "", label: "Choose a state" },
        { value: "RI", label: "Rhode Island" },
        { value: "MA", label: "Massachusetts" },
        { value: "CT", label: "Connecticut" },
      ],
      error: "Choose your state.",
    },
    {
      name: "service",
      label: "What do you need",
      type: "select",
      required: true,
      options: [
        { value: "", label: "Choose a service" },
        { value: "roofing", label: "Roofing" },
        { value: "windows", label: "Windows" },
        { value: "siding", label: "Siding" },
        { value: "bathroom-remodeling", label: "Bathroom remodeling" },
        { value: "kitchen-remodeling", label: "Kitchen remodeling" },
        { value: "entry-doors", label: "Entry doors" },
        { value: "gutters", label: "Gutters" },
        { value: "multiple", label: "More than one of these" },
        { value: "not-sure", label: "Not sure yet" },
      ],
      error: "Choose the service you need.",
    },
    {
      name: "description",
      label: "Tell us about the project",
      type: "textarea",
      required: true,
      minLength: 20,
      rows: 5,
      placeholder: "",
      help:
        "What is the house, and what is going on? Age and style help, and so does anything you already know. For example: 1920s three family, back roof leaks over the porch, front looks fine.",
      error: "Give us at least a sentence about the project, 20 characters minimum.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * STANDALONE PAGES
 * ------------------------------------------------------------------------- */

export const BLOG_HUB = {
  headline: "Guides, costs, and how things actually work",
  subheadline:
    "Cost breakdowns, material comparisons, and the specific problems that come with New England housing stock: ice dams, salt air, board sheathing, historic district rules, and 100 year old window openings that are not square.",
  emptyState: "No posts yet. The first ones go up shortly.",
} as const;

export const GALLERY = {
  headline: "Project gallery",
  subheadline:
    "Completed work on New England housing: triple deckers, capes, colonials, Victorians, and coastal cottages.",
  placeholder:
    "We are collecting photos from contractors in the network now. Real projects on real houses in these three states go here, with the town and the type of house named. Nothing stock, nothing borrowed.",
} as const;

export const ABOUT = {
  headline: "What this is",
  body: [
    "This site exists because finding a decent contractor in New England is harder than it should be, and because almost nobody covering this region writes anything useful about the houses that are actually here.",
    "There are roughly 2.6 million housing units across Rhode Island, Massachusetts, and Connecticut, and a very large share of them were built before 1940. Triple deckers in Worcester and Providence. Center chimney colonials in the Quiet Corner. Capes on the Cape. Mill worker housing through the Blackstone Valley. Shingled cottages on the shore that were never meant to be lived in through February. Each of those is a different job with different problems, and generic national advice does not help you with any of them.",
    "So we do two things. We publish specific, useful information about what work costs in this market and what goes wrong on these particular kinds of houses. And we connect homeowners with contractors who work in their town.",
    "Being direct about the model: this is a referral service. We are not a contractor. We do not employ trades, we do not hold contractor licenses, and we never touch your house. The contractors we refer you to are independent businesses, licensed and insured in the states where they operate, and we check that before we send anyone your way. If a contractor works out, we may be paid a referral fee by them. You are never charged anything.",
    "One useful side effect of that arrangement: we have no product line to defend. We can tell you when vinyl is the right answer instead of fiber cement, when a repair beats a replacement, and when a project is not worth doing this year. A contractor who needs to sell the job cannot really say any of that.",
  ],
  coverageHeadline: "Where we cover",
  coverageBody:
    "Every city and town in all three states. 39 municipalities in Rhode Island, 351 in Massachusetts, and 169 in Connecticut. We are rolling coverage out in stages, so if your town does not have a page yet, use the quote form and we will handle it directly.",
} as const;

export const FREE_ESTIMATE_PAGE = {
  headline: "Get free quotes on your project",
  subheadline:
    "One form. Contractors who work in your town. No cost, no obligation, and no pressure to hire anyone.",
  whatHappensHeadline: "What happens next",
  steps: [
    {
      title: "You send the details",
      body: "About a minute. The more you tell us about the house, the better the match.",
    },
    {
      title: "We match your town and service",
      body: "Your project goes to contractors who actually work in your municipality, not a regional call center.",
    },
    {
      title: "They contact you directly",
      body: "Usually the same day. You talk to them, not to us, and you compare on your own terms.",
    },
    {
      title: "You decide, or you do not",
      body: "Hire one, hire none, sit on it until spring. There is no obligation at any point.",
    },
  ],
} as const;

export const NOT_FOUND = {
  headline: "This page does not exist",
  body:
    "The link may be broken, or the page may not be built yet. We are adding city pages in stages across all 559 municipalities in Rhode Island, Massachusetts, and Connecticut, so your town may simply not be live.",
  suggestions: [
    { label: "Browse all seven services", href: "/services/" },
    { label: "Find your state", href: "/locations/" },
    { label: "Get free quotes anyway", href: "/free-estimate/" },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * SHARED FRAGMENTS
 * ------------------------------------------------------------------------- */

export const SHARED = {
  ledgerHeading: "Local detail",
  ledgerLabels: {
    housingStock: "Predominant stock",
    era: "Built",
    permitAuthority: "Permits",
    zipCodes: "ZIP codes",
    costRange: "Typical range",
    county: "County",
  },
  costDisclaimer:
    "Ranges are estimates for this market based on typical scope. They are not quotes. Actual pricing depends on the house, access, and what turns up once work starts.",
  nearbyHeading: "Nearby towns",
  servicesInCityHeading: "Services in this town",
  faqHeading: "Common questions",
  inlineCta: {
    headline: "Want quotes for this?",
    body: "Free, no obligation, and contractors who work in your town.",
    button: "Get free quotes",
  },
} as const;
