"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

interface Child {
  label: string;
  href: string;
  blurb?: string;
}

/**
 * A primary nav item that opens a panel of child links.
 *
 * -----------------------------------------------------------------------------
 * BEHAVIOUR
 * -----------------------------------------------------------------------------
 * Opens on pointer enter and on click, which covers both the mouse user who
 * hovers and the touch user who taps. The trigger is a real button with
 * aria-expanded and aria-haspopup rather than a link, because a control that
 * opens a menu is a button, and the parent page is reachable from the first row
 * of the panel instead.
 *
 * Closes on Escape, on outside click, on blur out of the group, and on route
 * change. The Escape case returns focus to the trigger, which is what a
 * keyboard user expects and the most commonly skipped part of this pattern.
 *
 * A short close delay on mouse leave keeps the panel from vanishing while the
 * pointer crosses the gap between the trigger and the panel.
 */
export function NavDropdown({
  label,
  href,
  overview,
  children,
  transparent,
  active,
}: {
  label: string;
  href: string;
  overview?: string;
  children: readonly Child[];
  transparent: boolean;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!groupRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen((wasOpen) => {
        if (wasOpen) triggerRef.current?.focus();
        return false;
      });
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      cancelClose();
    };
  }, []);

  const triggerTone = transparent
    ? "text-white/85 hover:text-white"
    : active
      ? "text-cranberry"
      : "text-ink-body hover:text-ink";

  return (
    <div
      ref={groupRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!groupRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-h-[44px] items-center gap-1.5 text-body-sm transition-colors duration-micro ease-out ${triggerTone}`}
      >
        {label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-base ease-out ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute left-1/2 top-full z-50 w-[20rem] -translate-x-1/2 pt-3"
        >
          <div className="overflow-hidden rounded-card border-hairline border-shell bg-surface-raised shadow-raised motion-safe:animate-fade-up">
            <Link
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between gap-3 border-b-hairline border-shell px-5 py-3.5 transition-colors duration-micro ease-out hover:bg-oyster"
            >
              <span className="font-display text-body-lg text-ink">{label}</span>
              {overview ? (
                <span className="shrink-0 font-mono text-mono uppercase text-ink-muted">
                  {overview}
                </span>
              ) : null}
            </Link>

            <ul>
              {children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="group block px-5 py-3 transition-colors duration-micro ease-out hover:bg-oyster"
                  >
                    <span className="block text-body-sm font-medium text-ink transition-colors duration-micro ease-out group-hover:text-cranberry">
                      {child.label}
                    </span>
                    {child.blurb ? (
                      <span className="mt-0.5 block text-caption text-ink-muted">
                        {child.blurb}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
