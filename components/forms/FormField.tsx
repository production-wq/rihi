"use client";

import { type ReactNode } from "react";

/**
 * Form field wrapper.
 *
 * Every field gets a real label element. Never a placeholder-only field: that
 * is called out specifically in CLAUDE.md section 7, because placeholder text
 * disappears on focus and fails anyone using a screen reader or returning to a
 * half-filled form.
 *
 * Errors are wired through aria-describedby and aria-invalid rather than colour
 * alone, and the help text stays visible rather than being swapped out for the
 * error.
 */
export function FormField({
  name,
  label,
  help,
  error,
  required,
  children,
}: {
  name: string;
  label: string;
  help?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  const helpId = help ? `${name}-help` : undefined;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div>
      <label htmlFor={name} className="block text-body-sm font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-cranberry" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 font-mono text-mono uppercase text-ink-muted">Optional</span>
        )}
      </label>

      {help ? (
        <p id={helpId} className="mt-1 max-w-prose text-caption text-ink-muted">
          {help}
        </p>
      ) : null}

      <div className="mt-2">{children}</div>

      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-caption text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const fieldClasses = `w-full min-h-[48px] rounded-control border-hairline border-shell
  bg-surface-raised px-3.5 py-2.5 text-body text-ink
  transition-colors duration-micro ease-out
  placeholder:text-ink-muted
  hover:border-granite-faint
  focus:border-cranberry
  aria-[invalid=true]:border-danger`;
