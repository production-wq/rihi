import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Footer } from "@/components/layout/Footer";

/**
 * Fonts load through next/font, which downloads and self-hosts them at build
 * time. No external font CDN request is made at runtime. See CLAUDE.md
 * section 2 and the type notes in tailwind.config.ts.
 *
 * Fraunces carries optical sizing on, per section 6, and is never set below
 * 24px anywhere in the type scale.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.brandName} | ${SITE.tagline}`,
    // Page titles never end with the brand name. The template adds it here so
    // no page has to, per CLAUDE.md section 9.
    template: `%s | ${SITE.brandShort}`,
  },
  description:
    "Roofing, windows, siding, baths, kitchens, doors, and gutters across every city and town in Rhode Island, Massachusetts, and Connecticut. Free quotes, no obligation.",
  formatDetection: { telephone: false, address: false, email: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${instrumentSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-action focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>

        {children}
        <Footer />

        <JsonLd data={graph(organizationSchema(), websiteSchema())} />

        {/*
          GA4 at afterInteractive, per CLAUDE.md section 13. Nothing else is
          loaded from a third party: no chat widget, no heat map, no pixel.
          Each one costs 10 to 20 Lighthouse points.
        */}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
