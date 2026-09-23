import type { Metadata } from "next";
import { TERMS } from "@/lib/copy/legal";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: TERMS.headline, path: "/terms-conditions/" },
];

export const metadata: Metadata = buildMetadata({
  title: TERMS.headline,
  description: TERMS.intro,
  path: "/terms-conditions/",
});

export default function LegalPage() {
  return (
    <>
      <Header solid />
      <main id="main">
        <Container>
          <Breadcrumbs crumbs={CRUMBS} />
          <div className="max-w-prose py-8 pb-section">
            <h1 className="text-display-lg">{TERMS.headline}</h1>
            <p className="mt-3 font-mono text-mono uppercase text-ink-muted">
              {TERMS.updated}
            </p>
            <p className="mt-6 text-body-lg text-ink-body">{TERMS.intro}</p>

            <div className="prose-body mt-4">
              {TERMS.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </main>

      <JsonLd data={graph(breadcrumbSchema(CRUMBS))} />
    </>
  );
}
