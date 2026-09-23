/**
 * generate-subservice-copy.mjs
 *
 * Generates the body copy for the 38 sub-service pages.
 *
 * CLAUDE.md section 11: minimum 600 words, narrow and technical. What this
 * specific work involves, when a homeowner needs it versus the alternative,
 * what it costs in this market, how long it takes, and what goes wrong when it
 * is done badly.
 *
 * Same constraints as the city copy generator: every rule from section 8 is in
 * the prompt, the output is checked against those rules before it is accepted,
 * and the result is written to lib/generated/ as reviewable JSON rather than
 * being called at build time. See the header of generate-city-copy.mjs for why.
 *
 * These pages carry no cost band from the data layer, because a sub-service is
 * not scoped to a municipality. Where the copy needs a figure it uses the ones
 * supplied from lib/data/cost-data.ts in the prompt.
 */

import "./load-env.mjs";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const MODEL = "gemini-2.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const OUT = "lib/generated/subservice-copy.json";
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

1. NO EM DASHES OR EN DASHES anywhere. Write "5 to 9 days", never "5-9 days".
2. BANNED WORDS, never use: ${BANNED.join(", ")}. One exception: "seamless gutters" is permitted as the product name for roll-formed gutter. Never "a seamless process".
3. THIS BUSINESS IS A REFERRAL SERVICE, NOT A CONTRACTOR. No "our crews", "we install", "licensed and insured", "years of experience", or manufacturer certifications. Write about the work and the houses, not about the company.
4. NEVER INVENT A NUMBER. No dollar figure, permit fee, rebate, tax credit, or code section beyond what is supplied below. Standard technical figures are fine: roof pitches, R-values, U-factors, material lifespans, working-day durations, wind ratings.
5. OPEN WITH A FACT about the work or the house, never with the company name.
6. PUT A REAL NUMBER IN MOST SECTIONS.
7. WRITE THE MECHANISM, NOT THE DRAMA.
8. BE NEUTRAL. Say when this work is not the right answer and what to do instead. There is no product line to defend.
9. VARY SENTENCE LENGTH. Short sentences carry weight.
10. NO EXCLAMATION POINTS. No rhetorical questions as headings. No "you deserve".
11. Reference New England housing where relevant: triple-deckers, postwar capes, center chimney colonials, mill worker housing, shingled coastal cottages, board sheathing, weight-and-pulley sash.
12. Write like a contractor explaining the job at a kitchen table.
`;

const SCHEMA = {
  type: "object",
  properties: {
    lede: { type: "string" },
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
    faqs: {
      type: "array",
      items: {
        type: "object",
        properties: { question: { type: "string" }, answer: { type: "string" } },
        required: ["question", "answer"],
      },
    },
  },
  required: ["lede", "sections", "faqs"],
};

function prompt(f) {
  return `Write the body copy for a page about ${f.subName}, within the ${f.serviceName} category, covering Rhode Island, Massachusetts, and Connecticut.

FACTS TO WRITE FROM:
  Sub-service: ${f.subName}
  Parent category: ${f.serviceName}
  Existing description, expand on this rather than repeating it: ${f.subDescription}
  Topics this page should cover, for coverage not for keyword repetition: ${f.keywords}
  Sibling sub-services in the same category: ${f.siblings}
  Typical whole-project range for the parent category across this market, Massachusetts baseline: ${f.band}
  What that range assumes: ${f.basis}
${f.materials ? `  Material costs available for reference:\n${f.materials}` : ""}

${RULES}

STRUCTURE. Produce:
  - "lede": one paragraph, 2 to 3 sentences, opening with a concrete fact about this specific work. This sits under the H1.
  - "sections": 4 or 5 sections, each with a heading and 1 to 3 paragraphs.
  - "faqs": exactly 4 questions with answers of 2 to 4 sentences each.

Total across everything: 650 to 900 words. This page is NARROW AND TECHNICAL. It is not an overview of ${f.serviceName}, it is specifically about ${f.subName}.

Cover:
  - What this specific work actually involves, step by step, technically.
  - When a homeowner needs THIS versus the alternative. Name the alternative and say plainly when it is the better answer.
  - What it costs in this market and what drives that number.
  - How long it takes, in working days.
  - What goes wrong when it is done badly, specifically, with the failure mechanism.

Headings must be specific to ${f.subName}. Do not write a heading that would fit any other page.`;
}

function violations(doc) {
  const raw = [
    doc.lede,
    ...doc.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...doc.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  const found = [];

  if (/[—–]/.test(raw)) found.push("em or en dash"); // copy-lint-allow

  const text = raw
    .replace(/seamless(?:\s+[\w-]+){0,4}\s+gutters?/gi, " ")
    .replace(/Home Energy Solutions/gi, " ");

  for (const word of BANNED) {
    const re = new RegExp(`\\b${word.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i");
    if (re.test(text)) found.push(`banned word "${word}"`);
  }

  const claims = [
    /\bour (crew|crews|installer|installers|team of|technicians)\b/i,
    /\bwe (install|replace|perform|build|repair)\b/i,
    /\blicensed and insured\b/i,
    /\byears (of experience|in business)\b/i,
  ];
  for (const re of claims) if (re.test(text)) found.push(`prohibited claim ${re}`);

  const words = raw.split(/\s+/).filter(Boolean).length;
  if (words < 600) found.push(`below the 600 word floor: ${words}`);
  if (doc.faqs.length < 3) found.push(`only ${doc.faqs.length} FAQs`);

  return found;
}

async function apiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const env = await readFile(".env.local", "utf8").catch(() => "");
  const m = env.match(/^GEMINI_API_KEY=(.+)$/m);
  if (!m) throw new Error("GEMINI_API_KEY not found");
  return m[1].trim();
}

async function pool(items, worker, size) {
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) await worker(items[i++]);
    })
  );
}

async function main() {
  const key = await apiKey();
  await mkdir("lib/generated", { recursive: true });

  const { SERVICES } = await import("../lib/data/services.ts");
  const { SERVICE_COST, MATERIALS } = await import("../lib/data/cost-data.ts");

  const jobs = SERVICES.flatMap((service) =>
    service.subServices.map((sub) => {
      const mats = MATERIALS[service.slug];
      return {
        key: `${service.slug}/${sub.slug}`,
        facts: {
          serviceName: service.name,
          subName: sub.name,
          subDescription: sub.description,
          keywords: sub.keywordTargets.join(", "),
          siblings: service.subServices.filter((s) => s.slug !== sub.slug).map((s) => s.name).join(", "),
          band: `$${SERVICE_COST[service.slug].low.toLocaleString()} to $${SERVICE_COST[service.slug].high.toLocaleString()}`,
          basis: SERVICE_COST[service.slug].basis,
          materials: mats
            ? mats
                .map(
                  (m) =>
                    `    ${m.label}: $${m.low} to $${m.high} per ${m.unit === "unit" ? "unit installed" : "square foot installed"}, ${m.lifeLow} to ${m.lifeHigh} year life`
                )
                .join("\n")
            : "",
        },
      };
    })
  );

  const existing = existsSync(OUT) && !process.argv.includes("--force")
    ? JSON.parse(await readFile(OUT, "utf8"))
    : {};
  const todo = jobs.filter((j) => !existing[j.key]);

  console.log(`${jobs.length} sub-services, ${todo.length} to generate.\n`);
  let done = 0;
  let failed = 0;

  await pool(
    todo,
    async (job) => {
      let priorFailure = "";
      for (let attempt = 1; attempt <= 4; attempt += 1) {
        try {
          const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt(job.facts) + priorFailure }] }],
              generationConfig: {
                temperature: 1.0,
                responseMimeType: "application/json",
                responseSchema: SCHEMA,
              },
            }),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          const doc = JSON.parse(json.candidates[0].content.parts[0].text);
          const bad = violations(doc);
          if (bad.length) {
            if (attempt === 4) throw new Error(bad.join("; "));
            // Tell the next attempt exactly what it broke. Without this the
            // model reproduces the same violation every time, because nothing
            // in the prompt changed.
            priorFailure = `\n\nYOUR PREVIOUS ATTEMPT WAS REJECTED FOR: ${bad.join("; ")}. Fix exactly that and change nothing else about the approach. If a banned word is part of a product name you must use, write the full product name every time and never the banned word on its own.`;
            continue;
          }
          existing[job.key] = doc;
          done += 1;
          console.log(`  ${done}/${todo.length}  ${job.key}`);
          await writeFile(OUT, JSON.stringify(existing, null, 1));
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

  await writeFile(OUT, JSON.stringify(existing, null, 1));
  console.log(`\nWrote ${Object.keys(existing).length} of ${jobs.length}. ${failed} failed.`);
  if (failed) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
