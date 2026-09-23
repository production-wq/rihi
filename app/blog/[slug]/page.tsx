import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, getPosts } from "@/lib/sanity/client";
import { buildMetadata, clampDescription } from "@/lib/seo";
import { graph, breadcrumbSchema, blogPostingSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InlineLeadForm } from "@/components/forms/InlineLeadForm";
import { img, BLOG_IMAGES } from "@/lib/images";
import { getServiceBySlug } from "@/lib/data/services";
import { STATE_NAMES, STATE_SLUGS, type StateCode } from "@/lib/data/cities";

/**
 * Blog post.
 *
 * Renders from Sanity. Where Sanity is not configured the route generates no
 * params and every path 404s, which is correct: there are no posts.
 *
 * Link graph, per CLAUDE.md section 10: to the primary service hub, to the
 * relevant state hub, and to sibling posts. The in-body service link belongs in
 * the first third of the post and is the generator's responsibility, since it
 * has to sit inside the prose rather than in a block underneath it.
 */

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts(200);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    // The post's own opening claim, never a generic summary. Section 9.
    description: clampDescription(post.excerpt ?? post.body?.slice(0, 200) ?? post.title),
    path: `/blog/${post.slug}/`,
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const all = await getPosts(60);
  const service = getServiceBySlug(post.serviceSlugs?.[0] ?? "");
  const stateCode = post.state && post.state !== "ALL" ? (post.state as StateCode) : null;
  const image = img(BLOG_IMAGES[post.serviceSlugs?.[0] ?? "roofing"] ?? "blog-roofing");

  const related = all
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.serviceSlugs?.some((s) => post.serviceSlugs?.includes(s)))
    .slice(0, 3);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/blog/" },
    { name: post.title, path: `/blog/${post.slug}/` },
  ];

  return (
    <>
      <Header solid />
      <main id="main">
        <Container width="wide">
          <Breadcrumbs crumbs={crumbs} />
        </Container>

        <Container>
          <article className="py-4">
            <header className="max-w-prose">
              <p className="font-mono text-mono uppercase text-ink-muted">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h1 className="mt-4 text-display-lg">{post.title}</h1>
              {post.excerpt ? (
                <p className="mt-5 text-body-lg text-ink-body">{post.excerpt}</p>
              ) : null}
            </header>

            <div className="relative my-10 aspect-[2/1] overflow-hidden rounded-card">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1140px) 1140px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="prose-body">
              {(post.body ?? "").split(/\n\n+/).map((block, i) =>
                block.startsWith("## ") ? (
                  <h2 key={i}>{block.replace(/^##\s+/, "")}</h2>
                ) : block.startsWith("### ") ? (
                  <h3 key={i}>{block.replace(/^###\s+/, "")}</h3>
                ) : (
                  <p key={i}>{block}</p>
                )
              )}
            </div>

            <InlineLeadForm prefill={{ service: service?.slug, state: stateCode ?? undefined }} />

            <nav aria-label="Related" className="mt-12 border-t-hairline border-shell pt-8">
              <h2 className="eyebrow text-cranberry">Keep reading</h2>
              <ul className="mt-4 space-y-3">
                {service ? (
                  <li>
                    <Link
                      href={`/services/${service.slug}/`}
                      className="link-rise text-body-lg text-action transition-colors duration-micro ease-out"
                    >
                      {service.name} across Rhode Island, Massachusetts, and Connecticut
                    </Link>
                  </li>
                ) : null}
                {stateCode ? (
                  <li>
                    <Link
                      href={`/locations/${STATE_SLUGS[stateCode]}/`}
                      className="link-rise text-body-lg text-action transition-colors duration-micro ease-out"
                    >
                      Every town we cover in {STATE_NAMES[stateCode]}
                    </Link>
                  </li>
                ) : null}
                {related.map((p) => (
                  <li key={p._id}>
                    <Link
                      href={`/blog/${p.slug}/`}
                      className="link-rise text-body-lg text-action transition-colors duration-micro ease-out"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </article>
        </Container>
      </main>

      <JsonLd
        data={graph(
          blogPostingSchema({
            headline: post.title,
            description: post.excerpt ?? post.title,
            path: `/blog/${post.slug}/`,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            image: image.src,
          }),
          breadcrumbSchema(crumbs)
        )}
      />
    </>
  );
}
