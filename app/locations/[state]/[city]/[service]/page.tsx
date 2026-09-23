import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, metaTemplates, clampDescription } from "@/lib/seo";
import { graph, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LocalLedger } from "@/components/sections/LocalLedger";
import { ProseBody } from "@/components/sections/ProseBody";
import { FaqSection } from "@/components/sections/FaqSection";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { SHARED } from "@/lib/content";
import { SERVICES, getServiceBySlug, SERVICE_SLUGS } from "@/lib/data/services";
import { getLiveCities } from "@/lib/phase";
import { buildServiceCityLedger, serviceCostBand } from "@/lib/copy/ledger";
import { serviceCityBody, buildServiceCityFaqs } from "@/lib/copy/city-body";
import { getCityTraits } from "@/lib/copy/traits";
import {
  getCityBySlug,
  getNearbyCities,
  getCityServiceUrl,
  getCityUrl,
  SLUG_TO_STATE,
  STATE_NAMES,
  STATE_SLUGS,
} from "@/lib/data/cities";

/**
 * Service x city. The deepest live tier and the largest page count.
 *
 * At full rollout this is 559 cities x 7 services. It is therefore both the
 * largest opportunity and the highest duplication risk on the site, which is
 * why the body copy is generated per municipality and measured by
 * scripts/check-uniqueness.ts rather than templated.
 *
 * Link graph, per CLAUDE.md section 10. Up to the city hub, up to the service
 * hub, laterally to the same service in three to six nearby towns, and
 * laterally to two or three other services in the same city.
 *
 * This page ships no client-side JavaScript beyond the header and the FAQ
 * accordion, per the performance target in section 13.
 */

export function generateStaticParams() {
  return getLiveCities().flatMap((city) =>
    SERVICE_SLUGS.map((service) => ({
      state: STATE_SLUGS[city.state],
      city: city.slug,
      service,
    }))
  );
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { state: string; city: string; service: string };
}): Metadata {
  const code = SLUG_TO_STATE[params.state];
  const service = getServiceBySlug(params.service);
  if (!code || !service) return {};
  const city = getCityBySlug(params.city, code);
  if (!city) return {};

  const traits = getCityTraits(city);
  const stock = traits.stock.length
    ? city.homeStyleNote.split(/(?<=\.)\s/)[0].replace(/\.$/, "")
    : `${city.region} housing stock`;

  return buildMetadata({
    title: `${service.name} in ${city.city}, ${city.state}`,
    description: clampDescription(
      metaTemplates.serviceCity(
        service.name,
        city.city,
        city.state,
        stock,
        serviceCostBand(city, service.slug),
        city.county
      )
    ),
    path: `/locations/${params.state}/${params.city}/${params.service}/`,
  });
}

export default function ServiceCityPage({
  params,
}: {
  params: { state: string; city: string; service: string };
}) {
  const code = SLUG_TO_STATE[params.state];
  const service = getServiceBySlug(params.service);
  if (!code || !service) notFound();
  const city = getCityBySlug(params.city, code);
  if (!city) notFound();

  const ledger = buildServiceCityLedger(city, service.slug);
  const body = serviceCityBody(city, service.slug);
  const faqs = buildServiceCityFaqs(city, service.slug);
  const nearby = getNearbyCities(city, 6);
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations/" },
    { name: STATE_NAMES[code], path: `/locations/${params.state}/` },
    { name: city.city, path: `/locations/${params.state}/${params.city}/` },
    {
      name: service.shortName,
      path: `/locations/${params.state}/${params.city}/${params.service}/`,
    },
  ];

  return (
    <>
      <Header solid />
      <main id="main">
        <Container width="wide">
          <Breadcrumbs crumbs={crumbs} />

          <div className="max-w-[46rem] pb-10 pt-2">
            <p className="eyebrow text-cranberry">
              {city.city}, {city.state}  ·  {city.county}
            </p>
            <h1 className="mt-4 text-display-lg">
              {service.name} in {city.city}, {city.state}
            </h1>
            <p className="mt-5 max-w-prose text-body-lg text-ink-body">
              {city.homeStyleNote}
            </p>
          </div>

          <LocalLedger fields={ledger} caption={SHARED.costDisclaimer} />

          <div className="grid gap-12 py-14 pb-section lg:grid-cols-12 lg:gap-16 lg:py-16">
            <div className="lg:col-span-8">
              <ProseBody paragraphs={body} />
              <InlineLeadForm
                headline={`Get ${service.shortName.toLowerCase()} quotes in ${city.city}`}
                body="Free, no obligation, and contractors who work in your town."
                prefill={{ city: city.city, state: city.state, service: service.slug }}
              />
              <FaqSection faqs={faqs} />
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <nav aria-label="Parent pages">
                  <h2 className="eyebrow text-cranberry">Up a level</h2>
                  <ul className="mt-4 space-y-2.5 border-y-hairline border-shell py-4">
                    <li>
                      <Link
                        href={getCityUrl(city)}
                        className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                      >
                        All services in {city.city}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/services/${service.slug}/`}
                        className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                      >
                        {service.name} across all three states
                      </Link>
                    </li>
                  </ul>
                </nav>

                {nearby.length ? (
                  <nav aria-label="Same service nearby" className="mt-8">
                    <h2 className="eyebrow text-cranberry">
                      {service.shortName} nearby
                    </h2>
                    <ul className="mt-4 divide-y-hairline divide-shell border-y-hairline border-shell">
                      {nearby.map((n) => (
                        <li key={`${n.state}-${n.slug}`}>
                          <Link
                            href={getCityServiceUrl(n, service.slug)}
                            className="group flex items-baseline justify-between gap-3 py-3"
                          >
                            <span className="text-body-sm text-ink-body transition-colors duration-micro ease-out group-hover:text-cranberry">
                              {n.city}
                            </span>
                            <span className="shrink-0 font-mono text-mono text-ink-muted">
                              {serviceCostBand(n, service.slug)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : null}

                <nav aria-label="Other services here" className="mt-8">
                  <h2 className="eyebrow text-cranberry">Other work in {city.city}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {otherServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={getCityServiceUrl(city, s.slug)}
                          className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {s.name} in {city.city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Sub-categories" className="mt-8">
                  <h2 className="eyebrow text-cranberry">Covered under {service.shortName}</h2>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {service.subServices.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={`/services/${service.slug}/${sub.slug}/`}
                          className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </Container>
      </main>

      <JsonLd
        data={graph(
          serviceSchema({
            name: `${service.name} in ${city.city}, ${city.state}`,
            description: `${service.name} on ${city.city} housing stock. ${city.homeStyleNote}`,
            path: `/locations/${params.state}/${params.city}/${params.service}/`,
            areaServed: { city: city.city, state: STATE_NAMES[code] },
          }),
          breadcrumbSchema(crumbs),
          faqSchema(faqs)
        )}
      />
    </>
  );
}
