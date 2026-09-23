import Link from "next/link";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/data/tools";
import { LAST_REVIEWED } from "@/lib/data/cost-data";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Cost Tools", path: "/tools/" },
];

export const metadata: Metadata = buildMetadata({
  title: "Cost tools for RI, MA, and CT home improvement",
  description:
    "Five calculators with real regional cost data: roofing, bathrooms, energy savings, project ROI, and material comparison. No email required, and the result shows first.",
  path: "/tools/",
});

export default function ToolsIndexPage() {
  return (
    <>
      <Header solid />
      <main id="main">
        <PageHero
          eyebrow="Cost tools"
          title="Numbers, before anyone comes to your house"
          lede="No competitor covering these three states publishes cost figures at all. Every one says free estimate and stops. These five tools give you a real range for your town and your house, with no email required and the result on screen before any form."
          crumbs={CRUMBS}
        />

        <Container width="wide">
          <div className="grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2">
            {TOOLS.map((tool, i) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className={`group flex flex-col bg-surface-raised p-7 transition-colors duration-base ease-out hover:bg-oyster lg:p-8 ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <p className="font-mono text-mono uppercase text-cranberry">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2
                  className={`mt-3 transition-colors duration-micro ease-out group-hover:text-cranberry ${
                    i === 0 ? "text-display-md" : "text-display-sm"
                  }`}
                >
                  {tool.name}
                </h2>
                <p className="mt-4 max-w-prose flex-1 text-body-sm text-ink-body">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>

          <section className="py-section">
            <div className="max-w-prose">
              <h2 className="text-display-md">Why the numbers are here at all</h2>
              <p className="mt-4 text-body-lg text-ink-body">
                This is a referral service, not a contractor. There is no product line to defend and
                no job that needs selling, which means these tools can say when a repair beats a
                replacement, when vinyl is the right answer, and when an upgrade will not pay for
                itself. A contractor who needs to win the work cannot really publish any of that.
              </p>
              <p className="mt-5 text-body-lg text-ink-body">
                Every figure is an estimate for this market based on typical scope, never a quote.
                The cost data is reviewed on a schedule and the review date shows on every tool, so
                if it goes stale you can see that it has.
              </p>
              <p className="mt-5 font-mono text-mono uppercase text-ink-muted">
                Cost data reviewed {LAST_REVIEWED}
              </p>
            </div>
          </section>
        </Container>
      </main>

      <JsonLd
        data={graph(
          collectionPageSchema({
            name: "Home improvement cost tools for Rhode Island, Massachusetts, and Connecticut",
            description: "Five calculators using regional cost data for this market.",
            path: "/tools/",
          }),
          breadcrumbSchema(CRUMBS)
        )}
      />
    </>
  );
}
