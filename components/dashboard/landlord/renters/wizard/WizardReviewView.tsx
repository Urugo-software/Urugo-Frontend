"use client";

import { Button } from "@/components/ui/button";
import { WizardReviewViewProps } from "@/types/renter-wizard.types";
import { ReviewNoticeBanner } from "./review/ReviewNoticeBanner";
import { ReviewRenterInfoCard } from "./review/ReviewRenterInfoCard";
import { ReviewTenancyTermsCard } from "./review/ReviewTenancyTermsCard";

export function WizardReviewView({
  mode,
  identity,
  tenancy,
  properties,
  paymentSummary,
  simulatedLink,
  onBackToEdit,
  onConfirm,
}: WizardReviewViewProps) {
  return (
    <div className="space-y-8 sm:space-y-9">
      {/* Notice Banner */}
      <ReviewNoticeBanner />

      {/* Review Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReviewRenterInfoCard
          mode={mode}
          identity={identity}
          simulatedLink={simulatedLink}
          onEdit={() => onBackToEdit(1)}
        />

        <ReviewTenancyTermsCard
          tenancy={tenancy}
          properties={properties}
          paymentSummary={paymentSummary}
          onEdit={() => onBackToEdit(2)}
        />
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-line pt-6 sm:pt-8 mt-10">
        <Button
          type="button"
          variant="outline"
          onClick={() => onBackToEdit(2)}
          className="h-10.5 cursor-pointer rounded-none border-line bg-white px-5 text-sm font-medium text-ink hover:bg-surface transition-colors"
        >
          ← Edit Tenancy Details
        </Button>

        <Button
          type="button"
          onClick={onConfirm}
          className="h-10.5 cursor-pointer rounded-none bg-ink px-7 text-sm font-medium text-white hover:bg-black transition-colors"
        >
          Confirm & Save Renter
        </Button>
      </div>
    </div>
  );
}
