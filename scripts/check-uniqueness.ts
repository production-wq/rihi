/**
 * check-uniqueness.ts
 *
 * Measures whether generated pages actually meet the uniqueness rule, rather
 * than trusting the reasoning in lib/copy/city-body.ts that they do.
 *
 * CLAUDE.md section 11: "at least 60 percent of the body must be specific to
 * this city and this service combination and could not be pasted onto another
 * city's page unchanged."
 *
 * docs/competitors.md rule 6 states the test operationally: "could this
 * paragraph be pasted onto the page for a different city with only the city
 * name changed? If yes for more than 40 percent of the body, the page is not
 * ready."
 *
 * -----------------------------------------------------------------------------
 * METHOD
 * -----------------------------------------------------------------------------
 * The phrase "with only the city name changed" is the important part, and it is
 * why this script neutralises place names before comparing. Two pages that
 * differ only by swapping Cranston for Coventry must score as identical here,
 * because to a reader and to a scaled-content classifier they are.
 *
 * So every page is normalised: city, county, region, and state names are
 * replaced with placeholders, as are all digits. What remains is the prose that
 * would survive a find-and-replace. That text is broken into overlapping
 * 8-word shingles, and each page is compared against every other page of the
 * same service using containment, |A intersect B| / |A|.
 *
 * A page passes when its worst pairwise containment is at or under 40 percent.
 * Neutralising the place names and the numbers makes this deliberately harsher
 * than the rule requires, since the real pages differ by those too.
 */

import "./load-env.mjs";
import { ALL_CITIES, type City } from "../lib/data/cities";
import { SERVICE_SLUGS } from "../lib/data/services";
import { getLiveCities } from "../lib/phase";
import { serviceCityBody, cityHubBody, paragraphWordCount } from "../lib/copy/city-body";

const SHINGLE = 8;
const MAX_CONTAINMENT = 0.4;

function normalise(text: string, city: City): string {
  let out = text.toLowerCase();

  // Everything that a find-and-replace would change.
  const names = [
    city.city,
    city.county,
    city.county.replace(/ county$/i, ""),
    city.region,
    ...city.nearbyTowns,
    ...city.zipCodes,
  ];
  for (const name of names.sort((a, b) => b.length - a.length)) {
    if (!name) continue;
    out = out.split(name.toLowerCase()).join(" @place ");
  }

  return out
    .replace(/\d[\d,.]*/g, " @num ")
    .replace(/[^a-z@\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shingles(text: string): Set<string> {
  const words = text.split(" ").filter(Boolean);
  const set = new Set<string>();
  for (let i = 0; i + SHINGLE <= words.length; i += 1) {
    set.add(words.slice(i, i + SHINGLE).join(" "));
  }
  return set;
}

function containment(a: Set<string>, b: Set<string>): number {
  if (!a.size) return 1;
  let shared = 0;
  for (const s of a) if (b.has(s)) shared += 1;
  return shared / a.size;
}

function pageText(paragraphs: ReturnType<typeof cityHubBody>): string {
  return paragraphs.flatMap((p: { heading?: string; body: string[] }) => [p.heading ?? "", ...p.body]).join(" ");
}

function main() {
  const live = getLiveCities();
  const cities = live.length ? live : ALL_CITIES.filter((c) => c.state === "RI");

  if (!live.length) {
    console.log("ACTIVE_PHASE yields no live cities. Checking Rhode Island as a dry run.\n");
  }

  let failures = 0;
  let checked = 0;
  const worstOverall: Array<{ label: string; score: number }> = [];

  /* ---- Service x city pages, compared within each service ---- */
  for (const service of SERVICE_SLUGS) {
    const pages = cities.map((city) => ({
      city,
      words: paragraphWordCount(serviceCityBody(city, service)),
      set: shingles(normalise(pageText(serviceCityBody(city, service)), city)),
    }));

    let worst = { label: "", score: 0 };

    for (const a of pages) {
      let pageWorst = 0;
      let against = "";
      for (const b of pages) {
        if (a.city.slug === b.city.slug && a.city.state === b.city.state) continue;
        const score = containment(a.set, b.set);
        if (score > pageWorst) {
          pageWorst = score;
          against = b.city.city;
        }
      }

      checked += 1;
      if (pageWorst > MAX_CONTAINMENT) {
        failures += 1;
        console.log(
          `  FAIL ${service}/${a.city.slug}: ${(pageWorst * 100).toFixed(1)}% shared with ${against} (${a.words} words)`
        );
      }
      if (pageWorst > worst.score) {
        worst = { label: `${a.city.city} vs ${against}`, score: pageWorst };
      }
    }

    worstOverall.push({ label: `${service}  worst pair: ${worst.label}`, score: worst.score });
  }

  /* ---- City hubs, compared against each other ---- */
  const hubs = cities.map((city) => ({
    city,
    set: shingles(normalise(pageText(cityHubBody(city)), city)),
  }));

  let hubWorst = { label: "", score: 0 };
  for (const a of hubs) {
    let pageWorst = 0;
    let against = "";
    for (const b of hubs) {
      if (a.city.slug === b.city.slug && a.city.state === b.city.state) continue;
      const score = containment(a.set, b.set);
      if (score > pageWorst) {
        pageWorst = score;
        against = b.city.city;
      }
    }
    checked += 1;
    if (pageWorst > MAX_CONTAINMENT) {
      failures += 1;
      console.log(
        `  FAIL city-hub/${a.city.slug}: ${(pageWorst * 100).toFixed(1)}% shared with ${against}`
      );
    }
    if (pageWorst > hubWorst.score) hubWorst = { label: `${a.city.city} vs ${against}`, score: pageWorst };
  }
  worstOverall.push({ label: `city hubs  worst pair: ${hubWorst.label}`, score: hubWorst.score });

  console.log("Worst pairwise overlap, place names and numbers neutralised:\n");
  for (const w of worstOverall.sort((a, b) => b.score - a.score)) {
    const pct = (w.score * 100).toFixed(1);
    const flag = w.score > MAX_CONTAINMENT ? "OVER" : "ok";
    console.log(`  ${pct.padStart(5)}%  ${flag.padEnd(4)}  ${w.label}`);
  }

  console.log(
    `\n${checked} pages checked, ceiling ${MAX_CONTAINMENT * 100}% shared content.`
  );

  if (failures) {
    console.log(`${failures} pages exceed the ceiling. See CLAUDE.md section 11.`);
    process.exit(1);
  }
  console.log("All pages within the uniqueness ceiling.");
}

main();
