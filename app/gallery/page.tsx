import Image from "next/image";
import type { Metadata } from "next";
import { GALLERY } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { img, GALLERY_BY_SERVICE } from "@/lib/images";
import { SERVICES } from "@/lib/data/services";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery/" },
];

export const metadata: Metadata = buildMetadata({
  title: GALLERY.headline,
  description:
    "Finished work on New England housing: triple deckers, capes, colonials, Victorians, and coastal cottages across Rhode Island, Massachusetts, and Connecticut.",
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <Header solid />
      <main id="main">
        <Container width="wide">
          <Breadcrumbs crumbs={CRUMBS} />

          <div className="max-w-prose py-8">
            <h1 className="text-display-lg">{GALLERY.headline}</h1>
            <p className="mt-5 text-body-lg text-ink-body">{GALLERY.subheadline}</p>
            {/*
              Stated plainly and on the page, not buried. docs/image-prompts.md
              section 4 requires it: these are illustrative renderings of
              finished work, not photographs of projects this business
              performed, and they must not be captioned as completed projects or
              attached to a town name implying a real job.
            */}
            <p className="mt-6 rounded-card border-hairline border-shell bg-surface-sunken px-5 py-4 text-body-sm text-ink-body">
              {GALLERY.placeholder}
            </p>
          </div>

          <div className="space-y-14 pb-section">
            {SERVICES.map((service) => {
              const slots = GALLERY_BY_SERVICE[service.slug] ?? [];
              if (!slots.length) return null;

              return (
                <section key={service.slug}>
                  <h2 className="eyebrow text-cranberry">{service.name}</h2>
                  <div className="mt-5 grid gap-6 md:grid-cols-2">
                    {slots.map((slot) => {
                      const image = img(slot);
                      return (
                        <figure key={slot}>
                          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(min-width: 768px) 50vw, 100vw"
                              className="object-cover"
                            />
                          </div>
                          <figcaption className="mt-3 text-body-sm text-ink-body">
                            {image.alt}
                          </figcaption>
                        </figure>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </main>

      <JsonLd data={graph(breadcrumbSchema(CRUMBS))} />
    </>
  );
}
