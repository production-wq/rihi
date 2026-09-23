/**
 * schema.ts
 *
 * JSON-LD builders. See CLAUDE.md section 9.
 *
 * -----------------------------------------------------------------------------
 * TWO SCHEMA TYPES ARE DELIBERATELY ABSENT AND MUST STAY ABSENT
 * -----------------------------------------------------------------------------
 * LocalBusiness. This site is not a local business with a physical location
 * serving customers at that address. It is a referral operation. Emitting
 * LocalBusiness is a misrepresentation and risks a manual action.
 *
 * Review and AggregateRating. The reviews in lib/content.ts are marked
 * placeholders. Marking up placeholder reviews as structured data is review
 * fraud and exposes the business to FTC action under the endorsement rules.
 * These builders may be added only once real, verifiable, first-party reviews
 * exist. This is not a judgment call.
 *
 * Organization is used instead of LocalBusiness, which is accurate: the entity
 * is an organisation that connects homeowners with contractors.
 */

import { SITE } from "./content";
import { SITE_URL, absoluteUrl } from "./seo";

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.brandName,
    url: `${SITE_URL}/`,
    description:
      "A referral service connecting homeowners in Rhode Island, Massachusetts, and Connecticut with contractors who work in their town.",
    areaServed: [
      { "@type": "State", name: "Rhode Island" },
      { "@type": "State", name: "Massachusetts" },
      { "@type": "State", name: "Connecticut" },
    ],
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE.brandName,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/**
 * Service schema.
 *
 * `provider` is the Organization, which is accurate for a referral operation:
 * the service being described is the matching service, not the roofing work
 * itself. areaServed carries the geography on city-scoped pages.
 */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: { city: string; state: string };
}): Json {
  const schema: Json = {
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.name,
    url: absoluteUrl(input.path),
    provider: { "@id": `${SITE_URL}/#organization` },
  };

  schema.areaServed = input.areaServed
    ? {
        "@type": "City",
        name: input.areaServed.city,
        containedInPlace: { "@type": "State", name: input.areaServed.state },
      }
    : [
        { "@type": "State", name: "Rhode Island" },
        { "@type": "State", name: "Massachusetts" },
        { "@type": "State", name: "Connecticut" },
      ];

  return schema;
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export interface Faq {
  question: string;
  answer: string;
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    // The calculators are free and require no account. Stating a zero price is
    // accurate and is what makes the entry eligible.
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function blogPostingSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): Json {
  return {
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.image ? `${SITE_URL}${input.image}` : undefined,
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

/** Wraps one or more schema objects into a single @graph document. */
export function graph(...nodes: Json[]): Json {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
