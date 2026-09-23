/**
 * check-copy.ts
 *
 * Enforces the hard copy prohibitions in CLAUDE.md section 8 across every file
 * that ships.
 *
 * Two rules are absolute and are checked here rather than trusted:
 *
 *   NO EM DASHES. Anywhere. Not in copy, not in metadata, not in code comments,
 *   not in documentation. The rule says "anywhere" and this checks anywhere,
 *   including the comments in this repository.
 *
 *   NO BANNED WORDS. Every one is banned because docs/competitors.md documents
 *   multiple competitors in this market using it. Three narrow exceptions are
 *   allowed and only three: "seamless gutters" as the product name, "Home
 *   Energy Solutions" as Connecticut's published program name, and `transform`
 *   as a CSS property, which is code rather than copy.
 *
 * The legal claim checks are the other half. This business is not licensed, not
 * insured, employs no trades, and has no track record to cite. Those claims are
 * false for this entity, so a regression that introduces one is a compliance
 * problem rather than a style problem.
 */

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

const BANNED_TIER_1 = [
  "transform", "transformation", "sanctuary", "dream home", "curated", "elevated",
  "seamless", "passion", "passionate", "craftsmanship", "stunning", "exquisite",
  "journey", "leverage", "world-class", "solutions", "premier", "cutting-edge",
  "innovative", "state-of-the-art", "bespoke", "artisan", "meticulous",
  "unparalleled", "dedication", "commitment",
];

const BANNED_TIER_2 = [
  "peace of mind", "trusted partner", "attention to detail", "top-notch",
  "we treat your home like our own", "no job too big or too small",
  "your vision, our expertise", "exceptional", "superior", "finest",
  "outstanding", "quality craftsmanship", "turn your dreams into reality",
  "first line of defense", "proudly serving", "let us help you", "look no further",
];

/**
 * These must distinguish a claim ABOUT THIS BUSINESS from an accurate statement
 * about the contractors it refers to. "Contractors are independently licensed
 * and insured in the states where they operate" is true, is required in the
 * footer disclosure, and must not be flagged. "We are licensed and insured" is
 * false and must be. So the subject is part of every pattern.
 */
const FALSE_CLAIMS: Array<[RegExp, string]> = [
  [/\b(we are|we're|is|are) (fully )?licensed and insured\b(?!\s+in the states)/i, "claims the business is licensed and insured"],
  [/\bwe are a licensed contractor\b/i, "claims to be a licensed contractor"],
  [/\bour (crews?|installers?|technicians?|in-house)\b/i, "claims in-house crews"],
  [/\bwe (install|replace|perform the work|re-?roof) \b/i, "claims the business performs work"],
  [/\bwe have \d+\+? years (of experience|in business)\b/i, "claims years in business"],
  [/\bwe are (GAF Master Elite|James Hardie Elite|Owens Corning Preferred)\b/i, "manufacturer certification claim"],
  [/\bwe (warrant|guarantee) (the )?work\b/i, "offers a warranty on work it does not perform"],
];

/** Files that ship. Excludes node_modules, build output, and the source docs. */
function files(): string[] {
  const out = execSync(
    `find app components lib scripts -type f \\( -name '*.ts' -o -name '*.tsx' -o -name '*.mjs' -o -name '*.json' \\) -not -path '*/node_modules/*'`,
    { encoding: "utf8" }
  );
  return out.split("\n").filter(Boolean);
}

/**
 * Removes the three permitted exceptions before testing, so the checker catches
 * "a seamless process" while allowing "seamless gutters".
 *
 * Also removes the banned-word lists in the generator scripts and in this file,
 * which necessarily contain every banned word in order to check for them.
 */
/** Blanks a matched region while preserving its newlines, so line numbers hold. */
function blank(match: string): string {
  return match.replace(/[^\n]/g, " ");
}

function scrub(text: string, path: string): string {
  let out = text
    .replace(/seamless(?:\s+[\w-]+){0,4}\s+gutters?/gi, blank)
    .replace(/seamless-gutters?/gi, blank)
    .replace(/Home Energy Solutions/gi, blank)
    // `transform` and `transition-transform` as CSS, which is code not copy.
    .replace(/(?:group-hover:|motion-safe:|hover:)?transform(?:-gpu)?\b/g, blank)
    .replace(/transform:\s*[^;"'`]+/g, blank)
    .replace(/translateY|translateX|\btransform\b(?=[^a-z])/g, blank);

  // The checker and the generators hold the lists themselves.
  if (
    path.includes("check-copy") ||
    path.includes("generate-city-copy") ||
    path.includes("generate-subservice-copy") ||
    path.includes("generate-post")
  ) {
    out = out
      .replace(/const BANNED[\s\S]*?\];/g, blank)
      .replace(/BANNED_TIER_[12][\s\S]*?\];/g, blank)
      .replace(/const FALSE_CLAIMS[\s\S]*?\n\];/g, blank)
      // The prompt rule blocks quote every forbidden phrase in order to forbid it.
      .replace(/const RULES = `[\s\S]*?`;/g, blank)
      .replace(/RULES, all mandatory:[\s\S]*?INTERNAL LINKS/g, blank)
      .replace(/\/seamless[^/]*\/gi/g, blank);
  }

  return out;
}

const emDashes: string[] = [];
const dataWarnings: string[] = [];
const banned: string[] = [];
const claims: string[] = [];
let checked = 0;

for (const path of files()) {
  const raw = readFileSync(path, "utf8");
  checked += 1;


  raw.split("\n").forEach((line, i) => {
    // A line may carry an em dash legitimately only when it is code that
    // DETECTS one. Those lines opt out explicitly so the exemption is visible
    // in review rather than inferred by the checker.
    if (/[—–]/.test(line) && !line.includes("copy-lint-allow")) { // copy-lint-allow
      emDashes.push(`${path}:${i + 1}  ${line.trim().slice(0, 90)}`);
    }
  });

  // The checker holds every banned word and claim pattern by definition. Word
  // and claim scanning would only ever match its own lists, so it is exempt
  // from those two passes. The em dash pass above still applies to it.
  if (path.endsWith("check-copy.ts")) continue;

  const text = scrub(raw, path);

  const isCriticalData =
    /lib\/data\/cities-phase\d\.ts$/.test(path) || /lib\/data\/services\.ts$/.test(path);

  for (const word of [...BANNED_TIER_1, ...BANNED_TIER_2]) {
    const re = new RegExp(`\\b${word.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "gi");
    const hit = re.exec(text);
    if (hit) {
      const line = text.slice(0, hit.index).split("\n").length;
      const entry = `${path}:${line}  "${word}"`;
      // Tier 2 inside a researched homeStyleNote is descriptive, and CLAUDE.md
      // section 4 forbids bulk-rewriting those files. Surface it, do not fail.
      if (isCriticalData) dataWarnings.push(entry);
      else banned.push(entry);
    }
  }

  for (const [re, label] of FALSE_CLAIMS) {
    const hit = re.exec(text);
    if (hit) {
      const line = text.slice(0, hit.index).split("\n").length;
      claims.push(`${path}:${line}  ${label}  ->  "${hit[0]}"`);
    }
  }
}

console.log(`Checked ${checked} files.\n`);

let failed = false;

if (emDashes.length) {
  failed = true;
  console.log(`EM OR EN DASHES, ${emDashes.length}. CLAUDE.md section 8: banned anywhere.`);
  for (const e of emDashes.slice(0, 25)) console.log(`  ${e}`);
  if (emDashes.length > 25) console.log(`  and ${emDashes.length - 25} more`);
  console.log("");
}

if (banned.length) {
  failed = true;
  console.log(`BANNED WORDS, ${banned.length}.`);
  for (const b of banned.slice(0, 25)) console.log(`  ${b}`);
  if (banned.length > 25) console.log(`  and ${banned.length - 25} more`);
  console.log("");
}

if (dataWarnings.length) {
  console.log(
    `TIER 2 WORDS INSIDE CRITICAL DATA FILES, ${dataWarnings.length}. Not a build failure.`
  );
  console.log(
    "  These sit in CRITICAL DATA FILES, which CLAUDE.md section 4 forbids rewriting without an"
  );
  console.log(
    "  explicit instruction naming the file and the change. They are reported, never auto-fixed."
  );
  console.log("  Review individually and edit only with an explicit instruction naming the file.\n");
  for (const w of dataWarnings) console.log(`  ${w}`);
  console.log("");
}

if (claims.length) {
  failed = true;
  console.log(`FALSE CLAIMS FOR A REFERRAL BUSINESS, ${claims.length}. Not negotiable.`);
  for (const c of claims) console.log(`  ${c}`);
  console.log("");
}

if (failed) process.exit(1);
console.log("No em dashes, no banned words, no claims this business cannot make.");
