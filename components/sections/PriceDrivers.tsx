import { SERVICE_SCOPE } from "@/lib/copy/service-scope";

/**
 * What actually moves the number on this trade, heaviest first.
 *
 * docs/competitors.md records that no competitor in this three-state market
 * publishes cost figures at all, let alone a breakdown of what drives them.
 * This table is the cheapest version of that advantage: it is useful to a
 * homeowner comparing two quotes, and it is the kind of structured content an
 * AI answer engine can lift directly.
 */
export function PriceDrivers({
  serviceSlug,
  serviceName,
  cityName,
}: {
  serviceSlug: string;
  serviceName: string;
  cityName?: string;
}) {
  const scope = SERVICE_SCOPE[serviceSlug];
  if (!scope?.drivers.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-display-md">
        What drives the {serviceName.toLowerCase()} price{cityName ? ` in ${cityName}` : ""}
      </h2>
      <p className="mt-4 max-w-prose text-body-lg text-ink-body">
        Heaviest factor first. When two quotes differ by thousands, the difference is almost
        always in one of these six lines rather than spread evenly across the job.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <caption className="sr-only">
            Cost drivers for {serviceName.toLowerCase()}
            {cityName ? ` in ${cityName}` : ""}, ordered by weight
          </caption>
          <thead>
            <tr className="border-b-rule border-shell">
              <th scope="col" className="w-[2.5rem] py-3 pr-3 font-mono text-mono uppercase text-ink-muted">
                #
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Factor
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Typical effect
              </th>
              <th scope="col" className="py-3 font-mono text-mono uppercase text-ink-muted">
                Why
              </th>
            </tr>
          </thead>
          <tbody>
            {scope.drivers.map((driver, i) => (
              <tr key={driver.factor} className="border-b-hairline border-shell align-top">
                <td className="py-4 pr-3 font-mono text-mono text-cranberry">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <th scope="row" className="py-4 pr-4 text-body-sm font-medium text-ink">
                  {driver.factor}
                </th>
                <td className="py-4 pr-4 font-mono text-mono text-ink">{driver.effect}</td>
                <td className="max-w-[26rem] py-4 text-body-sm text-ink-body">{driver.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
