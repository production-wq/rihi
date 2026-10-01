import Link from "next/link";

export interface ServiceLinkItem {
  slug: string;
  name: string;
  href: string;
  /** One line under the name. */
  blurb?: string;
  /** Mono figure on the right, such as a cost band for this market. */
  meta?: string;
}

/**
 * All seven services, linked from the bottom of a location page.
 *
 * This is the location to service half of the bidirectional link structure in
 * CLAUDE.md section 10. The caller supplies the hrefs, because the right
 * destination depends on the tier: a city hub links to its service x city
 * pages, and a state hub links to the statewide service hubs.
 */
export function ServiceLinkBlock({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro?: string;
  items: ServiceLinkItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="mt-16" aria-labelledby="service-link-heading">
      <h2 id="service-link-heading" className="text-display-md">
        {heading}
      </h2>
      {intro ? <p className="mt-4 max-w-prose text-body-lg text-ink-body">{intro}</p> : null}

      <ul className="mt-8 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.slug} className="bg-surface-raised">
            <Link
              href={item.href}
              className="group flex h-full min-h-[44px] flex-col p-5 transition-colors duration-base ease-out hover:bg-oyster"
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-display text-body-lg text-ink transition-colors duration-micro ease-out group-hover:text-cranberry">
                  {item.name}
                </span>
                {item.meta ? (
                  <span className="shrink-0 font-mono text-mono text-ink-muted">{item.meta}</span>
                ) : null}
              </span>
              {item.blurb ? (
                <span className="mt-2 text-body-sm text-ink-body">{item.blurb}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
