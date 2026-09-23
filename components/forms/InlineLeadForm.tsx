import Link from "next/link";
import { SHARED } from "@/lib/content";

/**
 * Inline CTA band for use partway down a long page.
 *
 * Links to the estimate page rather than embedding the form, deliberately. A
 * service x city page should ship close to zero client-side JavaScript, per
 * CLAUDE.md section 13, and embedding the form on 273 pages would put the
 * validation bundle on every one of them. The full form is one click away.
 *
 * Prefill carries the city and service through so nothing is retyped.
 */
export function InlineLeadForm({
  headline = SHARED.inlineCta.headline,
  body = SHARED.inlineCta.body,
  prefill,
}: {
  headline?: string;
  body?: string;
  prefill?: { city?: string; state?: string; service?: string };
}) {
  const params = new URLSearchParams();
  if (prefill?.city) params.set("city", prefill.city);
  if (prefill?.state) params.set("state", prefill.state);
  if (prefill?.service) params.set("service", prefill.service);
  const query = params.toString();

  return (
    <aside className="my-12 rounded-card border-hairline border-shell bg-surface-sunken p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
      <div>
        <p className="font-display text-display-sm text-ink">{headline}</p>
        <p className="mt-2 max-w-prose text-body-sm text-ink-body">{body}</p>
      </div>
      <Link
        href={`/free-estimate/${query ? `?${query}` : ""}`}
        className="mt-5 inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-control bg-action px-6 text-body font-medium text-white transition-colors duration-micro ease-out hover:bg-action-hover md:mt-0"
      >
        {SHARED.inlineCta.button}
      </Link>
    </aside>
  );
}
