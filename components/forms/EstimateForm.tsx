"use client";

import { useState, type FormEvent } from "react";
import { ESTIMATE_FORM } from "@/lib/content";
import { FormField, fieldClasses } from "./FormField";
import { Button } from "@/components/ui/Button";

/**
 * The estimate form. The conversion point for the entire site.
 *
 * Posts to Formspree. There is no server-side handler and no database, per
 * CLAUDE.md section 2, so the endpoint is a NEXT_PUBLIC_ variable by design.
 *
 * Validation runs client side on submit and on blur after the first attempt,
 * which avoids scolding someone mid-typing. Error copy comes from content.ts,
 * never from the browser default, because the defaults are unhelpful and vary
 * by browser.
 *
 * Prefill exists so a completed calculator can hand off its inputs. That
 * handoff is the highest-intent moment on the site, per docs/tools-spec.md, and
 * it must never make the homeowner retype what they already entered.
 */
export interface EstimatePrefill {
  city?: string;
  state?: string;
  service?: string;
  description?: string;
}

type Values = Record<string, string>;
type Errors = Record<string, string>;

function validate(values: Values): Errors {
  const errors: Errors = {};

  for (const field of ESTIMATE_FORM.fields) {
    const value = (values[field.name] ?? "").trim();
    if (field.required && !value) {
      errors[field.name] = field.error;
      continue;
    }
    if (field.name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      errors.email = field.error;
    }
    if (field.name === "phone" && value && value.replace(/\D/g, "").length < 10) {
      errors.phone = field.error;
    }
    if ("minLength" in field && field.minLength && value.length < field.minLength) {
      errors[field.name] = field.error;
    }
  }

  return errors;
}

export function EstimateForm({
  prefill = {},
  compact = false,
}: {
  prefill?: EstimatePrefill;
  compact?: boolean;
}) {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  const [values, setValues] = useState<Values>({
    city: prefill.city ?? "",
    state: prefill.state ?? "",
    service: prefill.service ?? "",
    description: prefill.description ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function update(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (attempted) {
      setErrors(validate({ ...values, [name]: value }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.getElementById(Object.keys(found)[0]);
      first?.focus();
      return;
    }

    if (!endpoint) {
      // No endpoint configured. Say so plainly rather than showing a success
      // state for a submission that went nowhere.
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border-hairline border-shell bg-surface-raised p-7">
        <p className="eyebrow text-success">Sent</p>
        <h2 className="mt-3 text-display-sm">{ESTIMATE_FORM.successHeadline}</h2>
        <p className="mt-3 max-w-prose text-body text-ink-body">{ESTIMATE_FORM.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      {!compact ? (
        <div>
          <h2 className="text-display-sm">{ESTIMATE_FORM.headline}</h2>
          <p className="mt-2 max-w-prose text-body text-ink-body">{ESTIMATE_FORM.intro}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {ESTIMATE_FORM.fields.map((field) => {
          const isWide = field.type === "textarea";
          const value = values[field.name] ?? "";
          const error = errors[field.name];
          const described =
            [field.name in errors ? `${field.name}-error` : "", "help" in field && field.help ? `${field.name}-help` : ""]
              .filter(Boolean)
              .join(" ") || undefined;

          return (
            <div key={field.name} className={isWide ? "sm:col-span-2" : ""}>
              <FormField
                name={field.name}
                label={field.label}
                help={"help" in field ? field.help : undefined}
                error={error}
                required={field.required}
              >
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={value}
                    required={field.required}
                    autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={described}
                    onChange={(e) => update(field.name, e.target.value)}
                    className={fieldClasses}
                  >
                    {"options" in field
                      ? field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      : null}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={value}
                    rows={"rows" in field ? field.rows : 5}
                    required={field.required}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={described}
                    onChange={(e) => update(field.name, e.target.value)}
                    className={`${fieldClasses} min-h-[128px] resize-y`}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={value}
                    required={field.required}
                    autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={described}
                    onChange={(e) => update(field.name, e.target.value)}
                    className={fieldClasses}
                  />
                )}
              </FormField>
            </div>
          );
        })}
      </div>

      {status === "error" ? (
        <p role="alert" className="text-body-sm text-danger">
          {endpoint
            ? "That did not go through. Try again, or reload the page and resend."
            : "The form endpoint is not configured in this environment, so nothing was sent. Set NEXT_PUBLIC_FORMSPREE_ENDPOINT to enable it."}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? ESTIMATE_FORM.submittingLabel : ESTIMATE_FORM.submitLabel}
        </Button>
        <p className="max-w-[40ch] text-caption text-ink-muted">{ESTIMATE_FORM.privacyNote}</p>
      </div>
    </form>
  );
}
