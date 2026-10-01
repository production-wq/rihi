import Link from "next/link";
import type { City, StateCode } from "@/lib/data/cities";
import { STATE_NAMES, STATE_SLUGS, getCityUrl, getCityServiceUrl } from "@/lib/data/cities";

const STATES: StateCode[] = ["RI", "MA", "CT"];

const TOTALS: Record<StateCode, { count: number; unit: string }> = {
  RI: { count: 39, unit: "municipalities" },
  MA: { count: 351, unit: "cities and towns" },
  CT: { count: 169, unit: "municipalities" },
};

/**
 * Every location the site covers, one row per state.
 *
 * Used at the bottom of the /locations/ index and at the bottom of each service
 * hub, which is the service to location half of the bidirectional link
 * structure in CLAUDE.md section 10.
 *
 * The state hub link is always present, because the three state hubs render at
 * every phase. Town links appear only for cities that arrive in `cities`, which
 * the caller must have sourced from getLiveCities(), so a town that is not live
 * under ACTIVE_PHASE never enters the link graph.
 *
 * Section 10 forbids a flat list of hundreds of links. Towns are grouped by
 * region inside a native details element, collapsed by default. That needs no
 * client JavaScript and the links stay in the HTML for crawlers.
 *
 * When `serviceSlug` is set, town links point at the service x city page
 * instead of the city hub.
 */
export function LocationDirectory({
  cities,
  heading,
  intro,
  serviceSlug,
  serviceName,
}: {
  cities: City[];
  heading: string;
  intro?: string;
  serviceSlug?: string;
  serviceName?: string;
}) {
  return (
    <section className="mt-16" aria-labelledby="location-directory-heading">
      <h2 id="location-directory-heading" className="text-display-md">
        {heading}
      </h2>
      {intro ? <p className="mt-4 max-w-prose text-body-lg text-ink-body">{intro}</p> : null}

      <div className="mt-8 divide-y-hairline divide-shell border-hairline border-shell bg-surface-raised">
        {STATES.map((state) => {
          const total = TOTALS[state];
          const inState = cities.filter((c) => c.state === state);
          const regions = new Map<string, City[]>();
          for (const city of inState) {
            const bucket = regions.get(city.region) ?? [];
            bucket.push(city);
            regions.set(city.region, bucket);
          }
          const grouped = [...regions.entries()]
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([region, list]) => [
              region,
              [...list].sort((a, b) => a.city.localeCompare(b.city)),
            ] as const);

          return (
            <div key={state} className="p-6 lg:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="text-display-sm">
                  <Link
                    href={`/locations/${STATE_SLUGS[state]}/`}
                    className="link-rise transition-colors duration-micro ease-out hover:text-cranberry"
                  >
                    {serviceName ? `${serviceName} in ${STATE_NAMES[state]}` : STATE_NAMES[state]}
                  </Link>
                </h3>
                <p className="font-mono text-mono uppercase text-ink-muted">
                  {total.count} {total.unit}
                  {inState.length > 0 && inState.length < total.count
                    ? `  ·  ${inState.length} live`
                    : ""}
                </p>
              </div>

              {grouped.length ? (
                <details className="group mt-5">
                  <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-body-sm text-action transition-colors duration-micro ease-out hover:text-cranberry [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">
                      Show {inState.length} {inState.length === 1 ? "town" : "towns"}
                    </span>
                    <span className="hidden group-open:inline">Hide towns</span>
                  </summary>
                  <div className="mt-4 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-3">
                    {grouped.map(([region, list]) => (
                      <div key={region} className="bg-surface-raised p-5">
                        <h4 className="font-mono text-mono uppercase text-ink-muted">{region}</h4>
                        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                          {list.map((city) => (
                            <li key={`${city.state}-${city.slug}`}>
                              <Link
                                href={
                                  serviceSlug
                                    ? getCityServiceUrl(city, serviceSlug)
                                    : getCityUrl(city)
                                }
                                className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                              >
                                {city.city}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ) : (
                <p className="mt-4 max-w-prose text-body-sm text-ink-body">
                  Town pages for {STATE_NAMES[state]} are rolling out in stages. The state page
                  covers the whole state in the meantime.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
