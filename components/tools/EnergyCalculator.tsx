"use client";

import { useState } from "react";
import type { City } from "@/lib/data/cities";
import { ENERGY_MEASURES, INCENTIVE_PROGRAMS, FEDERAL_CREDIT_NOTE, LAST_REVIEWED } from "@/lib/data/cost-data";
import { calculateEnergy } from "@/lib/tools/calculate";
import { ToolShell, ResultRange, LeadHandoff, Field, controlClasses } from "./ToolShell";
import { TownSelect } from "./TownSelect";
import type { StateCode } from "@/lib/data/cities";

/**
 * The tool most exposed to the incentive-accuracy problem.
 *
 * Every program panel is qualitative. No dollar figure appears for any rebate,
 * incentive, or tax credit, because those terms change, sometimes mid-year, and
 * docs/tools-spec.md forbids guessing at them. Each panel carries the date the
 * terms were checked, which is the visible forcing function.
 *
 * The other rule this tool exists to honour: be honest when the answer is no.
 * Where payback exceeds 25 years, it says so plainly rather than burying it.
 */
export function EnergyCalculator({ cities }: { cities: City[] }) {
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [squareFeet, setSquareFeet] = useState(1800);
  const [homeAge, setHomeAge] = useState("1900-1940");
  const [currentWindows, setCurrentWindows] = useState("single-storms");
  const [windowCount, setWindowCount] = useState(16);
  const [atticInsulation, setAttic] = useState("under-6");
  const [wallInsulation, setWall] = useState("unknown");
  const [fuel, setFuel] = useState("gas");
  const [annualSpend, setAnnualSpend] = useState("");
  const [measures, setMeasures] = useState<string[]>(["attic", "air-seal"]);

  const city = cities.find((c) => c.slug === town && c.state === state) ?? null;
  const result = calculateEnergy({
    state, city, squareFeet, homeAge, currentWindows, windowCount, atticInsulation,
    wallInsulation, fuel, annualSpend: annualSpend ? Number(annualSpend) : null, measures,
  });

  const programs = state ? INCENTIVE_PROGRAMS[state as StateCode] ?? [] : [];

  function toggle(value: string) {
    setMeasures((m) => (m.includes(value) ? m.filter((x) => x !== value) : [...m, value]));
  }

  return (
    <ToolShell
      result={
        <>
          <ResultRange label="Estimated annual savings" low={result.annualSavings.low} high={result.annualSavings.high} />

          <div className="mt-4 grid gap-px border-hairline border-shell bg-shell">
            <div className="bg-shell-light px-5 py-4">
              <p className="ledger-label">Heating load reduction</p>
              <p className="ledger-value mt-1.5">{result.reductionPercent.low}% to {result.reductionPercent.high}%</p>
            </div>
            <div className="bg-shell-light px-5 py-4">
              <p className="ledger-label">Ten year cumulative</p>
              <p className="ledger-value mt-1.5">
                ${result.tenYear.low.toLocaleString()} to ${result.tenYear.high.toLocaleString()}
              </p>
            </div>
            {result.paybackYears ? (
              <div className="bg-shell-light px-5 py-4">
                <p className="ledger-label">Simple payback</p>
                <p className="ledger-value mt-1.5">
                  {result.paybackYears.low} to {result.paybackYears.high} years
                </p>
              </div>
            ) : null}
          </div>

          {result.poorPayback ? (
            <div className="mt-5 rounded-card border-hairline border-warning/40 bg-warning/5 p-5">
              <p className="font-mono text-mono uppercase text-warning">Worth saying plainly</p>
              <p className="mt-2 text-body-sm text-ink-body">
                At this payback period the upgrade is unlikely to pay for itself on energy alone.
                There are still good reasons to do it: comfort, noise, condensation, how the windows
                operate, and appearance. Energy savings is just not the honest argument for it.
              </p>
            </div>
          ) : null}

          {result.measures.length ? (
            <dl className="mt-5 divide-y-hairline divide-shell border-y-hairline border-shell">
              {result.measures.map((m) => (
                <div key={m.label} className="py-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-body-sm text-ink-body">{m.label}</dt>
                    <dd className="shrink-0 font-mono text-mono text-ink">
                      ${m.low.toLocaleString()} to ${m.high.toLocaleString()}
                    </dd>
                  </div>
                  <p className="mt-1 text-caption text-ink-muted">{m.note}</p>
                </div>
              ))}
            </dl>
          ) : null}

          {programs.length ? (
            <div className="mt-6 rounded-card border-hairline border-shell bg-surface-raised p-5">
              <p className="ledger-label">Programs in this state</p>
              {programs.map((p) => (
                <div key={p.name} className="mt-3">
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="link-rise text-body-sm font-medium text-action">{p.name}</a>
                  <p className="mt-1 text-caption text-ink-body">{p.description}</p>
                </div>
              ))}
              <p className="mt-3 text-caption text-ink-body">{FEDERAL_CREDIT_NOTE}</p>
              <p className="mt-3 font-mono text-mono uppercase text-ink-muted">
                Program terms verified {LAST_REVIEWED}. Confirm current terms before relying on them.
              </p>
            </div>
          ) : null}

          <LeadHandoff
            label="Get quotes for this work"
            city={city?.city}
            state={state}
            service={measures.includes("windows") ? "windows" : "siding"}
            description={`Energy work on a ${squareFeet} sq ft house. Planned: ${measures.join(", ") || "not decided"}. ${windowCount} windows.`}
          />
        </>
      }
    >
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="State" htmlFor="state">
            <select id="state" value={state} onChange={(e) => { setState(e.target.value); setTown(""); }} className={controlClasses}>
              <option value="">Choose a state</option>
              <option value="RI">Rhode Island</option>
              <option value="MA">Massachusetts</option>
              <option value="CT">Connecticut</option>
            </select>
          </Field>
          <TownSelect cities={cities} value={town} onChange={setTown} state={state} />
          <Field label="Home square footage" htmlFor="sqft">
            <input id="sqft" type="number" min={600} max={6000} step={50} value={squareFeet}
              onChange={(e) => setSquareFeet(Number(e.target.value))} className={controlClasses} />
          </Field>
          <Field label="When the house was built" htmlFor="homeAge">
            <select id="homeAge" value={homeAge} onChange={(e) => setHomeAge(e.target.value)} className={controlClasses}>
              <option value="post-1980">Post-2000</option>
              <option value="1940-1980">1980 to 2000</option>
              <option value="1940-1980">1940 to 1980</option>
              <option value="1900-1940">1900 to 1940</option>
              <option value="pre-1900">Pre-1900</option>
            </select>
          </Field>
          <Field label="Current windows" htmlFor="windows">
            <select id="windows" value={currentWindows} onChange={(e) => setCurrentWindows(e.target.value)} className={controlClasses}>
              <option value="single-none">Single pane, no storms</option>
              <option value="single-storms">Single pane with storms</option>
              <option value="old-double">Older double pane, pre-1990</option>
              <option value="modern-double">Modern double pane</option>
              <option value="triple">Triple pane</option>
            </select>
          </Field>
          <Field label="Number of windows" htmlFor="count" help="A cape has 12 to 16. A triple decker has 40 to 60.">
            <input id="count" type="number" min={4} max={80} value={windowCount}
              onChange={(e) => setWindowCount(Number(e.target.value))} className={controlClasses} />
          </Field>
          <Field label="Attic insulation" htmlFor="attic">
            <select id="attic" value={atticInsulation} onChange={(e) => setAttic(e.target.value)} className={controlClasses}>
              <option value="none">None or unknown</option>
              <option value="under-6">Under 6 inches</option>
              <option value="6-12">6 to 12 inches</option>
              <option value="over-12">Over 12 inches</option>
            </select>
          </Field>
          <Field label="Wall insulation" htmlFor="wall">
            <select id="wall" value={wallInsulation} onChange={(e) => setWall(e.target.value)} className={controlClasses}>
              <option value="none">None, likely pre-1940</option>
              <option value="unknown">Unknown</option>
              <option value="blown">Blown-in retrofit</option>
              <option value="full">Full cavity</option>
            </select>
          </Field>
          <Field label="Heating fuel" htmlFor="fuel">
            <select id="fuel" value={fuel} onChange={(e) => setFuel(e.target.value)} className={controlClasses}>
              <option value="gas">Natural gas</option>
              <option value="oil">Oil</option>
              <option value="propane">Propane</option>
              <option value="electric">Electric resistance</option>
              <option value="heat-pump">Heat pump</option>
            </select>
          </Field>
          <Field label="Annual heating spend" htmlFor="spend" help="Optional. Leave blank and we estimate it from size, fuel, and age.">
            <input id="spend" type="number" min={500} max={8000} step={50} value={annualSpend}
              onChange={(e) => setAnnualSpend(e.target.value)} className={controlClasses} />
          </Field>
        </div>

        <fieldset className="border-t-hairline border-shell pt-5">
          <legend className="text-body-sm font-medium text-ink">Planned upgrades</legend>
          <div className="mt-3 grid gap-1">
            {ENERGY_MEASURES.map((m) => (
              <label key={m.value} className="flex min-h-[44px] items-center gap-3">
                <input type="checkbox" checked={measures.includes(m.value)} onChange={() => toggle(m.value)}
                  className="h-5 w-5 rounded-control accent-cranberry" />
                <span className="text-body-sm text-ink">{m.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </ToolShell>
  );
}
