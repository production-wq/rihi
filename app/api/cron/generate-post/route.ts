import { NextResponse } from "next/server";
import { BLOG_TOPICS } from "@/lib/data/blog-topics";
import { ALL_CITIES } from "@/lib/data/cities";
import { getServiceBySlug } from "@/lib/data/services";

/**
 * Blog generation cron. See CLAUDE.md section 12.
 *
 * Vercel cron, weekdays at 0 9 * * 1-5. Selects the highest-priority unpublished
 * topic, generates a draft with Gemini 2.5 Flash, and writes it to Sanity AS A
 * DRAFT.
 *
 * -----------------------------------------------------------------------------
 * NOTHING HERE AUTO-PUBLISHES, AND THAT IS NOT A SETTING
 * -----------------------------------------------------------------------------
 * The document id is prefixed `drafts.` so Sanity stores it as a draft and the
 * published-post query on the blog hub cannot see it. A human reviews and
 * publishes.
 *
 * That is not caution for its own sake. docs/seo-strategy.md is explicit that
 * the model will invent plausible-sounding rebate amounts, permit fees, and
 * code sections. Every dollar figure, program name, and code citation in a
 * generated draft has to be verified before it goes live.
 *
 * The route returns 401 without a matching CRON_SECRET in the Authorization
 * header.
 */

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BANNED = [
  "transform", "sanctuary", "dream home", "curated", "elevated", "seamless",
  "passion", "craftsmanship", "stunning", "exquisite", "journey", "leverage",
  "world-class", "solutions", "premier", "cutting-edge", "innovative",
  "state-of-the-art", "bespoke", "artisan", "meticulous", "unparalleled",
  "dedication", "commitment",
];

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");

  // Without a configured secret the route is closed, not open. A missing
  // environment variable must never make an authenticated endpoint public.
  if (!secret || auth !== `Bearer ${secret}`) return unauthorized();

  const geminiKey = process.env.GEMINI_API_KEY;
  const sanityProject = process.env.SANITY_PROJECT_ID;
  const sanityToken = process.env.SANITY_API_TOKEN;
  const dataset = process.env.SANITY_DATASET ?? "production";

  if (!geminiKey || !sanityProject || !sanityToken) {
    return NextResponse.json(
      { error: "Not configured", need: ["GEMINI_API_KEY", "SANITY_PROJECT_ID", "SANITY_API_TOKEN"] },
      { status: 503 }
    );
  }

  const topic = BLOG_TOPICS.find((t) => !t.published);
  if (!topic) {
    return NextResponse.json({
      status: "queue empty",
      note: "Replenish lib/data/blog-topics.ts from Search Console queries generating impressions but no clicks.",
    });
  }

  const service = getServiceBySlug(topic.relatedServiceSlugs[0] ?? "");
  const cityNotes = topic.relatedCitySlugs
    .map((slug) => ALL_CITIES.find((c) => c.slug === slug))
    .filter(Boolean)
    .map((c) => `  ${c!.city}, ${c!.state}: ${c!.homeStyleNote}`)
    .join("\n");

  const prompt = `Write a 1,200 to 2,000 word article titled "${topic.title}".

Audience: homeowners in Rhode Island, Massachusetts, and Connecticut.
Category: ${topic.category}. State focus: ${topic.state}.
${cityNotes ? `\nResearched housing stock for the towns this post covers. Use these specifics:\n${cityNotes}\n` : ""}
RULES, all mandatory:
1. NO EM DASHES OR EN DASHES anywhere. Write "5 to 9 days", never "5-9 days".
2. Never use any of these words: ${BANNED.join(", ")}. The single exception is "seamless gutters" as a product name.
3. This site is a REFERRAL SERVICE, not a contractor. Never write "our crews", "we install", "licensed and insured", "years of experience", or any manufacturer certification.
4. NEVER invent a dollar figure, rebate amount, permit fee, tax credit, or code section number. If a figure is not certain, write the sentence without it. A human verifies every number before publish, so an unverifiable claim wastes their time.
5. Open with a fact about the reader's house or situation, never with the company name.
6. Put a real number in most sections. Write the mechanism, not the drama.
7. Be neutral. Say when a repair beats a replacement and when work is not worth doing.
8. Vary sentence length. No exclamation points. No rhetorical questions as headings.

INTERNAL LINKS, required, as markdown links in the prose:
${service ? `  - Link to /services/${service.slug}/ within the FIRST THIRD of the article, inside a sentence, not in a footer block.` : ""}
  - Link to the relevant state hub: /locations/rhode-island/, /locations/massachusetts/, or /locations/connecticut/.
${topic.relatedCitySlugs.length ? `  - Link to two or three city pages where genuinely relevant.` : ""}
  - Link to a cost tool at /tools/ if the article discusses cost.

FORMAT: markdown. Use "## " for section headings. No title heading, the title is set separately.`;

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: { "x-goog-api-key": geminiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Generation failed", status: res.status }, { status: 502 });
  }

  const json = await res.json();
  const body: string = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  if (!body) return NextResponse.json({ error: "Empty generation" }, { status: 502 });

  // Reject rather than publish a draft that breaks the hard copy rules. A
  // rejected run costs one day of the queue; a bad draft costs a reviewer's
  // trust in the whole pipeline.
  const found = BANNED.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(body.replace(/seamless\s+gutters?/gi, "")));
  if (/[—–]/.test(body)) found.push("em or en dash"); // copy-lint-allow
  if (found.length) {
    return NextResponse.json({ error: "Draft violated copy rules", violations: found }, { status: 422 });
  }

  const slug = topic.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);

  // The drafts. prefix is what keeps this out of the published query.
  const doc = {
    _id: `drafts.post-${topic.id}`,
    _type: "post",
    title: topic.title,
    slug: { _type: "slug", current: slug },
    excerpt: body.split(/\n\n/)[0]?.slice(0, 200) ?? "",
    body,
    category: topic.category,
    state: topic.state,
    serviceSlugs: topic.relatedServiceSlugs,
    citySlugs: topic.relatedCitySlugs,
    publishedAt: new Date().toISOString(),
  };

  const mutate = await fetch(
    `https://${sanityProject}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sanityToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
    }
  );

  if (!mutate.ok) {
    return NextResponse.json({ error: "Sanity write failed", status: mutate.status }, { status: 502 });
  }

  return NextResponse.json({
    status: "draft created",
    topicId: topic.id,
    title: topic.title,
    words: body.split(/\s+/).length,
    note: "Draft only. A human must verify every cost figure, program name, and code reference before publishing.",
  });
}
