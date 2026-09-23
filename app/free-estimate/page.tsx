import type { Metadata } from "next";
import { FREE_ESTIMATE_PAGE } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { EstimateFormWithParams } from "@/components/forms/EstimateFormWithParams";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Free quotes", path: "/free-estimate/" },
];

export const metadata: Metadata = buildMetadata({
  title: FREE_ESTIMATE_PAGE.headline,
  description:
    "One form, contractors who actually work in your town across RI, MA, and CT. No cost, no obligation, and most people hear back the same day.",
  path: "/free-estimate/",
});

export default function FreeEstimatePage() {
  return (
    <>
      <Header solid />
      <main id="main">
        <Container width="wide">
          <Breadcrumbs crumbs={CRUMBS} />

          <div className="grid gap-12 py-8 lg:grid-cols-12 lg:gap-16 lg:py-10">
            <div className="lg:col-span-7">
              <h1 className="text-display-lg">{FREE_ESTIMATE_PAGE.headline}</h1>
              <p className="mt-5 max-w-prose text-body-lg text-ink-body">
                {FREE_ESTIMATE_PAGE.subheadline}
              </p>

              <div className="mt-10 rounded-card border-hairline border-shell bg-surface-raised p-6 md:p-8">
                <EstimateFormWithParams />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <h2 className="eyebrow text-cranberry">
                  {FREE_ESTIMATE_PAGE.whatHappensHeadline}
                </h2>
                <ol className="mt-6 space-y-6">
                  {FREE_ESTIMATE_PAGE.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 font-mono text-mono text-cranberry"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-body-lg text-ink">{step.title}</h3>
                        <p className="mt-1 max-w-prose text-body-sm text-ink-body">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </main>

      <JsonLd data={graph(breadcrumbSchema(CRUMBS))} />
    </>
  );
}
