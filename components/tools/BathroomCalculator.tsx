"use client";

import { useState } from "react";
import type { City } from "@/lib/data/cities";
import { BATH_PROJECT, BATH_SIZE, BATH_PLUMBING, BATH_WASTE_LINE, BATH_FINISH, HOME_AGE } from "@/lib/data/cost-data";
import { calculateBathroom } from "@/lib/tools/calculate";
import { ToolShell, ResultRange, Breakdown, LeadHandoff, Field, controlClasses } from "./ToolShell";
import { TownSelect } from "./TownSelect";

export function BathroomCalculator({ cities }: { cities: City[] }) {
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  // Tub to shower conversion is the default because it is the largest winnable
  // term in the project, per docs/tools-spec.md, so it should be the path of
  // least resistance through this tool.
  const [project, setProject] = useState("tub-to-shower");
  const [size, setSize] = useState("standard");
  const [plumbing, setPlumbing] = useState("none");
  const [homeAge, setHomeAge] = useState("1940-1980");
  const [wasteLine, setWasteLine] = useState("unknown");
  const [finish, setFinish] = useState("mid");
  const [secondFloor, setSecondFloor] = useState(false);
  const [historic, setHistoric] = useState(false);

  const city = cities.find((c) => c.slug === town && c.state === state) ?? null;
  const result = calculateBathroom({
    state, city, project, size, plumbing, homeAge, wasteLine, finish, secondFloor,
    historicDistrict: historic,
  });
  const projectLabel = BATH_PROJECT.find((p) => p.value === project)?.label ?? "";
  const sizeLabel = BATH_SIZE.find((s) => s.value === size)?.label ?? "";

  return (
    <ToolShell
      result={
        <>
          <ResultRange label={`Estimated ${projectLabel.toLowerCase()}`} low={result.range.low} high={result.range.high} />
          <div className="mt-4 rounded-card border-hairline border-shell bg-shell-light px-5 py-4">
            <p className="ledger-label">Working days on site</p>
            <p className="ledger-value mt-1.5">{result.days[0]} to {result.days[1]} days</p>
            <p className="mt-2 text-caption text-ink-muted">
              Working days, so a 20 day project is roughly a month on the calendar. If this is your
              only bathroom, ask for the toilet to be back in service overnight.
            </p>
          </div>
          <Breakdown items={result.items} />
          <LeadHandoff
            label="Get quotes for this bathroom"
            city={city?.city}
            state={state}
            service="bathroom-remodeling"
            description={`${projectLabel}. ${sizeLabel}. ${BATH_PLUMBING.find((p) => p.value === plumbing)?.label ?? ""}.`}
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
            {BATH_PROJECT.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </Field>

        <Field label="Does the plumbing move" htmlFor="plumbing" help="The single largest cost variable in any bathroom. In a slab-on-grade house it means cutting concrete.">
          <select id="plumbing" value={plumbing} onChange={(e) => setPlumbing(e.target.value)} className={controlClasses}>
            {BATH_PLUMBING.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Bathroom size" htmlFor="size" help="5 by 8 is the dominant footprint in this housing stock.">
            <select id="size" value={size} onChange={(e) => setSize(e.target.value)} className={controlClasses}>
              {BATH_SIZE.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="When the house was built" htmlFor="homeAge">
            <select id="homeAge" value={homeAge} onChange={(e) => setHomeAge(e.target.value)} className={controlClasses}>
              {HOME_AGE.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </Field>
          <Field label="Waste and supply pipe" htmlFor="wasteLine" help="Cast iron waste is standard in anything built here before about 1960. Choose unknown if you are not sure.">
            <select id="wasteLine" value={wasteLine} onChange={(e) => setWasteLine(e.target.value)} className={controlClasses}>
              {BATH_WASTE_LINE.map((w) => <option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </Field>
          <Field label="Finish level" htmlFor="finish">
            <select id="finish" value={finish} onChange={(e) => setFinish(e.target.value)} className={controlClasses}>
              {BATH_FINISH.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </Field>
        </div>

        <fieldset className="border-t-hairline border-shell pt-5">
          <legend className="sr-only">Additional options</legend>
          <label className="flex min-h-[44px] items-center gap-3">
            <input type="checkbox" checked={secondFloor} onChange={(e) => setSecondFloor(e.target.checked)}
              className="h-5 w-5 rounded-control accent-cranberry" />
            <span className="text-body-sm text-ink">Second floor bathroom</span>
          </label>
          <label className="mt-2 flex min-h-[44px] items-center gap-3">
            <input type="checkbox" checked={historic} onChange={(e) => setHistoric(e.target.checked)}
              className="h-5 w-5 rounded-control accent-cranberry" />
            <span className="text-body-sm text-ink">The house is in a local historic district</span>
          </label>
        </fieldset>
      </div>
    </ToolShell>
  );
}
