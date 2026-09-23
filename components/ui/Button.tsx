import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-action text-white hover:bg-action-hover active:bg-action-hover border-hairline border-transparent",
  secondary:
    "bg-transparent text-ink border-hairline border-marsh/25 hover:border-marsh hover:bg-marsh hover:text-ink-inverse",
  ghost: "bg-transparent text-ink border-hairline border-transparent hover:bg-shell",
  inverse:
    "bg-oyster text-ink border-hairline border-transparent hover:bg-white",
};

/**
 * Buttons and button-styled links.
 *
 * Tap target is 44px minimum at every size, per the mobile verification rule in
 * CLAUDE.md section 7. Transition is 150ms ease-out, inside the 150 to 200ms
 * band, and carries no motion that needs a reduced-motion guard beyond the
 * global one in globals.css.
 */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const sizing =
    size === "lg"
      ? "min-h-[52px] px-7 text-body-lg"
      : size === "sm"
        ? "min-h-[44px] px-4 text-body-sm"
        : "min-h-[48px] px-6 text-body";

  const base = `inline-flex items-center justify-center gap-2 rounded-control font-medium
    transition-colors duration-micro ease-out
    disabled:cursor-not-allowed disabled:opacity-50
    ${VARIANTS[variant]} ${sizing} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={base} disabled={disabled}>
      {children}
    </button>
  );
}
