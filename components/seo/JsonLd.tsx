/**
 * Renders a JSON-LD document built by lib/schema.ts.
 *
 * Schema is never hand-written into a page. See CLAUDE.md section 9. This is
 * the only component that emits a ld+json script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from typed builders over repo data, never from
      // user input, so there is no injection surface here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
