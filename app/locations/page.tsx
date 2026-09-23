import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getLiveCities } from "@/lib/phase";
import { STATE_HUB } from "@/lib/copy/state-hub";
import { STATE_NAMES, STATE_SLUGS, type StateCode } from "@/lib/data/cities";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Locations", path: "/locations/" },
];

const TOTALS: Record<StateCode, { count: number; unit: string }> = {
  RI: { count: 39, unit: "municipalities" },
  MA: { count: 351, unit: "cities and towns" },
  CT: { count: 169, unit: "municipalities" },
};

export const metadata: Metadata = buildMetadata({
  title: "Every city and town in Rhode Island, Massachusetts, and Connecticut",
  description:
    "All 559 municipalities across three states, each with its own page covering the local housing stock, the permitting authority, and real cost ranges for that market.",
  path: "/locations/",
});

export default function LocationsIndexPage() {
  const live = getLiveCities();
  const states: StateCode[] = ["RI", "MA", "CT"];

  return (
    <>
      <Header solid />
      <main id="main">
        <PageHero
          eyebrow="Locations"
          title="559 cities and towns, one page each"
          lede="A roof on a Worcester three-decker and a roof on a Wellesley garrison colonial are not the same job. Every municipality gets its own page, with the housing stock that is actually there, the permitting authority, and a cost range for that market."
          crumbs={CRUMBS}
        />

        <Container width="wide">
          <div className="grid gap-px border-hairline border-shell bg-shell lg:grid-cols-3">
            {states.map((state) => {
              const copy = STATE_HUB[state];
              const total = TOTALS[state];
              const liveCount = live.filter((c) => c.state === state).length;

              return (
                <Link
                  key={state}
                  href={`/locations/${STATE_SLUGS[state]}/`}
                  className="group flex flex-col bg-surface-raised p-7 transition-colors duration-base ease-out hover:bg-oyster lg:p-9"
                >
                  <p className="font-mono text-mono uppercase text-cranberry">{state}</p>
                  <h2 className="mt-3 text-display-md transition-colors duration-micro ease-out group-hover:text-cranberry">
                    {STATE_NAMES[state]}
                  </h2>
                  <p className="mt-4 flex-1 text-body-sm text-ink-body">{copy.lede}</p>
                  <p className="mt-6 border-t-hairline border-shell pt-4 font-mono text-mono uppercase text-ink-muted">
                    {total.count} {total.unit}
                    {liveCount > 0 && liveCount < total.count ? `  ·  ${liveCount} live` : ""}
                  </p>
                </Link>
              );
            })}
          </div>

          <section className="py-section">
            <div className="max-w-prose">
              <h2 className="text-display-md">Why one page per town</h2>
              <p className="mt-4 text-body-lg text-ink-body">
                Almost every contractor site covering this region has a single service area
                page that names a dozen towns and then says "and surrounding areas." That page
                has to compete with itself for every town on it.
              </p>
              <p className="mt-5 text-body-lg text-ink-body">
                More usefully, a shared page cannot say anything true about any of those towns.
                It cannot tell a Pawtucket homeowner that their rear ell needs EPDM rather than
                shingle, or tell someone in Warwick that their 1950s ranch has five inch gutter
                on a roof plane that needs six. Those are the things worth knowing, and they are
                different in every town, which is why there is a page for every town.
              </p>
            </div>
          </section>
        </Container>
      </main>

      <JsonLd
        data={graph(
          collectionPageSchema({
            name: "Locations covered across Rhode Island, Massachusetts, and Connecticut",
            description: "All 559 municipalities across three states.",
            path: "/locations/",
          }),
          breadcrumbSchema(CRUMBS)
        )}
      />
    </>
  );
}
