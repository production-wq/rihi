import { type ReactNode } from "react";

/**
 * Page container. 1140px content, 1320px wide, with a 20px gutter at mobile.
 *
 * The gutter is a token rather than a literal so the 390px verification in
 * CLAUDE.md section 7 has one place to change if it ever fails.
 */
export function Container({
  children,
  width = "content",
  className = "",
}: {
  children: ReactNode;
  width?: "content" | "wide" | "prose";
  className?: string;
}) {
  const max =
    width === "wide" ? "max-w-wide" : width === "prose" ? "max-w-prose" : "max-w-content";
  return (
    <div className={`mx-auto w-full ${max} px-gutter md:px-8 ${className}`}>{children}</div>
  );
}
