import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, metaTemplates } from "@/lib/seo";
import { graph, breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { FaqSection } from "@/components/sections/FaqSection";
import { CityLinkBlock } from "@/components/sections/CityLinkBlock";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { STATE_HUB } from "@/lib/copy/state-hub";
import { SERVICES } from "@/lib/data/services";
import { getLiveCities } from "@/lib/phase";
import { SLUG_TO_STATE, STATE_NAMES, STATE_SLUGS, type StateCode } from "@/lib/data/cities";

/**
 * State hub. Three pages.
 *
 * Per CLAUDE.md section 10, this links down to every live city in the state
 * grouped by region, across to the seven service hubs, and across to the other
 * two state hubs.
 *
 * These pages render at every phase, including phase 0 when no city is live.
 * That is correct: the state is genuinely covered by the referral network
 * whether or not its city pages are built yet, so the hub states coverage
 * honestly rather than linking to pages that would 404.
 */

const TOTALS: Record<StateCode, { count: number; unit: string }> = {
  RI: { count: 39, unit: "municipalities" },
  MA: { count: 351, unit: "cities and towns" },
  CT: { count: 169, unit: "municipalities" },
};

export function generateStaticParams() {
  return Object.values(STATE_SLUGS).map((state) => ({ state }));
}

export function generateMetadata({ params }: { params: { state: string } }): Metadata {
  const code = SLUG_TO_STATE[params.state];
  if (!code) return {};
  const copy = STATE_HUB[code];
  const total = TOTALS[code];

  return buildMetadata({
    title: `Home improvement contractors across ${STATE_NAMES[code]}`,
    description: metaTemplates.stateHub(
      STATE_NAMES[code],
      total.count,
      total.unit,
      copy.metaDetail
    ),
    path: `/locations/${params.state}/`,
  });
}

export default function StateHubPage({ params }: { params: { state: string } }) {
  const code = SLUG_TO_STATE[params.state];
  if (!code) notFound();

  const copy = STATE_HUB[code];
  const total = TOTALS[code];
  const cities = getLiveCities().filter((c) => c.state === code);
  const others = (["RI", "MA", "CT"] as StateCode[]).filter((s) => s !== code);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Locations", path: "/locations/" },
    { name: STATE_NAMES[code], path: `/locations/${params.state}/` },
  ];

  return (
    <>
      <Header solid />
      <main id="main">
        <PageHero
          eyebrow={`${total.count} ${total.unit}`}
          title={`Home improvement across ${STATE_NAMES[code]}`}
          lede={copy.lede}
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

              <InlineLeadForm prefill={{ state: code }} />
              <FaqSection faqs={[...copy.faqs]} />
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <nav aria-label="Services">
                  <h2 className="eyebrow text-cranberry">Services in {STATE_NAMES[code]}</h2>
                  <ul className="mt-4 divide-y-hairline divide-shell border-y-hairline border-shell">
                    {SERVICES.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}/`}
                          className="link-rise block py-3 text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Other states" className="mt-8">
                  <h2 className="eyebrow text-cranberry">Other states</h2>
                  <ul className="mt-4 space-y-2">
                    {others.map((s) => (
                      <li key={s}>
                        <Link
                          href={`/locations/${STATE_SLUGS[s]}/`}
                          className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {STATE_NAMES[s]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>

          {cities.length ? (
            <div className="pb-section">
              <CityLinkBlock
                cities={cities}
                heading={`Towns in ${STATE_NAMES[code]}`}
                intro={`${cities.length} of ${total.count} ${total.unit} have pages live now, grouped by region. Each one covers the housing stock actually standing there, the permitting authority, and cost ranges for that market.`}
              />
            </div>
          ) : (
            <section className="py-section">
              <div className="max-w-prose rounded-card border-hairline border-shell bg-surface-sunken p-7">
                <h2 className="text-display-sm">Town pages are rolling out</h2>
                <p className="mt-3 text-body text-ink-body">
                  Coverage across all {total.count} {total.unit} in {STATE_NAMES[code]} is being
                  added in stages. If your town does not have a page yet, use the quote form and
                  we will handle it directly.
                </p>
              </div>
            </section>
          )}
        </Container>
      </main>

      <JsonLd
        data={graph(
          collectionPageSchema({
            name: `Home improvement contractors across ${STATE_NAMES[code]}`,
            description: copy.lede,
            path: `/locations/${params.state}/`,
          }),
          breadcrumbSchema(crumbs),
          faqSchema([...copy.faqs])
        )}
      />
    </>
  );
}
