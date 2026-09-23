/**
 * validate-data.ts
 *
 * Runs before committing a change to any critical data file. See CLAUDE.md
 * section 4.
 *
 * Checks the municipality counts (RI 39, CT 169, MA 351 across phases 2, 4,
 * and 5), that no slug appears twice within a state, and that no required field
 * is empty. Also checks the things that are load-bearing elsewhere in the
 * build: that every region has a cost multiplier, and that every city can
 * produce a complete Local Ledger.
 */

import "./load-env.mjs";
import { ALL_CITIES, validateCityData, EXPECTED_COUNTS } from "../lib/data/cities";
import { SERVICES, SERVICE_SLUGS, SUB_SERVICE_COUNT } from "../lib/data/services";
import { BLOG_TOPICS } from "../lib/data/blog-topics";
import { REGION_MULTIPLIER, SERVICE_COST } from "../lib/data/cost-data";
import { buildCityLedger, buildServiceCityLedger } from "../lib/copy/ledger";
import { getCityTraits } from "../lib/copy/traits";

const errors: string[] = [];
const warnings: string[] = [];

/* ---- The checks CLAUDE.md section 4 names explicitly ---- */
errors.push(...validateCityData());

/* ---- Services ---- */
if (SERVICES.length !== 7) errors.push(`Expected 7 services, found ${SERVICES.length}`);
if (new Set(SERVICE_SLUGS).size !== SERVICE_SLUGS.length) errors.push("Duplicate service slug");
for (const service of SERVICES) {
  const slugs = service.subServices.map((s) => s.slug);
  if (new Set(slugs).size !== slugs.length) errors.push(`${service.slug}: duplicate sub-service slug`);
  if (!SERVICE_COST[service.slug]) errors.push(`${service.slug}: no cost band in cost-data.ts`);
}

/* ---- Blog queue ---- */
const topicIds = BLOG_TOPICS.map((t) => t.id);
if (new Set(topicIds).size !== topicIds.length) errors.push("Duplicate blog topic id");
for (const topic of BLOG_TOPICS) {
  for (const slug of topic.relatedServiceSlugs) {
    if (!SERVICE_SLUGS.includes(slug)) errors.push(`Topic ${topic.id}: unknown service "${slug}"`);
  }
  for (const slug of topic.relatedCitySlugs) {
    if (!ALL_CITIES.some((c) => c.slug === slug)) {
      warnings.push(`Topic ${topic.id}: city slug "${slug}" not found in any phase file`);
    }
  }
}

/* ---- Every region must price ---- */
for (const region of new Set(ALL_CITIES.map((c) => c.region))) {
  if (!(region in REGION_MULTIPLIER)) {
    errors.push(`Region "${region}" has no multiplier in cost-data.ts, so it would price at baseline`);
  }
}

/* ---- Every city must be able to fill a complete Local Ledger ---- */
for (const city of ALL_CITIES) {
  try {
    buildCityLedger(city);
    for (const slug of SERVICE_SLUGS) buildServiceCityLedger(city, slug);
  } catch (err) {
    errors.push(`${city.state}:${city.slug} cannot fill a Local Ledger: ${(err as Error).message}`);
  }
  if (!getCityTraits(city).primaryStock) {
    warnings.push(`${city.state}:${city.slug} homeStyleNote yields no housing type`);
  }
}

/* ---- Report ---- */
const counts = { RI: 0, MA: 0, CT: 0 } as Record<string, number>;
for (const c of ALL_CITIES) counts[c.state] += 1;

console.log("Municipalities");
console.log(`  RI  ${counts.RI} / ${EXPECTED_COUNTS.RI}`);
console.log(`  MA  ${counts.MA} / ${EXPECTED_COUNTS.MA}`);
console.log(`  CT  ${counts.CT} / ${EXPECTED_COUNTS.CT}`);
console.log(`  All ${ALL_CITIES.length} / ${EXPECTED_COUNTS.TOTAL}`);
console.log(`\nServices ${SERVICES.length}, sub-services ${SUB_SERVICE_COUNT}, blog topics ${BLOG_TOPICS.length}`);

if (warnings.length) {
  console.log(`\n${warnings.length} warnings:`);
  for (const w of warnings.slice(0, 20)) console.log(`  ${w}`);
  if (warnings.length > 20) console.log(`  and ${warnings.length - 20} more`);
}

if (errors.length) {
  console.log(`\n${errors.length} errors:`);
  for (const e of errors) console.log(`  ${e}`);
  process.exit(1);
}

console.log("\nAll data checks passed.");
