import Link from "next/link";
import { NOT_FOUND } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

/**
 * 404.
 *
 * Copy lives in content.ts. The page states plainly that city pages roll out in
 * stages, which is true and is the most likely reason a homeowner lands here:
 * a city that is not live under the current phase returns a 404 rather than a
 * redirect or a soft "coming soon", per CLAUDE.md section 9.
 */
export default function NotFound() {
  return (
    <>
      <Header solid />
      <main id="main">
        <Container>
          <div className="max-w-prose py-24 lg:py-32">
            <p className="eyebrow text-cranberry">404</p>
            <h1 className="mt-4 text-display-lg">{NOT_FOUND.headline}</h1>
            <p className="mt-5 text-body-lg text-ink-body">{NOT_FOUND.body}</p>
            <ul className="mt-9 space-y-3">
              {NOT_FOUND.suggestions.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="link-rise text-body-lg text-action transition-colors duration-micro ease-out"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </main>
    </>
  );
}
