"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EstimateForm } from "./EstimateForm";

/**
 * Reads prefill values out of the query string.
 *
 * The calculators and the inline CTAs pass city, state, and service through so
 * a homeowner never retypes what they already entered. docs/tools-spec.md calls
 * the handoff from a completed calculation to this form the highest-intent
 * moment on the site, and making someone re-enter their town at that moment is
 * the fastest way to lose them.
 *
 * useSearchParams needs a Suspense boundary during static rendering.
 */
function Inner() {
  const params = useSearchParams();
  return (
    <EstimateForm
      compact
      prefill={{
        city: params.get("city") ?? undefined,
        state: params.get("state") ?? undefined,
        service: params.get("service") ?? undefined,
        description: params.get("description") ?? undefined,
      }}
    />
  );
}

export function EstimateFormWithParams() {
  return (
    <Suspense fallback={<EstimateForm compact />}>
      <Inner />
    </Suspense>
  );
}
