"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
 *
 * The option list renders as an absolutely positioned overlay. In normal flow
 * it inflated its grid row by its own height, which pushed the control in the
 * neighbouring column to the bottom of a very tall row and defeated the
 * baseline alignment the Field component exists to maintain.
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
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Close on outside click and on Escape. The list is an overlay, so leaving it
  // open while the user moves elsewhere on the form would cover other fields.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

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
        <div ref={boxRef} className="relative">
          <input
            id="town"
            type="text"
            role="combobox"
            aria-expanded={open && matches.length > 0}
            aria-controls="town-options"
            aria-autocomplete="list"
            autoComplete="off"
            placeholder="Start typing a town"
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            className={controlClasses}
          />

          {open && matches.length ? (
            <ul
              id="town-options"
              className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-y-auto rounded-control border-hairline border-shell bg-surface-raised shadow-raised"
            >
              {matches.map((c) => (
                <li key={`${c.state}-${c.slug}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(c.slug);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-body-sm text-ink transition-colors duration-micro ease-out hover:bg-shell-light"
                  >
                    <span>{c.city}</span>
                    <span className="shrink-0 font-mono text-mono text-ink-muted">{c.region}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          {open && query.trim() && !matches.length ? (
            <p className="absolute left-0 right-0 top-full z-20 mt-1 rounded-control border-hairline border-shell bg-surface-raised px-3.5 py-3 text-caption text-ink-muted shadow-raised">
              No live town page matches that. Use the quote form and we will handle it directly.
            </p>
          ) : null}
        </div>
      )}
    </Field>
  );
}
