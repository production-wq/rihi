import Image from "next/image";
import { HOME } from "@/lib/content";
import { img, type ImageName } from "@/lib/images";
import { Container } from "@/components/ui/Container";

/**
 * The three "why start here" points.
 *
 * Each pairs with a specific image from docs/image-prompts.md section 7, chosen
 * to sit behind its own claim rather than being decorative. The layout
 * alternates image side, which breaks the three-identical-cards pattern.
 *
 * None of these three claims requires a licence, insurance, or a track record.
 * That is deliberate and it is checked: see CLAUDE.md section 8 on what this
 * business may and may not say.
 */
const TRUST_IMAGES: ImageName[] = ["trust-pricing", "trust-response", "trust-coverage"];

export function WhyUs() {
  return (
    <section className="border-y-hairline border-shell bg-surface-sunken py-section lg:py-section-lg">
      <Container width="wide">
        <h2 className="max-w-prose text-display-lg">{HOME.whyUs.headline}</h2>

        <div className="mt-12 grid gap-12 lg:gap-16">
          {HOME.whyUs.points.map((point, i) => {
            const image = img(TRUST_IMAGES[i]);
            const flipped = i % 2 === 1;

            return (
              <article
                key={point.title}
                className="grid items-center gap-8 md:grid-cols-12 md:gap-12"
              >
                <div
                  className={`md:col-span-4 ${flipped ? "md:order-2" : ""}`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-card">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className={`md:col-span-8 ${flipped ? "md:order-1" : ""}`}>
                  <p className="eyebrow text-cranberry">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-display-md">{point.title}</h3>
                  <p className="mt-4 max-w-prose text-body-lg text-ink-body">{point.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
