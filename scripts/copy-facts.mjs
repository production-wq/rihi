/**
 * copy-facts.mjs
 *
 * Builds the fact set handed to the copy generator, one per page.
 *
 * Everything verifiable is computed here from the repo data and passed into the
 * prompt. The model writes prose around these facts and is forbidden from
 * introducing new ones. See the header of generate-city-copy.mjs.
 */

import "./load-env.mjs";

export async function facts() {
  // The data layer is TypeScript, so it is loaded through tsx's ESM hook.
  const { getLiveCities } = await import("../lib/phase.ts");
  const { SERVICES } = await import("../lib/data/services.ts");
  const { STATE_NAMES } = await import("../lib/data/cities.ts");
  const { getCityTraits, dominantEra, STOCK_LABEL } = await import("../lib/copy/traits.ts");
  const { getPermitAuthority } = await import("../lib/data/permits.ts");
  const { serviceCostBand, serviceCostBasis } = await import("../lib/copy/ledger.ts");

  const cities = getLiveCities();
  const jobs = [];

  for (const city of cities) {
    const traits = getCityTraits(city);
    const permit = getPermitAuthority(city);

    const base = {
      city: city.city,
      stateName: STATE_NAMES[city.state],
      county: city.county,
      region: city.region,
      note: city.homeStyleNote,
      stock: traits.stock.map((s) => STOCK_LABEL[s]).join(", ") || "mixed",
      era: dominantEra(traits),
      coastal: traits.coastal ? "yes" : "no",
      historic: traits.historicDistrict ? "yes" : "no",
      dense: traits.dense ? "yes" : "no",
      island: traits.island ? "yes" : "no",
      permitLocal: permit.local,
      permitCode: permit.code,
    };

    jobs.push({
      key: `hub:${city.state}:${city.slug}`,
      type: "hub",
      facts: {
        ...base,
        bands: SERVICES.map(
          (s) => `    ${s.name}: ${serviceCostBand(city, s.slug)} (${serviceCostBasis(s.slug)})`
        ).join("\n"),
      },
    });

    for (const service of SERVICES) {
      jobs.push({
        key: `svc:${city.state}:${city.slug}:${service.slug}`,
        type: "service",
        facts: {
          ...base,
          serviceName: service.name,
          subServices: service.subServices.map((ss) => ss.name).join(", "),
          band: serviceCostBand(city, service.slug),
          basis: serviceCostBasis(service.slug),
        },
      });
    }
  }

  return jobs;
}
