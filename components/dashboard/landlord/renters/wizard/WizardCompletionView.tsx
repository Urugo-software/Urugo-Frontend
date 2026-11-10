"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WizardCompletionViewProps } from "../types/renter-wizard.types";
import { CompletionSuccessBanner } from "./completion/CompletionSuccessBanner";
import { CompletionSummaryCard } from "./completion/CompletionSummaryCard";

export function WizardCompletionView({
  submission,
  onRegisterAnother,
  onDone,
}: WizardCompletionViewProps) {
  return (
    <div className="space-y-8 sm:space-y-9">
      {/* Success Notification Banner */}
      <CompletionSuccessBanner />

      {/* Confirmation Summary Card */}
      <CompletionSummaryCard submission={submission} />

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={onRegisterAnother}
          className="inline-flex h-10.5 cursor-pointer items-center gap-2 rounded-none border-line bg-white px-5 text-xs font-medium text-ink hover:bg-surface transition-colors"
        >
          <RotateCcw className="size-3.5" />
          <span>Register Another Renter</span>
        </Button>

        <Button
          type="button"
          onClick={onDone}
          className="inline-flex h-10.5 cursor-pointer items-center gap-2 rounded-none bg-ink px-6 text-xs font-medium text-white hover:bg-black transition-colors"
        >
          <span>Done (View Renters)</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
