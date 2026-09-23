import Link from "next/link";
import { FOOTER, SITE } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { getLiveCities } from "@/lib/phase";
import { getCityUrl, STATE_NAMES, type StateCode } from "@/lib/data/cities";

/**
 * Site footer.
 *
 * The city link block sources from getLiveCities(), never from a phase file.
 * CLAUDE.md section 5: "A city that is not live must not appear anywhere in the
 * site's internal link graph or in the sitemap."
 *
 * The block is grouped by state and capped, because section 10 forbids
 * generating a link block by looping over all cities without grouping and
 * limiting. At full rollout an ungrouped footer would carry 559 links on every
 * page, which dilutes every link on the site and reads as a doorway.
 *
 * The disclosure paragraph is legally load-bearing. It states plainly that this
 * is not a contractor and does not perform work. Do not shorten it.
 */
const CITIES_PER_STATE = 12;

export function Footer() {
  const live = getLiveCities();
  const states = ["RI", "MA", "CT"] as const;

  const byState = states
    .map((state) => ({
      state,
      cities: live.filter((c) => c.state === state).slice(0, CITIES_PER_STATE),
      total: live.filter((c) => c.state === state).length,
    }))
    .filter((group) => group.cities.length > 0);

  return (
    <footer className="mt-section-lg border-t-hairline border-marsh-mid bg-marsh text-ink-inverse">
      <Container width="wide">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          <div>
            <p className="font-display text-display-sm text-ink-inverse">
              {SITE.brandShort}
              <span className="text-cranberry-light">.</span>
            </p>
            <p className="mt-3 max-w-[32ch] text-body-sm text-oyster/70">{SITE.tagline}</p>
          </div>

          {FOOTER.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="eyebrow text-oyster/50">{column.heading}</h2>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-rise inline-flex min-h-[44px] items-center text-body-sm text-oyster/85 transition-colors duration-micro ease-out hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {byState.length ? (
          <div className="border-t-hairline border-marsh-mid py-10">
            <h2 className="eyebrow text-oyster/50">Towns with pages live now</h2>
            <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {byState.map((group) => (
                <div key={group.state}>
                  <h3 className="font-mono text-mono uppercase text-oyster/70">
                    {STATE_NAMES[group.state as StateCode]}
                  </h3>
                  <ul className="mt-1 flex flex-wrap gap-x-5">
                    {group.cities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          href={getCityUrl(city)}
                          className="link-rise inline-flex min-h-[44px] items-center text-body-sm text-oyster/75 transition-colors duration-micro ease-out hover:text-white"
                        >
                          {city.city}
                        </Link>
                      </li>
                    ))}
                    {group.total > group.cities.length ? (
                      <li>
                        <Link
                          href={`/locations/${group.state === "RI" ? "rhode-island" : group.state === "MA" ? "massachusetts" : "connecticut"}/`}
                          className="link-rise inline-flex min-h-[44px] items-center text-body-sm text-cranberry-light transition-colors duration-micro ease-out hover:text-white"
                        >
                          All {group.total} towns
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="border-t-hairline border-marsh-mid py-8">
          <p className="max-w-prose text-body-sm leading-relaxed text-oyster/60">
            {FOOTER.disclosure}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-mono text-mono uppercase text-oyster/40">
              &copy; {new Date().getFullYear()} {SITE.brandName}
            </p>
            {FOOTER.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-rise inline-flex min-h-[44px] items-center font-mono text-mono uppercase text-oyster/50 transition-colors duration-micro ease-out hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
