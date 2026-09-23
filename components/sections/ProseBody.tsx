import type { Paragraph } from "@/lib/copy/city-body";

/**
 * Renders composed body copy.
 *
 * Handles the bold lead-in used in the deterministic city composition, where a
 * paragraph opens with a service name in bold. Deliberately minimal: this
 * renders repo-authored and reviewed copy, not arbitrary markdown, so there is
 * no parser here and no HTML injection surface.
 */
export function ProseBody({ paragraphs }: { paragraphs: Paragraph[] }) {
  return (
    <div className="prose-body">
      {paragraphs.map((section, i) => (
        <section key={section.heading ?? i}>
          {section.heading ? <h2>{section.heading}</h2> : null}
          {section.body.map((text, j) => {
            const lead = text.match(/^\*\*(.+?)\*\*\s*(.*)$/s);
            return (
              <p key={j}>
                {lead ? (
                  <>
                    <strong className="font-medium text-ink">{lead[1]}</strong> {lead[2]}
                  </>
                ) : (
                  text
                )}
              </p>
            );
          })}
        </section>
      ))}
    </div>
  );
}
