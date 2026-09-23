import { type LedgerField } from "@/lib/copy/ledger";
import { SHARED } from "@/lib/content";

/**
 * The Local Ledger.
 *
 * CLAUDE.md section 7: a mono-set data strip near the top of every city hub and
 * every service x city page, carrying four to six real, verifiable local facts.
 * It is the one thing on the page that no competitor has, and it is what makes
 * the page verifiably local rather than a find-and-replace template.
 *
 * Styling is fixed and must not be varied per page. The fields themselves come
 * from lib/copy/ledger.ts, which throws rather than emitting an empty one.
 *
 * At 390px the grid collapses to a single column so values stay legible rather
 * than shrinking. That is the specific failure the mobile rule calls out.
 */
export function LocalLedger({
  fields,
  caption,
}: {
  fields: LedgerField[];
  caption?: string;
}) {
  return (
    <section aria-label={SHARED.ledgerHeading} className="ledger rounded-card">
      <h2 className="sr-only">{SHARED.ledgerHeading}</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field, i) => (
          <div
            key={field.label}
            className={`border-shell px-5 py-4 border-b-hairline
              ${i % 2 === 0 ? "sm:border-r-hairline" : ""}
              lg:border-r-hairline ${i % 3 === 2 ? "lg:border-r-0" : ""}`}
          >
            <dt className="ledger-label">{field.label}</dt>
            <dd className="ledger-value mt-1.5 break-words">{field.value}</dd>
          </div>
        ))}
      </dl>
      {caption ? (
        <p className="border-t-hairline border-shell px-5 py-3 font-mono text-mono uppercase text-ink-muted">
          {caption}
        </p>
      ) : null}
    </section>
  );
}
