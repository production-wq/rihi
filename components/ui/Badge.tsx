import { type ReactNode } from "react";

/** Mono-set label. Used for counts, states, and categories, never for prose. */
export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "inverse";
}) {
  const tones = {
    default: "bg-shell text-ink",
    accent: "bg-cranberry-wash text-cranberry-deep",
    inverse: "bg-marsh-mid text-ink-inverse",
  };
  return (
    <span
      className={`inline-block rounded-pill px-3 py-1 font-mono text-mono uppercase ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
