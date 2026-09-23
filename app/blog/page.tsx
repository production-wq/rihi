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
import { getPosts } from "@/lib/sanity/client";
import { img, BLOG_IMAGES } from "@/lib/images";
import { BLOG_TOPICS } from "@/lib/data/blog-topics";

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

export default async function BlogHubPage() {
  const posts = await getPosts();

  // The queue is ordered by traffic potential, per CLAUDE.md section 12. Showing
  // what is coming is honest on a new site with nothing published yet, and it is
  // more useful than an empty page.
  const upcoming = BLOG_TOPICS.filter((t) => !t.published).slice(0, 9);

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
          {posts.length ? (
            <div className="grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const slot = BLOG_IMAGES[post.serviceSlugs?.[0] ?? "roofing"] ?? "blog-roofing";
                const image = img(slot);
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}/`}
                    className="group flex flex-col bg-surface-raised transition-colors duration-base ease-out hover:bg-oyster"
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
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <h2 className="mt-3 text-display-sm transition-colors duration-micro ease-out group-hover:text-cranberry">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-3 text-body-sm text-ink-body">{post.excerpt}</p>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-8">
              <div className="max-w-prose rounded-card border-hairline border-shell bg-surface-sunken p-7">
                <p className="eyebrow text-cranberry">Nothing published yet</p>
                <p className="mt-3 text-body-lg text-ink-body">{BLOG_HUB.emptyState}</p>
              </div>

              <section className="mt-14">
                <h2 className="text-display-md">What is coming first</h2>
                <p className="mt-4 max-w-prose text-body-lg text-ink-body">
                  The queue is ordered by how much search demand each topic actually carries in
                  this region, not by what is easiest to write. These are the first nine.
                </p>
                <ol className="mt-8 grid gap-px border-hairline border-shell bg-shell sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((topic) => (
                    <li key={topic.id} className="bg-surface-raised p-6">
                      <p className="font-mono text-mono uppercase text-ink-muted">
                        {topic.category.replace(/-/g, " ")}
                      </p>
                      <p className="mt-2 font-display text-body-lg text-ink">{topic.title}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          )}
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
