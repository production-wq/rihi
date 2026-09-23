import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS, getToolBySlug } from "@/lib/data/tools";
import { TOOL_COPY } from "@/lib/copy/tool-copy";
import { getLiveCities } from "@/lib/phase";
import { getServiceBySlug } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema, softwareApplicationSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FaqSection } from "@/components/sections/FaqSection";
import { RoofingCalculator } from "@/components/tools/RoofingCalculator";
import { BathroomCalculator } from "@/components/tools/BathroomCalculator";
import { EnergyCalculator } from "@/components/tools/EnergyCalculator";
import { RoiCalculator } from "@/components/tools/RoiCalculator";
import { MaterialComparison } from "@/components/tools/MaterialComparison";

/**
 * Tool pages. Five calculators.
 *
 * Page structure per docs/tools-spec.md: calculator above the fold, then how
 * the calculation works and what it assumes, what the tool cannot know, links
 * to related services and guides, and FAQs marked up as FAQPage.
 *
 * The live city list is passed from this server component into the client
 * calculator, which is how the ACTIVE_PHASE gate reaches a client component
 * without a client-side import of the data layer.
 */

export function generateStaticParams() {
  return TOOLS.map((t) => ({ tool: t.slug }));
}

export function generateMetadata({ params }: { params: { tool: string } }): Metadata {
  const tool = getToolBySlug(params.tool);
  if (!tool) return {};

  return buildMetadata({
    title: tool.name,
    description: `${tool.name} for Rhode Island, Massachusetts, and Connecticut. ${tool.metaDetail}. Free, no email required, and the result shows before any form.`,
    path: `/tools/${tool.slug}/`,
  });
}

export default function ToolPage({ params }: { params: { tool: string } }) {
  const tool = getToolBySlug(params.tool);
  const copy = TOOL_COPY[params.tool];
  if (!tool || !copy) notFound();

  const cities = getLiveCities();
  const service = getServiceBySlug(tool.service);
  const others = TOOLS.filter((t) => t.slug !== tool.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Cost Tools", path: "/tools/" },
    { name: tool.shortName, path: `/tools/${tool.slug}/` },
  ];

  const calculators: Record<string, React.ReactNode> = {
    "roofing-cost-calculator": <RoofingCalculator cities={cities} />,
    "bathroom-remodel-cost-calculator": <BathroomCalculator cities={cities} />,
    "energy-savings-estimator": <EnergyCalculator cities={cities} />,
    "home-improvement-roi-calculator": <RoiCalculator cities={cities} />,
    "material-comparison-tool": <MaterialComparison cities={cities} />,
  };

  return (
    <>
      <Header solid />
      <main id="main">
        <Container width="wide">
          <Breadcrumbs crumbs={crumbs} />

          <div className="max-w-[46rem] pb-8 pt-2">
            <p className="eyebrow text-cranberry">Cost tool</p>
            <h1 className="mt-4 text-display-lg">{tool.name}</h1>
            <p className="mt-5 max-w-prose text-body-lg text-ink-body">{copy.lede}</p>
          </div>

          {/* Calculator above the fold. No lead gate: the result renders first. */}
          {calculators[tool.slug]}

          <div className="grid gap-12 py-section lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="prose-body">
                <h2>How this is calculated</h2>
                {copy.how.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                <h2>What this tool cannot know</h2>
                <p>
                  Every one of these matters to the final number and none of them can be read off a
                  form. They are the reason the output is a range and the reason a contractor still
                  has to look at the house.
                </p>
              </div>

              <ul className="mt-5 divide-y-hairline divide-shell border-y-hairline border-shell">
                {copy.cannotKnow.map((item) => (
                  <li key={item} className="py-3 text-body text-ink-body">
                    {item}
                  </li>
                ))}
              </ul>

              <FaqSection faqs={copy.faqs} />
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                {service ? (
                  <nav aria-label="Related service">
                    <h2 className="eyebrow text-cranberry">Related</h2>
                    <ul className="mt-4 space-y-2.5 border-y-hairline border-shell py-4">
                      <li>
                        <Link
                          href={`/services/${service.slug}/`}
                          className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {service.name} across all three states
                        </Link>
                      </li>
                      {service.subServices.slice(0, 3).map((sub) => (
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
                ) : null}

                <nav aria-label="Other tools" className="mt-8">
                  <h2 className="eyebrow text-cranberry">Other cost tools</h2>
                  <ul className="mt-4 divide-y-hairline divide-shell border-y-hairline border-shell">
                    {others.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/tools/${t.slug}/`}
                          className="block py-3 text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                        >
                          {t.name}
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
          softwareApplicationSchema({
            name: tool.name,
            description: tool.description,
            path: `/tools/${tool.slug}/`,
          }),
          breadcrumbSchema(crumbs),
          faqSchema(copy.faqs)
        )}
      />
    </>
  );
}
