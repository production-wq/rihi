import Image from "next/image";
import Link from "next/link";
import { HOME } from "@/lib/content";
import { img, SERVICE_IMAGES } from "@/lib/images";
import { Container } from "@/components/ui/Container";

/**
 * The seven service cards.
 *
 * Deliberately not three evenly spaced cards with an icon above the text, which
 * CLAUDE.md section 7 names as the specific templated shape to avoid. This is an
 * asymmetric grid: the first card runs wide across two columns with a larger
 * image, the rest fall into a three-up. Seven items divide badly into three,
 * and making the first one carry the extra width is more honest than padding
 * with an eighth card nobody needs.
 */
export function ServiceGrid() {
  return (
    <section className="py-section lg:py-section-lg">
      <Container width="wide">
        <div className="max-w-prose">
          <h2 className="text-display-lg">{HOME.services.headline}</h2>
          <p className="mt-4 text-body-lg text-ink-body">{HOME.services.subheadline}</p>
        </div>

        <div className="mt-12 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-3">
          {HOME.serviceCards.map((card, i) => {
            const image = img(SERVICE_IMAGES[card.slug].card);
            const wide = i === 0;

            return (
              <Link
                key={card.slug}
                href={`/services/${card.slug}/`}
                className={`group flex flex-col bg-surface-raised transition-colors duration-base ease-out hover:bg-oyster ${
                  wide ? "sm:col-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${wide ? "aspect-[16/7]" : "aspect-[3/2]"}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={wide ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                    className="object-cover transition-transform duration-slow ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-display-sm transition-colors duration-micro ease-out group-hover:text-cranberry">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-body-sm text-ink-body">{card.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-mono uppercase text-cranberry">
                    See {card.title.toLowerCase()}
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-base ease-out motion-safe:group-hover:translate-x-1"
                    >
                      <path
                        d="M9 1l4 4-4 4M13 5H1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
