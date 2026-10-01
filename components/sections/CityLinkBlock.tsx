import Link from "next/link";
import type { City, StateCode } from "@/lib/data/cities";
import { STATE_NAMES, STATE_SLUGS, getCityUrl, getCityServiceUrl } from "@/lib/data/cities";
import { TownChip } from "@/components/ui/TownChip";

/** A state with more live towns than this collapses behind a toggle. */
const COLLAPSE_ABOVE = 60;

/**
 * Grouped city links.
 *
 * CLAUDE.md section 10 is explicit: "Never a flat list of 559 links. Group and
 * collapse." A flat block dilutes every link on the page and reads as a
 * doorway, which is the single fastest way to get a programmatic site
 * classified as one.
 *
 * So this groups by state, then by region, and renders regions as collapsible
 * sections once there are more than a handful. Cities arrive already filtered
 * through getLiveCities() by the caller, which is where the phase gate lives.
 */
export function CityLinkBlock({
  cities,
  serviceSlug,
  heading,
  intro,
}: {
  cities: City[];
  /** When set, links point at the service x city page rather than the city hub. */
  serviceSlug?: string;
  heading: string;
  intro?: string;
}) {
  if (!cities.length) return null;

  const states = ["RI", "MA", "CT"] as const;

  const grouped = states
    .map((state) => {
      const inState = cities.filter((c) => c.state === state);
      const regions = new Map<string, City[]>();
      for (const city of inState) {
        const bucket = regions.get(city.region) ?? [];
        bucket.push(city);
        regions.set(city.region, bucket);
      }
      for (const [, bucket] of regions) {
        bucket.sort((a, b) => a.city.localeCompare(b.city));
      }
      return { state, regions: [...regions.entries()].sort((a, b) => a[0].localeCompare(b[0])) };
    })
    .filter((g) => g.regions.length > 0);

  return (
    <section className="mt-16">
      <h2 className="text-display-md">{heading}</h2>
      {intro ? <p className="mt-4 max-w-prose text-body-lg text-ink-body">{intro}</p> : null}

      <div className="mt-8 space-y-10">
        {grouped.map((group) => {
          const count = group.regions.reduce((n, [, list]) => n + list.length, 0);
          const regionGrid = (
            <div className="mt-4 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-3">
              {group.regions.map(([region, list]) => (
                <div key={region} className="bg-surface-raised p-5">
                  <h4 className="font-mono text-mono uppercase text-ink-muted">{region}</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {list.map((city) => (
                      <li key={`${city.state}-${city.slug}`}>
                        <TownChip
                          href={
                            serviceSlug ? getCityServiceUrl(city, serviceSlug) : getCityUrl(city)
                          }
                        >
                          {city.city}
                        </TownChip>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );

          return (
            <div key={group.state}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-display-sm">
                  <Link
                    href={`/locations/${STATE_SLUGS[group.state as StateCode]}/`}
                    className="link-rise transition-colors duration-micro ease-out hover:text-cranberry"
                  >
                    {STATE_NAMES[group.state as StateCode]}
                  </Link>
                </h3>
                <p className="font-mono text-mono uppercase text-ink-muted">{count} towns</p>
              </div>

              {count > COLLAPSE_ABOVE ? (
                <details className="group mt-3">
                  <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center text-body-sm text-action transition-colors duration-micro ease-out hover:text-cranberry [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Show all {count} towns</span>
                    <span className="hidden group-open:inline">Hide towns</span>
                  </summary>
                  {regionGrid}
                </details>
              ) : (
                regionGrid
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
