import { HOME } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { EstimateForm } from "@/components/forms/EstimateForm";

/**
 * Final CTA with the form inline.
 *
 * The form sits on the page rather than behind a link, because a homeowner who
 * has read this far should not have to navigate again to act. The layout is an
 * asymmetric split rather than a centred block, per CLAUDE.md section 7 on
 * avoiding the final-centred-CTA shape.
 */
export function FinalCta() {
  return (
    <section id="get-quotes" className="bg-marsh py-section lg:py-section-lg">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-display-lg text-white">{HOME.finalCta.headline}</h2>
            <p className="mt-5 max-w-prose text-body-lg text-oyster/80">{HOME.finalCta.body}</p>
          </div>
          <div className="rounded-card bg-oyster p-6 md:p-8 lg:col-span-7">
            <EstimateForm compact />
          </div>
        </div>
      </Container>
    </section>
  );
}
