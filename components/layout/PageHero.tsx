import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import type { ImageSlot } from "@/lib/images";

/**
 * Hero band for interior pages.
 *
 * Two modes. With an image, it runs as a photograph with a scrim and white
 * type, and the header sits transparent over it. Without one, it runs on the
 * marsh surface, and the caller must pass `solid` to the Header so the nav type
 * stays legible.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  image?: ImageSlot;
  crumbs: Array<{ name: string; path: string }>;
}) {
  return (
    <section
      className={`relative bg-marsh ${
        // With a photograph the header sits transparent over it, so the section
        // is pulled up under the header. Without one the header is solid and
        // sits in normal flow.
        image ? "-mt-[72px] pt-[72px] md:-mt-[84px] md:pt-[84px]" : ""
      }`}
    >
      {image ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/*
            A flat base scrim under the gradient. These seven service
            photographs range from a dark winter roofline to a bright overcast
            sky, and a left-weighted gradient alone left the breadcrumbs and the
            eyebrow under 4.5:1 on the brighter ones. The flat layer sets a
            floor; the gradient still gives the image somewhere to breathe on
            the right.
          */}
          <div className="absolute inset-0 bg-marsh-deep/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-marsh-deep/80 via-marsh-deep/55 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-marsh-deep/70 to-transparent" />
        </div>
      ) : null}

      <Container width="wide">
        <div className="relative">
          <div className="text-oyster/60 [&_a:hover]:text-white [&_[aria-current]]:text-white">
            <Breadcrumbs crumbs={crumbs} />
          </div>

          <div className="max-w-[44rem] pb-14 pt-6 md:pb-20 md:pt-8">
            {eyebrow ? <p className="eyebrow text-cranberry-light">{eyebrow}</p> : null}
            <h1 className="mt-4 text-display-lg text-white">{title}</h1>
            {lede ? (
              <p className="mt-5 max-w-prose text-body-lg text-oyster/85">{lede}</p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
