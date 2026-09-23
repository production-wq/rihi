"use client";

import { useState } from "react";
import type { City } from "@/lib/data/cities";
import { MATERIALS, EXPOSURE } from "@/lib/data/cost-data";
import { calculateMaterials } from "@/lib/tools/calculate";
import { ToolShell, LeadHandoff, Field, controlClasses } from "./ToolShell";
import { TownSelect } from "./TownSelect";

/**
 * Never declares a single winner, per docs/tools-spec.md tool 5.
 *
 * The output gives separate answers on separate axes: lowest upfront, lowest
 * lifetime, best in coastal exposure, and most likely to be approved in a
 * historic district. Different materials genuinely win on different axes, and
 * saying so is the credibility this tool is built on. A contractor selling one
 * siding line cannot publish this; a referral service with no product to defend
 * can.
 */
const CATEGORY_SERVICE: Record<string, string> = {
  siding: "siding",
  roofing: "roofing",
  windows: "windows",
  "entry-doors": "entry-doors",
};

const QUANTITY_LABEL: Record<string, string> = {
  siding: "Wall area, square feet",
  roofing: "Roof surface, square feet",
  windows: "Number of windows",
  "entry-doors": "Number of doors",
};

export function MaterialComparison({ cities }: { cities: City[] }) {
  const [category, setCategory] = useState("siding");
  const [selected, setSelected] = useState<string[]>(["vinyl", "fiber-cement"]);
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [quantity, setQuantity] = useState(1800);
  const [exposure, setExposure] = useState("inland");
  const [yearsInHome, setYears] = useState("15-plus");

  const city = cities.find((c) => c.slug === town && c.state === state) ?? null;
  const pool = MATERIALS[category] ?? [];
  const result = calculateMaterials({
    category, materials: selected, state, city, quantity, exposure, yearsInHome,
  });

  function toggle(value: string) {
    setSelected((s) =>
      s.includes(value) ? s.filter((x) => x !== value) : s.length >= 4 ? s : [...s, value]
    );
  }

  function changeCategory(next: string) {
    setCategory(next);
    setSelected((MATERIALS[next] ?? []).slice(0, 2).map((m) => m.value));
    setQuantity(next === "windows" ? 16 : next === "entry-doors" ? 1 : 1800);
  }

  return (
    <ToolShell
      result={
        <>
          {result.rows.length >= 2 ? (
            <div className="rounded-card bg-marsh p-6">
              <p className="font-mono text-mono uppercase text-cranberry-light">
                Different answers on different axes
              </p>
              <dl className="mt-4 space-y-3">
                {[
                  ["Lowest upfront cost", result.bestUpfront],
                  ["Lowest lifetime cost", result.bestLifetime],
                  ["Best in coastal exposure", result.bestCoastal],
                  ["Most likely approved in a historic district", result.bestHistoric],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-wrap items-baseline justify-between gap-2">
                    <dt className="text-body-sm text-oyster/70">{label}</dt>
                    <dd className="font-mono text-mono-lg text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <div className="rounded-card border-hairline border-shell bg-shell-light p-6">
              <p className="text-body-sm text-ink-body">Choose at least two materials to compare.</p>
            </div>
          )}

          {result.rows.length ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Material comparison over {result.years} years</caption>
                <thead>
                  <tr className="border-b-hairline border-shell">
                    <th scope="col" className="py-2 pr-3 font-mono text-mono uppercase text-ink-muted">Material</th>
                    <th scope="col" className="py-2 pr-3 font-mono text-mono uppercase text-ink-muted">Upfront</th>
                    <th scope="col" className="py-2 font-mono text-mono uppercase text-ink-muted">Over {result.years} yr</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row) => (
                    <tr key={row.material.value} className="border-b-hairline border-shell align-top">
                      <th scope="row" className="py-3 pr-3 text-body-sm font-medium text-ink">
                        {row.material.label}
                        <span className="mt-1 block font-normal text-caption text-ink-muted">
                          {row.material.lifeLow} to {row.material.lifeHigh} yr life. {row.material.maintenance}.
                        </span>
                      </th>
                      <td className="py-3 pr-3 font-mono text-mono text-ink">
                        ${row.upfront.low.toLocaleString()}
                        <span className="block text-ink-muted">to ${row.upfront.high.toLocaleString()}</span>
                      </td>
                      <td className="py-3 font-mono text-mono text-ink">
                        ${row.lifetimeCost.low.toLocaleString()}
                        <span className="block text-ink-muted">to ${row.lifetimeCost.high.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {result.warnings.length ? (
            <div className="mt-5 space-y-3">
              {result.warnings.map((w) => (
                <p key={w} className="rounded-card border-hairline border-shell bg-shell-light px-5 py-4 text-body-sm text-ink-body">
                  {w}
                </p>
              ))}
            </div>
          ) : null}

          <LeadHandoff
            label="Get quotes on these options"
            city={city?.city}
            state={state}
            service={CATEGORY_SERVICE[category] ?? "siding"}
            description={`Comparing ${result.rows.map((r) => r.material.label).join(" and ")} for ${category}. Roughly ${quantity} ${category === "windows" || category === "entry-doors" ? "units" : "square feet"}.`}
          />
        </>
      }
    >
      <div className="grid gap-5">
        <Field label="Category" htmlFor="category">
          <select id="category" value={category} onChange={(e) => changeCategory(e.target.value)} className={controlClasses}>
            <option value="siding">Siding</option>
            <option value="roofing">Roofing</option>
            <option value="windows">Windows</option>
            <option value="entry-doors">Entry doors</option>
          </select>
        </Field>

        <fieldset className="border-t-hairline border-shell pt-5">
          <legend className="text-body-sm font-medium text-ink">Materials to compare, two to four</legend>
          <div className="mt-3 grid gap-1">
            {pool.map((m) => (
              <label key={m.value} className="flex min-h-[44px] items-center gap-3">
                <input type="checkbox" checked={selected.includes(m.value)} onChange={() => toggle(m.value)}
                  disabled={!selected.includes(m.value) && selected.length >= 4}
                  className="h-5 w-5 rounded-control accent-cranberry" />
                <span className="text-body-sm text-ink">{m.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 border-t-hairline border-shell pt-5 sm:grid-cols-2">
          <Field label="State" htmlFor="state">
            <select id="state" value={state} onChange={(e) => { setState(e.target.value); setTown(""); }} className={controlClasses}>
              <option value="">Choose a state</option>
              <option value="RI">Rhode Island</option>
              <option value="MA">Massachusetts</option>
              <option value="CT">Connecticut</option>
            </select>
          </Field>
          <TownSelect cities={cities} value={town} onChange={setTown} state={state} />
          <Field label={QUANTITY_LABEL[category]} htmlFor="quantity">
            <input id="quantity" type="number" min={1} step={category === "windows" || category === "entry-doors" ? 1 : 50}
              value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className={controlClasses} />
          </Field>
          <Field label="Exposure" htmlFor="exposure">
            <select id="exposure" value={exposure} onChange={(e) => setExposure(e.target.value)} className={controlClasses}>
              {EXPOSURE.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </Field>
          <Field label="Years you plan to stay" htmlFor="years" help="Drives the lifetime cost view. Under five years, upfront cost matters more.">
            <select id="years" value={yearsInHome} onChange={(e) => setYears(e.target.value)} className={controlClasses}>
              <option value="under-5">Under 5 years</option>
              <option value="5-15">5 to 15 years</option>
              <option value="15-plus">15 or more</option>
              <option value="indefinite">Indefinitely</option>
            </select>
          </Field>
        </div>
      </div>
    </ToolShell>
  );
}
