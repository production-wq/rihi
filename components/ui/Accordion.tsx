"use client";

import { useId, useState } from "react";

/**
 * FAQ accordion.
 *
 * Built on button and region rather than details and summary so the open state
 * can animate and so the heading level stays correct for the page outline.
 * FAQPage schema is emitted separately by the page, not from here.
 */
export function Accordion({
  items,
  headingLevel = 3,
}: {
  items: Array<{ question: string; answer: string }>;
  headingLevel?: 2 | 3;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const Heading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";

  return (
    <div className="border-t-hairline border-shell">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;

        return (
          <div key={item.question} className="border-b-hairline border-shell">
            <Heading className="text-body-lg">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left font-display text-body-lg text-ink transition-colors duration-micro ease-out hover:text-cranberry"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-cranberry transition-transform duration-base ease-out ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M9 1v16M1 9h16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <p className="max-w-prose text-body text-ink-body">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
