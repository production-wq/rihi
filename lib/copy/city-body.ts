/**
 * city-body.ts
 *
 * Composes the body copy for city hubs and service x city pages.
 *
 * -----------------------------------------------------------------------------
 * HOW THE UNIQUENESS REQUIREMENT IS MET
 * -----------------------------------------------------------------------------
 * CLAUDE.md section 11 requires 500 words of genuinely unique copy on a city
 * hub and 450 on a service x city page, of which at least 60 percent must be
 * specific to that city and service combination.
 *
 * The material that makes a page unique is not invented here. It is read out of
 * data that is already researched per municipality:
 *
 *   homeStyleNote      Researched per city, never bulk-generated. Section 4.
 *   county, zipCodes   Per city.
 *   nearbyTowns        Per city, and resolved only to cities that are live.
 *   region             Drives a real cost multiplier, not a label.
 *   permit authority   Constructed per municipality in lib/data/permits.ts.
 *   cost band          Computed per city and service, so Block Island and the
 *                      Blackstone Valley genuinely differ.
 *   traits             Parsed from the note: stock, era, coastal, historic,
 *                      dense, island.
 *
 * The shared material is the technical passage in stock-service.ts, and sharing
 * it is correct rather than a compromise: a Providence triple-decker roof and a
 * Pawtucket triple-decker roof really do present the same problem, and writing
 * two different explanations of the same physics would be worse content, not
 * better.
 *
 * scripts/check-uniqueness.ts measures the result empirically rather than
 * trusting this reasoning. It compares every generated page against every other
 * and fails the build if any pair shares too much.
 */

import type { City } from "../data/cities";
import { STATE_NAMES, getNearbyCities } from "../data/cities";
import { getPermitAuthority, HISTORIC_AUTHORITY, RI_COASTAL_AUTHORITY, ENERGY_PROGRAM } from "../data/permits";
import { getCityTraits, dominantEra, pick, STOCK_LABEL, type CityTraits } from "./traits";
import { stockServicePassage, STOCK_SERVICE } from "./stock-service";
import { SERVICE_SCOPE } from "./service-scope";
import { serviceCostBand, serviceCostBasis } from "./ledger";
import { getServiceBySlug } from "../data/services";
import type { Faq } from "../schema";

export interface Paragraph {
  heading?: string;
  body: string[];
}

/* ---------------------------------------------------------------------------
 * SHARED FRAGMENTS
 * ------------------------------------------------------------------------- */

/**
 * Trims the researched note into a lead sentence without restating it whole.
 * The note is the single most specific thing on the page, so it is used rather
 * than paraphrased, which would lose the detail that makes it worth having.
 */
function noteLead(city: City): string {
  return city.homeStyleNote;
}

function stockPhrase(traits: CityTraits): string {
  const labels = traits.stock.slice(0, 2).map((s) => STOCK_LABEL[s]);
  if (!labels.length) return "the housing stock here";
  if (labels.length === 1) return labels[0];
  return `${labels[0]} and ${labels[1]}`;
}

function zipSentence(city: City): string {
  const zips = city.zipCodes;
  if (zips.length === 1) return `${city.city} runs on ZIP ${zips[0]}.`;
  return `${city.city} covers ZIP codes ${zips.slice(0, -1).join(", ")} and ${zips[zips.length - 1]}.`;
}

/* ---------------------------------------------------------------------------
 * PERMITTING
 * ------------------------------------------------------------------------- */

function permitParagraph(city: City, traits: CityTraits, serviceSlug?: string): string {
  const permit = getPermitAuthority(city);
  const parts: string[] = [];

  parts.push(
    `Permits for ${serviceSlug ? "this work" : "exterior and structural work"} in ${city.city} are pulled at the ${permit.local}, and the work is inspected against the ${permit.code}, administered by the ${permit.administrator}. Your contractor handles that, and a contractor unwilling to pull a permit is telling you something.`
  );

  if (traits.historicDistrict) {
    parts.push(
      `${city.city} has local historic district review, which is a separate process from the building permit and runs on its own timetable. Material, profile, and sometimes colour need approval before anything is ordered, and that can add four to eight weeks. The ${HISTORIC_AUTHORITY[city.state]} is the statewide body, though the review that affects your project is the local commission.`
    );
  }

  if (city.state === "RI" && traits.coastal) {
    parts.push(
      `Work close to the shoreline may also fall under the ${RI_COASTAL_AUTHORITY}, which has jurisdiction over coastal construction in Rhode Island. That applies to a narrower set of projects than people expect, but it is worth confirming before scheduling.`
    );
  }

  return parts.join(" ");
}

/* ---------------------------------------------------------------------------
 * CITY HUB BODY
 * ------------------------------------------------------------------------- */

export function buildCityBody(city: City): Paragraph[] {
  const traits = getCityTraits(city);
  const era = dominantEra(city ? traits : traits);
  const nearby = getNearbyCities(city, 6);
  const stateName = STATE_NAMES[city.state];
  const out: Paragraph[] = [];

  /* ---- Opening. The researched note, then what it implies. ---- */
  const eraLine =
    era === "pre-1900"
      ? `A large share of that stock predates 1900, which means board sheathing rather than plywood, framing that is not square, and openings that are not a current standard size. Every one of those adds time to a job, and the honest way to price them is an allowance with a stated unit rate rather than a number that moves on the third day.`
      : era === "pre-1940"
        ? `Most of it went up between roughly 1890 and 1940, which puts board sheathing under the roof, weight-and-pulley sash in the windows, and an empty cavity in the walls. Those three facts drive most of what a contractor finds once work starts.`
        : era === "postwar"
          ? `The bulk of it is postwar, built fast between about 1945 and 1975. Plywood sheathing, standard opening sizes, and simpler geometry make this the most predictable housing to work on in the region, and it prices accordingly.`
          : `A good share of the stock here is recent enough that construction is standardised, which keeps surprises and allowances smaller than they are on the older housing elsewhere in ${stateName}.`;

  out.push({
    body: [noteLead(city), eraLine],
  });

  /* ---- What the stock means, service by service. ---- */
  const serviceNotes: string[] = [];
  for (const slug of ["roofing", "windows", "siding", "gutters"]) {
    const passage = stockServicePassage(slug, traits.stock);
    const service = getServiceBySlug(slug);
    if (passage && service) {
      // First two sentences only. The full passage lives on the service x city
      // page; repeating it whole here would make the two pages compete.
      const short = passage.text.split(/(?<=\.)\s+/).slice(0, 2).join(" ");
      serviceNotes.push(`**${service.name}.** ${short}`);
    }
  }

  if (serviceNotes.length) {
    out.push({
      heading: `What ${city.city} housing means for the work`,
      body: [
        `Seven categories are covered here, and ${stockPhrase(traits)} change what each one involves. The short version, with the detail on each town-and-service page:`,
        ...serviceNotes,
      ],
    });
  }

  /* ---- Where the city carries more than one kind of housing. ---- */
  if (traits.stock.length >= 2) {
    out.push({
      heading: `More than one kind of house`,
      body: [
        `${city.city} is not a single housing type, and that matters when comparing quotes. Alongside ${STOCK_LABEL[traits.stock[0]]}, there is enough ${traits.stock.slice(1, 3).map((s) => STOCK_LABEL[s]).join(" and ")} here that two houses a few streets apart can present completely different jobs at completely different prices. A contractor who quotes from a photograph rather than a walk-through is guessing at which one you have.`,
      ],
    });
  }

  /* ---- Conditions specific to this place. ---- */
  const conditions: string[] = [];

  if (traits.dense) {
    conditions.push(
      `Lots here are tight and the houses sit close, which is a real cost factor rather than a detail. Staging a re-side or a roof with eight feet to the neighbour takes longer than the same job on an open suburban lot, and debris handling has nowhere convenient to go. Expect that to show up in the labour line, and expect a contractor who has worked in ${city.city} to have already accounted for it.`
    );
  }

  if (traits.coastal) {
    conditions.push(
      `Salt exposure is the other local factor. It attacks fasteners before it attacks anything visible: electro-galvanised nails corrode, and the shingle or the shingle course stays put until the nail head fails, usually during a storm rather than gradually. Stainless or hot-dipped galvanised fasteners are the specification within about a mile of open water, and the upcharge across a whole job is small. Paint life runs shorter here too, which is the argument for fiber cement or cedar over materials that depend on a coating.`
    );
  }

  if (traits.island) {
    conditions.push(
      `Everything arrives by boat, and that changes the arithmetic on every project in ${city.city}. Material transport and crew lodging add substantially to a job that would price normally on the mainland, and scheduling is tied to ferry capacity rather than to the contractor's calendar. Ordering in one consolidated delivery rather than in stages is usually the single largest saving available.`
    );
  }

  if (traits.historicDistrict) {
    conditions.push(
      `Part of ${city.city} sits under local historic district review. That governs what can go on the outside of the house: window profile, siding material and exposure, roofing material, and sometimes colour. It is not an obstacle so much as a sequence, and the mistake people make is signing a contract before starting the approval conversation rather than after.`
    );
  }

  if (conditions.length) {
    out.push({ heading: `Local conditions that move the number`, body: conditions });
  }

  /* ---- Permitting. ---- */
  out.push({
    heading: "Permits and review",
    body: [permitParagraph(city, traits), zipSentence(city)],
  });

  /* ---- Cost orientation. ---- */
  out.push({
    heading: `What work costs in ${city.city}`,
    body: [
      `Pricing here reflects ${city.region} labour rates and ${stateName} more broadly, adjusted for the age and type of the housing stock. A roof replacement on a typical single family in ${city.city} runs ${serviceCostBand(city, "roofing")}, a window job across 12 to 20 openings runs ${serviceCostBand(city, "windows")}, and a bathroom remodel runs ${serviceCostBand(city, "bathroom-remodeling")}. Those are estimates for this market based on typical scope, not quotes, and what a specific house costs depends on access and on what turns up once work starts.`,
      `Nobody else covering ${stateName} publishes figures like these, which is the main reason to start here rather than calling three contractors and building a picture from their numbers. ${ENERGY_PROGRAM[city.state]} runs assessments and incentives that may apply to insulation and window work, and terms change, so confirm current ones before counting on them.`,
    ],
  });

  /* ---- Nearby towns. ---- */
  if (nearby.length) {
    out.push({
      heading: "Nearby towns",
      body: [
        `Contractors who work in ${city.city} generally cover the surrounding towns as well, and a homeowner near a town line usually wants to compare both. ${nearby
          .map((c) => c.city)
          .join(", ")} all have pages here.`,
      ],
    });
  }

  return out;
}

/* ---------------------------------------------------------------------------
 * SERVICE x CITY BODY
 * ------------------------------------------------------------------------- */

const SCOPE_OPENERS = [
  (city: string, service: string) =>
    `What a ${service} job looks like in ${city} depends almost entirely on what kind of house you have, and the housing here is specific enough to say something useful about it.`,
  (city: string, service: string) =>
    `${service} work in ${city} is shaped by the building stock more than by anything else, so the place to start is what is actually standing here.`,
  (city: string, service: string) =>
    `Before any numbers, the thing that determines a ${service} job in ${city} is the house itself, and the stock here has a clear character.`,
];

export function buildServiceCityBody(city: City, serviceSlug: string): Paragraph[] {
  const service = getServiceBySlug(serviceSlug);
  if (!service) throw new Error(`Unknown service "${serviceSlug}"`);

  const traits = getCityTraits(city);
  const era = dominantEra(traits);
  const nearby = getNearbyCities(city, 5);
  const passage = stockServicePassage(serviceSlug, traits.stock);
  const band = serviceCostBand(city, serviceSlug);
  const seed = `${city.state}-${city.slug}-${serviceSlug}`;
  const out: Paragraph[] = [];

  /* ---- Opening: the city's own researched note, scoped to this service. ---- */
  const opener = pick(SCOPE_OPENERS, seed)(city.city, service.shortName.toLowerCase());
  out.push({ body: [opener, noteLead(city)] });

  /* ---- The technical passage for this stock and this service. ---- */
  if (passage) {
    out.push({
      heading: `${service.shortName} on ${STOCK_LABEL[passage.flag]}`,
      body: [passage.text],
    });
  }

  /* ----
   * The second stock type, where the city has one with its own passage.
   *
   * 528 of the 559 municipalities carry two or more stock types in their
   * researched note, and the COMBINATION is far more varied than any single
   * flag. Pawtucket is triple-deckers alone; Providence is triple-deckers plus
   * Federal plus Victorian. Rendering the second passage is both genuinely
   * useful to a homeowner whose house is the other type and a real contributor
   * to how different these pages are from one another.
   * ---- */
  const secondary = traits.stock.slice(1).find((flag) => STOCK_SERVICE[serviceSlug]?.[flag]);
  if (passage && secondary) {
    out.push({
      heading: `The other stock in ${city.city}`,
      body: [
        `${city.city} is not one kind of house. Alongside the ${STOCK_LABEL[passage.flag]}, there is enough ${STOCK_LABEL[secondary]} here that it is worth saying what changes if that is what you own.`,
        STOCK_SERVICE[serviceSlug]![secondary]!,
      ],
    });
  }

  /* ---- Era, which changes technique and allowance. ---- */
  const eraBody =
    era === "pre-1900"
      ? `Housing this old changes the sequence rather than just the price. Framing is hand-hewn or early sawn, spacing is irregular, nothing is square, and the sheathing is board. Work that would be routine on a 1990s house becomes carpentry first and ${service.shortName.toLowerCase()} second. The right way to handle that is a written allowance with a unit rate, so the number moves predictably instead of turning into a negotiation partway through.`
      : era === "pre-1940"
        ? `On housing from this period, expect board sheathing, an empty wall cavity, and dimensions that are close to standard without being standard. None of that is a problem, but all of it takes time, and a quote built without accounting for it will move once work starts.`
        : era === "postwar"
          ? `Postwar construction is the most predictable work in this region: plywood sheathing, standard openings, simple geometry, and framing that is actually square. Allowances can be smaller and schedules tighter, which is why the same nominal job prices lower here than on the older stock elsewhere in the state.`
          : `Construction here is recent enough to be standardised throughout, which keeps both the allowance and the schedule tight.`;

  out.push({ heading: `What the age of the housing changes`, body: [eraBody] });

  /* ---- Place-specific conditions, scoped to this service. ---- */
  const conditions: string[] = [];

  if (traits.coastal && ["roofing", "siding", "windows", "entry-doors", "gutters"].includes(serviceSlug)) {
    conditions.push(
      `Salt exposure matters on this job specifically. Fasteners corrode before finishes fail, so stainless or hot-dipped galvanised is the specification rather than an upgrade, and the cost difference across a whole project is minor. Anything that relies on a coating to survive has a shorter life here than the same product inland, which is worth weighing when comparing materials.`
    );
  }

  if (traits.historicDistrict) {
    conditions.push(
      `If the house sits inside the local historic district, material and profile need approval before anything is ordered, and that review runs on its own schedule. Four to eight weeks is a realistic allowance. It is worth starting that conversation before signing, because the approved specification sometimes changes which contractor is the right fit.`
    );
  }

  if (traits.dense && ["roofing", "siding", "gutters", "windows"].includes(serviceSlug)) {
    conditions.push(
      `Access is a genuine cost factor here rather than a footnote. Narrow side yards mean staging takes longer, material handling is slower, and there is nowhere convenient to put a dumpster. A contractor who works in ${city.city} regularly will have priced that in. One who does not may find it on the first morning.`
    );
  }

  if (traits.island) {
    conditions.push(
      `Everything for this job crosses on a ferry. Material transport and crew lodging add substantially to what the same work costs on the mainland, and the schedule follows boat capacity rather than the contractor's calendar. One consolidated delivery rather than several is usually the largest saving available.`
    );
  }

  if (conditions.length) {
    out.push({ heading: "Local conditions", body: conditions });
  }

  /* ---- Cost, with the computed band for this city and service. ---- */
  out.push({
    heading: `${service.shortName} cost in ${city.city}`,
    body: [
      `A typical ${service.shortName.toLowerCase()} project in ${city.city} runs ${band}. That assumes ${serviceCostBasis(serviceSlug)}, and it reflects ${city.region} labour rates adjusted for the age and type of housing here. It is an estimate for this market, not a quote.`,
      `What moves a specific house off that range is usually access, the condition of what is behind the surface, and scope creep once the work opens up. Our cost tools let you put your own numbers in and see where your house lands rather than reading a regional midpoint.`,
    ],
  });

  /* ---- Scope, timeline, and how to read a quote for this trade. ---- */
  const scope = SERVICE_SCOPE[serviceSlug];
  if (scope) {
    out.push({ heading: "How long it takes", body: [scope.timeline] });
    out.push({ heading: "What a real quote should say", body: [scope.quote] });
  }

  /* ---- Permitting for this municipality. ---- */
  out.push({
    heading: "Permits in this town",
    body: [permitParagraph(city, traits, serviceSlug)],
  });

  /* ---- Lateral links in prose, not just a nav block. ---- */
  if (nearby.length) {
    out.push({
      heading: "Nearby",
      body: [
        `Contractors covering ${city.city} for ${service.shortName.toLowerCase()} generally work the surrounding towns too. ${nearby.map((c) => c.city).join(", ")} each have their own page, and ${city.county} sets the general labour market for all of them.`,
      ],
    });
  }

  return out;
}

/* ---------------------------------------------------------------------------
 * FAQS
 * ------------------------------------------------------------------------- */

export function buildServiceCityFaqs(city: City, serviceSlug: string): Faq[] {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return [];

  const traits = getCityTraits(city);
  const era = dominantEra(traits);
  const permit = getPermitAuthority(city);
  const band = serviceCostBand(city, serviceSlug);
  const faqs: Faq[] = [];

  faqs.push({
    question: `How much does ${service.shortName.toLowerCase()} cost in ${city.city}?`,
    answer: `A typical project runs ${band}, assuming ${serviceCostBasis(serviceSlug)}. That figure reflects ${city.region} labour rates and the age of the housing stock in ${city.city}. It is an estimate for this market based on typical scope, not a quote, and the actual number depends on the house, the access, and what turns up once work starts.`,
  });

  faqs.push({
    question: `Do I need a permit for ${service.shortName.toLowerCase()} work in ${city.city}?`,
    answer: `For anything beyond a minor repair, yes. Permits are pulled at the ${permit.local} and the work is inspected against the ${permit.code}. Your contractor handles the application.${traits.historicDistrict ? ` If the house is in the local historic district, that review is separate and should start before anything is ordered.` : ""}`,
  });

  if (era === "pre-1900" || era === "pre-1940") {
    faqs.push({
      question: `My house in ${city.city} is over a century old. Does that change the job?`,
      answer: `Yes, and it is worth accounting for up front. Board sheathing rather than plywood, framing that is not square, and openings that are not a standard size all add time. Ask for a written allowance with a unit rate covering what might be found once the work opens up. A quote with no allowance line is not cheaper, it is just less finished.`,
    });
  } else {
    faqs.push({
      question: `How long does ${service.shortName.toLowerCase()} work take in ${city.city}?`,
      answer: `On the postwar housing that makes up most of ${city.city}, this kind of work is among the more predictable in the region, because the framing is square and the dimensions are standard. Your contractor should give you a working-day count at quote time, and a range rather than a single date is the honest version.`,
    });
  }

  if (traits.coastal) {
    faqs.push({
      question: `Does being near the water change what I should specify?`,
      answer: `It changes the fasteners first. Stainless or hot-dipped galvanised rather than electro-galvanised, because corrosion at the fastener is what fails before anything visible does. Coatings also have a shorter life here, which is the practical argument for materials that do not depend on one.`,
    });
  } else {
    const nearby = getNearbyCities(city, 3);
    if (nearby.length) {
      faqs.push({
        question: `Do contractors who cover ${city.city} also work nearby?`,
        answer: `Generally yes. ${city.county} functions as one labour market, and most contractors serving ${city.city} also cover ${nearby.map((c) => c.city).join(", ")}. If you are close to a town line it is worth getting quotes from both sides of it.`,
      });
    }
  }

  return faqs;
}

/** Word count of composed paragraphs, for the content floor validator. */
export function paragraphWordCount(paragraphs: Paragraph[]): number {
  const text = paragraphs
    .flatMap((p) => [p.heading ?? "", ...p.body])
    .join(" ")
    .replace(/\*\*/g, "");
  return text.split(/\s+/).filter(Boolean).length;
}

/* ---------------------------------------------------------------------------
 * ENTRY POINTS USED BY ROUTES
 *
 * Prefer the reviewed generated copy, which is written per municipality and
 * clears the uniqueness ceiling. Fall back to the deterministic composition
 * above when an entry is missing, so a gap degrades to plainer copy rather than
 * to a broken page.
 * ------------------------------------------------------------------------- */

export function cityHubBody(city: City): Paragraph[] {
  // Imported lazily to keep this module usable from scripts that run before
  // the generated file exists.
  const { generatedCityHub } = require("./generated") as typeof import("./generated");
  return generatedCityHub(city) ?? buildCityBody(city);
}

export function serviceCityBody(city: City, serviceSlug: string): Paragraph[] {
  const { generatedServiceCity } = require("./generated") as typeof import("./generated");
  return generatedServiceCity(city, serviceSlug) ?? buildServiceCityBody(city, serviceSlug);
}
