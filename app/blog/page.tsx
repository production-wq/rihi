import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { BLOG_HUB } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { graph, breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { getPosts, type Post } from "@/lib/sanity/client";
import { img, BLOG_IMAGES } from "@/lib/images";
import { SERVICES } from "@/lib/data/services";
import { LAST_REVIEWED } from "@/lib/data/cost-data";
import { STATE_NAMES, STATE_SLUGS, type StateCode } from "@/lib/data/cities";

const CRUMBS = [
  { name: "Home", path: "/" },
  { name: "Guides", path: "/blog/" },
];

export const metadata: Metadata = buildMetadata({
  title: BLOG_HUB.headline,
  description:
    "Cost breakdowns and the specific problems that come with New England housing: ice dams, salt air, board sheathing, historic district rules, and century-old window openings.",
  path: "/blog/",
});

export const revalidate = 300;

function categoryLabel(category?: string): string {
  return (category ?? "guide").replace(/-/g, " ");
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostCard({ post }: { post: Post }) {
  const image = img(BLOG_IMAGES[post.serviceSlugs?.[0] ?? "roofing"] ?? "blog-roofing");
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group flex h-full flex-col bg-surface-raised transition-colors duration-base ease-out hover:bg-oyster"
    >
      <div className="relative aspect-[2/1] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-slow ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-mono uppercase text-ink-muted">
          {categoryLabel(post.category)}  ·  {formatDate(post.publishedAt)}
        </p>
        <h3 className="mt-3 text-display-sm transition-colors duration-micro ease-out group-hover:text-cranberry">
          {post.title}
        </h3>
        {post.excerpt ? <p className="mt-3 text-body-sm text-ink-body">{post.excerpt}</p> : null}
      </div>
    </Link>
  );
}

export default async function BlogHubPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;
  const featuredImage = featured
    ? img(BLOG_IMAGES[featured.serviceSlugs?.[0] ?? "roofing"] ?? "blog-roofing")
    : null;

  const reviewed = new Date(`${LAST_REVIEWED}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const states: StateCode[] = ["RI", "MA", "CT"];

  return (
    <>
      <Header solid />
      <main id="main">
        <PageHero
          eyebrow="Guides"
          title={BLOG_HUB.headline}
          lede={BLOG_HUB.subheadline}
          crumbs={CRUMBS}
        />

        <Container width="wide">
          {featured && featuredImage ? (
            <>
              {/* Featured post. The one asymmetric moment on this page. */}
              <section aria-labelledby="featured-heading" className="py-12 lg:py-16">
                <h2 id="featured-heading" className="eyebrow text-cranberry">
                  Latest guide
                </h2>
                <Link
                  href={`/blog/${featured.slug}/`}
                  className="group mt-6 grid gap-0 border-hairline border-shell bg-surface-raised transition-colors duration-base ease-out hover:bg-oyster lg:grid-cols-12"
                >
                  <div className="relative aspect-[2/1] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[22rem]">
                    <Image
                      src={featuredImage.src}
                      alt={featuredImage.alt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-transform duration-slow ease-out motion-safe:group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7 lg:col-span-5 lg:p-10">
                    <p className="font-mono text-mono uppercase text-ink-muted">
                      {categoryLabel(featured.category)}  ·  {formatDate(featured.publishedAt)}
                    </p>
                    <h3 className="mt-4 text-display-md transition-colors duration-micro ease-out group-hover:text-cranberry">
                      {featured.title}
                    </h3>
                    {featured.excerpt ? (
                      <p className="mt-4 text-body-lg text-ink-body">{featured.excerpt}</p>
                    ) : null}
                    <span className="mt-6 text-body-sm text-action">Read the guide</span>
                  </div>
                </Link>
              </section>

              {rest.length ? (
                <section aria-labelledby="all-guides-heading" className="pb-12 lg:pb-16">
                  <h2 id="all-guides-heading" className="text-display-md">
                    More guides
                  </h2>
                  <div className="mt-8 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((post) => (
                      <PostCard key={post._id} post={post} />
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          ) : (
            <div className="py-12">
              <div className="max-w-prose rounded-card border-hairline border-shell bg-surface-sunken p-7">
                <p className="text-body-lg text-ink-body">{BLOG_HUB.emptyState}</p>
              </div>
            </div>
          )}

          <section
            aria-labelledby="browse-heading"
            className="border-t-hairline border-shell py-12 lg:py-16"
          >
            <h2 id="browse-heading" className="text-display-md">
              Browse by service
            </h2>
            <p className="mt-4 max-w-prose text-body-lg text-ink-body">
              Each service page has the full picture: materials, what drives price in this
              market, and how long the work takes. The guides above go deeper on one question
              at a time.
            </p>
            <ul className="mt-8 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service) => {
                const count = posts.filter((p) => p.serviceSlugs?.includes(service.slug)).length;
                return (
                  <li key={service.slug} className="bg-surface-raised">
                    <Link
                      href={`/services/${service.slug}/`}
                      className="group flex min-h-[44px] items-baseline justify-between gap-4 p-5 transition-colors duration-base ease-out hover:bg-oyster"
                    >
                      <span className="font-display text-body-lg text-ink transition-colors duration-micro ease-out group-hover:text-cranberry">
                        {service.name}
                      </span>
                      <span className="shrink-0 font-mono text-mono uppercase text-ink-muted">
                        {count} {count === 1 ? "guide" : "guides"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3">
              <p className="font-mono text-mono uppercase text-ink-muted">By state</p>
              {states.map((state) => (
                <Link
                  key={state}
                  href={`/locations/${STATE_SLUGS[state]}/`}
                  className="link-rise text-body-sm text-ink-body transition-colors duration-micro ease-out hover:text-cranberry"
                >
                  {STATE_NAMES[state]}
                </Link>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="method-heading"
            className="grid gap-10 border-t-hairline border-shell py-12 pb-section lg:grid-cols-12 lg:gap-16 lg:py-16"
          >
            <div className="lg:col-span-5">
              <h2 id="method-heading" className="text-display-md">
                How these guides are written
              </h2>
            </div>
            <div className="space-y-5 text-body-lg text-ink-body lg:col-span-7">
              <p>
                This site is a referral service, not a contractor. It has no product line to
                sell, so a guide can say when vinyl is the right siding, when a repair beats a
                replacement, and when a project is not worth doing this year.
              </p>
              <p>
                Dollar figures come from the same cost data that drives the calculators, last
                reviewed {reviewed}. They are estimates for this market, not quotes, and your
                town and your house will move them. Program terms and code details change, so
                confirm current rules with the program or the building department.
              </p>
              <p>
                <Link
                  href="/tools/"
                  className="link-rise text-action transition-colors duration-micro ease-out"
                >
                  Run the numbers on your own house
                </Link>
                {"  ·  "}
                <Link
                  href="/free-estimate/"
                  className="link-rise text-action transition-colors duration-micro ease-out"
                >
                  Get free quotes
                </Link>
              </p>
            </div>
          </section>
        </Container>
      </main>

      <JsonLd
        data={graph(
          collectionPageSchema({
            name: BLOG_HUB.headline,
            description: BLOG_HUB.subheadline,
            path: "/blog/",
          }),
          breadcrumbSchema(CRUMBS)
        )}
      />
    </>
  );
}
