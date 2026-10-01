import Link from "next/link";
import type { City } from "@/lib/data/cities";
import { getCityServiceUrl, getCityUrl } from "@/lib/data/cities";
import { SERVICES } from "@/lib/data/services";
import { serviceCostBand, serviceCostBasis } from "@/lib/copy/ledger";

/**
 * Cost comparison tables.
 *
 * Two shapes, both built entirely from the computed cost model rather than
 * written, so every figure stays consistent with the Local Ledger and the
 * calculators on the same page.
 *
 * They also carry a large share of the lateral internal linking required by
 * CLAUDE.md section 10: same service in nearby towns, and other services in the
 * same town. Putting those links inside a table a homeowner actually wants to
 * read is better than a bare link block, because the link earns its place.
 */

/** Same service, nearby towns. Shows that geography genuinely moves the number. */
export function NearbyCostTable({
  city,
  nearby,
  serviceSlug,
  serviceName,
}: {
  city: City;
  nearby: City[];
  serviceSlug: string;
  serviceName: string;
}) {
  if (!nearby.length) return null;

  const rows = [{ city, current: true }, ...nearby.map((c) => ({ city: c, current: false }))];

  return (
    <section className="mt-16">
      <h2 className="text-display-md">
        {serviceName} cost around {city.city}
      </h2>
      <p className="mt-4 max-w-prose text-body-lg text-ink-body">
        Labour rates and housing stock both change across a town line, and the same job does not
        price the same five miles away. If you are near a boundary it is worth getting quotes from
        both sides of it.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">
            Typical {serviceName.toLowerCase()} cost in {city.city} and neighbouring towns
          </caption>
          <thead>
            <tr className="border-b-rule border-shell">
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Town
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Region
              </th>
              <th scope="col" className="py-3 font-mono text-mono uppercase text-ink-muted">
                Typical range
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ city: row, current }) => (
              <tr
                key={`${row.state}-${row.slug}`}
                className={`border-b-hairline border-shell ${current ? "bg-shell-light" : ""}`}
              >
                <th scope="row" className="py-3.5 pr-4 text-body-sm font-medium">
                  {current ? (
                    <span className="text-ink">
                      {row.city}
                      <span className="ml-2 font-mono text-mono uppercase text-cranberry">
                        This page
                      </span>
                    </span>
                  ) : (
                    <Link
                      href={getCityServiceUrl(row, serviceSlug)}
                      className="link-rise text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                    >
                      {row.city}
                    </Link>
                  )}
                </th>
                <td className="py-3.5 pr-4 text-body-sm text-ink-body">{row.region}</td>
                <td className="py-3.5 font-mono text-mono text-ink">
                  {serviceCostBand(row, serviceSlug)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-prose text-caption text-ink-muted">
        Assumes {serviceCostBasis(serviceSlug)}. Estimates for this market, not quotes.
      </p>
    </section>
  );
}

/** All seven services in one town. The city hub's most important link block. */
export function CityServiceTable({ city }: { city: City }) {
  return (
    <section className="mt-16">
      <h2 className="text-display-md">What work costs in {city.city}</h2>
      <p className="mt-4 max-w-prose text-body-lg text-ink-body">
        Every range below is adjusted for {city.region} labour rates and for the age and type of
        housing in {city.city}. Nobody else covering this region publishes figures at this level,
        which is the main reason to start here rather than building a picture from three phone
        calls.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left">
          <caption className="sr-only">
            Typical project cost by service in {city.city}, {city.state}
          </caption>
          <thead>
            <tr className="border-b-rule border-shell">
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Service
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Typical range
              </th>
              <th scope="col" className="py-3 font-mono text-mono uppercase text-ink-muted">
                What that assumes
              </th>
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((service) => (
              <tr key={service.slug} className="border-b-hairline border-shell align-top">
                <th scope="row" className="py-4 pr-4 text-body-sm font-medium">
                  <Link
                    href={getCityServiceUrl(city, service.slug)}
                    className="link-rise text-ink transition-colors duration-micro ease-out hover:text-cranberry"
                  >
                    {service.name} in {city.city}
                  </Link>
                </th>
                <td className="whitespace-nowrap py-4 pr-4 font-mono text-mono text-ink">
                  {serviceCostBand(city, service.slug)}
                </td>
                <td className="max-w-[24rem] py-4 text-body-sm text-ink-body">
                  {serviceCostBasis(service.slug)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-prose text-caption text-ink-muted">
        Estimates for this market based on typical scope. They are not quotes, and the actual
        number depends on the house, the access, and what turns up once work starts.
      </p>
    </section>
  );
}

/** One service across the three states. Used on the statewide service hubs. */
export function RegionalCostTable({
  serviceSlug,
  serviceName,
  samples,
}: {
  serviceSlug: string;
  serviceName: string;
  samples: City[];
}) {
  if (samples.length < 2) return null;

  return (
    <section className="mt-16">
      <h2 className="text-display-md">{serviceName} cost by market</h2>
      <p className="mt-4 max-w-prose text-body-lg text-ink-body">
        The spread across these three states is wider than most homeowners expect. The same job in
        the highest and lowest cost markets here differs by well over 50 percent, which is why
        every town on this site carries its own figure rather than a regional average.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">
            Typical {serviceName.toLowerCase()} cost across sample markets
          </caption>
          <thead>
            <tr className="border-b-rule border-shell">
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Market
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                State
              </th>
              <th scope="col" className="py-3 font-mono text-mono uppercase text-ink-muted">
                Typical range
              </th>
            </tr>
          </thead>
          <tbody>
            {samples.map((city) => (
              <tr key={`${city.state}-${city.slug}`} className="border-b-hairline border-shell">
                <th scope="row" className="py-3.5 pr-4 text-body-sm font-medium">
                  <Link
                    href={getCityUrl(city)}
                    className="link-rise text-ink transition-colors duration-micro ease-out hover:text-cranberry"
                  >
                    {city.region}
                  </Link>
                </th>
                <td className="py-3.5 pr-4 text-body-sm text-ink-body">{city.state}</td>
                <td className="py-3.5 font-mono text-mono text-ink">
                  {serviceCostBand(city, serviceSlug)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-prose text-caption text-ink-muted">
        Assumes {serviceCostBasis(serviceSlug)}. Estimates for this market, not quotes.
      </p>
    </section>
  );
}
