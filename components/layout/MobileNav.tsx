"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";

/**
 * Mobile menu.
 *
 * Everything except the estimate CTA collapses in here below the lg breakpoint.
 * The panel traps nothing and closes on route change, on Escape, and on
 * backdrop click, which is the minimum for a menu that is not a dialog.
 */
export function MobileNav({ opaque }: { opaque: boolean }) {
  const [open, setOpen] = useState(false);
  /** href of the expanded section, or null. One open at a time. */
  const [section, setSection] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) setSection(null);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-control transition-colors duration-micro ease-out lg:hidden ${
          opaque ? "text-ink hover:bg-shell" : "text-white hover:bg-white/10"
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          {open ? (
            <path
              d="M4 4l14 14M18 4L4 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 6h16M3 11h16M3 16h16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 top-[72px] z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-marsh-deep/40"
          />
          <nav
            id="mobile-menu"
            aria-label="Primary"
            className="relative max-h-[calc(100vh-72px)] overflow-y-auto border-b-hairline border-shell bg-oyster px-gutter pb-8 pt-2"
          >
            <ul>
              {NAV.primary.map((item) => {
                const branching = "children" in item;
                const expanded = section === item.href;

                return (
                  <li key={item.href} className="border-b-hairline border-shell">
                    {/*
                      A branching item gets the label as a link to its own hub
                      and a separate toggle for the children. Making the whole
                      row a toggle would strip the hub pages out of mobile
                      navigation entirely, and they are real pages.
                    */}
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-[56px] flex-1 items-center font-display text-display-sm text-ink transition-colors duration-micro ease-out hover:text-cranberry"
                      >
                        {item.label}
                      </Link>

                      {branching ? (
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                          onClick={() => setSection(expanded ? null : item.href)}
                          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-control text-ink transition-colors duration-micro ease-out hover:bg-shell"
                        >
                          <svg
                            width="14"
                            height="9"
                            viewBox="0 0 10 6"
                            fill="none"
                            aria-hidden="true"
                            className={`transition-transform duration-base ease-out ${expanded ? "rotate-180" : ""}`}
                          >
                            <path
                              d="M1 1l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      ) : null}
                    </div>

                    {branching && expanded ? (
                      <ul className="pb-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="flex min-h-[48px] items-center border-l-rule border-shell pl-4 text-body text-ink-body transition-colors duration-micro ease-out hover:border-cranberry hover:text-cranberry"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <Link
              href={NAV.cta.href}
              onClick={() => setOpen(false)}
              className="mt-6 flex min-h-[52px] items-center justify-center rounded-control bg-action px-6 text-body font-medium text-white transition-colors duration-micro ease-out hover:bg-action-hover"
            >
              {NAV.cta.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
