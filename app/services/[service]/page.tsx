import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getServiceBySlug } from "@/lib/data/services";
import { SERVICE_HUB } from "@/lib/copy/service-hub";
import { SERVICE_COST } from "@/lib/data/cost-data";
import { getLiveCities } from "@/lib/phase";
import { img, SERVICE_IMAGES } from "@/lib/images";
import { buildMetadata, metaTemplates } from "@/lib/seo";
import { graph, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { FaqSection } from "@/components/sections/FaqSection";
import { CityLinkBlock } from "@/components/sections/CityLinkBlock";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";

/**
 * Statewide service hub. Seven pages.
 *
 * Internal linking, per CLAUDE.md section 10. This page links down to all of
 * its sub-services, down to its service x city pages for live cities grouped by
 * state and region, across to the other six service hubs, and to the three
 * state hubs.
 */

export function generateStaticParams() {
  return SERVICES.map((s) => ({ service: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { service: string };
}): Metadata {
  const service = getServiceBySlug(params.service);
  const copy = SERVICE_HUB[params.service];
  if (!service || !copy) return {};

  return buildMetadata({
    title: service.heroHeadline,
    description: metaTemplates.serviceHub(service.name, copy.metaDetail),
    path: `/services/${service.slug}/`,
    image: img(SERVICE_IMAGES[service.slug].hero),
  });
}

export default function ServiceHubPage({ params }: { params: { service: string } }) {
  const service = getServiceBySlug(params.service);
  const copy = SERVICE_HUB[params.service];
  if (!service || !copy) notFound();

  const cities = getLiveCities();
  const band = SERVICE_COST[service.slug];
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.shortName, path: `/services/${service.slug}/` },
  ];

  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Service"
          title={service.heroHeadline}
          lede={copy.lede}
          image={img(SERVICE_IMAGES[service.slug].hero)}
          crumbs={crumbs}
        />

        <Container width="wide">
          <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
            <div className="lg:col-span-8">
              <div className="prose-body">
                {copy.sections.map((section) => (
                  <section key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </section>
                ))}
              </div>

              <InlineLeadForm prefill={{ service: service.slug }} />

              <FaqSection faqs={[...copy.faqs]} />
            </div>

            {/* Sidebar. Cost band, sub-services, and the lateral service links. */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-card border-hairline border-shell bg-shell-light p-5">
                  <p className="ledger-label">Typical range, this market</p>
                  <p className="mt-2 font-mono text-display-sm text-ink">
                    ${band.low.toLocaleString("en-US")} to ${band.high.toLocaleString("en-US")}
                  </p>
                  <p className="mt-3 text-caption text-ink-muted">{band.basis}.</p>
                  <p className="mt-3 text-caption text-ink-muted">
                    Before adjusting for your town. An estimate for this market, not a quote.
                  </p>
                </div>

                <nav aria-label={`${service.name} sub-categories`} className="mt-8">
                  <h2 className="eyebrow text-cranberry">In this category</h2>
                  <ul className="mt-4 divide-y-hairline divide-shell border-y-hairline border-shell">
                    {service.subServices.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={`/services/${service.slug}/${sub.slug}/`}
                          className="group block py-4 transition-colors duration-micro ease-out"
                        >
                          <span className="font-display text-body-lg text-ink transition-colors duration-micro ease-out group-hover:text-cranberry">
                            {sub.name}
                          </span>
                          <span className="mt-1 block text-body-sm text-ink-body">
                            {sub.description.split(". ")[0]}.
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Other services" className="mt-8">
                  <h2 className="eyebrow text-cranberry">Other categories</h2>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {others.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}/`}
                          className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {s.shortName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="States covered" className="mt-8">
                  <h2 className="eyebrow text-cranberry">States covered</h2>
                  <ul className="mt-4 space-y-2">
                    {[
                      ["Rhode Island", "rhode-island"],
                      ["Massachusetts", "massachusetts"],
                      ["Connecticut", "connecticut"],
                    ].map(([name, slug]) => (
                      <li key={slug}>
                        <Link
                          href={`/locations/${slug}/`}
                          className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {service.shortName} in {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>

          <CityLinkBlock
            cities={cities}
            serviceSlug={service.slug}
            heading={`${service.name} by town`}
            intro={`Each town has its own ${service.shortName.toLowerCase()} page with the housing stock, the permitting authority, and a cost range for that market specifically.`}
          />
        </Container>
      </main>

      <JsonLd
        data={graph(
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path: `/services/${service.slug}/`,
          }),
          breadcrumbSchema(crumbs),
          faqSchema([...copy.faqs])
        )}
      />
    </>
  );
}
