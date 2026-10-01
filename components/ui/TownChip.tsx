import Link from "next/link";
import type { ReactNode } from "react";

/**
 * A town link rendered as a pill. 44px tall for touch, with a hover and focus
 * state that matches the rest of the link blocks.
 */
export function TownChip({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[44px] items-center rounded-full border-hairline border-shell bg-surface-raised px-4 text-body-sm text-ink-body transition-colors duration-micro ease-out hover:border-cranberry hover:text-cranberry"
    >
      {children}
    </Link>
  );
}
