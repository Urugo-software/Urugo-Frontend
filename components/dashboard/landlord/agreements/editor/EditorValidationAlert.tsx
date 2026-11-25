"use client";

import { AlertTriangle, Info } from "lucide-react";

interface Props {
  errors: string[];
  warnings?: string[];
}

export function EditorValidationAlert({ errors, warnings = [] }: Props) {
  if (errors.length === 0 && warnings.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {errors.length > 0 && (
        <div
          role="alert"
          className="space-y-1 border border-red-300 bg-red-50 p-3.5 text-[12.5px] text-red-900"
        >
          <div className="flex items-center gap-1.5 font-semibold">
            <AlertTriangle className="size-4 shrink-0 text-red-700" />
            <span>Please complete required fields before continuing:</span>
          </div>
          <ul className="list-inside list-disc space-y-0.5 pl-1 text-[12.5px]">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div
          role="status"
          className="space-y-1 border border-amber-300 bg-amber-50/70 p-3.5 text-[12.5px] text-amber-950"
        >
          <div className="flex items-center gap-1.5 font-semibold">
            <Info className="size-4 shrink-0 text-amber-700" />
            <span>
              Recommended statutory clauses omitted ({warnings.length}):
            </span>
          </div>
          <ul className="list-inside list-disc space-y-0.5 pl-1 text-[12.5px]">
            {warnings.slice(0, 4).map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
            {warnings.length > 4 && (
              <li>and {warnings.length - 4} more recommended clause(s).</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
