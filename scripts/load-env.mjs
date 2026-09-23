/**
 * load-env.mjs
 *
 * Loads .env.local for standalone scripts.
 *
 * Next.js loads .env.local automatically; tsx and plain node do not. Without
 * this, ACTIVE_PHASE is unset in a script, getLiveCities() correctly returns an
 * empty array, and a validator silently checks nothing at all. That failure
 * mode is quiet and dangerous, so every script that touches the phase gate
 * imports this first.
 */

import { readFileSync, existsSync } from "node:fs";

export function loadEnv(file = ".env.local") {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    const [, key, raw] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = raw.trim().replace(/^["']|["']$/g, "");
  }
}

loadEnv();
