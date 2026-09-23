import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  SERVICES,
  getServiceBySlug,
  getSubService,
  getAllSubServicePaths,
} from "@/lib/data/services";
import { buildMetadata, metaTemplates } from "@/lib/seo";
import { graph, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqSection } from "@/components/sections/FaqSection";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { subServiceCopy } from "@/lib/copy/subservice";

/**
 * Sub-service page. 38 pages.
 *
 * Narrow and technical, per CLAUDE.md section 11.
 *
 * Link graph, per section 10: up to the parent service hub, across to sibling
 * sub-services within the same category only. It deliberately does NOT link
 * directly to city pages. That path runs through the service hub, and adding a
 * shortcut here would flatten a silo that is doing useful work.
 */

export function generateStaticParams() {
  return getAllSubServicePaths();
}

export function generateMetadata({
  params,
}: {
  params: { service: string; subService: string };
}): Metadata {
  const sub = getSubService(params.service, params.subService);
  if (!sub) return {};
  const copy = subServiceCopy(params.service, params.subService);

  // The specific detail is the first clause of the researched description,
  // which is genuinely about the work rather than about the category.
  const detail = (copy?.lede ?? sub.description)
    .split(/(?<=\.)\s/)[0]
    .replace(/\.$/, "");

  return buildMetadata({
    title: sub.name,
    description: metaTemplates.subService(sub.name, detail),
    path: `/services/${params.service}/${params.subService}/`,
  });
}

export default function SubServicePage({
  params,
}: {
  params: { service: string; subService: string };
}) {
  const service = getServiceBySlug(params.service);
  const sub = getSubService(params.service, params.subService);
  if (!service || !sub) notFound();

  const copy = subServiceCopy(params.service, params.subService);
  const siblings = service.subServices.filter((s) => s.slug !== sub.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: service.shortName, path: `/services/${service.slug}/` },
    { name: sub.name, path: `/services/${service.slug}/${sub.slug}/` },
  ];

  return (
    <>
      <Header solid />
      <main id="main">
        <Container width="wide">
          <Breadcrumbs crumbs={crumbs} />

          <div className="grid gap-12 py-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="eyebrow text-cranberry">{service.name}</p>
              <h1 className="mt-4 text-display-lg">{sub.name}</h1>
              <p className="mt-5 max-w-prose text-body-lg text-ink-body">
                {copy?.lede ?? sub.description}
              </p>

              {copy ? (
                <>
                  <div className="prose-body mt-10">
                    {copy.sections.map((section) => (
                      <section key={section.heading}>
                        <h2>{section.heading}</h2>
                        {section.paragraphs.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </section>
                    ))}
                  </div>

                  <InlineLeadForm prefill={{ service: service.slug }} />
                  <FaqSection faqs={copy.faqs} />
                </>
              ) : (
                <div className="prose-body mt-10">
                  <p>{sub.description}</p>
                  <InlineLeadForm prefill={{ service: service.slug }} />
                </div>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <nav aria-label="Parent category">
                  <h2 className="eyebrow text-cranberry">Part of</h2>
                  <p className="mt-3 border-y-hairline border-shell py-4">
                    <Link
                      href={`/services/${service.slug}/`}
                      className="link-rise font-display text-body-lg text-ink transition-colors duration-micro ease-out hover:text-cranberry"
                    >
                      {service.name}
                    </Link>
                  </p>
                </nav>

                <nav aria-label="Related work" className="mt-8">
                  <h2 className="eyebrow text-cranberry">Also under {service.shortName}</h2>
                  <ul className="mt-4 divide-y-hairline divide-shell border-y-hairline border-shell">
                    {siblings.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${service.slug}/${s.slug}/`}
                          className="block py-3 text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {s.name}
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
            name: sub.name,
            description: sub.description,
            path: `/services/${service.slug}/${sub.slug}/`,
          }),
          breadcrumbSchema(crumbs),
          ...(copy?.faqs.length ? [faqSchema(copy.faqs)] : [])
        )}
      />
    </>
  );
}
