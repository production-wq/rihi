"use client";

import { useMemo, useState } from "react";
import { Field, controlClasses } from "./ToolShell";
import type { City } from "@/lib/data/cities";

/**
 * Town picker.
 *
 * Sources from the live city list passed in by the server component, which is
 * how the ACTIVE_PHASE gate reaches a client component without a client-side
 * import of the data layer. At phase 1 that is 39 towns; at full rollout it is
 * 559, which is why this filters as you type rather than rendering a select
 * with 559 options.
 *
 * The town drives the regional cost multiplier and surfaces the housing-stock
 * defaults, so it is required rather than optional on every tool.
 */
export function TownSelect({
  cities,
  value,
  onChange,
  state,
}: {
  cities: City[];
  value: string;
  onChange: (slug: string) => void;
  state: string;
}) {
  const [query, setQuery] = useState("");

  const inState = useMemo(
    () => cities.filter((c) => !state || c.state === state),
    [cities, state]
  );

  const matches = useMemo(() => {
    if (!query.trim()) return inState.slice(0, 8);
    const q = query.toLowerCase();
    return inState.filter((c) => c.city.toLowerCase().includes(q)).slice(0, 8);
  }, [inState, query]);

  const selected = inState.find((c) => c.slug === value);

  if (!inState.length) {
    return (
      <Field label="Town" htmlFor="town" help="No town pages are live yet in this state.">
        <input
          id="town"
          className={controlClasses}
          disabled
          value=""
          placeholder="Not available"
        />
      </Field>
    );
  }

  return (
    <Field
      label="Town"
      htmlFor="town"
      help="Sets the regional cost adjustment and the housing stock defaults."
    >
      {selected ? (
        <div className="flex items-center justify-between gap-3 rounded-control border-hairline border-shell bg-oyster px-3.5 py-3">
          <span className="text-body text-ink">
            {selected.city}
            <span className="ml-2 font-mono text-mono text-ink-muted">{selected.region}</span>
          </span>
          <button
            type="button"
            onClick={() => {
              onChange("");
              setQuery("");
            }}
            className="min-h-[44px] shrink-0 px-2 font-mono text-mono uppercase text-cranberry transition-colors duration-micro ease-out hover:text-action-hover"
          >
            Change
          </button>
        </div>
      ) : (
        <>
          <input
            id="town"
            type="text"
            role="combobox"
            aria-expanded={matches.length > 0}
            aria-controls="town-options"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={controlClasses}
          />
          {matches.length ? (
            <ul
              id="town-options"
              className="mt-2 max-h-56 overflow-y-auto rounded-control border-hairline border-shell"
            >
              {matches.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => onChange(c.slug)}
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 bg-surface-raised px-3.5 py-2 text-left text-body-sm text-ink transition-colors duration-micro ease-out hover:bg-shell-light"
                  >
                    <span>{c.city}</span>
                    <span className="font-mono text-mono text-ink-muted">{c.region}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-caption text-ink-muted">
              No live town page matches that. Use the quote form and we will handle it directly.
            </p>
          )}
        </>
      )}
    </Field>
  );
}
