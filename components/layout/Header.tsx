"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";

/**
 * Site header.
 *
 * CLAUDE.md section 7: starts transparent over the hero with white type, and on
 * scroll past 80px transitions to a solid oyster background with marsh type and
 * a shell bottom hairline over 200ms. Sticky at all positions.
 *
 * On mobile the estimate CTA stays visible at every scroll position and
 * everything else collapses into the menu.
 *
 * Pages without a hero image pass `solid`, because transparent white type over
 * an oyster background is invisible. That is a correctness condition, not a
 * style preference.
 */
export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const opaque = solid || scrolled;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-base ease-out ${
        opaque
          ? "border-b-hairline border-shell bg-oyster"
          : "border-b-hairline border-transparent bg-transparent"
      }`}
    >
      <Container width="wide">
        <div className="flex h-[72px] items-center justify-between gap-4 md:h-[84px]">
          <Link
            href="/"
            className={`font-display text-display-sm leading-none transition-colors duration-base ease-out ${
              opaque ? "text-ink" : "text-white"
            }`}
          >
            {SITE.brandShort}
            <span className={opaque ? "text-cranberry" : "text-white"}>.</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV.primary.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`link-rise text-body-sm transition-colors duration-micro ease-out ${
                    opaque
                      ? active
                        ? "text-cranberry"
                        : "text-ink-body hover:text-ink"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={NAV.cta.href}
              className={`inline-flex min-h-[44px] items-center rounded-control px-4 text-body-sm font-medium transition-colors duration-micro ease-out sm:px-5 ${
                opaque
                  ? "bg-action text-white hover:bg-action-hover"
                  : "bg-white text-ink hover:bg-oyster"
              }`}
            >
              {NAV.cta.label}
            </Link>
            <MobileNav opaque={opaque} />
          </div>
        </div>
      </Container>
    </header>
  );
}
