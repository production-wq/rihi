import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { SERVICES, getAllSubServicePaths } from "@/lib/data/services";
import { getLiveCities } from "@/lib/phase";
import { STATE_SLUGS, getCityUrl, getCityServiceUrl } from "@/lib/data/cities";
import { TOOLS } from "@/lib/data/tools";

/**
 * Dynamic sitemap. See CLAUDE.md section 9.
 *
 * Respects ACTIVE_PHASE by sourcing every city URL from getLiveCities(). A city
 * outside the current phase appears nowhere in this file, which matters because
 * submitting URLs that return 404 wastes crawl budget on a domain that has very
 * little of it to spare.
 *
 * No noindexed page appears here. The only noindexed route on the site is the
 * form thank-you state, which is not a distinct URL.
 *
 * At full rollout this exceeds 10,000 URLs and must be split into a sitemap
 * index by page type. At phase 1 it is roughly 370, so it stays a single file.
 * The threshold check below fails loudly rather than silently truncating.
 */

const SITEMAP_LIMIT = 10000;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const cities = getLiveCities();

  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/locations"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tools"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/free-estimate"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/gallery"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("/privacy-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms-conditions"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  for (const service of SERVICES) {
    entries.push({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const { service, subService } of getAllSubServicePaths()) {
    entries.push({
      url: absoluteUrl(`/services/${service}/${subService}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of Object.values(STATE_SLUGS)) {
    entries.push({
      url: absoluteUrl(`/locations/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const city of cities) {
    entries.push({
      url: `${SITE_URL}${getCityUrl(city)}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const service of SERVICES) {
      entries.push({
        url: `${SITE_URL}${getCityServiceUrl(city, service.slug)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  for (const tool of TOOLS) {
    entries.push({
      url: absoluteUrl(`/tools/${tool.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  if (entries.length > SITEMAP_LIMIT) {
    throw new Error(
      `Sitemap has ${entries.length} URLs, over the ${SITEMAP_LIMIT} limit. ` +
        `Split into a sitemap index by page type: services, locations, blog, tools. ` +
        `See CLAUDE.md section 9.`
    );
  }

  return entries;
}
