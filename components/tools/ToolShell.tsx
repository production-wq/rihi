"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { LAST_REVIEWED } from "@/lib/data/cost-data";
import { SHARED } from "@/lib/content";

/**
 * Shared chrome for the five tools.
 *
 * Enforces the rules at the top of docs/tools-spec.md so no individual tool can
 * forget one:
 *
 *   The disclaimer is always present and always says an estimate is not a quote.
 *   The lastReviewed date renders in the UI, so stale cost data is publicly
 *   visible. That is the intended forcing function, per the quarterly review
 *   note in that document.
 *   There is no lead gate. The result renders before any contact details are
 *   requested, because gating the number kills both the ranking signal and the
 *   trust the tool exists to build.
 */
export function ToolShell({
  children,
  result,
}: {
  children: ReactNode;
  result: ReactNode;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <div className="rounded-card border-hairline border-shell bg-surface-raised p-6 md:p-7">
          {children}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          {result}
          <p className="mt-4 text-caption text-ink-muted">{SHARED.costDisclaimer}</p>
          <p className="mt-2 font-mono text-mono uppercase text-ink-muted">
            Cost data reviewed {LAST_REVIEWED}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ResultRange({
  label,
  low,
  high,
  prefix = "$",
  suffix = "",
}: {
  label: string;
  low: number;
  high: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-card bg-marsh p-6 md:p-7">
      <p className="font-mono text-mono uppercase text-cranberry-light">{label}</p>
      <p className="mt-3 font-mono text-display-md leading-tight text-white">
        {prefix}
        {low.toLocaleString("en-US")}
        {suffix}
        <span className="mx-2 text-oyster/50">to</span>
        {prefix}
        {high.toLocaleString("en-US")}
        {suffix}
      </p>
    </div>
  );
}

export function Breakdown({
  items,
}: {
  items: Array<{ label: string; amount: number; note?: string }>;
}) {
  if (!items.length) return null;

  return (
    <dl className="mt-5 divide-y-hairline divide-shell border-y-hairline border-shell">
      {items.map((item) => (
        <div key={item.label} className="py-3">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-body-sm text-ink-body">{item.label}</dt>
            <dd className="shrink-0 font-mono text-mono text-ink">
              {item.amount < 0 ? "-" : ""}${Math.abs(item.amount).toLocaleString("en-US")}
            </dd>
          </div>
          {item.note ? (
            <p className="mt-1 max-w-prose text-caption text-ink-muted">{item.note}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

/**
 * The lead handoff. Rendered under every result, never above it.
 *
 * Prefills the estimate form with the town, state, service, and a generated
 * description built from what the homeowner already entered, so nothing is
 * retyped at the highest-intent moment on the site.
 */
export function LeadHandoff({
  label,
  city,
  state,
  service,
  description,
}: {
  label: string;
  city?: string;
  state?: string;
  service: string;
  description: string;
}) {
  const params = new URLSearchParams();
  if (city) params.set("city", city);
  if (state) params.set("state", state);
  params.set("service", service);
  params.set("description", description);

  return (
    <Link
      href={`/free-estimate/?${params.toString()}`}
      className="mt-5 flex min-h-[52px] items-center justify-center rounded-control bg-action px-6 text-body font-medium text-white transition-colors duration-micro ease-out hover:bg-action-hover"
    >
      {label}
    </Link>
  );
}

export function Field({
  label,
  htmlFor,
  help,
  children,
}: {
  label: string;
  htmlFor: string;
  help?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-body-sm font-medium text-ink">
        {label}
      </label>
      {help ? <p className="mt-1 text-caption text-ink-muted">{help}</p> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}

export const controlClasses = `w-full min-h-[48px] rounded-control border-hairline border-shell
  bg-oyster px-3.5 py-2.5 text-body text-ink
  transition-colors duration-micro ease-out
  hover:border-granite-faint focus:border-cranberry`;
