"use client";

import { useState } from "react";
import type { City } from "@/lib/data/cities";
import { RECOUP_RATE } from "@/lib/data/cost-data";
import { calculateRoi } from "@/lib/tools/calculate";
import { ToolShell, ResultRange, LeadHandoff, Field, controlClasses } from "./ToolShell";
import { TownSelect } from "./TownSelect";

/**
 * The honest framing is the feature here, per docs/tools-spec.md tool 4.
 *
 * Where recoup is under 60 percent the tool says directly that the project is
 * mostly a lifestyle decision. Where the homeowner is not selling, it leads
 * with that rather than with the ROI number, because ROI is close to
 * irrelevant to them. Every competitor overstates this; not overstating it is
 * the differentiator.
 */
export function RoiCalculator({ cities }: { cities: City[] }) {
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [homeValue, setHomeValue] = useState(450000);
  const [project, setProject] = useState("roof-asphalt");
  const [projectCost, setProjectCost] = useState(18000);
  const [selling, setSelling] = useState("3-7");

  const city = cities.find((c) => c.slug === town && c.state === state) ?? null;
  const result = calculateRoi({ state, city, homeValue, project, projectCost, selling });
  const label = RECOUP_RATE.find((r) => r.value === project)?.label ?? "";

  return (
    <ToolShell
      result={
        <>
          <ResultRange label="Value recouped at resale" low={result.recouped} high={result.recouped} />

          <div className="mt-4 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2">
            <div className="bg-shell-light px-5 py-4">
              <p className="ledger-label">Recoup rate</p>
              <p className="ledger-value mt-1.5">{result.roiPercent}%</p>
            </div>
            <div className="bg-shell-light px-5 py-4">
              <p className="ledger-label">Net cost to you</p>
              <p className="ledger-value mt-1.5">${result.netCost.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-5 rounded-card border-hairline border-shell bg-surface-raised p-5">
            <p className="ledger-label">The plain read</p>
            <p className="mt-2 text-body-sm text-ink-body">{result.verdict}</p>
          </div>

          <LeadHandoff
            label="Get quotes for this project"
            city={city?.city}
            state={state}
            service={result.service}
            description={`${label}. Estimated budget around $${projectCost.toLocaleString()}.`}
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
        </div>

        <Field label="Project" htmlFor="project">
          <select id="project" value={project} onChange={(e) => setProject(e.target.value)} className={controlClasses}>
            {RECOUP_RATE.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Current home value" htmlFor="homeValue">
            <input id="homeValue" type="number" min={100000} max={3000000} step={10000} value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))} className={controlClasses} />
          </Field>
          <Field label="Estimated project cost" htmlFor="cost" help="Carry this across from the roofing or bathroom calculator if you have used one.">
            <input id="cost" type="number" min={1000} max={200000} step={500} value={projectCost}
              onChange={(e) => setProjectCost(Number(e.target.value))} className={controlClasses} />
          </Field>
        </div>

        <Field label="Planning to sell" htmlFor="selling" help="This changes which number actually matters to you.">
          <select id="selling" value={selling} onChange={(e) => setSelling(e.target.value)} className={controlClasses}>
            <option value="within-1">Within 1 year</option>
            <option value="1-3">1 to 3 years</option>
            <option value="3-7">3 to 7 years</option>
            <option value="not-selling">Not planning to sell</option>
          </select>
        </Field>
      </div>
    </ToolShell>
  );
}
