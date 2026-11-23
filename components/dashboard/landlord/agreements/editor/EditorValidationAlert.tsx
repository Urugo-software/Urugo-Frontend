"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  errors: string[];
}

export function EditorValidationAlert({ errors }: Props) {
  if (errors.length === 0) return null;

  return (
    <div className="border border-red-300 bg-red-50 p-3.5 text-[12.5px] text-red-900 space-y-1">
      <div className="flex items-center gap-1.5 font-semibold">
        <AlertTriangle className="size-4 text-red-700 shrink-0" />
        <span>Please complete required fields before continuing:</span>
      </div>
      <ul className="list-disc list-inside space-y-0.5 pl-1 text-[12.5px]">
        {errors.map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>
    </div>
  );
}
