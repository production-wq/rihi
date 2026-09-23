import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/data/services";
import { img, SERVICE_IMAGES } from "@/lib/images";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
];

export const metadata: Metadata = buildMetadata({
  title: "Seven service categories across RI, MA, and CT",
  description:
    "Roofing, windows, siding, bathrooms, kitchens, entry doors, and gutters across Rhode Island, Massachusetts, and Connecticut. Real cost ranges on every page. Free quotes.",
  path: "/services/",
});

export default function ServicesIndexPage() {
  return (
    <>
      <Header solid />
      <main id="main">
        <PageHero
          eyebrow="Services"
          title="Seven categories, three states"
          lede="Most contractors in this region do exteriors or interiors, not both. Every page below carries real cost ranges for this market, which is something no competitor here publishes."
          crumbs={CRUMBS}
        />

        <Container width="wide">
          <div className="grid gap-px border-hairline border-shell bg-shell py-0 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const image = img(SERVICE_IMAGES[service.slug].card);
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="group flex flex-col bg-surface-raised transition-colors duration-base ease-out hover:bg-oyster"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-slow ease-out motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-display-sm transition-colors duration-micro ease-out group-hover:text-cranberry">
                      {service.name}
                    </h2>
                    <p className="mt-3 flex-1 text-body-sm text-ink-body">
                      {service.description}
                    </p>
                    <p className="mt-5 font-mono text-mono uppercase text-ink-muted">
                      {service.subServices.length} sub-categories
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <InlineLeadForm
            headline="Not sure which category you need?"
            body="Describe the problem and we will match it. Free, and no obligation to hire anyone."
          />
        </Container>
      </main>

      <JsonLd
        data={graph(
          collectionPageSchema({
            name: "Home improvement services across Rhode Island, Massachusetts, and Connecticut",
            description:
              "Seven service categories covering exteriors and interiors across three states.",
            path: "/services/",
          }),
          breadcrumbSchema(CRUMBS)
        )}
      />
    </>
  );
}
