import type { Metadata } from "next";
import { PRIVACY } from "@/lib/copy/legal";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: PRIVACY.headline, path: "/privacy-policy/" },
];

export const metadata: Metadata = buildMetadata({
  title: PRIVACY.headline,
  description: PRIVACY.intro,
  path: "/privacy-policy/",
});

export default function LegalPage() {
  return (
    <>
      <Header solid />
      <main id="main">
        <Container>
          <Breadcrumbs crumbs={CRUMBS} />
          <div className="max-w-prose py-8 pb-section">
            <h1 className="text-display-lg">{PRIVACY.headline}</h1>
            <p className="mt-3 font-mono text-mono uppercase text-ink-muted">
              {PRIVACY.updated}
            </p>
            <p className="mt-6 text-body-lg text-ink-body">{PRIVACY.intro}</p>

            <div className="prose-body mt-4">
              {PRIVACY.sections.map((section) => (
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
