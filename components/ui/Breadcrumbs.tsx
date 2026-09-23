import Link from "next/link";

/**
 * Breadcrumbs on every page below the homepage, matching the URL hierarchy
 * exactly. See CLAUDE.md section 10.
 *
 * The last crumb is the current page and is not a link. Schema is emitted
 * separately through lib/schema.ts, never hand-written here.
 */
export function Breadcrumbs({
  crumbs,
}: {
  crumbs: Array<{ name: string; path: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="py-1">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-mono uppercase text-ink-muted">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-x-2">
              {isLast ? (
                <span aria-current="page" className="inline-flex min-h-[44px] items-center text-ink">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    className="link-rise inline-flex min-h-[44px] items-center transition-colors duration-micro ease-out hover:text-ink"
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-granite-faint">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
