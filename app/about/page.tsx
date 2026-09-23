import Image from "next/image";
import type { Metadata } from "next";
import { ABOUT, SITE } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { img } from "@/lib/images";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
];

export const metadata: Metadata = buildMetadata({
  title: ABOUT.headline,
  description:
    "A referral service, not a contractor. We publish what work costs across RI, MA, and CT, and connect homeowners with contractors who work in their town.",
  path: "/about/",
  image: img("about-jobsite"),
});

export default function AboutPage() {
  const image = img("about-jobsite");

  return (
    <>
      <Header solid />
      <main id="main">
        <Container width="wide">
          <Breadcrumbs crumbs={CRUMBS} />

          <div className="grid gap-12 py-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h1 className="text-display-lg">{ABOUT.headline}</h1>
              <div className="prose-body mt-8">
                {ABOUT.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <h2 className="mt-14 text-display-md">{ABOUT.coverageHeadline}</h2>
              <p className="mt-4 max-w-prose text-body-lg text-ink-body">
                {ABOUT.coverageBody}
              </p>

              <InlineLeadForm />
            </div>

            {/*
              The grid break on this page: the image runs past the container to
              the right edge of the viewport at large sizes.
            */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/2] overflow-hidden rounded-card lg:aspect-[4/5] lg:-mr-[max(0px,calc((100vw-1320px)/2))]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 font-mono text-mono uppercase text-ink-muted">
                {SITE.brandShort} does not perform work. Contractors do.
              </p>
            </div>
          </div>
        </Container>
      </main>

      <JsonLd data={graph(breadcrumbSchema(CRUMBS))} />
    </>
  );
}
