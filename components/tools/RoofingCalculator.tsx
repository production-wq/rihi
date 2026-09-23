"use client";

import { useState } from "react";
import type { City } from "@/lib/data/cities";
import {
  ROOF_PITCH, ROOF_MATERIAL, ROOF_LAYERS, ROOF_DECK, ROOF_COMPLEXITY, HOME_AGE,
} from "@/lib/data/cost-data";
import { calculateRoofing, roofingUnknowns } from "@/lib/tools/calculate";
import { ToolShell, ResultRange, Breakdown, LeadHandoff, Field, controlClasses } from "./ToolShell";
import { TownSelect } from "./TownSelect";

export function RoofingCalculator({ cities }: { cities: City[] }) {
  const [state, setState] = useState("");
  const [town, setTown] = useState("");
  const [footprint, setFootprint] = useState(1800);
  const [pitch, setPitch] = useState("moderate");
  const [material, setMaterial] = useState("architectural");
  const [layers, setLayers] = useState("one");
  const [homeAge, setHomeAge] = useState("1940-1980");
  const [deck, setDeck] = useState("some");
  const [complexity, setComplexity] = useState("moderate");
  const [historic, setHistoric] = useState(false);
  const [iceWater, setIceWater] = useState(true);

  const city = cities.find((c) => c.slug === town && c.state === state) ?? null;
  const input = {
    state, city, footprint, pitch, material, layers, homeAge, deck, complexity,
    historicDistrict: historic, iceWater,
  };
  const result = calculateRoofing(input);
  const unknowns = roofingUnknowns(input, city);
  const materialLabel = ROOF_MATERIAL.find((m) => m.value === material)?.label ?? "";
  const pitchLabel = ROOF_PITCH.find((p) => p.value === pitch)?.label ?? "";

  return (
    <ToolShell
      result={
        <>
          <ResultRange label="Estimated roof replacement" low={result.range.low} high={result.range.high} />
          <Breakdown items={result.items} />
          <div className="mt-6 rounded-card border-hairline border-shell bg-shell-light p-5">
            <p className="ledger-label">What could change this</p>
            <ul className="mt-3 space-y-2">
              {unknowns.map((u) => (
                <li key={u} className="text-body-sm text-ink-body">{u}</li>
              ))}
            </ul>
          </div>
          <LeadHandoff
            label="Get quotes for this roof"
            city={city?.city}
            state={state}
            service="roofing"
            description={`Roof replacement. ${footprint} sq ft footprint, ${pitchLabel.toLowerCase()}, ${materialLabel.toLowerCase()}. ${result.surfaceArea} sq ft of roof surface.`}
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

        <Field label="Roof footprint, square feet" htmlFor="footprint" help="The ground footprint of the house, not the roof surface. We convert it using the pitch.">
          <input id="footprint" type="number" min={600} max={5000} step={50} value={footprint}
            onChange={(e) => setFootprint(Number(e.target.value))} className={controlClasses} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Roof pitch" htmlFor="pitch">
            <select id="pitch" value={pitch} onChange={(e) => setPitch(e.target.value)} className={controlClasses}>
              {ROOF_PITCH.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </Field>
          <Field label="Material" htmlFor="material">
            <select id="material" value={material} onChange={(e) => setMaterial(e.target.value)} className={controlClasses}>
              {ROOF_MATERIAL.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </Field>
          <Field label="Existing layers to remove" htmlFor="layers">
            <select id="layers" value={layers} onChange={(e) => setLayers(e.target.value)} className={controlClasses}>
              {ROOF_LAYERS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </Field>
          <Field label="When the house was built" htmlFor="homeAge">
            <select id="homeAge" value={homeAge} onChange={(e) => setHomeAge(e.target.value)} className={controlClasses}>
              {HOME_AGE.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </Field>
          <Field label="Deck condition" htmlFor="deck" help="Default to some repair on anything pre-1940: that sheathing is board, not plywood.">
            <select id="deck" value={deck} onChange={(e) => setDeck(e.target.value)} className={controlClasses}>
              {ROOF_DECK.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </Field>
          <Field label="Roof complexity" htmlFor="complexity">
            <select id="complexity" value={complexity} onChange={(e) => setComplexity(e.target.value)} className={controlClasses}>
              {ROOF_COMPLEXITY.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </Field>
        </div>

        <fieldset className="border-t-hairline border-shell pt-5">
          <legend className="sr-only">Additional options</legend>
          <label className="flex min-h-[44px] items-center gap-3">
            <input type="checkbox" checked={iceWater} onChange={(e) => setIceWater(e.target.checked)}
              className="h-5 w-5 rounded-control accent-cranberry" />
            <span className="text-body-sm text-ink">Ice and water shield at the eaves. This is New England, so it is on by default.</span>
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
