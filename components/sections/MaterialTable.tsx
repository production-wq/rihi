import Link from "next/link";
import { MATERIALS } from "@/lib/data/cost-data";

/**
 * Materials compared on cost, life, maintenance, coastal exposure, and whether
 * a historic district commission is likely to approve them.
 *
 * This table is the clearest expression of the positioning in
 * docs/competitors.md: a contractor selling one siding line cannot publish a
 * neutral comparison, and a referral service with no product to defend can.
 * Every competitor in this market says "quality materials" and stops.
 *
 * Rendered only for the four categories that have material data. Bathrooms and
 * kitchens do not, because the meaningful variable there is scope rather than
 * material, and inventing rows to fill the layout would be exactly the padding
 * CLAUDE.md section 11 warns against.
 */
export function MaterialTable({
  serviceSlug,
  serviceName,
}: {
  serviceSlug: string;
  serviceName: string;
}) {
  const materials = MATERIALS[serviceSlug];
  if (!materials?.length) return null;

  const perUnit = materials[0].unit === "unit";

  return (
    <section className="mt-16">
      <h2 className="text-display-md">{serviceName} materials compared</h2>
      <p className="mt-4 max-w-prose text-body-lg text-ink-body">
        Installed cost, how long it lasts, what it needs doing to it, and how it behaves within a
        mile of open water. No single material wins on every axis, and anyone telling you one does
        is selling it.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">
            {serviceName} materials compared on cost, life, maintenance, coastal exposure, and
            historic district approval
          </caption>
          <thead>
            <tr className="border-b-rule border-shell">
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Material
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                {perUnit ? "Per unit" : "Per sq ft"}
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Life
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Maintenance
              </th>
              <th scope="col" className="py-3 pr-4 font-mono text-mono uppercase text-ink-muted">
                Coastal
              </th>
              <th scope="col" className="py-3 font-mono text-mono uppercase text-ink-muted">
                Historic
              </th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.value} className="border-b-hairline border-shell align-top">
                <th scope="row" className="py-4 pr-4 text-body-sm font-medium text-ink">
                  {material.label}
                  {material.note ? (
                    <span className="mt-1 block font-normal text-caption text-ink-muted">
                      {material.note}
                    </span>
                  ) : null}
                </th>
                <td className="whitespace-nowrap py-4 pr-4 font-mono text-mono text-ink">
                  ${material.low.toLocaleString()} to ${material.high.toLocaleString()}
                </td>
                <td className="whitespace-nowrap py-4 pr-4 font-mono text-mono text-ink-body">
                  {material.lifeLow} to {material.lifeHigh} yr
                </td>
                <td className="py-4 pr-4 text-body-sm text-ink-body">{material.maintenance}</td>
                <td className="py-4 pr-4 text-body-sm text-ink-body">{material.coastal}</td>
                <td className="py-4 text-body-sm text-ink-body">{material.historic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-prose text-caption text-ink-muted">
        Massachusetts baseline before regional adjustment. Estimates for this market, not quotes.{" "}
        <Link href="/tools/material-comparison-tool/" className="text-action underline underline-offset-4">
          Compare these over the years you plan to stay
        </Link>
        , which is where the cheaper option stops being the cheaper option.
      </p>
    </section>
  );
}
