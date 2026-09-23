/**
 * client.ts
 *
 * Sanity client. Blog content only.
 *
 * Service and city data live in the repo as typed TypeScript, per CLAUDE.md
 * section 2. Sanity holds posts and nothing else.
 *
 * -----------------------------------------------------------------------------
 * EVERY CALL IS GUARDED
 * -----------------------------------------------------------------------------
 * The project is not configured with Sanity credentials yet. Rather than
 * failing a build or throwing at request time, an unconfigured client returns
 * an empty result and the blog hub renders the empty state from lib/content.ts.
 *
 * That is deliberate. The blog is the one part of this site that depends on an
 * external service, and a missing environment variable should degrade one
 * section rather than take down 370 static pages that do not need Sanity at
 * all.
 *
 * No SDK dependency: the query API is a GET request, which keeps the bundle
 * smaller and avoids a package for something this small.
 */

const PROJECT_ID = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const API_VERSION = "2024-01-01";

export function sanityConfigured(): boolean {
  return Boolean(PROJECT_ID);
}

export async function sanityFetch<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!sanityConfigured()) return null;

  const url = new URL(
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`
  );
  url.searchParams.set("query", query);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const json = await res.json();
    return (json.result ?? null) as T | null;
  } catch {
    // A CMS outage must not take the page down. The caller renders the empty
    // state, which is honest: there are no posts to show right now.
    return null;
  }
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt?: string;
  body?: string;
  serviceSlugs?: string[];
  citySlugs?: string[];
  state?: string;
  category?: string;
}

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "updatedAt": _updatedAt,
  body,
  serviceSlugs,
  citySlugs,
  state,
  category
`;

export async function getPosts(limit = 50): Promise<Post[]> {
  const result = await sanityFetch<Post[]>(
    `*[_type == "post" && !(_id in path("drafts.**")) && defined(publishedAt)] | order(publishedAt desc)[0...${limit}]{${POST_FIELDS}}`
  );
  return result ?? [];
}

export async function getPost(slug: string): Promise<Post | null> {
  const result = await sanityFetch<Post[]>(
    `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0...1]{${POST_FIELDS}}`,
    { slug }
  );
  return result?.[0] ?? null;
}
