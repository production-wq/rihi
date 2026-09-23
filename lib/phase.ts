/**
 * phase.ts
 *
 * ACTIVE_PHASE parsing and gating. See CLAUDE.md section 5.
 *
 * The gate itself lives in lib/data/cities.ts, which is a critical data file.
 * This module re-exports it so routes have the import path described in the
 * file structure without that logic being duplicated in two places. A second
 * copy of a phase gate is a second thing that can silently disagree.
 */

export {
  getActivePhase,
  getLiveCities,
  getLiveCitiesWithSubServices,
} from "./data/cities";

import { getActivePhase, getLiveCities } from "./data/cities";
import type { StateCode } from "./data/cities";

/** True when any city page is built at all. False at ACTIVE_PHASE=0. */
export function citiesAreLive(): boolean {
  return getActivePhase() >= 1;
}

/** Live city count per state. Used in copy that states coverage honestly. */
export function liveCityCount(state?: StateCode): number {
  const live = getLiveCities();
  return state ? live.filter((c) => c.state === state).length : live.length;
}

/**
 * A state hub renders whether or not its cities are live, because the state is
 * genuinely covered by the referral network either way. This reports whether
 * the hub can show a city link block.
 */
export function stateHasLiveCities(state: StateCode): boolean {
  return liveCityCount(state) > 0;
}
