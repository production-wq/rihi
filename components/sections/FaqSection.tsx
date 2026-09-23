import { SHARED } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import type { Faq } from "@/lib/schema";

/**
 * FAQ block. The FAQPage schema that accompanies it is emitted by the page,
 * from lib/schema.ts, never from here. See CLAUDE.md section 9.
 */
export function FaqSection({
  faqs,
  heading = SHARED.faqHeading,
}: {
  faqs: Faq[];
  heading?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-display-md">{heading}</h2>
      <div className="mt-6">
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
