/**
 * generate-city-copy.mjs
 *
 * Generates genuinely distinct body copy for every live city hub and every
 * service x city page, grounded in the researched homeStyleNote.
 *
 * -----------------------------------------------------------------------------
 * WHY THIS EXISTS
 * -----------------------------------------------------------------------------
 * The deterministic composition engine in lib/copy/city-body.ts cleared the
 * word-count floors but failed scripts/check-uniqueness.ts at roughly 93 percent
 * pairwise overlap. Cities sharing the same housing-stock flags received the
 * same prose. That is exactly the scaled-content pattern CLAUDE.md section 14
 * is written against, and expanding the variant pools by hand would only have
 * gamed the checker: shuffled synonyms are still templated content.
 *
 * So the prose is generated per page from the material that is genuinely unique
 * to that municipality, following the same pattern the project already uses for
 * the blog in CLAUDE.md section 12.
 *
 * -----------------------------------------------------------------------------
 * WHAT THE MODEL IS AND IS NOT ALLOWED TO PRODUCE
 * -----------------------------------------------------------------------------
 * Every verifiable fact is computed here and passed IN. The model writes prose
 * around facts it is given and is forbidden from introducing new ones. It never
 * originates a cost figure, a permit fee, a code section, a rebate amount, or a
 * program name, because CLAUDE.md section 8 forbids inventing any of those and
 * docs/seo-strategy.md notes the model will produce plausible-sounding versions
 * of all of them.
 *
 * The Local Ledger, the cost bands, the permitting authority, the ZIP codes,
 * and the FAQ numbers all stay deterministic and are rendered from the data
 * layer, not from this output.
 *
 * Output is written to lib/generated/ as JSON so the build is reproducible and
 * so the copy is reviewable as a diff. Nothing regenerates on build.
 */

import "./load-env.mjs";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const OUT_DIR = "lib/generated";
const CONCURRENCY = 6;

const BANNED = [
  "transform", "transformation", "sanctuary", "dream home", "curated", "elevated",
  "seamless", "passion", "passionate", "craftsmanship", "stunning", "exquisite",
  "journey", "leverage", "world-class", "solutions", "premier", "cutting-edge",
  "innovative", "state-of-the-art", "bespoke", "artisan", "meticulous",
  "unparalleled", "dedication", "commitment", "peace of mind", "trusted partner",
  "attention to detail", "top-notch", "exceptional", "superior", "finest",
  "outstanding", "proudly serving", "look no further", "curb appeal",
];

const RULES = `
VOICE AND CONSTRAINT RULES. Every one is mandatory.

1. NO EM DASHES OR EN DASHES anywhere, including in place of commas. Use a period, a comma, a colon, or restructure. En dashes inside numeric ranges are also banned: write "5 to 9 days", not "5-9 days".

2. BANNED WORDS. Never use any of these: ${BANNED.join(", ")}.
   One narrow exception: "seamless gutters" is permitted, because it is the actual product name for roll-formed gutter. Never "a seamless process".

3. THIS BUSINESS IS A REFERRAL SERVICE, NOT A CONTRACTOR. It does not hold licenses, carry contractor insurance, employ trades, or perform work. NEVER write "our crews", "our installers", "we install", "licensed and insured", "years of experience", "projects completed", or any manufacturer certification. Correct framing: "contractors who work in [town]". Write about the WORK and the HOUSES, in the third person, not about the company.

4. NEVER INVENT A NUMBER. Do not state any dollar figure, permit fee, rebate amount, tax credit, code section number, program name, population, or founding date that is not supplied in the facts below. Technical figures that are genuinely standard are fine: roof pitches, R-values, typical opening counts, working-day durations, material lifespans, and the six-foot ice and water shield run. If unsure, write the sentence without the figure.

5. OPEN WITH A FACT ABOUT THE READER'S HOUSE OR TOWN, never with the company name and never with "Nestled in" or similar.

6. PUT A REAL NUMBER IN MOST SECTIONS. Numbers carry more authority than adjectives.

7. WRITE THE MECHANISM, NOT THE DRAMA. Not "harsh winters take a toll". Instead: heat escaping into an under-insulated attic melts the snowpack, the meltwater refreezes at the cold overhang, and the dam pushes water back up under the shingles.

8. BE NEUTRAL. There is no product line to defend. Say when a repair beats a replacement, when vinyl is the right answer, and when a project is not worth doing. That honesty is the point of the site.

9. VARY SENTENCE LENGTH DELIBERATELY. Short sentences carry weight. Then a longer one carrying the detail and the qualification.

10. NO EXCLAMATION POINTS. No rhetorical questions as headings. No second-person hype ("You deserve").

11. NEVER PAD WITH GEOGRAPHY TRIVIA. No park names, population figures, highway numbers, or founding dates. Housing stock, construction technique, and what it costs are what help a homeowner.

12. Write like a contractor explaining a job at a kitchen table. Direct, specific, unhurried.
`;

async function apiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const env = await readFile(".env.local", "utf8").catch(() => "");
  const m = env.match(/^GEMINI_API_KEY=(.+)$/m);
  if (!m) throw new Error("GEMINI_API_KEY not found");
  return m[1].trim();
}

const SCHEMA = {
  type: "object",
  properties: {
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
          heading: { type: "string" },
          paragraphs: { type: "array", items: { type: "string" } },
        },
        required: ["heading", "paragraphs"],
      },
    },
  },
  required: ["sections"],
};

function cityHubPrompt(f) {
  return `Write the body copy for a page about home improvement work in ${f.city}, ${f.stateName}.

FACTS YOU MUST WRITE FROM. Do not contradict these and do not add facts of this kind.
  Town: ${f.city}, ${f.stateName}
  County: ${f.county}
  Region: ${f.region}
  Researched housing stock note: ${f.note}
  Housing types present: ${f.stock}
  Dominant construction era: ${f.era}
  Coastal salt exposure: ${f.coastal}
  Local historic district: ${f.historic}
  Tight lots, constrained staging: ${f.dense}
  Ferry-dependent island: ${f.island}
  Permitting authority: ${f.permitLocal}
  State building code: ${f.permitCode}
  Cost bands for this town, ALREADY CALCULATED. Quote them exactly if you use them:
${f.bands}

${RULES}

STRUCTURE. Produce 4 or 5 sections, each with a heading and 1 to 3 paragraphs. Total 450 to 600 words.

Cover, in an order that makes sense for this particular town:
  - What is actually standing in ${f.city} and what that means for exterior and interior work. Expand well past the researched note using your knowledge of how this kind of housing is built and what goes wrong with it.
  - How the specific housing types here change at least three of these seven categories: roofing, windows, siding, bathrooms, kitchens, entry doors, gutters.
  - Any local condition that genuinely moves the cost: age of stock, salt exposure, historic review, staging constraints, island transport. Only mention those that are true per the facts above.
  - What work costs here, using ONLY the supplied bands, and what moves a specific house off them.

Headings should be specific to ${f.city}, not generic. Do not write a heading that would fit any town.
Do NOT include a permits section. That is rendered separately.
Do NOT write an FAQ. Those are rendered separately.`;
}

function serviceCityPrompt(f) {
  return `Write the body copy for a page about ${f.serviceName} in ${f.city}, ${f.stateName}.

FACTS YOU MUST WRITE FROM. Do not contradict these and do not add facts of this kind.
  Town: ${f.city}, ${f.stateName}
  County: ${f.county}
  Region: ${f.region}
  Service: ${f.serviceName}
  Work covered by this service: ${f.subServices}
  Researched housing stock note: ${f.note}
  Housing types present: ${f.stock}
  Dominant construction era: ${f.era}
  Coastal salt exposure: ${f.coastal}
  Local historic district: ${f.historic}
  Tight lots, constrained staging: ${f.dense}
  Ferry-dependent island: ${f.island}
  Permitting authority: ${f.permitLocal}
  Typical cost range for ${f.serviceName} in ${f.city}, ALREADY CALCULATED. Quote it exactly if you use it: ${f.band}
  What that range assumes: ${f.basis}

${RULES}

STRUCTURE. Produce 4 or 5 sections, each with a heading and 1 to 3 paragraphs. Total 450 to 600 words.

This page must be about ${f.serviceName} ON THIS SPECIFIC HOUSING STOCK. That is the entire point. A reader in a different town with different housing must not be able to read this page and find it equally applicable.

Cover:
  - What a ${f.serviceName.toLowerCase()} job involves on the housing types actually present in ${f.city}. Be technical and concrete: substrate, framing, access, the specific failure modes of this stock.
  - Where more than one housing type is present, say what changes between them, because two houses a few streets apart price differently.
  - Any local condition that genuinely applies: age, salt exposure, historic review, staging, island transport. Only those true per the facts.
  - The cost range, using ONLY the supplied figure, and what moves a house off it.
  - What a homeowner should ask for in a quote for this trade on this kind of house.

Headings must be specific to ${f.city} and ${f.serviceName}. Do not write a heading that would fit any town.
Do NOT include a permits section, an FAQ, or a nearby towns section. Those are rendered separately.`;
}

async function generate(prompt, key) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 1.0,
        responseMimeType: "application/json",
        responseSchema: SCHEMA,
      },
    }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(`No text: ${json?.candidates?.[0]?.finishReason ?? "unknown"}`);

  const parsed = JSON.parse(text);
  if (!parsed.sections?.length) throw new Error("No sections returned");
  return parsed.sections;
}

/** Post-generation guard. The prompt asks; this verifies. */
function violations(sections) {
  const raw = sections.map((s) => `${s.heading} ${s.paragraphs.join(" ")}`).join(" ");
  const found = [];

  /*
   * Strip the three narrow exceptions from CLAUDE.md section 8 BEFORE testing
   * for banned words, rather than trying to except them with a lookahead.
   * "Seamless gutters" is the published product name for roll-formed gutter and
   * has no synonym. "Home Energy Solutions" is Connecticut's program name and
   * is quoted exactly as published. Removing the permitted phrase and then
   * testing the remainder catches the marketing use while allowing both.
   */
  const text = raw
    .replace(/seamless(?:\s+[\w-]+){0,4}\s+gutters?/gi, " ")
    .replace(/Home Energy Solutions/gi, " ");

  if (/[—–]/.test(text)) found.push("em or en dash"); // copy-lint-allow

  for (const word of BANNED) {
    const re = new RegExp(`\\b${word.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) found.push(`banned word "${word}"`);
  }

  const claims = [
    /\bour (crew|crews|installer|installers|team of|technicians)\b/i,
    /\bwe (install|replace|perform|build|repair) \b/i,
    /\blicensed and insured\b/i,
    /\bfully licensed\b/i,
    /\byears (of experience|in business)\b/i,
    /\bGAF Master Elite\b|\bJames Hardie Elite\b|\bOwens Corning Preferred\b/i,
  ];
  for (const re of claims) if (re.test(text)) found.push(`prohibited claim ${re}`);

  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < 380) found.push(`too short: ${words} words`);

  return found;
}

async function pool(items, worker, size) {
  const results = new Array(items.length);
  let index = 0;
  const runners = Array.from({ length: size }, async () => {
    while (index < items.length) {
      const i = index++;
      results[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  const key = await apiKey();
  await mkdir(OUT_DIR, { recursive: true });

  const { facts } = await import("./copy-facts.mjs");
  const jobs = await facts();

  const force = process.argv.includes("--force");
  const outPath = `${OUT_DIR}/city-copy.json`;
  const existing = existsSync(outPath) && !force ? JSON.parse(await readFile(outPath, "utf8")) : {};

  const limitArg = process.argv.find((a) => a.startsWith("--limit="));
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  let todo = jobs.filter((j) => !existing[j.key]);
  if (onlyArg) todo = todo.filter((j) => j.key.includes(onlyArg.split("=")[1]));
  if (limitArg) todo = todo.slice(0, Number(limitArg.split("=")[1]));
  console.log(`${jobs.length} pages total, ${todo.length} to generate, ${jobs.length - todo.length} cached.\n`);

  let done = 0;
  let failed = 0;

  await pool(
    todo,
    async (job) => {
      const prompt = job.type === "hub" ? cityHubPrompt(job.facts) : serviceCityPrompt(job.facts);

      let priorFailure = "";
      for (let attempt = 1; attempt <= 4; attempt += 1) {
        try {
          const sections = await generate(prompt + priorFailure, key);
          const bad = violations(sections);
          if (bad.length) {
            if (attempt === 4) throw new Error(`rule violations: ${bad.join("; ")}`);
            priorFailure = `\n\nYOUR PREVIOUS ATTEMPT WAS REJECTED FOR: ${bad.join("; ")}. Fix exactly that and change nothing else. If a banned word is part of a product name you must use, write the full product name every time and never the banned word on its own.`;
            continue;
          }
          existing[job.key] = sections;
          done += 1;
          if (done % 10 === 0 || done === todo.length) {
            console.log(`  ${done}/${todo.length} generated`);
            await writeFile(outPath, JSON.stringify(existing, null, 1));
          }
          return;
        } catch (err) {
          if (attempt === 4) {
            failed += 1;
            console.log(`  FAILED ${job.key}: ${err.message}`);
          } else {
            await new Promise((r) => setTimeout(r, attempt * 2500));
          }
        }
      }
    },
    CONCURRENCY
  );

  await writeFile(outPath, JSON.stringify(existing, null, 1));
  console.log(`\nWrote ${Object.keys(existing).length} pages to ${outPath}. ${failed} failed.`);
  if (failed) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
