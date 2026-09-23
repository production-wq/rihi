import Link from "next/link";
import type { Metadata } from "next";
import { HOME, SITE } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { img } from "@/lib/images";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/sections/Hero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { Reviews } from "@/components/sections/Reviews";
import { FinalCta } from "@/components/sections/FinalCta";
import { getLiveCities } from "@/lib/phase";
import { STATE_NAMES, STATE_SLUGS, type StateCode } from "@/lib/data/cities";

export const metadata: Metadata = buildMetadata({
  title: `${SITE.brandName} | ${SITE.tagline}`,
  description:
    "Roofing, windows, siding, baths, kitchens, doors, and gutters across all 559 cities and towns in Rhode Island, Massachusetts, and Connecticut. Free quotes, no obligation to hire.",
  path: "/",
  image: img("hero-desktop"),
});

const STATE_ENTRY: Array<{ code: StateCode; count: number; unit: string; note: string }> = [
  {
    code: "RI",
    count: 39,
    unit: "municipalities",
    note: "Triple-deckers through Providence and the Blackstone Valley, postwar capes across Warwick and Cranston, and shingled cottages down the South County shore.",
  },
  {
    code: "MA",
    count: 351,
    unit: "cities and towns",
    note: "Three-deckers in Worcester, Lowell, and New Bedford, garrison colonials across MetroWest, and first period housing in Essex County.",
  },
  {
    code: "CT",
    count: 169,
    unit: "municipalities",
    note: "Center chimney colonials and saltboxes statewide, stone and Tudor revival in Fairfield County, and mill worker housing through the Quiet Corner.",
  },
];

export default function HomePage() {
  const live = getLiveCities();

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ServiceGrid />

        {/* Three state entry points. */}
        <section className="border-t-hairline border-shell py-section lg:py-section-lg">
          <Container width="wide">
            <div className="max-w-prose">
              <h2 className="text-display-lg">Find your town</h2>
              <p className="mt-4 text-body-lg text-ink-body">
                Every city and town in three states. Each one gets its own page, because a
                roof on a Worcester three-decker and a roof on a Wellesley colonial are not
                the same job and should not share a page.
              </p>
            </div>

            <div className="mt-12 grid gap-px border-hairline border-shell bg-shell lg:grid-cols-3">
              {STATE_ENTRY.map((state) => {
                const liveCount = live.filter((c) => c.state === state.code).length;
                return (
                  <Link
                    key={state.code}
                    href={`/locations/${STATE_SLUGS[state.code]}/`}
                    className="group flex flex-col justify-between bg-surface-raised p-7 transition-colors duration-base ease-out hover:bg-oyster lg:p-8"
                  >
                    <div>
                      <p className="font-mono text-mono uppercase text-cranberry">
                        {state.code}
                      </p>
                      <h3 className="mt-3 text-display-md transition-colors duration-micro ease-out group-hover:text-cranberry">
                        {STATE_NAMES[state.code]}
                      </h3>
                      <p className="mt-4 max-w-prose text-body-sm text-ink-body">
                        {state.note}
                      </p>
                    </div>
                    <p className="mt-7 font-mono text-mono uppercase text-ink-muted">
                      {state.count} {state.unit}
                      {liveCount > 0 && liveCount < state.count
                        ? `  ·  ${liveCount} live`
                        : ""}
                    </p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <WhyUs />
        <Reviews />
        <FinalCta />
      </main>
    </>
  );
}
