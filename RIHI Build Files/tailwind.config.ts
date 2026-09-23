/**
 * tailwind.config.ts
 *
 * =============================================================================
 * PALETTE OPTIONS CONSIDERED
 * =============================================================================
 *
 * Constraint: must not be slate navy plus warm gold. That pairing belongs to
 * another project in this portfolio, and it is also the single most common
 * palette on contractor sites in this market. Also avoided: the cream
 * (#F4F1EA) plus terracotta (#D97757) combination that has become the default
 * output of AI design tools, and the near-black plus acid accent look.
 *
 * -----------------------------------------------------------------------------
 * OPTION 1: "Salt Marsh"  <-- IMPLEMENTED
 * -----------------------------------------------------------------------------
 *   Primary     #14332B   deep marsh green
 *   Accent      #A32035   cranberry
 *   Background  #F7F5F0   oyster
 *   Display     Fraunces  ·  Body  Instrument Sans  ·  Utility  IBM Plex Mono
 *
 *   Rationale. Southeastern New England is cranberry country, the bogs run
 *   through Plymouth County, Carver, and the Cape, and the salt marsh green
 *   reads as coastal without being nautical-cliche navy. Almost no competitor
 *   in this three state market uses green, which matters: sixteen competitor
 *   sites were reviewed and they cluster hard on blue, red, and orange.
 *   Cranberry gives a CTA color with real contrast against the green that is
 *   not the fire-engine red every roofing site defaults to. Oyster is warm
 *   enough to feel regional and light enough to keep long cost-guide copy
 *   readable.
 *
 * -----------------------------------------------------------------------------
 * OPTION 2: "Quarry"
 * -----------------------------------------------------------------------------
 *   Primary     #33383D   granite grey
 *   Accent      #2E7D6F   verdigris
 *   Background  #F6F4EF   limewash
 *   Display     Newsreader  ·  Body  Public Sans  ·  Utility  Roboto Mono
 *
 *   Rationale. Granite quarrying built Westerly, Milford, Quincy, and Barre,
 *   and verdigris is the patina on the copper flashing and roofs found all over
 *   the older housing stock here. Calm, restrained, credible for a site whose
 *   main asset is published cost data.
 *
 *   Why not chosen. Verdigris is low-saturation and makes a weak CTA. Grey
 *   primary plus grey-green accent gives the page no single point of
 *   attention, and this is a lead generation site where the form is the point.
 *
 * -----------------------------------------------------------------------------
 * OPTION 3: "Harbor Ink"
 * -----------------------------------------------------------------------------
 *   Primary     #16232E   near-black harbor blue
 *   Accent      #C2410C   signal orange
 *   Background  #F3F3F0   fog
 *   Display     Playfair Display  ·  Body  Source Sans 3  ·  Utility  IBM Plex Mono
 *
 *   Rationale. High contrast, works hard on mobile, and the orange is a proven
 *   conversion color in home services.
 *
 *   Why not chosen. Too close to what the competition already does. Orange plus
 *   dark blue is the default home services palette nationally, and the whole
 *   point of the visual identity here is to not look like the sites this one is
 *   trying to outrank. It also sits uncomfortably near the terracotta default.
 *
 * =============================================================================
 * TYPE PAIRING NOTES FOR THE IMPLEMENTED OPTION
 * =============================================================================
 *
 * Fraunces is a variable serif with optical sizing and a soft, slightly odd
 * character at display sizes. It reads as considered rather than corporate,
 * and it does not look like the Playfair or Merriweather that every other
 * contractor site uses. Never set it below 24px, it gets muddy.
 *
 * Instrument Sans is a neutral grotesque with slightly tighter apertures than
 * Inter, which is deliberate. Inter is the default everywhere and reads as
 * template.
 *
 * IBM Plex Mono is load-bearing, not decoration. See CLAUDE.md section 6. Any
 * verifiable local datum sets in mono: a ZIP code, a cost range, a permit
 * authority, a housing stock date range. Prose never does. The reader gets an
 * instant visual separation between "we looked this up" and "we are talking."
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---- Salt Marsh -------------------------------------------------
        marsh: {
          DEFAULT: "#14332B",
          deep: "#0C201B",
          mid: "#1E4A3E",
          light: "#2F6354",
          wash: "#E8EEEB",
        },
        cranberry: {
          DEFAULT: "#A32035",
          deep: "#7C1728",
          light: "#C4485C",
          wash: "#F7E9EC",
        },
        oyster: {
          DEFAULT: "#F7F5F0",
          deep: "#EFECE4",
        },
        granite: {
          DEFAULT: "#4A5157",
          light: "#8A9298",
          faint: "#B9BFC3",
        },
        shell: {
          DEFAULT: "#E4E0D6",
          light: "#F0EDE6",
        },

        // ---- Semantic aliases. Prefer these in components. --------------
        surface: "#F7F5F0",
        "surface-raised": "#FFFFFF",
        "surface-sunken": "#EFECE4",
        "surface-inverse": "#14332B",
        ink: "#14332B",
        "ink-body": "#4A5157",
        "ink-muted": "#8A9298",
        "ink-inverse": "#F7F5F0",
        hairline: "#E4E0D6",
        action: "#A32035",
        "action-hover": "#7C1728",

        // ---- Status. Used in forms and tool outputs only. ---------------
        success: "#2F6354",
        warning: "#8A6A1F",
        danger: "#A32035",
      },

      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },

      /**
       * Full type scale. Use it. A page that only reaches for display-md,
       * body, and caption looks like a template. See CLAUDE.md section 6.
       */
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-md": ["clamp(1.875rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.015em", fontWeight: "600" }],
        "display-sm": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.6" }],
        caption: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        mono: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.06em" }],
        "mono-lg": ["1rem", { lineHeight: "1.4", letterSpacing: "0.04em" }],
      },

      maxWidth: {
        prose: "68ch",
        "prose-narrow": "58ch",
        content: "1140px",
        wide: "1320px",
        ledger: "760px",
      },

      spacing: {
        section: "5rem",
        "section-lg": "7.5rem",
        gutter: "1.25rem",
      },

      borderRadius: {
        card: "4px",
        control: "3px",
        pill: "999px",
      },

      borderWidth: {
        hairline: "1px",
        rule: "2px",
      },

      boxShadow: {
        card: "0 1px 2px rgba(20, 51, 43, 0.05), 0 4px 12px rgba(20, 51, 43, 0.04)",
        raised: "0 2px 6px rgba(20, 51, 43, 0.08), 0 12px 28px rgba(20, 51, 43, 0.07)",
        nav: "0 1px 0 #E4E0D6",
      },

      /** Focus ring token. Every interactive element gets a visible focus state. */
      ringColor: { focus: "#A32035" },
      ringOffsetColor: { focus: "#F7F5F0" },
      ringWidth: { focus: "2px" },
      ringOffsetWidth: { focus: "2px" },

      transitionDuration: {
        micro: "150ms",
        base: "200ms",
        slow: "300ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0, 0, 1)",
      },

      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 300ms cubic-bezier(0.2, 0, 0, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;

/**
 * USAGE NOTES
 *
 * 1. No raw hex values in components. If a color is missing, add a token here.
 *
 * 2. Focus rings. Every interactive element:
 *      focus-visible:outline-none
 *      focus-visible:ring-focus focus-visible:ring-focus
 *      focus-visible:ring-offset-focus focus-visible:ring-offset-focus
 *
 * 3. Motion. Wrap every animation in a reduced-motion guard:
 *      motion-safe:animate-fade-up
 *    Nothing on this site transitions longer than 300ms.
 *
 * 4. The Local Ledger. font-mono, text-mono, bg-shell-light, with
 *    border-hairline border-shell dividers between fields. Do not restyle it
 *    per page. It is the one repeated element that carries the identity.
 *
 * 5. Fonts load through next/font in app/layout.tsx and expose the three CSS
 *    variables referenced above. No external font CDN requests.
 *
 * 6. Only core Tailwind utilities are available in the artifact preview
 *    environment. In the real Next.js build these custom tokens compile
 *    normally.
 */
