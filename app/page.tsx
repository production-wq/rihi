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
import { SERVICES } from "@/lib/data/services";
import { TownChip } from "@/components/ui/TownChip";
import {
  STATE_NAMES,
  STATE_SLUGS,
  getCityUrl,
  getCityServiceUrl,
  type StateCode,
} from "@/lib/data/cities";

/** Towns shown per state on the homepage. The rest sit behind the state page. */
const HOME_TOWNS_PER_STATE = 24;
/** Towns that get their own card with all seven service links. */
const FEATURED_TOWNS = 6;

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
  const featured = live.slice(0, FEATURED_TOWNS);
  const featuredKeys = new Set(featured.map((c) => `${c.state}-${c.slug}`));
  const byState = (["RI", "MA", "CT"] as StateCode[])
    .map((code) => {
      const inState = live.filter((c) => c.state === code);
      return {
        code,
        total: inState.length,
        cities: inState
          .filter((c) => !featuredKeys.has(`${c.state}-${c.slug}`))
          .slice(0, HOME_TOWNS_PER_STATE),
      };
    })
    .filter((g) => g.cities.length > 0);

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
                Pick your state for the regional picture, then your town. A roof on a
                Worcester three-decker and a roof on a Wellesley colonial are not the same job,
                so each town page covers the housing stock that is actually there.
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
                      {liveCount > 0 ? `  ·  ${liveCount} town pages` : ""}
                    </p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        {live.length ? (
          <section
            aria-labelledby="towns-heading"
            className="border-t-hairline border-shell bg-surface-sunken py-section lg:py-section-lg"
          >
            <Container width="wide">
              <div className="max-w-prose">
                <h2 id="towns-heading" className="text-display-lg">
                  Where we match contractors
                </h2>
                <p className="mt-4 text-body-lg text-ink-body">
                  Open a town to see its housing stock, its permitting authority, and what each
                  service typically costs there. Or go straight to a service in that town.
                </p>
              </div>

              {/* Featured towns: every service one tap away. */}
              <ul className="mt-12 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((city) => (
                  <li key={`${city.state}-${city.slug}`} className="bg-surface-raised p-6">
                    <p className="font-mono text-mono uppercase text-cranberry">
                      {city.state}  ·  {city.region}
                    </p>
                    <h3 className="mt-2 text-display-sm">
                      <Link
                        href={getCityUrl(city)}
                        className="link-rise transition-colors duration-micro ease-out hover:text-cranberry"
                      >
                        {city.city}
                      </Link>
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                      {SERVICES.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={getCityServiceUrl(city, service.slug)}
                            className="link-rise inline-flex min-h-[32px] items-center text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                          >
                            {service.shortName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              {/* Every other live town, by state. Capped, with a route to the full list. */}
              <div className="mt-14 space-y-10">
                {byState.map(({ code, cities, total }) => (
                  <div key={code}>
                    <h3 className="eyebrow text-cranberry">{STATE_NAMES[code]}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cities.map((city) => (
                        <li key={city.slug}>
                          <TownChip href={getCityUrl(city)}>{city.city}</TownChip>
                        </li>
                      ))}
                    </ul>
                    {total > cities.length ? (
                      <p className="mt-4">
                        <Link
                          href={`/locations/${STATE_SLUGS[code]}/`}
                          className="link-rise text-body-sm text-action transition-colors duration-micro ease-out"
                        >
                          All {total} towns in {STATE_NAMES[code]}
                        </Link>
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ) : null}

        <WhyUs />
        <Reviews />
        <FinalCta />
      </main>
    </>
  );
}
