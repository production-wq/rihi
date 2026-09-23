import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, metaTemplates, clampDescription } from "@/lib/seo";
import { graph, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LocalLedger } from "@/components/sections/LocalLedger";
import { ProseBody } from "@/components/sections/ProseBody";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { SHARED } from "@/lib/content";
import { SERVICES } from "@/lib/data/services";
import { getLiveCities } from "@/lib/phase";
import { buildCityLedger, serviceCostBand } from "@/lib/copy/ledger";
import { cityHubBody } from "@/lib/copy/city-body";
import {
  getCityBySlug,
  getNearbyCities,
  getCityUrl,
  getCityServiceUrl,
  SLUG_TO_STATE,
  STATE_NAMES,
  STATE_SLUGS,
} from "@/lib/data/cities";

/**
 * City hub. One page per live municipality.
 *
 * Link graph, per CLAUDE.md section 10. Links down to all seven service x city
 * pages, which is the most important link block on the site. Links up to the
 * state hub. Links laterally to three to six nearby cities, only ones that are
 * live.
 *
 * generateStaticParams sources from getLiveCities(), never from a phase file.
 * A city outside the current phase is not generated and returns a 404 rather
 * than a soft "coming soon" page, per section 9.
 */

export function generateStaticParams() {
  return getLiveCities().map((city) => ({
    state: STATE_SLUGS[city.state],
    city: city.slug,
  }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { state: string; city: string };
}): Metadata {
  const code = SLUG_TO_STATE[params.state];
  if (!code) return {};
  const city = getCityBySlug(params.city, code);
  if (!city) return {};

  // The housing-stock detail comes from the researched note itself, trimmed to
  // its first clause so the description carries a real specific rather than a
  // generic one. See the city hub template in section 9.
  const detail = city.homeStyleNote.split(/(?<=\.)\s/)[0].replace(/\.$/, "");

  return buildMetadata({
    title: `Home improvement contractors in ${city.city}, ${city.state}`,
    description: clampDescription(
      metaTemplates.cityHub(city.city, city.state, detail)
    ),
    path: `/locations/${params.state}/${params.city}/`,
  });
}

export default function CityHubPage({
  params,
}: {
  params: { state: string; city: string };
}) {
  const code = SLUG_TO_STATE[params.state];
  if (!code) notFound();
  const city = getCityBySlug(params.city, code);
  if (!city) notFound();

  const ledger = buildCityLedger(city);
  const body = cityHubBody(city);
  const nearby = getNearbyCities(city, 6);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations/" },
    { name: STATE_NAMES[code], path: `/locations/${params.state}/` },
    { name: city.city, path: `/locations/${params.state}/${params.city}/` },
  ];

  return (
    <>
      <Header solid />
      <main id="main">
        <Container width="wide">
          <Breadcrumbs crumbs={crumbs} />

          <div className="max-w-[46rem] pb-10 pt-2">
            <p className="eyebrow text-cranberry">
              {city.county}  ·  {city.region}
            </p>
            <h1 className="mt-4 text-display-lg">
              Home improvement in {city.city}, {city.state}
            </h1>
            <p className="mt-5 max-w-prose text-body-lg text-ink-body">
              Seven service categories, contractors who work in {city.city}, and real cost
              ranges for this market. Free quotes, and no obligation to hire anyone.
            </p>
          </div>

          {/* The Local Ledger opens the page, per section 11. */}
          <LocalLedger fields={ledger} caption={SHARED.costDisclaimer} />

          <div className="grid gap-12 py-14 pb-section lg:grid-cols-12 lg:gap-16 lg:py-16">
            <div className="lg:col-span-8">
              <ProseBody paragraphs={body} />
              <InlineLeadForm prefill={{ city: city.city, state: city.state }} />
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {/* The most important link block on the site. */}
                <nav aria-label={`Services in ${city.city}`}>
                  <h2 className="eyebrow text-cranberry">{SHARED.servicesInCityHeading}</h2>
                  <ul className="mt-4 divide-y-hairline divide-shell border-y-hairline border-shell">
                    {SERVICES.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={getCityServiceUrl(city, service.slug)}
                          className="group flex items-baseline justify-between gap-4 py-3.5"
                        >
                          <span className="font-display text-body-lg text-ink transition-colors duration-micro ease-out group-hover:text-cranberry">
                            {service.name}
                          </span>
                          <span className="shrink-0 font-mono text-mono text-ink-muted">
                            {serviceCostBand(city, service.slug)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {nearby.length ? (
                  <nav aria-label={SHARED.nearbyHeading} className="mt-8">
                    <h2 className="eyebrow text-cranberry">{SHARED.nearbyHeading}</h2>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {nearby.map((n) => (
                        <li key={`${n.state}-${n.slug}`}>
                          <Link
                            href={getCityUrl(n)}
                            className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                          >
                            {n.city}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : null}

                <nav aria-label="State" className="mt-8">
                  <h2 className="eyebrow text-cranberry">More in {STATE_NAMES[code]}</h2>
                  <p className="mt-3 text-body-sm text-ink-body">
                    <Link
                      href={`/locations/${params.state}/`}
                      className="link-rise text-action transition-colors duration-micro ease-out"
                    >
                      Every town in {STATE_NAMES[code]}
                    </Link>
                  </p>
                </nav>
              </div>
            </aside>
          </div>
        </Container>
      </main>

      <JsonLd
        data={graph(
          collectionPageSchema({
            name: `Home improvement contractors in ${city.city}, ${city.state}`,
            description: city.homeStyleNote,
            path: `/locations/${params.state}/${params.city}/`,
          }),
          breadcrumbSchema(crumbs)
        )}
      />
    </>
  );
}
