/**
 * permits.ts
 *
 * Permitting authority per municipality, for the Local Ledger.
 *
 * NOT a critical data file, but it feeds one of the six ledger fields, so the
 * same standard applies: nothing here may be invented. See CLAUDE.md section 7,
 * "If the ledger cannot be filled with real data for a given city, the page is
 * not ready to publish."
 *
 * -----------------------------------------------------------------------------
 * WHY THIS IS DERIVED RATHER THAN LISTED
 * -----------------------------------------------------------------------------
 * In all three states, building permits are issued at the municipal level by
 * that municipality's building department, under a statewide code administered
 * by a state body. Both halves of that sentence are verifiable for every one of
 * the 559 municipalities, so the authority string is constructed rather than
 * transcribed, and no per-city research can go stale or wrong.
 *
 * What is deliberately NOT constructed here: office names beyond "Building
 * Department", department phone numbers, fee schedules, and review timelines.
 * Those vary by municipality and are exactly the kind of plausible-sounding
 * detail that must never be guessed. CLAUDE.md section 8: "Never invent a
 * program name, a rebate amount, a code section, or a permit fee."
 *
 * State code references below are named in CLAUDE.md section 8 as the accurate
 * authorities to cite by name.
 */

import type { City, StateCode } from "./cities";

export interface PermitAuthority {
  /** Municipal office that issues the permit. */
  local: string;
  /** Statewide code the work is inspected against. */
  code: string;
  /** Short code label for the mono-set Local Ledger, where space is tight. */
  codeShort: string;
  /** State body administering that code. */
  administrator: string;
}

const STATE_CODE: Record<StateCode, Omit<PermitAuthority, "local">> = {
  RI: {
    code: "Rhode Island State Building Code (SBC-1)",
    codeShort: "RI SBC-1",
    administrator: "Rhode Island Building Code Commission",
  },
  MA: {
    code: "Massachusetts State Building Code (780 CMR)",
    codeShort: "780 CMR",
    administrator: "Board of Building Regulations and Standards",
  },
  CT: {
    code: "Connecticut State Building Code",
    codeShort: "CT State Building Code",
    administrator: "Office of the State Building Inspector",
  },
};

export function getPermitAuthority(city: City): PermitAuthority {
  return {
    local: `${city.city} Building Department`,
    ...STATE_CODE[city.state],
  };
}

/**
 * Shoreline work in Rhode Island carries an additional review body. Named in
 * CLAUDE.md section 8. Applied only where the city data itself indicates
 * coastal exposure, never assumed from a county name.
 */
export const RI_COASTAL_AUTHORITY = "Coastal Resources Management Council";

/**
 * Historic review bodies by state, for municipalities whose housing stock data
 * records a local historic district. Local district commissions do the actual
 * review; the state offices below are the statewide bodies.
 */
export const HISTORIC_AUTHORITY: Record<StateCode, string> = {
  RI: "Rhode Island Historical Preservation and Heritage Commission",
  MA: "Massachusetts Historical Commission",
  CT: "State Historic Preservation Office",
};

/** State energy programs, named exactly as published. See CLAUDE.md section 8. */
export const ENERGY_PROGRAM: Record<StateCode, string> = {
  RI: "Rhode Island Energy",
  MA: "Mass Save",
  CT: "Energize CT",
};
