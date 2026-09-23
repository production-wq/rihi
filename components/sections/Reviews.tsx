import { HOME } from "@/lib/content";
import { Container } from "@/components/ui/Container";

/**
 * Homepage reviews.
 *
 * -----------------------------------------------------------------------------
 * THIS SECTION DOES NOT RENDER IN PRODUCTION AND THAT IS CORRECT
 * -----------------------------------------------------------------------------
 * The three reviews in lib/content.ts are written examples, not customer
 * feedback, and they are flagged `isPlaceholder: true`. CLAUDE.md section 9 and
 * docs/seo-strategy.md section 9 both state the rule: never publish fabricated
 * testimonials, and run the site without a reviews section rather than with a
 * fake one.
 *
 * So the flag gates rendering. In development the section renders with a
 * visible warning so the layout can be designed, which is the reason the copy
 * exists at all. In production it returns null.
 *
 * No Review or AggregateRating schema is attached anywhere. Marking up invented
 * testimonials as structured data is review fraud, exposes the business to FTC
 * action under the endorsement rules, and risks a manual action. When real
 * first-party reviews exist, replace the content, drop the flag, and only then
 * add the schema.
 */
export function Reviews() {
  const isDev = process.env.NODE_ENV === "development";

  if (HOME.reviews.isPlaceholder && !isDev) return null;

  return (
    <section className="py-section lg:py-section-lg">
      <Container width="wide">
        {HOME.reviews.isPlaceholder ? (
          <p className="mb-8 rounded-card border-hairline border-warning/40 bg-warning/5 px-5 py-4 font-mono text-mono uppercase text-warning">
            Development only. These reviews are placeholders and do not render in
            production. Replace with verified first-party reviews before launch, or
            delete the section. No review schema is emitted.
          </p>
        ) : null}

        <h2 className="max-w-prose text-display-lg">{HOME.reviews.headline}</h2>

        <div className="mt-10 grid gap-px border-hairline border-shell bg-shell md:grid-cols-3">
          {HOME.reviews.items.map((review) => (
            <figure key={review.body} className="flex flex-col bg-surface-raised p-7">
              <blockquote className="flex-1 text-body text-ink-body">
                {review.body}
              </blockquote>
              <figcaption className="mt-6 border-t-hairline border-shell pt-4">
                <p className="text-body-sm font-medium text-ink">{review.name}</p>
                <p className="mt-0.5 font-mono text-mono uppercase text-ink-muted">
                  {review.location}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
